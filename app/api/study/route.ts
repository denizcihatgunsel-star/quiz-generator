import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, ensureVerificationColumns } from "@/lib/db";
import {
  recordMissesToStudy,
  getDueConcepts,
  countDueConcepts,
  gradeStudyReview,
  bloomNumberToName,
} from "@/lib/study";
import { MultipleChoiceQuestion } from "@/types/quiz";

// POST: record missed questions into Study Mode
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureVerificationColumns();
    const { quizId, topic, missed } = await req.json();

    if (!Array.isArray(missed) || missed.length === 0) {
      return NextResponse.json({ error: "No misses provided" }, { status: 400 });
    }

    const saved = await recordMissesToStudy(
      session.user.id,
      quizId || "",
      topic || "",
      missed
    );

    return NextResponse.json({ saved });
  } catch (err: any) {
    console.error("Study Mode POST error:", err);
    // Graceful failure if StudyConcept table doesn't exist yet
    if (err?.message?.includes("no such table") || err?.message?.includes("StudyConcept")) {
      return NextResponse.json({ saved: 0, error: "Study Mode not yet available" }, { status: 200 });
    }
    return NextResponse.json({ error: "Failed to record misses" }, { status: 500 });
  }
}

// GET: get due Study Mode items for review
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureVerificationColumns();
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "count") {
      const count = await countDueConcepts(session.user.id);
      
      // Also get pending (uncleared) count and next due date
      const pending = await db.studyConcept.count({
        where: { userId: session.user.id, cleared: false },
      });
      
      let nextDue: string | null = null;
      if (pending > count) {
        const nextConcept = await db.studyConcept.findFirst({
          where: { 
            userId: session.user.id, 
            cleared: false,
            dueDate: { gt: new Date() },
          },
          orderBy: { dueDate: "asc" },
        });
        if (nextConcept) {
          const due = new Date(nextConcept.dueDate);
          const now = new Date();
          const diffDays = Math.ceil((due.getTime() - now.getTime()) / (24 * 3600 * 1000));
          if (diffDays === 1) {
            nextDue = "tomorrow";
          } else if (diffDays < 7) {
            nextDue = `in ${diffDays} days`;
          } else {
            nextDue = due.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          }
        }
      }
      
      return NextResponse.json({ dueCount: count, pendingCount: pending, nextDue });
    }

    // Default: return due concepts
    const concepts = await getDueConcepts(session.user.id, 10);

    // For each concept, fetch an approved GeneratedItem matching the concept at target Bloom
    const items: Array<{
      conceptId: string;
      concept: string;
      bloom: string;
      question: MultipleChoiceQuestion;
    }> = [];
    
    const skippedConcepts: string[] = [];

    for (const concept of concepts) {
      const targetBloom = bloomNumberToName(concept.currentBloom);
      const fallbackBloom = bloomNumberToName(concept.originalBloom);

      // Find approved MCQ GeneratedItems at the target Bloom level
      // Match by concept key (normalized from question text or concept tag)
      const approvedItems = await db.generatedItem.findMany({
        where: {
          reviewStatus: "approved",
          itemType: "mcq",
          bloomLevel: targetBloom,
          draftSet: {
            userId: session.user.id,
          },
        },
        include: {
          draftSet: true,
        },
        take: 20,
      });

      let question: MultipleChoiceQuestion | null = null;

      // Try to match by concept key in payload
      for (const item of approvedItems) {
        try {
          const payload = JSON.parse(item.payload);
          // Check if this item's normalized key matches the concept
          // For now, we'll match by bloom level and let the first one be selected
          // A better approach would normalize the question text and compare
          if (payload.question && Array.isArray(payload.options)) {
            question = {
              id: payload.id || item.id,
              question: payload.question,
              options: payload.options,
              correctIndex: payload.correctIndex ?? 0,
              explanation: payload.explanation || "",
              difficulty: payload.difficulty || "Medium",
              bloomLevel: targetBloom as any,
            };
            break;
          }
        } catch {
          // skip invalid JSON
        }
      }

      // Fallback: try originalBloom if no match at currentBloom
      if (!question && targetBloom !== fallbackBloom) {
        const fallbackItems = await db.generatedItem.findMany({
          where: {
            reviewStatus: "approved",
            itemType: "mcq",
            bloomLevel: fallbackBloom,
            draftSet: {
              userId: session.user.id,
            },
          },
          include: {
            draftSet: true,
          },
          take: 20,
        });

        for (const item of fallbackItems) {
          try {
            const payload = JSON.parse(item.payload);
            if (payload.question && Array.isArray(payload.options)) {
              question = {
                id: payload.id || item.id,
                question: payload.question,
                options: payload.options,
                correctIndex: payload.correctIndex ?? 0,
                explanation: payload.explanation || "",
                difficulty: payload.difficulty || "Medium",
                bloomLevel: fallbackBloom as any,
              };
              break;
            }
          } catch {
            // skip
          }
        }
      }

      // If still no approved question, skip this concept (don't serve fake content)
      if (question) {
        items.push({
          conceptId: concept.id,
          concept: concept.concept,
          bloom: targetBloom,
          question,
        });
      } else {
        skippedConcepts.push(concept.concept);
      }
    }

    const totalDue = await countDueConcepts(session.user.id);

    return NextResponse.json({
      items,
      dueCount: totalDue,
      ...(skippedConcepts.length > 0 && {
        message: "Some concepts don't have a review question yet",
        skipped: skippedConcepts.length,
      }),
    });
  } catch (err: any) {
    console.error("Study Mode GET error:", err);
    // Graceful failure if StudyConcept table doesn't exist yet
    if (err?.message?.includes("no such table") || err?.message?.includes("StudyConcept")) {
      return NextResponse.json({ items: [], dueCount: 0, pendingCount: 0, nextDue: null }, { status: 200 });
    }
    return NextResponse.json({ error: "Failed to load study items" }, { status: 500 });
  }
}

// PATCH: grade a Study Mode review
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureVerificationColumns();
    const { conceptId, correct } = await req.json();

    if (!conceptId || typeof correct !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const result = await gradeStudyReview(session.user.id, conceptId, correct);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Study Mode PATCH error:", err);
    // Graceful failure if StudyConcept table doesn't exist yet
    if (err?.message?.includes("no such table") || err?.message?.includes("StudyConcept")) {
      return NextResponse.json({ cleared: false, streak: 0 }, { status: 200 });
    }
    return NextResponse.json({ error: "Failed to grade review" }, { status: 500 });
  }
}
