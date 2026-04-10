import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getPlan, currentMonth, isUnlimited } from "@/lib/subscription";
import { awardXp, XP_REWARDS } from "@/lib/xp";

export const maxDuration = 60;

function getClient() {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
  });
}

const SYSTEM_PROMPT = `You are an expert educator and quiz designer. When given lesson content, generate high-quality questions that test deep understanding, not just memorization. Only use information explicitly present in the provided material — never invent facts. Distribute questions across Bloom's Taxonomy levels (Remember, Understand, Apply, Analyze, Evaluate). Make wrong answers target common misconceptions. Tag each question with difficulty and Bloom's level. Always respond with valid JSON only — no markdown, no commentary.`;

const SUPPORTED_LANGUAGES = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese",
  "Dutch", "Russian", "Chinese", "Japanese", "Korean", "Arabic",
  "Turkish", "Hindi", "Polish", "Swedish", "Norwegian", "Danish",
  "Finnish", "Greek", "Czech", "Romanian", "Hungarian", "Vietnamese",
  "Thai", "Indonesian", "Malay", "Ukrainian", "Hebrew",
];

const USER_PROMPT_TEMPLATE = (lesson: string, language: string) => `
Generate a quiz from the following lesson content.
${language !== "English" ? `\nIMPORTANT: Generate ALL quiz content (topic, questions, options, explanations, flashcards, statements, answers) in ${language}. The lesson content may be in any language — read and understand it, but write the entire quiz output in ${language}.\n` : ""}
LESSON CONTENT:
---
${lesson}
---

Respond with ONLY this exact JSON structure (no markdown, no backticks):
{
  "topic": "<short topic title, 2-5 words>",
  "multipleChoice": [
    {
      "id": "mcq-1",
      "question": "<clear, specific question>",
      "options": ["<option A>", "<option B>", "<option C>", "<option D>"],
      "correctIndex": 0,
      "explanation": "<why this is correct and why the others are not, 1-2 sentences>",
      "difficulty": "Easy",
      "bloomLevel": "Remember"
    }
  ],
  "flashcards": [
    {
      "id": "fc-1",
      "front": "<term, concept, or question>",
      "back": "<concise definition, explanation, or answer>"
    }
  ],
  "fillInTheBlank": [
    {
      "id": "fib-1",
      "sentence": "<sentence with ___ where the missing word/phrase should go>",
      "answer": "<the correct word or short phrase>",
      "explanation": "<brief explanation of why this is correct>",
      "difficulty": "Medium",
      "bloomLevel": "Apply"
    }
  ],
  "trueFalse": [
    {
      "id": "tf-1",
      "statement": "<declarative statement that is clearly true or false based on the lesson>",
      "correct": true,
      "explanation": "<why this is true or false, referencing the lesson content>",
      "difficulty": "Easy",
      "bloomLevel": "Understand"
    }
  ]
}

Requirements:
- Generate 5-6 multiple choice questions
- Generate 6-8 flashcards
- Generate 3-4 fill-in-the-blank questions
- Generate 3-4 true/false questions
- Keep explanations concise (1 sentence max)
- correctIndex is 0-based (0 = first option)
- Distribute questions across Bloom's Taxonomy levels: Remember, Understand, Apply, Analyze, Evaluate
- Tag each question with difficulty: "Easy", "Medium", or "Hard"
- Tag each question with bloomLevel: "Remember", "Understand", "Apply", "Analyze", or "Evaluate"
- Make distractors target common misconceptions, not obviously wrong
- For fill-in-the-blank, use exactly "___" (three underscores) for the blank
- For true/false, mix true and false statements roughly evenly
- Only use information from the provided lesson content${language !== "English" ? `\n- Write ALL content in ${language}` : ""}
`;

export async function POST(req: NextRequest) {
  // --- Auth check (allow demo for unauthenticated users) ---
  const session = await auth();
  const isDemo = !session?.user?.id;

  if (!isDemo) {
    const userId = session.user.id;

    // --- Subscription + usage check ---
    const subscription = await db.subscription.findUnique({ where: { userId } });
    const plan = getPlan(subscription?.plan ?? "free");
    const month = currentMonth();

    if (!isUnlimited(plan)) {
      const usage = await db.usageRecord.findUnique({
        where: { userId_month: { userId, month } },
      });
      const used = usage?.count ?? 0;

      if (used >= plan.quizzesPerMonth) {
        return NextResponse.json(
          {
            error: `You've used all ${plan.quizzesPerMonth} quizzes for this month on the ${plan.name} plan. Upgrade to generate more.`,
            code: "LIMIT_REACHED",
            used,
            limit: plan.quizzesPerMonth,
            plan: plan.id,
          },
          { status: 429 }
        );
      }
    }
  }

  // --- Input validation ---
  const body = await req.json();
  const lesson = body.lesson;
  const language = SUPPORTED_LANGUAGES.includes(body.language) ? body.language : "English";

  if (!lesson || typeof lesson !== "string" || lesson.trim().length < 50) {
    return NextResponse.json(
      { error: "Please provide at least 50 characters of lesson content." },
      { status: 400 }
    );
  }

  if (lesson.length > 15000) {
    return NextResponse.json(
      { error: "Lesson content is too long. Please limit to 15,000 characters." },
      { status: 400 }
    );
  }

  // --- Stream the response to prevent Vercel timeout ---
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await getClient().chat.completions.create({
          model: "deepseek-chat",
          max_tokens: 8192,
          response_format: { type: "json_object" },
          stream: true,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: USER_PROMPT_TEMPLATE(lesson.trim(), language) },
          ],
        });

        let fullText = "";

        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            fullText += content;
            // Send each chunk to keep the connection alive
            controller.enqueue(encoder.encode(content));
          }
        }

        // After streaming completes, validate and increment usage
        try {
          const quiz = JSON.parse(fullText);

          if (
            !quiz.topic ||
            !Array.isArray(quiz.multipleChoice) ||
            !Array.isArray(quiz.flashcards) ||
            quiz.multipleChoice.length === 0 ||
            quiz.flashcards.length === 0
          ) {
            // Send error as a special marker the client can detect
            controller.enqueue(encoder.encode("\n__EXAMINA_ERROR__:Generated quiz has an invalid structure. Please try again."));
            controller.close();
            return;
          }

          // Increment usage (skip for demo)
          if (!isDemo) {
            const userId = session.user.id;
            const month = currentMonth();
            await db.usageRecord.upsert({
              where: { userId_month: { userId, month } },
              update: { count: { increment: 1 } },
              create: { userId, month, count: 1 },
            });

            // Award XP for generating a quiz
            await awardXp(userId, "quiz_generated", XP_REWARDS.quiz_generated);
          }
        } catch {
          controller.enqueue(encoder.encode("\n__EXAMINA_ERROR__:Failed to parse the generated quiz. Please try again."));
        }

        controller.close();
      } catch (err) {
        let errorMsg = "Generation failed.";

        if (err instanceof OpenAI.AuthenticationError) {
          errorMsg = "Invalid API key.";
        } else if (err instanceof OpenAI.RateLimitError) {
          errorMsg = "Rate limit reached. Please wait a moment and try again.";
        } else if (err instanceof Error) {
          errorMsg = `Generation failed: ${err.message}`;
        }

        controller.enqueue(encoder.encode(`__EXAMINA_ERROR__:${errorMsg}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
