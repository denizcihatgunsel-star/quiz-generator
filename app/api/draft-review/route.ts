import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { buildItemsFromQuizData, DraftReviewError } from "@/lib/draftReview";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const sets = await db.draftQuizSet.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      items: {
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          itemType: true,
          bloomLevel: true,
          bloomRationale: true,
          ocrUsed: true,
          sourceConfidence: true,
          distractorStrength: true,
          reviewStatus: true,
          sortOrder: true,
        },
      },
    },
  });
  return NextResponse.json({ sets });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const topic = typeof body.topic === "string" ? body.topic : body.quizData?.topic;
    if (!topic || !body.quizData) {
      return NextResponse.json({ error: "Missing topic or quizData" }, { status: 400 });
    }
    const ocrUsed = !!body.ocrUsed || !!body.quizData?.ocrUsed;
    const sourceConfidence =
      typeof body.sourceConfidence === "number"
        ? body.sourceConfidence
        : typeof body.quizData?.sourceConfidence === "number"
          ? body.quizData.sourceConfidence
          : undefined;
    const sourceType = typeof body.sourceType === "string" ? body.sourceType : ocrUsed ? "ocr" : "text";
    const built = buildItemsFromQuizData(body.quizData, { ocrUsed, sourceConfidence });
    if (built.length === 0) {
      return NextResponse.json({ error: "quizData has no items" }, { status: 400 });
    }
    const set = await db.draftQuizSet.create({
      data: {
        userId: session.user.id,
        topic,
        sourceType,
        ocrUsed,
        sourceConfidence,
        reviewStatus: "draft",
        quizData: JSON.stringify(body.quizData),
        items: {
          create: built.map((item) => ({
            itemType: item.itemType,
            payload: JSON.stringify(item.payload),
            bloomLevel: item.bloomLevel,
            bloomRationale: item.bloomRationale,
            ocrUsed: item.ocrUsed,
            sourceConfidence: item.sourceConfidence,
            distractorStrength: item.distractorStrength,
            reviewStatus: item.reviewStatus,
            sortOrder: item.sortOrder,
          })),
        },
      },
      include: { items: { orderBy: { sortOrder: "asc" } } },
    });
    return NextResponse.json({ set }, { status: 201 });
  } catch (err) {
    if (err instanceof DraftReviewError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    console.error("draft-review POST", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
