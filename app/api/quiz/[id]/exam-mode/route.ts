import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, ensureVerificationColumns } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureVerificationColumns();
  
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { examModeEnabled, examTimeLimit } = await req.json();

  const quiz = await db.savedQuiz.findUnique({ where: { id } });
  if (!quiz || quiz.userId !== session.user.id) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  await db.savedQuiz.update({
    where: { id },
    data: {
      examModeEnabled: Boolean(examModeEnabled),
      examTimeLimit: examTimeLimit && examTimeLimit > 0 ? examTimeLimit : null,
    },
  });

  return NextResponse.json({ success: true });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureVerificationColumns();
  
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const quiz = await db.savedQuiz.findUnique({ 
    where: { id },
    select: {
      examModeEnabled: true,
      examTimeLimit: true,
      userId: true,
    }
  });

  if (!quiz || quiz.userId !== session.user.id) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json({
    examModeEnabled: quiz.examModeEnabled ?? false,
    examTimeLimit: quiz.examTimeLimit ?? null,
  });
}
