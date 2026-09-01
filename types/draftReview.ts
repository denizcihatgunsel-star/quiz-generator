export type ItemType = "mcq" | "flashcard" | "fitb" | "true_false";
export type ReviewStatus = "draft" | "approved" | "rejected";

export type BloomLevel = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate";

/** Per-item metadata for the draft-review / anti-hallucination tray */
export interface GeneratedItemMeta {
  itemType: ItemType;
  bloomLevel: BloomLevel;
  bloomRationale?: string;
  ocrUsed?: boolean;
  sourceConfidence?: number; // 0..1
  distractorStrength?: number; // 0..1, MCQ only
  reviewStatus: ReviewStatus;
  reviewerNotes?: string;
  rejectionReason?: string;
  sortOrder?: number;
}

export interface DraftQuizSetInput {
  topic: string;
  sourceType?: "pdf" | "text" | "ocr" | "url" | "other";
  ocrUsed?: boolean;
  sourceConfidence?: number;
  /** Full quiz payload (same shape as QuizData JSON) */
  quizData: unknown;
  items?: Array<GeneratedItemMeta & { payload: unknown }>;
}

export const REVIEW_STATUSES: ReviewStatus[] = ["draft", "approved", "rejected"];

export function isReviewStatus(v: unknown): v is ReviewStatus {
  return typeof v === "string" && (REVIEW_STATUSES as string[]).includes(v);
}
