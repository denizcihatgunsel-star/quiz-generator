/**
 * Subject collection for programmatic SEO Wave 2.
 * Each subject is a quiz generator page with sample questions.
 */

export interface Subject {
  slug: string;
  name: string;
  description: string;
  icon?: string;
  topicsList?: string[];
  sampleQuestions: { q: string; a: string; explanation: string }[];
  questionTypesAdvice?: string;
  studyTips?: string[];
  faq: { q: string; a: string }[];
  relatedTools: string[];
  relatedExams?: string[];
}

export const SUBJECTS: Subject[] = [
  {
    slug: "biology",
    name: "Biology",
    description:
      "Generate biology quiz questions on cells, genetics, evolution, ecology, and human body systems.",
    topicsList: [
      "Cell Biology: cell structure, organelles, membrane transport, cell cycle, mitosis and meiosis",
      "Genetics: DNA structure, replication, transcription, translation, Mendelian genetics, gene expression",
      "Evolution: natural selection, speciation, phylogenetics, evidence for evolution",
      "Ecology: populations, communities, ecosystems, energy flow, nutrient cycles",
      "Human Body Systems: circulatory, respiratory, digestive, nervous, immune, endocrine systems",
      "Molecular Biology: enzymes, metabolism, cellular respiration, photosynthesis",
      "Microbiology: bacteria, viruses, fungi, disease transmission",
      "Botany: plant structure, photosynthesis, plant reproduction",
    ],
    sampleQuestions: [
      {
        q: "What is the primary function of mitochondria?",
        a: "Produce ATP through cellular respiration",
        explanation:
          "Mitochondria are the powerhouse of the cell, converting glucose and oxygen into ATP (adenosine triphosphate), the cell's energy currency.",
      },
      {
        q: "Which type of RNA carries amino acids to the ribosome?",
        a: "tRNA (transfer RNA)",
        explanation:
          "Transfer RNA molecules bind to specific amino acids and deliver them to the ribosome during protein synthesis.",
      },
      {
        q: "In which phase of mitosis do chromosomes align at the cell's equator?",
        a: "Metaphase",
        explanation:
          "During metaphase, chromosomes line up along the metaphase plate (cell equator) before sister chromatids separate.",
      },
      {
        q: "What is the role of the Calvin cycle in photosynthesis?",
        a: "Convert CO₂ into glucose using ATP and NADPH",
        explanation:
          "The Calvin cycle (light-independent reactions) uses energy from ATP and NADPH produced in light reactions to fix carbon dioxide into glucose.",
      },
    ],
    questionTypesAdvice:
      "Multiple choice questions work best for testing understanding of processes (e.g., photosynthesis steps, cell cycle phases). Fill-in-the-blank is ideal for memorizing terminology (organelles, taxonomic names, anatomical structures) since it forces recall without answer hints. Flashcards help with definitions, diagrams, and matching structures to functions. True/false questions are effective for identifying common misconceptions (e.g., 'Plants only respire at night' is false).",
    studyTips: [
      "Draw diagrams from memory. Biology is visual—being able to sketch a cell, label a nephron, or diagram a food web proves deeper understanding than recognizing a pre-made image.",
      "Study processes in order. Don't memorize glycolysis steps in isolation; understand how it connects to the Krebs cycle and electron transport chain. Context improves retention.",
      "Use analogies to connect abstract concepts to everyday experience. For example, the cell membrane as a gated community, enzymes as locks and keys, or DNA replication as unzipping a jacket.",
      "Practice writing out explanations in your own words. If you can explain mitosis to someone who has never heard of it, you understand it well enough for the exam.",
      "Focus on high-yield topics: cellular respiration, photosynthesis, DNA replication, and cell signaling appear on nearly every biology exam.",
    ],
    faq: [
      {
        q: "What biology topics can I make quizzes for?",
        a: "Upload notes on any biology topic: cell biology, genetics, evolution, ecology, human anatomy and physiology, microbiology, botany, or zoology. The quiz generator works with high school and college-level material.",
      },
      {
        q: "Are the questions good for AP Biology?",
        a: "Yes. Questions are generated at appropriate difficulty levels and tagged with Bloom's taxonomy, making them suitable for AP Biology or college intro courses.",
      },
      {
        q: "Can I generate questions from my textbook?",
        a: "Yes. Upload PDF pages or paste text from your biology textbook and get practice questions with explanations.",
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
    ],
    relatedExams: ["ap", "mcat", "midterm", "finals"],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    description:
      "Create chemistry practice questions on atomic structure, bonding, reactions, stoichiometry, and thermodynamics.",
    topicsList: [
      "Atomic Structure: electron configuration, periodic trends, quantum numbers",
      "Chemical Bonding: ionic, covalent, metallic bonds, Lewis structures, molecular geometry",
      "Stoichiometry: mole calculations, limiting reactants, percent yield",
      "Chemical Reactions: types of reactions, balancing equations, oxidation-reduction",
      "Thermodynamics: enthalpy, entropy, Gibbs free energy, calorimetry",
      "Kinetics: reaction rates, rate laws, activation energy, catalysts",
      "Equilibrium: Le Chatelier's principle, equilibrium constants, solubility",
      "Acids and Bases: pH, buffers, titrations, acid-base theories",
      "Electrochemistry: galvanic cells, electrolysis, standard reduction potentials",
      "Organic Chemistry: functional groups, nomenclature, reaction mechanisms",
    ],
    sampleQuestions: [
      {
        q: "What is the electron configuration of oxygen (atomic number 8)?",
        a: "1s² 2s² 2p⁴",
        explanation:
          "Oxygen has 8 electrons: 2 in the first shell (1s²), 2 in the 2s orbital (2s²), and 4 in the 2p orbitals (2p⁴).",
      },
      {
        q: "Which type of bond forms when electrons are shared between atoms?",
        a: "Covalent bond",
        explanation:
          "Covalent bonds form when two atoms share one or more pairs of electrons, typically between nonmetals.",
      },
      {
        q: "If 2 moles of hydrogen react with 1 mole of oxygen, how many moles of water form?",
        a: "2 moles",
        explanation:
          "The balanced equation 2H₂ + O₂ → 2H₂O shows that 2 moles of water are produced from 2 moles of hydrogen and 1 mole of oxygen.",
      },
      {
        q: "What happens to the equilibrium position when temperature increases for an exothermic reaction?",
        a: "Shifts to the left (toward reactants)",
        explanation:
          "Le Chatelier's principle: increasing temperature adds heat. For exothermic reactions (which release heat), the equilibrium shifts to consume the added heat by favoring the reverse reaction.",
      },
    ],
    questionTypesAdvice:
      "Multiple choice questions are excellent for testing conceptual understanding (periodic trends, Le Chatelier's principle, types of reactions). Fill-in-the-blank works well for nomenclature and chemical formulas—you must know the exact formula for sulfuric acid (H₂SO₄), not just recognize it. Flashcards are essential for memorizing polyatomic ions, functional groups, and reaction types. True/false questions help identify common misconceptions (e.g., 'A catalyst lowers the activation energy of a reaction' is true).",
    studyTips: [
      "Memorize polyatomic ions and their charges. These appear constantly in stoichiometry and nomenclature problems, and textbooks assume you know them.",
      "Practice balancing equations daily until it's automatic. This fundamental skill is required for stoichiometry, thermodynamics, and electrochemistry.",
      "Understand the periodic table trends (atomic radius, ionization energy, electronegativity). These patterns explain most of general chemistry's behavior.",
      "Draw Lewis structures and predict molecular geometry. VSEPR theory connects structure to properties and appears on nearly every chemistry exam.",
      "Focus on high-yield topics: stoichiometry, thermodynamics, kinetics, and equilibrium. These four areas cover the majority of general chemistry content.",
      "For organic chemistry, practice drawing mechanisms step-by-step. Understanding electron movement is more important than memorizing individual reactions.",
    ],
    faq: [
      {
        q: "What chemistry topics are covered?",
        a: "Generate questions on general chemistry topics: atomic structure, periodic trends, chemical bonding, stoichiometry, reactions, acids and bases, thermodynamics, kinetics, and equilibrium.",
      },
      {
        q: "Can I practice organic chemistry?",
        a: "Yes. Upload your organic chemistry notes (functional groups, reactions, mechanisms) and generate practice questions.",
      },
      {
        q: "Do questions include chemical formulas?",
        a: "Yes. Questions include chemical equations, Lewis structures, and calculations when relevant to your source material.",
      },
      {
        q: "Is this suitable for AP Chemistry?",
        a: "Yes. Questions are generated at appropriate difficulty and complexity for high school AP or college general chemistry courses.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/quiz-generator-from-pdf",
      "/multiple-choice-quiz-maker",
    ],
    relatedExams: ["ap", "mcat", "midterm", "finals"],
  },
  {
    slug: "physics",
    name: "Physics",
    description:
      "Generate physics quiz questions covering mechanics, electricity, magnetism, waves, thermodynamics, and modern physics.",
    sampleQuestions: [
      {
        q: "A 5 kg object accelerates at 2 m/s². What force is applied?",
        a: "10 N",
        explanation:
          "Using Newton's second law F = ma, force equals mass times acceleration: F = 5 kg × 2 m/s² = 10 N.",
      },
      {
        q: "What happens to resistance when a wire's length doubles?",
        a: "Resistance doubles",
        explanation:
          "Resistance is directly proportional to length (R = ρL/A). If length doubles while area stays constant, resistance doubles.",
      },
      {
        q: "Which law states that energy cannot be created or destroyed?",
        a: "First law of thermodynamics (conservation of energy)",
        explanation:
          "The first law of thermodynamics states that the total energy of an isolated system remains constant; energy can only change forms.",
      },
    ],
    faq: [
      {
        q: "What physics topics can I generate questions for?",
        a: "Upload notes on any physics topic: mechanics (motion, forces, energy), electricity and magnetism, waves and optics, thermodynamics, or modern physics (quantum mechanics, relativity).",
      },
      {
        q: "Are calculations included in questions?",
        a: "Yes. Questions include numerical problems with step-by-step explanations showing the calculation process.",
      },
      {
        q: "Is this good for AP Physics?",
        a: "Yes. Generate questions at appropriate difficulty for AP Physics 1, 2, C (Mechanics), or C (E&M) based on your uploaded notes.",
      },
      {
        q: "Can I practice both conceptual and problem-solving questions?",
        a: "Yes. The generator creates a mix of conceptual understanding questions and quantitative problems based on your source material.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
    ],
    relatedExams: ["ap", "gre", "midterm", "finals"],
  },
  {
    slug: "math",
    name: "Mathematics",
    description:
      "Create math practice questions for algebra, geometry, trigonometry, calculus, and statistics.",
    topicsList: [
      "Algebra: linear equations, quadratic equations, systems of equations, polynomials, rational expressions",
      "Geometry: angles, triangles, circles, polygons, area, volume, coordinate geometry",
      "Trigonometry: unit circle, trig identities, sine/cosine laws, graphing trig functions",
      "Precalculus: functions, logarithms, exponential functions, conic sections",
      "Calculus: limits, derivatives, integrals, applications of calculus, differential equations",
      "Statistics: descriptive statistics, probability, distributions, hypothesis testing, regression",
    ],
    sampleQuestions: [
      {
        q: "Solve for x: 3x + 7 = 22",
        a: "x = 5",
        explanation:
          "Subtract 7 from both sides: 3x = 15. Then divide both sides by 3: x = 5.",
      },
      {
        q: "What is the area of a circle with radius 4?",
        a: "16π (approximately 50.27 square units)",
        explanation:
          "Area of a circle is A = πr². With r = 4, A = π(4)² = 16π ≈ 50.27.",
      },
      {
        q: "Find the derivative of f(x) = x³ + 2x",
        a: "f'(x) = 3x² + 2",
        explanation:
          "Apply the power rule: derivative of x³ is 3x², derivative of 2x is 2. Combined: f'(x) = 3x² + 2.",
      },
      {
        q: "What is the value of sin(π/6)?",
        a: "1/2",
        explanation:
          "π/6 radians equals 30 degrees. The sine of 30 degrees is 1/2, a standard unit circle value.",
      },
    ],
    questionTypesAdvice:
      "Multiple choice questions work well for conceptual understanding (identifying function types, choosing the correct formula) and for problems where the final answer is a specific number. Fill-in-the-blank is excellent for practicing formula recall and ensuring you arrive at exact answers without hints. Flashcards help memorize formulas, trig identities, and derivative rules. True/false questions identify common algebraic mistakes (e.g., 'x² + x² = x⁴' is false).",
    studyTips: [
      "Memorize core formulas and identities: quadratic formula, distance formula, trig identities, derivative and integral rules. These save time on exams and reduce errors.",
      "Show your work even when practicing alone. Writing out steps catches calculation errors and builds the habit for partial credit on tests.",
      "Check answers by substituting back into the original equation. If you solved for x = 5, plug it back in to verify. This catches sign errors and dropped terms.",
      "Practice mental estimation before calculating. For example, √50 is between 7 and 8 because 7² = 49 and 8² = 64. This catches input errors on calculators.",
      "Focus on problem types that appear frequently: quadratic equations, right triangle trigonometry, basic derivatives and integrals, mean and standard deviation.",
      "For word problems, draw diagrams or write out what you know vs. what you're solving for. Visual representation clarifies the setup and reveals which formula to use.",
    ],
    faq: [
      {
        q: "What math levels can I practice?",
        a: "Generate questions for any level: pre-algebra, algebra 1 and 2, geometry, trigonometry, precalculus, calculus, and statistics.",
      },
      {
        q: "Do questions show step-by-step solutions?",
        a: "Yes. Every question includes an explanation showing the solution process and key concepts.",
      },
      {
        q: "Can I upload problem sets to generate similar questions?",
        a: "Yes. Upload homework problems or textbook pages and the generator creates similar practice problems with different numbers.",
      },
      {
        q: "Is this suitable for standardized tests?",
        a: "Yes. Generate SAT, ACT, GRE, or AP Calculus style questions by uploading relevant practice material.",
      },
    ],
    relatedTools: [
      "/quiz-generator-from-pdf",
      "/ai-quiz-generator",
      "/for-students",
    ],
    relatedExams: ["sat", "act", "gre", "ap", "midterm", "finals"],
  },
  {
    slug: "history",
    name: "History",
    description:
      "Generate history quiz questions on world history, US history, European history, and historical analysis.",
    sampleQuestions: [
      {
        q: "What year did World War II end?",
        a: "1945",
        explanation:
          "World War II ended in 1945 with Germany's surrender in May and Japan's surrender in August after the atomic bombings.",
      },
      {
        q: "Which document established the principle of limited government in England?",
        a: "Magna Carta (1215)",
        explanation:
          "The Magna Carta limited the king's power and established that even monarchs must follow the law, a foundational principle of constitutional government.",
      },
      {
        q: "What was the primary cause of the American Civil War?",
        a: "Slavery and states' rights disputes",
        explanation:
          "While multiple factors contributed, the central issue was the conflict over slavery and whether states had the right to maintain it, leading to secession and war.",
      },
    ],
    faq: [
      {
        q: "What history topics can I generate quizzes for?",
        a: "Upload notes on any history topic: ancient civilizations, medieval history, world wars, US history, European history, or specific events and periods.",
      },
      {
        q: "Do questions test memorization or analysis?",
        a: "Both. Questions are tagged by Bloom's taxonomy level, testing factual recall, understanding of causes and effects, and historical analysis.",
      },
      {
        q: "Can I generate AP History style questions?",
        a: "Yes. Upload AP US History, World History, or European History notes to generate questions matching AP exam format and difficulty.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 5 quiz generations per month. Paid plans start at $2/month.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/quiz-generator-from-pdf",
      "/study-guide-generator",
    ],
    relatedExams: ["ap", "sat", "midterm", "finals"],
  },
  {
    slug: "english",
    name: "English",
    description:
      "Create English quiz questions on grammar, literature analysis, reading comprehension, and writing skills.",
    sampleQuestions: [
      {
        q: "Identify the subject in this sentence: 'The cat on the roof meowed loudly.'",
        a: "The cat",
        explanation:
          "The subject is 'the cat' (with 'on the roof' as a prepositional phrase modifying it). The verb is 'meowed.'",
      },
      {
        q: "What literary device is used: 'The wind whispered through the trees'?",
        a: "Personification",
        explanation:
          "Personification gives human characteristics (whispering) to non-human things (wind).",
      },
      {
        q: "Which sentence is grammatically correct?",
        a: "'She and I went to the store' (not 'Her and me went to the store')",
        explanation:
          "Use subject pronouns (she, I) when they are the subject of the sentence. 'Her' and 'me' are object pronouns.",
      },
    ],
    faq: [
      {
        q: "What English topics are covered?",
        a: "Generate questions on grammar and syntax, literature analysis, reading comprehension, vocabulary, writing techniques, and rhetorical devices.",
      },
      {
        q: "Can I practice AP English Language or Literature?",
        a: "Yes. Upload literary texts or rhetorical analysis material to generate AP-level questions on themes, devices, and argumentation.",
      },
      {
        q: "Do questions include reading passages?",
        a: "Yes. Upload a text passage and the generator creates comprehension and analysis questions based on it.",
      },
      {
        q: "Is this good for SAT/ACT English prep?",
        a: "Yes. Generate grammar and reading comprehension questions matching SAT and ACT format and difficulty.",
      },
    ],
    relatedTools: [
      "/vocabulary",
      "/ai-quiz-generator",
      "/quiz-generator-from-pdf",
    ],
    relatedExams: ["sat", "act", "ap", "toefl", "ielts"],
  },
  {
    slug: "vocabulary",
    name: "Vocabulary",
    description:
      "Generate vocabulary quiz questions and flashcards for SAT, GRE, TOEFL prep or any word list.",
    topicsList: [
      "SAT vocabulary: high-frequency academic words tested on college entrance exams",
      "GRE vocabulary: advanced academic and literary terms for graduate school admissions",
      "TOEFL/IELTS vocabulary: English proficiency words for non-native speakers",
      "Academic vocabulary: discipline-specific terms for college coursework",
      "Word roots and affixes: Greek and Latin roots, prefixes, suffixes for decoding new words",
      "Context clues: using sentence context to determine meaning",
    ],
    sampleQuestions: [
      {
        q: "Which word means 'using very few words'?",
        a: "Laconic",
        explanation:
          "Laconic describes someone who uses few words; brief and to the point in speech.",
      },
      {
        q: "Choose the best synonym for 'ubiquitous':",
        a: "Omnipresent",
        explanation:
          "Both ubiquitous and omnipresent mean present everywhere at the same time.",
      },
      {
        q: "What does 'ephemeral' mean?",
        a: "Lasting a very short time",
        explanation:
          "Ephemeral describes something that is fleeting or transitory, existing briefly.",
      },
      {
        q: "The root 'bene' means 'good.' What does 'benevolent' mean?",
        a: "Kind, charitable, wishing well for others",
        explanation:
          "Benevolent combines 'bene' (good) with 'volent' (wishing), meaning having good intentions toward others.",
      },
    ],
    questionTypesAdvice:
      "Flashcards are the most effective format for vocabulary study—they force active recall of definitions without hints. Multiple choice questions work well for practicing synonym selection and context-based meaning, which appear on SAT and GRE. Fill-in-the-blank tests whether you can supply the exact word from context clues, a deeper skill than recognition. True/false questions help identify common usage errors and misunderstood connotations.",
    studyTips: [
      "Learn words in context, not in isolation. Memorizing 'laconic = brief' is weaker than reading 'Her laconic reply—just 'Fine'—ended the conversation.' Context makes words stick.",
      "Study word roots, prefixes, and suffixes. Knowing 'bene' means good lets you decode benevolent, benefactor, and beneficent without memorizing each separately.",
      "Create example sentences using new words. Writing 'The ephemeral beauty of cherry blossoms makes them more precious' cements the meaning better than rereading a definition.",
      "Group words by theme or root family. Study all words related to 'time' together (ephemeral, contemporary, chronic) or all words with 'mal' (bad): malevolent, malign, malady.",
      "Review spaced intervals: 1 day, 3 days, 1 week, 2 weeks. Spaced repetition moves words from short-term to long-term memory more efficiently than cramming.",
      "For SAT/GRE, focus on high-frequency words that appear repeatedly. A 500-word core vocabulary list covers 80% of challenging words on these tests.",
    ],
    faq: [
      {
        q: "Can I create flashcards for my vocabulary list?",
        a: "Yes. Upload or paste your word list and get flashcards with definitions, synonyms, and example sentences.",
      },
      {
        q: "What vocabulary levels are supported?",
        a: "Generate questions for any level: elementary, high school, SAT, GRE, TOEFL, or academic/professional vocabulary.",
      },
      {
        q: "Do questions include context clues?",
        a: "Yes. Questions use vocabulary in sentence context to test real understanding, not just memorization.",
      },
      {
        q: "Can I practice words in other languages?",
        a: "Yes. Examina generates in 29 languages, so you can create vocabulary practice for Spanish, French, German, and more.",
      },
    ],
    relatedTools: [
      "/ai-flashcards",
      "/fill-in-the-blank-generator",
      "/ai-quiz-generator",
    ],
    relatedExams: ["sat", "gre", "toefl", "ielts"],
  },
  {
    slug: "spanish",
    name: "Spanish",
    description:
      "Create Spanish language quiz questions for vocabulary, grammar, conjugation, and reading comprehension.",
    sampleQuestions: [
      {
        q: "¿Cuál es el pretérito de 'hablar' en la primera persona singular?",
        a: "Hablé",
        explanation:
          "The preterite (past tense) of 'hablar' in first person singular (I) is 'hablé.'",
      },
      {
        q: "Translate: 'She is going to the store.'",
        a: "Ella va a la tienda.",
        explanation:
          "'Va' is the third person singular present of 'ir' (to go). 'A la tienda' means 'to the store.'",
      },
      {
        q: "Which word is feminine: libro, casa, perro, or gato?",
        a: "Casa",
        explanation:
          "'Casa' (house) is feminine (la casa). The others are masculine: el libro, el perro, el gato.",
      },
    ],
    faq: [
      {
        q: "What Spanish topics can I practice?",
        a: "Generate questions on vocabulary, verb conjugation, grammar rules, sentence structure, and reading comprehension at any level.",
      },
      {
        q: "Can I practice for AP Spanish?",
        a: "Yes. Upload AP Spanish course material to generate questions matching the exam's format and difficulty.",
      },
      {
        q: "Do questions include accents and special characters?",
        a: "Yes. Questions use proper Spanish orthography including accents (á, é, í, ó, ú) and ñ.",
      },
      {
        q: "Can I generate questions in Spanish for Spanish speakers?",
        a: "Yes. The tool works in both directions: English speakers learning Spanish, or Spanish speakers studying any subject in Spanish.",
      },
    ],
    relatedTools: [
      "/ai-flashcards",
      "/vocabulary",
      "/fill-in-the-blank-generator",
    ],
    relatedExams: ["ap"],
  },
  {
    slug: "anatomy",
    name: "Anatomy",
    description:
      "Generate anatomy and physiology quiz questions on body systems, organs, tissues, and medical terminology.",
    topicsList: [
      "Skeletal System: bones, bone structure, joints, articulations",
      "Muscular System: muscle types, major muscles, muscle actions, attachments",
      "Cardiovascular System: heart anatomy, blood vessels, circulation pathways",
      "Respiratory System: lungs, airways, gas exchange, respiratory mechanics",
      "Nervous System: brain, spinal cord, cranial nerves, peripheral nerves, neuron structure",
      "Digestive System: GI tract organs, accessory organs, digestion and absorption",
      "Urinary System: kidneys, nephron, filtration, bladder",
      "Reproductive System: male and female reproductive organs",
      "Endocrine System: glands, hormones, feedback loops",
      "Integumentary System: skin layers, appendages, wound healing",
    ],
    sampleQuestions: [
      {
        q: "Which chamber of the heart receives oxygenated blood from the lungs?",
        a: "Left atrium",
        explanation:
          "Oxygenated blood returns from the lungs via pulmonary veins to the left atrium, then passes to the left ventricle before being pumped to the body.",
      },
      {
        q: "What type of joint is the shoulder?",
        a: "Ball-and-socket joint",
        explanation:
          "The shoulder is a ball-and-socket joint where the humeral head (ball) fits into the glenoid cavity (socket), allowing wide range of motion.",
      },
      {
        q: "Which cranial nerve is responsible for vision?",
        a: "Optic nerve (CN II)",
        explanation:
          "The optic nerve (cranial nerve II) carries visual information from the retina to the brain.",
      },
      {
        q: "What structure connects muscle to bone?",
        a: "Tendon",
        explanation:
          "Tendons are dense connective tissue that attach muscle to bone, transmitting force from muscle contraction to produce movement.",
      },
    ],
    questionTypesAdvice:
      "Multiple choice questions work well for identifying structures, functions, and pathways. Fill-in-the-blank is excellent for learning anatomical terminology—you must know the exact spelling of 'phalanges' or 'sternocleidomastoid.' Flashcards are essential for memorizing bones, muscles, nerves, and vessels—anatomy has hundreds of named structures. True/false questions help identify common anatomical misconceptions (e.g., 'The trachea is posterior to the esophagus' is false).",
    studyTips: [
      "Learn anatomy in context of function. Don't just memorize that the left ventricle is thick-walled; understand it's thick because it pumps blood to the entire body, requiring more force than the right ventricle.",
      "Use anatomical position and directional terms consistently. Always orient yourself: superior means toward the head, anterior means toward the front. This prevents confusion when describing locations.",
      "Study systems together that interact. Learn the cardiovascular and respiratory systems simultaneously because they work together for gas exchange. Learn the nervous and muscular systems together because nerves control muscles.",
      "Create labeled diagrams from memory. Being able to draw and label a cross-section of the heart or the layers of skin tests deeper understanding than recognizing a pre-made diagram.",
      "Focus on high-yield structures: major bones (femur, humerus, vertebrae), major muscles (biceps, quadriceps, deltoid), cranial nerves (especially I, II, V, VII, X), and major vessels (aorta, vena cava, pulmonary arteries/veins).",
      "For clinical programs, learn blood supply and innervation of organs. Knowing which nerve controls a muscle or which artery supplies an organ is critical for understanding pathology.",
    ],
    faq: [
      {
        q: "What anatomy topics are covered?",
        a: "Generate questions on all body systems: skeletal, muscular, cardiovascular, respiratory, nervous, digestive, urinary, reproductive, endocrine, and integumentary systems.",
      },
      {
        q: "Is this suitable for nursing or medical students?",
        a: "Yes. Questions are appropriate for nursing school, pre-med anatomy courses, and allied health programs.",
      },
      {
        q: "Can I upload anatomy diagrams?",
        a: "Text-based questions work best. For diagrams, describe the structures in notes and generate identification questions.",
      },
      {
        q: "Do questions use medical terminology?",
        a: "Yes. Questions use proper anatomical terms and include explanations defining medical vocabulary.",
      },
    ],
    relatedTools: [
      "/quiz-generator-from-pdf",
      "/ai-flashcards",
      "/notes-to-quiz",
    ],
    relatedExams: ["mcat", "nclex"],
  },
  {
    slug: "nursing",
    name: "Nursing",
    description:
      "Create nursing quiz questions on patient care, pharmacology, pathophysiology, and NCLEX-style practice.",
    topicsList: [
      "Fundamentals: vital signs, physical assessment, basic nursing skills, documentation",
      "Pharmacology: drug classifications, mechanisms, side effects, nursing considerations, dosage calculations",
      "Medical-Surgical Nursing: cardiac, respiratory, GI, neuro, renal disorders and interventions",
      "Maternal-Newborn (OB): prenatal care, labor and delivery, postpartum, newborn assessment",
      "Pediatric Nursing: growth and development, pediatric assessments, common childhood illnesses",
      "Mental Health Nursing: psychiatric disorders, therapeutic communication, psychotropic medications",
      "Critical Care: hemodynamic monitoring, ventilator management, code management",
      "Priority Setting: ABC (airway, breathing, circulation), Maslow's hierarchy, delegation, scope of practice",
    ],
    sampleQuestions: [
      {
        q: "A patient with heart failure is prescribed furosemide. Which electrolyte should the nurse monitor?",
        a: "Potassium",
        explanation:
          "Furosemide is a loop diuretic that causes potassium loss. Hypokalemia can lead to serious cardiac arrhythmias, so potassium levels must be monitored closely.",
      },
      {
        q: "What is the priority nursing action for a patient experiencing anaphylaxis?",
        a: "Administer epinephrine",
        explanation:
          "Epinephrine is the first-line treatment for anaphylaxis. It reverses airway swelling and hypotension, addressing life-threatening symptoms immediately.",
      },
      {
        q: "Which assessment finding indicates decreased cardiac output?",
        a: "Cool, clammy skin and weak peripheral pulses",
        explanation:
          "Decreased cardiac output reduces perfusion to extremities, causing cool skin, weak pulses, and compensatory vasoconstriction.",
      },
      {
        q: "A nurse is teaching a diabetic patient about insulin injection sites. Which site has the fastest absorption?",
        a: "Abdomen",
        explanation:
          "The abdomen has the fastest insulin absorption rate, followed by arms, then thighs. This matters for timing insulin with meals.",
      },
    ],
    questionTypesAdvice:
      "Multiple choice questions are essential for NCLEX-style priority-setting ('What should the nurse do first?') and require choosing the best answer among several correct-sounding options. Fill-in-the-blank is critical for dosage calculation practice where you must arrive at an exact number without answer hints. Flashcards help memorize drug classifications, lab values, and disease processes. True/false questions identify common nursing misconceptions (e.g., 'A nurse can delegate assessment to a UAP' is false).",
    studyTips: [
      "Always apply ABC (airway, breathing, circulation) and Maslow's hierarchy when prioritizing. Physiological needs come before safety, which comes before psychosocial needs.",
      "Memorize normal lab values and therapeutic drug ranges. NCLEX assumes you know these and won't provide reference ranges. Critical values include potassium (3.5-5.0), sodium (135-145), glucose (70-100), INR (2-3 on warfarin).",
      "Study pharmacology by drug class, not individual drugs. Learn ACE inhibitors as a group: they all end in '-pril,' lower blood pressure by blocking angiotensin, cause hyperkalemia, and have a common side effect of dry cough.",
      "Practice dosage calculations daily. Use dimensional analysis or the formula method consistently. Common calculations: IV drip rates, mg/kg dosing, unit conversions.",
      "Understand delegation and scope of practice. RNs assess, plan, and evaluate. LPNs implement care and give medications. UAPs do basic care and ADLs. NCLEX tests whether you delegate appropriately.",
      "For priority questions, choose the patient who is unstable, has an airway problem, or shows signs of physiological deterioration. Psychosocial concerns and teaching come after acute physiological issues are resolved.",
    ],
    faq: [
      {
        q: "What nursing topics can I generate questions for?",
        a: "Upload notes on fundamentals, pharmacology, med-surg, pediatrics, OB, psych, critical care, or any nursing specialty.",
      },
      {
        q: "Are questions NCLEX-style?",
        a: "Yes. Questions follow NCLEX format with priority ('first action,' 'most important') and evidence-based rationales.",
      },
      {
        q: "Can I practice pharmacology calculations?",
        a: "Yes. Upload dosage calculation notes and generate practice problems with step-by-step solutions.",
      },
      {
        q: "Is this a substitute for NCLEX review courses?",
        a: "No. This supplements your study by providing extra practice questions. Use alongside comprehensive NCLEX review materials.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/quiz-generator-from-pdf",
    ],
    relatedExams: ["nclex"],
  },
  {
    slug: "psychology",
    name: "Psychology",
    description:
      "Generate psychology quiz questions on cognitive psychology, developmental psychology, abnormal psychology, and research methods.",
    sampleQuestions: [
      {
        q: "According to Piaget, which stage is characterized by abstract thinking?",
        a: "Formal operational stage",
        explanation:
          "The formal operational stage (age 12+) is when individuals develop abstract reasoning, hypothetical thinking, and systematic problem-solving.",
      },
      {
        q: "What neurotransmitter is most associated with depression?",
        a: "Serotonin",
        explanation:
          "Serotonin deficiency is strongly linked to depression. Many antidepressants (SSRIs) work by increasing serotonin availability in the brain.",
      },
      {
        q: "Which research method establishes cause and effect?",
        a: "Experimental method",
        explanation:
          "Only experiments with random assignment and controlled variables can establish causal relationships. Correlational studies show associations but not causation.",
      },
    ],
    faq: [
      {
        q: "What psychology topics are covered?",
        a: "Generate questions on cognitive psychology, behavioral psychology, developmental psychology, social psychology, abnormal psychology, neuroscience, and research methods.",
      },
      {
        q: "Can I practice for AP Psychology?",
        a: "Yes. Upload AP Psych notes to generate questions matching exam format, difficulty, and content areas.",
      },
      {
        q: "Do questions include research studies?",
        a: "Yes. Questions reference classic studies (Milgram, Zimbardo, Pavlov, etc.) when relevant to your uploaded material.",
      },
      {
        q: "Is this suitable for college-level courses?",
        a: "Yes. Generate questions appropriate for intro psychology, abnormal psychology, cognitive neuroscience, or specialized upper-level courses.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/quiz-generator-from-pdf",
    ],
    relatedExams: ["ap", "mcat", "midterm", "finals"],
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    description:
      "Create computer science quiz questions on programming, algorithms, data structures, and software engineering.",
    sampleQuestions: [
      {
        q: "What is the time complexity of binary search?",
        a: "O(log n)",
        explanation:
          "Binary search divides the search space in half with each comparison, resulting in logarithmic time complexity.",
      },
      {
        q: "In Python, which data structure is immutable?",
        a: "Tuple",
        explanation:
          "Tuples are immutable (cannot be changed after creation), unlike lists which are mutable.",
      },
      {
        q: "What does SQL stand for?",
        a: "Structured Query Language",
        explanation:
          "SQL is the standard language for managing and querying relational databases.",
      },
    ],
    faq: [
      {
        q: "What CS topics can I generate questions for?",
        a: "Upload notes on programming (Python, Java, C++), data structures, algorithms, databases, web development, software engineering, or computer theory.",
      },
      {
        q: "Can I practice coding questions?",
        a: "Yes, but the focus is on conceptual questions and code reading. For hands-on coding practice, use dedicated coding platforms alongside this tool.",
      },
      {
        q: "Do questions include code snippets?",
        a: "Yes. Questions can include code examples for debugging, output prediction, or concept identification.",
      },
      {
        q: "Is this good for AP Computer Science?",
        a: "Yes. Generate AP CS A (Java) questions from your course material matching exam format and difficulty.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
    ],
    relatedExams: ["ap", "midterm", "finals"],
  },
];

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}
