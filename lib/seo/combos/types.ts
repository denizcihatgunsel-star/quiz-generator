/**
 * Combo page types: subject × tool intent (e.g., /subjects/biology/flashcards).
 * Each combo delivers practice, not just a tool pitch.
 */

export type ComboType =
  | "flashcards"
  | "practice-questions"
  | "quiz"
  | "worksheet-generator"
  | "quiz-generator";

export interface ComboMeta {
  type: ComboType;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  monthlyVolume?: number;
}

export interface SampleItem {
  q: string;
  a: string;
  explanation: string;
  bloomLevel?: "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";
  type?: "multiple-choice" | "true-false" | "fill-in-blank";
}

export interface ComboData {
  slug: string;
  type: ComboType;
  meta: ComboMeta;
  h1: string;
  intro: string;
  sampleItems: SampleItem[];
  topicsCovered: string[];
  studyTips: {
    workflow: string[];
    tips: string[];
  };
  faq: { q: string; a: string }[];
  relatedPages: string[];
}

export const COMBO_TYPE_LABELS: Record<ComboType, string> = {
  flashcards: "Flashcards",
  "practice-questions": "Practice Questions",
  quiz: "Quiz",
  "worksheet-generator": "Worksheet Generator",
  "quiz-generator": "Quiz Generator",
};

export const COMBO_TYPE_TOOL_PAGES: Record<ComboType, string> = {
  flashcards: "/ai-flashcards",
  "practice-questions": "/practice-test-generator",
  quiz: "/ai-quiz-generator",
  "worksheet-generator": "/features/worksheet-generator",
  "quiz-generator": "/ai-quiz-generator",
};
