import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { regenerateHookStub } from "@/lib/draftReview";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, ctx: Ctx) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const set = await db.draftQuizSet.findFirst({ where: { id, userId: session.user.id } });
  if (!set) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const itemId = body.itemId as string | undefined;
  if (!itemId) return NextResponse.json({ error: "Missing itemId" }, { status: 400 });

  const item = await db.generatedItem.findFirst({ where: { id: itemId, draftSetId: id } });
  if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  await db.generatedItem.update({
    where: { id: item.id },
    data: { reviewStatus: "draft" },
  });

  return NextResponse.json(regenerateHookStub(item.id));
}
