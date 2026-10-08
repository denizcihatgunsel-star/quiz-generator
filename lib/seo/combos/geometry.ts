/**
 * Auto-extracted from new-subjects-2.ts
 */
import type { ComboData } from "./types";

export const GEOMETRY_COMBOS: ComboData[] = [
  {
    slug: "quiz",
    type: "quiz",
    meta: { type: "quiz", primaryKeyword: "geometry quiz", monthlyVolume: 880 },
    h1: "Geometry Quiz — Test Shape and Angle Knowledge",
    intro: "Practice geometry concepts with quizzes on angles, triangles, circles, polygons, area, volume, and coordinate geometry. Perfect for high school geometry students or SAT/ACT prep.",
    sampleItems: [
      { q: "What is the sum of interior angles in a triangle?", a: "180°", explanation: "ALL triangles have interior angles that sum to 180°, regardless of triangle type.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "A circle has radius 5. What is its area?", a: "25π (approximately 78.54)", explanation: "A = πr² = π(5)² = 25π ≈ 78.54 square units.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "True or False: All squares are rectangles.", a: "True", explanation: "True. Squares are special rectangles where all sides are equal. But not all rectangles are squares.", bloomLevel: "Understand", type: "true-false" },
      { q: "If two angles are complementary, they sum to:", a: "90°", explanation: "Complementary angles sum to 90°. Supplementary angles sum to 180°.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "What is the perimeter of a rectangle 8 by 5?", a: "26", explanation: "Perimeter = 2(length + width) = 2(8 + 5) = 2(13) = 26.", bloomLevel: "Apply", type: "multiple-choice" },
    ],
    topicsCovered: ["Angles", "Triangles", "Quadrilaterals", "Circles", "Polygons", "Area and perimeter", "Volume", "Pythagorean theorem"],
    studyTips: {
      workflow: ["Take geometry quiz to identify weak areas", "Review formulas and theorems for missed concepts", "Draw diagrams to visualize problems", "Retake quiz after studying"],
      tips: ["Always draw a diagram—geometry is visual", "Memorize key formulas (area, volume, Pythagorean theorem)", "Look for relationships between angles (vertical, complementary, supplementary)"],
    },
    faq: [
      { q: "What geometry topics are covered?", a: "Angles, triangles, quadrilaterals, circles, area, perimeter, volume, and coordinate geometry." },
      { q: "Do questions include diagrams?", a: "Questions describe figures in text. Draw your own diagrams to visualize problems." },
      { q: "Is this good for SAT/ACT prep?", a: "Yes. Many standardized test geometry questions. Generate practice from relevant material." },
    ],
    relatedPages: ["/subjects/geometry", "/subjects/geometry/practice-questions", "/subjects/math/practice-questions", "/ai-quiz-generator"],
  },
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: { type: "practice-questions", primaryKeyword: "geometry practice test", secondaryKeywords: ["geometry practice questions"], monthlyVolume: 720 },
    h1: "Geometry Practice Questions — Master Shapes and Proofs",
    intro: "Build geometry problem-solving skills with practice questions on shapes, angles, area, volume, and coordinate geometry. Each question includes detailed explanations and geometric reasoning.",
    sampleItems: [
      { q: "What is the sum of interior angles in a hexagon?", a: "720°", explanation: "Formula: (n-2) × 180° where n = sides. Hexagon has 6 sides: (6-2) × 180° = 4 × 180° = 720°.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "A right triangle has legs 6 and 8. Find the hypotenuse.", a: "10", explanation: "Pythagorean theorem: a² + b² = c². So 6² + 8² = c², 36 + 64 = 100, c = √100 = 10.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is the volume of a cylinder with radius 3 and height 5?", a: "45π (approximately 141.37)", explanation: "V = πr²h = π(3)²(5) = π(9)(5) = 45π ≈ 141.37 cubic units.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Two parallel lines cut by a transversal. One angle is 65°. What is the corresponding angle?", a: "65°", explanation: "Corresponding angles are equal when parallel lines are cut by a transversal.", bloomLevel: "Remember", type: "multiple-choice" },
    ],
    topicsCovered: ["Geometric formulas", "Pythagorean theorem", "Similar triangles", "Transformations", "Coordinate geometry", "Proofs"],
    studyTips: {
      workflow: ["Take practice test to find challenging problem types", "Review geometric principles and formulas", "Practice drawing accurate diagrams"],
      tips: ["Memorize area/volume formulas for all common shapes", "Label all known information on diagrams", "Check reasonableness of answers (negative area/volume = error)"],
    },
    faq: [
      { q: "What geometry topics are tested?", a: "Shapes, angles, area, volume, Pythagorean theorem, similar figures, and coordinate geometry." },
      { q: "Do questions include proofs?", a: "Questions focus on calculations and concepts. For formal proofs, use your textbook alongside practice problems." },
    ],
    relatedPages: ["/subjects/geometry", "/subjects/geometry/quiz", "/subjects/algebra/practice-questions", "/practice-test-generator"],
  },
];
