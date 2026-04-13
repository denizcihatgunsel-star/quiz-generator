import { NextRequest, NextResponse } from "next/server";
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

// POST: Generate a quiz via API key
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing API key. Use Authorization: Bearer exm_your_key" },
      { status: 401 }
    );
  }

  const key = authHeader.slice(7);
  const apiKey = await db.apiKey.findUnique({
    where: { key },
    include: { user: { include: { subscription: true } } },
  });

  if (!apiKey) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  // Update last used
  await db.apiKey.update({ where: { id: apiKey.id }, data: { lastUsed: new Date() } });

  const plan = getPlan(apiKey.user.subscription?.plan ?? "free");
  if (plan.id !== "pro" && plan.id !== "team") {
    return NextResponse.json({ error: "API access requires Pro or Team plan" }, { status: 403 });
  }

  // Usage check
  if (!isUnlimited(plan)) {
    const month = currentMonth();
    const usage = await db.usageRecord.findUnique({
      where: { userId_month: { userId: apiKey.userId, month } },
    });
    if ((usage?.count ?? 0) >= plan.quizzesPerMonth) {
      return NextResponse.json({ error: "Monthly quiz limit reached" }, { status: 429 });
    }
  }

  const { content, language } = await req.json();
  if (!content || typeof content !== "string" || content.length < 50) {
    return NextResponse.json({ error: "Content must be at least 50 characters" }, { status: 400 });
  }

  try {
    const client = getClient();
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an expert quiz generator. Generate high-quality quiz questions from the provided content. Respond with valid JSON only.",
        },
        {
          role: "user",
          content: `Generate a quiz from this content${language ? ` in ${language}` : ""}. Return JSON with: topic (string), multipleChoice (array), flashcards (array), fillInTheBlank (array), trueFalse (array).\n\nCONTENT:\n${content.slice(0, 15000)}`,
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
      return NextResponse.json({ error: "Failed to parse generated quiz" }, { status: 500 });
    }

    // Increment usage
    const month = currentMonth();
    await db.usageRecord.upsert({
      where: { userId_month: { userId: apiKey.userId, month } },
      update: { count: { increment: 1 } },
      create: { userId: apiKey.userId, month, count: 1 },
    });

    return NextResponse.json({ quiz: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Generation failed" },
      { status: 500 }
    );
  }
}
