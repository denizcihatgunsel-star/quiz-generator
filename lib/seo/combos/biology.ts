/**
 * Combo pages for Biology subject hub
 */
import type { ComboData } from "./types";

export const BIOLOGY_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "biology practice questions",
      secondaryKeywords: ["biology practice test", "biology quiz questions", "biology multiple choice questions"],
      monthlyVolume: 1600,
    },
    h1: "Biology Practice Questions — Test Your Science Knowledge",
    intro:
      "Master biology concepts with practice questions covering cells, genetics, evolution, ecology, and human body systems. Each question includes detailed explanations of biological processes and principles. Perfect for AP Biology prep, college intro biology courses, or MCAT study.",
    sampleItems: [
      {
        q: "What is the primary function of mitochondria in eukaryotic cells?",
        a: "Produce ATP through cellular respiration",
        explanation:
          "Mitochondria are the powerhouse of the cell, converting glucose and oxygen into ATP (adenosine triphosphate) through the process of cellular respiration. This provides energy for cellular functions.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which type of RNA carries amino acids to the ribosome during protein synthesis?",
        a: "tRNA (transfer RNA)",
        explanation:
          "Transfer RNA molecules bind to specific amino acids and transport them to the ribosome, where they are assembled into proteins according to mRNA sequence.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "In Mendelian genetics, if both parents are heterozygous (Aa) for a trait, what percentage of offspring will be homozygous recessive (aa)?",
        a: "25%",
        explanation:
          "Use a Punnett square: Aa × Aa produces AA (25%), Aa (50%), and aa (25%). One in four offspring will be homozygous recessive.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "Which process do plants use to convert light energy into chemical energy?",
        a: "Photosynthesis",
        explanation:
          "Photosynthesis occurs in chloroplasts, where plants use sunlight, CO₂, and water to produce glucose (C₆H₁₂O₆) and oxygen. The light-dependent reactions and Calvin cycle work together.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "True or False: Enzymes are consumed in the reactions they catalyze.",
        a: "False",
        explanation:
          "False. Enzymes are biological catalysts that speed up reactions by lowering activation energy, but they are NOT consumed. They can be reused multiple times.",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "What structure in the cell membrane controls what enters and exits the cell?",
        a: "Phospholipid bilayer with embedded proteins (selectively permeable membrane)",
        explanation:
          "The cell membrane's phospholipid bilayer allows some substances to pass (small, nonpolar molecules) while blocking others. Transport proteins facilitate movement of larger or charged molecules.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "During which phase of mitosis do chromosomes align at the cell's equator?",
        a: "Metaphase",
        explanation:
          "In metaphase, chromosomes line up along the metaphase plate (cell equator) attached to spindle fibers. This precedes anaphase, when sister chromatids separate.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which level of protein structure involves the formation of alpha helices and beta sheets?",
        a: "Secondary structure",
        explanation:
          "Secondary structure forms through hydrogen bonding in the polypeptide backbone, creating regular patterns like alpha helices (coils) and beta sheets (pleats). Primary = sequence, tertiary = 3D folding, quaternary = multiple subunits.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Cell structure and function",
      "Genetics and heredity",
      "Evolution and natural selection",
      "Ecology and populations",
      "Human anatomy and physiology",
      "Photosynthesis and cellular respiration",
      "DNA, RNA, and protein synthesis",
      "Mitosis and meiosis",
    ],
    studyTips: {
      workflow: [
        "Take a practice test to identify which biology topics need more study",
        "Review textbook sections and notes for concepts you missed",
        "Retake the test after studying to confirm mastery",
      ],
      tips: [
        "Draw diagrams for processes like mitosis, photosynthesis, and protein synthesis—visual learning helps with complex biology",
        "Connect concepts: understand how cellular respiration and photosynthesis are opposite processes",
        "Use mnemonics for sequences: PMAT for mitosis phases (Prophase, Metaphase, Anaphase, Telophase)",
      ],
    },
    faq: [
      {
        q: "What biology topics are covered?",
        a: "Questions cover cell biology, genetics, evolution, ecology, human anatomy and physiology, and molecular biology at high school and college intro levels.",
      },
      {
        q: "Are these good for AP Biology?",
        a: "Yes. Questions match AP Biology format and difficulty, testing both factual knowledge and application of biological concepts.",
      },
      {
        q: "Do explanations include diagrams?",
        a: "Explanations describe biological processes in detail. For visual learners, supplement with diagrams from your textbook.",
      },
      {
        q: "Can I practice specific topics only?",
        a: "Yes. Upload notes on a specific topic (like genetics or cell respiration) to generate focused practice questions.",
      },
    ],
    relatedPages: [
      "/subjects/biology",
      "/subjects/chemistry",
      "/subjects/anatomy",
      "/practice-test-generator",
      "/for-students",
    ],
  },
  {
    slug: "quiz",
    type: "quiz",
    meta: {
      type: "quiz",
      primaryKeyword: "biology quiz",
      monthlyVolume: 1000,
    },
    h1: "Biology Quiz — Quick Assessment of Your Knowledge",
    intro:
      "Test your biology understanding with interactive quizzes covering key concepts from cells to ecosystems. Perfect for quick review before class, homework checks, or identifying weak areas that need more study time.",
    sampleItems: [
      {
        q: "What is the basic unit of life?",
        a: "The cell",
        explanation: "All living organisms are made of one or more cells, making the cell the fundamental unit of life.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which organelle is responsible for photosynthesis in plant cells?",
        a: "Chloroplast",
        explanation: "Chloroplasts contain chlorophyll and are the sites of photosynthesis in plant cells.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "True or False: DNA is double-stranded while RNA is typically single-stranded.",
        a: "True",
        explanation: "DNA forms a double helix structure with two complementary strands. RNA is usually single-stranded (except in some viruses).",
        bloomLevel: "Remember",
        type: "true-false",
      },
      {
        q: "What process do cells use to divide into two identical daughter cells?",
        a: "Mitosis",
        explanation: "Mitosis is cell division that produces two genetically identical diploid cells. Meiosis produces four non-identical haploid cells (gametes).",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which blood type is considered the universal donor?",
        a: "O negative",
        explanation: "O negative blood lacks A, B, and Rh antigens, so it can be given to recipients of any blood type without causing an immune reaction.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "What is the role of ribosomes in the cell?",
        a: "Protein synthesis",
        explanation: "Ribosomes read mRNA and assemble amino acids into proteins during translation.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "True or False: Natural selection acts on phenotypes, not genotypes.",
        a: "True",
        explanation: "Natural selection favors or disfavors observable traits (phenotypes). The underlying genes (genotypes) are passed on based on phenotypic success.",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "Which molecule stores genetic information in most organisms?",
        a: "DNA (deoxyribonucleic acid)",
        explanation: "DNA stores hereditary information in sequences of nucleotide bases (A, T, G, C). RNA stores genetic information in some viruses.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Cell biology basics",
      "Genetics fundamentals",
      "Human body systems",
      "Ecology concepts",
      "Evolution and adaptation",
      "Molecular biology",
    ],
    studyTips: {
      workflow: [
        "Take a biology quiz as a quick self-assessment before studying",
        "Note which questions you miss and review those topics in your notes",
        "Retake the quiz after review to track improvement",
      ],
      tips: [
        "Focus on understanding WHY, not just memorizing facts: why does mitochondria structure relate to its function?",
        "Make connections between topics: how do cells, DNA, proteins, and traits all link together?",
        "Use real-world examples to remember concepts: antibiotic resistance as an example of evolution in action",
      ],
    },
    faq: [
      {
        q: "How many questions are in a biology quiz?",
        a: "Sample quizzes have 8-10 questions. Generate custom quizzes of any length from your course material.",
      },
      {
        q: "What difficulty level are the questions?",
        a: "Questions range from basic recall to application. Create quizzes at your specific level by uploading your textbook or notes.",
      },
      {
        q: "Can I retake quizzes?",
        a: "Yes. Quizzes are reusable, or generate new quizzes on the same topic with fresh questions.",
      },
      {
        q: "Are these suitable for AP Biology?",
        a: "Yes, when you upload AP-level material. Questions adapt to match the depth and complexity of your source content.",
      },
    ],
    relatedPages: [
      "/subjects/biology",
      "/subjects/biology/practice-questions",
      "/subjects/chemistry/quiz",
      "/ai-quiz-generator",
    ],
  },
];
