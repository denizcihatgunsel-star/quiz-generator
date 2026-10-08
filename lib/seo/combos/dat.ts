/**
 * Combo pages for DAT exam hub
 */
import type { ComboData } from "./types";

export const DAT_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "dat practice questions",
      secondaryKeywords: ["dat practice test", "dat questions"],
      monthlyVolume: 3600,
    },
    h1: "DAT Practice Questions — Dental Admission Test Prep",
    intro:
      "Prepare for the Dental Admission Test (DAT) with comprehensive practice questions covering biology, general chemistry, organic chemistry, perceptual ability concepts, quantitative reasoning, and reading comprehension. The DAT is administered by the American Dental Association and required for admission to U.S. and Canadian dental schools. These questions follow DAT format and difficulty, testing both factual knowledge and application of scientific principles. Dental-specific biology content (tooth anatomy, oral structures, dental materials) is included alongside standard pre-health sciences. Each question includes detailed explanations connecting concepts to dental applications where relevant. Master the content and test-taking strategies dental schools use to evaluate applicants' readiness for rigorous dental education.",
    sampleItems: [
      {
        q: "Which salivary gland produces primarily serous (watery) secretions rich in amylase?",
        a: "Parotid gland",
        explanation:
          "The parotid gland produces watery, enzyme-rich serous saliva high in amylase for starch digestion. Located anterior to the ear, it empties via Stensen's duct opposite the upper second molar. The submandibular gland produces mixed serous and mucous secretions; the sublingual produces mostly mucous secretions.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "In an SN2 reaction, the nucleophile attacks from which direction?",
        a: "Backside, causing inversion of stereochemistry",
        explanation:
          "SN2 (bimolecular nucleophilic substitution) proceeds via backside attack in a single concerted step. The nucleophile approaches from the opposite side of the leaving group, causing Walden inversion (stereochemical inversion) at the reaction center. No carbocation intermediate forms.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "Approximately how many ATP molecules are produced from complete aerobic oxidation of one glucose molecule?",
        a: "36-38 ATP",
        explanation:
          "Glycolysis yields 2 ATP (net), Krebs cycle yields 2 ATP, and the electron transport chain produces ~32-34 ATP from NADH and FADH2, totaling 36-38 ATP. Exact number varies depending on shuttle system used to transport NADH into mitochondria.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "The periodontal ligament connects:",
        a: "Tooth root cementum to alveolar bone",
        explanation:
          "The periodontal ligament (PDL) is fibrous connective tissue anchoring the tooth root (covered by cementum) to the surrounding alveolar bone socket. It provides shock absorption during chewing, supplies nutrients to cementum and bone, and contains sensory nerve endings providing proprioceptive feedback.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "What is the pH of a buffer solution containing equal concentrations of acetic acid (pKa = 4.76) and acetate ion?",
        a: "4.76",
        explanation:
          "According to the Henderson-Hasselbalch equation: pH = pKa + log([A⁻]/[HA]). When [A⁻] = [HA], the ratio equals 1, and log(1) = 0, so pH = pKa. Buffer solutions resist pH changes most effectively when pH is within ±1 unit of the pKa.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "Enamel is approximately what percentage hydroxyapatite by weight?",
        a: "96% mineral (hydroxyapatite crystals)",
        explanation:
          "Enamel is the most mineralized tissue in the human body, approximately 96% hydroxyapatite [Ca₁₀(PO₄)₆(OH)₂] by weight, with only 4% water and organic material. This high mineral content makes enamel extremely hard but also brittle. Dentin is 70% mineral, cementum 45-50%.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which tooth surface is closest to the midline?",
        a: "Mesial",
        explanation:
          "Dental directional terms: Mesial = toward the midline (front center), Distal = away from midline, Facial/Buccal = toward cheek/lips, Lingual = toward tongue, Occlusal = chewing surface, Incisal = biting edge. 'Mesial' comes from Greek 'mesos' meaning middle.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "In the electron transport chain, which complex pumps the most protons across the inner mitochondrial membrane?",
        a: "Complex I (NADH dehydrogenase)",
        explanation:
          "Complex I pumps 4 protons per NADH, Complex III pumps 4 protons, Complex IV pumps 2 protons. This proton gradient (high concentration in intermembrane space) drives ATP synthase to produce ATP through chemiosmosis. FADH2 enters at Complex II, producing fewer ATP than NADH.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Biology: cell biology, genetics, evolution, diversity of life, structure and function of systems, developmental biology, dental-specific topics (tooth anatomy, oral structures, salivary glands)",
      "General Chemistry: atomic structure, periodic table, chemical bonding, stoichiometry, gases, solutions, acids and bases, chemical equilibrium, thermodynamics, kinetics, electrochemistry",
      "Organic Chemistry: nomenclature, stereochemistry, functional groups, reactions and mechanisms (SN1/SN2, E1/E2, addition, elimination, aromatic chemistry), spectroscopy basics",
      "Perceptual Ability: spatial visualization concepts (not fully testable in text format—official DAT practice includes visual PAT section)",
      "Quantitative Reasoning: algebra, probability, statistics, geometry, trigonometry, applied mathematics, word problems",
      "Reading Comprehension: passage analysis from scientific and general interest topics, identifying main ideas, inferences, author's purpose",
    ],
    studyTips: {
      workflow: [
        "Balance study across all sections—DAT scores are reported separately for each section, and dental schools consider all scores, not just an overall average",
        "For sciences, create summary sheets for each major topic (cellular respiration, acid-base chemistry, stereochemistry) consolidating key concepts and formulas",
        "Practice the Perceptual Ability Test (PAT) regularly using official DAT practice materials—spatial skills improve dramatically with consistent practice",
      ],
      tips: [
        "Dental-specific biology appears primarily in the biology section: tooth anatomy, histology of oral tissues, salivary glands, TMJ. Use dental anatomy resources to supplement general biology knowledge",
        "Organic chemistry mechanisms matter more than memorizing individual reactions—understand electron movement patterns (nucleophile attacks electrophile, leaving groups depart)",
        "Time management is critical: biology and chemistry sections are 60 minutes for 40 questions each. Practice pacing to average 1.5 minutes per question, flagging difficult ones to revisit",
      ],
    },
    faq: [
      {
        q: "Are these official DAT questions?",
        a: "No. These are practice questions covering DAT content areas to help you study. For official practice tests and the PAT section, visit the ADA website at ada.org/dat or use ADA-approved prep materials.",
      },
      {
        q: "What is a competitive DAT score?",
        a: "DAT scores are standard scores (mean 17, SD 3.4). Competitive scores for most U.S. dental schools: Academic Average 19-21+, Perceptual Ability 19+. Top schools often see averages of 22-24+. Check specific school averages.",
      },
      {
        q: "How long is the DAT?",
        a: "The DAT is 4 hours 15 minutes of testing plus a 30-minute optional break: Survey of Natural Sciences (90 min), Perceptual Ability (60 min), Reading Comprehension (60 min), Quantitative Reasoning (45 min).",
      },
      {
        q: "Can I use a calculator?",
        a: "No. Calculators are not permitted on the DAT. An on-screen basic calculator is provided for the Quantitative Reasoning section only. Practice mental math and estimation for science calculations.",
      },
      {
        q: "How many times can I take the DAT?",
        a: "You can take the DAT once every 90 days, with a maximum of four attempts in any 12-month period. Most dental schools see all scores, so retake only if you're confident of significant improvement.",
      },
      {
        q: "Do I need to know tooth numbering systems?",
        a: "Basic familiarity helps. Universal numbering (1-32) is most common in the U.S. Questions won't explicitly test numbering, but understanding dental anatomy and terminology is beneficial for context.",
      },
    ],
    relatedPages: [
      "/exams/dat",
      "/subjects/biology",
      "/subjects/chemistry",
      "/subjects/anatomy",
      "/quiz-generator-from-pdf",
      "/ai-quiz-generator",
    ],
  },
];
