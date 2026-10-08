/**
 * Combo pages for Anatomy subject hub
 */
import type { ComboData } from "./types";

export const ANATOMY_COMBOS: ComboData[] = [
  {
    slug: "flashcards",
    type: "flashcards",
    meta: {
      type: "flashcards",
      primaryKeyword: "anatomy flashcards",
      monthlyVolume: 1900,
    },
    h1: "Anatomy Flashcards — Master Human Body Structures",
    intro:
      "Master human anatomy with comprehensive flashcards covering bones, muscles, organs, blood vessels, nerves, and anatomical terminology. Essential for medical students, nursing students, pre-health programs, and anatomy courses. Each flashcard identifies structures, describes their location using proper anatomical terms, explains key features, and connects structure to function. Study systematically by body region (head and neck, thorax, abdomen, pelvis, upper limb, lower limb) or by system (skeletal, muscular, cardiovascular, nervous). Perfect for memorizing the hundreds of anatomical structures required for anatomy lab practicals and written exams. Use spaced repetition to build the solid anatomical foundation required for all healthcare careers.",
    sampleItems: [
      {
        q: "Humerus",
        a: "Bone: Upper arm bone (arm's only bone). Proximal end: Head articulates with glenoid cavity of scapula (shoulder joint). Greater and lesser tubercles for rotator cuff muscle attachment. Anatomical neck below tubercles, surgical neck below tubercles (common fracture site, may damage axillary nerve). Shaft: Deltoid tuberosity (deltoid attachment), radial groove (radial nerve path). Distal end: Medial and lateral epicondyles (forearm muscle origins), trochlea articulates with ulna, capitulum articulates with radius (elbow joint). Clinical: Surgical neck fractures risk axillary nerve injury.",
        explanation:
          "The humerus is the longest and largest bone of the upper limb. Knowing landmarks is essential for identifying muscle attachments and understanding fracture complications.",
        bloomLevel: "Remember",
      },
      {
        q: "Triceps Brachii",
        a: "Muscle: Posterior upper arm. Three heads: Long head (infraglenoid tubercle of scapula), lateral head (posterior humerus above radial groove), medial head (posterior humerus below radial groove). All three converge into a common tendon inserting on olecranon process of ulna. Action: Extends forearm at elbow (straightens arm); long head also extends and adducts arm at shoulder. Innervation: Radial nerve. Antagonist: Biceps brachii (flexes elbow). Clinical: Triceps reflex tests C7 nerve root.",
        explanation:
          "Triceps is the only muscle that extends the elbow. The three heads provide power for pushing and straightening the arm. Paralysis from radial nerve injury prevents elbow extension.",
        bloomLevel: "Remember",
      },
      {
        q: "Femoral Artery",
        a: "Major artery: Thigh (continuation of external iliac artery after passing under inguinal ligament). Path: Enters thigh in femoral triangle (bordered by inguinal ligament, sartorius, adductor longus). Travels through adductor canal. Becomes popliteal artery at adductor hiatus. Branches: Profunda femoris (deep femoral—supplies thigh muscles), superficial circumflex iliac, superficial epigastric, external pudendal. Pulse: Palpable at femoral triangle, midpoint of inguinal ligament. Clinical: Femoral artery puncture site for catheterization; femoral pulse checked in CPR.",
        explanation:
          "The femoral artery is the main blood supply to the lower limb. Its accessible location in the femoral triangle makes it important for pulse checks and vascular access.",
        bloomLevel: "Remember",
      },
      {
        q: "Brachial Plexus",
        a: "Nerve network: Supplies upper limb. Formed by: Ventral rami of C5-T1 spinal nerves. Organization (mnemonic: Real Texans Drink Cold Beer): Roots (C5-T1) → Trunks (superior, middle, inferior) → Divisions (anterior, posterior) → Cords (lateral, posterior, medial, named for position relative to axillary artery) → terminal Branches. Major branches: Musculocutaneous, axillary, radial, median, ulnar. Location: Travels between anterior and middle scalene muscles, through axilla. Clinical: Erb's palsy (C5-C6 injury, 'waiter's tip' position), Klumpke's palsy (C8-T1 injury, claw hand).",
        explanation:
          "The brachial plexus is complex but systematic. Each terminal nerve has specific motor and sensory functions in the arm and hand. Injuries cause characteristic deficits based on which nerve is damaged.",
        bloomLevel: "Remember",
      },
      {
        q: "Heart Valves",
        a: "Four valves: (1) Tricuspid—right atrium to right ventricle, three cusps, prevents backflow into right atrium. (2) Pulmonary (semilunar)—right ventricle to pulmonary trunk, prevents backflow into right ventricle. (3) Mitral/Bicuspid—left atrium to left ventricle, two cusps, prevents backflow into left atrium. (4) Aortic (semilunar)—left ventricle to aorta, prevents backflow into left ventricle. AV valves (tricuspid, mitral): Anchored by chordae tendineae to papillary muscles. Semilunar valves: Three cusps shaped like half-moons. Heart sounds: S1 ('lub') = AV valves close, S2 ('dub') = semilunar valves close.",
        explanation:
          "Valves ensure unidirectional blood flow. AV valves close during ventricular contraction (systole), semilunar valves close during ventricular relaxation (diastole). Valve defects cause murmurs heard with stethoscope.",
        bloomLevel: "Remember",
      },
      {
        q: "Carpal Tunnel",
        a: "Structure: Passageway in wrist formed by carpal bones (floor and sides) and flexor retinaculum (transverse carpal ligament, roof). Contents: Nine flexor tendons (flexor digitorum superficialis 4 tendons, flexor digitorum profundus 4 tendons, flexor pollicis longus 1 tendon) and median nerve. Function: Protects structures traveling from forearm to hand. Clinical: Carpal tunnel syndrome—compression of median nerve causes numbness/tingling in thumb, index, middle, and lateral half of ring finger, plus weakness of thumb opposition (thenar atrophy if severe). Common in repetitive hand use.",
        explanation:
          "The carpal tunnel is a narrow space where multiple structures pass. Anything that reduces space (inflammation, swelling, fracture) can compress the median nerve, causing carpal tunnel syndrome.",
        bloomLevel: "Remember",
      },
      {
        q: "Diaphragm",
        a: "Muscle: Primary muscle of respiration. Structure: Dome-shaped sheet separating thoracic and abdominal cavities. Attachments: Peripheral muscular part attaches to xiphoid process, costal cartilages of ribs 7-12, and lumbar vertebrae. Central tendon (aponeurosis) at top. Openings: Three major openings for structures to pass through—(1) Caval opening (T8, inferior vena cava), (2) Esophageal hiatus (T10, esophagus, vagus nerves), (3) Aortic hiatus (T12, aorta, thoracic duct, azygos vein). Innervation: Phrenic nerve (C3, C4, C5 keeps the diaphragm alive). Action: Contracts and flattens during inhalation, increasing thoracic volume and decreasing pressure, drawing air into lungs. Relaxes during exhalation.",
        explanation:
          "The diaphragm does 70% of breathing work. Phrenic nerve injury (from neck trauma or surgery) paralyzes hemidiaphragm, impairing breathing. The three openings' T-levels (8, 10, 12) match the structures' 'letters' (vena cava 8 letters, esophagus 10, aortic hiatus 12).",
        bloomLevel: "Remember",
      },
      {
        q: "Rotator Cuff Muscles",
        a: "Four muscles: Stabilize shoulder joint (glenohumeral joint). Mnemonic: SITS. (1) Supraspinatus—abducts arm (first 15°), most commonly torn. (2) Infraspinatus—laterally rotates arm. (3) Teres minor—laterally rotates arm. (4) Subscapularis—medially rotates arm (only anterior rotator cuff muscle, all others posterior). All four: Arise from scapula, insert on humeral head, hold humeral head in shallow glenoid cavity. Innervation: Suprascapular nerve (supraspinatus, infraspinatus), axillary nerve (teres minor), subscapular nerve (subscapularis). Clinical: Rotator cuff tears common in overhead athletes and elderly; supraspinatus most commonly injured.",
        explanation:
          "The shoulder joint sacrifices stability for mobility (ball-and-socket with shallow socket). Rotator cuff muscles dynamically stabilize it. Tears cause pain and weakness with arm elevation.",
        bloomLevel: "Remember",
      },
      {
        q: "Femur",
        a: "Bone: Thigh bone (longest, strongest bone in body). Proximal end: Head (articulates with acetabulum of hip, hip joint), neck (common fracture site in elderly, avascular necrosis risk), greater trochanter (lateral, hip abductor attachment), lesser trochanter (medial, iliopsoas attachment), intertrochanteric line (anterior) and crest (posterior). Shaft: Linea aspera (posterior ridge, muscle attachments). Distal end: Medial and lateral condyles (articulate with tibia at knee joint), medial and lateral epicondyles (ligament and muscle attachments), patellar surface (anterior, articulates with patella), intercondylar fossa (posterior, cruciate ligament attachments). Clinical: Femoral neck fractures risk disrupting blood supply to femoral head.",
        explanation:
          "The femur bears the body's entire weight during walking. Its structure reflects strength requirements: thick shaft, large proximal head, and broad distal condyles for weight distribution at the knee.",
        bloomLevel: "Remember",
      },
      {
        q: "Sciatic Nerve",
        a: "Nerve: Largest nerve in body. Origin: Lumbosacral plexus (L4-S3 nerve roots). Path: Exits pelvis through greater sciatic foramen (below piriformis muscle typically), descends posterior thigh deep to hamstrings. Divides (usually at knee): Tibial nerve (medial) and common fibular nerve (lateral). Distribution: Supplies posterior thigh muscles (hamstrings), all leg and foot muscles (via branches), and most leg/foot skin. Clinical: Sciatica—pain along sciatic nerve distribution from nerve compression (herniated disc, piriformis syndrome). Injury causes foot drop (common fibular) or inability to plantar flex foot (tibial).",
        explanation:
          "The sciatic nerve is critical for walking—it supplies all leg and foot muscles except those on the anterior/lateral thigh. Complete transection would paralyze everything below the knee.",
        bloomLevel: "Remember",
      },
      {
        q: "Liver",
        a: "Organ: Largest internal organ, largest gland. Location: Right upper quadrant of abdomen, mostly under right rib cage. Lobes: Right (larger), left, plus two small posterior lobes (caudate, quadrate). Surfaces: Diaphragmatic (superior, convex), visceral (inferior, concave, porta hepatis—vessels and ducts enter/exit). Attachments: Falciform ligament (attaches to diaphragm and anterior abdominal wall, divides right and left lobes), lesser omentum. Blood supply: Dual—hepatic artery (oxygenated blood) and hepatic portal vein (nutrient-rich blood from GI tract). Bile: Produced by hepatocytes, travels via right and left hepatic ducts → common hepatic duct → common bile duct → duodenum (or stored in gallbladder).",
        explanation:
          "The liver has over 500 functions: detoxification, protein synthesis (albumin, clotting factors), bile production, glucose/glycogen metabolism, cholesterol synthesis, drug metabolism. Its dual blood supply provides both oxygen and nutrients from digestion.",
        bloomLevel: "Remember",
      },
      {
        q: "Cranial Nerves",
        a: "12 pairs: Arise from brainstem (except I and II from forebrain). Mnemonic: On Old Olympus' Towering Tops A Finn And German Viewed Some Hops. (I) Olfactory—smell. (II) Optic—vision. (III) Oculomotor—eye movement (4 of 6 muscles), pupil constriction, lens accommodation. (IV) Trochlear—superior oblique (eye looks down and in). (V) Trigeminal—facial sensation, chewing muscles. (VI) Abducens—lateral rectus (eye abducts). (VII) Facial—facial expression, taste anterior 2/3 tongue. (VIII) Vestibulocochlear—hearing, balance. (IX) Glossopharyngeal—taste posterior 1/3 tongue, swallowing, carotid body/sinus. (X) Vagus—parasympathetic to thoracic/abdominal organs, swallowing, voice. (XI) Accessory—sternocleidomastoid, trapezius. (XII) Hypoglossal—tongue movement.",
        explanation:
          "Cranial nerves provide all head and neck sensation and motor control, plus parasympathetic regulation of thoracic and abdominal viscera. Clinical exams test each nerve systematically to localize brain/brainstem lesions.",
        bloomLevel: "Remember",
      },
    ],
    topicsCovered: [
      "Skeletal system (all major bones, markings, articulations)",
      "Muscular system (origin, insertion, action, innervation of major muscles)",
      "Cardiovascular system (heart chambers, valves, major vessels)",
      "Nervous system (brain, spinal cord, peripheral nerves, plexuses)",
      "Respiratory system (airways, lungs, pleura)",
      "Digestive system (organs, ducts, blood supply)",
      "Urinary system (kidneys, ureters, bladder, urethra)",
      "Reproductive systems",
      "Sensory organs (eye, ear)",
      "Anatomical terminology and directional terms",
    ],
    studyTips: {
      workflow: [
        "Study one region at a time (e.g., all upper limb structures—bones, muscles, nerves, vessels—before moving to lower limb), then integrate across regions",
        "Use physical anatomical models whenever possible—flip through flashcards, then find and touch the actual structure on a skeleton or model",
        "Create your own labeled diagrams from memory, then check accuracy against your flashcards and textbook—drawing reveals gaps reading doesn't catch",
      ],
      tips: [
        "Learn structures in context of their relationships: don't just memorize 'femoral artery'—know what's medial and lateral to it (femoral vein medially, femoral nerve laterally) in the femoral triangle",
        "Master anatomical terminology and directional terms first (anterior/posterior, superior/inferior, medial/lateral, proximal/distal, superficial/deep, ipsilateral/contralateral)—they're used in every description",
        "For muscle actions, physically perform the movement while saying the muscle name and action aloud—kinesthetic memory strengthens retention",
      ],
    },
    faq: [
      {
        q: "How many structures do I need to memorize?",
        a: "Depends on your course depth. Introductory courses cover ~200-300 major structures. Advanced courses (medical/dental school gross anatomy) require 1,000+ structures. Focus on what your instructor emphasizes.",
      },
      {
        q: "Should I memorize Latin/Greek names?",
        a: "Most anatomical terms are Latin or Greek. You don't need to know the language, but understanding common roots helps: 'brachio' = arm, 'cephalic' = head, 'gastro' = stomach.",
      },
      {
        q: "How do I prepare for lab practical exams?",
        a: "Flashcards help with definitions, but practicals require hands-on identification. Study with physical models, handle bones, trace muscle origins and insertions with your finger, and quiz with lab partners pointing to structures.",
      },
      {
        q: "Can I create custom flashcards from my syllabus?",
        a: "Yes. Upload your anatomy syllabus, lab manual, or structure list to generate flashcards matching your specific course requirements.",
      },
      {
        q: "What's the difference between origin and insertion?",
        a: "Origin is the fixed/proximal attachment (doesn't move much), insertion is the movable/distal attachment (moves toward origin during contraction). Exceptions exist, but this general rule helps.",
      },
      {
        q: "How long does it take to learn anatomy?",
        a: "Intro anatomy courses are typically one semester (16 weeks). Medical school gross anatomy is 8-12 weeks of intensive full-day dissection. Daily consistent study with active methods (drawing, labeling, hands-on) beats cramming.",
      },
    ],
    relatedPages: [
      "/subjects/anatomy",
      "/subjects/anatomy-and-physiology",
      "/subjects/biology",
      "/subjects/medical-terminology",
      "/ai-flashcards",
    ],
  },
];
