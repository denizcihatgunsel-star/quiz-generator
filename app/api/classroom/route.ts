import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// POST: Create a new classroom session from a saved quiz
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { quizId } = await req.json();
  if (!quizId) {
    return NextResponse.json({ error: "Missing quizId" }, { status: 400 });
  }

  const quiz = await db.savedQuiz.findUnique({ where: { id: quizId } });
  if (!quiz || quiz.userId !== session.user.id) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  // Parse quiz and extract MCQ + T/F questions (they work best for live mode)
  const data = JSON.parse(quiz.data);
  const questions = [
    ...(data.multipleChoice || []).map((q: Record<string, unknown>) => ({ ...q, type: "mcq" })),
    ...(data.trueFalse || []).map((q: Record<string, unknown>) => ({ ...q, type: "tf" })),
  ];

  if (questions.length === 0) {
    return NextResponse.json({ error: "Quiz has no multiple choice or true/false questions" }, { status: 400 });
  }

  // Generate 6-digit code
  const code = String(Math.floor(100000 + Math.random() * 900000));

  const classroom = await db.classroomSession.create({
    data: {
      hostId: session.user.id,
      code,
      topic: quiz.topic,
      quizData: JSON.stringify(questions),
      totalQuestions: questions.length,
    },
  });

  return NextResponse.json({ code: classroom.code, id: classroom.id });
}
