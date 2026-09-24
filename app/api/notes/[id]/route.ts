import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

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
    const note = await db.note.findUnique({ where: { id } });
    if (!note || note.userId !== session.user.id) {
      return NextResponse.json({ error: "Note not found." }, { status: 404 });
    }

    const body = await req.json();
    const data: { content?: string; topic?: string; quizId?: string | null; shareId?: string | null } = {};
    if (typeof body.content === "string") data.content = body.content;
    if (typeof body.topic === "string") data.topic = body.topic;
    if ("quizId" in body) data.quizId = typeof body.quizId === "string" ? body.quizId : null;
    if ("shareId" in body) data.shareId = typeof body.shareId === "string" ? body.shareId : null;

    const updated = await db.note.update({ where: { id }, data });
    return NextResponse.json({ note: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const note = await db.note.findUnique({ where: { id } });
    if (!note || note.userId !== session.user.id) {
      return NextResponse.json({ error: "Note not found." }, { status: 404 });
    }

    await db.note.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}