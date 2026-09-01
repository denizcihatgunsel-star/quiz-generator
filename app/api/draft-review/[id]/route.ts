import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  aggregateSetStatus,
  DraftReviewError,
  transitionReviewStatus,
} from "@/lib/draftReview";
import type { ReviewStatus } from "@/types/draftReview";
import { isReviewStatus } from "@/types/draftReview";

type Ctx = { params: Promise<{ id: string }> };

async function loadOwnedSet(userId: string, id: string) {
  return db.draftQuizSet.findFirst({
    where: { id, userId },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });
}

async function syncSetStatus(
  setId: string,
  opts?: { rejectionReason?: string; reviewerNotes?: string; forceStatus?: ReviewStatus }
) {
  const items = await db.generatedItem.findMany({ where: { draftSetId: setId } });
  const status =
    opts?.forceStatus ??
    aggregateSetStatus(items.map((i) => i.reviewStatus as ReviewStatus));
  return db.draftQuizSet.update({
    where: { id: setId },
    data: {
      reviewStatus: status,
      rejectionReason: status === "rejected" ? opts?.rejectionReason ?? undefined : null,
      reviewerNotes: typeof opts?.reviewerNotes === "string" ? opts.reviewerNotes : undefined,
    },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const set = await loadOwnedSet(session.user.id, id);
  if (!set) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ set });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const set = await loadOwnedSet(session.user.id, id);
  if (!set) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const body = await req.json();
    const action = body.action as string;

    if (action === "edit") {
      if (!body.itemId) return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
      const item = set.items.find((i) => i.id === body.itemId);
      if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });
      const updated = await db.generatedItem.update({
        where: { id: item.id },
        data: {
          payload: body.payload !== undefined ? JSON.stringify(body.payload) : undefined,
          bloomLevel: typeof body.bloomLevel === "string" ? body.bloomLevel : undefined,
          bloomRationale: typeof body.bloomRationale === "string" ? body.bloomRationale : undefined,
          distractorStrength: typeof body.distractorStrength === "number" ? body.distractorStrength : undefined,
          reviewerNotes: typeof body.notes === "string" ? body.notes : undefined,
          reviewStatus: "draft",
        },
      });
      const refreshed = await syncSetStatus(set.id);
      return NextResponse.json({ item: updated, set: refreshed });
    }

    const targetStatus: ReviewStatus | null =
      action === "approve" || action === "approve_set" ? "approved"
        : action === "reject" || action === "reject_set" ? "rejected"
          : action === "reset" ? "draft" : null;
    if (!targetStatus) return NextResponse.json({ error: "Unknown action" }, { status: 400 });

    if (action === "approve_set" || action === "reject_set") {
      for (const item of set.items) {
        const next = transitionReviewStatus(item.reviewStatus as ReviewStatus, targetStatus);
        await db.generatedItem.update({
          where: { id: item.id },
          data: {
            reviewStatus: next,
            rejectionReason: targetStatus === "rejected" ? (typeof body.reason === "string" ? body.reason : item.rejectionReason) : null,
            reviewerNotes: typeof body.notes === "string" ? body.notes : item.reviewerNotes,
          },
        });
      }
      const refreshed = await syncSetStatus(set.id, {
        rejectionReason: targetStatus === "rejected" ? body.reason : undefined,
        reviewerNotes: body.notes,
        forceStatus: targetStatus,
      });
      return NextResponse.json({ set: refreshed });
    }

    if (!body.itemId) return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
    const item = set.items.find((i) => i.id === body.itemId);
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });
    if (!isReviewStatus(item.reviewStatus)) {
      throw new DraftReviewError("INVALID_STATUS", `Bad stored status ${item.reviewStatus}`);
    }
    const next = transitionReviewStatus(item.reviewStatus, targetStatus);
    const updated = await db.generatedItem.update({
      where: { id: item.id },
      data: {
        reviewStatus: next,
        rejectionReason: targetStatus === "rejected" ? (typeof body.reason === "string" ? body.reason : "rejected") : null,
        reviewerNotes: typeof body.notes === "string" ? body.notes : item.reviewerNotes,
      },
    });
    const refreshed = await syncSetStatus(set.id);
    return NextResponse.json({ item: updated, set: refreshed });
  } catch (err) {
    if (err instanceof DraftReviewError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    console.error("draft-review PATCH", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
