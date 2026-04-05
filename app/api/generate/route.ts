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

const SYSTEM_PROMPT = `You are an expert educator and quiz designer. When given lesson content, generate high-quality questions that test deep understanding, not just memorization. Only use information explicitly present in the provided material — never invent facts. Distribute questions across Bloom's Taxonomy levels (Remember, Understand, Apply, Analyze, Evaluate). Make wrong answers target common misconceptions. Tag each question with difficulty and Bloom's level. Always respond with valid JSON only — no markdown, no commentary.`;

const USER_PROMPT_TEMPLATE = (lesson: string) => `
Generate a quiz from the following lesson content.

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
- Generate 5-8 multiple choice questions
- Generate 8-12 flashcards
- Generate 3-5 fill-in-the-blank questions
- Generate 3-5 true/false questions
- correctIndex is 0-based (0 = first option)
- Distribute questions across Bloom's Taxonomy levels: Remember, Understand, Apply, Analyze, Evaluate
- Tag each question with difficulty: "Easy", "Medium", or "Hard"
- Tag each question with bloomLevel: "Remember", "Understand", "Apply", "Analyze", or "Evaluate"
- Make distractors target common misconceptions, not obviously wrong
- For fill-in-the-blank, use exactly "___" (three underscores) for the blank
- For true/false, mix true and false statements roughly evenly
- Only use information from the provided lesson content
`;

export async function POST(req: NextRequest) {
  // --- Auth check ---
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Please sign in to generate quizzes.", code: "UNAUTHENTICATED" },
      { status: 401 }
    );
  }

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

  // --- Input validation ---
  const { lesson } = await req.json();

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

  try {
    const completion = await getClient().chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 8000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_PROMPT_TEMPLATE(lesson.trim()) },
      ],
    });

    const rawText = completion.choices[0]?.message?.content?.trim();
    if (!rawText) {
      return NextResponse.json(
        { error: "No response generated. Please try again." },
        { status: 500 }
      );
    }

    const quiz = JSON.parse(rawText);

    if (
      !quiz.topic ||
      !Array.isArray(quiz.multipleChoice) ||
      !Array.isArray(quiz.flashcards) ||
      quiz.multipleChoice.length === 0 ||
      quiz.flashcards.length === 0
    ) {
      return NextResponse.json(
        { error: "Generated quiz has an invalid structure. Please try again." },
        { status: 500 }
      );
    }

    // Ensure new arrays exist even if AI omits them
    if (!Array.isArray(quiz.fillInTheBlank)) quiz.fillInTheBlank = [];
    if (!Array.isArray(quiz.trueFalse)) quiz.trueFalse = [];

    // --- Increment usage ---
    await db.usageRecord.upsert({
      where: { userId_month: { userId, month } },
      update: { count: { increment: 1 } },
      create: { userId, month, count: 1 },
    });

    return NextResponse.json(quiz);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse the generated quiz. Please try again." },
        { status: 500 }
      );
    }

    if (err instanceof OpenAI.AuthenticationError) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your DEEPSEEK_API_KEY." },
        { status: 401 }
      );
    }

    if (err instanceof OpenAI.RateLimitError) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const message = err instanceof Error ? err.message : String(err);
    console.error("Generate error:", message, err);
    return NextResponse.json(
      { error: `Generation failed: ${message}` },
      { status: 500 }
    );
  }
}
