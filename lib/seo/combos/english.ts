/**
 * Combo pages for English subject hub
 */
import type { ComboData } from "./types";

export const ENGLISH_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "english practice test",
      secondaryKeywords: ["english practice questions", "english quiz questions", "english multiple choice questions"],
      monthlyVolume: 1000,
    },
    h1: "English Practice Questions — Test Grammar and Comprehension",
    intro:
      "Master English grammar, literature analysis, and reading comprehension with practice questions covering sentence structure, literary devices, vocabulary, and writing skills. Each question includes detailed explanations of grammar rules and literary concepts. Perfect for SAT, ACT, AP English preparation, or general language improvement.",
    sampleItems: [
      { q: "Identify the subject in: 'The cat on the roof meowed loudly.'", a: "The cat", explanation: "The subject is 'the cat' (with 'on the roof' as a prepositional phrase modifying it). The verb is 'meowed.'", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "What literary device: 'The wind whispered through the trees'?", a: "Personification", explanation: "Personification gives human characteristics (whispering) to non-human things (wind).", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Which sentence is grammatically correct?", a: "'She and I went to the store' (not 'Her and me went to the store')", explanation: "Use subject pronouns (she, I) when they are the subject of the sentence. 'Her' and 'me' are object pronouns.", bloomLevel: "Understand", type: "multiple-choice" },
      { q: "True or False: A semicolon can connect two independent clauses.", a: "True", explanation: "Semicolons join two related independent clauses without a conjunction. Example: 'I love reading; books expand my mind.'", bloomLevel: "Remember", type: "true-false" },
      { q: "Identify the metaphor: 'Time is money.'", a: "Time = money (direct comparison without 'like' or 'as')", explanation: "A metaphor directly states one thing IS another for comparison. Similes use 'like' or 'as' for comparison.", bloomLevel: "Understand", type: "multiple-choice" },
      { q: "Which word is the adverb: 'She quickly finished her homework.'", a: "Quickly", explanation: "Adverbs modify verbs, adjectives, or other adverbs, often ending in -ly. 'Quickly' modifies 'finished.'", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Fix the error: 'Between you and I, this is difficult.'", a: "'Between you and me' (object pronoun after preposition)", explanation: "After prepositions, use object pronouns (me, him, her, them), not subject pronouns (I, he, she, they).", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is the theme of a literary work?", a: "The central message or insight about life", explanation: "Theme is the underlying meaning or main idea the author conveys, not just the topic. Examples: love conquers all, justice vs revenge, coming of age.", bloomLevel: "Understand", type: "multiple-choice" },
    ],
    topicsCovered: [
      "Grammar and syntax",
      "Literary devices",
      "Reading comprehension",
      "Vocabulary in context",
      "Writing techniques",
      "Sentence structure",
    ],
    studyTips: {
      workflow: [
        "Take a practice test to identify which English skills need work",
        "Review grammar rules and literary terms for concepts you missed",
        "Read actively, analyzing the author's craft and rhetorical choices",
      ],
      tips: [
        "Read quality literature regularly to internalize good writing patterns and expand vocabulary naturally",
        "Learn Greek and Latin root words to decode unfamiliar vocabulary on tests",
        "Practice identifying parts of speech in real sentences, not just isolated examples",
      ],
    },
    faq: [
      { q: "What English skills are tested?", a: "Grammar, literature analysis, reading comprehension, vocabulary, and rhetorical devices at high school and college levels." },
      { q: "Is this good for SAT/ACT prep?", a: "Yes. Questions match SAT and ACT English/Reading section format, difficulty, and skills tested." },
      { q: "Do questions include reading passages?", a: "Yes. Upload text passages to generate comprehension and analysis questions based on them." },
      { q: "Can I practice AP English Language or Literature?", a: "Yes. Upload literary texts or rhetorical analysis material to generate AP-level questions on themes, devices, and argumentation." },
    ],
    relatedPages: [
      "/subjects/english",
      "/subjects/vocabulary",
      "/subjects/grammar",
      "/practice-test-generator",
      "/for-students",
    ],
  },
  {
    slug: "quiz",
    type: "quiz",
    meta: {
      type: "quiz",
      primaryKeyword: "english quiz",
      monthlyVolume: 720,
    },
    h1: "English Quiz — Quick Grammar and Literature Check",
    intro:
      "Test English knowledge with quick quizzes covering grammar rules, vocabulary, punctuation, and literary concepts. Perfect for homework checks, pre-test review, or identifying knowledge gaps that need more study time.",
    sampleItems: [
      { q: "Which is the correct plural: 'child' → ?", a: "children", explanation: "Irregular plural. Not *childs. Common irregulars: child→children, mouse→mice, foot→feet, tooth→teeth.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "True or False: 'Their' and 'there' are interchangeable.", a: "False", explanation: "Their = possession (their book). There = location (over there) or existence (there is). They're = contraction of they are.", bloomLevel: "Understand", type: "true-false" },
      { q: "What is an independent clause?", a: "A complete sentence with subject and verb that expresses a complete thought", explanation: "Independent clauses can stand alone as sentences. Example: 'She reads books.' vs dependent: 'Because she reads books.'", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Identify the verb tense: 'She will have finished by noon.'", a: "Future perfect", explanation: "Future perfect shows action completed before a future time. Form: will have + past participle.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Which uses correct comma placement?", a: "'After dinner, we watched a movie.'", explanation: "Introductory phrases require a comma before the main clause. The comma signals where the introductory element ends.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is alliteration?", a: "Repetition of initial consonant sounds in nearby words", explanation: "Example: 'Peter Piper picked a peck.' Creates rhythm, emphasis, and memorability in writing and speech.", bloomLevel: "Remember", type: "multiple-choice" },
    ],
    topicsCovered: [
      "Basic grammar rules",
      "Punctuation",
      "Literary terms",
      "Vocabulary",
      "Sentence structure",
      "Common usage errors",
    ],
    studyTips: {
      workflow: [
        "Take a quiz to self-assess your current English knowledge",
        "Note which grammar rules or concepts you missed",
        "Practice applying those rules in your own writing",
      ],
      tips: [
        "Read grammar explanations in the context of real sentences, not isolated rules",
        "Write example sentences using each grammar rule you're learning",
        "Proofread your own writing specifically looking for errors you commonly make",
      ],
    },
    faq: [
      { q: "What English topics are covered?", a: "Grammar rules, punctuation, vocabulary, literary devices, and sentence structure at middle school through high school levels." },
      { q: "How many questions are in an English quiz?", a: "Sample quizzes have 6-10 questions. Generate custom quizzes of any length from your course material." },
      { q: "Can I retake English quizzes?", a: "Yes. Generate new quizzes on the same topics with fresh questions, or retake existing quizzes to track improvement." },
      { q: "Is this suitable for test prep?", a: "Yes. Great for SAT, ACT, or state assessment preparation when you upload relevant practice material." },
    ],
    relatedPages: [
      "/subjects/english",
      "/subjects/english/practice-questions",
      "/subjects/grammar/quiz",
      "/subjects/vocabulary/quiz",
      "/ai-quiz-generator",
    ],
  },
];
