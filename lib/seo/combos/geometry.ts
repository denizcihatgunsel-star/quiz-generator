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
    intro: "Practice geometry concepts with quick quizzes on angles, triangles, circles, polygons, area, volume, and coordinate geometry. Perfect for high school geometry students, SAT/ACT prep, or quick concept checks before tests. Immediate feedback helps identify knowledge gaps.",
    sampleItems: [
      { q: "What is the sum of interior angles in a triangle?", a: "180°", explanation: "ALL triangles have interior angles that sum to 180°, regardless of triangle type (scalene, isosceles, equilateral, right). Fundamental geometry fact.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "A circle has radius 5. What is its area?", a: "25π (approximately 78.54)", explanation: "A = πr² = π(5)² = 25π ≈ 78.54 square units. Don't confuse with circumference C = 2πr = 10π.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "True or False: All squares are rectangles.", a: "True", explanation: "True. Squares are special rectangles where all sides are equal (and all angles 90°). But not all rectangles are squares—only those with equal sides.", bloomLevel: "Understand", type: "true-false" },
      { q: "If two angles are complementary, they sum to:", a: "90°", explanation: "Complementary angles sum to 90° (think: 'corner' = right angle = 90°). Supplementary angles sum to 180° (straight line).", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "What is the perimeter of a rectangle 8 by 5?", a: "26", explanation: "Perimeter = 2(length + width) = 2(8 + 5) = 2(13) = 26 units. Or add all four sides: 8+5+8+5 = 26.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "How many sides does a pentagon have?", a: "5", explanation: "Pentagon = 5 sides. (Penta = five in Greek). Hexagon = 6, heptagon = 7, octagon = 8, etc.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "True or False: The diameter is twice the radius.", a: "True", explanation: "True. Diameter = 2 × radius. Or radius = diameter ÷ 2. Diameter goes through center, radius goes from center to edge.", bloomLevel: "Remember", type: "true-false" },
      { q: "What is 180° - 65°?", a: "115°", explanation: "115°. This finds the supplementary angle. Two angles that form straight line sum to 180°.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "A square has side length 4. What is its area?", a: "16", explanation: "Area = side² = 4² = 16 square units. Perimeter would be 4×4 = 16 linear units. Same number, different units!", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Which angle is larger: acute or obtuse?", a: "Obtuse", explanation: "Obtuse angles (90°-180°) are larger than acute angles (0°-90°). Right angle = exactly 90°.", bloomLevel: "Understand", type: "multiple-choice" },
    ],
    topicsCovered: ["Angles", "Triangles", "Quadrilaterals", "Circles", "Polygons", "Area and perimeter", "Volume", "Pythagorean theorem", "Angle relationships"],
    studyTips: {
      workflow: ["Take geometry quiz to identify weak areas—quiz before studying, not after", "Review formulas and theorems for missed concepts—focus on what you don't know", "Draw diagrams to visualize problems—geometry is visual, not just algebraic", "Retake quiz after studying to confirm mastery and track improvement"],
      tips: ["Always draw a diagram—geometry is visual, sketches reveal relationships", "Memorize key formulas (area, volume, Pythagorean theorem, angle sums) cold—no looking them up", "Look for relationships between angles (vertical angles equal, complementary sum to 90°, supplementary sum to 180°)", "Learn vocabulary precisely—complementary vs supplementary, acute vs obtuse, area vs perimeter matter", "Use units correctly—area is square units, perimeter/circumference is linear units, volume is cubic units"],
    },
    faq: [
      { q: "What geometry topics are covered?", a: "Angles, triangles, quadrilaterals, circles, polygons, area, perimeter, volume, coordinate geometry, and angle relationships. Covers typical Geometry 1 curriculum." },
      { q: "Do questions include diagrams?", a: "Questions describe figures in text. Draw your own diagrams to visualize problems—this is critical for geometry problem-solving." },
      { q: "Is this good for SAT/ACT prep?", a: "Yes. Many standardized test geometry questions test these fundamental concepts. Generate practice from SAT/ACT material for test-specific question styles." },
      { q: "How many questions are in a quiz?", a: "Sample quizzes have 8-10 questions. Generate custom quizzes of any length to match your study needs or test format." },
    ],
    relatedPages: ["/subjects/geometry", "/subjects/geometry/practice-questions", "/subjects/math/practice-questions", "/ai-quiz-generator"],
  },
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: { type: "practice-questions", primaryKeyword: "geometry practice test", secondaryKeywords: ["geometry practice questions"], monthlyVolume: 720 },
    h1: "Geometry Practice Questions — Master Shapes and Proofs",
    intro: "Build geometry problem-solving skills with comprehensive practice questions on shapes, angles, area, volume, coordinate geometry, and geometric proofs. Each question includes detailed explanations, geometric reasoning, and formula applications. Perfect for high school geometry, honors geometry, or SAT/ACT Math Level 2 prep.",
    sampleItems: [
      { q: "What is the sum of interior angles in a hexagon?", a: "720°", explanation: "Formula: (n-2) × 180° where n = number of sides. Hexagon has 6 sides: (6-2) × 180° = 4 × 180° = 720°. This formula works for ANY polygon.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "A right triangle has legs 6 and 8. Find the hypotenuse.", a: "10", explanation: "Pythagorean theorem: a² + b² = c². So 6² + 8² = c², 36 + 64 = 100, c = √100 = 10. This is a Pythagorean triple (3-4-5 scaled by 2).", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is the volume of a cylinder with radius 3 and height 5?", a: "45π (approximately 141.37)", explanation: "V = πr²h = π(3)²(5) = π(9)(5) = 45π ≈ 141.37 cubic units. Remember: volume is in cubic units, area in square units.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Two parallel lines cut by a transversal. One angle is 65°. What is the corresponding angle?", a: "65°", explanation: "Corresponding angles are equal when parallel lines are cut by a transversal. Also: alternate interior angles are equal, co-interior angles sum to 180°.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "A triangle has sides 5, 12, and 13. Is it a right triangle?", a: "Yes", explanation: "Check if a² + b² = c² (Pythagorean theorem). 5² + 12² = 25 + 144 = 169 = 13². Yes, it's a right triangle. Another Pythagorean triple.", bloomLevel: "Analyze", type: "true-false" },
      { q: "What is the area of a trapezoid with bases 8 and 12 and height 5?", a: "50", explanation: "A = ½(b₁ + b₂)h = ½(8 + 12)(5) = ½(20)(5) = 50 square units. Average the bases, multiply by height.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "A regular octagon has one interior angle measuring:", a: "135°", explanation: "Each interior angle = (n-2)×180°/n. For octagon (n=8): (8-2)×180°/8 = 1080°/8 = 135°. Regular means all angles equal.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Distance between points (2,3) and (5,7) in coordinate plane?", a: "5", explanation: "Distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²] = √[(5-2)² + (7-3)²] = √[9 + 16] = √25 = 5. Pythagorean theorem in coordinates.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "True or False: The diagonals of a rectangle bisect each other.", a: "True", explanation: "True. Rectangle diagonals bisect each other AND are equal in length. But they do NOT intersect at right angles (that's rhombus/square).", bloomLevel: "Understand", type: "true-false" },
      { q: "Surface area of a sphere with radius 3?", a: "36π (approximately 113.10)", explanation: "SA = 4πr² = 4π(3)² = 4π(9) = 36π ≈ 113.10 square units. Volume would be (4/3)πr³.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "If two triangles have sides in ratio 2:3, their areas are in ratio:", a: "4:9", explanation: "When linear dimensions scale by k, area scales by k². Here k = 3/2, so area ratio = (3/2)² = 9/4 = 4:9. Volume scales by k³.", bloomLevel: "Analyze", type: "multiple-choice" },
      { q: "Exterior angle of triangle equals 110°. What is sum of non-adjacent interior angles?", a: "110°", explanation: "Exterior angle theorem: exterior angle equals sum of two non-adjacent interior angles. So sum = 110°. Classic geometry theorem.", bloomLevel: "Apply", type: "multiple-choice" },
    ],
    topicsCovered: ["Geometric formulas", "Pythagorean theorem", "Similar triangles", "Transformations", "Coordinate geometry", "Proofs", "Parallel lines and transversals", "Polygon angle sums", "Surface area and volume"],
    studyTips: {
      workflow: ["Take practice test to find challenging problem types—don't look at answers first", "Review geometric principles and formulas for missed concepts", "Practice drawing accurate diagrams—label all given information", "Work through explanations step-by-step to understand reasoning", "Retake test after focused study to measure growth"],
      tips: ["Memorize area/volume formulas for all common shapes—flashcards help", "Label ALL known information on diagrams before starting calculations", "Check reasonableness of answers (negative area/volume = error, obtuse angle in acute triangle = error)", "Look for special triangles (30-60-90, 45-45-90, Pythagorean triples like 3-4-5)", "Write out theorems you use—helps catch mistakes and shows work on tests"],
    },
    faq: [
      { q: "What geometry topics are tested in practice questions?", a: "Shapes, angles, area, volume, Pythagorean theorem, similar figures, coordinate geometry, parallel lines, polygon angles, surface area, transformations, and geometric reasoning." },
      { q: "Do questions include formal proofs?", a: "Questions focus on calculations and conceptual understanding. For formal two-column or paragraph proofs, pair these practice problems with your textbook's proof exercises." },
      { q: "How do I prepare for geometry exams?", a: "Master formulas first (area, volume, distance). Then practice problem types (angles, triangles, circles). Finally, work full practice tests under timed conditions." },
      { q: "What's the difference between area and volume?", a: "Area is 2D measurement (square units)—surface of flat shapes. Volume is 3D measurement (cubic units)—space inside solid figures." },
    ],
    relatedPages: ["/subjects/geometry", "/subjects/geometry/quiz", "/subjects/algebra/practice-questions", "/practice-test-generator"],
  },
];
