import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, ensureVerificationColumns } from "@/lib/db";

// GET: attempt history for a quiz (retake & compare)
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureVerificationColumns();
  
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

  const isOwner = quiz.userId === session.user.id;
  
  // If owner, fetch user info for each attempt
  let attemptsWithUsers: any[] = attempts;
  if (isOwner) {
    const userIds = [...new Set(attempts.map(a => (a as any).userId))];
    const users = await db.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true },
    });
    const userMap = new Map(users.map(u => [u.id, u]));
    
    attemptsWithUsers = attempts.map(a => {
      const user = userMap.get((a as any).userId);
      return {
        ...a,
        userName: user?.name ?? user?.email ?? 'Unknown',
      };
    });
  }
  
  return NextResponse.json({
    isOwner,
    attempts: attemptsWithUsers.map((a) => ({
      id: a.id,
      userId: (a as any).userId,
      userName: isOwner ? a.userName : undefined,
      score: a.score,
      total: a.total,
      percent: Math.round((a.score / a.total) * 100),
      tabSwitchCount: isOwner ? ((a as any).tabSwitchCount ?? 0) : undefined,
      createdAt: a.createdAt,
    })),
  });
}
