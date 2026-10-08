/**
 * Combo pages for Anatomy and Physiology subject hub
 */
import type { ComboData } from "./types";

export const ANATOMY_AND_PHYSIOLOGY_COMBOS: ComboData[] = [
  {
    slug: "quiz",
    type: "quiz",
    meta: {
      type: "quiz",
      primaryKeyword: "anatomy and physiology quiz",
      monthlyVolume: 1300,
    },
    h1: "Anatomy and Physiology Quiz — Test Your A&P Knowledge",
    intro:
      "Assess your understanding of human anatomy and physiology with this comprehensive quiz covering all major body systems, tissue types, and physiological processes. Perfect for college A&P courses, nursing school prerequisites, pre-med programs, and allied health students. Questions test both structural anatomy (organs, tissues, bones, muscles) and functional physiology (how systems work, regulatory mechanisms, homeostasis). Each question includes detailed explanations connecting structure to function—the core principle of anatomy and physiology. Use this quiz diagnostically to identify knowledge gaps before exams, then focus study efforts on weak areas. Mastery of A&P is foundational for all healthcare careers.",
    sampleItems: [
      {
        q: "Which heart chamber receives oxygenated blood returning from the lungs?",
        a: "Left atrium",
        explanation:
          "Pulmonary veins carry oxygenated blood from the lungs to the left atrium. Blood then flows through the mitral (bicuspid) valve into the left ventricle, which pumps it through the aortic valve into the aorta and systemic circulation.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Simple squamous epithelium is ideally suited for:",
        a: "Rapid diffusion and filtration",
        explanation:
          "Simple squamous epithelium is a single layer of flat cells providing minimal barrier to diffusion. Found in alveoli (gas exchange), capillaries (nutrient/waste exchange), and glomeruli (filtration). Structure matches function: thin cells allow rapid molecule movement.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "The primary function of the nephron is to:",
        a: "Filter blood and form urine",
        explanation:
          "Each kidney contains ~1 million nephrons that filter blood, reabsorb needed substances (water, glucose, electrolytes), and secrete wastes to produce urine. Process: glomerular filtration → tubular reabsorption → tubular secretion.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which division of the autonomic nervous system is responsible for 'fight or flight' responses?",
        a: "Sympathetic division",
        explanation:
          "The sympathetic nervous system activates during stress: increases heart rate and blood pressure, dilates pupils, inhibits digestion, releases glucose, and directs blood to skeletal muscles. The parasympathetic ('rest and digest') does the opposite.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "True or False: Osteoclasts build new bone tissue.",
        a: "False",
        explanation:
          "Osteoclasts break down (resorb) bone tissue, releasing minerals into blood. Osteoblasts build new bone. Bone remodeling involves continuous breakdown by osteoclasts and rebuilding by osteoblasts, maintaining calcium homeostasis and repairing microfractures.",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "What is the functional unit of skeletal muscle contraction?",
        a: "Sarcomere",
        explanation:
          "The sarcomere is the segment between two Z-lines containing thick (myosin) and thin (actin) filaments. During contraction, myosin heads pull actin filaments toward the center (sliding filament theory), shortening the sarcomere and muscle fiber.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Insulin is produced by which cells in the pancreas?",
        a: "Beta cells in the islets of Langerhans",
        explanation:
          "Pancreatic islets (islets of Langerhans) contain beta cells producing insulin (lowers blood glucose) and alpha cells producing glucagon (raises blood glucose). Insulin facilitates glucose entry into cells and promotes glucose storage as glycogen.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which tissue type lines the urinary bladder and allows it to stretch?",
        a: "Transitional epithelium",
        explanation:
          "Transitional epithelium is stratified and uniquely stretchable, found exclusively in urinary tract organs (bladder, ureters, urethra). When relaxed, cells appear rounded and stacked; when stretched, cells flatten, allowing the bladder to expand without rupturing.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Cardiovascular system",
      "Respiratory system",
      "Digestive system",
      "Urinary system (renal)",
      "Nervous system (CNS and PNS)",
      "Musculoskeletal system",
      "Endocrine system",
      "Integumentary system",
      "Tissue types and histology",
      "Homeostatic mechanisms",
    ],
    studyTips: {
      workflow: [
        "Take this quiz before studying a chapter to identify baseline knowledge, then retake after studying to measure improvement",
        "Create a 'missed concepts' list after each attempt and review those specific topics using your textbook or notes before the next attempt",
        "Aim for 85%+ accuracy before moving to new material—A&P concepts build on each other, so gaps create downstream confusion",
      ],
      tips: [
        "Always connect structure to function: when asked about an organ, think about its shape, location, and tissue type, then how those features enable its job",
        "Memorize directional terms (anterior/posterior, superior/inferior, medial/lateral, proximal/distal) cold—they appear in every A&P question and clinical description",
        "Draw and label diagrams from memory: heart blood flow, nephron structure, spinal cord cross-section. Drawing reveals gaps that reading alone misses",
      ],
    },
    faq: [
      {
        q: "How many questions are in the quiz?",
        a: "Sample quizzes contain 8-12 questions covering major body systems. You can generate custom quizzes of any length from your own A&P notes or textbook chapters.",
      },
      {
        q: "Is this quiz suitable for college A&P courses?",
        a: "Yes. Questions match college-level Anatomy & Physiology I and II difficulty, appropriate for nursing prerequisites, pre-med, and allied health programs.",
      },
      {
        q: "Do I need to memorize every bone and muscle?",
        a: "Focus on major bones, landmarks used in clinical descriptions, and muscles with important functions. Your instructor's emphasis guide what to prioritize—some courses stress detail, others emphasize principles.",
      },
      {
        q: "Can I quiz myself on specific systems?",
        a: "Yes. Upload notes for one system (e.g., just cardiovascular) to generate focused quizzes, or mix systems to simulate comprehensive exam conditions.",
      },
      {
        q: "What's the difference between anatomy and physiology?",
        a: "Anatomy studies structure (what organs, tissues, and systems look like and where they're located). Physiology studies function (how those structures work and interact). A&P courses integrate both.",
      },
      {
        q: "How should I study for practical (lab) exams?",
        a: "Practical exams test identification on models and specimens. Use physical study: handle anatomical models, trace structures, practice labeling diagrams by hand, and quiz with lab partners pointing to structures.",
      },
    ],
    relatedPages: [
      "/subjects/anatomy-and-physiology",
      "/subjects/anatomy-and-physiology/flashcards",
      "/subjects/anatomy-and-physiology/practice-questions",
      "/subjects/anatomy",
      "/subjects/biology",
      "/ai-quiz-generator",
    ],
  },
  {
    slug: "flashcards",
    type: "flashcards",
    meta: {
      type: "flashcards",
      primaryKeyword: "anatomy and physiology flashcards",
      monthlyVolume: 1000,
    },
    h1: "Anatomy and Physiology Flashcards — Master A&P Concepts",
    intro:
      "Build anatomy and physiology mastery with comprehensive flashcards covering body systems, anatomical structures, physiological processes, and medical terminology. Essential for college A&P courses, nursing school prerequisites, pre-medical programs, and all healthcare education. Each flashcard connects structure to function, includes clinical relevance, and uses correct anatomical terminology. Study systematically by body system, then integrate knowledge across systems to understand how the body maintains homeostasis. Perfect for memorizing bones, muscles, organs, pathways, and processes that require active recall. Use spaced repetition to move complex A&P information into long-term memory efficiently.",
    sampleItems: [
      {
        q: "Mitral Valve",
        a: "Location: Between left atrium and left ventricle. Also called: Bicuspid valve (has two cusps/flaps). Function: Prevents backflow of blood from left ventricle into left atrium during ventricular contraction (systole). Structure: Anchored by chordae tendineae (tendon-like cords) to papillary muscles on ventricular wall. Clinical: Mitral valve prolapse (MVP) and mitral regurgitation are common valve disorders.",
        explanation:
          "The mitral valve closes when the left ventricle contracts, ensuring blood flows forward into the aorta, not backward. Heart sounds: 'lub' (first sound) includes mitral and tricuspid valve closure.",
        bloomLevel: "Remember",
      },
      {
        q: "Alveoli",
        a: "Location: Lungs (terminal end of respiratory tree). Structure: Tiny air sacs (~300 million per lung) with walls one cell thick (simple squamous epithelium). Function: Gas exchange—oxygen diffuses from alveolar air into capillary blood, CO₂ diffuses from blood into alveoli for exhalation. Feature: Surrounded by dense capillary network; surfactant prevents collapse. Clinical: Emphysema destroys alveolar walls, reducing surface area for gas exchange.",
        explanation:
          "Alveoli maximize surface area (~70 m² total) for gas exchange while minimizing diffusion distance (air-blood barrier is <1 micron thick). Structure perfectly suits function.",
        bloomLevel: "Remember",
      },
      {
        q: "Nephron",
        a: "Location: Kidney (functional unit, ~1 million per kidney). Parts: Glomerulus (capillary ball) in Bowman's capsule, proximal convoluted tubule, loop of Henle (descending and ascending limbs), distal convoluted tubule, collecting duct. Function: Filters blood, reabsorbs water and nutrients, secretes wastes, produces urine. Process: Filtration (glomerulus) → Reabsorption (tubules) → Secretion (tubules). Clinical: Diabetic nephropathy damages glomeruli, causing protein loss in urine.",
        explanation:
          "Each day, kidneys filter ~180 liters of blood, reabsorbing 99% and producing ~1.5 liters of urine. The nephron's complex structure enables selective reabsorption and precise control of blood composition.",
        bloomLevel: "Remember",
      },
      {
        q: "Acetylcholine (ACh)",
        a: "Type: Neurotransmitter. Function: Neuromuscular junction—motor neurons release ACh, which binds to receptors on muscle fibers, triggering contraction. Also: Parasympathetic nervous system neurotransmitter ('rest and digest'). Location: Released from synaptic vesicles at nerve terminals. Breakdown: Enzyme acetylcholinesterase rapidly breaks down ACh, ending signal. Clinical: Myasthenia gravis (antibodies block ACh receptors, causing muscle weakness), botulinum toxin (blocks ACh release, paralyzing muscles).",
        explanation:
          "ACh is essential for voluntary muscle movement. Without ACh or its receptors, nerve signals can't trigger muscle contraction. ACh also slows heart rate and stimulates digestion (parasympathetic effects).",
        bloomLevel: "Remember",
      },
      {
        q: "Osteoblasts vs. Osteoclasts",
        a: "Osteoblasts: Build bone. Secrete collagen and minerals (calcium phosphate → hydroxyapatite crystals), forming new bone matrix. Located on bone surfaces. Osteoclasts: Break down bone. Multinucleated cells that secrete acids and enzymes to dissolve bone, releasing minerals into blood. Function together: Bone remodeling—continuous breakdown (resorption) by osteoclasts and rebuilding by osteoblasts maintains calcium homeostasis and repairs microdamage. Clinical: Osteoporosis occurs when osteoclast activity exceeds osteoblast activity, decreasing bone density.",
        explanation:
          "Remember: osteoblasts Build, osteoclasts Chew (break down). This balance is regulated by hormones: parathyroid hormone (PTH) activates osteoclasts (increases blood calcium), calcitonin activates osteoblasts (decreases blood calcium).",
        bloomLevel: "Understand",
      },
      {
        q: "Insulin",
        a: "Source: Beta cells in pancreatic islets of Langerhans. Stimulus: Elevated blood glucose (after eating). Target organs: Liver, skeletal muscle, adipose tissue. Actions: (1) Facilitates glucose entry into cells (opens glucose transporters), (2) Promotes glycogen synthesis in liver and muscle (glucose storage), (3) Promotes fat synthesis (lipogenesis), (4) Inhibits gluconeogenesis (glucose production). Net effect: Lowers blood glucose. Opposite hormone: Glucagon (raises blood glucose). Clinical: Type 1 diabetes = no insulin production, Type 2 = insulin resistance.",
        explanation:
          "Insulin is the body's 'storage hormone'—it signals 'plenty of fuel available, store it.' Without insulin, glucose can't enter most cells, so blood glucose rises dangerously (hyperglycemia) while cells starve.",
        bloomLevel: "Understand",
      },
      {
        q: "Sarcomere",
        a: "Definition: Functional contractile unit of skeletal muscle (segment between two Z-lines). Components: Thick filaments (myosin with heads that bind ATP and actin), thin filaments (actin with troponin and tropomyosin), Z-lines (anchor points). Mechanism (sliding filament theory): (1) Ca²⁺ binds troponin, exposing myosin-binding sites on actin, (2) Myosin heads bind actin and pivot (power stroke), pulling actin toward center, (3) ATP binds myosin, releasing it from actin, (4) Myosin resets and repeats. Result: Sarcomere shortens, muscle contracts. Energy: Requires ATP for myosin movement and Ca²⁺ pumping.",
        explanation:
          "Muscle contraction is thousands of sarcomeres shortening simultaneously. The muscle fiber doesn't change length of individual filaments—actin and myosin slide past each other, increasing overlap and shortening the sarcomere.",
        bloomLevel: "Understand",
      },
      {
        q: "Homeostasis",
        a: "Definition: Maintenance of stable internal environment despite external changes. Examples: Body temperature ~37°C (98.6°F), blood pH ~7.4, blood glucose 70-100 mg/dL, blood pressure, electrolyte balance. Mechanism: Negative feedback loops (most common)—sensor detects change, control center processes information, effector produces response that reverses the initial change. Example: Blood glucose rises → pancreas releases insulin → cells take up glucose → blood glucose falls. Positive feedback (rare): Amplifies change (childbirth contractions, blood clotting). Importance: Cells require narrow ranges to function; deviations cause disease or death.",
        explanation:
          "Homeostasis is the unifying theme of physiology—every system works to maintain internal stability. Understanding feedback loops explains how body temperature, blood pressure, glucose, and other variables stay regulated.",
        bloomLevel: "Understand",
      },
      {
        q: "Pulmonary vs. Systemic Circulation",
        a: "Pulmonary Circulation: Right ventricle → Pulmonary arteries (carry deoxygenated blood) → Lungs (gas exchange) → Pulmonary veins (carry oxygenated blood) → Left atrium. Purpose: Oxygenate blood, remove CO₂. Systemic Circulation: Left ventricle → Aorta → Arteries → Arterioles → Capillaries (nutrient/gas exchange with tissues) → Venules → Veins → Superior/inferior vena cava → Right atrium. Purpose: Deliver oxygen and nutrients to body tissues, remove wastes. Key: Pulmonary arteries carry deoxygenated blood (unusual for arteries), pulmonary veins carry oxygenated blood (unusual for veins).",
        explanation:
          "These two circuits form a figure-8: blood flows through the heart twice per complete circulation. Pulmonary circuit is low-pressure (easier for thin-walled alveoli), systemic is high-pressure (reaches distant tissues).",
        bloomLevel: "Understand",
      },
      {
        q: "Action Potential (Neuron)",
        a: "Definition: Rapid, temporary reversal of membrane potential allowing signal transmission. Resting state: -70 mV (inside negative, Na⁺ outside, K⁺ inside). Steps: (1) Depolarization—stimulus opens voltage-gated Na⁺ channels, Na⁺ rushes in, membrane reaches +30 mV. (2) Repolarization—Na⁺ channels close, K⁺ channels open, K⁺ exits, membrane returns to negative. (3) Hyperpolarization—briefly overshoots to -90 mV. (4) Na⁺/K⁺ pump restores resting potential. All-or-none: Either full action potential fires or nothing. Speed: Myelinated axons conduct faster (saltatory conduction jumps between nodes of Ranvier).",
        explanation:
          "Action potentials are the nervous system's electrical signals, transmitting information rapidly over long distances. The all-or-none principle means signal strength is conveyed by frequency (more signals/second), not amplitude.",
        bloomLevel: "Understand",
      },
    ],
    topicsCovered: [
      "Cardiovascular anatomy and cardiac cycle",
      "Respiratory structures and gas exchange",
      "Renal system and urine formation",
      "Nervous system structures and neurotransmission",
      "Muscle contraction mechanisms",
      "Endocrine glands and hormones",
      "Digestive organs and enzyme functions",
      "Bone tissue and remodeling",
      "Homeostatic mechanisms and feedback loops",
      "Cell types and tissue classifications",
    ],
    studyTips: {
      workflow: [
        "Study one body system at a time (e.g., all cardiovascular cards), then integrate by studying interactions (how cardiovascular and respiratory systems work together)",
        "Use the 'flip to front' strategy: after studying a set, quiz yourself by looking at the answer side and trying to recall the term or structure name",
        "Create your own flashcards for any topics you consistently miss—writing them yourself strengthens memory through elaborative encoding",
      ],
      tips: [
        "Study structure and function together, never separately: understanding how a structure's shape enables its job makes both easier to remember",
        "Learn directional terms and body planes first (anatomical position, sagittal/frontal/transverse planes, proximal/distal, etc.)—they're the vocabulary foundation",
        "Connect clinical applications to normal anatomy and physiology: knowing what happens when something breaks helps you understand how it normally works",
      ],
    },
    faq: [
      {
        q: "How many flashcards should I study daily?",
        a: "Start with 15-20 new cards daily, reviewing previously learned cards each session. Use spaced repetition: review new cards the next day, then 3 days later, then weekly.",
      },
      {
        q: "Should I study systems separately or together?",
        a: "Study one system thoroughly first (all its structures and functions), then integrate by studying system interactions (e.g., nervous system regulates cardiovascular system).",
      },
      {
        q: "Do I need to memorize every structure?",
        a: "Focus on structures your course emphasizes. Most courses prioritize major organs, clinically relevant bones (fracture sites), and muscles affecting movement. Ask your instructor for a comprehensive list.",
      },
      {
        q: "Can I create custom flashcards from my textbook?",
        a: "Yes. Upload your A&P textbook chapters or lecture notes to generate flashcards matching your course terminology and emphasis.",
      },
      {
        q: "How do I memorize complex pathways (blood flow, nerve pathways)?",
        a: "Draw the pathway from memory repeatedly, check for errors, and redraw until perfect. Physical drawing activates different brain areas than reading, strengthening retention.",
      },
      {
        q: "What's the best way to study for lab practicals?",
        a: "Flashcards help with definitions, but lab practical requires hands-on: study anatomical models, trace structures with your finger, cover labels and identify by touch, and practice with partners.",
      },
    ],
    relatedPages: [
      "/subjects/anatomy-and-physiology",
      "/subjects/anatomy-and-physiology/quiz",
      "/subjects/anatomy-and-physiology/practice-questions",
      "/subjects/anatomy",
      "/subjects/biology",
      "/ai-flashcards",
    ],
  },
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "anatomy and physiology practice test",
      secondaryKeywords: ["anatomy and physiology practice questions", "anatomy and physiology quiz questions", "anatomy and physiology mcq"],
      monthlyVolume: 1000,
    },
    h1: "Anatomy and Physiology Practice Questions — A&P Exam Prep",
    intro:
      "Prepare for anatomy and physiology exams with comprehensive practice questions testing structural knowledge, physiological processes, and clinical applications. These questions mirror college A&P exam format and difficulty, covering all major body systems and requiring both recall and application of concepts. Each question includes detailed explanations connecting structure to function, the fundamental relationship in A&P study. Perfect for nursing prerequisites, pre-medical programs, allied health courses, and anyone mastering human anatomy and physiology. Questions test multiple cognitive levels: identification and recall (Bloom's Remember), explanation and comparison (Understand), and scenario-based application (Apply). Study note: this is an educational tool for anatomy and physiology learning.",
    sampleItems: [
      {
        q: "Blood returning from the body enters which heart chamber first?",
        a: "Right atrium",
        explanation:
          "Deoxygenated blood from the superior and inferior vena cavae enters the right atrium. Flow continues: right atrium → tricuspid valve → right ventricle → pulmonary valve → pulmonary arteries → lungs (oxygenation) → pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve → aorta → body.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which type of epithelium lines the respiratory tract and moves mucus with cilia?",
        a: "Pseudostratified ciliated columnar epithelium",
        explanation:
          "The respiratory tract (trachea, bronchi) is lined with pseudostratified ciliated columnar epithelium. 'Pseudostratified' means nuclei appear at different levels, looking layered but all cells touch the basement membrane. Cilia beat in coordinated waves to move mucus and trapped particles upward toward the pharynx (mucociliary escalator).",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Where does filtration occur in the nephron?",
        a: "Glomerulus (into Bowman's capsule)",
        explanation:
          "Filtration happens at the glomerulus, a high-pressure capillary ball surrounded by Bowman's capsule. Blood pressure forces water, ions, glucose, amino acids, and small waste molecules through the filtration membrane into the capsule, forming filtrate. Blood cells and large proteins stay in blood.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "A patient cannot extend their leg at the knee after injury. Which muscle group is likely damaged?",
        a: "Quadriceps femoris",
        explanation:
          "The quadriceps femoris group (rectus femoris, vastus lateralis, vastus medialis, vastus intermedius) extends the leg at the knee joint. All four muscles converge into the patellar tendon inserting on the tibial tuberosity. Knee extension is essential for walking, standing from sitting, and climbing stairs.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What stimulates the release of ADH (antidiuretic hormone)?",
        a: "Increased blood osmolarity (dehydration)",
        explanation:
          "When blood becomes too concentrated (high osmolarity from dehydration), hypothalamic osmoreceptors detect it and trigger ADH release from the posterior pituitary. ADH acts on kidney collecting ducts, increasing water reabsorption, concentrating urine, and diluting blood back to normal osmolarity. Alcohol inhibits ADH, causing frequent urination.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "Oxygen-poor blood is carried in which vessels?",
        a: "Pulmonary arteries and systemic veins",
        explanation:
          "Arteries don't always carry oxygenated blood—it depends on the circuit. Pulmonary arteries carry deoxygenated blood from the right ventricle to lungs. Systemic veins (vena cavae, jugular, etc.) carry deoxygenated blood from tissues back to the right atrium. Conversely, pulmonary veins carry oxygenated blood from lungs to left atrium.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "What prevents the stomach from digesting itself?",
        a: "Mucus layer and bicarbonate secretion",
        explanation:
          "The stomach lining secretes thick alkaline mucus that forms a protective barrier and neutralizes acid at the epithelial surface. Mucus cells also secrete bicarbonate ions. Surface epithelial cells regenerate rapidly (every 3-6 days). When this protection fails, gastric acid erodes the lining, causing ulcers.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "A fracture of the surgical neck of the humerus may damage which nerve?",
        a: "Axillary nerve",
        explanation:
          "The axillary nerve wraps around the surgical neck of the humerus (below the anatomical neck). Fractures here risk axillary nerve injury, causing deltoid muscle paralysis (inability to abduct arm) and loss of sensation over the lateral shoulder. This is a clinically important anatomical relationship tested in A&P courses.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Cardiovascular system anatomy and blood flow pathways",
      "Respiratory system structures and gas exchange",
      "Urinary system and nephron function",
      "Nervous system organization and neuron function",
      "Musculoskeletal system (major bones, joints, muscle actions)",
      "Digestive system organs and enzyme digestion",
      "Endocrine glands and hormonal regulation",
      "Integumentary system layers and functions",
      "Tissue types and locations",
      "Homeostatic mechanisms and feedback loops",
    ],
    studyTips: {
      workflow: [
        "Complete practice questions under timed conditions (1.5-2 minutes per question) simulating actual exam pressure",
        "After each practice session, create a list of missed concepts and review those specific topics in your textbook before attempting new questions",
        "Mix questions from different systems rather than studying one system at a time—integrated practice better prepares for comprehensive exams",
      ],
      tips: [
        "Read each question carefully: 'Which chamber receives' vs. 'Which chamber pumps' are different questions with different answers",
        "Eliminate obviously wrong answers first: if you know the heart has four chambers, you can rule out answers about the lungs or kidneys",
        "Draw diagrams for pathway questions (blood flow, nerve pathways): visual tracing reveals gaps in your understanding that verbal answers miss",
      ],
    },
    faq: [
      {
        q: "How many practice questions should I do before an exam?",
        a: "Aim for 100-200 questions covering all tested content. More important than quantity: review every explanation, especially for correct answers—understanding 'why' builds mastery.",
      },
      {
        q: "Are these questions harder than my course exams?",
        a: "Questions match typical college A&P exam difficulty. If they feel challenging, that's good—struggling with practice now prevents struggling on the real exam.",
      },
      {
        q: "Should I guess if I don't know the answer?",
        a: "Yes, in practice—guessing forces you to use partial knowledge and identify gaps. On actual exams, check your instructor's policy (some penalize wrong answers, most don't).",
      },
      {
        q: "Can I generate questions from my specific textbook?",
        a: "Yes. Upload your A&P textbook chapters or lecture notes to generate practice questions matching your course content, terminology, and emphasis areas.",
      },
      {
        q: "Do I need to memorize every structure's blood supply and innervation?",
        a: "Depends on your course. Most intro A&P courses emphasize major vessels and nerves with clinical relevance (structures prone to injury or surgical importance). Advanced courses require more detail.",
      },
      {
        q: "How do I prepare for essay or short-answer questions?",
        a: "Practice explaining processes aloud in complete sentences: 'Describe the pathway of blood through the heart,' 'Explain how the nephron forms urine.' Verbal practice reveals where your explanation breaks down.",
      },
    ],
    relatedPages: [
      "/subjects/anatomy-and-physiology",
      "/subjects/anatomy-and-physiology/quiz",
      "/subjects/anatomy-and-physiology/flashcards",
      "/subjects/anatomy",
      "/subjects/biology",
      "/practice-test-generator",
    ],
  },
];
