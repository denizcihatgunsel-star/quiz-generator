import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { awardXp, XP_REWARDS } from "@/lib/xp";
import { unlockAchievement } from "@/lib/achievements";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { score, total } = await req.json();

    const quiz = await db.savedQuiz.findUnique({ where: { id } });
    if (!quiz || quiz.userId !== session.user.id) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    await db.savedQuiz.update({
      where: { id },
      data: { score, total },
    });

    await db.quizAttempt.create({
      data: { quizId: id, userId: session.user.id, score, total },
    });

    // Award XP for scoring a quiz
    const isPerfect = score === total;
    await awardXp(
      session.user.id,
      isPerfect ? "quiz_perfect" : "quiz_scored",
      isPerfect ? XP_REWARDS.quiz_perfect : XP_REWARDS.quiz_scored
    );
    if (isPerfect) await unlockAchievement(session.user.id, "perfect_score");

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
