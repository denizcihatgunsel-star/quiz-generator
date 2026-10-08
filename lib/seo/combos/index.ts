/**
 * Central export for all combo data
 */
import { VOCABULARY_COMBOS } from "./vocabulary";
import { MATH_COMBOS } from "./math";
import type { ComboData } from "./types";

// Subject combo map
export const SUBJECT_COMBOS: Record<string, ComboData[]> = {
  vocabulary: VOCABULARY_COMBOS,
  math: MATH_COMBOS,
  spanish: [], // TODO
  biology: [], // TODO
  chemistry: [], // TODO
  english: [], // TODO
  spelling: [], // TODO
  grammar: [], // TODO
  algebra: [], // TODO
  geometry: [], // TODO
  "world-history": [], // TODO
  french: [], // TODO
};

// Exam combo map
export const EXAM_COMBOS: Record<string, ComboData[]> = {
  "ap-us-history": [], // TODO
  "ap-psychology": [], // TODO
};

export { VOCABULARY_COMBOS, MATH_COMBOS };
export * from "./types";
