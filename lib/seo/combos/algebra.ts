/**
 * Auto-extracted from new-subjects-2.ts
 */
import type { ComboData } from "./types";

export const ALGEBRA_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: { type: "practice-questions", primaryKeyword: "algebra practice test", secondaryKeywords: ["algebra practice questions"], monthlyVolume: 880 },
    h1: "Algebra Practice Questions — Master Equations and Functions",
    intro: "Build algebra skills with practice questions covering equations, inequalities, functions, polynomials, and graphing. Each problem includes step-by-step solutions showing algebraic methods. Perfect for Algebra 1, Algebra 2, or SAT/ACT math prep.",
    sampleItems: [
      { q: "Solve for x: 5x - 8 = 27", a: "x = 7", explanation: "Add 8 to both sides: 5x = 35. Divide by 5: x = 7. Check: 5(7) - 8 = 35 - 8 = 27 ✓", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Factor: x² + 7x + 12", a: "(x + 3)(x + 4)", explanation: "Find two numbers that multiply to 12 and add to 7: 3 and 4. So x² + 7x + 12 = (x + 3)(x + 4).", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is the slope of y = -2x + 5?", a: "-2", explanation: "In slope-intercept form y = mx + b, m is slope and b is y-intercept. Slope = -2, y-intercept = 5.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Solve the system: x + y = 7 and x - y = 3", a: "x = 5, y = 2", explanation: "Add equations: 2x = 10, so x = 5. Substitute: 5 + y = 7, so y = 2.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Simplify: (3x²)(4x³)", a: "12x⁵", explanation: "Multiply coefficients: 3 × 4 = 12. Add exponents: x² · x³ = x⁵. Result: 12x⁵.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "True or False: The equation y = x² represents a linear function.", a: "False", explanation: "False. y = x² is a quadratic function (parabola), not linear. Linear functions have form y = mx + b (straight lines).", bloomLevel: "Understand", type: "true-false" },
    ],
    topicsCovered: ["Linear equations", "Quadratic equations", "Systems of equations", "Functions and graphs", "Polynomials", "Factoring", "Exponents", "Word problems"],
    studyTips: {
      workflow: ["Take practice test to identify problem types you struggle with", "Review solution methods for missed questions", "Practice similar problems from textbook", "Retake test to verify mastery"],
      tips: ["Show all work—even if you can do mental math, writing steps prevents errors", "Check answers by substituting back into original equation", "Learn to recognize problem types so you know which method to use"],
    },
    faq: [
      { q: "What algebra topics are covered?", a: "Equations, inequalities, functions, graphing, polynomials, factoring, and systems for Algebra 1 and 2." },
      { q: "Do explanations show step-by-step work?", a: "Yes. Every problem includes detailed solution steps and identifies common mistakes to avoid." },
      { q: "Is this good for SAT math prep?", a: "Yes. Many SAT math problems are algebra-based. Generate SAT-style questions from practice material." },
    ],
    relatedPages: ["/subjects/algebra", "/subjects/algebra/quiz", "/subjects/geometry/practice-questions", "/subjects/math/practice-questions", "/practice-test-generator"],
  },
  {
    slug: "quiz",
    type: "quiz",
    meta: { type: "quiz", primaryKeyword: "algebra quiz", monthlyVolume: 720 },
    h1: "Algebra Quiz — Quick Skills Assessment",
    intro: "Test algebra understanding with quick quizzes covering equations, functions, and problem-solving. Perfect for homework checks or identifying concepts that need more study.",
    sampleItems: [
      { q: "Solve: 3x + 7 = 22", a: "x = 5", explanation: "Subtract 7: 3x = 15. Divide by 3: x = 5.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is 15% of 80?", a: "12", explanation: "0.15 × 80 = 12. Or: (15/100) × 80 = 12.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "True or False: In y = mx + b, 'b' represents the slope.", a: "False", explanation: "False. 'm' is slope, 'b' is y-intercept (where line crosses y-axis).", bloomLevel: "Remember", type: "true-false" },
      { q: "Simplify: 2(x + 3)", a: "2x + 6", explanation: "Distribute 2: 2·x + 2·3 = 2x + 6.", bloomLevel: "Apply", type: "multiple-choice" },
    ],
    topicsCovered: ["Basic equations", "Linear functions", "Percentages", "Distributive property", "Like terms", "Order of operations"],
    studyTips: {
      workflow: ["Take quiz before studying to baseline your knowledge", "Note which types of problems you miss", "Practice those problem types, then retake quiz"],
      tips: ["Master prerequisite skills (arithmetic, fractions) before moving to complex algebra", "Understand WHY methods work, don't just memorize steps", "Practice regularly—algebra skills deteriorate without use"],
    },
    faq: [
      { q: "How many questions in an algebra quiz?", a: "Sample quizzes have 4-8 questions. Generate custom quizzes of any length." },
      { q: "What difficulty levels are available?", a: "Questions range from basic Algebra 1 to advanced Algebra 2. Upload your course material to match your level." },
    ],
    relatedPages: ["/subjects/algebra", "/subjects/algebra/practice-questions", "/subjects/math/quiz", "/ai-quiz-generator"],
  },
];
