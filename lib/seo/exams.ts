/**
 * Exam types collection for programmatic SEO Wave 2.
 * Each exam is a practice test generator page with disclaimers.
 */

export interface ExamType {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  owner?: string;
  disclaimer: string;
  sampleQuestions: { q: string; a: string; explanation: string }[];
  faq: { q: string; a: string }[];
  relatedTools: string[];
  relatedSubjects?: string[];
}

export const EXAMS: ExamType[] = [
  {
    slug: "sat",
    name: "SAT",
    fullName: "SAT (Scholastic Assessment Test)",
    description:
      "Generate practice questions for SAT prep covering reading, writing, and math sections.",
    owner: "College Board",
    disclaimer:
      "Examina is not affiliated with, endorsed by, or sponsored by the College Board. These are original practice questions created by AI for study purposes only, not official SAT questions.",
    sampleQuestions: [
      {
        q: "Which word best completes the sentence? The scientist's discovery was _____, challenging decades of established theory.",
        a: "revolutionary",
        explanation:
          "The context indicates a significant challenge to existing knowledge, making 'revolutionary' the best fit.",
      },
      {
        q: "If 3x + 7 = 22, what is the value of x?",
        a: "5",
        explanation: "Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.",
      },
      {
        q: "The passage suggests that the author views technological progress as:",
        a: "inevitable but requiring careful management",
        explanation:
          "The author acknowledges progress will continue while emphasizing the need for ethical frameworks.",
      },
    ],
    faq: [
      {
        q: "Are these real SAT questions?",
        a: "No. These are original practice questions created by AI for study purposes. They follow SAT format and difficulty but are not official College Board materials.",
      },
      {
        q: "Can I use this to study for the SAT?",
        a: "Yes. These practice questions help you prepare by testing similar skills to the real SAT. For official practice tests, visit the College Board website.",
      },
      {
        q: "What SAT sections can I practice?",
        a: "Generate questions covering reading comprehension, grammar and writing, and math (algebra, geometry, data analysis).",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 5 quiz generations per month. Paid plans start at $2/month for 20 quizzes.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
      "/for-students",
    ],
    relatedSubjects: ["math", "english"],
  },
  {
    slug: "act",
    name: "ACT",
    fullName: "ACT (American College Testing)",
    description:
      "Create ACT practice questions for English, math, reading, and science reasoning sections.",
    owner: "ACT, Inc.",
    disclaimer:
      "Examina is not affiliated with, endorsed by, or sponsored by ACT, Inc. These are original practice questions for study purposes only, not official ACT materials.",
    sampleQuestions: [
      {
        q: "Choose the best revision: The team, having practiced diligently, were ready for the competition.",
        a: "was ready",
        explanation:
          "The subject 'team' is singular, so the verb should be 'was' not 'were'. The phrase 'having practiced diligently' is a modifier.",
      },
      {
        q: "What is the slope of the line passing through points (2, 5) and (8, 17)?",
        a: "2",
        explanation:
          "Slope = (y₂ - y₁)/(x₂ - x₁) = (17 - 5)/(8 - 2) = 12/6 = 2.",
      },
      {
        q: "Based on the data, which factor most directly affects photosynthesis rate?",
        a: "Light intensity",
        explanation:
          "The graph shows photosynthesis rate increases linearly with light intensity until reaching saturation.",
      },
    ],
    faq: [
      {
        q: "Are these official ACT questions?",
        a: "No. These are AI-generated practice questions that follow ACT format and difficulty. For official practice, visit act.org.",
      },
      {
        q: "What ACT sections can I practice?",
        a: "Generate questions for English (grammar, rhetoric), math, reading comprehension, and science reasoning.",
      },
      {
        q: "How are these different from the SAT?",
        a: "ACT includes a science reasoning section and emphasizes speed. Question style is more straightforward than SAT.",
      },
      {
        q: "Can I practice the essay section?",
        a: "Examina focuses on multiple choice questions. For essay practice, use our study guide generator to outline arguments.",
      },
    ],
    relatedTools: ["/ai-quiz-generator", "/for-students", "/study-guide-generator"],
    relatedSubjects: ["math", "english", "biology"],
  },
  {
    slug: "ap",
    name: "AP",
    fullName: "AP (Advanced Placement)",
    description:
      "Generate practice questions for AP exams across subjects including AP Biology, AP US History, AP Calculus, and more.",
    owner: "College Board",
    disclaimer:
      "Examina is not affiliated with or endorsed by the College Board. These are original practice questions for study purposes, not official AP exam materials.",
    sampleQuestions: [
      {
        q: "Which process directly requires ATP in cellular respiration?",
        a: "Phosphorylation during glycolysis",
        explanation:
          "Glycolysis requires an initial investment of 2 ATP molecules to phosphorylate glucose before energy production begins.",
      },
      {
        q: "The Supreme Court's decision in Marbury v. Madison (1803) established which principle?",
        a: "Judicial review",
        explanation:
          "Marbury v. Madison established the Court's power to declare laws unconstitutional, creating the principle of judicial review.",
      },
      {
        q: "Find the derivative of f(x) = 3x² + 2x - 5.",
        a: "f'(x) = 6x + 2",
        explanation:
          "Apply the power rule: derivative of x² is 2x, derivative of x is 1, derivative of a constant is 0.",
      },
    ],
    faq: [
      {
        q: "Which AP subjects can I practice?",
        a: "Generate questions for any AP subject by uploading your course notes. Popular subjects include AP Biology, Chemistry, US History, Calculus, and English Literature.",
      },
      {
        q: "Are these official AP questions?",
        a: "No. These are original practice questions following AP format and difficulty. For official materials, visit the College Board AP Central.",
      },
      {
        q: "Do questions match the AP exam format?",
        a: "Yes. Questions are created at appropriate difficulty with explanations and tagged by cognitive skill (recall, analysis, application).",
      },
      {
        q: "Can I practice FRQs (free response questions)?",
        a: "Examina focuses on multiple choice. For FRQ practice, use our study guide generator to outline key concepts and arguments.",
      },
    ],
    relatedTools: [
      "/quiz-generator-from-pdf",
      "/notes-to-quiz",
      "/ai-quiz-generator",
    ],
    relatedSubjects: ["biology", "chemistry", "history", "math"],
  },
  {
    slug: "mcat",
    name: "MCAT",
    fullName: "MCAT (Medical College Admission Test)",
    description:
      "Create MCAT practice questions for biology, chemistry, physics, psychology, and critical reasoning sections.",
    owner: "AAMC (Association of American Medical Colleges)",
    disclaimer:
      "Examina is not affiliated with or endorsed by the AAMC. These are original practice questions for study purposes only, not official MCAT materials.",
    sampleQuestions: [
      {
        q: "Which amino acid is most likely to be found in the hydrophobic core of a protein?",
        a: "Leucine",
        explanation:
          "Leucine is a nonpolar amino acid with a hydrophobic side chain, making it likely to be buried in the protein interior away from water.",
      },
      {
        q: "A buffer solution contains equal concentrations of acetic acid (pKa = 4.76) and acetate. What is the pH?",
        a: "4.76",
        explanation:
          "According to the Henderson-Hasselbalch equation, when [acid] = [base], pH = pKa.",
      },
      {
        q: "According to the social cognitive theory, which factor most influences behavior change?",
        a: "Self-efficacy",
        explanation:
          "Self-efficacy (belief in one's ability to succeed) is central to social cognitive theory and strongly predicts behavior change.",
      },
    ],
    faq: [
      {
        q: "Are these real MCAT questions?",
        a: "No. These are AI-generated practice questions following MCAT format and difficulty. For official practice, visit aamc.org.",
      },
      {
        q: "What MCAT sections can I practice?",
        a: "Generate questions for all MCAT sections: biological and biochemical foundations, chemical and physical foundations, psychological and sociological foundations, and CARS (critical analysis).",
      },
      {
        q: "How do I use this for MCAT prep?",
        a: "Upload your review book chapter or notes by topic (e.g., amino acids, circuits, cognition) and generate practice questions. Review explanations for missed questions.",
      },
      {
        q: "Is this enough to study for the MCAT?",
        a: "This is a supplement to your MCAT prep. Use it alongside official AAMC materials, full-length practice tests, and comprehensive review books.",
      },
    ],
    relatedTools: [
      "/quiz-generator-from-pdf",
      "/ai-flashcards",
      "/study-guide-generator",
    ],
    relatedSubjects: ["biology", "chemistry", "physics", "psychology", "anatomy"],
  },
  {
    slug: "nclex",
    name: "NCLEX",
    fullName: "NCLEX-RN (National Council Licensure Examination for Registered Nurses)",
    description:
      "Generate NCLEX-style practice questions for nursing students covering safety, pharmacology, health promotion, and physiological adaptation.",
    owner: "NCSBN (National Council of State Boards of Nursing)",
    disclaimer:
      "Examina is not affiliated with or endorsed by the NCSBN. These are original practice questions for nursing study, not official NCLEX test items.",
    sampleQuestions: [
      {
        q: "A client receiving warfarin has an INR of 4.5. Which action should the nurse take first?",
        a: "Hold the next dose and notify the provider",
        explanation:
          "An INR of 4.5 is above the therapeutic range (2-3) and indicates increased bleeding risk. The dose should be held and the provider notified for adjustment.",
      },
      {
        q: "Which finding indicates a complication of peripheral IV therapy?",
        a: "Swelling and coolness at the insertion site",
        explanation:
          "Swelling and coolness suggest infiltration (IV fluid leaking into surrounding tissue), requiring immediate discontinuation of the IV.",
      },
      {
        q: "A nurse is teaching a client about taking levothyroxine. Which instruction is most important?",
        a: "Take the medication on an empty stomach in the morning",
        explanation:
          "Levothyroxine absorption is best on an empty stomach, and morning dosing helps prevent insomnia from increased metabolism.",
      },
    ],
    faq: [
      {
        q: "Are these real NCLEX questions?",
        a: "No. These are original practice questions following NCLEX format and cognitive levels. For official practice, visit ncsbn.org.",
      },
      {
        q: "What NCLEX categories can I practice?",
        a: "Generate questions across all NCLEX categories: safe and effective care, health promotion, psychosocial integrity, and physiological integrity.",
      },
      {
        q: "Do questions use NCLEX format?",
        a: "Yes. Questions follow NCLEX-style wording with priority ('most important,' 'first action') and evidence-based rationales.",
      },
      {
        q: "Can this replace NCLEX review courses?",
        a: "This is a supplement for question practice. Use alongside comprehensive NCLEX review materials and practice with official NCSBN question banks.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/study-guide-generator",
    ],
    relatedSubjects: ["nursing", "anatomy", "psychology"],
  },
  {
    slug: "gre",
    name: "GRE",
    fullName: "GRE (Graduate Record Examination)",
    description:
      "Create GRE practice questions for verbal reasoning, quantitative reasoning, and analytical writing preparation.",
    owner: "ETS (Educational Testing Service)",
    disclaimer:
      "Examina is not affiliated with or endorsed by ETS. These are original practice questions, not official GRE materials.",
    sampleQuestions: [
      {
        q: "The scientist's argument was _____, relying on incomplete data and unverified assumptions.",
        a: "tenuous",
        explanation:
          "Tenuous means weak or insubstantial, fitting the description of an argument built on incomplete evidence.",
      },
      {
        q: "If x/3 = 12, what is x + 10?",
        a: "46",
        explanation: "x/3 = 12, so x = 36. Then x + 10 = 36 + 10 = 46.",
      },
      {
        q: "Select two words that produce sentences with similar meanings: The policy was _____. (A) ambiguous (B) lucid (C) obscure (D) vague",
        a: "ambiguous, vague",
        explanation:
          "Both ambiguous and vague describe something unclear or open to interpretation.",
      },
    ],
    faq: [
      {
        q: "Are these official GRE questions?",
        a: "No. These are AI-generated practice questions following GRE format. For official materials, visit ets.org/gre.",
      },
      {
        q: "What GRE sections can I practice?",
        a: "Generate questions for verbal reasoning (vocabulary, reading comprehension) and quantitative reasoning (arithmetic, algebra, geometry, data analysis).",
      },
      {
        q: "Can I practice analytical writing?",
        a: "Examina focuses on multiple choice questions. For essay practice, use our study guide generator to outline argument structures.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 5 quiz generations per month. Paid plans start at $2/month.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/vocabulary",
      "/multiple-choice-quiz-maker",
    ],
    relatedSubjects: ["math", "english", "vocabulary"],
  },
  {
    slug: "lsat",
    name: "LSAT",
    fullName: "LSAT (Law School Admission Test)",
    description:
      "Generate LSAT practice questions for logical reasoning, analytical reasoning (logic games), and reading comprehension.",
    owner: "LSAC (Law School Admission Council)",
    disclaimer:
      "Examina is not affiliated with or endorsed by LSAC. These are original practice questions for study purposes, not official LSAT materials.",
    sampleQuestions: [
      {
        q: "The argument assumes which of the following?",
        a: "Past trends will continue into the future",
        explanation:
          "The conclusion extrapolates from historical data, relying on the unstated assumption that observed patterns will persist.",
      },
      {
        q: "If all lawyers are professionals, and some professionals are wealthy, which must be true?",
        a: "Some lawyers may be wealthy",
        explanation:
          "The premises don't guarantee wealthy lawyers exist, only that it's possible since some professionals are wealthy.",
      },
      {
        q: "Which statement, if true, most weakens the argument?",
        a: "Studies show the opposite correlation in similar cases",
        explanation:
          "Evidence contradicting the claimed relationship directly undermines the argument's foundation.",
      },
    ],
    faq: [
      {
        q: "Are these real LSAT questions?",
        a: "No. These are original practice questions following LSAT format. For official PrepTests, visit lsac.org.",
      },
      {
        q: "What LSAT sections can I practice?",
        a: "Generate questions for logical reasoning (arguments, assumptions, flaws) and reading comprehension. Logic games require visual diagramming not suited to AI generation.",
      },
      {
        q: "How do I use this for LSAT prep?",
        a: "Focus on logical reasoning practice by uploading argument examples or formal logic notes. Review explanations to understand reasoning patterns.",
      },
      {
        q: "Is this enough for LSAT preparation?",
        a: "This supplements LSAT prep. Use alongside official PrepTests, full-length timed exams, and comprehensive review courses.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
      "/study-guide-generator",
    ],
    relatedSubjects: ["english"],
  },
  {
    slug: "toefl",
    name: "TOEFL",
    fullName: "TOEFL (Test of English as a Foreign Language)",
    description:
      "Create TOEFL practice questions for reading, listening comprehension, and vocabulary for English language learners.",
    owner: "ETS (Educational Testing Service)",
    disclaimer:
      "Examina is not affiliated with or endorsed by ETS. These are original practice questions, not official TOEFL materials.",
    sampleQuestions: [
      {
        q: "The word 'ubiquitous' in paragraph 2 is closest in meaning to:",
        a: "widespread",
        explanation:
          "Ubiquitous means present or found everywhere, making 'widespread' the closest synonym.",
      },
      {
        q: "According to the passage, what was the primary reason for the policy change?",
        a: "Economic pressures from international trade",
        explanation:
          "The passage explicitly states that trade imbalances forced the government to reconsider its approach.",
      },
      {
        q: "Which sentence best expresses the essential information? 'Although renewable energy costs have decreased significantly, fossil fuels remain the dominant energy source due to existing infrastructure.'",
        a: "Despite lower renewable costs, fossil fuels dominate because of infrastructure.",
        explanation:
          "This paraphrase captures the contrast and causal relationship in the original sentence.",
      },
    ],
    faq: [
      {
        q: "Are these official TOEFL questions?",
        a: "No. These are AI-generated practice questions following TOEFL format. For official practice, visit ets.org/toefl.",
      },
      {
        q: "What TOEFL sections can I practice?",
        a: "Generate reading comprehension and vocabulary questions. For speaking and writing practice, use our study guide generator.",
      },
      {
        q: "Can I practice listening?",
        a: "Examina focuses on text-based questions. TOEFL listening requires audio, which we don't currently support.",
      },
      {
        q: "Is this good for TOEFL preparation?",
        a: "This helps practice reading and vocabulary skills. Combine with official TOEFL materials that include all four sections (reading, listening, speaking, writing).",
      },
    ],
    relatedTools: [
      "/vocabulary",
      "/ai-quiz-generator",
      "/for-students",
    ],
    relatedSubjects: ["english", "vocabulary"],
  },
  {
    slug: "ielts",
    name: "IELTS",
    fullName: "IELTS (International English Language Testing System)",
    description:
      "Generate IELTS practice questions for academic reading, vocabulary, and comprehension for English language proficiency.",
    owner: "British Council, IDP Education, and Cambridge Assessment English",
    disclaimer:
      "Examina is not affiliated with or endorsed by British Council, IDP Education, or Cambridge Assessment. These are original practice questions, not official IELTS materials.",
    sampleQuestions: [
      {
        q: "The passage indicates that the main cause of urban migration is:",
        a: "Economic opportunities in cities",
        explanation:
          "The author cites employment prospects as the primary driver of rural-to-urban population movement.",
      },
      {
        q: "Which statement agrees with the writer's view?",
        a: "Technology has both benefits and drawbacks for society",
        explanation:
          "The passage presents a balanced view, acknowledging positive impacts while noting concerns.",
      },
      {
        q: "Complete the summary: Urban planners must consider ___ when designing public spaces.",
        a: "accessibility",
        explanation:
          "The passage emphasizes ensuring spaces are usable by all community members regardless of ability.",
      },
    ],
    faq: [
      {
        q: "Are these real IELTS questions?",
        a: "No. These are AI-generated practice questions following IELTS format. For official practice tests, visit ielts.org.",
      },
      {
        q: "What IELTS sections can I practice?",
        a: "Generate academic reading questions (True/False/Not Given, matching, summary completion) and vocabulary. Speaking and writing require human evaluation.",
      },
      {
        q: "Can I practice IELTS listening?",
        a: "Not currently. IELTS listening requires audio content which Examina doesn't support yet.",
      },
      {
        q: "Is this suitable for IELTS preparation?",
        a: "This helps practice reading comprehension skills. For complete IELTS prep, use official materials covering all four sections and take full practice tests.",
      },
    ],
    relatedTools: ["/vocabulary", "/ai-quiz-generator", "/fill-in-the-blank-generator"],
    relatedSubjects: ["english", "vocabulary"],
  },
  {
    slug: "midterm",
    name: "Midterm",
    fullName: "Midterm Exam",
    description:
      "Create midterm practice questions from your course notes for any subject. Perfect for college and high school midterm preparation.",
    disclaimer:
      "These are practice questions for study purposes. Questions are generated from your own course materials and are not official exam questions.",
    sampleQuestions: [
      {
        q: "Which event directly led to the outbreak of World War I?",
        a: "The assassination of Archduke Franz Ferdinand",
        explanation:
          "While tensions existed, the assassination in June 1914 triggered the chain of alliances that led to war.",
      },
      {
        q: "In Python, what does the 'append()' method do?",
        a: "Adds an element to the end of a list",
        explanation:
          "The append() method modifies the list in-place by adding the specified element at the end.",
      },
      {
        q: "Calculate the equilibrium constant Kc if [products] = 0.5 M and [reactants] = 0.1 M for a 1:1 reaction.",
        a: "5",
        explanation:
          "Kc = [products]/[reactants] = 0.5/0.1 = 5 for a simple 1:1 reaction.",
      },
    ],
    faq: [
      {
        q: "How do I create a midterm study quiz?",
        a: "Upload your class notes, textbook chapters, or lecture slides for the units being tested. Examina generates questions covering all the material.",
      },
      {
        q: "What subjects can I practice?",
        a: "Any subject. Upload notes from history, science, math, literature, or any other course and get practice questions.",
      },
      {
        q: "Can I make questions match my professor's style?",
        a: "Yes. If you have past quizzes or exams, upload them as examples and generate new questions in a similar format.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 5 quiz generations per month—enough for one midterm per subject. Paid plans start at $2/month.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/quiz-generator-from-pdf",
      "/study-guide-generator",
    ],
  },
  {
    slug: "finals",
    name: "Finals",
    fullName: "Final Exam",
    description:
      "Generate comprehensive final exam practice questions from a full semester of notes. Study smarter for college and high school finals.",
    disclaimer:
      "These are practice questions for study purposes. Questions are generated from your own course materials and are not official exam questions.",
    sampleQuestions: [
      {
        q: "Which cellular organelle is responsible for protein synthesis?",
        a: "Ribosome",
        explanation:
          "Ribosomes translate mRNA into proteins through the process of translation.",
      },
      {
        q: "During the Renaissance, which family was most influential in Florence?",
        a: "The Medici family",
        explanation:
          "The Medici were powerful bankers and patrons of the arts who effectively ruled Florence and funded artists like Michelangelo.",
      },
      {
        q: "What is the derivative of ln(x)?",
        a: "1/x",
        explanation:
          "The derivative of the natural logarithm ln(x) is 1/x, a fundamental calculus rule.",
      },
    ],
    faq: [
      {
        q: "How do I study for finals with this?",
        a: "Upload notes from the entire semester by unit or chapter. Generate a comprehensive quiz covering all material, then review explanations for missed questions.",
      },
      {
        q: "Can I combine notes from multiple sources?",
        a: "Yes. Paste or upload notes from lectures, textbooks, and study guides together, then generate one unified practice exam.",
      },
      {
        q: "Should I generate one big quiz or multiple smaller ones?",
        a: "Both work. Break it into topic-based quizzes for focused study, or create a full-length practice final to simulate exam conditions.",
      },
      {
        q: "Can I share the quiz with study group members?",
        a: "Yes. Every quiz gets a shareable link. Generate once and the whole study group can practice together.",
      },
    ],
    relatedTools: [
      "/quiz-generator-from-pdf",
      "/study-guide-generator",
      "/ai-flashcards",
    ],
  },
  {
    slug: "ap-us-history",
    name: "APUSH",
    fullName: "AP US History",
    description:
      "Generate AP US History practice questions covering periods 1-9, historical thinking skills, and document-based analysis for AP exam prep.",
    owner: "College Board",
    disclaimer:
      "Examina is not affiliated with or endorsed by the College Board. These are original practice questions created by AI for study purposes only, not official AP exam materials.",
    sampleQuestions: [
      {
        q: "Which development best represents the transition from colonial mercantilism to free market capitalism in early America?",
        a: "The decline of the Navigation Acts enforcement after 1763",
        explanation:
          "Weakening enforcement of mercantile restrictions allowed colonial merchants to develop independent trade networks, fostering capitalist economic development.",
      },
      {
        q: "The Supreme Court's decision in Marbury v. Madison (1803) most significantly established which principle?",
        a: "Judicial review",
        explanation:
          "Marbury v. Madison established the Court's power to declare laws unconstitutional, creating the foundational principle of judicial review in American government.",
      },
      {
        q: "How did the Second Great Awakening influence reform movements in antebellum America?",
        a: "It emphasized individual moral responsibility, inspiring temperance, abolitionist, and women's rights movements",
        explanation:
          "The religious revival stressed personal salvation and moral improvement, which motivated many Americans to work for social reform causes.",
      },
    ],
    faq: [
      {
        q: "Are these real AP US History exam questions?",
        a: "No. These are original practice questions created by AI following AP format and difficulty. For official practice exams, visit the College Board AP Central website.",
      },
      {
        q: "What APUSH periods and themes are covered?",
        a: "Generate questions covering all nine periods (1491-present) and all themes: American and National Identity, Work/Exchange/Technology, Geography and Environment, Migration and Settlement, Politics and Power, America in the World, American and Regional Culture, and Social Structures.",
      },
      {
        q: "Do questions match the AP exam format?",
        a: "Yes. Questions test historical thinking skills (comparison, causation, continuity and change, contextualization) and are tagged by difficulty level and skill type.",
      },
      {
        q: "Can I practice document-based questions (DBQs)?",
        a: "Examina focuses on multiple choice questions. For DBQ and Long Essay Question practice, use our study guide generator to outline arguments and evidence.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 5 quiz generations per month. Paid plans start at $2/month for 20 quizzes.",
      },
    ],
    relatedTools: [
      "/quiz-generator-from-pdf",
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/study-guide-generator",
    ],
    relatedSubjects: ["history", "world-history"],
  },
  {
    slug: "ap-psychology",
    name: "AP Psychology",
    fullName: "AP Psychology",
    description:
      "Create AP Psychology practice questions on biological bases, cognition, development, social psychology, and mental health for AP exam preparation.",
    owner: "College Board",
    disclaimer:
      "Examina is not affiliated with or endorsed by the College Board. These are original practice questions created by AI for study purposes only, not official AP exam materials.",
    sampleQuestions: [
      {
        q: "According to Piaget, which cognitive ability emerges during the formal operational stage?",
        a: "Abstract and hypothetical thinking",
        explanation:
          "The formal operational stage (age 12+) marks the development of abstract reasoning, allowing individuals to think about hypothetical situations and use deductive logic.",
      },
      {
        q: "Which neurotransmitter is most directly associated with the reward pathway and addiction?",
        a: "Dopamine",
        explanation:
          "Dopamine plays a central role in the brain's reward system. Addictive substances increase dopamine activity, reinforcing drug-seeking behavior.",
      },
      {
        q: "A researcher finds that ice cream sales and crime rates both increase in summer. This is an example of:",
        a: "Correlation without causation (third variable: temperature)",
        explanation:
          "Both variables are influenced by a third factor (hot weather), demonstrating that correlation does not imply causation—a key research methods concept.",
      },
    ],
    faq: [
      {
        q: "Are these official AP Psychology questions?",
        a: "No. These are AI-generated practice questions following AP format and content. For official practice, visit the College Board AP Central website.",
      },
      {
        q: "What AP Psychology units are covered?",
        a: "Generate questions across all units: Scientific Foundations, Biological Bases of Behavior, Sensation and Perception, Learning, Cognitive Psychology, Developmental Psychology, Motivation/Emotion/Personality, Clinical Psychology, and Social Psychology.",
      },
      {
        q: "Do questions test both terminology and application?",
        a: "Yes. Questions range from basic concept identification to applying psychological principles to scenarios, matching the AP exam's emphasis on both knowledge and application.",
      },
      {
        q: "Can I practice free response questions (FRQs)?",
        a: "Examina specializes in multiple choice questions. For FRQ practice, use our study guide generator to organize concepts and design research studies.",
      },
      {
        q: "How accurate are the psychological concepts?",
        a: "Questions are generated from established psychological research and theory. However, always verify against your textbook and AP course materials.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/quiz-generator-from-pdf",
      "/ai-flashcards",
    ],
    relatedSubjects: ["psychology"],
  },
];

export function getExam(slug: string): ExamType | undefined {
  return EXAMS.find((e) => e.slug === slug);
}
