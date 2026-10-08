/**
 * Subject collection for programmatic SEO Wave 2.
 * Each subject is a quiz generator page with sample questions.
 */

export interface Subject {
  slug: string;
  name: string;
  description: string;
  icon?: string;
  sampleQuestions: { q: string; a: string; explanation: string }[];
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
  {
    slug: "spelling",
    name: "Spelling",
    description:
      "Generate spelling practice questions and tests for elementary, middle school, or ESL vocabulary building.",
    sampleQuestions: [
      {
        q: "Choose the correctly spelled word:",
        a: "Definitely (not definately)",
        explanation:
          "Many people misspell 'definitely' because of the pronunciation. Remember: it's related to 'finite' and 'definite.'",
      },
      {
        q: "Which word is spelled correctly?",
        a: "Separate (not seperate)",
        explanation:
          "The correct spelling is 'separate.' Remember there's 'a rat' in separate.",
      },
      {
        q: "Fill in the blank: She was em___rrassed by the mistake.",
        a: "barrassed (embarrassed)",
        explanation:
          "Embarrassed has two r's and two s's. Think: really, really should stay silent.",
      },
    ],
    faq: [
      {
        q: "What spelling levels can I practice?",
        a: "Generate spelling quizzes for elementary, middle school, high school, or adult ESL learners. Upload your weekly spelling list or vocabulary words.",
      },
      {
        q: "Can I create spelling tests from my curriculum?",
        a: "Yes. Upload your school's spelling list and generate multiple choice or fill-in-the-blank spelling questions.",
      },
      {
        q: "Do questions include context?",
        a: "Yes. Questions show words in sentence context to test real understanding, not just memorization.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 5 quiz generations per month. Paid plans start at $2/month for 20 quizzes.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/fill-in-the-blank-generator",
      "/vocabulary",
    ],
  },
  {
    slug: "grammar",
    name: "Grammar",
    description:
      "Create grammar quiz questions on sentence structure, parts of speech, punctuation, and usage for English learners.",
    sampleQuestions: [
      {
        q: "Identify the error: 'Me and him went to the store.'",
        a: "Should be 'He and I went to the store'",
        explanation:
          "Use subject pronouns (he, I) when they are the subject of the sentence. 'Me' and 'him' are object pronouns.",
      },
      {
        q: "Which sentence uses commas correctly?",
        a: "After the meeting, we went to lunch.",
        explanation:
          "An introductory phrase (After the meeting) is followed by a comma before the main clause.",
      },
      {
        q: "Choose the correct verb form: 'Neither the teacher nor the students ___ ready.'",
        a: "were",
        explanation:
          "When using 'neither...nor,' the verb agrees with the nearest subject (students, plural), so use 'were.'",
      },
    ],
    faq: [
      {
        q: "What grammar topics are covered?",
        a: "Generate questions on parts of speech, sentence structure, subject-verb agreement, verb tenses, punctuation, modifiers, and common usage errors.",
      },
      {
        q: "Is this suitable for ESL learners?",
        a: "Yes. Questions work for both native English speakers and ESL students at intermediate to advanced levels.",
      },
      {
        q: "Can I practice for standardized tests?",
        a: "Yes. Generate SAT, ACT, or TOEFL-style grammar questions by uploading relevant practice material.",
      },
      {
        q: "Do questions explain the rules?",
        a: "Yes. Every question includes an explanation of the grammar rule being tested.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
      "/vocabulary",
    ],
    relatedExams: ["sat", "act", "toefl", "ielts"],
  },
  {
    slug: "algebra",
    name: "Algebra",
    description:
      "Generate algebra practice questions on equations, inequalities, functions, polynomials, and graphing for pre-algebra through Algebra 2.",
    sampleQuestions: [
      {
        q: "Solve for x: 5x - 8 = 27",
        a: "x = 7",
        explanation:
          "Add 8 to both sides: 5x = 35. Then divide both sides by 5: x = 7.",
      },
      {
        q: "Factor: x² + 7x + 12",
        a: "(x + 3)(x + 4)",
        explanation:
          "Find two numbers that multiply to 12 and add to 7. Those numbers are 3 and 4, so the factors are (x + 3)(x + 4).",
      },
      {
        q: "What is the slope of the line y = -2x + 5?",
        a: "-2",
        explanation:
          "In slope-intercept form y = mx + b, m is the slope. Here, the slope is -2.",
      },
    ],
    faq: [
      {
        q: "What algebra topics can I practice?",
        a: "Generate questions on solving equations and inequalities, graphing linear and quadratic functions, factoring polynomials, systems of equations, exponents, and rational expressions.",
      },
      {
        q: "Is this suitable for Algebra 1 and Algebra 2?",
        a: "Yes. Upload your course notes to generate questions matching your specific curriculum and difficulty level.",
      },
      {
        q: "Do questions show step-by-step solutions?",
        a: "Yes. Every problem includes a detailed explanation showing the solution steps.",
      },
      {
        q: "Can I use this for SAT math prep?",
        a: "Yes. Generate SAT-style algebra questions by uploading relevant practice problems.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/notes-to-quiz",
      "/quiz-generator-from-pdf",
    ],
    relatedExams: ["sat", "act", "midterm", "finals"],
  },
  {
    slug: "geometry",
    name: "Geometry",
    description:
      "Create geometry practice questions on shapes, angles, proofs, area, volume, and coordinate geometry for high school geometry courses.",
    sampleQuestions: [
      {
        q: "What is the sum of interior angles in a hexagon?",
        a: "720 degrees",
        explanation:
          "Use the formula (n - 2) × 180° where n is the number of sides. For a hexagon (6 sides): (6 - 2) × 180° = 720°.",
      },
      {
        q: "A circle has a radius of 5 cm. What is its area?",
        a: "25π cm² (approximately 78.54 cm²)",
        explanation:
          "Area of a circle is A = πr². With r = 5 cm, A = π(5)² = 25π ≈ 78.54 cm².",
      },
      {
        q: "If two parallel lines are cut by a transversal, and one angle is 65°, what is the corresponding angle?",
        a: "65°",
        explanation:
          "Corresponding angles are equal when parallel lines are cut by a transversal, so the answer is 65°.",
      },
    ],
    faq: [
      {
        q: "What geometry topics are covered?",
        a: "Generate questions on angles, triangles, quadrilaterals, circles, polygons, area and perimeter, volume and surface area, coordinate geometry, transformations, and geometric proofs.",
      },
      {
        q: "Do questions include diagrams?",
        a: "Questions describe geometric figures in text. For diagram-based problems, describe the figure in your notes when uploading.",
      },
      {
        q: "Is this good for high school geometry?",
        a: "Yes. Questions match typical high school geometry curriculum and can be generated at appropriate difficulty levels.",
      },
      {
        q: "Can I practice for standardized tests?",
        a: "Yes. Generate SAT, ACT, or GRE geometry questions by uploading relevant practice material.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
    ],
    relatedExams: ["sat", "act", "gre", "midterm", "finals"],
  },
  {
    slug: "world-history",
    name: "World History",
    description:
      "Generate world history quiz questions on ancient civilizations, empires, revolutions, wars, and cultural developments across global regions.",
    sampleQuestions: [
      {
        q: "Which ancient civilization built Machu Picchu?",
        a: "The Inca Empire",
        explanation:
          "Machu Picchu was built by the Inca Empire in the 15th century in present-day Peru, serving as a royal estate and sacred religious site.",
      },
      {
        q: "What was the primary cause of World War I?",
        a: "The assassination of Archduke Franz Ferdinand triggered a chain of alliances",
        explanation:
          "While multiple factors existed (militarism, alliances, imperialism, nationalism), the assassination of Archduke Franz Ferdinand in June 1914 was the immediate trigger that activated the alliance system and led to war.",
      },
      {
        q: "Which revolution established the principle that governments derive power from the consent of the governed?",
        a: "The American Revolution",
        explanation:
          "The American Revolution (1775-1783) and the Declaration of Independence established the principle of popular sovereignty—that government legitimacy comes from the people.",
      },
    ],
    faq: [
      {
        q: "What world history periods can I study?",
        a: "Generate questions on any period: ancient civilizations, classical empires, medieval history, Renaissance, Age of Exploration, revolutions, world wars, Cold War, or modern global issues.",
      },
      {
        q: "Do questions test memorization or analysis?",
        a: "Both. Questions are tagged by Bloom's taxonomy, testing factual knowledge, understanding of causes and effects, and historical analysis skills.",
      },
      {
        q: "Can I practice for AP World History?",
        a: "Yes. Upload AP World History notes to generate questions matching the exam's format, themes, and historical thinking skills.",
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
    slug: "french",
    name: "French",
    description:
      "Create French language quiz questions for vocabulary, grammar, verb conjugation, and reading comprehension practice.",
    sampleQuestions: [
      {
        q: "Quel est le passé composé de 'parler' à la première personne?",
        a: "J'ai parlé",
        explanation:
          "The passé composé (compound past) of 'parler' in first person is formed with avoir: j'ai parlé (I spoke/have spoken).",
      },
      {
        q: "Translate: 'He is going to the library.'",
        a: "Il va à la bibliothèque.",
        explanation:
          "'Va' is the third person singular present of 'aller' (to go). 'À la bibliothèque' means 'to the library.'",
      },
      {
        q: "Which word is masculine: table, livre, maison, or fenêtre?",
        a: "Livre",
        explanation:
          "'Livre' (book) is masculine (le livre). The others are feminine: la table, la maison, la fenêtre.",
      },
    ],
    faq: [
      {
        q: "What French topics can I practice?",
        a: "Generate questions on vocabulary, verb conjugation (present, past, future, subjunctive), grammar rules, sentence structure, and reading comprehension at any level.",
      },
      {
        q: "Can I practice for AP French?",
        a: "Yes. Upload AP French course material to generate questions matching exam format and difficulty.",
      },
      {
        q: "Do questions include accents?",
        a: "Yes. Questions use proper French orthography including accents (é, è, ê, à, ù, ç) and special characters.",
      },
      {
        q: "Is this suitable for beginners?",
        a: "Yes. Generate questions at any level from beginner (introductory vocabulary and present tense) to advanced (subjunctive, literary texts).",
      },
    ],
    relatedTools: [
      "/ai-flashcards",
      "/vocabulary",
      "/fill-in-the-blank-generator",
    ],
    relatedExams: ["ap"],
  },
];

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}
