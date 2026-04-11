import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST: Submit an answer (student)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const { participantId, answerIndex } = await req.json();

  if (!participantId || answerIndex === undefined) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const session = await db.classroomSession.findUnique({ where: { code } });
  if (!session || session.status !== "question") {
    return NextResponse.json({ error: "Not accepting answers" }, { status: 400 });
  }

  const participant = await db.classroomParticipant.findUnique({
    where: { id: participantId },
  });
  if (!participant || participant.sessionId !== session.id) {
    return NextResponse.json({ error: "Invalid participant" }, { status: 403 });
  }

  // Check if already answered this question
  const existingAnswers = JSON.parse(participant.answers);
  if (existingAnswers.some((a: { questionIndex: number }) => a.questionIndex === session.currentQuestion)) {
    return NextResponse.json({ error: "Already answered" }, { status: 409 });
  }

  // Check correctness
  const questions = JSON.parse(session.quizData);
  const currentQ = questions[session.currentQuestion];

  let correct = false;
  if (currentQ.type === "mcq") {
    correct = answerIndex === currentQ.correctIndex;
  } else if (currentQ.type === "tf") {
    // True = 0, False = 1
    const playerAnswer = answerIndex === 0;
    correct = playerAnswer === currentQ.correct;
  }

  // Points: 100 for correct, 0 for wrong
  const points = correct ? 100 : 0;

  existingAnswers.push({
    questionIndex: session.currentQuestion,
    answerIndex,
    correct,
    points,
  });

  await db.classroomParticipant.update({
    where: { id: participantId },
    data: {
      answers: JSON.stringify(existingAnswers),
      score: participant.score + points,
    },
  });

  return NextResponse.json({ correct, points, newScore: participant.score + points });
}
