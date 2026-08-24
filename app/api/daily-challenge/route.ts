import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, ensureVerificationColumns } from "@/lib/db";
import { awardXp, XP_REWARDS } from "@/lib/xp";
import { unlockAchievement } from "@/lib/achievements";

function dayIndex(date: Date): number {
  return Math.floor(date.getTime() / 86400000);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// GET: today's daily challenge (a random public quiz, stable for the day)
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [publicQuizzes, streak] = await Promise.all([
    db.savedQuiz.findMany({
      where: { isPublic: true },
      select: {
        id: true,
        topic: true,
        theme: true,
        data: true,
        user: { select: { name: true } },
        attempts: { where: { userId: session.user.id } },
      },
    }),
    db.userStreak.findUnique({ where: { userId: session.user.id } }),
  ]);

  const withMcq = publicQuizzes.filter((q) => {
    try {
      const data = JSON.parse(q.data);
      return (data.multipleChoice?.length ?? 0) > 0;
    } catch {
      return false;
    }
  });

  if (withMcq.length === 0) {
    return NextResponse.json({ quiz: null, completedToday: false, dayIndex: dayIndex(new Date()) });
  }

  const idx = dayIndex(new Date()) % withMcq.length;
  const picked = withMcq[idx];
  const pickedData = JSON.parse(picked.data);

  const completedToday = streak?.lastChallengeDate === today();
  const todayBest = picked.attempts
    .filter((a) => a.createdAt.toISOString().slice(0, 10) === today())
    .reduce((best, a) => Math.max(best, Math.round((a.score / a.total) * 100)), 0);

  // Smart Review: missed questions due today
  let review: { items: Record<string, unknown>[]; dueCount: number } = { items: [], dueCount: 0 };
  try {
    await ensureVerificationColumns();
    const now = new Date();
    const [dueItems, dueCount] = await Promise.all([
      db.questionReview.findMany({
        where: { userId: session.user.id, dueDate: { lte: now } },
        orderBy: { dueDate: "asc" },
        take: 3,
      }),
      db.questionReview.count({ where: { userId: session.user.id, dueDate: { lte: now } } }),
    ]);
    review = {
      items: dueItems.map((item) => ({ id: item.id, topic: item.topic, ...JSON.parse(item.payload) })),
      dueCount,
    };
  } catch {
    // Smart Review is optional — never break the challenge
  }

  return NextResponse.json({
    quiz: {
      id: picked.id,
      topic: picked.topic,
      theme: pickedData.theme ?? picked.theme ?? "rose",
      author: picked.user.name || "Anonymous",
      questions: pickedData.multipleChoice ?? [],
    },
    review,
    completedToday,
    todayBest,
    dayIndex: dayIndex(new Date()),
    reward: XP_REWARDS.daily_challenge,
  });
}

// POST: submit a daily challenge score (one per day, awards XP + streak)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { quizId, score, total } = await req.json();
  if (
    !quizId ||
    !Number.isInteger(score) ||
    !Number.isInteger(total) ||
    score < 0 ||
    total <= 0 ||
    score > total
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const quiz = await db.savedQuiz.findUnique({ where: { id: quizId } });
  if (!quiz || !quiz.isPublic) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  let streak = await db.userStreak.findUnique({ where: { userId: session.user.id } });
  if (streak?.lastChallengeDate === today()) {
    return NextResponse.json({ error: "Daily challenge already completed today." }, { status: 400 });
  }

  await db.quizAttempt.create({
    data: { quizId, userId: session.user.id, score, total },
  });

  await unlockAchievement(session.user.id, "daily_1");
  if (score === total) await unlockAchievement(session.user.id, "perfect_score");

  const xp = score === total ? XP_REWARDS.quiz_perfect : XP_REWARDS.daily_challenge;
  await awardXp(session.user.id, score === total ? "quiz_perfect" : "daily_challenge", xp);

  // Mark the challenge as done for today (gates replays + double XP)
  await db.userStreak.upsert({
    where: { userId: session.user.id },
    update: { lastChallengeDate: today() },
    create: { userId: session.user.id, lastChallengeDate: today() },
  });

  streak = await db.userStreak.findUnique({ where: { userId: session.user.id } });

  return NextResponse.json({
    success: true,
    xp,
    perfect: score === total,
    streak: streak?.currentStreak ?? 1,
    totalXp: streak?.totalXp ?? xp,
  });
}
