import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// GET: attempt history for a quiz (retake & compare)
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const quiz = await db.savedQuiz.findUnique({ where: { id } });
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  const attempts = await db.quizAttempt.findMany({
    where: {
      quizId: id,
      ...(quiz.userId !== session.user.id ? { userId: session.user.id } : {}),
    },
    orderBy: { createdAt: "asc" },
    take: 50,
  });

  return NextResponse.json({
    isOwner: quiz.userId === session.user.id,
    attempts: attempts.map((a) => ({
      id: a.id,
      score: a.score,
      total: a.total,
      percent: Math.round((a.score / a.total) * 100),
      createdAt: a.createdAt,
    })),
  });
}
