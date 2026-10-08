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
    intro: "Build algebra skills with practice questions covering equations, inequalities, functions, polynomials, and graphing. Each problem includes step-by-step solutions showing algebraic methods and common pitfalls. Perfect for Algebra 1, Algebra 2, SAT/ACT math prep, or college placement tests. Our practice set covers everything from linear equations to quadratic functions, helping you master foundational algebra concepts.",
    sampleItems: [
      { q: "Solve for x: 5x - 8 = 27", a: "x = 7", explanation: "Add 8 to both sides: 5x = 35. Divide by 5: x = 7. Check: 5(7) - 8 = 35 - 8 = 27 ✓", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Factor: x² + 7x + 12", a: "(x + 3)(x + 4)", explanation: "Find two numbers that multiply to 12 and add to 7: 3 and 4. So x² + 7x + 12 = (x + 3)(x + 4). Verify by FOIL: x² + 4x + 3x + 12 = x² + 7x + 12.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is the slope of y = -2x + 5?", a: "-2", explanation: "In slope-intercept form y = mx + b, m is slope and b is y-intercept. Slope = -2, y-intercept = 5. Negative slope means line goes down left-to-right.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Solve the system: x + y = 7 and x - y = 3", a: "x = 5, y = 2", explanation: "Add equations: 2x = 10, so x = 5. Substitute: 5 + y = 7, so y = 2. Check both: 5 + 2 = 7 ✓ and 5 - 2 = 3 ✓", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Simplify: (3x²)(4x³)", a: "12x⁵", explanation: "Multiply coefficients: 3 × 4 = 12. Add exponents: x² · x³ = x⁵. Result: 12x⁵. Remember: when multiplying powers with same base, add exponents.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "True or False: The equation y = x² represents a linear function.", a: "False", explanation: "False. y = x² is a quadratic function (parabola), not linear. Linear functions have form y = mx + b (straight lines). Quadratics have x² terms.", bloomLevel: "Understand", type: "true-false" },
      { q: "If f(x) = 2x - 3, find f(5).", a: "7", explanation: "Substitute x = 5 into f(x): f(5) = 2(5) - 3 = 10 - 3 = 7. Function notation means 'plug in the value and evaluate'.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Solve the inequality: 3x - 5 > 10", a: "x > 5", explanation: "Add 5: 3x > 15. Divide by 3: x > 5. Solution set is all numbers greater than 5 (not equal to 5).", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Which is greater: 3⁴ or 4³?", a: "3⁴ = 81, 4³ = 64, so 3⁴ is greater", explanation: "3⁴ = 3×3×3×3 = 81. 4³ = 4×4×4 = 64. Therefore 3⁴ > 4³.", bloomLevel: "Analyze", type: "multiple-choice" },
      { q: "Factor completely: 2x² + 8x", a: "2x(x + 4)", explanation: "Factor out GCF first: 2x is common factor. 2x² + 8x = 2x(x + 4). Cannot factor further.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is the vertex of y = (x - 3)² + 2?", a: "(3, 2)", explanation: "Vertex form is y = (x - h)² + k where vertex is (h, k). Here h = 3, k = 2, so vertex is (3, 2).", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Solve: x/4 + 2 = 7", a: "x = 20", explanation: "Subtract 2: x/4 = 5. Multiply by 4: x = 20. Check: 20/4 + 2 = 5 + 2 = 7 ✓", bloomLevel: "Apply", type: "multiple-choice" },
    ],
    topicsCovered: ["Linear equations", "Quadratic equations", "Systems of equations", "Functions and graphs", "Polynomials", "Factoring", "Exponents", "Word problems", "Inequalities", "Function notation"],
    studyTips: {
      workflow: ["Take practice test to identify problem types you struggle with", "Review solution methods for missed questions", "Practice similar problems from textbook or online resources", "Retake test after study sessions to verify mastery", "Focus on understanding concepts, not just memorizing procedures"],
      tips: ["Show all work—even if you can do mental math, writing steps prevents errors and helps track mistakes", "Check answers by substituting back into original equation whenever possible", "Learn to recognize problem types so you know which method to use (substitution vs elimination, factoring vs quadratic formula)", "Master prerequisite skills like fractions and order of operations before tackling complex algebra", "Practice word problems separately—they require translating English to algebra"],
    },
    faq: [
      { q: "What algebra topics are covered in these practice questions?", a: "Practice questions cover linear equations, quadratic equations, functions, graphing, polynomials, factoring, exponents, inequalities, and systems of equations for Algebra 1 and Algebra 2 curriculum." },
      { q: "Do explanations show step-by-step work?", a: "Yes. Every problem includes detailed solution steps, identifies common mistakes to avoid, and explains the reasoning behind each method so you understand not just how but why." },
      { q: "Is this good for SAT math prep?", a: "Yes. Many SAT math problems are algebra-based, covering topics like linear equations, systems, functions, and quadratics. Generate SAT-style questions by uploading practice material or official SAT math content." },
      { q: "How do I know if I'm ready for Algebra 2?", a: "Master Algebra 1 fundamentals first: solving linear equations, graphing lines, basic factoring, and systems. If you can consistently solve these practice questions, you're ready for Algebra 2 topics like rational expressions and logarithms." },
    ],
    relatedPages: ["/subjects/algebra", "/subjects/algebra/quiz", "/subjects/geometry/practice-questions", "/subjects/math/practice-questions", "/practice-test-generator"],
  },
  {
    slug: "quiz",
    type: "quiz",
    meta: { type: "quiz", primaryKeyword: "algebra quiz", monthlyVolume: 720 },
    h1: "Algebra Quiz — Quick Skills Assessment",
    intro: "Test algebra understanding with quick quizzes covering equations, functions, and problem-solving. Perfect for homework checks, identifying concepts that need more study, or pre-test preparation. Each question targets a specific algebra skill with immediate feedback.",
    sampleItems: [
      { q: "Solve: 3x + 7 = 22", a: "x = 5", explanation: "Subtract 7: 3x = 15. Divide by 3: x = 5. Always isolate variable by doing inverse operations.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is 15% of 80?", a: "12", explanation: "0.15 × 80 = 12. Or: (15/100) × 80 = 12. Convert percentage to decimal by dividing by 100.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "True or False: In y = mx + b, 'b' represents the slope.", a: "False", explanation: "False. 'm' is slope, 'b' is y-intercept (where line crosses y-axis). This is slope-intercept form.", bloomLevel: "Remember", type: "true-false" },
      { q: "Simplify: 2(x + 3)", a: "2x + 6", explanation: "Distribute 2: 2·x + 2·3 = 2x + 6. Distributive property: a(b + c) = ab + ac.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Combine like terms: 5x + 3 - 2x + 7", a: "3x + 10", explanation: "Group x terms: 5x - 2x = 3x. Group constants: 3 + 7 = 10. Result: 3x + 10.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Evaluate: 2³", a: "8", explanation: "2³ = 2 × 2 × 2 = 8. The exponent tells how many times to multiply the base.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "What is the coefficient of x in 7x - 4?", a: "7", explanation: "The coefficient is the number multiplied by the variable. Here, 7 is multiplied by x.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Solve: x - 9 = 12", a: "x = 21", explanation: "Add 9 to both sides: x = 21. Check: 21 - 9 = 12 ✓", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "True or False: -5 > -3", a: "False", explanation: "False. On number line, -5 is left of -3, so -5 < -3. Negatives work opposite to positives.", bloomLevel: "Understand", type: "true-false" },
      { q: "What is the reciprocal of 4?", a: "1/4 or 0.25", explanation: "Reciprocal means 'flip' the fraction. 4 = 4/1, so reciprocal is 1/4. Note: 4 × (1/4) = 1.", bloomLevel: "Remember", type: "multiple-choice" },
    ],
    topicsCovered: ["Basic equations", "Linear functions", "Percentages", "Distributive property", "Like terms", "Order of operations", "Exponents", "Negative numbers", "Reciprocals"],
    studyTips: {
      workflow: ["Take quiz before studying to baseline your knowledge and identify gaps", "Note which types of problems you miss—pattern indicates concept weakness", "Practice those problem types separately with similar questions", "Retake quiz after focused practice to measure improvement"],
      tips: ["Master prerequisite skills (arithmetic, fractions, negative numbers) before moving to complex algebra—weak foundations cause repeated struggle", "Understand WHY methods work, don't just memorize steps—this helps you apply concepts to new problem types", "Practice regularly—algebra skills deteriorate without use, especially over summer breaks", "Write out all steps even for 'easy' problems to build good habits and catch careless errors"],
    },
    faq: [
      { q: "How many questions in an algebra quiz?", a: "Sample quizzes have 8-10 questions covering core algebra skills. Generate custom quizzes of any length (5-50+ questions) by uploading your textbook chapter or study guide." },
      { q: "What difficulty levels are available?", a: "Questions range from basic Algebra 1 (linear equations, simple factoring) to advanced Algebra 2 (rational expressions, logarithms). Upload your course material to match your exact curriculum level." },
      { q: "Can I use this for SAT or ACT prep?", a: "Yes. These quizzes build foundational algebra skills tested on SAT and ACT. For test-specific prep, upload official practice tests to generate questions matching exam format and difficulty." },
    ],
    relatedPages: ["/subjects/algebra", "/subjects/algebra/practice-questions", "/subjects/math/quiz", "/ai-quiz-generator"],
  },
];
