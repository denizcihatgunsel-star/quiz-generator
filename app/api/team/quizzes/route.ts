import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// GET: Get all quizzes from team members (shared library)
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { teamId: true },
  });

  if (!user?.teamId) {
    return NextResponse.json({ error: "Not in a team" }, { status: 403 });
  }

  // Get all team members
  const teamMembers = await db.user.findMany({
    where: { teamId: user.teamId },
    select: { id: true },
  });

  const memberIds = teamMembers.map((m) => m.id);

  // Get all quizzes from team members
  const quizzes = await db.savedQuiz.findMany({
    where: {
      userId: { in: memberIds },
    },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  return NextResponse.json({
    quizzes: quizzes.map((q) => ({
      id: q.id,
      topic: q.topic,
      shareId: q.shareId,
      author: q.user.name || q.user.email,
      score: q.score,
      total: q.total,
      isOwn: q.userId === session.user.id,
      createdAt: q.createdAt,
    })),
  });
}
