import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// POST: Advance to next question (host only)
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code } = await params;

  const classroom = await db.classroomSession.findUnique({ where: { code } });
  if (!classroom || classroom.hostId !== session.user.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const nextIndex = classroom.currentQuestion + 1;

  if (nextIndex >= classroom.totalQuestions) {
    // Quiz is finished
    await db.classroomSession.update({
      where: { code },
      data: { status: "finished", currentQuestion: nextIndex },
    });
    return NextResponse.json({ status: "finished" });
  }

  await db.classroomSession.update({
    where: { code },
    data: {
      currentQuestion: nextIndex,
      status: "question",
    },
  });

  return NextResponse.json({ currentQuestion: nextIndex, status: "question" });
}
