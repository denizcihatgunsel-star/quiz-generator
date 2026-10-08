/**
 * Combo pages for Pharmacology subject hub
 */
import type { ComboData} from "./types";

export const PHARMACOLOGY_COMBOS: ComboData[] = [
  {
    slug: "flashcards",
    type: "flashcards",
    meta: {
      type: "flashcards",
      primaryKeyword: "pharmacology flashcards",
      monthlyVolume: 2400,
    },
    h1: "Pharmacology Flashcards — Master Drug Classes and Actions",
    intro:
      "Build pharmacology mastery with comprehensive flashcards covering drug classifications, mechanisms of action, therapeutic effects, adverse reactions, and nursing considerations. Essential for nursing students preparing for NCLEX, pharmacy students, medical students, and healthcare professionals strengthening medication knowledge. Each card groups drugs by class, highlighting shared characteristics, suffix patterns (-olol, -pril, -statin), and critical safety information. Pharmacology requires understanding not just individual drugs, but recognizing patterns across drug families. Study systematically with spaced repetition to move complex medication information into long-term memory. Note: This is a study aid for healthcare education, not medical advice.",
    sampleItems: [
      {
        q: "ACE Inhibitors (ending in -pril)",
        a: "Drug class: Antihypertensives. Mechanism: Block angiotensin-converting enzyme, preventing conversion of angiotensin I to angiotensin II, reducing vasoconstriction and aldosterone secretion. Examples: Lisinopril, Enalapril, Ramipril, Captopril. Indication: Hypertension, heart failure, post-MI, diabetic nephropathy. Common adverse effect: Persistent dry cough (due to bradykinin accumulation). Serious adverse effect: Angioedema (facial/airway swelling), hyperkalemia. Contraindication: Pregnancy (causes fetal harm). Nursing: Monitor potassium levels, blood pressure, kidney function (BUN/creatinine). Teach: Take at same time daily, don't stop abruptly, report swelling or difficulty breathing immediately.",
        explanation:
          "ACE inhibitors are first-line treatment for hypertension and heart failure. The dry cough side effect is common but harmless; if intolerable, ARBs (-sartan drugs) are alternatives without the cough.",
        bloomLevel: "Understand",
      },
      {
        q: "Beta Blockers (ending in -olol)",
        a: "Drug class: Antihypertensives, antiarrhythmics, antianginals. Mechanism: Block beta-adrenergic receptors, decreasing heart rate, contractility, and blood pressure. Examples: Metoprolol, Atenolol, Propranolol, Carvedilol. Indication: Hypertension, angina, heart failure, arrhythmias, post-MI, migraine prophylaxis. Adverse effects: Bradycardia, fatigue, bronchospasm (worsens asthma/COPD), masks hypoglycemia symptoms in diabetics. Contraindications: Severe bradycardia, heart block, asthma, decompensated heart failure. Nursing: Monitor heart rate and blood pressure before giving (hold if HR <60 or systolic BP <100), check apical pulse, assess for wheezing. Teach: Never stop abruptly (causes rebound hypertension and angina), take with food, change positions slowly (orthostatic hypotension).",
        explanation:
          "Beta blockers are cardioprotective post-MI and improve heart failure outcomes despite the counterintuitive concern about 'slowing' the heart. They mask tachycardia from hypoglycemia, so diabetic patients must monitor glucose more carefully.",
        bloomLevel: "Understand",
      },
      {
        q: "Loop Diuretics (Furosemide, Bumetanide)",
        a: "Drug class: Diuretics. Mechanism: Block sodium and chloride reabsorption in loop of Henle, causing potent diuresis. Indication: Heart failure, pulmonary edema, hypertension, edema. Adverse effects: Hypokalemia (dangerous cardiac arrhythmias), hyponatremia, dehydration, ototoxicity (hearing loss, especially with rapid IV push). Nursing: Monitor potassium level closely, daily weights, intake/output, blood pressure, signs of dehydration. Give in morning to avoid nighttime urination. Teach: Eat potassium-rich foods (bananas, oranges, potatoes) or take potassium supplement as ordered, report muscle weakness or irregular heartbeat (signs of hypokalemia), expect increased urination.",
        explanation:
          "Loop diuretics are the most potent diuretics. Furosemide is nicknamed 'Lasix' from 'lasts six hours.' The main danger is severe hypokalemia causing lethal arrhythmias—potassium must be monitored and replaced.",
        bloomLevel: "Understand",
      },
      {
        q: "Opioid Analgesics (Morphine, Fentanyl, Oxycodone)",
        a: "Drug class: Narcotic analgesics. Mechanism: Bind to opioid receptors in CNS, altering perception and response to pain. Indication: Moderate to severe pain. Adverse effects: Respiratory depression (most dangerous), constipation, nausea, sedation, hypotension, urinary retention. Risk: Physical dependence, tolerance, addiction potential. Nursing: Monitor respiratory rate, depth, and oxygen saturation continuously (especially first 24 hours). Hold dose and notify provider if RR <12 or shallow breathing. Have naloxone (Narcan) readily available as antidote. Assess pain level and effectiveness. Monitor bowel function—stool softener/laxative usually needed. Teach: Do not drive or operate machinery, no alcohol, take exactly as prescribed, secure medication away from others.",
        explanation:
          "Respiratory depression is the life-threatening adverse effect of opioids. Always check respiratory rate before giving opioids. Constipation is nearly universal with opioids and requires proactive prevention—don't wait for it to occur.",
        bloomLevel: "Understand",
      },
      {
        q: "Warfarin (Coumadin)",
        a: "Drug class: Anticoagulant (blood thinner). Mechanism: Inhibits vitamin K-dependent clotting factors (II, VII, IX, X). Indication: DVT, pulmonary embolism, atrial fibrillation (prevents stroke), mechanical heart valves. Therapeutic range: INR 2-3 (some conditions require 2.5-3.5). Adverse effect: Bleeding (most serious), bruising. Antidote: Vitamin K. Drug interactions: MANY—antibiotics, NSAIDs, herbal supplements affect INR. Food interaction: Green leafy vegetables high in vitamin K (kale, spinach, broccoli) decrease warfarin effectiveness. Nursing: Monitor INR regularly, assess for bleeding (gums, urine, stool, bruising), hold dose and notify provider if INR >4. Teach: Consistent vitamin K intake (don't eliminate greens, just keep intake stable), use soft toothbrush, electric razor, avoid NSAIDs and aspirin, report any bleeding immediately, carry medical alert card.",
        explanation:
          "Warfarin has a narrow therapeutic index and countless drug interactions, requiring frequent INR monitoring. Consistency matters more than elimination—patients can eat greens, but the amount should be steady day-to-day.",
        bloomLevel: "Understand",
      },
      {
        q: "Insulin (Rapid, Short, Intermediate, Long-Acting)",
        a: "Drug class: Antidiabetic hormone. Mechanism: Facilitates glucose entry into cells, lowering blood glucose. Types: Rapid-acting (lispro, aspart - onset 15 min, peak 1 hr), Short-acting regular (onset 30 min, peak 2-3 hr), Intermediate NPH (onset 2 hr, peak 4-12 hr), Long-acting (glargine, detemir - no peak, lasts 24 hr). Route: Subcutaneous (abdomen absorbs fastest). Adverse effect: Hypoglycemia (blood glucose <70 mg/dL) causing shakiness, confusion, seizures, coma if severe. Nursing: Verify type and dose with two nurses, rotate injection sites, give rapid-acting immediately before meals, monitor blood glucose before and after. Teach: Recognize hypoglycemia symptoms (treat with 15g fast-acting carbs—juice, glucose tablets), carry sugar source always, monitor glucose regularly, don't skip meals after taking insulin.",
        explanation:
          "Insulin errors are high-alert medication mistakes. Always verify the insulin type—giving long-acting when rapid-acting is due, or vice versa, causes dangerous blood sugar swings. The abdomen is preferred for consistent absorption.",
        bloomLevel: "Understand",
      },
      {
        q: "SSRIs - Selective Serotonin Reuptake Inhibitors (ending in -ine usually)",
        a: "Drug class: Antidepressants. Mechanism: Block reuptake of serotonin in brain, increasing serotonin availability. Examples: Fluoxetine (Prozac), Sertraline (Zoloft), Escitalopram (Lexapro), Citalopram. Indication: Major depression, anxiety disorders, OCD, PTSD. Onset: 2-4 weeks for therapeutic effect (important patient teaching). Adverse effects: Nausea, sexual dysfunction, insomnia or drowsiness, weight gain, increased suicide risk in young adults during first weeks. Serious risk: Serotonin syndrome (when combined with other serotonergic drugs—fever, agitation, confusion, muscle rigidity). Nursing: Assess suicide risk regularly especially first 2 months, educate about delayed onset, monitor for serotonin syndrome. Teach: Take consistently same time daily, don't stop abruptly (causes discontinuation syndrome), full effect takes weeks, no alcohol, report worsening depression or suicidal thoughts immediately.",
        explanation:
          "The 2-4 week delay before SSRIs work is critical teaching—many patients stop taking them after a week thinking they don't work. Suicide risk may transiently increase early in treatment as energy improves before mood lifts.",
        bloomLevel: "Understand",
      },
      {
        q: "Benzodiazepines (ending in -pam or -lam)",
        a: "Drug class: Anxiolytics, sedatives. Mechanism: Enhance GABA (inhibitory neurotransmitter) in CNS. Examples: Lorazepam (Ativan), Diazepam (Valium), Alprazolam (Xanax). Indication: Anxiety, seizures, muscle spasms, alcohol withdrawal, pre-procedure sedation. Adverse effects: Sedation, dizziness, confusion (especially elderly), respiratory depression (worse with opioids), physical and psychological dependence. Antidote: Flumazenil (rarely used—can cause seizures). Nursing: Monitor respiratory status, level of consciousness, fall risk. Avoid in elderly due to increased fall and confusion risk. Assess for dependence if long-term use. Teach: No driving or operating machinery, no alcohol (potentiates CNS depression dangerously), do not stop abruptly after prolonged use (seizure risk), secure medication (abuse potential).",
        explanation:
          "Benzodiazepines and opioids together cause severe respiratory depression and many overdose deaths. Never combine without close monitoring. Abrupt discontinuation after long-term use can cause life-threatening withdrawal seizures—always taper.",
        bloomLevel: "Understand",
      },
      {
        q: "Statins (ending in -statin)",
        a: "Drug class: Antihyperlipidemics. Mechanism: Inhibit HMG-CoA reductase enzyme, reducing cholesterol synthesis in liver, lowering LDL (bad cholesterol). Examples: Atorvastatin (Lipitor), Simvastatin, Rosuvastatin. Indication: High cholesterol, cardiovascular disease prevention, post-MI. Adverse effects: Muscle pain (myalgia), rare but serious rhabdomyolysis (muscle breakdown releasing myoglobin that damages kidneys), elevated liver enzymes. Nursing: Monitor liver function tests, assess for muscle pain or weakness, teach to report dark urine (sign of rhabdomyolysis). Take in evening (cholesterol synthesis peaks at night). Teach: Take as prescribed even if feeling well (high cholesterol is asymptomatic), maintain heart-healthy diet and exercise, report unexplained muscle pain immediately, avoid grapefruit juice with some statins (increases drug levels).",
        explanation:
          "Statins are highly effective at preventing heart attacks and strokes. Muscle pain is common and usually benign, but rhabdomyolysis is a medical emergency. Taking statins at bedtime maximizes effectiveness.",
        bloomLevel: "Understand",
      },
      {
        q: "Corticosteroids (Prednisone, Methylprednisolone, Dexamethasone)",
        a: "Drug class: Anti-inflammatory, immunosuppressant. Mechanism: Suppress immune response and inflammation. Indication: Asthma exacerbation, COPD, allergic reactions, autoimmune disorders, organ transplant rejection prevention. Adverse effects (especially long-term): Hyperglycemia, hypertension, osteoporosis, increased infection risk, GI ulcers, mood changes, weight gain, Cushing syndrome appearance (moon face, buffalo hump), adrenal suppression. Nursing: Give with food to reduce GI irritation, monitor blood glucose (even in non-diabetics), assess for infection signs, never stop abruptly after prolonged use (causes adrenal crisis). Teach: Take with food, don't stop suddenly, report signs of infection immediately, monitor blood sugar, limit sodium intake, increase calcium/vitamin D for bone health.",
        explanation:
          "Prolonged corticosteroid use suppresses the adrenal glands' natural cortisol production. Abrupt discontinuation can cause life-threatening adrenal insufficiency—always taper gradually. Short courses (5-7 days) usually don't require taper.",
        bloomLevel: "Understand",
      },
      {
        q: "Digoxin (Lanoxin)",
        a: "Drug class: Cardiac glycoside, antiarrhythmic, inotrope. Mechanism: Increases force of cardiac contraction (positive inotrope), slows heart rate. Indication: Heart failure, atrial fibrillation. Therapeutic level: 0.5-2 ng/mL. Toxicity risk: Narrow therapeutic index. Signs of toxicity: Nausea, vomiting, visual disturbances (yellow-green halos), bradycardia, arrhythmias. Hypokalemia increases digoxin toxicity risk. Nursing: Check apical pulse for 1 full minute before giving—hold if <60 bpm and notify provider. Monitor potassium level (give potassium supplement if low), digoxin level, kidney function. Teach: Check pulse before taking, report vision changes or pulsing sensation, take at same time daily, don't take extra doses.",
        explanation:
          "Digoxin has been used for over 200 years but requires careful monitoring due to its narrow therapeutic window. Low potassium makes the heart more sensitive to digoxin's effects, increasing toxicity risk even at therapeutic levels.",
        bloomLevel: "Understand",
      },
    ],
    topicsCovered: [
      "Cardiovascular medications (ACE inhibitors, beta blockers, digoxin, anticoagulants)",
      "Diuretics and fluid management",
      "Analgesics and pain management (opioids, NSAIDs)",
      "Endocrine medications (insulin, corticosteroids, thyroid hormones)",
      "Psychotropic medications (SSRIs, benzodiazepines, antipsychotics)",
      "Antibiotics and antimicrobials",
      "Respiratory medications (bronchodilators, corticosteroids)",
      "GI medications (proton pump inhibitors, antiemetics)",
      "Antihyperlipidemics (statins)",
      "Medication administration and safety",
      "Drug interactions and adverse effects",
      "Nursing considerations for high-alert medications",
    ],
    studyTips: {
      workflow: [
        "Start with major drug classifications (cardiovascular, CNS, endocrine, anti-infectives) to build a mental framework",
        "Study one drug class thoroughly before moving to the next, focusing on prototypes and shared characteristics",
        "Test yourself weekly on high-alert medications and their antidotes to ensure rapid recall under pressure",
      ],
      tips: [
        "Learn suffix patterns (-olol, -pril, -statin) to quickly identify drug families and predict their mechanisms",
        "Master the mechanism of action first—it logically predicts adverse effects, contraindications, and interactions",
        "Create flashcard sets for high-alert medications (insulin, opioids, anticoagulants, digoxin) and practice them daily",
        "Practice calculating safe dose ranges, IV drip rates, and identifying medication errors to prepare for clinical scenarios",
        "Study antidotes systematically: naloxone reverses opioids, flumazenil reverses benzodiazepines, vitamin K reverses warfarin",
        "Use spaced repetition—review pharmacology content daily in short sessions rather than marathon study sessions before exams",
      ],
    },
    relatedPages: [
      "/subjects/pharmacology",
      "/subjects/medical-terminology/flashcards",
      "/subjects/nursing/practice-questions",
      "/subjects/anatomy-and-physiology/quiz",
      "/exams/nclex",
      "/ai-flashcards",
    ],
    faq: [
      {
        q: "How many pharmacology flashcards should I study per day?",
        a: "Start with 10-15 new cards daily and review 30-50 previously learned cards. Pharmacology requires spaced repetition—consistent daily practice is more effective than cramming. Focus on mastering drug classes before moving to individual medications.",
      },
      {
        q: "What's the best way to memorize drug names and classifications?",
        a: "Learn suffix patterns first (-pril for ACE inhibitors, -olol for beta blockers, -statin for cholesterol drugs). Group drugs by mechanism of action and therapeutic use. Create mnemonic devices for high-alert medications and their antidotes (e.g., 'Naloxone reverses opioids').",
      },
      {
        q: "Do I need to memorize drug doses for NCLEX?",
        a: "No. NCLEX tests safe practice, not memorization of specific doses. You need to recognize unsafe orders, understand therapeutic ranges (like INR 2-3 for warfarin), know when to hold medications (e.g., hold beta blocker if heart rate <60), and identify adverse effects requiring intervention.",
      },
      {
        q: "How do I study drug interactions and contraindications?",
        a: "Focus on the most dangerous interactions: opioids + benzodiazepines (respiratory depression), warfarin + NSAIDs (bleeding risk), ACE inhibitors in pregnancy (fetal harm), beta blockers in asthma (bronchospasm). Learn the 'why' behind each contraindication—the mechanism makes it memorable.",
      },
      {
        q: "What are high-alert medications I must know?",
        a: "High-alert medications include insulin, heparin, warfarin, opioids, chemotherapy agents, and concentrated electrolytes. Know their adverse effects, antidotes (naloxone for opioids, vitamin K for warfarin, glucagon or dextrose for hypoglycemia), and safety protocols (double-check doses, monitor labs).",
      },
      {
        q: "Can I use these flashcards to study for pharmacy or medical school exams?",
        a: "Yes. These cards cover core pharmacology principles applicable to nursing, pharmacy, and medical education. However, pharmacy and medical curricula typically require more depth on pharmacokinetics, pharmacodynamics, and drug development. Use these as foundational review, then supplement with program-specific resources.",
      },
    ],
  },
];
