import type { BloomLevel, ItemType, ReviewStatus } from "@/types/draftReview";
import { isReviewStatus } from "@/types/draftReview";

const BLOOM: BloomLevel[] = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"];

export class DraftReviewError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

/** Hard rule: never auto-assign unreviewed (draft/rejected) sets to learners. */
export function assertCanAssignQuiz(input: { reviewStatus?: string | null; id?: string }) {
  const status = (input.reviewStatus ?? "approved") as string;
  if (status !== "approved") {
    throw new DraftReviewError(
      "UNREVIEWED_NOT_ASSIGNABLE",
      `Quiz${input.id ? ` ${input.id}` : ""} cannot be assigned while reviewStatus is "${status}". Only approved sets may be assigned.`,
      403
    );
  }
  return true;
}

export function canAssignQuiz(reviewStatus?: string | null): boolean {
  try {
    assertCanAssignQuiz({ reviewStatus });
    return true;
  } catch {
    return false;
  }
}

const ALLOWED: Record<ReviewStatus, ReviewStatus[]> = {
  draft: ["approved", "rejected", "draft"],
  approved: ["draft", "rejected"],
  rejected: ["draft", "approved"],
};

export function transitionReviewStatus(from: ReviewStatus, to: ReviewStatus): ReviewStatus {
  if (!isReviewStatus(from) || !isReviewStatus(to)) {
    throw new DraftReviewError("INVALID_STATUS", `Invalid review status transition ${from} → ${to}`);
  }
  if (!ALLOWED[from].includes(to)) {
    throw new DraftReviewError("INVALID_TRANSITION", `Cannot transition reviewStatus from ${from} to ${to}`);
  }
  return to;
}

export function normalizeBloom(level: unknown, fallback: BloomLevel = "Understand"): BloomLevel {
  if (typeof level === "string" && (BLOOM as string[]).includes(level)) return level as BloomLevel;
  return fallback;
}

export type BuiltItem = {
  itemType: ItemType;
  payload: unknown;
  bloomLevel: BloomLevel;
  bloomRationale?: string;
  ocrUsed: boolean;
  sourceConfidence?: number;
  distractorStrength?: number;
  reviewStatus: ReviewStatus;
  sortOrder: number;
};

function mcqDistractorStrength(options: unknown, correctIndex: unknown): number | undefined {
  if (!Array.isArray(options) || typeof correctIndex !== "number") return undefined;
  const n = options.length;
  if (n < 2) return 0.2;
  // Heuristic placeholder until a real scorer lands: more options ⇒ slightly stronger set.
  return Math.min(1, Math.max(0.35, (n - 1) / 4));
}

/** Flatten QuizData-like JSON into GeneratedItem rows (all start as draft). */
export function buildItemsFromQuizData(
  quizData: any,
  opts: { ocrUsed?: boolean; sourceConfidence?: number } = {}
): BuiltItem[] {
  const items: BuiltItem[] = [];
  let order = 0;
  const ocrUsed = !!opts.ocrUsed;
  const sourceConfidence = opts.sourceConfidence;

  for (const q of quizData?.multipleChoice || []) {
    items.push({
      itemType: "mcq",
      payload: q,
      bloomLevel: normalizeBloom(q.bloomLevel),
      bloomRationale: typeof q.bloomRationale === "string" ? q.bloomRationale : undefined,
      ocrUsed,
      sourceConfidence,
      distractorStrength:
        typeof q.distractorStrength === "number"
          ? q.distractorStrength
          : mcqDistractorStrength(q.options, q.correctIndex),
      reviewStatus: "draft",
      sortOrder: order++,
    });
  }
  for (const q of quizData?.flashcards || []) {
    items.push({
      itemType: "flashcard",
      payload: q,
      bloomLevel: normalizeBloom(q.bloomLevel, "Remember"),
      bloomRationale: typeof q.bloomRationale === "string" ? q.bloomRationale : "Flashcard active-recall pair",
      ocrUsed,
      sourceConfidence,
      reviewStatus: "draft",
      sortOrder: order++,
    });
  }
  for (const q of quizData?.fillInTheBlank || []) {
    items.push({
      itemType: "fitb",
      payload: q,
      bloomLevel: normalizeBloom(q.bloomLevel),
      bloomRationale: typeof q.bloomRationale === "string" ? q.bloomRationale : undefined,
      ocrUsed,
      sourceConfidence,
      reviewStatus: "draft",
      sortOrder: order++,
    });
  }
  for (const q of quizData?.trueFalse || []) {
    items.push({
      itemType: "true_false",
      payload: q,
      bloomLevel: normalizeBloom(q.bloomLevel),
      bloomRationale: typeof q.bloomRationale === "string" ? q.bloomRationale : undefined,
      ocrUsed,
      sourceConfidence,
      reviewStatus: "draft",
      sortOrder: order++,
    });
  }
  return items;
}

/** Aggregate set status from items: any draft ⇒ draft; else any rejected ⇒ rejected; else approved. */
export function aggregateSetStatus(itemStatuses: ReviewStatus[]): ReviewStatus {
  if (itemStatuses.length === 0) return "draft";
  if (itemStatuses.some((s) => s === "draft")) return "draft";
  if (itemStatuses.some((s) => s === "rejected")) return "rejected";
  return "approved";
}

export function regenerateHookStub(itemId: string) {
  return {
    ok: true as const,
    itemId,
    message: "regenerate hook — wire LLM later",
  };
}
