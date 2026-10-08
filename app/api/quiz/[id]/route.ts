import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, ensureVerificationColumns } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureVerificationColumns();
    
    const { id } = await params;
    const session = await auth();

    // Try by shareId first (public), then by id (owner only)
    let quiz = await db.savedQuiz.findUnique({ where: { shareId: id } });

    if (!quiz) {
      const byId = await db.savedQuiz.findUnique({ where: { id } });
      if (byId) {
        // Internal-id access requires ownership (or the quiz being public)
        if (byId.userId !== session?.user?.id && !byId.isPublic) {
          return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
        }
        quiz = byId;
      }
    }

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    let data: unknown;
    try {
      data = JSON.parse(quiz.data);
    } catch {
      return NextResponse.json({ error: "This quiz is corrupted." }, { status: 500 });
    }

    // Calculate exam seed if exam mode is enabled and user is taking the quiz
    let examSeed: number | undefined;
    if ((quiz as any).examModeEnabled && session?.user?.id) {
      // Get attempt count for this user on this quiz
      const attemptCount = await db.quizAttempt.count({
        where: {
          quizId: quiz.id,
          userId: session.user.id,
        },
      });
      // Derive deterministic seed from quizId + userId + attemptNumber
      const seedString = `${quiz.id}-${session.user.id}-${attemptCount + 1}`;
      let hash = 0;
      for (let i = 0; i < seedString.length; i++) {
        const char = seedString.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      examSeed = Math.abs(hash);
    }

    return NextResponse.json({
      id: quiz.id,
      topic: quiz.topic,
      data,
      theme: quiz.theme,
      isOwner: quiz.userId === session?.user?.id,
      score: quiz.score,
      total: quiz.total,
      shareId: quiz.shareId,
      examModeEnabled: (quiz as any).examModeEnabled ?? false,
      examTimeLimit: (quiz as any).examTimeLimit ?? null,
      examSeed,
      createdAt: quiz.createdAt,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const quiz = await db.savedQuiz.findUnique({ where: { id } });
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    if (quiz.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.savedQuiz.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
