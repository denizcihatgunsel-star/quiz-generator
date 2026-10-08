import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, ensureVerificationColumns } from "@/lib/db";
import {
  recordMissesToStudy,
  getDueConcepts,
  countDueConcepts,
  gradeStudyReview,
  bloomNumberToName,
  deriveConceptKey,
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

    // For each concept, find a matching question from approved sources
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

      // Step 1: Get candidate pool from SavedQuiz
      // First try the source quiz, then other approved quizzes with same topic
      const savedQuizzes = await db.savedQuiz.findMany({
        where: {
          userId: session.user.id,
          topic: concept.sourceTopic,
          reviewStatus: "approved",
        },
        select: { id: true, data: true, draftSetId: true },
        take: 10,
      });

      // Sort to prioritize source quiz (client-side)
      savedQuizzes.sort((a, b) => {
        if (a.id === concept.sourceQuizId) return -1;
        if (b.id === concept.sourceQuizId) return 1;
        return 0;
      });

      // Also get approved GeneratedItems for this user
      const generatedItems = await db.generatedItem.findMany({
        where: {
          reviewStatus: "approved",
          itemType: "mcq",
          draftSet: {
            userId: session.user.id,
          },
        },
        include: {
          draftSet: true,
        },
        take: 20,
      });

      // Build candidate pool
      const candidates: Array<{
        question: MultipleChoiceQuestion;
        bloomLevel: string;
        source: "savedQuiz" | "generatedItem";
      }> = [];

      // Add questions from SavedQuiz.data
      for (const quiz of savedQuizzes) {
        try {
          const data = JSON.parse(quiz.data);
          const questions = data.multipleChoice || data.questions || [];
          
          // If this quiz has a draftSetId, load GeneratedItems to verify reviewStatus
          let draftSetItems: Array<{ payload: string; reviewStatus: string }> = [];
          if (quiz.draftSetId) {
            draftSetItems = await db.generatedItem.findMany({
              where: { draftSetId: quiz.draftSetId },
              select: { payload: true, reviewStatus: true },
            });
          }
          
          for (const q of questions) {
            if (!q.question || !Array.isArray(q.options)) continue;
            
            // If this quiz has a draftSetId, verify the matching GeneratedItem is approved
            if (quiz.draftSetId && draftSetItems.length > 0) {
              // Normalize question text for matching
              const normalizedQuestion = q.question.trim().toLowerCase().replace(/[^a-z0-9\s]/g, "");
              
              // Find matching GeneratedItem by normalized question text
              const matchingItem = draftSetItems.find((item) => {
                try {
                  const itemPayload = JSON.parse(item.payload);
                  const itemQuestion = (itemPayload.question || "").trim().toLowerCase().replace(/[^a-z0-9\s]/g, "");
                  return itemQuestion === normalizedQuestion;
                } catch {
                  return false;
                }
              });
              
              // Skip this question if its matching item is not approved
              if (matchingItem && matchingItem.reviewStatus !== "approved") {
                continue;
              }
              
              // Also skip if no matching item found (orphaned question)
              if (!matchingItem) {
                continue;
              }
            }
            
            candidates.push({
              question: q,
              bloomLevel: q.bloomLevel || "Remember",
              source: "savedQuiz",
            });
          }
        } catch {
          // skip invalid JSON
        }
      }

      // Add approved GeneratedItems
      for (const item of generatedItems) {
        try {
          const payload = JSON.parse(item.payload);
          if (!payload.question || !Array.isArray(payload.options)) continue;
          
          candidates.push({
            question: {
              id: payload.id || item.id,
              question: payload.question,
              options: payload.options,
              correctIndex: payload.correctIndex,
              explanation: payload.explanation || "",
              difficulty: payload.difficulty || "Medium",
              bloomLevel: item.bloomLevel as any,
            },
            bloomLevel: item.bloomLevel,
            source: "generatedItem",
          });
        } catch {
          // skip invalid JSON
        }
      }

      // Step 2: Match strictly on concept key
      const matchedCandidates = candidates.filter((c) => {
        const candidateKey = deriveConceptKey(
          c.question,
          concept.sourceTopic,
          undefined // concept tag would be in the question object if present
        );
        return candidateKey === concept.concept;
      });

      // Step 3: Prefer currentBloom, fall back to originalBloom
      let selectedQuestion: MultipleChoiceQuestion | null = null;

      // Try to find match at target bloom level
      const atTargetBloom = matchedCandidates.filter((c) => c.bloomLevel === targetBloom);
      if (atTargetBloom.length > 0) {
        const candidate = atTargetBloom[0];
        // Validate correctIndex
        if (
          typeof candidate.question.correctIndex === "number" &&
          candidate.question.correctIndex >= 0 &&
          candidate.question.correctIndex < candidate.question.options.length
        ) {
          selectedQuestion = candidate.question;
        }
      }

      // Fall back to original bloom
      if (!selectedQuestion && targetBloom !== fallbackBloom) {
        const atFallbackBloom = matchedCandidates.filter((c) => c.bloomLevel === fallbackBloom);
        if (atFallbackBloom.length > 0) {
          const candidate = atFallbackBloom[0];
          if (
            typeof candidate.question.correctIndex === "number" &&
            candidate.question.correctIndex >= 0 &&
            candidate.question.correctIndex < candidate.question.options.length
          ) {
            selectedQuestion = candidate.question;
          }
        }
      }

      // Step 4: Add to results or skip
      if (selectedQuestion) {
        items.push({
          conceptId: concept.id,
          concept: concept.concept,
          bloom: targetBloom,
          question: selectedQuestion,
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
