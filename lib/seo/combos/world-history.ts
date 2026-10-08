/**
 * Auto-extracted from new-subjects-2.ts
 */
import type { ComboData } from "./types";

export const WORLD_HISTORY_COMBOS: ComboData[] = [
  {
    slug: "quiz",
    type: "quiz",
    meta: { type: "quiz", primaryKeyword: "world history quiz", monthlyVolume: 880 },
    h1: "World History Quiz — Test Your Global Historical Knowledge",
    intro: "Master world history with quizzes covering ancient civilizations, empires, revolutions, wars, and cultural developments across all regions and eras. Perfect for AP World History prep or general historical knowledge building.",
    sampleItems: [
      { q: "Which ancient civilization built Machu Picchu?", a: "The Inca Empire", explanation: "Machu Picchu was built by the Incas in 15th century Peru as a royal estate and sacred site.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "What year did World War II end?", a: "1945", explanation: "WWII ended in 1945: Germany surrendered in May, Japan in August after atomic bombings.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "True or False: The Renaissance began in Italy.", a: "True", explanation: "True. The Renaissance started in Italian city-states like Florence in the 14th century.", bloomLevel: "Remember", type: "true-false" },
      { q: "Which revolution established parliamentary democracy in England?", a: "The Glorious Revolution (1688)", explanation: "The Glorious Revolution limited monarchy and established Parliament's supremacy without bloodshed.", bloomLevel: "Remember", type: "multiple-choice" },
    ],
    topicsCovered: ["Ancient civilizations", "Medieval history", "Renaissance", "Revolutions", "World wars", "Cold War", "Modern global issues"],
    studyTips: {
      workflow: ["Take quiz to identify historical periods you know least", "Read about those eras focusing on causes and effects", "Retake quiz to track improvement"],
      tips: ["Focus on causation: WHY events happened, not just dates", "Connect events across regions (how did European colonization affect Asia, Africa, Americas?)", "Use timelines to visualize chronology and simultaneous developments"],
    },
    faq: [
      { q: "What world history periods are covered?", a: "Ancient through modern: civilizations, empires, revolutions, wars, and cultural movements across all regions." },
      { q: "Is this good for AP World History?", a: "Yes. Questions test historical thinking skills and content knowledge aligned with AP curriculum." },
    ],
    relatedPages: ["/subjects/world-history", "/subjects/history", "/exams/ap-us-history/practice-questions", "/ai-quiz-generator"],
  },
];
