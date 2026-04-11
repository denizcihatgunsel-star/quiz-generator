import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Get session state (polled by both host and players)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const session = await db.classroomSession.findUnique({
    where: { code },
    include: {
      participants: {
        orderBy: { score: "desc" },
      },
    },
  });

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const questions = JSON.parse(session.quizData);

  // Don't send correct answers to players — only send current question
  const currentQ = session.currentQuestion >= 0 && session.currentQuestion < questions.length
    ? {
        index: session.currentQuestion,
        question: questions[session.currentQuestion].question || questions[session.currentQuestion].statement,
        type: questions[session.currentQuestion].type,
        options: questions[session.currentQuestion].type === "mcq"
          ? questions[session.currentQuestion].options
          : ["True", "False"],
      }
    : null;

  return NextResponse.json({
    code: session.code,
    topic: session.topic,
    status: session.status,
    currentQuestion: session.currentQuestion,
    totalQuestions: session.totalQuestions,
    question: currentQ,
    participants: session.participants.map((p) => ({
      id: p.id,
      nickname: p.nickname,
      score: p.score,
    })),
  });
}

// POST: Join a session (student)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const { nickname } = await req.json();

  if (!nickname || nickname.trim().length < 1) {
    return NextResponse.json({ error: "Nickname required" }, { status: 400 });
  }

  const session = await db.classroomSession.findUnique({ where: { code } });
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  if (session.status === "finished") {
    return NextResponse.json({ error: "Session has ended" }, { status: 400 });
  }

  try {
    const participant = await db.classroomParticipant.create({
      data: {
        sessionId: session.id,
        nickname: nickname.trim(),
      },
    });
    return NextResponse.json({ participantId: participant.id, nickname: participant.nickname });
  } catch {
    return NextResponse.json({ error: "Nickname already taken" }, { status: 409 });
  }
}
