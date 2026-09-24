import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, ensureVerificationColumns } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const quizId = new URL(req.url).searchParams.get("quizId");
    const notes = await db.note.findMany({
      where: { userId: session.user.id, ...(quizId ? { quizId } : {}) },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ notes });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureVerificationColumns();
    const body = await req.json();
    const content = typeof body.content === "string" ? body.content : "";
    const topic = typeof body.topic === "string" ? body.topic : "";
    const quizId = typeof body.quizId === "string" && body.quizId ? body.quizId : null;
    const shareId = typeof body.shareId === "string" && body.shareId ? body.shareId : null;

    if (!content.trim() && !topic) {
      return NextResponse.json({ error: "Note cannot be empty." }, { status: 400 });
    }

    const note = await db.note.create({
      data: {
        userId: session.user.id,
        content,
        topic,
        quizId,
        shareId,
      },
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}