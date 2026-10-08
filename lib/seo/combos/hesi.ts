/**
 * Combo pages for HESI exam hub
 */
import type { ComboData } from "./types";

export const HESI_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "hesi practice questions",
      secondaryKeywords: ["hesi practice test", "hesi questions"],
      monthlyVolume: 12100,
    },
    h1: "HESI Practice Questions — Nursing Admission Test Prep",
    intro:
      "Prepare for the HESI A2 nursing admissions exam with comprehensive practice questions covering anatomy and physiology, biology, chemistry, math, reading comprehension, vocabulary, and grammar. These questions mirror the format and difficulty of the actual HESI exam, helping you identify weak areas and build confidence before test day. Master the content domains that nursing programs use to evaluate applicants, from scientific concepts to verbal and quantitative reasoning skills required for nursing school success.",
    sampleItems: [
      {
        q: "Which valve prevents backflow from the left ventricle into the left atrium?",
        a: "Mitral valve (bicuspid valve)",
        explanation:
          "The mitral valve (also called bicuspid valve) is located between the left atrium and left ventricle. It closes during ventricular contraction to prevent blood from flowing backward into the atrium.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "During meiosis, chromosome number is reduced from diploid to haploid. If a human cell begins meiosis with 46 chromosomes, how many will each gamete contain?",
        a: "23 chromosomes",
        explanation:
          "Meiosis reduces the chromosome number by half, creating haploid gametes. Human somatic cells have 46 chromosomes (diploid), so gametes have 23 (haploid). When egg and sperm unite at fertilization, the diploid number is restored.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "A patient receives 250 mL of IV fluid over 2 hours. What is the flow rate in mL per hour?",
        a: "125 mL/hour",
        explanation:
          "Divide total volume by total time: 250 mL ÷ 2 hours = 125 mL/hour. This basic rate calculation appears frequently on HESI math sections.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What is the primary function of the nephron?",
        a: "Filter blood and form urine",
        explanation:
          "The nephron is the kidney's functional unit. Each kidney contains about 1 million nephrons that filter waste from blood, reabsorb needed substances, and produce urine through filtration, reabsorption, and secretion.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "The prefix 'brady-' means:",
        a: "Slow",
        explanation:
          "Brady- means slow. Bradycardia = slow heart rate (under 60 bpm), bradypnea = slow breathing rate. The opposite prefix is 'tachy-' meaning fast.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "In a hypertonic solution, a cell will:",
        a: "Shrink as water leaves the cell",
        explanation:
          "Hypertonic solutions have higher solute concentration outside the cell than inside. Water moves out by osmosis from high to low water concentration, causing the cell to shrink (crenate).",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "What percentage of 60 is 15?",
        a: "25%",
        explanation:
          "To find what percent 15 is of 60: (15 ÷ 60) × 100 = 0.25 × 100 = 25%. Percentage problems are common on HESI math.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "The sympathetic nervous system is responsible for:",
        a: "Fight-or-flight responses",
        explanation:
          "The sympathetic division of the autonomic nervous system activates during stress or danger, increasing heart rate, blood pressure, glucose release, and alertness while inhibiting digestion—the fight-or-flight response.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "Choose the word closest in meaning to 'lethargic':",
        a: "Sluggish and drowsy",
        explanation:
          "Lethargic means lacking energy, sluggish, drowsy, or abnormally tired. In clinical contexts, lethargy describes a decreased level of consciousness between alert and obtunded.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which organelle contains digestive enzymes that break down cellular waste?",
        a: "Lysosome",
        explanation:
          "Lysosomes contain hydrolytic enzymes that digest worn-out organelles, bacteria, and cellular debris. They function as the cell's waste disposal system, breaking down materials for recycling or elimination.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Anatomy and Physiology (cardiovascular, respiratory, digestive, urinary, nervous, skeletal, muscular systems)",
      "Biology (cell biology, genetics, cellular respiration, photosynthesis, evolution, ecology)",
      "Chemistry (atomic structure, periodic table, chemical bonding, acids and bases, solutions)",
      "Math (fractions, decimals, percentages, ratios, algebraic equations, conversions, basic word problems)",
      "Reading Comprehension (main ideas, inferences, author's purpose, supporting details)",
      "Vocabulary (medical terminology, academic words, context clues, word parts)",
      "Grammar (subject-verb agreement, punctuation, sentence structure, parts of speech)",
    ],
    studyTips: {
      workflow: [
        "Take a diagnostic practice test covering all HESI sections to identify your strongest and weakest areas",
        "Focus study time on sections scoring below 75%, as most nursing programs have minimum score requirements per section",
        "Retake practice questions weekly, tracking improvement and ensuring you understand explanations for every missed question",
      ],
      tips: [
        "HESI heavily tests anatomy and physiology—memorize all major body systems, their organs, and functions before test day",
        "Math problems focus on nursing calculations: dosages, IV rates, percentages, conversions—practice these formats specifically",
        "Reading passages are dense and technical; practice extracting main ideas and supporting details from health sciences texts",
      ],
    },
    faq: [
      {
        q: "Are these official HESI questions?",
        a: "No. These are AI-generated practice questions following HESI A2 format and content areas to help you prepare. For official practice tests, visit Elsevier's HESI preparation resources.",
      },
      {
        q: "What score do I need to get into nursing school?",
        a: "Minimum HESI scores vary by program, typically 75-85% overall with section-specific minimums. Check your target nursing programs' admissions requirements.",
      },
      {
        q: "How many times can I take the HESI?",
        a: "Retake policies vary by nursing program. Some allow one retake after a waiting period, others limit attempts per application cycle. Check with your specific program.",
      },
      {
        q: "Which HESI sections are required?",
        a: "Most programs require Anatomy & Physiology, Biology, Chemistry, Math, Reading, Vocabulary, and Grammar. Some also require Physics or Learning Style assessments. Confirm requirements with your program.",
      },
      {
        q: "How long should I study for the HESI?",
        a: "Most students study 4-8 weeks depending on background. Those with recent science coursework may need less time; those returning to school after years may need longer.",
      },
      {
        q: "Can I use a calculator on the HESI?",
        a: "Yes. The HESI provides an on-screen calculator for the math section. Practice using a basic calculator since scientific functions may not be available.",
      },
    ],
    relatedPages: [
      "/exams/hesi",
      "/exams/nclex",
      "/subjects/anatomy",
      "/subjects/biology",
      "/subjects/nursing",
      "/subjects/medical-terminology",
      "/subjects/pharmacology",
      "/ai-quiz-generator",
    ],
  },
];
