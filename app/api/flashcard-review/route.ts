import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { supermemo } from "supermemo";
import { awardXp, XP_REWARDS } from "@/lib/xp";

// GET: Fetch due flashcards for review
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const dueCards = await db.flashcardReview.findMany({
    where: {
      userId: session.user.id,
      dueDate: { lte: now },
    },
    orderBy: { dueDate: "asc" },
    take: 20,
  });

  const totalCards = await db.flashcardReview.count({
    where: { userId: session.user.id },
  });

  const dueCount = await db.flashcardReview.count({
    where: {
      userId: session.user.id,
      dueDate: { lte: now },
    },
  });

  return NextResponse.json({ cards: dueCards, totalCards, dueCount });
}

// POST: Submit a review grade for a card
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cardId, grade } = await req.json();
  // grade: 0-5 (0=complete blackout, 5=perfect)

  if (!cardId || grade === undefined || grade < 0 || grade > 5) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const card = await db.flashcardReview.findUnique({ where: { id: cardId } });
  if (!card || card.userId !== session.user.id) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  // Only due cards can be reviewed (prevents XP farming on the same card)
  const now = new Date();
  if (card.dueDate > now) {
    return NextResponse.json({ error: "This card is not due yet." }, { status: 400 });
  }
  const lastReviewedDay = card.lastReviewed?.toISOString().slice(0, 10);
  if (lastReviewedDay === now.toISOString().slice(0, 10)) {
    return NextResponse.json({ error: "Card already reviewed today." }, { status: 400 });
  }

  // Run SM-2 algorithm
  const result = supermemo(
    { interval: card.interval, repetition: card.repetition, efactor: card.efactor },
    grade
  );

  const nextDue = new Date();
  nextDue.setDate(nextDue.getDate() + result.interval);

  await db.flashcardReview.update({
    where: { id: cardId },
    data: {
      interval: result.interval,
      repetition: result.repetition,
      efactor: result.efactor,
      dueDate: nextDue,
      lastReviewed: new Date(),
    },
  });

  // Award XP for reviewing
  await awardXp(session.user.id, "flashcard_reviewed", XP_REWARDS.flashcard_reviewed);

  return NextResponse.json({
    interval: result.interval,
    nextDue: nextDue.toISOString(),
    efactor: result.efactor,
  });
}

// PUT: Add flashcards from a quiz to the review system
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { quizId, flashcards } = await req.json();

  if (!quizId || !Array.isArray(flashcards) || flashcards.length === 0) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  let added = 0;
  for (let i = 0; i < flashcards.length; i++) {
    const card = flashcards[i];
    try {
      await db.flashcardReview.create({
        data: {
          userId: session.user.id,
          quizId,
          cardIndex: i,
          front: card.front,
          back: card.back,
        },
      });
      added++;
    } catch {
      // Card already exists (unique constraint), skip
    }
  }

  return NextResponse.json({ added });
}
