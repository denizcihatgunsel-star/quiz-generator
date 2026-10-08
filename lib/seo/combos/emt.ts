/**
 * Combo pages for EMT exam hub
 */
import type { ComboData } from "./types";

export const EMT_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "emt practice questions",
      secondaryKeywords: ["emt practice test", "emt questions"],
      monthlyVolume: 4400,
    },
    h1: "EMT Practice Questions — NREMT Cognitive Exam Prep",
    intro:
      "Prepare for the National Registry EMT (NREMT) cognitive exam with comprehensive practice questions covering patient assessment, airway management, trauma care, medical emergencies, obstetrics, pediatrics, and EMS operations. These questions follow NREMT format, testing critical thinking, priority setting, and clinical decision-making skills required of Emergency Medical Technicians. Each question includes detailed explanations of assessment sequences, treatment protocols, and rationales for interventions. Master the systematic approach to emergency care that the NREMT exam demands: scene safety, primary assessment (ABC), secondary assessment, treatment, and transport decisions. Note: This is an educational study aid, not medical advice. Follow your local EMS protocols and medical direction.",
    sampleItems: [
      {
        q: "After ensuring scene safety, what is the EMT's next priority in the primary assessment?",
        a: "Form general impression and assess mental status",
        explanation:
          "Primary assessment sequence: (1) Scene safety, (2) General impression and mental status (AVPU: Alert, Verbal, Pain, Unresponsive), (3) Airway, (4) Breathing, (5) Circulation, (6) Priority/transport decision. Mental status gives immediate information about perfusion and oxygenation.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "A patient with paradoxical chest wall movement most likely has:",
        a: "Flail chest",
        explanation:
          "Flail chest occurs when multiple adjacent ribs fracture in multiple places, creating a free-floating segment that moves opposite (paradoxically) to normal chest expansion—inward during inhalation, outward during exhalation. Requires high-flow oxygen, positive pressure ventilation if needed, and rapid transport.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "What is the appropriate oxygen delivery method for a conscious patient with severe difficulty breathing?",
        a: "Non-rebreather mask at 15 LPM",
        explanation:
          "Conscious patients with severe respiratory distress need high-concentration oxygen immediately. Non-rebreather mask delivers 90-100% oxygen at 15 LPM with reservoir bag. Position patient sitting upright (high Fowler's) to ease breathing effort. Never force a dyspneic patient to lie flat.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "Normal capillary refill time in an adult is:",
        a: "Less than 2 seconds",
        explanation:
          "Test capillary refill by pressing the fingernail bed and releasing—color should return in under 2 seconds. Prolonged capillary refill (>2 sec) suggests poor peripheral perfusion from shock, hypothermia, or vasoconstriction. Less reliable in cold environments or elderly patients.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "An unresponsive patient with snoring respirations indicates:",
        a: "Partial airway obstruction, likely from the tongue",
        explanation:
          "Snoring indicates the tongue is partially occluding the airway. Immediately perform a head-tilt chin-lift (or jaw-thrust if spinal injury suspected). Insert an oropharyngeal airway (OPA) if patient has no gag reflex, or nasopharyngeal airway (NPA) if gag reflex present.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "The appropriate treatment for a patient in anaphylactic shock is:",
        a: "Administer epinephrine via auto-injector per local protocol and medical direction",
        explanation:
          "Anaphylaxis is a life-threatening allergic reaction causing airway swelling and vasodilation. Epinephrine is the first-line treatment: vasoconstricts blood vessels, bronchodilates airways, and stabilizes mast cells. Given IM in lateral thigh. Also provide high-flow oxygen, assist ventilations if needed, and rapid transport.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "Which stroke assessment tool helps EMTs identify stroke quickly?",
        a: "Cincinnati Prehospital Stroke Scale (facial droop, arm drift, speech)",
        explanation:
          "Cincinnati Stroke Scale has three components: facial droop (smile), arm drift (close eyes, hold arms out), abnormal speech (repeat a phrase). Any one abnormality suggests stroke. Time of symptom onset is critical—document and communicate to hospital (thrombolytics effective within 3-4.5 hours).",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "For a patient with suspected spinal injury, the preferred airway maneuver is:",
        a: "Jaw-thrust without head tilt",
        explanation:
          "Jaw-thrust opens the airway without moving the cervical spine, minimizing risk of further injury. Grasp angles of mandible and lift forward. If jaw-thrust fails to open airway, carefully perform head-tilt chin-lift—airway always takes priority over spine immobilization.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "Signs of inadequate breathing include all EXCEPT:",
        a: "Regular, unlabored respirations at 14/min",
        explanation:
          "Normal adult respiratory rate is 12-20/min. Signs of inadequate breathing: rate <12 or >20/min, shallow depth, irregular rhythm, use of accessory muscles, tripod positioning, cyanosis, altered mental status, inability to speak in full sentences. Regular unlabored 14/min respirations are normal.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Patient assessment (scene size-up, primary and secondary assessment, reassessment)",
      "Airway management (basic airway adjuncts, suctioning, oxygen delivery, BVM ventilation)",
      "Trauma care (hemorrhage control, shock management, spinal immobilization, splinting)",
      "Medical emergencies (cardiac arrest, respiratory distress, stroke, seizures, allergic reactions, diabetic emergencies)",
      "Obstetrics and gynecology (childbirth, complications, gynecologic emergencies)",
      "Pediatric emergencies (assessment differences, common pediatric conditions)",
      "EMS operations (scene safety, lifting and moving, ambulance operations, communications, documentation)",
      "Pharmacology (medications EMTs can assist with or administer)",
    ],
    studyTips: {
      workflow: [
        "Memorize the primary assessment sequence cold—it's the framework for most NREMT questions: scene safety, general impression/mental status, airway, breathing, circulation, transport decision",
        "Practice scenario-based questions where you must prioritize multiple patient needs; the NREMT tests decision-making, not just recall",
        "Use the 'ABCs' approach for every question: if a patient needs airway management, that takes priority over bleeding control or splinting",
      ],
      tips: [
        "NREMT questions often include extra information to distract you—focus on life threats first (airway, breathing, circulation, severe bleeding), then address other injuries",
        "Know your scope of practice: EMTs assist patients with their own prescribed medications but cannot diagnose or prescribe",
        "Vital signs ranges matter: memorize normal adult/child/infant ranges for heart rate, respiratory rate, blood pressure—questions will test whether findings are abnormal",
      ],
    },
    faq: [
      {
        q: "Are these official NREMT questions?",
        a: "No. These are practice questions following NREMT format and EMT scope of practice to help you study. For official practice exams, visit nremt.org or use NREMT-approved practice test providers.",
      },
      {
        q: "How many questions are on the NREMT?",
        a: "The NREMT cognitive exam is computer adaptive testing (CAT) with 70-120 questions. Most candidates see about 90 questions. The exam ends when the computer determines with 95% confidence whether you're above or below the pass standard.",
      },
      {
        q: "What is adaptive testing?",
        a: "Adaptive testing adjusts difficulty based on your answers. If you answer correctly, next questions get harder; if wrong, easier. This means harder questions are a good sign—you're performing well. Don't panic if questions seem difficult.",
      },
      {
        q: "How is the exam scored?",
        a: "Scoring is pass/fail, not a percentage. The computer uses an algorithm to determine competency. You need to consistently perform above the minimum competency level. Results are available immediately after the exam.",
      },
      {
        q: "Can I retake the NREMT if I fail?",
        a: "Yes, but with waiting periods and attempt limits. First retake after 15 days, second after 15 days, third after 30 days. After three failures, you must complete 24 hours of remedial training. Check NREMT policies for current requirements.",
      },
      {
        q: "What are the most important topics?",
        a: "Airway management, patient assessment sequence, shock recognition and treatment, trauma management, cardiac emergencies, and medical emergencies. Know your assessment sequences systematically—the NREMT rewards structured approaches.",
      },
    ],
    relatedPages: [
      "/exams/emt",
      "/subjects/anatomy",
      "/subjects/medical-terminology",
      "/ai-quiz-generator",
      "/practice-test-generator",
    ],
  },
];
