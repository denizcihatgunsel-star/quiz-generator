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
      return NextResponse.json({ dueCount: count });
    }

    // Default: return due concepts
    const concepts = await getDueConcepts(session.user.id, 10);

    // For each concept, fetch a representative question at the target Bloom level
    const items = await Promise.all(
      concepts.map(async (concept) => {
        const targetBloom = bloomNumberToName(concept.currentBloom);

        // Find user's own quizzes that match the source topic and have approved items at this Bloom level
        const quizzes = await db.savedQuiz.findMany({
          where: {
            userId: session.user.id,
            topic: { contains: concept.sourceTopic },
            reviewStatus: "approved",
          },
          select: { id: true, data: true },
          take: 5,
        });

        let question: MultipleChoiceQuestion | null = null;

        for (const quiz of quizzes) {
          try {
            const data = JSON.parse(quiz.data);
            const mcqs = data.multipleChoice || [];
            const match = mcqs.find(
              (q: MultipleChoiceQuestion) => q.bloomLevel === targetBloom
            );
            if (match) {
              question = match;
              break;
            }
          } catch {
            // skip invalid JSON
          }
        }

        // If no existing question found, we'd need to generate one via the existing generation path
        // For now, return a placeholder to avoid blocking free users
        if (!question) {
          question = {
            id: `gen-${concept.id}`,
            question: `Review concept: ${concept.concept} (${targetBloom})`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctIndex: 0,
            explanation: "This is a placeholder for a generated question.",
            difficulty: "Medium" as const,
            bloomLevel: targetBloom as any,
          };
        }

        return {
          conceptId: concept.id,
          concept: concept.concept,
          bloom: targetBloom,
          question,
        };
      })
    );

    const totalDue = await countDueConcepts(session.user.id);

    return NextResponse.json({
      items,
      dueCount: totalDue,
    });
  } catch (err: any) {
    console.error("Study Mode GET error:", err);
    // Graceful failure if StudyConcept table doesn't exist yet
    if (err?.message?.includes("no such table") || err?.message?.includes("StudyConcept")) {
      return NextResponse.json({ items: [], dueCount: 0 }, { status: 200 });
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
