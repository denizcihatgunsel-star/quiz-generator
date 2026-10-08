/**
 * Combo pages for Math subject hub
 */
import type { ComboData } from "./types";

export const MATH_COMBOS: ComboData[] = [
  {
    slug: "flashcards",
    type: "flashcards",
    meta: {
      type: "flashcards",
      primaryKeyword: "math flashcards",
      monthlyVolume: 4400,
    },
    h1: "Math Flashcards — Master Formulas and Concepts",
    intro:
      "Build math fluency with AI-generated flashcards covering formulas, theorems, problem-solving strategies, and key concepts from pre-algebra through calculus. Each flashcard includes the concept, explanation, example application, and memory aids. Perfect for quick review before tests or daily practice to reinforce mathematical thinking.",
    sampleItems: [
      {
        q: "Pythagorean Theorem",
        a: "Formula: a² + b² = c² (where c is the hypotenuse). Example: If a right triangle has legs of 3 and 4, the hypotenuse is √(3² + 4²) = √25 = 5. Used for: Finding distances, solving right triangle problems.",
        explanation:
          "The Pythagorean theorem relates the sides of a right triangle. It's one of the most fundamental formulas in geometry and appears in coordinate geometry, trigonometry, and physics.",
        bloomLevel: "Remember",
      },
      {
        q: "Slope Formula",
        a: "Formula: m = (y₂ - y₁)/(x₂ - x₁). Example: Slope between (2,3) and (5,9) is (9-3)/(5-2) = 6/3 = 2. Used for: Finding rate of change, graphing lines, parallel/perpendicular lines.",
        explanation:
          "Slope measures how steep a line is and represents rate of change. Positive slope rises left to right; negative slope falls left to right. Zero slope is horizontal.",
        bloomLevel: "Remember",
      },
      {
        q: "Quadratic Formula",
        a: "Formula: x = [-b ± √(b² - 4ac)] / 2a. Example: Solve x² + 5x + 6 = 0: x = [-5 ± √(25-24)]/2 = [-5 ± 1]/2 = -2 or -3. Used for: Solving any quadratic equation.",
        explanation:
          "The quadratic formula solves ax² + bx + c = 0 for x. The discriminant (b² - 4ac) tells you if there are two real solutions (positive), one (zero), or two complex solutions (negative).",
        bloomLevel: "Remember",
      },
      {
        q: "Area of a Circle",
        a: "Formula: A = πr². Example: Circle with radius 4 has area π(4)² = 16π ≈ 50.27 square units. Used for: Geometry problems, real-world applications involving circular regions.",
        explanation:
          "Circle area grows with the square of the radius. Doubling the radius quadruples the area. Remember: circumference is 2πr (linear), area is πr² (quadratic).",
        bloomLevel: "Remember",
      },
      {
        q: "Derivative Power Rule",
        a: "Formula: d/dx[xⁿ] = nxⁿ⁻¹. Example: d/dx[x³] = 3x². d/dx[x⁵] = 5x⁴. Used for: Finding rates of change, optimization, curve sketching.",
        explanation:
          "The power rule is the foundation of differentiation. Bring down the exponent as a coefficient, then subtract 1 from the exponent. Works for any real number n.",
        bloomLevel: "Remember",
      },
      {
        q: "Distance Formula",
        a: "Formula: d = √[(x₂-x₁)² + (y₂-y₁)²]. Example: Distance from (1,2) to (4,6) is √[(4-1)² + (6-2)²] = √[9+16] = 5. Derived from: Pythagorean theorem.",
        explanation:
          "Distance formula finds the straight-line distance between two points in the coordinate plane. It's the Pythagorean theorem applied to coordinate geometry.",
        bloomLevel: "Remember",
      },
      {
        q: "Midpoint Formula",
        a: "Formula: M = ((x₁+x₂)/2, (y₁+y₂)/2). Example: Midpoint of (2,3) and (8,7) is ((2+8)/2, (3+7)/2) = (5,5). Used for: Finding centers, bisecting segments.",
        explanation:
          "The midpoint formula averages the x-coordinates and y-coordinates separately. It finds the point exactly halfway between two given points.",
        bloomLevel: "Remember",
      },
      {
        q: "Standard Deviation",
        a: "Concept: Measures spread of data from the mean. Formula: σ = √[Σ(x-μ)²/N]. Higher σ = more spread out data. Used in: Statistics, analyzing variability, quality control.",
        explanation:
          "Standard deviation quantifies how much data values deviate from the average. About 68% of data falls within 1 standard deviation of the mean in a normal distribution.",
        bloomLevel: "Understand",
      },
      {
        q: "Factoring Difference of Squares",
        a: "Pattern: a² - b² = (a+b)(a-b). Example: x² - 9 = (x+3)(x-3). 25y² - 16 = (5y+4)(5y-4). Used for: Simplifying expressions, solving equations.",
        explanation:
          "Difference of squares is one of the most useful factoring patterns. Recognize it by: two perfect squares separated by subtraction.",
        bloomLevel: "Remember",
      },
      {
        q: "Properties of Exponents",
        a: "Rules: x^a · x^b = x^(a+b), (x^a)^b = x^(ab), x^a / x^b = x^(a-b), x^0 = 1, x^(-a) = 1/x^a. Example: x³ · x⁴ = x⁷.",
        explanation:
          "Exponent rules simplify algebraic expressions. When multiplying like bases, add exponents. When raising a power to a power, multiply exponents.",
        bloomLevel: "Remember",
      },
      {
        q: "Sum of Interior Angles (Polygon)",
        a: "Formula: (n-2) × 180° where n = number of sides. Example: Pentagon (5 sides): (5-2) × 180° = 540°. Hexagon: (6-2) × 180° = 720°.",
        explanation:
          "Any polygon can be divided into (n-2) triangles from one vertex. Since each triangle has 180°, multiply by the number of triangles.",
        bloomLevel: "Remember",
      },
      {
        q: "Volume of a Cylinder",
        a: "Formula: V = πr²h (area of base × height). Example: Cylinder with radius 3 and height 5: V = π(3)²(5) = 45π ≈ 141.37 cubic units.",
        explanation:
          "Cylinder volume is base area times height. Since the base is a circle (πr²), multiply by height h. Works for any prism: base area × height.",
        bloomLevel: "Remember",
      },
    ],
    topicsCovered: [
      "Algebra basics",
      "Linear equations",
      "Quadratic equations",
      "Geometry formulas",
      "Trigonometry",
      "Pre-calculus",
      "Calculus derivatives",
      "Statistics",
      "Probability",
      "Functions and graphs",
    ],
    studyTips: {
      workflow: [
        "Study 5-10 formula flashcards per day, focusing on understanding the concept, not just memorizing",
        "Practice applying each formula by working through example problems after reviewing the card",
        "Review missed formulas daily, then space out reviews (3 days, a week, two weeks) as you master them",
      ],
      tips: [
        "Create mental associations: link formulas to real-world applications or visual images",
        "Practice writing formulas from memory, then check—active recall is more effective than passive review",
        "Group related formulas together (all circle formulas, all exponent rules) to build connections",
      ],
    },
    faq: [
      {
        q: "What math levels are these flashcards suitable for?",
        a: "Flashcards cover pre-algebra through calculus. You can create flashcards at any difficulty level by uploading your specific course material or textbook chapter.",
      },
      {
        q: "How do I remember formulas long-term?",
        a: "Use spaced repetition: review cards at increasing intervals (daily, then 3 days, a week, two weeks). Active recall (trying to remember before flipping) is more effective than passive review.",
      },
      {
        q: "Can I create flashcards from my textbook?",
        a: "Yes. Upload PDF pages or paste text from any math textbook and generate flashcards automatically. The generator extracts key formulas, theorems, and concepts.",
      },
      {
        q: "Do flashcards include examples?",
        a: "Yes. Each flashcard includes the formula or concept, an explanation, and an example application showing how to use it in problems.",
      },
      {
        q: "Is this enough to learn math?",
        a: "Flashcards help you memorize formulas and concepts, but you also need to practice solving problems. Use flashcards for review, then work through practice problems to apply what you've learned.",
      },
      {
        q: "Can I share flashcards with my study group?",
        a: "Yes. Every flashcard set gets a shareable link. Generate once and your whole study group can practice together.",
      },
    ],
    relatedPages: [
      "/subjects/math",
      "/subjects/math/practice-questions",
      "/subjects/math/worksheet-generator",
      "/subjects/algebra",
      "/subjects/geometry",
      "/ai-flashcards",
    ],
  },
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "math practice test",
      secondaryKeywords: ["math practice questions", "math multiple choice questions", "math quiz questions"],
      monthlyVolume: 1300,
    },
    h1: "Math Practice Questions — Test Your Problem-Solving Skills",
    intro:
      "Build comprehensive math confidence through diverse practice questions spanning arithmetic, pre-algebra, geometry, trigonometry, statistics, and calculus. Test your conceptual understanding and computational skills across all major math topics. Perfect for homework practice, standardized test prep (SAT, ACT, GRE), or assessing your readiness for the next math level.",
    sampleItems: [
      {
        q: "Solve for x: 3x + 7 = 22",
        a: "x = 5",
        explanation:
          "Subtract 7 from both sides: 3x = 15. Then divide both sides by 3: x = 5. Check by substitution: 3(5) + 7 = 15 + 7 = 22 ✓",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What is the area of a circle with radius 6 cm?",
        a: "36π cm² (approximately 113.10 cm²)",
        explanation:
          "Use the formula A = πr². With r = 6: A = π(6)² = 36π ≈ 113.10 cm². Remember: area grows with the square of the radius (quadratic relationship).",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What is the median of the data set: 3, 7, 2, 9, 5?",
        a: "5",
        explanation:
          "First, sort the data: 2, 3, 5, 7, 9. The median is the middle value: 5. With even number of values, average the two middle numbers.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "If sin(θ) = 0.5, what is θ in degrees (0° to 90°)?",
        a: "30°",
        explanation:
          "sin(30°) = 0.5 = 1/2. This is a special angle you should memorize. Also: sin(45°) = √2/2, sin(60°) = √3/2, sin(90°) = 1.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Simplify: (2x³)(3x²)",
        a: "6x⁵",
        explanation:
          "Multiply coefficients: 2 × 3 = 6. Add exponents: x³ · x² = x⁵. Result: 6x⁵. Exponent rule: when multiplying like bases, add the exponents.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What is 15% of 80?",
        a: "12",
        explanation:
          "Convert 15% to decimal: 0.15. Multiply: 0.15 × 80 = 12. Alternatively: 15% = 15/100, so (15/100) × 80 = 1200/100 = 12.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "True or False: A triangle can have two obtuse angles.",
        a: "False",
        explanation:
          "False. An obtuse angle is greater than 90°. Two obtuse angles would sum to more than 180°, but the total of all three angles in a triangle must equal exactly 180°. Maximum one obtuse angle per triangle.",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "Find the derivative of f(x) = 4x³ + 2x",
        a: "f'(x) = 12x² + 2",
        explanation:
          "Use power rule: d/dx[xⁿ] = nxⁿ⁻¹. For 4x³: 4·3·x² = 12x². For 2x: 2·1·x⁰ = 2. Sum: f'(x) = 12x² + 2.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What is the volume of a rectangular prism with length 4, width 3, height 5?",
        a: "60 cubic units",
        explanation:
          "Volume = length × width × height = 4 × 3 × 5 = 60 cubic units. 3D volumes always have cubic units.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "Evaluate: 2³ + 3²",
        a: "17",
        explanation:
          "2³ = 2 × 2 × 2 = 8. 3² = 3 × 3 = 9. Sum: 8 + 9 = 17. Remember order of operations: exponents before addition.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What is the distance between points (1, 2) and (4, 6)?",
        a: "5",
        explanation:
          "Use distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²] = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5. This is Pythagorean theorem applied to coordinate plane.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "If P(A) = 0.3 and P(B) = 0.4 (independent events), what is P(A and B)?",
        a: "0.12",
        explanation:
          "For independent events, P(A and B) = P(A) × P(B) = 0.3 × 0.4 = 0.12. Independence means one event doesn't affect probability of the other.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
    ],
    topicsCovered: ["Arithmetic", "Pre-algebra", "Algebra (equations, functions)", "Geometry (area, volume, angles)", "Trigonometry (sin, cos, tan)", "Statistics (mean, median, probability)", "Calculus (derivatives, limits)", "Word problems", "Problem-solving strategies"],
    studyTips: {
      workflow: [
        "Take a diagnostic practice test across all math topics to identify which areas (algebra, geometry, trig, calculus) you struggle with most",
        "Review the explanations for missed questions carefully—understand WHY you made errors, not just what the right answer is",
        "Work through similar problems from your textbook or online resources for topics you missed",
        "Practice mixed problem sets—don't just drill one topic at a time, since real tests mix topics",
        "Retake the full practice test after a week of study to verify you've mastered those problem types and track improvement",
      ],
      tips: [
        "Show your work for every problem—this helps you catch errors, partial credit on tests, and reinforces the solution method in your brain",
        "Check your answers by substituting back into the original problem when possible (works for equations, not always for geometry)",
        "Focus on understanding the underlying method, not memorizing specific problems—tests will use different numbers and contexts",
        "Learn to identify problem types quickly: 'This is a distance formula problem,' 'This needs the quadratic formula,' etc.",
        "Master fundamentals first (order of operations, fractions, exponent rules) before moving to advanced topics—weak foundations cause repeated errors",
        "Time yourself on practice tests to build speed—math sections on SAT/ACT are very time-pressured",
      ],
    },
    faq: [
      {
        q: "What math topics are covered?",
        a: "Practice questions span arithmetic, pre-algebra, algebra, geometry, trigonometry, statistics, pre-calculus, and basic calculus. Covers middle school through early college math. Upload your course notes or textbook to generate questions matching your specific curriculum.",
      },
      {
        q: "Do explanations show step-by-step solutions?",
        a: "Yes. Every question includes a detailed explanation showing the complete solution process, relevant formulas, common pitfalls to avoid, and why the method works. Learn from mistakes, not just answers.",
      },
      {
        q: "How do I know which math level to practice?",
        a: "Start with a mixed diagnostic test. Your results show which topics you've mastered vs need review. Then generate targeted practice for weak areas. Work from foundational topics (algebra) toward advanced (calculus).",
      },
      {
        q: "Can I use this for standardized test prep (SAT, ACT, GRE)?",
        a: "Yes. Practice questions build the problem-solving skills tested on standardized exams. For test-specific prep, also upload official practice tests to generate questions matching exact exam format and difficulty.",
      },
    ],
    relatedPages: [
      "/subjects/math",
      "/subjects/math/flashcards",
      "/subjects/math/worksheet-generator",
      "/subjects/algebra/practice-questions",
      "/subjects/geometry/practice-questions",
      "/practice-test-generator",
    ],
  },
  {
    slug: "worksheet-generator",
    type: "worksheet-generator",
    meta: {
      type: "worksheet-generator",
      primaryKeyword: "math worksheet generator",
      monthlyVolume: 1600,
    },
    h1: "Math Worksheet Generator — Create Custom Practice Sheets",
    intro:
      "Generate unlimited math worksheets for any grade level or topic in seconds. Create customized problem sets for classroom practice, homework, or independent study. Each worksheet includes an answer key with step-by-step solutions. Perfect for teachers who need differentiated assignments or parents supporting homeschool math instruction.",
    sampleItems: [
      {
        q: "Sample Worksheet: Algebra 1 — Solving Linear Equations",
        a: "Problems: 1) 2x + 5 = 13  2) 3x - 7 = 14  3) 4x + 9 = 25  4) 5x - 11 = 19  5) 6x + 3 = 33  6) 7x - 8 = 34",
        explanation:
          "This worksheet focuses on two-step linear equations. Students practice isolation strategies: subtract/add first, then divide. Answer key shows each solution step.",
        bloomLevel: "Apply",
      },
      {
        q: "Sample Worksheet: Geometry — Area and Perimeter",
        a: "Problems: 1) Rectangle 8×5: find area and perimeter  2) Square with side 7: find area and perimeter  3) Circle radius 4: find circumference and area  4) Triangle base 10, height 6: find area",
        explanation:
          "Mixed geometry practice applying area and perimeter formulas to different shapes. Students must select and apply the correct formula for each shape.",
        bloomLevel: "Apply",
      },
      {
        q: "Sample Worksheet: Pre-Algebra — Order of Operations",
        a: "Problems: 1) 3 + 4 × 2  2) (8 - 3) × 4  3) 20 ÷ 4 + 3 × 2  4) 5² - 3 × 4  5) (12 + 8) ÷ 4  6) 3 × (5 + 2) - 6",
        explanation:
          "PEMDAS practice with increasing complexity. Students must correctly apply order of operations: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right).",
        bloomLevel: "Apply",
      },
      {
        q: "Sample Worksheet: Fractions — Addition and Subtraction",
        a: "Problems: 1) 1/4 + 2/4  2) 3/5 + 1/5  3) 5/6 - 2/6  4) 2/3 + 1/6  5) 3/4 - 1/3  6) 1/2 + 2/5",
        explanation:
          "Fraction practice starting with common denominators, progressing to finding LCD. Later problems require converting fractions before adding or subtracting.",
        bloomLevel: "Apply",
      },
      {
        q: "Sample Worksheet: Algebra 2 — Quadratic Equations",
        a: "Problems: 1) Factor: x² + 5x + 6  2) Solve: x² - 7x + 12 = 0  3) Complete square: x² + 6x + ___ = (x + ___)²  4) Quadratic formula: x² + 3x - 10 = 0",
        explanation:
          "Multi-method quadratic practice: factoring, zero product property, completing the square, and quadratic formula. Students practice selecting the most efficient method.",
        bloomLevel: "Apply",
      },
      {
        q: "Sample Worksheet: Calculus — Derivatives",
        a: "Problems: 1) f(x) = 3x⁴  2) f(x) = 5x² - 2x + 7  3) f(x) = (2x + 1)(x - 3)  4) f(x) = (3x² + 4x - 1)",
        explanation:
          "Differentiation practice using power rule and product rule. Students must apply derivative rules and simplify results. Answer key shows each step.",
        bloomLevel: "Apply",
      },
      {
        q: "Sample Worksheet: Statistics — Mean, Median, Mode",
        a: "Data sets: 1) {3, 7, 7, 10, 12, 15, 19}  2) {22, 18, 15, 22, 30, 22, 18}  3) {5.2, 6.8, 4.9, 7.1, 6.8, 5.5}. Find mean, median, and mode for each.",
        explanation:
          "Descriptive statistics practice. Students calculate central tendency measures and interpret which measure best represents each dataset.",
        bloomLevel: "Apply",
      },
      {
        q: "Sample Worksheet: Geometry — Triangle Properties",
        a: "Problems: 1) Two angles are 45° and 60°, find the third  2) Is a triangle with sides 5,12,13 a right triangle?  3) Find missing angle in isosceles triangle with base angles 50° each",
        explanation:
          "Mixed triangle problems testing angle sum theorem, Pythagorean theorem verification, and isosceles triangle properties.",
        bloomLevel: "Apply",
      },
    ],
    topicsCovered: [
      "Basic arithmetic",
      "Fractions and decimals",
      "Pre-algebra",
      "Algebra 1 and 2",
      "Geometry",
      "Trigonometry",
      "Pre-calculus",
      "Calculus",
      "Statistics",
      "Word problems",
    ],
    studyTips: {
      workflow: [
        "Generate a worksheet focused on the specific skill your students need to practice",
        "Have students complete problems independently, then review together using the answer key",
        "Create progressive worksheets: start with easier problems, generate a second worksheet with harder problems once students master the basics",
      ],
      tips: [
        "Start each worksheet with 1-2 example problems worked out to remind students of the method",
        "Mix problem types on a single worksheet to build flexibility and prevent rote pattern-following",
        "Generate fresh worksheets with new numbers for retakes or extra practice—don't reuse the same problems",
      ],
    },
    faq: [
      {
        q: "What types of math worksheets can I generate?",
        a: "Generate worksheets for any math topic from basic arithmetic through calculus. Specify the topic, difficulty level, and number of problems when creating.",
      },
      {
        q: "Do worksheets include answer keys?",
        a: "Yes. Every worksheet includes a complete answer key with step-by-step solutions so students can check their work and learn from mistakes.",
      },
      {
        q: "Can I customize the number and difficulty of problems?",
        a: "Yes. Specify how many problems you want and the difficulty range. You can also upload example problems to match a specific style or curriculum.",
      },
      {
        q: "Is this suitable for classroom use?",
        a: "Yes. Teachers use the generator for homework, warm-ups, exit tickets, differentiated practice, and test prep. Generate multiple versions for different groups.",
      },
      {
        q: "Can I generate worksheets for specific textbook chapters?",
        a: "Yes. Upload or describe the textbook section and generate practice problems matching that content exactly.",
      },
      {
        q: "How is this different from existing worksheet sites?",
        a: "AI generation creates custom problems matching your specific needs rather than pulling from a fixed database. You get fresh problems every time, with explanations.",
      },
    ],
    relatedPages: [
      "/subjects/math",
      "/subjects/math/practice-questions",
      "/subjects/math/flashcards",
      "/features/worksheet-generator",
      "/for-teachers",
    ],
  },
];
