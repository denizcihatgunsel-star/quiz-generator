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
      "explanation": "<explanation>",
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
      "explanation": "<explanation>",
      "difficulty": "Medium",
      "bloomLevel": "Apply"
    }
  ],
  "trueFalse": [
    {
      "id": "tf-1",
      "statement": "<statement>",
      "correct": true,
      "explanation": "<explanation>",
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
- Generate 5-8 multiple choice questions
- Generate 8-12 flashcards
- Generate 3-5 fill-in-the-blank questions
- Generate 3-5 true/false questions
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

  try {
    const completion = await getClient().chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 8000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message.trim() },
      ],
    });

    const rawText = completion.choices[0]?.message?.content?.trim();
    if (!rawText) {
      return NextResponse.json(
        { error: "No response generated. Please try again." },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(rawText);

    // If it's a quiz, increment usage and ensure arrays exist
    if (parsed.type === "quiz") {
      if (!Array.isArray(parsed.multipleChoice)) parsed.multipleChoice = [];
      if (!Array.isArray(parsed.flashcards)) parsed.flashcards = [];
      if (!Array.isArray(parsed.fillInTheBlank)) parsed.fillInTheBlank = [];
      if (!Array.isArray(parsed.trueFalse)) parsed.trueFalse = [];

      await db.usageRecord.upsert({
        where: { userId_month: { userId, month } },
        update: { count: { increment: 1 } },
        create: { userId, month, count: 1 },
      });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse the response. Please try again." },
        { status: 500 }
      );
    }
    const message = err instanceof Error ? err.message : String(err);
    console.error("Chat error:", message);
    return NextResponse.json(
      { error: `Chat failed: ${message}` },
      { status: 500 }
    );
  }
}
