import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { awardXp, XP_REWARDS } from "@/lib/xp";
import { unlockAchievement } from "@/lib/achievements";

// POST: record a quiz attempt (retake flow — any signed-in user)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { score, total } = await req.json();
  if (typeof score !== "number" || typeof total !== "number" || total <= 0) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const quiz = await db.savedQuiz.findUnique({ where: { id } });
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  await db.quizAttempt.create({
    data: { quizId: id, userId: session.user.id, score, total },
  });

  const isPerfect = score === total;
  await awardXp(
    session.user.id,
    isPerfect ? "quiz_perfect" : "quiz_scored",
    isPerfect ? XP_REWARDS.quiz_perfect : XP_REWARDS.quiz_scored
  );
  if (isPerfect) await unlockAchievement(session.user.id, "perfect_score");

  return NextResponse.json({ success: true });
}
