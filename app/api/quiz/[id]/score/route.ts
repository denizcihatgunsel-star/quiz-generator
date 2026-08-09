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

    if (
      !Number.isInteger(score) ||
      !Number.isInteger(total) ||
      score < 0 ||
      total <= 0 ||
      score > total
    ) {
      return NextResponse.json({ error: "Invalid score." }, { status: 400 });
    }

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

    // Award XP only for the first completion of this quiz per day (anti-farm)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const attemptsToday = await db.quizAttempt.count({
      where: {
        quizId: id,
        userId: session.user.id,
        createdAt: { gte: todayStart },
      },
    });

    if (attemptsToday <= 1) {
      const isPerfect = score === total;
      await awardXp(
        session.user.id,
        isPerfect ? "quiz_perfect" : "quiz_scored",
        isPerfect ? XP_REWARDS.quiz_perfect : XP_REWARDS.quiz_scored
      );
      if (isPerfect) await unlockAchievement(session.user.id, "perfect_score");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
