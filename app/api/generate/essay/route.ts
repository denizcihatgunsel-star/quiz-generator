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
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing API key. Use Authorization: Bearer exm_your_key" }, { status: 401 });
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
  if (plan.id !== "plus" && plan.id !== "pro" && plan.id !== "team") {
    return NextResponse.json({ error: "API access requires Plus, Pro, or Team plan" }, { status: 403 });
  }

  const { topic, length, tone, prompt, instructions, language } = await req.json();
  if (!topic || typeof topic !== "string" || topic.length < 10) {
    return NextResponse.json({ error: "Topic must be at least 10 characters" }, { status: 400 });
  }

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
      return NextResponse.json({ error: "Failed to parse generated essay" }, { status: 500 });
    }

    // Increment usage
    const month = currentMonth();
    await db.usageRecord.upsert({
      where: { userId_month: { userId: apiKey.userId, month } },
      update: { count: { increment: 1 } },
      create: { userId: apiKey.userId, month, count: 1 },
    });

    return NextResponse.json({ essay: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Generation failed" },
      { status: 500 }
    );
  }
}
