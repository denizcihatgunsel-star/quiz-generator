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
  practiceTermTitle?: string; // Custom title for practice-focused SEO
  practiceTermH1?: string; // Custom H1 for practice-focused SEO
  practiceTermH1Accent?: string; // Custom H1 accent
  topicsList?: string[];
  sampleQuestions: { q: string; a: string; explanation: string }[];
  questionTypesAdvice?: string;
  studyTips?: string[];
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
      "Generate practice questions for SAT prep covering reading, writing, and math sections. The Digital SAT uses adaptive testing with two modules per section—your performance on the first module determines the difficulty of the second.",
    owner: "College Board",
    disclaimer:
      "Examina is not affiliated with, endorsed by, or sponsored by the College Board. These are original practice questions created by AI for study purposes only, not official SAT questions.",
    practiceTermTitle: "SAT Practice Test: Free AI Practice Questions",
    practiceTermH1: "SAT practice test",
    practiceTermH1Accent: "free AI-generated practice questions",
    topicsList: [
      "Reading: Command of Evidence (finding textual support for claims and inferences), Words in Context (determining precise word meanings from surrounding text), Analysis in History/Social Studies (interpreting primary sources, charts, and historical arguments), Analysis in Science (understanding experimental design and data interpretation)",
      "Writing and Language: Standard English Conventions (grammar rules including subject-verb agreement, pronoun case, verb tense consistency, and punctuation), Expression of Ideas (revising for clarity, coherence, effective word choice, logical transitions between sentences and paragraphs, and eliminating redundancy)",
      "Math - Heart of Algebra: linear equations and inequalities, systems of equations, word problems requiring algebraic reasoning, interpreting linear functions and their graphs",
      "Math - Problem Solving and Data Analysis: ratios, percentages, unit conversions, scatterplots, interpreting data from tables and graphs, probability, statistics (mean, median, mode, standard deviation)",
      "Math - Passport to Advanced Math: quadratic equations and functions, exponential growth and decay, polynomial manipulation, rational expressions, radical expressions",
      "Math - Additional Topics: geometry (area, volume, angles, triangles, circles), trigonometry (sine, cosine, tangent, unit circle), complex numbers",
      "Essay (optional, offered separately from main test): analyzing an author's argument, identifying rhetorical strategies (appeals to logos, pathos, ethos), evaluating evidence quality, and writing a coherent analytical essay within 50 minutes",
    ],
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
      {
        q: "In the passage, the word 'pedestrian' most nearly means:",
        a: "ordinary or unimaginative",
        explanation:
          "In context, 'pedestrian' is used figuratively to mean lacking inspiration or originality, not literally referring to someone walking. The SAT frequently tests secondary meanings of common words—words you know in one context but must recognize in a different usage. Here, 'pedestrian' describes something mundane or conventional rather than its primary meaning of 'a person who walks.' Look for context clues in surrounding sentences: if the passage is discussing art or ideas (not literal walking), the figurative meaning applies. This question type appears 3-4 times per Reading section on the Digital SAT.",
      },
    ],
    questionTypesAdvice:
      "For SAT prep, multiple choice questions work best because they match the exam format exactly—the SAT is entirely multiple choice with four answer options per question. Generate multiple choice questions from reading passages to practice finding textual evidence, from grammar rules to test Standard English Conventions, and from math problems to reinforce algebraic and geometric reasoning. Use fill-in-the-blank to practice recalling vocabulary words and math formulas without answer choices as hints, which forces deeper retrieval than recognition. Flashcards help memorize vocabulary for the reading section (especially high-frequency SAT words like 'ubiquitous,' 'ephemeral,' 'pragmatic') and formulas for math (quadratic formula, distance formula, circle equations). True/false questions are less useful for SAT-specific practice since the actual exam never uses this format, but they can help check conceptual understanding during early study phases.",
    studyTips: [
      "Focus on understanding why wrong answers are wrong, not just why the right answer is correct. SAT distractors are carefully designed to catch common mistakes: they include words that appear in the passage but don't answer the question, they use faulty logic that sounds plausible, or they're true statements that don't address what's being asked. Reviewing explanations for all four answer choices—especially the three incorrect ones—teaches you to spot these traps and avoid them on test day. This is more valuable than memorizing content because the SAT tests reasoning skills, not just knowledge.",
      "Practice reading passages from history, social studies, and science sources regularly. The SAT draws heavily from these domains: you'll see excerpts from founding documents (Declaration of Independence, Federalist Papers), social science research papers, and natural science explanations. Familiarity with academic writing styles—including formal vocabulary, complex sentence structures, and evidence-based argumentation—improves both your reading speed and comprehension accuracy. If you normally read fiction or informal articles, academic nonfiction will feel slower at first, so build this skill deliberately.",
      "Memorize the most common math formulas and vocabulary roots before test day. The SAT provides some formulas at the beginning of each math section (area, volume, Pythagorean theorem), but many essential formulas aren't given: quadratic formula, slope formula, midpoint formula, distance formula, circle equations (x-h)²+(y-k)²=r², and basic trig (SOH-CAH-TOA, special right triangles 30-60-90 and 45-45-90). Having these in long-term memory saves time during the test. For vocabulary, learn common Greek and Latin roots (bene=good, mal=bad, port=carry, scrib=write) to decode unfamiliar words in context rather than memorizing 1,000 individual words.",
      "Take full-length practice tests under timed conditions to build endurance. The SAT is 3 hours long (plus 50 minutes for the optional essay), and mental fatigue significantly impacts performance in later sections. Many students score lower on the fourth section simply because they're tired, not because the content is harder. Practice tests teach you to pace yourself, manage your energy, and stay focused when you're already mentally exhausted. Take at least three full-length practice tests before the real exam, ideally at the same time of day your actual test is scheduled.",
      "Review one content area at a time in focused study blocks. Don't jump randomly between reading, writing, and math—this fragments your attention and prevents deep practice. Spend one study session entirely on grammar rules (subject-verb agreement, pronoun usage, punctuation), another session on reading comprehension strategies (finding main ideas, making inferences, analyzing arguments), and a separate session on algebra or geometry. Focused practice builds stronger neural pathways than scattered review. Once you've mastered each area individually, then integrate them with full-length practice tests.",
      "For reading questions, always find the specific line or sentence in the passage that supports your answer. The SAT reading section includes 'Command of Evidence' questions that explicitly ask you to cite where information appears, but even for regular comprehension questions, locating textual support prevents you from choosing answers that 'sound right' but aren't actually stated. Mark up the passage as you read: underline key claims, circle transition words (however, therefore, although), and note the main idea of each paragraph in the margin. This active reading improves retention and makes it faster to find evidence when answering questions.",
      "Identify your weak areas early and focus practice there rather than reviewing what you already know. If you consistently miss geometry questions but rarely miss algebra questions, spend 70% of your math study time on geometry until it's equally strong. Use diagnostic practice tests to pinpoint exactly which question types and content areas cause you the most trouble, then target those gaps deliberately. Reviewing your strengths feels good but doesn't raise your score—improvement comes from converting your weaknesses into strengths.",
    ],
    faq: [
      {
        q: "Is this a full-length SAT practice test?",
        a: "No. Examina generates AI-created practice questions from your study material to help you prepare. These are not full-length official practice tests. For official SAT practice tests from the College Board, visit collegeboard.org.",
      },
      {
        q: "How does AI-generated SAT practice help?",
        a: "Upload your SAT prep book chapters, review guides, or class notes and get targeted practice questions instantly. AI-generated questions test the same skills as the SAT (reading comprehension, grammar, math reasoning) and help you identify weak areas. Practice with these questions supplements official SAT practice tests.",
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
    practiceTermTitle: "ACT Practice Test: Free AI Practice Questions",
    practiceTermH1: "ACT practice test",
    practiceTermH1Accent: "free AI-generated practice questions",
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
        q: "Is this a full-length ACT practice test?",
        a: "No. Examina generates AI-created practice questions from your study material to help you prepare. These are not full-length official practice tests. For official ACT practice tests, visit act.org.",
      },
      {
        q: "How does AI-generated ACT practice help?",
        a: "Upload your ACT prep book chapters, review guides, or class notes and get targeted practice questions for English, math, reading, and science reasoning. AI-generated questions help you identify weak areas and supplement official ACT practice tests.",
      },
      {
        q: "What ACT sections can I practice?",
        a: "Generate questions for English (grammar, rhetoric), math, reading comprehension, and science reasoning.",
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
    topicsList: [
      "AP Biology: cellular biology (cell structure, membrane transport, cell communication, cell cycle), genetics (DNA replication, gene expression, Mendelian inheritance, population genetics), evolution (natural selection, speciation, phylogeny, evidence for evolution), ecology (populations, communities, ecosystems, energy flow, biogeochemical cycles), systems biology (nervous, immune, endocrine systems)",
      "AP Chemistry: atomic structure and periodic trends (electron configuration, periodic properties), bonding (ionic, covalent, metallic bonds, Lewis structures, VSEPR), chemical reactions (stoichiometry, redox, acid-base), kinetics (reaction rates, rate laws, mechanisms), thermodynamics (enthalpy, entropy, Gibbs free energy), equilibrium (Le Chatelier's principle, Kc and Kp calculations)",
      "AP US History: period-specific themes from pre-Columbian to present including colonization, founding principles, westward expansion, Civil War and Reconstruction, industrialization, Progressive Era, world wars, Cold War, civil rights movement, modern America; emphasis on causation, continuity and change over time, comparison across periods, contextualization of events, and analysis of primary source documents",
      "AP Calculus AB: limits and continuity, derivatives and applications (optimization, related rates, motion), definite and indefinite integrals, Fundamental Theorem of Calculus, applications of integration (area, volume, accumulation)",
      "AP Calculus BC: all AB topics plus parametric equations, polar coordinates, vector-valued functions, sequences and series (convergence tests, Taylor and Maclaurin series)",
      "AP English Language and Composition: rhetorical analysis of nonfiction prose (identifying author's purpose, audience, context, rhetorical strategies including appeals to logos, pathos, ethos), argumentation (developing evidence-based claims, synthesizing multiple sources, addressing counterarguments), synthesis essays (integrating information from 6-7 provided sources to support an argument)",
      "AP English Literature and Composition: poetry analysis (form, meter, figurative language, tone, theme), prose fiction analysis (narrative perspective, character development, symbolism, authorial choices), drama analysis, literary argumentation essays requiring thesis development and textual evidence",
      "AP Physics 1: Newtonian mechanics (kinematics, dynamics, energy, momentum, rotational motion, simple harmonic motion), electricity basics (circuits, Ohm's law), waves and sound",
      "AP Physics 2: fluids, thermodynamics, electrostatics, circuits, magnetism, optics, atomic and nuclear physics",
      "AP Physics C (Mechanics): calculus-based mechanics including Newton's laws, work-energy theorem, impulse-momentum, rotational dynamics, gravitation",
      "AP Physics C (Electricity and Magnetism): calculus-based E&M including electrostatics, capacitors, circuits, magnetic fields, electromagnetic induction, Maxwell's equations",
      "AP Psychology: biological bases of behavior (neuron structure, brain anatomy, neurotransmitters, genetics), sensation and perception, cognition (memory, language, problem-solving), developmental psychology (Piaget, Erikson, attachment), motivation and emotion, personality theories, social psychology (conformity, obedience, group behavior), abnormal psychology (psychological disorders, DSM classifications), treatment approaches (psychotherapy, biomedical therapies), research methods and statistics",
    ],
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
      {
        q: "In AP English Language, which rhetorical appeal relies on the credibility of the speaker?",
        a: "Ethos",
        explanation:
          "Ethos establishes trust through the speaker's authority, expertise, or character. Pathos uses emotion, logos uses logic.",
      },
    ],
    questionTypesAdvice:
      "AP exams emphasize higher-order thinking skills according to Bloom's taxonomy (analysis, evaluation, synthesis), not just memorization, so generate multiple choice questions that require applying concepts to new scenarios, comparing and contrasting ideas, or evaluating evidence rather than simple recall. For example, instead of 'What is mitosis?' ask 'A cell with 12 chromosomes undergoes mitosis. How many chromosomes are in each daughter cell?' Fill-in-the-blank works exceptionally well for terminology that must be spelled correctly and recalled without hints—scientific terms (photosynthesis, stoichiometry, mitochondria), historical figures and events (Marbury v. Madison, Reconstruction), mathematical formulas (quadratic formula, derivative rules), and psychology concepts (operant conditioning, semantic memory). Flashcards are essential for dense subjects like AP Psychology (dozens of terms, theories, and researchers to memorize), AP Biology (hundreds of vocabulary terms from cellular respiration alone), and AP US History (key dates, figures, and document names). True/false questions are less common on actual AP exams but highly useful for checking understanding of common misconceptions—for example, 'True or False: Mitosis produces genetically identical daughter cells' (true) or 'The Constitution originally granted voting rights to all citizens' (false—originally only white male property owners).",
    studyTips: [
      "Upload your textbook chapter summaries or your own condensed notes, not full textbook chapters. AP questions test deep understanding of key concepts and the ability to apply them, not recall of minor details or examples mentioned once. When you upload a 30-page chapter verbatim, the AI generates questions that span trivial facts and major concepts equally, diluting your practice. Instead, create a 2-3 page summary highlighting the most important principles, processes, and vocabulary for each unit, then generate questions from that. This focuses your practice on high-yield material that actually appears on the exam.",
      "Practice writing out full explanations for multiple choice answers, not just selecting the correct letter. AP exams include free-response questions (FRQs) that require you to justify your reasoning with specific evidence and clear logic. If you only practice recognizing correct answers on multiple choice, you won't build the skill of articulating why something is true. For each practice question, write 2-3 sentences explaining why the correct answer is right and why the main distractor is wrong, as if teaching it to someone else. This deeper processing improves retention and directly prepares you for the written portions of the exam.",
      "Review College Board's official FRQ scoring guidelines for your specific AP subject before you start studying. These rubrics reveal exactly what graders look for and how points are awarded: using precise scientific or historical terminology (not vague descriptions), providing complete explanations that connect cause and effect (not just listing facts), showing logical structure in arguments (claim-evidence-reasoning), and addressing all parts of multi-part questions. Many students lose points not because they don't know the content, but because they don't format their answers the way College Board expects. Read scoring guidelines for past FRQs in your subject to internalize these requirements.",
      "For history APs, study historical causation and continuity and change over time as dedicated skills, not just byproducts of learning events. AP History exams explicitly test your ability to identify what caused an event (not just what happened), how events influence later developments, and what stayed the same vs. what changed across periods. Practice writing causation statements using the framework: 'X caused Y because...' with specific evidence. For example: 'Westward expansion caused conflict with Native Americans because settlers encroached on tribal lands guaranteed by previous treaties, leading to wars like the Indian Wars of the 1870s.' This skill appears on both multiple choice and FRQ sections but many students underprepare it.",
      "For science APs (Biology, Chemistry, Physics), master experimental design and data interpretation. AP Science exams include questions where you analyze an unfamiliar experiment: identifying the independent and dependent variables, recognizing controls, interpreting graphs or data tables, suggesting improvements to experimental design, and explaining what results would support or refute a hypothesis. These skills are tested heavily on both multiple choice and FRQs but often get less study time than content knowledge. Practice by reading primary research paper abstracts and explaining the experimental setup in your own words, or by taking old AP FRQs that present novel experimental scenarios.",
      "Take practice tests at the same time of day your actual AP exam is scheduled. If your AP Biology exam is at 8 AM, practice full-length tests at 8 AM on a weekday, not at 2 PM on a relaxed Sunday afternoon. Mental performance, alertness, and focus vary significantly by time of day due to circadian rhythms. Practicing when you're naturally sharp but taking the real exam when you're groggy (or vice versa) means your practice scores don't predict your actual performance. Simulate real conditions as closely as possible, including time pressure, to train your brain for the specific demands you'll face.",
      "Create a study timeline that spaces out content review over weeks or months, not cramming everything in the final week. The spacing effect in memory research shows that distributed practice (reviewing material multiple times with gaps between sessions) produces far better long-term retention than massed practice (studying everything at once). Make a calendar that covers each unit in your AP course with review sessions spaced 3-4 days apart, then 1 week apart, then 2 weeks apart. This repeated retrieval strengthens memory much more effectively than re-reading your notes 10 times in one sitting right before the exam.",
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
    practiceTermTitle: "MCAT Questions: Free AI-Generated MCAT Practice",
    practiceTermH1: "MCAT questions",
    practiceTermH1Accent: "free AI-generated practice",
    topicsList: [
      "Biological and Biochemical Foundations of Living Systems: biochemistry (amino acids, proteins, enzymes, metabolism, carbohydrates, lipids, nucleic acids), molecular biology (DNA replication, transcription, translation, gene regulation), cell biology (cell structure, membranes, transport, cell division, cell signaling), organ systems (circulatory, respiratory, digestive, excretory, nervous, immune, endocrine, musculoskeletal, reproductive systems and their integration)",
      "Chemical and Physical Foundations of Biological Systems: general chemistry (atomic structure, periodic trends, bonding, stoichiometry, gases, solutions, acids and bases, redox, equilibrium, thermodynamics, kinetics, electrochemistry), organic chemistry (nomenclature, stereochemistry, functional groups, reaction mechanisms, spectroscopy), physics (translational motion, forces, work and energy, periodic motion, fluids, electrostatics, circuits, magnetism, waves, optics, atomic and nuclear structure)",
      "Psychological, Social, and Biological Foundations of Behavior: foundational concepts (sensation and perception, cognition, consciousness, memory, language, emotion, stress), individual influences on behavior (personality, motivation, attitudes, psychological disorders, biological bases of behavior including brain structures and neurotransmitters), social processes (social interactions, group behavior, socialization, discrimination, social inequality, demographics), cultural and social differences (culture, social institutions like education and healthcare systems, social stratification)",
      "Critical Analysis and Reasoning Skills (CARS): reading comprehension of dense passages from humanities and social sciences (philosophy, ethics, cultural studies, history, archaeology, linguistics, art, music, literature, political science, population health), identifying main ideas and author's purpose, making inferences, evaluating arguments, recognizing logical fallacies, assessing evidence quality, comparing viewpoints—no outside content knowledge required, purely passage-based reasoning",
    ],
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
      {
        q: "Which organ system is primarily affected by antidiuretic hormone (ADH)?",
        a: "Renal system (kidneys)",
        explanation:
          "ADH increases water reabsorption in kidney collecting ducts, concentrating urine and conserving body water.",
      },
    ],
    questionTypesAdvice:
      "MCAT questions are heavily passage-based, meaning they present a 4-6 paragraph scientific study, experiment, or scenario and then ask 4-7 questions that require applying your content knowledge to analyze that new information—not just recalling memorized facts. Generate multiple choice questions that require interpreting data tables, analyzing experimental design, applying biochemical pathways to novel scenarios, or connecting psychological theories to new situations. For example, rather than 'What is Michaelis-Menten kinetics?' ask 'Given this enzyme kinetics graph, what would happen to Vmax if a competitive inhibitor were added?' Flashcards are absolutely essential for memorizing foundational facts that must be automatic: all 20 amino acids with three-letter codes, one-letter codes, structures, properties, and pKa values; all major organic chemistry functional groups and their reactions; brain structures and their functions (hippocampus, amygdala, prefrontal cortex, cerebellum, basal ganglia); neurotransmitters and their effects (dopamine, serotonin, GABA, glutamate, acetylcholine, norepinephrine); psychological theories and researchers (Freud's psychoanalytic theory, Piaget's developmental stages, Maslow's hierarchy, etc.). The MCAT assumes you have this foundational knowledge instantly accessible so you can apply it to passages under time pressure. Fill-in-the-blank helps practice spelling complex scientific terms correctly (electronegativity, gluconeogenesis, amygdala) and recalling formulas and equations without hints, though the MCAT itself provides equations in the passage when needed. True/false questions don't appear on the actual MCAT (everything is four-option multiple choice) but are useful during early content review to check binary conceptual understanding before moving to application questions.",
    studyTips: [
      "Practice with passage-based questions exclusively once you've covered content review. The MCAT rarely asks pure memorization questions—instead, every question presents a passage describing an experiment, a physiological process, a psychological study, or a theoretical scenario, then asks you to apply your content knowledge to analyze that new information. Standalone flashcard-style recall ('What is the Henderson-Hasselbalch equation?') doesn't prepare you for MCAT question format. You need practice interpreting data tables, analyzing experimental controls, predicting outcomes of interventions, and applying concepts to situations you've never seen before. Use AAMC official practice materials and high-quality third-party passage-based question banks (UWorld, Kaplan, Blueprint) for the majority of your practice once content review is complete.",
      "Memorize and be able to draw all major biochemistry pathways from memory: glycolysis (10 steps with enzymes and intermediates), Krebs cycle (8 steps), electron transport chain (complexes I-IV and ATP synthase), gluconeogenesis, glycogen metabolism, fatty acid synthesis and beta-oxidation, amino acid metabolism, and pentose phosphate pathway. These pathways appear constantly on the MCAT—questions will describe a mutation in an enzyme, a metabolic disorder, or an experimental manipulation and ask you to predict the effect. If you can't visualize the pathway and understand where each step occurs (cytoplasm vs. mitochondria) and what it requires (ATP, NADH, FADH2, oxygen), you won't be able to answer these questions under time pressure. Create pathway diagrams from memory repeatedly until it's automatic.",
      "For CARS (Critical Analysis and Reasoning Skills), practice reading dense humanities passages daily, even if it's just one passage (7-10 minutes). CARS is the most coachable section but also the one where most students run out of time. The passages are deliberately written in dense, verbose academic prose from philosophy, ethics, cultural studies, and social sciences. If you normally read fiction or news articles, this style will feel unnaturally slow at first. Build reading speed and stamina by reading challenging nonfiction (The New Yorker, academic journals, philosophy texts) daily. The key skill is extracting main ideas quickly without getting bogged down in details, then returning to the passage for specific evidence when questions ask. Most people who struggle with CARS either read too slowly (and run out of time) or read too quickly and miss key distinctions (and get questions wrong). Find the balance through daily practice.",
      "Memorize all 20 amino acids with their three-letter codes, one-letter codes, structures, properties (polar/nonpolar, charged/uncharged, acidic/basic/neutral), and pKa values of ionizable side chains. Biochemistry questions on the MCAT assume you have this knowledge instantly available—they will describe a protein and ask which amino acids are likely in the hydrophobic core (nonpolar: Leu, Ile, Val, Phe, Trp, Met) or which ones would be protonated at pH 7 (His has pKa ~6, so it's partially protonated; Lys and Arg are fully protonated). The MCAT does not provide amino acid structures or properties in the passage. If you have to pause and think 'Is leucine polar or nonpolar?' you've already lost 10 seconds. Make flashcards for all 20 and drill them until recognition is automatic.",
      "Do full-length practice exams under realistic timed conditions. The MCAT is 7 hours and 30 minutes of testing plus breaks (total appointment time ~8 hours). Mental endurance and stamina matter as much as content knowledge. Many students score lower on the Psych/Soc section (the last section of the day) simply because they're mentally exhausted by that point, not because they don't know the material. Take at least 5 full-length practice tests before your real exam—start with one diagnostic to identify weak areas, then space out 4 more over your final two months of studying. Take them at the same time of day as your real test (usually 7:30 AM check-in for an 8 AM start), and simulate real conditions: minimal breaks, no phone, test-day snacks only. This trains your brain to perform under fatigue and time pressure.",
      "Focus on high-yield topics that appear frequently and in multiple contexts. Enzyme kinetics (Michaelis-Menten, competitive vs. noncompetitive inhibition, allosteric regulation) appears on both Bio/Biochem and Chem/Phys. Electrochemistry (galvanic cells, electrolytic cells, reduction potentials, Nernst equation) appears on Chem/Phys and connects to neuron signaling on Bio/Biochem. Optics (lenses, mirrors, ray diagrams, the eye) is heavily tested on Chem/Phys. Sensation and perception, memory, and social processes (discrimination, social inequality) dominate Psych/Soc. These topics are worth disproportionate study time because they provide more return on investment than low-yield topics like organic chemistry lab techniques or obscure psychology theories that appear once every five exams.",
      "Review AAMC official explanations for every question you get wrong, and also for questions you got right but guessed on. AAMC explanations reveal how they think about answer choices, what logic they expect you to use, and what common traps they set. Third-party materials are useful for content review and volume of practice, but AAMC practice (Section Bank, Question Packs, Official Practice Exams) uses the exact same logic and phrasing as the real MCAT. If you notice you consistently fall for a certain type of distractor (answers that are true but don't address the question, answers that confuse correlation with causation), you can train yourself to recognize that pattern. The explanation is more valuable than the question itself.",
    ],
    faq: [
      {
        q: "Are these official MCAT questions?",
        a: "No. These are AI-generated practice questions that follow MCAT format and difficulty to help you study. They are not official AAMC materials. For official MCAT practice, visit aamc.org.",
      },
      {
        q: "How do AI-generated MCAT questions help?",
        a: "Upload your MCAT review book chapters, biochemistry notes, or psychology study guides and get passage-based practice questions instantly. AI-generated questions help you practice applying content knowledge to new scenarios—the core skill the MCAT tests. Use these alongside official AAMC question banks and practice exams for comprehensive preparation.",
      },
      {
        q: "What MCAT sections can I practice?",
        a: "Generate questions for all MCAT sections: biological and biochemical foundations, chemical and physical foundations, psychological and sociological foundations, and CARS (critical analysis).",
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
    practiceTermTitle: "NCLEX Practice Questions: Free AI-Generated NCLEX Practice",
    practiceTermH1: "NCLEX practice questions",
    practiceTermH1Accent: "free AI-generated nursing practice",
    topicsList: [
      "Safe and Effective Care Environment - Management of Care: advance directives and living wills, advocacy for patient rights, case management and care coordination, client rights and confidentiality (HIPAA), collaboration with interdisciplinary team, delegation and supervision of care tasks to LPNs and UAPs, establishing priorities using ABC (airway-breathing-circulation) and Maslow's hierarchy, informed consent, legal responsibilities and ethical dilemmas",
      "Safe and Effective Care Environment - Safety and Infection Control: accident and injury prevention, emergency response plans, ergonomics and body mechanics, handling hazardous materials, home safety assessments, infection control procedures (standard precautions, transmission-based precautions, hand hygiene, sterile technique), medical and surgical asepsis, reporting incidents and errors, safe use of equipment, security plans",
      "Health Promotion and Maintenance: aging process and gerontology, ante/intra/postpartum and newborn care, child development stages (Erikson, Piaget), health screening and immunization schedules, high-risk behaviors and disease prevention, lifestyle choices (nutrition, exercise, sleep), prenatal care and family planning, teaching normal growth and development expectations, techniques of physical assessment across the lifespan",
      "Psychosocial Integrity: abuse and neglect (child, elder, domestic violence), behavioral interventions and crisis management, chemical dependency and substance abuse treatment, coping mechanisms (adaptive vs. maladaptive), cultural awareness and religious and spiritual influences on health, end-of-life care and grief/loss support, mental health concepts and psychiatric disorders (anxiety, depression, schizophrenia, bipolar disorder, personality disorders), sensory and perceptual alterations, stress management, suicide precautions, therapeutic communication techniques vs. nontherapeutic barriers, therapeutic environment and milieu",
      "Physiological Integrity - Basic Care and Comfort: alternative and complementary therapies, assistive devices for mobility, elimination (urinary catheters, bowel management), mobility and immobility complications, non-pharmacological comfort interventions, nutrition and oral hydration, palliative and comfort care, personal hygiene, rest and sleep patterns",
      "Physiological Integrity - Pharmacological and Parenteral Therapies: adverse effects and contraindications, blood and blood product administration, central venous access devices, dosage calculation (dimensional analysis, ratio-proportion, IV drip rates, mcg/kg/min calculations), expected actions and outcomes of medications, medication administration (routes, rights of medication administration, high-alert medications), pain management including opioids and non-opioid analgesics, parenteral nutrition (TPN), pharmacological interactions and polypharmacy concerns in elderly",
      "Physiological Integrity - Reduction of Risk Potential: changes in vital signs and hemodynamic monitoring, diagnostic tests (lab value interpretation, preparation and post-procedure care), invasive procedures and monitoring (arterial lines, central lines, chest tubes, Foley catheters), potential for alterations in body systems (complications of immobility, fluid and electrolyte imbalances), potential for complications from procedures or health alterations (bleeding, infection, thromboembolism, pressure injuries), system-specific assessments (respiratory, cardiac, neuro, GI)",
      "Physiological Integrity - Physiological Adaptation: alterations in body systems (pathophysiology of diseases), fluid and electrolyte imbalances (hypokalemia, hyperkalemia, hyponatremia, hypernatremia, dehydration, fluid volume overload), hemodynamics (shock states: hypovolemic, cardiogenic, septic, aneurogenic), illness management for acute and chronic conditions (heart failure, COPD, diabetes, renal failure), medical emergencies (anaphylaxis, stroke, myocardial infarction, respiratory distress), radiation therapy and chemotherapy side effects, unexpected response to therapies (adverse drug reactions, transfusion reactions)",
    ],
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
      {
        q: "A nurse is caring for a client with a chest tube. Which observation requires immediate intervention?",
        a: "Continuous bubbling in the water seal chamber",
        explanation:
          "Continuous bubbling in the water seal chamber indicates an air leak in the system, which prevents lung re-expansion and requires immediate attention.",
      },
    ],
    questionTypesAdvice:
      "NCLEX questions test clinical judgment, critical thinking, and priority-setting in real nursing scenarios, not just rote memorization of facts. The questions are deliberately written to include multiple answers that sound correct or plausible, but only one answer represents the BEST nursing action based on patient safety, ABC priority, or immediate physiological needs. Generate multiple choice questions that force you to choose the 'most important' assessment, 'first action,' 'priority intervention,' or 'initial nursing response' among several options that are all technically correct nursing actions—this mirrors actual NCLEX format. For example, four answers might all be appropriate interventions for a diabetic patient, but only one is the priority when the patient is showing signs of hypoglycemia (give glucose immediately, rather than checking blood sugar first if patient is symptomatic and at risk of losing consciousness). Flashcards are absolutely essential for memorizing content that must be instantly accessible: all major drug classes with mechanisms of action, common side effects, and nursing implications (ACE inhibitors cause hyperkalemia and dry cough; beta blockers mask hypoglycemia symptoms; loop diuretics cause hypokalemia); normal lab values and what abnormal values indicate (potassium 3.5-5.0, sodium 135-145, INR 2-3 for warfarin therapy, BUN, creatinine, glucose, hemoglobin/hematocrit, platelets, WBC); disease processes with classic signs and symptoms (heart failure: jugular venous distention, peripheral edema, crackles, dyspnea; COPD: barrel chest, pursed-lip breathing, prolonged expiration). Fill-in-the-blank is critical for dosage calculation practice where you must calculate the exact dose or IV drip rate without multiple choice hints—NCLEX includes calculation questions where you type in a number, no options provided. Practice dimensional analysis, ratio-proportion, mcg/kg/min calculations, and pediatric weight-based dosing until automatic. True/false questions don't appear on the actual NCLEX (everything is multiple choice, multiple select, drag-and-drop, or fill-in-the-blank calculation) but they're useful during early content review to check binary understanding of procedures and contraindications before moving to complex priority scenarios.",
    studyTips: [
      "Always apply ABC (airway, breathing, circulation) and Maslow's hierarchy of needs when prioritizing patient care or choosing your first nursing action. Physiological needs (airway compromise, inadequate breathing, circulatory shock, severe pain) must be addressed before safety needs (fall risk, infection prevention), which come before psychosocial needs (anxiety, coping, grief). If a question asks 'Which patient should the nurse assess first?' and one patient has respiratory distress while another has uncontrolled pain, assess the respiratory patient first—airway and breathing always take priority over comfort. This framework guides correct answers on 60-70% of NCLEX priority questions.",
      "Memorize normal lab values and therapeutic drug ranges cold—NCLEX assumes you know these and never provides reference ranges in the question. Critical values include: potassium 3.5-5.0 mEq/L (hypokalemia causes dangerous arrhythmias; hyperkalemia causes cardiac arrest), sodium 135-145 mEq/L (hyponatremia causes altered mental status and seizures), glucose 70-100 mg/dL (hypoglycemia requires immediate glucose; hyperglycemia over 250 suggests DKA), INR 2-3 for patients on warfarin (INR over 4 means bleeding risk, hold dose and notify provider), hemoglobin 12-16 g/dL for women/14-18 for men (low hemoglobin indicates anemia), platelet count 150,000-400,000 (below 50,000 is severe thrombocytopenia with bleeding risk), WBC 4,500-11,000 (elevated WBC suggests infection). Make flashcards and drill these until you can recall them instantly—you'll need this for dozens of questions.",
      "Study pharmacology systematically by drug class, not individual drugs. Learn all ACE inhibitors as one group: they all end in '-pril' (lisinopril, enalapril, captopril), lower blood pressure by blocking conversion of angiotensin I to angiotensin II, cause hyperkalemia as a side effect (because they reduce aldosterone which normally causes potassium excretion), and have a common adverse effect of dry persistent cough (due to bradykinin accumulation). Once you learn the class, you understand every drug in that class without memorizing each one individually. Do this for all major drug classes: beta blockers (-olol), calcium channel blockers (-dipine for dihydropyridines), loop diuretics, thiazide diuretics, SSRIs, benzodiazepines, opioids, anticoagulants, etc.",
      "Practice dosage calculations daily until they become automatic and you can complete them in under 60 seconds each. Use dimensional analysis (factor-label method) consistently rather than switching between methods—consistency prevents errors under test stress. Common calculations you must master: IV drip rates in gtt/min (formula: (volume in mL × drop factor) / time in minutes), mg/kg dosing for pediatrics and weight-based adult drugs, converting between units (mg to mcg, g to mg, mL to L), mcg/kg/min for critical care drips (dopamine, dobutamine, nitroglycerin), calculating intake and output for fluid balance, determining safe dose ranges. Do at least 10 calculation problems daily during your final month of studying.",
      "Understand delegation and scope of practice rules cold—NCLEX heavily tests whether you appropriately delegate tasks to LPNs and UAPs or keep them yourself as the RN. RNs assess (initial and ongoing patient assessments require RN judgment), plan (creating the care plan and setting priorities), evaluate (determining if interventions were effective and revising the plan), teach (patient education requires RN knowledge), and administer IV push medications (higher-risk route). LPNs can implement care, give oral and IM medications (but not IV push in most states), reinforce teaching that the RN already did, and perform standard procedures like urinary catheterization and dressing changes. UAPs (nursing assistants, patient care techs) do basic activities of daily living (bathing, feeding, toileting, ambulation, vital signs on stable patients) but cannot assess, give medications, or perform sterile procedures. If a question asks 'Which task can the nurse safely delegate to the UAP?' and the options include taking vital signs on a stable patient vs. assessing a new patient, only vital signs can be delegated.",
      "For priority questions that ask 'Which patient should the nurse assess first?' or 'Which patient is most at risk?' choose the patient who is unstable, has an airway or breathing problem, shows signs of shock or physiological deterioration, or has a complication that could rapidly become life-threatening. Stable patients with chronic conditions, patients needing routine care or teaching, and psychosocial concerns (anxiety, depression, needing emotional support) are lower priority than acute physiological crises. For example, if one patient has new-onset chest pain and another patient is crying and anxious, assess chest pain first—it could be a myocardial infarction. Psychosocial needs matter, but they come after you've ruled out immediate threats to life.",
      "Use the nursing process (Assessment → Diagnosis → Planning → Implementation → Evaluation) to approach unfamiliar questions. If you don't know the answer, ask yourself 'What would I do first as a nurse encountering this situation?' The answer is almost always Assessment—you gather data before taking action. If a question describes a patient with a new symptom and asks what the nurse should do, the correct answer is often 'Assess the patient further' (check vital signs, listen to lung sounds, ask about pain characteristics) rather than jumping to an intervention. NCLEX rewards systematic nursing judgment that follows the nursing process, not cowboys who act before gathering information.",
    ],
    faq: [
      {
        q: "Are these official NCLEX questions?",
        a: "No. These are AI-generated practice questions that follow NCLEX format and cognitive levels to help you study. They are not official NCSBN test items. For official NCLEX practice, visit ncsbn.org.",
      },
      {
        q: "How do AI-generated NCLEX practice questions help?",
        a: "Upload your nursing school notes, textbook chapters, or review guides and get NCLEX-style priority questions instantly. AI-generated questions help you practice clinical judgment, delegation, and priority-setting—the core skills NCLEX tests. Use these alongside official NCSBN question banks for comprehensive preparation.",
      },
      {
        q: "What NCLEX categories can I practice?",
        a: "Generate questions across all NCLEX categories: safe and effective care, health promotion, psychosocial integrity, and physiological integrity.",
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
    practiceTermTitle: "GRE Practice Test: Free AI Practice Questions",
    practiceTermH1: "GRE practice test",
    practiceTermH1Accent: "free AI-generated practice questions",
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
        q: "Is this a full-length GRE practice test?",
        a: "No. Examina generates AI-created practice questions from your study material to help you prepare. These are not full-length official practice tests. For official GRE practice tests from ETS, visit ets.org/gre.",
      },
      {
        q: "How do AI-generated GRE practice questions help?",
        a: "Upload your GRE prep book chapters, vocabulary lists, or math review guides and get targeted practice questions for verbal reasoning and quantitative reasoning. AI-generated questions help you practice the question formats and reasoning skills the GRE tests, supplementing official ETS practice materials.",
      },
      {
        q: "What GRE sections can I practice?",
        a: "Generate questions for verbal reasoning (vocabulary, reading comprehension) and quantitative reasoning (arithmetic, algebra, geometry, data analysis).",
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
    practiceTermTitle: "LSAT Questions: Free AI-Generated LSAT Practice Questions",
    practiceTermH1: "LSAT questions",
    practiceTermH1Accent: "free AI-generated practice questions",
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
        q: "Are these official LSAT questions?",
        a: "No. These are AI-generated practice questions for LSAT logical reasoning and reading comprehension. They are not official LSAC PrepTest questions. For official LSAT practice, visit lsac.org.",
      },
      {
        q: "How do AI-generated LSAT questions help?",
        a: "Upload your LSAT prep materials, formal logic notes, or argument examples and get practice questions that test logical reasoning skills. AI-generated questions help you practice identifying assumptions, flaws, and strengthening/weakening arguments—core LSAT logical reasoning skills. Use these alongside official LSAC PrepTests.",
      },
      {
        q: "What LSAT sections can I practice?",
        a: "Generate questions for logical reasoning (arguments, assumptions, flaws) and reading comprehension. Logic games require visual diagramming not suited to AI generation.",
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
    practiceTermTitle: "TOEFL Practice Test: Free AI Practice Questions",
    practiceTermH1: "TOEFL practice test",
    practiceTermH1Accent: "free AI-generated practice questions",
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
        q: "Is this a full-length TOEFL practice test?",
        a: "No. Examina generates AI-created reading comprehension and vocabulary questions to help you prepare. These are not full-length official practice tests. For official TOEFL practice tests from ETS, visit ets.org/toefl.",
      },
      {
        q: "How do AI-generated TOEFL questions help?",
        a: "Upload your TOEFL reading materials, academic articles, or vocabulary lists and get practice questions instantly. AI-generated questions help you practice reading comprehension, vocabulary in context, and paraphrasing—key TOEFL reading skills. Use these alongside official ETS materials for comprehensive preparation.",
      },
      {
        q: "What TOEFL sections can I practice?",
        a: "Generate reading comprehension and vocabulary questions. For speaking and writing practice, use our study guide generator.",
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
    practiceTermTitle: "IELTS Practice Test: Free AI Practice Questions",
    practiceTermH1: "IELTS practice test",
    practiceTermH1Accent: "free AI-generated practice questions",
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
        q: "Is this a full-length IELTS practice test?",
        a: "No. Examina generates AI-created academic reading questions to help you prepare. These are not full-length official practice tests. For official IELTS practice tests, visit ielts.org.",
      },
      {
        q: "How do AI-generated IELTS questions help?",
        a: "Upload your IELTS reading materials, academic articles, or study notes and get practice questions instantly. AI-generated questions help you practice True/False/Not Given reasoning, matching information, and summary completion—core IELTS academic reading question types. Use these alongside official IELTS materials.",
      },
      {
        q: "What IELTS sections can I practice?",
        a: "Generate academic reading questions (True/False/Not Given, matching, summary completion) and vocabulary. Speaking and writing require human evaluation.",
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
];

export function getExam(slug: string): ExamType | undefined {
  return EXAMS.find((e) => e.slug === slug);
}
