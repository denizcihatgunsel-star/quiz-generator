import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getPlan, currentMonth, isUnlimited } from "@/lib/subscription";

export const maxDuration = 60;

function getClient() {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
  });
}

const SYSTEM_PROMPT = `You are Examina, a friendly AI quiz assistant. Users will ask you to create quizzes about topics. Your job is to:

1. If the user asks for a quiz about a topic, generate educational content about that topic (around 500-800 words) and then generate a quiz from it.
2. If the user asks a general question, answer it briefly and helpfully.
3. Always be encouraging and educational.
4. If the user specifies a language, generate the quiz in that language.

When generating a quiz, respond with ONLY this exact JSON structure (no markdown, no backticks, no commentary):
{
  "type": "quiz",
  "lesson": "<the educational content you wrote about the topic>",
  "topic": "<short topic title>",
  "multipleChoice": [
    {
      "id": "mcq-1",
      "question": "<question>",
      "options": ["<A>", "<B>", "<C>", "<D>"],
      "correctIndex": 0,
      "explanation": "<concise explanation, 1 sentence>",
      "difficulty": "Easy",
      "bloomLevel": "Remember"
    }
  ],
  "flashcards": [
    {
      "id": "fc-1",
      "front": "<term or question>",
      "back": "<answer>"
    }
  ],
  "fillInTheBlank": [
    {
      "id": "fib-1",
      "sentence": "<sentence with ___ for blank>",
      "answer": "<correct word>",
      "explanation": "<concise explanation>",
      "difficulty": "Medium",
      "bloomLevel": "Apply"
    }
  ],
  "trueFalse": [
    {
      "id": "tf-1",
      "statement": "<statement>",
      "correct": true,
      "explanation": "<concise explanation>",
      "difficulty": "Easy",
      "bloomLevel": "Understand"
    }
  ]
}

When answering a general question (not quiz generation), respond with:
{
  "type": "message",
  "text": "<your helpful response>"
}

Requirements for quizzes:
- Generate 5-6 multiple choice questions
- Generate 6-8 flashcards
- Generate 3-4 fill-in-the-blank questions
- Generate 3-4 true/false questions
- Keep explanations to 1 sentence max
- Distribute across Bloom's Taxonomy levels
- Tag each with difficulty: Easy, Medium, Hard
- Always respond with valid JSON only`;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Please sign in to use the chat.", code: "UNAUTHENTICATED" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  // Usage check
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
          error: `You've used all ${plan.quizzesPerMonth} quizzes for this month. Upgrade to generate more.`,
          code: "LIMIT_REACHED",
        },
        { status: 429 }
      );
    }
  }

  const { message } = await req.json();

  if (!message || typeof message !== "string" || message.trim().length < 2) {
    return NextResponse.json(
      { error: "Please type a message." },
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
            { role: "user", content: message.trim() },
          ],
        });

        let fullText = "";

        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            fullText += content;
            controller.enqueue(encoder.encode(content));
          }
        }

        // After streaming, validate and increment usage if quiz
        try {
          const parsed = JSON.parse(fullText);
          if (parsed.type === "quiz") {
            await db.usageRecord.upsert({
              where: { userId_month: { userId, month } },
              update: { count: { increment: 1 } },
              create: { userId, month, count: 1 },
            });
          }
        } catch {
          // JSON parse failed — client will handle recovery
        }

        controller.close();
      } catch (err) {
        let errorMsg = "Chat failed.";
        if (err instanceof Error) errorMsg = err.message;

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
