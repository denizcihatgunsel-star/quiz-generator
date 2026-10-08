/**
 * Combo pages for Medical Terminology subject hub
 */
import type { ComboData } from "./types";

export const MEDICAL_TERMINOLOGY_COMBOS: ComboData[] = [
  {
    slug: "flashcards",
    type: "flashcards",
    meta: {
      type: "flashcards",
      primaryKeyword: "medical terminology flashcards",
      monthlyVolume: 8100,
    },
    h1: "Medical Terminology Flashcards — Master Medical Vocabulary",
    intro:
      "Build your medical vocabulary foundation with flashcards covering prefixes, suffixes, root words, combining forms, and complete medical terms. Essential for nursing students, medical assisting programs, health information management, and anyone entering healthcare. Each card breaks down terms into component parts, shows pronunciation guidance, and provides clinical context to help you understand not just what terms mean, but how they're used in patient care documentation and clinical communication. Study systematically and move terms into long-term memory faster than traditional methods.",
    sampleItems: [
      {
        q: "Hyper-",
        a: "Prefix meaning: Above normal, excessive, increased. Examples: Hypertension (high blood pressure), Hyperglycemia (high blood sugar), Hyperthermia (elevated body temperature above normal). Origin: Greek 'hyper' meaning over or above.",
        explanation:
          "Hyper- indicates a state or condition that exceeds normal levels or is excessive. Clinically important because 'hyper-' conditions often require intervention to bring values back to normal range.",
        bloomLevel: "Remember",
      },
      {
        q: "-itis",
        a: "Suffix meaning: Inflammation of a structure or organ. Examples: Appendicitis (appendix inflammation), Arthritis (joint inflammation), Gastritis (stomach lining inflammation), Bronchitis (bronchial tubes inflammation). Key feature: inflammation involves pain, redness, swelling, heat.",
        explanation:
          "The -itis suffix is one of the most common in medical terminology, appearing in countless diagnoses. Inflammation is a protective immune response to injury or infection, but chronic inflammation can damage tissues.",
        bloomLevel: "Remember",
      },
      {
        q: "Cardi/o",
        a: "Root word/combining form meaning: Heart. Examples: Cardiology (study of the heart), Electrocardiogram (ECG/EKG - heart electrical recording), Myocardium (heart muscle), Pericardium (membrane surrounding the heart), Bradycardia (slow heart rate). Origin: Greek 'kardia.'",
        explanation:
          "Cardi/o appears in numerous cardiac-related terms. The 'o' is a combining vowel that connects the root to suffixes or other roots, making pronunciation easier.",
        bloomLevel: "Remember",
      },
      {
        q: "Pneum/o, Pneumon/o",
        a: "Root word meaning: Lung, air. Examples: Pneumonia (lung infection and inflammation), Pneumothorax (collapsed lung with air in pleural space), Pneumonectomy (surgical removal of a lung). Origin: Greek 'pneumon' meaning lung.",
        explanation:
          "Pneum/o can refer to air or lungs depending on context. Pneumothorax literally means 'air in the chest,' while pneumonia means 'lung inflammation/infection.'",
        bloomLevel: "Remember",
      },
      {
        q: "-ectomy",
        a: "Suffix meaning: Surgical removal, excision, cutting out. Examples: Appendectomy (removing the appendix), Cholecystectomy (removing the gallbladder), Mastectomy (removing the breast), Tonsillectomy (removing the tonsils). Always indicates a surgical procedure.",
        explanation:
          "When you see -ectomy, the procedure involves completely removing an organ, structure, or tissue. This differs from -otomy (cutting into) or -ostomy (creating an opening).",
        bloomLevel: "Remember",
      },
      {
        q: "Gastro",
        a: "Root word meaning: Stomach. Examples: Gastritis (stomach inflammation), Gastrointestinal (relating to stomach and intestines, often abbreviated GI), Gastroenterology (study of digestive system), Gastroparesis (delayed stomach emptying). Origin: Greek 'gaster' meaning belly or stomach.",
        explanation:
          "Gastro- appears frequently in digestive system terminology. The GI tract extends from mouth to anus, but 'gastro-' specifically refers to the stomach portion.",
        bloomLevel: "Remember",
      },
      {
        q: "Hypo-",
        a: "Prefix meaning: Below normal, deficient, decreased, under. Examples: Hypotension (low blood pressure), Hypoglycemia (low blood sugar), Hypothyroidism (underactive thyroid). Opposite of hyper-. Origin: Greek 'hypo' meaning under or below.",
        explanation:
          "Hypo- and hyper- are opposites and frequently confused. Remember: hypo = low (hypodermic needle goes under the skin), hyper = high (hyperactive = overly active).",
        bloomLevel: "Remember",
      },
      {
        q: "Hemo, Hemat/o",
        a: "Root word meaning: Blood. Examples: Hematology (study of blood), Hemorrhage (excessive bleeding), Hematoma (collection of blood outside vessels, a bruise), Hemoglobin (oxygen-carrying protein in red blood cells). Origin: Greek 'haima' meaning blood.",
        explanation:
          "Hemo and hemat/o are interchangeable forms of the same root. Hematology deals with blood disorders like anemia, leukemia, and clotting problems.",
        bloomLevel: "Remember",
      },
      {
        q: "-ology",
        a: "Suffix meaning: Study of, science of. Examples: Cardiology (study of heart), Dermatology (study of skin), Neurology (study of nervous system), Pathology (study of disease). The specialist who practices is -ologist. Origin: Greek 'logos' meaning study.",
        explanation:
          "Medical specialties use -ology to denote the field and -ologist for the doctor specializing in it: cardiology/cardiologist, neurology/neurologist.",
        bloomLevel: "Remember",
      },
      {
        q: "Brady-",
        a: "Prefix meaning: Slow. Examples: Bradycardia (slow heart rate, below 60 beats per minute), Bradypnea (slow breathing rate, below 12 breaths per minute). Opposite of tachy- (fast). Origin: Greek 'bradys' meaning slow.",
        explanation:
          "Brady- always indicates something happening slower than normal. In clinical settings, bradycardia and bradypnea are significant findings that may require intervention.",
        bloomLevel: "Remember",
      },
      {
        q: "Tachy-",
        a: "Prefix meaning: Fast, rapid. Examples: Tachycardia (fast heart rate, over 100 beats per minute at rest), Tachypnea (rapid breathing, over 20 breaths per minute). Opposite of brady- (slow). Origin: Greek 'tachys' meaning swift.",
        explanation:
          "Tachy- indicates increased speed or rate. Tachycardia and tachypnea are common responses to stress, exercise, fever, pain, or medical conditions requiring oxygen.",
        bloomLevel: "Remember",
      },
      {
        q: "Nephro",
        a: "Root word meaning: Kidney. Examples: Nephrology (study of kidneys), Nephron (kidney functional unit), Nephritis (kidney inflammation), Nephrectomy (surgical removal of a kidney). Origin: Greek 'nephros' meaning kidney.",
        explanation:
          "The kidneys filter blood, regulate fluid balance, and produce urine. Nephrologists treat kidney disease, including chronic kidney disease and patients requiring dialysis.",
        bloomLevel: "Remember",
      },
    ],
    topicsCovered: [
      "Common prefixes (hyper-, hypo-, brady-, tachy-, dys-, a-/an-, pre-, post-, peri-)",
      "Frequent suffixes (-itis, -ectomy, -otomy, -ology, -ologist, -pathy, -plasty, -scopy)",
      "Body system root words (cardi/o, pneum/o, gastro, nephro, hepato, neuro, derm/o, osteo)",
      "Directional and positional terms (anterior/posterior, superior/inferior, medial/lateral, proximal/distal)",
      "Diagnostic and procedural terms (biopsy, endoscopy, angiography, tomography, -gram endings)",
      "Anatomical planes and regions (sagittal, coronal, transverse, abdominal quadrants)",
      "Color indicators (cyan/o = blue, erythr/o = red, leuk/o = white, melan/o = black)",
    ],
    studyTips: {
      workflow: [
        "Study prefixes, suffixes, and root words separately before combining them—master the building blocks first",
        "Use the flashcard flip feature to test yourself on meanings, then reverse the cards to practice building terms from definitions",
        "Group cards by body system (cardiovascular, respiratory, digestive) rather than alphabetically—clinical context aids memory",
      ],
      tips: [
        "Break every new term into parts: identify prefix + root + suffix and define each component before defining the whole term",
        "Practice pronunciation aloud; medical terminology follows consistent phonetic patterns that become familiar with repetition",
        "Focus on high-frequency terms first: -itis, -ectomy, cardi/o, gastro, hemo appear in thousands of medical terms",
      ],
    },
    faq: [
      {
        q: "How many medical terms do I need to know?",
        a: "Nursing and allied health programs typically require 500-1,000 core terms. Master common prefixes, suffixes, and roots to decode thousands of terms without memorizing each individually.",
      },
      {
        q: "Do I need to memorize spelling?",
        a: "Yes. Medical documentation requires correct spelling for legal and safety reasons. Electronic health records auto-correct some terms, but accurate spelling prevents dangerous errors.",
      },
      {
        q: "Are medical abbreviations included?",
        a: "Flashcards focus on full terms and word parts. For abbreviations (prn, bid, NPO), supplement with your program's approved abbreviation list—some are banned by Joint Commission.",
      },
      {
        q: "Can I create flashcards from my textbook?",
        a: "Yes. Upload your medical terminology textbook chapters or course vocabulary lists to generate custom flashcards matching your curriculum.",
      },
      {
        q: "Is this suitable for nursing students?",
        a: "Yes. Medical terminology is foundational for nursing school, medical assisting, health information management, pre-med, and all healthcare careers.",
      },
      {
        q: "How long does it take to learn medical terminology?",
        a: "Most formal courses span 8-16 weeks. With focused daily study using spaced repetition, you can master core terminology in 6-10 weeks.",
      },
    ],
    relatedPages: [
      "/subjects/medical-terminology",
      "/subjects/medical-terminology/quiz",
      "/subjects/medical-terminology/practice-questions",
      "/subjects/anatomy",
      "/subjects/pharmacology",
      "/subjects/nursing",
      "/ai-flashcards",
    ],
  },
  {
    slug: "quiz",
    type: "quiz",
    meta: {
      type: "quiz",
      primaryKeyword: "medical terminology quiz",
      monthlyVolume: 2400,
    },
    h1: "Medical Terminology Quiz — Test Your Medical Vocabulary",
    intro:
      "Assess your understanding of medical prefixes, suffixes, root words, and complete terms with this comprehensive medical terminology quiz. Perfect for nursing students, medical assisting programs, health information management courses, and healthcare professionals strengthening their clinical vocabulary. Questions test your ability to define terms, identify word parts, and apply medical language in clinical contexts. Use this quiz as a diagnostic tool to find gaps in your knowledge, then focus study efforts on areas needing improvement. Medical terminology proficiency is essential for accurate patient documentation, professional communication, and understanding clinical information.",
    sampleItems: [
      {
        q: "The medical term for surgical removal of the gallbladder is:",
        a: "Cholecystectomy",
        explanation:
          "Cholecyst/o = gallbladder, -ectomy = surgical removal. Cholecystectomy is commonly performed for gallstones (cholelithiasis) or gallbladder inflammation (cholecystitis).",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "A patient with dysphagia has difficulty with:",
        a: "Swallowing",
        explanation:
          "Dys- = difficult or painful, -phagia = swallowing. Dysphagia can result from stroke, esophageal disorders, or neurological conditions. It increases aspiration pneumonia risk.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "The prefix 'peri-' means:",
        a: "Around, surrounding",
        explanation:
          "Peri- indicates surrounding or around. Examples: pericardium (membrane around the heart), peritoneum (membrane lining abdominal cavity), perinatal (around the time of birth).",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Hepatomegaly refers to:",
        a: "Enlarged liver",
        explanation:
          "Hepat/o = liver, -megaly = enlargement. Hepatomegaly can result from infection, heart failure, cirrhosis, or cancer. The liver can be palpated below the rib cage when enlarged.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "True or False: Arthroscopy involves surgical removal of a joint.",
        a: "False",
        explanation:
          "-scopy = visual examination using a scope. Arthroscopy uses a camera to examine inside a joint for diagnostic or minor surgical procedures, but it's not joint removal. Joint removal would be arthrectomy.",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "A patient scheduled for a rhinoplasty will have:",
        a: "Surgical repair of the nose",
        explanation:
          "Rhin/o = nose, -plasty = surgical repair or reconstruction. Rhinoplasty may be cosmetic or functional (to correct breathing problems or trauma).",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "The term 'bradypnea' means:",
        a: "Abnormally slow breathing",
        explanation:
          "Brady- = slow, -pnea = breathing. Bradypnea is respiratory rate below 12 breaths per minute in adults. Causes include brain injury, drug overdose (especially opioids), or metabolic disorders.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Leukocytes are:",
        a: "White blood cells",
        explanation:
          "Leuk/o = white, -cyte = cell. Leukocytes defend against infection and foreign substances. Elevated white blood cell count (leukocytosis) often indicates infection or inflammation.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Common prefixes and their meanings",
      "Suffixes indicating procedures, conditions, and specialists",
      "Root words for body systems and organs",
      "Diagnostic terms and procedures",
      "Surgical terminology",
      "Pathological conditions",
      "Anatomical directional terms",
      "Abbreviations in context",
    ],
    studyTips: {
      workflow: [
        "Take the quiz without notes first to establish a baseline score and identify knowledge gaps",
        "Review all explanations, especially for correct answers—the explanation provides context and related terms",
        "Retake the quiz after studying problem areas; aim for 90%+ accuracy before moving to new material",
      ],
      tips: [
        "When stuck on a term, break it into parts: prefix + root + suffix, then define each piece separately",
        "Pay attention to common confusions: hypo- vs. hyper-, -otomy vs. -ectomy, -ology vs. -ologist",
        "Context clues matter: if a question mentions a specific symptom or body system, use that to narrow possible meanings",
      ],
    },
    faq: [
      {
        q: "How is this quiz formatted?",
        a: "Questions are multiple choice and true/false, testing term definitions, word part meanings, and clinical application. Each question includes a detailed explanation.",
      },
      {
        q: "What score do I need to pass?",
        a: "Most medical terminology courses require 70-80% for passing. Aim for 90%+ to ensure mastery before nursing exams or clinical rotations.",
      },
      {
        q: "Can I retake the quiz?",
        a: "Yes. Retake as many times as needed. Spaced repetition (retaking after 1 day, 3 days, 1 week) improves long-term retention better than cramming.",
      },
      {
        q: "Does this cover all medical terminology?",
        a: "This quiz covers core terms and word parts. For comprehensive coverage matching your specific course, upload your textbook chapters to generate custom quizzes.",
      },
      {
        q: "Are these terms used in real clinical settings?",
        a: "Yes. Every term tested appears in medical documentation, patient records, clinical communication, and healthcare professional conversations.",
      },
      {
        q: "How do I study terms I miss?",
        a: "Create flashcards for missed terms immediately after the quiz. Study those specific cards using spaced repetition before retaking the full quiz.",
      },
    ],
    relatedPages: [
      "/subjects/medical-terminology",
      "/subjects/medical-terminology/flashcards",
      "/subjects/medical-terminology/practice-questions",
      "/subjects/anatomy",
      "/subjects/pharmacology",
      "/ai-quiz-generator",
    ],
  },
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "medical terminology practice test",
      monthlyVolume: 720,
    },
    h1: "Medical Terminology Practice Questions — Exam Prep",
    intro:
      "Prepare for medical terminology exams with comprehensive practice questions testing word parts, definitions, spelling, and clinical application. These questions mirror typical medical terminology course assessments and certification exams, ensuring you're ready for timed testing conditions. Each question includes detailed explanations showing how terms are constructed from prefixes, roots, and suffixes, plus clinical context explaining how the term is used in patient care. Essential for nursing students, medical assistants, health information technicians, and anyone in healthcare education requiring medical terminology proficiency. Study note: medical terminology is a study aid for learning, not medical advice.",
    sampleItems: [
      {
        q: "Which term means 'inflammation of the stomach lining'?",
        a: "Gastritis",
        explanation:
          "Gastro = stomach, -itis = inflammation. Gastritis can be acute (sudden) or chronic, often caused by H. pylori infection, NSAID use, or excessive alcohol consumption.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "A patient diagnosed with 'tachycardia' has:",
        a: "Fast heart rate (over 100 bpm at rest)",
        explanation:
          "Tachy- = fast/rapid, cardi/o = heart, -ia = condition. Resting tachycardia exceeds 100 beats per minute and can result from fever, anxiety, dehydration, anemia, or heart disease.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "The surgical procedure 'nephrectomy' involves:",
        a: "Removal of a kidney",
        explanation:
          "Nephro = kidney, -ectomy = surgical removal. Nephrectomy may be partial (removing part of kidney) or total, performed for cancer, severe infection, or living organ donation.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "The prefix 'hypo-' in 'hypoglycemia' means:",
        a: "Below normal or deficient",
        explanation:
          "Hypo- = below/under/deficient, glyc/o = sugar/glucose, -emia = blood condition. Hypoglycemia is low blood sugar (typically below 70 mg/dL), causing shakiness, confusion, and if severe, loss of consciousness.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Osteoporosis is a condition involving:",
        a: "Decreased bone density and increased fracture risk",
        explanation:
          "Oste/o = bone, por/o = pore/passage, -osis = abnormal condition. Osteoporosis makes bones porous and brittle, most common in postmenopausal women due to decreased estrogen and calcium loss.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "A hematoma is:",
        a: "A collection of blood outside blood vessels",
        explanation:
          "Hemat/o = blood, -oma = tumor/swelling/mass. A hematoma is a bruise or blood collection in tissues, often from trauma. Large hematomas may require drainage.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "The term 'dyspnea' refers to:",
        a: "Difficult or labored breathing",
        explanation:
          "Dys- = difficult/painful/abnormal, -pnea = breathing. Dyspnea is subjective difficulty breathing, a symptom of heart failure, COPD, asthma, or pulmonary embolism requiring urgent assessment.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Hepatitis means:",
        a: "Inflammation of the liver",
        explanation:
          "Hepat/o = liver, -itis = inflammation. Hepatitis has multiple causes: viral infection (Hepatitis A, B, C), alcohol abuse, autoimmune disease, or medication toxicity. Can be acute or chronic.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Prefixes (common and medical-specific)",
      "Suffixes (diagnostic, procedural, pathological)",
      "Root words (all major body systems)",
      "Term construction and deconstruction",
      "Spelling and pronunciation",
      "Clinical application and context",
      "Diagnostic procedures and imaging",
      "Surgical and therapeutic procedures",
    ],
    studyTips: {
      workflow: [
        "Complete practice questions under timed conditions simulating actual exam pressure—2 minutes per question maximum",
        "Mark questions you're unsure about even if you guess correctly; these reveal gaps requiring focused review",
        "Create a personal 'missed terms' list with definitions and use them as a targeted flashcard deck",
      ],
      tips: [
        "Read every question twice before answering; medical terminology assessments test precision—'hepatitis' and 'hepatomegaly' are different conditions",
        "Eliminate obviously wrong answers first; if you know -itis means inflammation, you can rule out options describing surgery or testing",
        "When multiple answers seem correct, choose the most complete or specific definition—medical terminology values precision",
      ],
    },
    faq: [
      {
        q: "How many questions should I practice daily?",
        a: "Start with 10-15 questions daily, reviewing all explanations. Increase to 25-30 questions as you build speed and accuracy. Consistent daily practice beats marathon cramming sessions.",
      },
      {
        q: "What if I keep missing the same terms?",
        a: "This indicates those terms aren't in long-term memory yet. Create flashcards specifically for problem terms and review them daily using spaced repetition until automatic.",
      },
      {
        q: "Are these questions harder than my class exams?",
        a: "Questions match typical medical terminology course and certification exam difficulty. If they feel hard, your program likely has similar rigor—keep practicing until comfortable.",
      },
      {
        q: "Should I memorize word parts or complete terms?",
        a: "Memorize word parts (prefixes, roots, suffixes) first. This lets you decode thousands of terms without memorizing each one individually—more efficient and lasting.",
      },
      {
        q: "Do I need to know Latin and Greek origins?",
        a: "Not for most programs, but understanding that medical terminology comes from Greek and Latin explains spelling patterns and pronunciation rules, making learning easier.",
      },
      {
        q: "How do I prepare for spelling tests?",
        a: "Write terms repeatedly by hand (not typing—handwriting strengthens memory). Practice medical terminology dictation if your program includes listening/transcription components.",
      },
    ],
    relatedPages: [
      "/subjects/medical-terminology",
      "/subjects/medical-terminology/flashcards",
      "/subjects/medical-terminology/quiz",
      "/subjects/anatomy",
      "/subjects/pharmacology",
      "/subjects/nursing",
      "/practice-test-generator",
    ],
  },
];
