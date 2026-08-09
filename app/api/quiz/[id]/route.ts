import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    return NextResponse.json({
      id: quiz.id,
      topic: quiz.topic,
      data,
      theme: quiz.theme,
      isOwner: quiz.userId === session?.user?.id,
      score: quiz.score,
      total: quiz.total,
      shareId: quiz.shareId,
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
