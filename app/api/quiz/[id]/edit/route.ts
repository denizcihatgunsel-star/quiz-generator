import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// PATCH: Update quiz data (edit questions)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { data, topic } = await req.json();

    const quiz = await db.savedQuiz.findUnique({ where: { id } });
    if (!quiz || quiz.userId !== session.user.id) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (data) updateData.data = typeof data === "string" ? data : JSON.stringify(data);
    if (topic) updateData.topic = topic;

    await db.savedQuiz.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
