import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getPlan, currentMonth, isUnlimited } from "@/lib/subscription";
import { quotaLimit } from "@/lib/quota";

export const maxDuration = 60;

function getClient() {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
  });
}

const SYSTEM_PROMPT = `You are Examina, a friendly AI quiz assistant. Users will ask you to create quizzes about topics. Your job is to:

1. If the user asks for a quiz about a topic, generate brief educational content about that topic (around 200-300 words) and then generate a quiz from it.
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
- Generate 4-5 multiple choice questions
- Generate 5-6 flashcards
- Generate 2-3 fill-in-the-blank questions
- Generate 2-3 true/false questions
- Keep the "lesson" field short (200-300 words max)
- Keep ALL explanations very concise (under 15 words)
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

  const { message } = await req.json();

  if (!message || typeof message !== "string" || message.trim().length < 2) {
    return NextResponse.json(
      { error: "Please type a message." },
      { status: 400 }
    );
  }

  // Only quiz-generation requests consume the monthly quota
  const looksLikeQuizRequest = (msg: string) => {
    const s = msg.toLowerCase();
    const keywords = ["quiz", "question", "generate", "create", "lesson", "study", "test", "exam", "flashcard"];
    return s.length >= 50 || keywords.some((k) => s.includes(k));
  };
  const isQuizRequest = looksLikeQuizRequest(message);

  const subscription = await db.subscription.findUnique({ where: { userId } });
  const plan = getPlan(subscription?.plan ?? "free");
  const month = currentMonth();

  if (isQuizRequest && !isUnlimited(plan)) {
    const [usage, limit] = await Promise.all([
      db.usageRecord.findUnique({
        where: { userId_month: { userId, month } },
      }),
      quotaLimit(plan, userId),
    ]);
    const used = usage?.count ?? 0;

    if (used >= limit) {
      return NextResponse.json(
        {
          error: `You've used all ${limit} quizzes for this month. Upgrade to generate more.`,
          code: "LIMIT_REACHED",
        },
        { status: 429 }
      );
    }
  }

  // Reserve quota before the LLM call; roll back if the response isn't a quiz
  const rollbackUsage = async () => {
    await db.usageRecord.updateMany({
      where: { userId, month, count: { gt: 0 } },
      data: { count: { decrement: 1 } },
    });
  };

  if (isQuizRequest) {
    await db.usageRecord.upsert({
      where: { userId_month: { userId, month } },
      update: { count: { increment: 1 } },
      create: { userId, month, count: 1 },
    });
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

        // Validate the response; roll back quota if it wasn't a quiz
        try {
          const parsed = JSON.parse(fullText);
          if (isQuizRequest && parsed.type !== "quiz") {
            await rollbackUsage();
          }
        } catch {
          if (isQuizRequest) await rollbackUsage();
          // JSON parse failed — client will handle recovery
        }

        controller.close();
      } catch (err) {
        if (isQuizRequest) await rollbackUsage();
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
