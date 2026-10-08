import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, ensureVerificationColumns } from "@/lib/db";
import { awardXp, XP_REWARDS } from "@/lib/xp";
import { unlockAchievement } from "@/lib/achievements";

// POST: record a quiz attempt (retake flow — any signed-in user)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureVerificationColumns();
  
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { score, total, tabSwitchCount, answersJson } = await req.json();
  if (
    !Number.isInteger(score) ||
    !Number.isInteger(total) ||
    score < 0 ||
    total <= 0 ||
    score > total
  ) {
    return NextResponse.json({ error: "Invalid score." }, { status: 400 });
  }

  // Validate tabSwitchCount (clamp to 0-10000, default 0 if invalid)
  let validTabSwitchCount = 0;
  if (typeof tabSwitchCount === 'number' && Number.isInteger(tabSwitchCount)) {
    validTabSwitchCount = Math.max(0, Math.min(10000, tabSwitchCount));
  }

  // Validate answersJson (max 20KB, drop if too large)
  let validAnswersJson: string | null = null;
  if (answersJson) {
    try {
      const jsonString = JSON.stringify(answersJson);
      if (jsonString.length <= 20 * 1024) {
        validAnswersJson = jsonString;
      }
    } catch {
      // Invalid JSON, drop it
    }
  }

  const quiz = await db.savedQuiz.findUnique({ where: { id } });
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  // Only public quizzes (or the owner's own) can be taken for XP
  if (quiz.userId !== session.user.id && !quiz.isPublic) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  await db.quizAttempt.create({
    data: { 
      quizId: id, 
      userId: session.user.id, 
      score, 
      total,
      tabSwitchCount: validTabSwitchCount,
      answersJson: validAnswersJson,
    },
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
}
