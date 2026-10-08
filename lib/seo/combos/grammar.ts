/**
 * Auto-extracted from new-subjects-1.ts
 */
import type { ComboData } from "./types";

export const GRAMMAR_COMBOS: ComboData[] = [
  {
    slug: "quiz",
    type: "quiz",
    meta: { type: "quiz", primaryKeyword: "grammar quiz", monthlyVolume: 1300 },
    h1: "Grammar Quiz — Test Your Grammar Knowledge",
    intro: "Master English grammar with quizzes covering parts of speech, sentence structure, punctuation, verb tenses, and usage. Perfect for middle school through adult ESL learners improving grammar skills.",
    sampleItems: [
      { q: "Identify the error: 'Me and him went to the park.'", a: "Should be 'He and I went to the park' (subject pronouns)", explanation: "Use subject pronouns (I, he, she, we, they) as sentence subjects. Object pronouns (me, him, her, us, them) follow verbs/prepositions.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Which sentence uses commas correctly?", a: "'I bought apples, oranges, and bananas.' (Oxford comma)", explanation: "Use commas to separate items in a series. The Oxford comma (before 'and') prevents ambiguity.", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "Choose the correct verb: 'Neither the teacher nor the students ___ ready.'", a: "were (verb agrees with nearest subject)", explanation: "With 'neither...nor,' the verb agrees with the nearest subject. 'Students' is plural, so use 'were.'", bloomLevel: "Apply", type: "multiple-choice" },
      { q: "True or False: 'Who' is used for subjects, 'whom' for objects.", a: "True", explanation: "Who = subject (Who called?). Whom = object (To whom did you speak?). Tip: if you'd say 'he,' use 'who'; if 'him,' use 'whom.'", bloomLevel: "Understand", type: "true-false" },
      { q: "Identify the adverb: 'She sings beautifully.'", a: "Beautifully (modifies verb 'sings')", explanation: "Adverbs modify verbs, adjectives, or other adverbs. Many end in -ly.", bloomLevel: "Remember", type: "multiple-choice" },
      { q: "Fix the fragment: 'Because I was tired.'", a: "Add an independent clause: 'Because I was tired, I went to bed.'", explanation: "Subordinating conjunctions (because, although, if) create dependent clauses that need an independent clause to complete the sentence.", bloomLevel: "Apply", type: "multiple-choice" },
    ],
    topicsCovered: ["Parts of speech", "Sentence structure", "Punctuation rules", "Subject-verb agreement", "Pronoun usage", "Common errors"],
    studyTips: {
      workflow: ["Take grammar quiz to identify weak areas", "Review specific grammar rules you missed", "Practice applying rules in your own writing"],
      tips: ["Read quality writing to internalize correct grammar patterns", "Learn one grammar rule at a time and master it before moving on", "Proofread your writing specifically for errors you commonly make"],
    },
    faq: [
      { q: "What grammar topics are covered?", a: "Parts of speech, sentence structure, punctuation, verb tenses, pronoun usage, and common errors." },
      { q: "Is this suitable for ESL learners?", a: "Yes. Quizzes work for intermediate to advanced ESL students and native speakers alike." },
      { q: "Can I practice specific grammar rules?", a: "Yes. Upload notes on specific topics (e.g., 'subjunctive mood' or 'comma usage') for focused quizzes." },
    ],
    relatedPages: ["/subjects/grammar", "/subjects/english/quiz", "/subjects/vocabulary/quiz", "/ai-quiz-generator"],
  },
];
