/**
 * Combo pages for Vocabulary subject hub
 */
import type { ComboData } from "./types";

export const VOCABULARY_COMBOS: ComboData[] = [
  {
    slug: "quiz",
    type: "quiz",
    meta: {
      type: "quiz",
      primaryKeyword: "vocabulary quiz",
      monthlyVolume: 6600,
    },
    h1: "Vocabulary Quiz — Test Your Word Knowledge",
    intro:
      "Build vocabulary mastery through targeted practice questions that test definitions, synonyms, antonyms, and usage in context. Whether you're preparing for the SAT, GRE, TOEFL, or simply want to expand your lexicon, these vocabulary quizzes help you move beyond memorization to real understanding. Practice with sample questions below, then create custom quizzes from your own word lists.",
    sampleItems: [
      {
        q: "Which word means 'using very few words'?",
        a: "Laconic",
        explanation:
          "Laconic describes someone who uses few words; brief and to the point in speech.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Choose the best synonym for 'ubiquitous':",
        a: "Omnipresent",
        explanation:
          "Both ubiquitous and omnipresent mean present everywhere at the same time.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "What does 'ephemeral' mean?",
        a: "Lasting a very short time",
        explanation:
          "Ephemeral describes something that is fleeting or transitory, existing briefly.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "The scientist's findings were _____ because they contradicted all previous research.",
        a: "Anomalous",
        explanation:
          "Anomalous means deviating from the norm or expectation, fitting the context of contradictory findings.",
        bloomLevel: "Apply",
        type: "fill-in-blank",
      },
      {
        q: "True or False: 'Verbose' means concise and brief.",
        a: "False",
        explanation:
          "Verbose actually means using more words than necessary; wordy. It's the opposite of concise.",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "Which word describes someone who is 'extremely generous'?",
        a: "Munificent",
        explanation:
          "Munificent means very generous or lavish in giving, typically referring to large gifts or donations.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Select the antonym of 'benevolent':",
        a: "Malevolent",
        explanation:
          "Benevolent means well-meaning and kindly, while malevolent means wishing harm to others.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "The _____ nature of the issue made it difficult to find a clear solution.",
        a: "Ambiguous",
        explanation:
          "Ambiguous means open to more than one interpretation; unclear or uncertain.",
        bloomLevel: "Apply",
        type: "fill-in-blank",
      },
      {
        q: "True or False: 'Pragmatic' means idealistic and theoretical.",
        a: "False",
        explanation:
          "Pragmatic means practical and realistic, dealing with things sensibly based on practical considerations rather than theory.",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "Which word best describes a 'harsh, discordant mixture of sounds'?",
        a: "Cacophony",
        explanation:
          "Cacophony refers to a harsh, jarring mixture of sounds, often used to describe unpleasant noise.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "SAT vocabulary",
      "GRE vocabulary",
      "Academic word lists",
      "Synonyms and antonyms",
      "Context clues",
      "Word roots and affixes",
      "Advanced vocabulary",
      "TOEFL vocabulary",
      "College-level words",
      "Professional vocabulary",
    ],
    studyTips: {
      workflow: [
        "Take a vocabulary quiz to identify which words you already know and which ones need practice",
        "Create flashcards for words you missed, focusing on both definition and usage in context",
        "Retake the quiz after studying, then test yourself weekly with spaced repetition",
      ],
      tips: [
        "Learn words in context rather than isolated definitions—see how they're used in sentences",
        "Focus on word roots, prefixes, and suffixes to decode unfamiliar words",
        "Practice using new words in your own sentences to solidify understanding",
      ],
    },
    faq: [
      {
        q: "How many questions are in a typical vocabulary quiz?",
        a: "Sample quizzes contain 10-20 questions. When you create your own quiz from a word list, you can generate any number based on your needs.",
      },
      {
        q: "What difficulty levels are available?",
        a: "Quizzes can be generated for any level from middle school through advanced GRE/GMAT vocabulary. Upload your specific word list or textbook chapter to match your target difficulty.",
      },
      {
        q: "Do quizzes include context-based questions?",
        a: "Yes. Questions test vocabulary through definitions, synonyms, antonyms, and sentence context to ensure real understanding, not just memorization.",
      },
      {
        q: "Can I create quizzes from my own word lists?",
        a: "Yes. Upload or paste your vocabulary list and generate quizzes with definitions, example sentences, and multiple question types.",
      },
      {
        q: "Is this good for SAT and GRE prep?",
        a: "Yes. Generate SAT or GRE vocabulary quizzes by uploading relevant word lists. Questions test the same skills as standardized test vocab sections.",
      },
      {
        q: "How often should I retake vocabulary quizzes?",
        a: "Use spaced repetition: retake quizzes the next day, then after 3 days, a week, and two weeks to move words into long-term memory.",
      },
    ],
    relatedPages: [
      "/subjects/vocabulary",
      "/subjects/vocabulary/flashcards",
      "/subjects/english",
      "/subjects/grammar",
      "/ai-quiz-generator",
      "/ai-flashcards",
    ],
  },
  {
    slug: "flashcards",
    type: "flashcards",
    meta: {
      type: "flashcards",
      primaryKeyword: "vocabulary flashcards",
      monthlyVolume: 1300,
    },
    h1: "Vocabulary Flashcards — Learn Words Faster",
    intro:
      "Master vocabulary efficiently with AI-generated flashcards that include definitions, example sentences, synonyms, and memory aids. Perfect for SAT, GRE, TOEFL preparation or expanding your general vocabulary. Create flashcards from your own word lists and study with spaced repetition to move words into long-term memory faster than traditional methods.",
    sampleItems: [
      {
        q: "Altruistic",
        a: "Definition: Showing unselfish concern for the welfare of others. Example: Her altruistic donation funded scholarships for low-income students. Synonym: Selfless, charitable.",
        explanation:
          "Altruistic describes actions motivated by genuine concern for others rather than self-interest. Think of altruism as the opposite of egotism.",
        bloomLevel: "Remember",
      },
      {
        q: "Ambivalent",
        a: "Definition: Having mixed feelings or contradictory ideas about something. Example: He felt ambivalent about the job offer—excited by the opportunity but worried about relocating. Synonym: Uncertain, conflicted.",
        explanation:
          "Ambivalent comes from Latin: 'ambi' (both) + 'valent' (strong). It describes having two equally strong but opposite feelings simultaneously.",
        bloomLevel: "Remember",
      },
      {
        q: "Candid",
        a: "Definition: Truthful and straightforward; frank. Example: She gave a candid assessment of the project's challenges. Synonym: Honest, direct, forthright.",
        explanation:
          "Candid speech is open and honest without evasion or pretense. A candid photo is unstaged, capturing a genuine moment.",
        bloomLevel: "Remember",
      },
      {
        q: "Disparity",
        a: "Definition: A great difference or inequality. Example: The disparity in wages between executives and workers sparked debate. Synonym: Gap, inequality, discrepancy.",
        explanation:
          "Disparity emphasizes significant differences between things that should be similar or equal, often used in discussions of social or economic inequality.",
        bloomLevel: "Remember",
      },
      {
        q: "Eloquent",
        a: "Definition: Fluent and persuasive in speaking or writing. Example: Her eloquent speech moved the audience to tears. Synonym: Articulate, expressive, persuasive.",
        explanation:
          "Eloquent describes communication that is clear, powerful, and beautiful. It combines effective expression with emotional impact.",
        bloomLevel: "Remember",
      },
      {
        q: "Fastidious",
        a: "Definition: Very attentive to detail; meticulous and hard to please. Example: He was fastidious about cleanliness, organizing his desk daily. Synonym: Meticulous, particular, fussy.",
        explanation:
          "Fastidious can be positive (showing care for quality) or negative (being overly picky). Context determines the connotation.",
        bloomLevel: "Remember",
      },
      {
        q: "Gregarious",
        a: "Definition: Sociable and enjoying the company of others. Example: Her gregarious personality made her popular at parties. Synonym: Outgoing, sociable, friendly.",
        explanation:
          "Gregarious comes from Latin 'grex' meaning flock or herd. Gregarious people seek out social situations like animals that live in groups.",
        bloomLevel: "Remember",
      },
      {
        q: "Juxtapose",
        a: "Definition: Place side by side for contrasting effect. Example: The film juxtaposed scenes of wealth and poverty. Synonym: Compare, contrast.",
        explanation:
          "Juxtaposition is a literary and artistic technique that places contrasting elements together to highlight their differences and create meaning.",
        bloomLevel: "Understand",
      },
      {
        q: "Nostalgia",
        a: "Definition: Sentimental longing for the past. Example: Looking at old photos filled him with nostalgia for his college years. Synonym: Wistfulness, reminiscence.",
        explanation:
          "Nostalgia combines Greek 'nostos' (homecoming) + 'algos' (pain). It literally means the pain of wanting to return home or to the past.",
        bloomLevel: "Remember",
      },
      {
        q: "Pensive",
        a: "Definition: Engaged in deep or serious thought, often with a tinge of sadness. Example: She stared out the window with a pensive expression. Synonym: Thoughtful, reflective, contemplative.",
        explanation:
          "Pensive describes introspective thought that's slightly melancholy. It's more specific than simply 'thinking'—it has an emotional quality.",
        bloomLevel: "Remember",
      },
      {
        q: "Resilient",
        a: "Definition: Able to recover quickly from difficulties; adaptable. Example: The resilient community rebuilt after the disaster. Synonym: Strong, adaptable, durable.",
        explanation:
          "Resilience is the ability to bounce back from adversity. It applies to both physical materials and psychological strength.",
        bloomLevel: "Remember",
      },
      {
        q: "Scrutinize",
        a: "Definition: Examine or inspect closely and thoroughly. Example: The detective scrutinized the evidence for clues. Synonym: Examine, inspect, analyze.",
        explanation:
          "Scrutinize implies critical, detailed examination—more intense than simply looking or reading. It suggests searching for hidden details or flaws.",
        bloomLevel: "Understand",
      },
    ],
    topicsCovered: [
      "High-frequency SAT words",
      "GRE vocabulary lists",
      "Academic word families",
      "Common word roots",
      "Advanced adjectives",
      "Formal vocabulary",
      "Literary terminology",
      "TOEFL word lists",
      "Professional vocabulary",
      "Context and usage",
    ],
    studyTips: {
      workflow: [
        "Study 10-15 new flashcards per day rather than cramming large lists all at once",
        "Review cards using spaced repetition: daily for new words, then 3 days, a week, and two weeks later",
        "Test yourself by covering the definition and recalling it, then flip to check—active recall beats passive reading",
      ],
      tips: [
        "Create mental images or personal associations to remember words—connect abstract words to concrete images",
        "Use new vocabulary words in your own sentences or conversations within 24 hours of learning them",
        "Group words by theme or root rather than alphabetically to build conceptual connections",
      ],
    },
    faq: [
      {
        q: "How many flashcards should I study at once?",
        a: "Start with 10-15 new cards per day. Research shows this pace allows for better retention than cramming larger sets. Build up gradually as words move into long-term memory.",
      },
      {
        q: "What information is included on each card?",
        a: "Each flashcard includes the word, definition, example sentence in context, synonyms, and memory aids like word roots or associations. This multi-angle approach improves retention.",
      },
      {
        q: "Can I create flashcards from my own word list?",
        a: "Yes. Upload or paste any vocabulary list and generate flashcards with definitions and example sentences automatically. Perfect for textbook chapters or teacher-provided word lists.",
      },
      {
        q: "How is this better than handwritten flashcards?",
        a: "AI-generated flashcards save time, include researched definitions and example sentences, and integrate spaced repetition tracking. You can create a full deck in seconds instead of hours.",
      },
      {
        q: "What's the best study method with flashcards?",
        a: "Use active recall: look at the word, try to remember the definition, then flip to check. Review missed cards more frequently. Spaced repetition (reviewing at increasing intervals) is the most effective memorization technique.",
      },
      {
        q: "Is this suitable for non-native English speakers?",
        a: "Yes. Generate flashcards at any difficulty level from basic ESL vocabulary to advanced academic English. Examina supports 29 languages, so you can include translations if helpful.",
      },
    ],
    relatedPages: [
      "/subjects/vocabulary",
      "/subjects/vocabulary/quiz",
      "/subjects/english",
      "/ai-flashcards",
      "/for-students",
    ],
  },
];
