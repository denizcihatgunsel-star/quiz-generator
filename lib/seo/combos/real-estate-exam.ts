/**
 * Combo pages for Real Estate Exam hub
 */
import type { ComboData } from "./types";

export const REAL_ESTATE_EXAM_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "real estate exam practice questions",
      secondaryKeywords: ["real estate exam practice test", "real estate exam questions"],
      monthlyVolume: 8100,
    },
    h1: "Real Estate Exam Practice Questions — Licensing Test Prep",
    intro:
      "Prepare for your state real estate licensing exam with comprehensive practice questions covering property ownership, contracts, agency relationships, financing, fair housing, and real estate calculations. These questions follow the format of national real estate exams administered by Pearson VUE and PSI, testing both general real estate principles and practical application. Each question includes detailed explanations of concepts, legal frameworks, and calculation methods. Note: Real estate licensing exams vary by state—these questions cover national concepts applicable across all states, but you must also study your specific state's laws, regulations, and local practices. This is not legal advice; consult licensed professionals for real estate legal matters.",
    sampleItems: [
      {
        q: "In a joint tenancy, when one owner dies, their interest automatically passes to:",
        a: "The surviving joint tenants (right of survivorship)",
        explanation:
          "Joint tenancy includes four unities (time, title, interest, possession) and automatic right of survivorship. When a joint tenant dies, their interest immediately transfers to surviving joint tenants, bypassing probate. This differs from tenancy in common, where deceased's interest passes to heirs through a will.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "The Fair Housing Act prohibits discrimination in housing based on all of these EXCEPT:",
        a: "Marital status (not a federal protected class)",
        explanation:
          "The federal Fair Housing Act lists seven protected classes: race, color, religion, national origin, sex, familial status (children under 18), and disability. Marital status is NOT federally protected, though some states and cities include it in local fair housing laws.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "A buyer purchases a $300,000 home with a 20% down payment. What is the loan amount?",
        a: "$240,000",
        explanation:
          "Down payment = $300,000 × 20% = $300,000 × 0.20 = $60,000. Loan amount = Purchase price - Down payment = $300,000 - $60,000 = $240,000. Alternatively: Loan = 80% of $300,000 = $240,000.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "An exclusive right-to-sell listing agreement means:",
        a: "The listing broker earns commission regardless of who procures the buyer",
        explanation:
          "Exclusive right-to-sell is the most favorable agreement for brokers: they receive commission even if the seller finds the buyer themselves. This differs from exclusive agency (broker gets commission unless seller finds buyer) and open listing (only procuring broker gets paid).",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "A property is assessed at $200,000 with an 80% assessment ratio and a tax rate of 25 mills. What is the annual property tax?",
        a: "$4,000",
        explanation:
          "Step 1: Assessed value = $200,000 × 80% = $160,000. Step 2: Convert mills to decimal: 25 mills = 0.025 (25/1000). Step 3: Tax = Assessed value × Tax rate = $160,000 × 0.025 = $4,000. Remember: 1 mill = $1 per $1,000 of assessed value.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "Which loan type typically has the lowest interest rate?",
        a: "15-year fixed-rate mortgage",
        explanation:
          "Shorter loan terms (15-year) have lower interest rates than longer terms (30-year) because lenders carry the risk for less time. Fixed-rate mortgages provide payment stability; adjustable-rate mortgages (ARMs) start lower but can increase.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "A dual agency occurs when:",
        a: "One agent represents both buyer and seller in the same transaction",
        explanation:
          "Dual agency creates a conflict of interest because the agent owes fiduciary duties to both parties with opposing interests. Many states prohibit dual agency or require written informed consent from both parties. Some states require transaction brokers instead.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "The loan-to-value (LTV) ratio is:",
        a: "(Loan Amount ÷ Property Value) × 100",
        explanation:
          "LTV measures the loan as a percentage of property value. Example: $160,000 loan on $200,000 property = ($160,000 ÷ $200,000) × 100 = 80% LTV. Higher LTV means more risk for the lender; LTV over 80% typically requires PMI (private mortgage insurance).",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Property ownership types (fee simple, life estate, joint tenancy, tenancy in common)",
      "Contracts (offer and acceptance, consideration, capacity, legal purpose, statute of frauds)",
      "Agency relationships (seller's agent, buyer's agent, dual agency, transaction broker)",
      "Fair Housing Act and protected classes",
      "Real estate financing (conventional, FHA, VA, loan types, qualification ratios)",
      "Deeds and title (warranty deed, quitclaim deed, title insurance, recording)",
      "Real estate calculations (commission, LTV, prorations, area)",
      "Closing procedures and settlement statements",
    ],
    studyTips: {
      workflow: [
        "Practice math calculations daily—commission, prorations, LTV, area, and tax calculations appear on every state exam",
        "Create flashcards for legal terms and concepts that are easily confused (joint tenancy vs. tenancy in common, exclusive right-to-sell vs. exclusive agency)",
        "Take full-length timed practice exams simulating actual test conditions to build endurance and pacing skills",
      ],
      tips: [
        "For math problems, write out each step even during practice—this prevents simple errors and builds consistent problem-solving habits",
        "Focus heavily on Fair Housing Act and agency relationships—these are high-stakes topics with legal and ethical implications tested extensively",
        "Learn national concepts thoroughly, then layer your state-specific laws and regulations on top using your state's approved study materials",
      ],
    },
    faq: [
      {
        q: "Do these questions cover my state's exam?",
        a: "These cover national real estate principles tested in all states. You must also study your specific state's laws, regulations, and local practices using state-approved materials. State exams typically have a national portion and a state-specific portion.",
      },
      {
        q: "What is a passing score?",
        a: "Most states require 70-75% on both the national and state portions. Each section must be passed individually—you can't average them. Check your state real estate commission for exact requirements.",
      },
      {
        q: "How many questions are on the real exam?",
        a: "Most state exams have 80-150 questions total, split between national and state portions. Exams are typically 3-4 hours. Format varies by state and testing provider (Pearson VUE, PSI, or state-specific).",
      },
      {
        q: "Can I use a calculator?",
        a: "Most testing centers provide an on-screen calculator or allow a basic handheld calculator. Check your state's testing rules—some prohibit calculators with memory or programming functions.",
      },
      {
        q: "How do I study for state-specific content?",
        a: "Your prelicensing education provider must cover state-specific laws. Study your state's real estate commission statutes, disclosure requirements, agency laws, and forms. Many states publish official study guides.",
      },
      {
        q: "What topics are most heavily tested?",
        a: "Contracts, agency, property ownership, financing, and Fair Housing appear frequently. Math calculations comprise 10-15% of most exams. State-specific topics emphasize disclosure requirements and state regulatory law.",
      },
    ],
    relatedPages: [
      "/exams/real-estate-exam",
      "/subjects/math",
      "/ai-quiz-generator",
      "/practice-test-generator",
    ],
  },
];
