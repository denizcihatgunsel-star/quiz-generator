import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try by shareId first (public), then by id (owner only)
    let quiz = await db.savedQuiz.findUnique({ where: { shareId: id } });

    if (!quiz) {
      quiz = await db.savedQuiz.findUnique({ where: { id } });
    }

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    return NextResponse.json({
      id: quiz.id,
      topic: quiz.topic,
      data: JSON.parse(quiz.data),
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
