import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, ensureVerificationColumns } from "@/lib/db";

const BOX_INTERVALS_DAYS = [1, 2, 4, 8, 16];

function hoursFromNow(h: number): Date {
  return new Date(Date.now() + h * 3600 * 1000);
}

// POST: save missed questions into Smart Review
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await ensureVerificationColumns();
    const { quizId, topic, items } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided." }, { status: 400 });
    }

    const dueDate = hoursFromNow(20);
    let saved = 0;

    for (const item of items.slice(0, 12)) {
      if (!item?.refId || !item?.question?.question || !Array.isArray(item.question.options)) {
        continue;
      }
      await db.questionReview.upsert({
        where: {
          userId_refId: { userId: session.user.id, refId: String(item.refId) },
        },
        update: {
          box: 1,
          dueDate,
          payload: JSON.stringify(item.question),
          topic: typeof topic === "string" ? topic.slice(0, 120) : "",
          quizId: typeof quizId === "string" ? quizId.slice(0, 64) : "",
        },
        create: {
          userId: session.user.id,
          refId: String(item.refId).slice(0, 128),
          quizId: typeof quizId === "string" ? quizId.slice(0, 64) : "",
          topic: typeof topic === "string" ? topic.slice(0, 120) : "",
          payload: JSON.stringify(item.question),
          box: 1,
          dueDate,
        },
      });
      saved++;
    }

    return NextResponse.json({ saved });
  } catch (err) {
    console.error("Review save error:", err);
    return NextResponse.json({ error: "Failed to save review items." }, { status: 500 });
  }
}

// GET: due review items
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await ensureVerificationColumns();
    const now = new Date();
    const [dueItems, totalCount] = await Promise.all([
      db.questionReview.findMany({
        where: { userId: session.user.id, dueDate: { lte: now } },
        orderBy: { dueDate: "asc" },
        take: 3,
      }),
      db.questionReview.count({ where: { userId: session.user.id, dueDate: { lte: now } } }),
    ]);

    return NextResponse.json({
      items: dueItems.map((item) => ({
        id: item.id,
        topic: item.topic,
        box: item.box,
        ...JSON.parse(item.payload),
      })),
      dueCount: totalCount,
    });
  } catch (err) {
    console.error("Review fetch error:", err);
    return NextResponse.json({ error: "Failed to load review items." }, { status: 500 });
  }
}

// PATCH: grade a reviewed question — Leitner boxes until mastered
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await ensureVerificationColumns();
    const { id, correct } = await req.json();
    if (!id || typeof correct !== "boolean") {
      return NextResponse.json({ error: "Invalid answer." }, { status: 400 });
    }

    const item = await db.questionReview.findFirst({
      where: { id, userId: session.user.id },
    });
    if (!item) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    if (correct) {
      const nextBox = Math.min(item.box + 1, BOX_INTERVALS_DAYS.length);
      await db.questionReview.update({
        where: { id: item.id },
        data: {
          box: nextBox,
          dueDate: hoursFromNow(BOX_INTERVALS_DAYS[nextBox - 1] * 24 - 4),
        },
      });
      return NextResponse.json({ mastered: nextBox >= BOX_INTERVALS_DAYS.length, box: nextBox });
    }

    await db.questionReview.update({
      where: { id: item.id },
      data: { box: 1, dueDate: hoursFromNow(20) },
    });
    return NextResponse.json({ mastered: false, box: 1 });
  } catch (err) {
    console.error("Review answer error:", err);
    return NextResponse.json({ error: "Failed to grade." }, { status: 500 });
  }
}