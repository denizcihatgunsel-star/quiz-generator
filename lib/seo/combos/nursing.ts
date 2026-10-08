/**
 * Combo pages for Nursing subject hub
 */
import type { ComboData } from "./types";

export const NURSING_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "nursing practice test",
      secondaryKeywords: ["nursing practice questions", "nursing quiz questions"],
      monthlyVolume: 880,
    },
    h1: "Nursing Practice Questions — NCLEX-Style Test Prep",
    intro:
      "Prepare for nursing exams and NCLEX with comprehensive practice questions testing fundamentals, pharmacology, medical-surgical nursing, maternal-newborn, pediatrics, mental health, and clinical judgment. These NCLEX-style questions require priority setting, clinical decision-making, and application of the nursing process. Each question includes detailed rationales explaining why answers are correct or incorrect, plus nursing implications and safety considerations. Essential for nursing students, RN/LPN candidates, and nurses strengthening clinical knowledge. Questions test multiple cognitive levels from knowledge recall to analysis and evaluation, matching the format nursing exams use to assess readiness for safe practice. Note: This is a nursing education study aid, not medical advice.",
    sampleItems: [
      {
        q: "A patient with heart failure is prescribed furosemide (Lasix). Which laboratory value should the nurse monitor most closely?",
        a: "Potassium level",
        explanation:
          "Furosemide is a loop diuretic that causes significant potassium loss through increased renal excretion. Hypokalemia (low potassium) can cause life-threatening cardiac dysrhythmias. Normal potassium: 3.5-5.0 mEq/L. Symptoms of hypokalemia include muscle weakness, leg cramps, irregular heartbeat. The nurse should monitor potassium levels and teach patients to eat potassium-rich foods (bananas, oranges, potatoes) or take prescribed supplements.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What is the priority nursing action for a patient experiencing anaphylaxis?",
        a: "Administer epinephrine",
        explanation:
          "Anaphylaxis is a life-threatening allergic reaction causing airway swelling, bronchospasm, and vasodilation/hypotension. Epinephrine is the first-line treatment: it vasoconstricts blood vessels (raises blood pressure), bronchodilates airways (improves breathing), and stabilizes mast cells (stops further histamine release). Give IM in the lateral thigh (vastus lateralis). Follow ABCs: airway patency, breathing support (oxygen, possible intubation), circulation (IV fluids, monitor vital signs). Epinephrine addresses the immediate threat to airway and circulation.",
        bloomLevel: "Analyze",
        type: "multiple-choice",
      },
      {
        q: "A nurse is teaching a patient about warfarin (Coumadin). Which statement by the patient indicates understanding?",
        a: "'I will keep my intake of green leafy vegetables consistent.'",
        explanation:
          "Warfarin is a vitamin K antagonist. Green leafy vegetables (kale, spinach, broccoli) are high in vitamin K, which decreases warfarin effectiveness if intake suddenly increases. However, patients don't need to avoid greens—consistency is key. Eat similar amounts daily so warfarin dose can be adjusted appropriately. INR (International Normalized Ratio) monitors warfarin effectiveness; therapeutic range typically 2-3. Patients should also avoid NSAIDs and aspirin (increase bleeding risk), report any bleeding, use soft toothbrush and electric razor, and wear medical alert identification.",
        bloomLevel: "Evaluate",
        type: "multiple-choice",
      },
      {
        q: "A patient with diabetes has a blood glucose of 52 mg/dL and is conscious. What should the nurse do first?",
        a: "Give 15 grams of fast-acting carbohydrates (juice, glucose tablets)",
        explanation:
          "Blood glucose <70 mg/dL indicates hypoglycemia. For conscious patients able to swallow, give 15 grams of fast-acting carbohydrates: 4 oz juice, 3-4 glucose tablets, or 1 tablespoon honey. Recheck glucose in 15 minutes; if still low, repeat treatment (Rule of 15). Once glucose normalizes, give a protein snack to stabilize. If patient is unconscious or unable to swallow, give glucagon IM or IV dextrose. Never give insulin during hypoglycemia—that would worsen it.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "Which patient should the nurse assess first?",
        a: "A post-operative patient with sudden onset of chest pain and dyspnea",
        explanation:
          "Priority setting uses ABCs (airway, breathing, circulation) and Maslow's hierarchy (physiological needs before safety/psychosocial). Sudden chest pain and dyspnea post-operatively suggests pulmonary embolism (PE)—a life-threatening complication requiring immediate intervention. PE can rapidly cause respiratory failure and death. Other patients with stable vital signs, chronic conditions, or psychosocial needs are lower priority. Always assess the unstable patient or one with acute life-threatening symptoms first.",
        bloomLevel: "Analyze",
        type: "multiple-choice",
      },
      {
        q: "A nurse is caring for a patient receiving a blood transfusion. Fifteen minutes after starting, the patient develops fever, chills, and back pain. What should the nurse do first?",
        a: "Stop the transfusion immediately",
        explanation:
          "Fever, chills, and back pain during transfusion indicate an acute hemolytic transfusion reaction—antibodies are destroying transfused RBCs, potentially causing kidney failure and shock. First: STOP THE TRANSFUSION immediately to prevent more incompatible blood from entering. Second: Keep IV line open with normal saline (new tubing, not the blood tubing). Third: Notify provider stat. Fourth: Monitor vital signs and urine output (hemolysis causes hemoglobinuria—dark urine). Fifth: Send blood bag and tubing to lab, draw patient blood samples. Never restart a transfusion once stopped for a reaction.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "A patient taking ACE inhibitors (lisinopril) develops a persistent dry cough. What should the nurse teach?",
        a: "This is a common side effect that may require switching to a different medication class",
        explanation:
          "ACE inhibitors block angiotensin-converting enzyme, which also breaks down bradykinin. Accumulated bradykinin causes a persistent dry cough in 10-20% of patients. The cough is harmless but annoying and doesn't improve with cough suppressants. If intolerable, the provider may switch to an ARB (angiotensin receptor blocker like losartan), which doesn't cause cough because it doesn't affect bradykinin. Patients should not stop ACE inhibitors abruptly—discuss with provider first. Monitor for more serious adverse effect: angioedema (facial/airway swelling requiring emergency treatment).",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "A nurse delegates taking vital signs to a UAP (unlicensed assistive personnel). Which patient assignment is appropriate?",
        a: "A stable post-operative patient 3 days after surgery",
        explanation:
          "UAPs can perform ADLs and take vital signs on stable patients. RNs must perform initial assessments, develop care plans, give IV medications, assess unstable patients, and teach. LPNs can give oral/IM medications, reinforce teaching, and perform procedures. Delegate stable tasks to UAPs; unstable patients or those requiring nursing judgment remain with the RN. A stable post-op patient on day 3 is appropriate for UAP vital signs. An unstable patient, newly admitted patient, or patient with changing condition requires RN assessment.",
        bloomLevel: "Analyze",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Nursing fundamentals and safety",
      "Pharmacology and medication administration",
      "Medical-surgical nursing",
      "Priority setting and delegation",
      "Maternal-newborn nursing",
      "Pediatric nursing",
      "Mental health nursing",
      "Clinical judgment and critical thinking",
    ],
    studyTips: {
      workflow: [
        "Use ABCs (airway, breathing, circulation) and Maslow's hierarchy for every priority question—physiological needs before safety, safety before psychosocial",
        "Read rationales for both correct and incorrect answers; understanding why wrong answers are wrong prevents those mistakes on future questions",
        "Simulate exam conditions: timed practice (1.5-2 minutes per question), no notes, answer all questions even if unsure",
      ],
      tips: [
        "NCLEX-style questions often have multiple correct answers—choose the most important or first action using ABC and nursing process priority",
        "Memorize normal lab values and vital sign ranges cold; NCLEX assumes you know these and won't provide reference ranges",
        "Know delegation rules: RNs assess, plan, evaluate, teach, give IV push meds; LPNs implement care, give oral/IM meds; UAPs do ADLs on stable patients",
      ],
    },
    faq: [
      {
        q: "Are these actual NCLEX questions?",
        a: "No. These are NCLEX-style practice questions following the test plan categories and cognitive levels. For official NCLEX practice, use NCSBN resources at ncsbn.org.",
      },
      {
        q: "How many practice questions should I do before NCLEX?",
        a: "Most successful candidates complete 2,000-3,000 practice questions. Focus on understanding rationales, not just hitting a number. Quality trumps quantity.",
      },
      {
        q: "What if I keep missing priority questions?",
        a: "Memorize the priority framework: (1) ABC, (2) Maslow's hierarchy, (3) Acute before chronic, (4) Actual problems before potential problems, (5) Unstable before stable. Apply systematically to every question.",
      },
      {
        q: "Do I need to know drug doses?",
        a: "Know safe dose ranges for high-alert medications (insulin, heparin, opioids) and be able to calculate doses. NCLEX tests whether you recognize unsafe orders and dosage calculation ability.",
      },
      {
        q: "Can I create questions from my nursing textbook?",
        a: "Yes. Upload your fundamentals, med-surg, pharmacology, or specialty nursing textbook chapters to generate custom practice questions matching your curriculum.",
      },
      {
        q: "How is NCLEX scored?",
        a: "NCLEX uses computerized adaptive testing (CAT). Difficulty adjusts based on your answers. Harder questions mean you're performing well. Pass/fail is based on staying above minimum competency, not a percentage score.",
      },
    ],
    relatedPages: [
      "/subjects/nursing",
      "/subjects/pharmacology",
      "/subjects/anatomy",
      "/subjects/medical-terminology",
      "/exams/nclex",
      "/exams/hesi",
      "/practice-test-generator",
    ],
  },
  {
    slug: "quiz",
    type: "quiz",
    meta: {
      type: "quiz",
      primaryKeyword: "nursing quiz",
      monthlyVolume: 720,
    },
    h1: "Nursing Quiz — Test Your Nursing Knowledge",
    intro:
      "Test your nursing knowledge across fundamentals, pharmacology, medical-surgical, and specialty areas with this comprehensive nursing quiz. Questions assess understanding of nursing concepts, medication safety, patient care priorities, and clinical decision-making. Perfect for nursing students preparing for exams, nurses reviewing core concepts, or NCLEX candidates building confidence. Each question includes detailed explanations connecting theory to practice, plus safety considerations and nursing implications. Use this quiz as a diagnostic tool to identify knowledge gaps, then focus study efforts on areas needing strengthening. Consistent practice with immediate feedback accelerates learning and retention of complex nursing content. Note: This is an educational nursing quiz, not medical or nursing advice for patient care decisions.",
    sampleItems: [
      {
        q: "What is the normal range for adult heart rate?",
        a: "60-100 beats per minute",
        explanation:
          "Normal adult resting heart rate is 60-100 bpm. Bradycardia is <60 bpm (may be normal in athletes but concerning with symptoms like dizziness or hypotension). Tachycardia is >100 bpm (can result from fever, pain, anxiety, dehydration, heart conditions). Always assess the patient's baseline and clinical context—a heart rate of 105 may be normal for an anxious patient but concerning for someone at rest.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "True or False: Nurses can delegate patient assessments to LPNs.",
        a: "False",
        explanation:
          "Initial patient assessments, comprehensive assessments, and assessments requiring nursing judgment must be performed by RNs. LPNs can collect data and perform focused assessments within their scope, but the RN is responsible for analyzing findings and developing the care plan. RNs also cannot delegate teaching, evaluation, or IV push medication administration. Know your state's nurse practice act—scope varies slightly by state.",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "Which insulin has the fastest onset of action?",
        a: "Rapid-acting insulin (lispro, aspart)",
        explanation:
          "Rapid-acting insulins (Humalog/lispro, NovoLog/aspart) have onset in 10-15 minutes, peak in 1 hour, and last 3-5 hours. Given immediately before or with meals. Short-acting regular insulin has onset in 30 minutes. Intermediate NPH has onset in 2 hours. Long-acting (glargine, detemir) has onset in 1-2 hours with no peak, lasting 24 hours. Timing matters for meal coverage and preventing hypoglycemia.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "A patient with COPD has an oxygen saturation of 89%. What should the nurse do?",
        a: "Maintain oxygen at prescribed low flow rate (usually 1-2 L/min)",
        explanation:
          "COPD patients with chronic CO₂ retention rely on hypoxic drive (low oxygen stimulates breathing, not high CO₂ as in healthy people). High-flow oxygen can suppress this drive, causing respiratory depression. Target SpO₂ for COPD is typically 88-92%, not 95-100%. If SpO₂ is 89% and patient is asymptomatic, maintain current low-flow oxygen and monitor. If dyspneic or deteriorating, assess further and notify provider. Never withhold oxygen from a hypoxic patient, but use cautiously in COPD.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What is the antidote for opioid overdose?",
        a: "Naloxone (Narcan)",
        explanation:
          "Naloxone is an opioid antagonist that rapidly reverses opioid effects, especially life-threatening respiratory depression. Given IV, IM, or intranasal. Onset within 2-5 minutes. May need repeated doses as naloxone duration is shorter than some opioids. After giving naloxone, monitor closely—patient may experience acute withdrawal (agitation, pain, nausea) and respiratory depression may recur. Have naloxone readily available wherever opioids are administered.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which cranial nerve is assessed when asking a patient to stick out their tongue?",
        a: "Hypoglossal (CN XII)",
        explanation:
          "Cranial nerve XII (hypoglossal) controls tongue movement. Assess by having patient stick out tongue and move it side to side. Deviation to one side indicates CN XII damage on that side. Cranial nerve assessment is part of neurological examination: I olfactory (smell), II optic (vision), III oculomotor (eye movement, pupil constriction), IV trochlear (eye down/in), V trigeminal (facial sensation, chewing), VI abducens (eye out), VII facial (facial movement, taste), VIII vestibulocochlear (hearing, balance), IX glossopharyngeal (swallow, gag), X vagus (swallow, voice), XI accessory (shrug shoulders), XII hypoglossal (tongue movement).",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "A postoperative patient reports incision pain 8/10. What should the nurse do first?",
        a: "Assess the surgical site",
        explanation:
          "Pain is the fifth vital sign, but never give pain medication without assessment. First, assess the surgical site: is it bleeding, dehiscing, or showing infection signs? Assess pain characteristics: location, quality, intensity, timing. Check vital signs. Then administer prescribed analgesic if appropriate. Document pain score before and after intervention. If pain is sudden, severe, or different from expected post-op pain, it may indicate a complication (bleeding, infection, DVT) rather than normal surgical pain. Always assess before administering medication.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What is the correct procedure for administering an IM injection in the ventrogluteal site?",
        a: "Place palm on greater trochanter, point fingers toward head, inject in center of V formed by fingers",
        explanation:
          "Ventrogluteal is the preferred IM injection site for adults: fewer nerves and blood vessels, no major landmarks to avoid. Landmarks: place palm of opposite hand on patient's greater trochanter, point index finger toward anterior superior iliac spine, spread middle finger to form a V, inject in center of V. Use 1.5-inch needle for most adults. Dorsogluteal is no longer recommended due to sciatic nerve injury risk. Other IM sites: deltoid (for smaller volume injections), vastus lateralis (infants, large thigh muscle).",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Vital signs and normal ranges",
      "Medication administration and pharmacology",
      "Patient assessment techniques",
      "Delegation and scope of practice",
      "Nursing fundamentals",
      "Common procedures",
      "Lab value interpretation",
      "Safety and infection control",
    ],
    studyTips: {
      workflow: [
        "Take the quiz without notes first to establish baseline knowledge and identify gaps",
        "Review all explanations thoroughly, even for questions answered correctly—explanations provide context and related information",
        "Retake the quiz after reviewing weak areas, aiming for 90%+ before considering the content mastered",
      ],
      tips: [
        "Connect every fact to patient care: don't just know normal potassium is 3.5-5.0, understand what happens when it's low (arrhythmias, muscle weakness) and what to do about it",
        "Memorize lab values, vital signs ranges, and medication classes—these appear constantly in nursing practice and exams",
        "Think in terms of nursing process (ADPIE): Assess → Diagnose → Plan → Implement → Evaluate. Most clinical decisions follow this framework",
      ],
    },
    faq: [
      {
        q: "What topics does this nursing quiz cover?",
        a: "Questions span nursing fundamentals, pharmacology, medical-surgical nursing, patient safety, delegation, and clinical judgment. Upload specific course materials to generate custom quizzes for your focus areas.",
      },
      {
        q: "Is this suitable for NCLEX preparation?",
        a: "Yes, as supplemental practice. Questions follow NCLEX-style format and content areas. Combine with comprehensive NCLEX review courses and official NCSBN question banks for complete preparation.",
      },
      {
        q: "Can I quiz myself on specific nursing topics?",
        a: "Yes. Upload notes for one topic (e.g., just cardiac nursing or just pharmacology) to generate focused quizzes, or mix topics to simulate comprehensive exams.",
      },
      {
        q: "How often should I practice nursing quizzes?",
        a: "Daily practice with immediate feedback is most effective. Even 15-20 questions daily builds knowledge incrementally and reveals weak areas while there's time to address them.",
      },
      {
        q: "What if I keep missing the same types of questions?",
        a: "Identify the pattern: Is it a content gap (don't know the material), a priority-setting issue (know facts but choose wrong action), or a test-taking problem (misreading questions)? Address the root cause.",
      },
      {
        q: "Do I need to memorize every drug?",
        a: "Learn drug classes and their shared characteristics: all ACE inhibitors end in '-pril,' cause dry cough and hyperkalemia, treat hypertension and heart failure. Knowing the class lets you answer questions about any drug in that class without memorizing each individually.",
      },
    ],
    relatedPages: [
      "/subjects/nursing",
      "/subjects/nursing/practice-questions",
      "/subjects/pharmacology",
      "/subjects/anatomy",
      "/exams/nclex",
      "/ai-quiz-generator",
    ],
  },
];
