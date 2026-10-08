/**
 * Combo pages for Chemistry subject hub
 */
import type { ComboData } from "./types";

export const CHEMISTRY_COMBOS: ComboData[] = [
  {
    slug: "quiz",
    type: "quiz",
    meta: {
      type: "quiz",
      primaryKeyword: "chemistry quiz",
      monthlyVolume: 1300,
    },
    h1: "Chemistry Quiz — Test Your Chemical Knowledge",
    intro:
      "Master chemistry concepts through interactive quizzes covering atomic structure, chemical bonds, reactions, stoichiometry, acids and bases, and thermodynamics. Each question includes detailed explanations of chemical principles and problem-solving methods. Perfect for AP Chemistry prep, college general chemistry, or homework practice.",
    sampleItems: [
      { q: "What is the electron configuration of oxygen (atomic number 8)?", a: "1s² 2s² 2p⁴", explanation: "Oxygen has 8 electrons: 2 in the first shell (1s²), 2 in the 2s orbital (2s²), and 4 in the 2p orbitals (2p⁴).", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Which type of bond forms when electrons are shared between atoms?", a: "Covalent bond", explanation: "Covalent bonds form when two atoms share one or more pairs of electrons, typically between nonmetals.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "If 2 moles of hydrogen react with 1 mole of oxygen, how many moles of water form?", a: "2 moles", explanation: "The balanced equation 2H₂ + O₂ → 2H₂O shows that 2 moles of water are produced from 2 moles of hydrogen and 1 mole of oxygen.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "True or False: Catalysts are consumed in chemical reactions.", a: "False", explanation: "False. Catalysts speed up reactions by lowering activation energy but are NOT consumed. They can be reused.", bloomLevel: "Understand", type: "true-false" },
      { q: "What is the pH of a neutral solution at 25°C?", a: "7", explanation: "At 25°C, pure water has pH 7 (neutral). pH < 7 is acidic, pH > 7 is basic. pH = -log[H⁺].", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Which gas law relates pressure and volume at constant temperature?", a: "Boyle's Law (P₁V₁ = P₂V₂)", explanation: "Boyle's Law states that pressure and volume are inversely proportional when temperature is held constant. Doubling pressure halves volume.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Fill in the blank: An atom that loses electrons becomes a _____ ion.", a: "Positive (cation)", explanation: "Losing electrons (negative charges) makes the atom positively charged. Metals typically form cations.", bloomLevel: "Understand", type: "fill-in-blank" },
      { q: "What is the molar mass of H₂O (water)?", a: "18 g/mol", explanation: "H₂O has 2 hydrogen atoms (2 × 1 g/mol = 2) + 1 oxygen atom (16 g/mol) = 18 g/mol total.", bloomLevel: "Apply", type: "multiple-choice" },
    ],
    topicsCovered: [
      "Atomic structure",
      "Periodic trends",
      "Chemical bonding",
      "Stoichiometry",
      "Gas laws",
      "Acids and bases",
      "Thermodynamics",
      "Reaction kinetics",
    ],
    studyTips: {
      workflow: [
        "Take a chemistry quiz to identify which topics need more study",
        "Review chemical equations and problem-solving methods for missed questions",
        "Practice similar problems from your textbook to reinforce understanding",
      ],
      tips: [
        "Memorize common polyatomic ions and chemical formulas—they appear constantly in problems",
        "Always check units in calculations and balance chemical equations before solving stoichiometry",
        "Understand the WHY behind trends (like electronegativity) rather than just memorizing patterns",
      ],
    },
    faq: [
      { q: "What chemistry topics are covered?", a: "Quizzes cover atomic structure, bonding, stoichiometry, gas laws, acids/bases, thermodynamics, and kinetics from general chemistry." },
      { q: "Do questions include calculations?", a: "Yes. Questions include both conceptual understanding and quantitative problem-solving with step-by-step explanations." },
      { q: "Is this good for AP Chemistry?", a: "Yes. Generate AP-level questions by uploading your course material. Questions match AP exam format and difficulty." },
      { q: "Can I practice specific topics?", a: "Yes. Upload notes on specific topics (e.g., 'acid-base equilibrium') to generate focused quizzes." },
    ],
    relatedPages: [
      "/subjects/chemistry",
      "/subjects/chemistry/flashcards",
      "/subjects/biology/quiz",
      "/ai-quiz-generator",
    ],
  },
  {
    slug: "flashcards",
    type: "flashcards",
    meta: {
      type: "flashcards",
      primaryKeyword: "chemistry flashcards",
      monthlyVolume: 720,
    },
    h1: "Chemistry Flashcards — Master Concepts and Formulas",
    intro:
      "Build chemistry knowledge with flashcards covering chemical formulas, equations, concepts, and problem-solving strategies. Each card includes explanations, examples, and memory aids for retention.",
    sampleItems: [
      { q: "Avogadro's Number", a: "6.022 × 10²³ particles/mole. Used to convert between moles and particles (atoms, molecules, ions). Example: 1 mole of carbon = 6.022 × 10²³ atoms.", explanation: "Avogadro's number is fundamental for stoichiometry. It relates macroscopic measurements (moles) to microscopic particles.", bloomLevel: "Remember" },
      { q: "Ideal Gas Law", a: "PV = nRT. P=pressure, V=volume, n=moles, R=gas constant (0.0821 L·atm/mol·K), T=temperature (Kelvin). Relates all gas properties.", explanation: "The ideal gas law combines Boyle's, Charles's, and Avogadro's laws. Use it to find any variable if you know the other three.", bloomLevel: "Remember" },
      { q: "Electronegativity Trend", a: "Increases left to right across periods, decreases down groups. Fluorine is most electronegative (4.0). Noble gases excluded.", explanation: "Electronegativity measures an atom's ability to attract electrons in a bond. High electronegativity = strong pull on shared electrons.", bloomLevel: "Understand" },
      { q: "pH Scale", a: "pH = -log[H⁺]. pH < 7 = acidic, pH = 7 = neutral, pH > 7 = basic. Each unit is a 10× change in [H⁺].", explanation: "pH is a logarithmic scale. pH 5 is 10 times more acidic than pH 6. Strong acids have pH near 0, strong bases near 14.", bloomLevel: "Understand" },
      { q: "Oxidation-Reduction", a: "OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons). Oxidizing agent gets reduced; reducing agent gets oxidized.", explanation: "Redox reactions involve electron transfer. Identify which species loses electrons (oxidized) and which gains (reduced) to balance equations.", bloomLevel: "Understand" },
      { q: "Molarity", a: "M = moles/liters. Concentration unit. Example: 2 moles NaCl in 1 L water = 2 M solution. Used in dilution calculations: M₁V₁ = M₂V₂.", explanation: "Molarity is the most common concentration unit in chemistry. Critical for solution stoichiometry and dilution problems.", bloomLevel: "Remember" },
    ],
    topicsCovered: [
      "Chemical formulas",
      "Key equations",
      "Periodic trends",
      "Reaction types",
      "Stoichiometry",
      "Gas laws",
    ],
    studyTips: {
      workflow: [
        "Study 10 chemistry flashcards per day, focusing on both the concept and its application",
        "Practice using formulas by working example problems after reviewing each card",
        "Review missed cards daily, then space out reviews as you master them",
      ],
      tips: [
        "Write formulas and equations from memory, then check—active recall beats passive review",
        "Link concepts: understand how molarity relates to stoichiometry, how atomic structure explains periodic trends",
        "Use dimensional analysis to check if your calculations make sense (units should cancel correctly)",
      ],
    },
    faq: [
      { q: "What chemistry concepts are covered?", a: "Flashcards cover formulas, equations, periodic trends, reaction types, stoichiometry, and problem-solving strategies." },
      { q: "Do cards include example problems?", a: "Yes. Each card shows the concept, formula, and an example application demonstrating how to use it." },
      { q: "Can I create flashcards from my textbook?", a: "Yes. Upload PDF pages or paste text from any chemistry textbook to generate custom flashcards." },
      { q: "Is this enough to learn chemistry?", a: "Flashcards help you memorize concepts and formulas. You also need to practice solving problems to apply what you've learned." },
    ],
    relatedPages: [
      "/subjects/chemistry",
      "/subjects/chemistry/quiz",
      "/subjects/biology/flashcards",
      "/ai-flashcards",
    ],
  },
];
