/**
 * Central export for all combo data
 */
import { VOCABULARY_COMBOS } from "./vocabulary";
import { MATH_COMBOS } from "./math";
import { SPANISH_COMBOS } from "./spanish";
import { BIOLOGY_COMBOS } from "./biology";
import { CHEMISTRY_COMBOS } from "./chemistry";
import { ENGLISH_COMBOS } from "./english";
import { SPELLING_COMBOS } from "./spelling";
import { GRAMMAR_COMBOS } from "./grammar";
import { ALGEBRA_COMBOS } from "./algebra";
import { GEOMETRY_COMBOS } from "./geometry";
import { WORLD_HISTORY_COMBOS } from "./world-history";
import { FRENCH_COMBOS } from "./french";
import { AP_US_HISTORY_COMBOS } from "./ap-us-history";
import { AP_PSYCHOLOGY_COMBOS } from "./ap-psychology";
import type { ComboData } from "./types";

// Subject combo map
export const SUBJECT_COMBOS: Record<string, ComboData[]> = {
  vocabulary: VOCABULARY_COMBOS,
  math: MATH_COMBOS,
  spanish: SPANISH_COMBOS,
  biology: BIOLOGY_COMBOS,
  chemistry: CHEMISTRY_COMBOS,
  english: ENGLISH_COMBOS,
  spelling: SPELLING_COMBOS,
  grammar: GRAMMAR_COMBOS,
  algebra: ALGEBRA_COMBOS,
  geometry: GEOMETRY_COMBOS,
  "world-history": WORLD_HISTORY_COMBOS,
  french: FRENCH_COMBOS,
};

// Exam combo map
export const EXAM_COMBOS: Record<string, ComboData[]> = {
  "ap-us-history": AP_US_HISTORY_COMBOS,
  "ap-psychology": AP_PSYCHOLOGY_COMBOS,
};

export {
  VOCABULARY_COMBOS,
  MATH_COMBOS,
  SPANISH_COMBOS,
  BIOLOGY_COMBOS,
  CHEMISTRY_COMBOS,
  ENGLISH_COMBOS,
  SPELLING_COMBOS,
  GRAMMAR_COMBOS,
  ALGEBRA_COMBOS,
  GEOMETRY_COMBOS,
  WORLD_HISTORY_COMBOS,
  FRENCH_COMBOS,
  AP_US_HISTORY_COMBOS,
  AP_PSYCHOLOGY_COMBOS,
};
export * from "./types";
