import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unlockAchievement } from "@/lib/achievements";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { topic, data, score, total } = await req.json();

    if (!topic || !data) {
      return NextResponse.json({ error: "Missing quiz data." }, { status: 400 });
    }

    const shareId = randomBytes(8).toString("hex");

    const quiz = await db.savedQuiz.create({
      data: {
        userId: session.user.id,
        topic,
        data: typeof data === "string" ? data : JSON.stringify(data),
        score: score ?? null,
        total: total ?? null,
        shareId,
      },
    });

    await unlockAchievement(session.user.id, "first_quiz");

    return NextResponse.json({ id: quiz.id, shareId });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Save quiz error:", message);
    return NextResponse.json({ error: `Failed to save: ${message}` }, { status: 500 });
  }
}
