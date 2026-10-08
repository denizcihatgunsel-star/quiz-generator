// This file contains the remaining combo data for batch 3A
// Will be split into individual files

import type { ComboData } from "./types";

// English combos
export const ENGLISH_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: { type: "practice-questions", primaryKeyword: "english practice test", secondaryKeywords: ["english practice questions", "english quiz questions"], monthlyVolume: 1000 },
    h1: "English Practice Questions — Test Grammar and Comprehension",
    intro: "Master English grammar, literature analysis, and reading comprehension with practice questions covering sentence structure, literary devices, vocabulary, and writing skills. Perfect for SAT, ACT, AP English, or general language improvement.",
    sampleItems: [
      { q: "Identify the subject in: 'The cat on the roof meowed loudly.'", a: "The cat", explanation: "The subject is 'the cat' (with 'on the roof' as a prepositional phrase modifying it). The verb is 'meowed.'", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "What literary device: 'The wind whispered through the trees'?", a: "Personification", explanation: "Personification gives human characteristics (whispering) to non-human things (wind).", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Which sentence is correct?", a: "'She and I went to the store'", explanation: "Use subject pronouns (she, I) when they are the subject. 'Her and me' are object pronouns.", bloomLevel: "Understand", type: "multiple-choice" },
      { q: "True or False: A semicolon can connect two independent clauses.", a: "True", explanation: "Semicolons join two related independent clauses without a conjunction. Example: 'I love reading; books expand my mind.'", bloomLevel: "Remember", type: "true-false" },
      { q: "Identify the metaphor: 'Time is money.'", a: "Time = money (direct comparison)", explanation: "A metaphor directly states one thing IS another. Similes use 'like' or 'as' for comparison.", bloomLevel: "Understand", type: "multiple-choice" },
      { q: "Which word is the adverb: 'She quickly finished her homework.'", a: "Quickly", explanation: "Adverbs modify verbs, adjectives, or other adverbs, often ending in -ly. 'Quickly' modifies 'finished.'", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Fix the error: 'Between you and I, this is difficult.'", a: "'Between you and me' (object pronoun after preposition)", explanation: "After prepositions, use object pronouns (me, him, her, them), not subject pronouns (I, he, she, they).", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is the theme of a literary work?", a: "The central message or insight about life", explanation: "Theme is the underlying meaning or main idea, not just the topic. Example: love, justice, coming of age.", bloomLevel: "Understand", type: "multiple-choice" },
    ],
    topicsCovered: ["Grammar and syntax", "Literary devices", "Reading comprehension", "Vocabulary in context", "Writing techniques", "Sentence structure"],
    studyTips: {
      workflow: ["Take practice test to identify weak areas", "Review grammar rules and literary terms", "Read actively, analyzing author's craft"],
      tips: ["Read quality literature regularly to internalize good writing", "Learn root words to decode unfamiliar vocabulary", "Practice identifying parts of speech in real sentences"],
    },
    faq: [
      { q: "What English skills are tested?", a: "Grammar, literature analysis, reading comprehension, vocabulary, and rhetorical devices." },
      { q: "Is this good for SAT/ACT prep?", a: "Yes. Questions match SAT and ACT English/Reading section format and difficulty." },
      { q: "Do questions include reading passages?", a: "Yes. Upload text passages to generate comprehension and analysis questions." },
      { q: "Can I practice AP English?", a: "Yes. Upload literary texts or rhetorical analysis material for AP-level questions." },
    ],
    relatedPages: ["/subjects/english", "/subjects/vocabulary", "/subjects/grammar", "/practice-test-generator"],
  },
  {
    slug: "quiz",
    type: "quiz",
    meta: { type: "quiz", primaryKeyword: "english quiz", monthlyVolume: 720 },
    h1: "English Quiz — Quick Grammar and Literature Check",
    intro: "Test English knowledge with quick quizzes covering grammar rules, vocabulary, and literary concepts. Perfect for homework checks or pre-test review.",
    sampleItems: [
      { q: "Which is the correct plural: 'child' → ?", a: "children", explanation: "Irregular plural. Not *childs. Common irregulars: child→children, mouse→mice, foot→feet.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "True or False: 'Their' and 'there' are interchangeable.", a: "False", explanation: "Their = possession (their book). There = location (over there) or existence (there is). They're = they are.", bloomLevel: "Understand", type: "true-false" },
      { q: "What is an independent clause?", a: "A complete sentence with subject and verb", explanation: "Independent clauses express complete thoughts and can stand alone. Example: 'She reads books.'", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Identify the verb tense: 'She will have finished by noon.'", a: "Future perfect", explanation: "Future perfect shows action completed before a future time. Form: will have + past participle.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Which uses correct comma placement?", a: "'After dinner, we watched a movie.'", explanation: "Introductory phrases require a comma before the main clause.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "What is alliteration?", a: "Repetition of initial consonant sounds", explanation: "Example: 'Peter Piper picked a peck.' Creates rhythm and emphasis in writing.", bloomLevel: "Remember", type: "multiple-choice" },
    ],
    topicsCovered: ["Basic grammar", "Punctuation", "Literary terms", "Vocabulary", "Sentence structure", "Common errors"],
    studyTips: {
      workflow: ["Take quiz to self-assess", "Note grammar rules you missed", "Practice applying rules in writing"],
      tips: ["Read grammar explanations in context of real sentences", "Write example sentences using each grammar rule", "Proofread your own writing for common errors"],
    },
    faq: [
      { q: "What topics are covered?", a: "Grammar rules, punctuation, vocabulary, and basic literary devices." },
      { q: "How many questions in a quiz?", a: "Sample quizzes have 6-10 questions. Generate custom quizzes of any length." },
      { q: "Can I retake quizzes?", a: "Yes. Generate new quizzes on the same topics with fresh questions." },
    ],
    relatedPages: ["/subjects/english", "/subjects/english/practice-questions", "/subjects/grammar/quiz", "/ai-quiz-generator"],
  },
];

// More subjects to add: spelling (3 combos), grammar (1), algebra (2), geometry (2), world-history (1), french (1)
// Plus exam combos: ap-us-history (1), ap-psychology (1)
