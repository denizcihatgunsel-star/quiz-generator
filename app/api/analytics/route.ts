import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all quizzes for this user
  const quizzes = await db.savedQuiz.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  // Parse quiz data to extract topic-level performance
  const topicPerformance: Record<string, { scores: number[]; total: number; quizCount: number }> = {};
  const difficultyBreakdown: Record<string, { correct: number; total: number }> = {
    Easy: { correct: 0, total: 0 },
    Medium: { correct: 0, total: 0 },
    Hard: { correct: 0, total: 0 },
  };
  const bloomBreakdown: Record<string, { correct: number; total: number }> = {
    Remember: { correct: 0, total: 0 },
    Understand: { correct: 0, total: 0 },
    Apply: { correct: 0, total: 0 },
    Analyze: { correct: 0, total: 0 },
    Evaluate: { correct: 0, total: 0 },
  };

  const weeklyActivity: Record<string, number> = {};

  for (const quiz of quizzes) {
    // Topic performance
    if (!topicPerformance[quiz.topic]) {
      topicPerformance[quiz.topic] = { scores: [], total: 0, quizCount: 0 };
    }
    topicPerformance[quiz.topic].quizCount++;

    if (quiz.score !== null && quiz.total !== null) {
      topicPerformance[quiz.topic].scores.push(
        Math.round((quiz.score / quiz.total) * 100)
      );
      topicPerformance[quiz.topic].total += quiz.total;
    }

    // Weekly activity
    const weekKey = quiz.createdAt.toISOString().slice(0, 10);
    weeklyActivity[weekKey] = (weeklyActivity[weekKey] || 0) + 1;

    // Parse quiz data for difficulty/bloom breakdown
    try {
      const data = JSON.parse(quiz.data);
      const allQuestions = [
        ...(data.multipleChoice || []),
        ...(data.fillInTheBlank || []),
        ...(data.trueFalse || []),
      ];

      for (const q of allQuestions) {
        if (q.difficulty && difficultyBreakdown[q.difficulty]) {
          difficultyBreakdown[q.difficulty].total++;
        }
        if (q.bloomLevel && bloomBreakdown[q.bloomLevel]) {
          bloomBreakdown[q.bloomLevel].total++;
        }
      }
    } catch {
      // skip malformed data
    }
  }

  // Build topic summary
  const topics = Object.entries(topicPerformance).map(([topic, data]) => ({
    topic,
    quizCount: data.quizCount,
    avgScore: data.scores.length > 0
      ? Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length)
      : null,
    totalQuestions: data.total,
  }));

  // Streak data
  const streak = await db.userStreak.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json({
    totalQuizzes: quizzes.length,
    scoredQuizzes: quizzes.filter((q) => q.score !== null).length,
    topics,
    difficultyBreakdown,
    bloomBreakdown,
    weeklyActivity,
    streak: streak
      ? {
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak,
          totalXp: streak.totalXp,
          level: streak.level,
        }
      : null,
  });
}
