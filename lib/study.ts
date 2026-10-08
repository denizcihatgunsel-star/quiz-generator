import { db } from "@/lib/db";
import { MultipleChoiceQuestion } from "@/types/quiz";

// Bloom's Taxonomy levels (1-6 per spec)
export const BLOOM_LEVELS: Record<string, number> = {
  Remember: 1,
  Understand: 2,
  Apply: 3,
  Analyze: 4,
  Evaluate: 5,
  Create: 6,
};

const BLOOM_NAMES = ["", "Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];

export function bloomNameToNumber(name: string): number {
  return BLOOM_LEVELS[name] || 1;
}

export function bloomNumberToName(num: number): string {
  return BLOOM_NAMES[Math.max(1, Math.min(6, num))] || "Remember";
}

// Normalize a string into a short key for concept identification
function normalizeKey(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 5)
    .join("-");
}

/**
 * Derive a concept key from a question.
 * Concept = question's concept tag if present, else quiz topic + normalized question key.
 */
export function deriveConceptKey(
  question: MultipleChoiceQuestion,
  quizTopic: string,
  questionConcept?: string
): string {
  if (questionConcept?.trim()) {
    return normalizeKey(questionConcept.trim());
  }
  const qKey = normalizeKey(question.question);
  const topicKey = normalizeKey(quizTopic);
  return `${topicKey}:${qKey}`;
}

/**
 * Record missed questions into Study Mode.
 * - Stores one StudyConcept per unique concept
 * - Caps deck at 2x the number of misses
 * - On a weak distractor, re-serve at same bloom level
 */
export async function recordMissesToStudy(
  userId: string,
  quizId: string,
  quizTopic: string,
  missed: Array<{
    question: MultipleChoiceQuestion;
    concept?: string;
    distractorStrength?: number;
  }>
) {
  const concepts = new Map<string, { bloom: number; sourceQuizId: string; sourceTopic: string }>();

  for (const { question, concept: qConcept, distractorStrength } of missed) {
    const conceptKey = deriveConceptKey(question, quizTopic, qConcept);
    const baseBloom = bloomNameToNumber(question.bloomLevel);
    
    // Weak distractor (< 0.5) -> same level, else step up
    const isWeakDistractor = typeof distractorStrength === "number" && distractorStrength < 0.5;
    const targetBloom = isWeakDistractor ? baseBloom : Math.min(baseBloom + 1, 6);

    if (!concepts.has(conceptKey)) {
      concepts.set(conceptKey, {
        bloom: targetBloom,
        sourceQuizId: quizId,
        sourceTopic: quizTopic,
      });
    }
  }

  // Cap at 2x the number of misses
  const cap = Math.min(concepts.size, missed.length * 2);
  const toSave = Array.from(concepts.entries()).slice(0, cap);

  for (const [conceptKey, { bloom, sourceQuizId, sourceTopic }] of toSave) {
    // Get the baseBloom from the original question for originalBloom tracking
    const originalMiss = missed.find(m => deriveConceptKey(m.question, quizTopic, m.concept) === conceptKey);
    const baseBloom = originalMiss ? bloomNameToNumber(originalMiss.question.bloomLevel) : bloom;
    
    await db.studyConcept.upsert({
      where: { userId_concept: { userId, concept: conceptKey } },
      update: {
        currentBloom: bloom,
        dueDate: new Date(),
        updatedAt: new Date(),
      },
      create: {
        userId,
        concept: conceptKey,
        originalBloom: baseBloom,  // Original level of the missed question
        currentBloom: bloom,        // Stepped-up level to serve
        sourceQuizId,
        sourceTopic,
        dueDate: new Date(),
        correctStreak: 0,
        missStreak: 0,
        cleared: false,
      },
    });
  }

  return toSave.length;
}

/**
 * Get due Study Mode concepts for a user.
 * Returns only uncleared concepts where dueDate <= now.
 */
export async function getDueConcepts(userId: string, limit = 10) {
  const now = new Date();
  return db.studyConcept.findMany({
    where: {
      userId,
      cleared: false,
      dueDate: { lte: now },
    },
    orderBy: { dueDate: "asc" },
    take: limit,
  });
}

/**
 * Count due (uncleared) Study Mode concepts for a user.
 */
export async function countDueConcepts(userId: string): Promise<number> {
  const now = new Date();
  return db.studyConcept.count({
    where: {
      userId,
      cleared: false,
      dueDate: { lte: now },
    },
  });
}

/**
 * Grade a Study Mode review.
 * - Correct: reset missStreak to 0, increment correctStreak, schedule next due >= 24h later
 * - 2nd correct must be in a LATER session (>= 1 day after first) -> clears
 * - Wrong: increment missStreak, reset correctStreak to 0, schedule due now
 * - Drop-back rule: if missStreak reaches 2 while currentBloom > originalBloom,
 *   drop currentBloom to originalBloom and reset missStreak to 0
 */
export async function gradeStudyReview(
  userId: string,
  conceptId: string,
  correct: boolean
): Promise<{ cleared: boolean; streak: number }> {
  const concept = await db.studyConcept.findFirst({
    where: { id: conceptId, userId },
  });
  if (!concept) {
    throw new Error("Concept not found");
  }

  const now = new Date();

  if (correct) {
    const newStreak = concept.correctStreak + 1;
    const firstCorrectAt = concept.firstCorrectAt || now;
    const nextDue = new Date(now.getTime() + 24 * 3600 * 1000); // 24h later

    // Check if this is the 2nd correct AND it's in a later session (>= 1 day after first)
    const daysSinceFirst = concept.firstCorrectAt
      ? (now.getTime() - concept.firstCorrectAt.getTime()) / (24 * 3600 * 1000)
      : 0;
    const shouldClear = newStreak >= 2 && daysSinceFirst >= 1;

    await db.studyConcept.update({
      where: { id: conceptId },
      data: {
        correctStreak: newStreak,
        missStreak: 0, // Reset miss streak on correct
        firstCorrectAt,
        lastReviewedAt: now,
        dueDate: shouldClear ? now : nextDue,
        cleared: shouldClear,
        updatedAt: now,
      },
    });

    return { cleared: shouldClear, streak: newStreak };
  } else {
    // Wrong: increment miss streak, reset correct streak
    const newMissStreak = concept.missStreak + 1;
    
    // Drop-back rule: 2 consecutive misses at stepped-up level drops to original
    let newCurrentBloom = concept.currentBloom;
    let finalMissStreak = newMissStreak;
    
    if (newMissStreak >= 2 && concept.currentBloom > concept.originalBloom) {
      newCurrentBloom = concept.originalBloom;
      finalMissStreak = 0; // Reset miss streak after drop
    }
    
    await db.studyConcept.update({
      where: { id: conceptId },
      data: {
        correctStreak: 0,
        missStreak: finalMissStreak,
        currentBloom: newCurrentBloom,
        firstCorrectAt: null,
        lastReviewedAt: now,
        dueDate: now,
        updatedAt: now,
      },
    });

    return { cleared: false, streak: 0 };
  }
}
