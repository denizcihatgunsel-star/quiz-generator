/**
 * Combo pages for Algebra, Geometry, World History, French, AP US History, AP Psychology
 */
import type { ComboData } from "./types";

// ALGEBRA - 2 combos
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

// GEOMETRY - 2 combos
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

// WORLD HISTORY - 1 combo
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

// FRENCH - 1 combo
export const FRENCH_COMBOS: ComboData[] = [
  {
    slug: "flashcards",
    type: "flashcards",
    meta: { type: "flashcards", primaryKeyword: "french flashcards", monthlyVolume: 880 },
    h1: "French Flashcards — Master French Vocabulary and Grammar",
    intro: "Build French language skills with flashcards covering vocabulary, verb conjugations, grammar rules, and common phrases. Each card includes pronunciation guides and usage examples. Perfect for French learners at any level.",
    sampleItems: [
      { q: "Bonjour", a: "Hello / Good morning. Pronunciation: bon-ZHOOR. Context: Formal/informal greeting used during daytime. Related: Bonsoir (good evening).", explanation: "Bonjour is the standard French greeting. Use it when entering shops, meeting people, etc.", bloomLevel: "Remember" },
      { q: "Être (verb)", a: "To be. Present: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont. Example: Je suis étudiant. (I am a student.)", explanation: "Être is one of the most important French verbs. It's irregular, so memorize all forms.", bloomLevel: "Remember" },
      { q: "Le chat", a: "The cat (masculine). Plural: les chats. Example: Le chat est noir. (The cat is black.) Related: la chatte (female cat).", explanation: "Chat is masculine, so use 'le' (the) and 'un' (a). Most nouns ending in consonants are masculine.", bloomLevel: "Remember" },
      { q: "Avoir (verb)", a: "To have. Present: j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont. Example: J'ai un livre. (I have a book.)", explanation: "Avoir is irregular and used in many idiomatic expressions: avoir faim (to be hungry), avoir raison (to be right).", bloomLevel: "Remember" },
    ],
    topicsCovered: ["Basic vocabulary", "Verb conjugations", "Grammar rules", "Common phrases", "Pronunciation", "Idiomatic expressions"],
    studyTips: {
      workflow: ["Study 10-15 French cards daily", "Practice pronunciation by saying each word aloud", "Use spaced repetition for long-term retention"],
      tips: ["Learn noun genders with every new word—memorize 'le chat' not just 'chat'", "Practice verb conjugations by writing out full charts", "Listen to French audio to improve pronunciation and listening comprehension"],
    },
    faq: [
      { q: "What French topics are covered?", a: "Vocabulary, verb conjugations, grammar, pronunciation, and common phrases for all proficiency levels." },
      { q: "Do cards include pronunciation?", a: "Yes. Cards show phonetic pronunciation guides and notes on French sounds." },
      { q: "Can I create flashcards from my textbook?", a: "Yes. Upload French textbook chapters or vocabulary lists to generate custom flashcards." },
    ],
    relatedPages: ["/subjects/french", "/subjects/spanish/flashcards", "/subjects/vocabulary/flashcards", "/ai-flashcards"],
  },
];

// AP US HISTORY - 1 combo (exam hub)
export const AP_US_HISTORY_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: { type: "practice-questions", primaryKeyword: "apush practice questions", secondaryKeywords: ["apush practice test", "apush questions", "apush multiple choice questions"], monthlyVolume: 6600 },
    h1: "APUSH Practice Questions — AP US History Exam Prep",
    intro: "Master AP US History with practice questions covering all nine periods, historical thinking skills, and thematic connections. Each question includes detailed explanations of historical concepts and causation. Perfect for AP exam preparation. Not affiliated with or endorsed by the College Board.",
    sampleItems: [
      { q: "Which development best represents the shift from Jeffersonian to Hamiltonian economic policy?", a: "The establishment of the Second Bank of the United States (1816)", explanation: "The Second Bank represented federal economic intervention, aligning with Hamilton's vision rather than Jefferson's agrarian idealism.", bloomLevel: "Analyze", type: "multiple-choice" },
      { q: "How did the Second Great Awakening influence antebellum reform?", a: "It emphasized individual moral responsibility, inspiring temperance, abolitionist, and women's rights movements", explanation: "Religious revival stressed personal salvation and moral improvement, motivating social reform causes.", bloomLevel: "Analyze", type: "multiple-choice" },
      { q: "True or False: The Monroe Doctrine (1823) immediately stopped European colonization in the Americas.", a: "False", explanation: "False. The Monroe Doctrine was more symbolic than enforceable. The US lacked military power to enforce it until later.", bloomLevel: "Understand", type: "true-false" },
      { q: "What was the primary goal of the Interstate Commerce Act (1887)?", a: "Regulate railroad rates and practices to protect farmers and small businesses", explanation: "The ICC was the first federal regulatory agency, created to address railroad monopoly abuses.", bloomLevel: "Remember", type: "multiple-choice" },
    ],
    topicsCovered: ["Colonial America", "Revolution", "Early Republic", "Manifest Destiny", "Civil War and Reconstruction", "Gilded Age", "Progressive Era", "World Wars", "Cold War", "Modern America"],
    studyTips: {
      workflow: ["Take timed practice tests to simulate AP exam conditions", "Review explanations focusing on causation and historical thinking", "Connect events across themes (politics, economics, culture)"],
      tips: ["Master periodization—understand what defines each of the 9 AP periods", "Practice SAQ and DBQ skills separately from multiple choice", "Focus on causation: how one event led to another across periods"],
    },
    faq: [
      { q: "Are these real AP exam questions?", a: "No. These are original practice questions following AP format. For official practice, visit College Board AP Central." },
      { q: "What APUSH periods are covered?", a: "All nine periods (1491-present) with emphasis on themes, historical thinking skills, and contextualization." },
      { q: "Do questions match AP exam difficulty?", a: "Yes. Questions test the same skills and content depth as the actual AP US History exam." },
    ],
    relatedPages: ["/exams/ap-us-history", "/subjects/history", "/subjects/world-history/quiz", "/practice-test-generator"],
  },
];

// AP PSYCHOLOGY - 1 combo (exam hub)
export const AP_PSYCHOLOGY_COMBOS: ComboData[] = [
  {
    slug: "flashcards",
    type: "flashcards",
    meta: { type: "flashcards", primaryKeyword: "ap psychology flashcards", monthlyVolume: 880 },
    h1: "AP Psychology Flashcards — Master Psych Concepts for AP Exam",
    intro: "Build AP Psychology knowledge with flashcards covering all units: biological bases, cognition, development, social psychology, and mental health. Each card includes definitions, key researchers, and application examples. Not affiliated with or endorsed by the College Board.",
    sampleItems: [
      { q: "Classical Conditioning", a: "Learning through association. Pavlov's dogs: bell (neutral) + food (unconditioned stimulus) → salivation. After conditioning, bell alone (conditioned stimulus) causes salivation (conditioned response).", explanation: "Classical conditioning explains reflexive learning. Key: neutral stimulus becomes conditioned stimulus through pairing.", bloomLevel: "Understand" },
      { q: "Piaget's Formal Operational Stage", a: "Age 12+: abstract thinking, hypothetical reasoning, deductive logic emerge. Example: can think about 'What if...?' scenarios and use systematic problem-solving.", explanation: "Final Piaget stage. Not all adults fully develop formal operational thought. Contrast with concrete operational (7-11): literal, hands-on thinking.", bloomLevel: "Remember" },
      { q: "Neurotransmitter: Dopamine", a: "Functions: reward/pleasure, motivation, movement. Too much: schizophrenia symptoms. Too little: Parkinson's disease. Drugs affecting: cocaine, amphetamines (increase), antipsychotics (block).", explanation: "Dopamine is central to reward pathway and addiction. Also regulates motor control (basal ganglia).", bloomLevel: "Understand" },
      { q: "Cognitive Dissonance (Festinger)", a: "Mental discomfort from holding conflicting beliefs/behaviors. Resolution: change belief, change behavior, or rationalize. Example: Smoker knows it's unhealthy (dissonance) → quits or rationalizes ('not that bad').", explanation: "Cognitive dissonance motivates attitude/behavior change to restore consistency.", bloomLevel: "Understand" },
    ],
    topicsCovered: ["Biological bases", "Sensation and perception", "Learning", "Cognition", "Development", "Personality", "Abnormal psychology", "Treatment", "Social psychology"],
    studyTips: {
      workflow: ["Study 15-20 psychology flashcards daily", "Group cards by unit to build thematic understanding", "Apply concepts to real-world examples to deepen learning"],
      tips: ["Know key researchers and their contributions (Pavlov, Freud, Piaget, etc.)", "Understand research methods—AP Psych tests experimental design heavily", "Connect biological and psychological levels of analysis"],
    },
    faq: [
      { q: "What AP Psychology units are covered?", a: "All units: biological bases, sensation/perception, learning, cognition, development, motivation/emotion, personality, abnormal psychology, treatment, social psychology." },
      { q: "Do cards include research studies?", a: "Yes. Cards reference classic studies (Milgram, Zimbardo, Asch) and key researchers' contributions." },
      { q: "Are these sufficient for AP exam prep?", a: "Flashcards build foundational knowledge. Also practice FRQs and multiple choice from official College Board materials." },
    ],
    relatedPages: ["/exams/ap-psychology", "/subjects/psychology", "/exams/mcat/flashcards", "/ai-flashcards"],
  },
];
