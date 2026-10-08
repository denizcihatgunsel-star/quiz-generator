/**
 * Auto-extracted from new-subjects-1.ts
 */
import type { ComboData } from "./types";

export const SPELLING_COMBOS: ComboData[] = [
  {
    slug: "flashcards",
    type: "flashcards",
    meta: { type: "flashcards", primaryKeyword: "spelling flashcards", monthlyVolume: 1600 },
    h1: "Spelling Flashcards — Master Correct Spelling",
    intro: "Build spelling mastery with flashcards that show correct spellings, common misspellings, and memory aids. Perfect for weekly spelling lists, vocabulary building, or ESL learners working on English spelling patterns.",
    sampleItems: [
      { q: "Definitely", a: "D-E-F-I-N-I-T-E-L-Y (not definately). Memory aid: Remember FINITE is in the middle. Common error: replacing 'i' with 'a'.", explanation: "One of the most commonly misspelled words. Break it down: de-finite-ly.", bloomLevel: "Remember" },
      { q: "Separate", a: "S-E-P-A-R-A-T-E (not seperate). Memory aid: There's A RAT in separate. Common error: using 'e' instead of 'a' in middle.", explanation: "Remember: sep-A-rate. Think of the rat to recall the 'a'.", bloomLevel: "Remember" },
      { q: "Embarrass", a: "E-M-B-A-R-R-A-S-S (two R's, two S's). Memory aid: Really, Really Should Stay Silent. Common errors: single R or single S.", explanation: "Double R, double S. Think: em-BARR-ASS.", bloomLevel: "Remember" },
      { q: "Occasion", a: "O-C-C-A-S-I-O-N (two C's, one S). Memory aid: two C's, one S. Common error: double S.", explanation: "Remember: oc-ca-sion. Double the C, single the S.", bloomLevel: "Remember" },
      { q: "Necessary", a: "N-E-C-E-S-S-A-R-Y (one C, two S's). Memory aid: one Collar, two Sleeves. Common error: double C or single S.", explanation: "NeCeSSary. Think of a shirt: 1 collar (C), 2 sleeves (SS).", bloomLevel: "Remember" },
      { q: "Receive", a: "R-E-C-E-I-V-E ('i before e except after c'). Common error: writing recieve.", explanation: "The 'i before e except after c' rule applies here: re-CEI-ve.", bloomLevel: "Remember" },
    ],
    topicsCovered: ["Commonly misspelled words", "Spelling patterns", "Homophones", "Word roots", "Memory strategies", "Grade-level vocabulary"],
    studyTips: {
      workflow: ["Study 10 spelling words daily using flashcards", "Write each word 3 times to build muscle memory", "Test yourself by covering the answer and spelling aloud"],
      tips: ["Break long words into syllables or smaller chunks", "Create personal mnemonics for words you consistently misspell", "Practice words in context sentences, not isolation"],
    },
    faq: [
      { q: "What spelling levels are covered?", a: "Elementary through high school spelling lists, plus commonly misspelled adult words." },
      { q: "Can I upload my weekly spelling list?", a: "Yes. Paste or upload any word list to generate flashcards with memory aids." },
      { q: "Do cards include pronunciation?", a: "Cards show phonetic spelling and syllable breaks to help with pronunciation." },
    ],
    relatedPages: ["/subjects/spelling", "/subjects/spelling/worksheet-generator", "/subjects/vocabulary/flashcards", "/ai-flashcards"],
  },
  {
    slug: "worksheet-generator",
    type: "worksheet-generator",
    meta: { type: "worksheet-generator", primaryKeyword: "spelling worksheet generator", monthlyVolume: 1600 },
    h1: "Spelling Worksheet Generator — Create Custom Practice Sheets",
    intro: "Generate spelling worksheets with word lists, sentences, and answer keys. Perfect for teachers creating weekly spelling homework or parents supporting home practice.",
    sampleItems: [
      { q: "Sample Worksheet: Grade 3 Spelling - Long A Sounds", a: "Words: make, cake, take, snake, grade, trade, brave, wave, escape, parade. Sentences: 1) Fill in: The ___ is in the lake. 2) Use 'brave' in a sentence.", explanation: "Worksheet focuses on 'a_e' long A pattern. Includes word list, fill-in-blanks, and sentence writing.", bloomLevel: "Apply" },
      { q: "Sample Worksheet: Grade 5 - Double Consonants", a: "Words: happen, butter, sitting, running, summer, dinner, letter, better, happened, swimming. Activity: Sort words by which letter doubles (pp, tt, nn, mm).", explanation: "Teaches doubling rule: when adding -ing or -ed to CVC words, double the final consonant.", bloomLevel: "Understand" },
      { q: "Sample Worksheet: Grade 7 - Homophones", a: "Words: their/there/they're, to/two/too, your/you're, its/it's, then/than. Fill in correct word: ___ going to ___ house.", explanation: "Practice distinguishing common homophones in context. Includes usage explanations.", bloomLevel: "Apply" },
    ],
    topicsCovered: ["Grade-level word lists", "Phonics patterns", "Word families", "Sight words", "Homophones", "Prefixes and suffixes"],
    studyTips: {
      workflow: ["Generate worksheet for current spelling list", "Complete worksheet independently", "Check answers and practice missed words"],
      tips: ["Do worksheets multiple times with different sentences for the same words", "Focus on words you miss—don't waste time on words you know", "Use worksheets for pretest Friday, study over weekend, final test Monday"],
    },
    faq: [
      { q: "What grade levels are supported?", a: "K-8 spelling worksheets matching typical curriculum standards." },
      { q: "Can I customize word lists?", a: "Yes. Upload your school's spelling curriculum or create custom lists." },
      { q: "Do worksheets include answer keys?", a: "Yes. Every worksheet has an answer key for checking work." },
    ],
    relatedPages: ["/subjects/spelling", "/subjects/spelling/flashcards", "/features/worksheet-generator", "/for-teachers"],
  },
  {
    slug: "quiz-generator",
    type: "quiz-generator",
    meta: { type: "quiz-generator", primaryKeyword: "spelling test generator", secondaryKeywords: ["spelling quiz generator", "spelling quiz maker"], monthlyVolume: 880 },
    h1: "Spelling Test Generator — Create Custom Spelling Tests",
    intro: "Generate spelling tests with customizable word lists, difficulty levels, and formats. Perfect for weekly classroom spelling tests or homeschool assessments.",
    sampleItems: [
      { q: "Sample Test Format: Traditional Spelling Test", a: "Teacher reads word, uses it in sentence, student writes word. Example: 'Necessary - It is necessary to study. Necessary.' Graded for correct spelling.", explanation: "Classic format: oral administration, written response. Tests listening and spelling together.", bloomLevel: "Apply" },
      { q: "Sample Test Format: Multiple Choice", a: "Which is correct? A) definately B) definetly C) definitely D) definitly. Answer: C", explanation: "Multiple choice tests recognition of correct spelling among common errors.", bloomLevel: "Remember" },
      { q: "Sample Test Format: Fill-in-the-Blank", a: "Complete: I ___ went to the store yesterday. (definitely). Test spelling in context.", explanation: "Context-based spelling tests comprehension and spelling together.", bloomLevel: "Apply" },
    ],
    topicsCovered: ["Custom word lists", "Multiple test formats", "Difficulty levels", "Answer keys", "Grading rubrics"],
    studyTips: {
      workflow: ["Generate pretest Monday to identify words to study", "Study missed words during week", "Take final test Friday"],
      tips: ["Practice writing words from memory, not copying", "Use spaced repetition: study Day 1, Day 3, Day 7", "Test in context sentences, not just isolated words"],
    },
    faq: [
      { q: "What test formats are available?", a: "Traditional oral/written, multiple choice, fill-in-blank, and sentence writing." },
      { q: "Can I reuse the same word list?", a: "Yes. Generate multiple tests with the same words but different sentences or formats." },
      { q: "How are tests graded?", a: "Automatic grading for multiple choice. Traditional tests include answer keys for manual grading." },
    ],
    relatedPages: ["/subjects/spelling", "/subjects/spelling/flashcards", "/subjects/spelling/worksheet-generator", "/ai-quiz-generator"],
  },
];
