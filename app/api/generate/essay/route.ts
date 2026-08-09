import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getPlan, currentMonth, isUnlimited } from "@/lib/subscription";
import OpenAI from "openai";

export const maxDuration = 60;

function getClient() {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
  });
}

const SYSTEM_PROMPT = `You are an expert essay writer and academic assistant. Create well-structured, engaging essays that are:
- Well-researched and factually accurate
- Clearly organized with introduction, body, and conclusion
- Citations are included and properly formatted
- Written in clear, academic prose
- Adapted to the specified tone and length requirements

Write in the requested language.

Always respond with valid JSON only. NO markdown, NO code blocks, NO backticks.

Output ONLY this JSON structure:
{
  "title": "Short, catchy essay title",
  "content": "The complete essay text",
  "keyPoints": ["Main arguments or key concepts mentioned"],
  "wordCount": 0,
  "language": "Language"
}`;

export async function POST(req: NextRequest) {
  const session = await auth();
  const authHeader = req.headers.get("authorization");

  let userId: string | null = null;
  let plan = getPlan("free");

  if (authHeader?.startsWith("Bearer ")) {
    const key = authHeader.slice(7);
    const apiKey = await db.apiKey.findUnique({
      where: { key },
      include: { user: { include: { subscription: true } } },
    });

    if (!apiKey) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    await db.apiKey.update({ where: { id: apiKey.id }, data: { lastUsed: new Date() } });

    plan = getPlan(apiKey.user.subscription?.plan ?? "free");
    if (plan.id !== "plus" && plan.id !== "pro" && plan.id !== "team") {
      return NextResponse.json({ error: "API access requires Plus, Pro, or Team plan" }, { status: 403 });
    }
    userId = apiKey.userId;
  } else if (session?.user?.id) {
    userId = session.user.id;
    const subscription = await db.subscription.findUnique({ where: { userId } });
    plan = getPlan(subscription?.plan ?? "free");
  } else {
    return NextResponse.json({ error: "Sign in or provide an API key to generate essays." }, { status: 401 });
  }

  const { topic, length, tone, prompt, instructions, language } = await req.json();
  if (!topic || typeof topic !== "string" || topic.length < 10) {
    return NextResponse.json({ error: "Topic must be at least 10 characters" }, { status: 400 });
  }

  // --- Monthly quota check (counts against the quiz generation quota) ---
  const month = currentMonth();
  if (!isUnlimited(plan)) {
    const usage = await db.usageRecord.findUnique({
      where: { userId_month: { userId, month } },
    });
    const used = usage?.count ?? 0;
    if (used >= plan.quizzesPerMonth) {
      return NextResponse.json(
        {
          error: `You've used all ${plan.quizzesPerMonth} quizzes for this month on the ${plan.name} plan.`,
          code: "LIMIT_REACHED",
          used,
          limit: plan.quizzesPerMonth,
          plan: plan.id,
        },
        { status: 429 }
      );
    }
  }

  // Reserve the quota before calling the LLM (aborted requests still count)
  await db.usageRecord.upsert({
    where: { userId_month: { userId, month } },
    update: { count: { increment: 1 } },
    create: { userId, month, count: 1 },
  });

  const rollbackUsage = async () => {
    await db.usageRecord.updateMany({
      where: { userId, month, count: { gt: 0 } },
      data: { count: { decrement: 1 } },
    });
  };

  try {
    const client = getClient();
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Write an essay on: "${topic}"
Length: ${length} words
Tone: ${tone}
Language: ${language || "English"}
${prompt ? `Additional prompt: ${prompt}` : ""}
${instructions ? `Special instructions: ${instructions}` : ""}

Requirements:
- Should be approximately ${length} words
- Write everything in ${language || "English"}
- Include a clear thesis statement
- Have logical flow and transitions
- End with a strong conclusion
- Include citations where appropriate

Respond ONLY with valid JSON (no markdown, no code blocks).`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const text = response.choices[0]?.message?.content || "";
    let data;
    try {
      data = JSON.parse(text.replace(/```json\s*/g, "").replace(/```\s*$/g, "").trim());
    } catch {
      await rollbackUsage();
      return NextResponse.json({ error: "Failed to parse generated essay" }, { status: 500 });
    }

    return NextResponse.json({ essay: data });
  } catch (err) {
    await rollbackUsage();
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Generation failed" },
      { status: 500 }
    );
  }
}
