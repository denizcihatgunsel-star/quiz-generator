export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  readTime: string;
  sections: { h: string; p?: string[]; list?: string[] }[];
  faq: { q: string; a: string }[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "make-a-quiz-from-your-notes",
    title: "How to Make a Quiz from Your Notes in 60 Seconds",
    description:
      "Why self-testing beats re-reading, and a step-by-step walkthrough of turning any notes into a practice quiz with AI.",
    tag: "Study Tips",
    date: "Jan 2026",
    readTime: "4 min",
    sections: [
      {
        h: "Why self-testing beats re-reading",
        p: [
          "Decades of cognitive science research show the same thing: re-reading your notes feels productive, but produces much weaker memory than testing yourself. It's called the testing effect — retrieving information strengthens it, while passive review barely touches it.",
          "The problem has always been the effort required. Writing good quiz questions takes time, and students who already feel time-poor rarely do it. That's exactly the gap an AI quiz generator closes.",
        ],
      },
      {
        h: "What you need before you start",
        list: [
          "Your study material — lecture notes, a textbook chapter, a PDF, or even a photo of handwritten notes",
          "Between 50 and 15,000 characters of content (roughly a paragraph to a full chapter)",
          "A target language and question style — multiple choice, flashcards, fill-in-the-blank, or true/false",
        ],
      },
      {
        h: "The 60-second walkthrough",
        p: [
          "Open Examina, paste your content (or upload a PDF), pick your question types and language, and generate. In under 30 seconds you get a structured quiz with explanations, difficulty tags, and Bloom's Taxonomy levels on every question.",
          "The key isn't the generation speed — it's that every question comes with an explanation. That turns a quiz into a study session by itself: when you miss one, you learn why.",
        ],
      },
      {
        h: "How to review the results",
        p: [
          "Don't just take the quiz once. Export the flashcards for spaced repetition, re-take the multiple choice a few days later, and check your score trend in the dashboard. A quiz you revisit is worth ten you skim once.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I make a quiz from a PDF?",
        a: "Yes. Examina accepts PDF, TXT, and Markdown uploads, plus pasted text and OCR from photos of notes.",
      },
      {
        q: "Is the quiz generator free?",
        a: "Free accounts can generate 5 quizzes per month. Paid plans start at $2/month and go up to unlimited generation.",
      },
      {
        q: "What question types can I generate?",
        a: "Multiple choice, flashcards, fill-in-the-blank, and true/false — all from the same source material in one generation.",
      },
    ],
  },
  {
    slug: "active-recall-guide",
    title: "Active Recall: The #1 Study Technique You're Probably Not Using",
    description:
      "The research behind active recall, why it outperforms highlighting and re-reading, and how to build it into your routine.",
    tag: "Science of Learning",
    date: "Jan 2026",
    readTime: "5 min",
    sections: [
      {
        h: "What active recall actually is",
        p: [
          "Active recall is the act of pulling information out of your memory instead of pushing it back in. That distinction — retrieval versus re-exposure — is the whole ballgame.",
          "When you re-read a page, the words are right there in front of you; your brain takes a shortcut that feels like knowing. When you close the book and force yourself to answer a question, your brain has to reconstruct the knowledge, and that reconstruction physically strengthens the memory trace.",
        ],
      },
      {
        h: "What the research says",
        p: [
          "The testing effect is one of the most replicated findings in cognitive psychology. Across dozens of experiments, students who practice retrieval consistently outperform students who re-read the same material by a wide margin on delayed tests.",
          "The common objection — 'I haven't learned it yet, testing myself is pointless' — is backwards. Testing IS learning. Every failed recall attempt is where the real encoding happens.",
        ],
      },
      {
        h: "How to build it into your routine",
        list: [
          "After every lecture, generate a quiz from your notes and take it the same day",
          "Use flashcards with spaced repetition instead of re-reading slides",
          "Explain topics aloud without notes, then check what you missed",
          "Retest on a schedule: day 1, day 3, day 7, day 21",
        ],
      },
      {
        h: "Make practice frictionless",
        p: [
          "The barrier to active recall isn't the technique — it's the effort of producing questions. AI quiz generation removes it: paste your notes, get a complete practice test with explanations, and spend your energy on retrieval instead of question-writing.",
        ],
      },
    ],
    faq: [
      {
        q: "Is active recall better than spaced repetition?",
        a: "They're different tools. Active recall decides that you test yourself; spaced repetition decides when. Used together they're the strongest known study combination.",
      },
      {
        q: "Does active recall work for every subject?",
        a: "It works for anything that needs remembering: languages, medicine, law, history, programming concepts. Subjects that revolve around problem-solving benefit too, via practice problems that force retrieval of method.",
      },
      {
        q: "How often should I practice retrieval?",
        a: "A practical rhythm: same-day review after a lecture, then day 3, day 7, and before the exam. Spaced-repetition tools automate this schedule for you.",
      },
    ],
  },
  {
    slug: "blooms-taxonomy-for-quizzes",
    title: "Bloom's Taxonomy for Quizzes: Write Questions That Actually Test Understanding",
    description:
      "The 6 cognitive levels applied to quiz questions, with examples at each level and tips for balanced assessments.",
    tag: "For Educators",
    date: "Feb 2026",
    readTime: "6 min",
    sections: [
      {
        h: "The levels in one minute",
        list: [
          "Remember — recall facts: 'What is the capital of X?'",
          "Understand — explain in your own words: 'Why does X cause Y?'",
          "Apply — use knowledge in a new situation: 'Given this scenario, which procedure applies?'",
          "Analyze — break things apart: 'Which assumption does this argument depend on?'",
          "Evaluate — judge with criteria: 'Which solution is strongest and why?'",
          "Create — combine into something new (hardest to test in MCQ form)",
        ],
      },
      {
        h: "Why most quiz questions stop at Remember",
        p: [
          "The default AI-generated and textbook question is a straight recall question: one fact, one answer, done. Recall questions are easy to write and easy for students to guess — which is why a quiz full of them flatters weak preparation and punishes nothing.",
          "A good quiz climbs the taxonomy. If a student can memorize the question bank, the quiz isn't testing the material — it's testing the bank.",
        ],
      },
      {
        h: "How to write questions at each level",
        p: [
          "For Understand, ask 'why' and paraphrase: present a concept and ask which statement best explains it. For Apply, move the fact into a scenario the student has never seen. For Analyze, present a short argument and ask which claim it depends on. For Evaluate, offer two plausible answers and make the distinction subtle — the distractor should be a common misconception, not an obvious wrong.",
          "Balance matters more than difficulty: a diagnostic quiz should start at Remember to check baseline knowledge and climb to Analyze/Evaluate to expose real gaps.",
        ],
      },
      {
        h: "Get Bloom's levels without writing questions by hand",
        p: [
          "Examina tags every generated question with its Bloom's level and difficulty, and deliberately distributes questions across Remember → Evaluate. Paste your material, and the taxonomy mapping is already done — you just review the balance.",
        ],
      },
    ],
    faq: [
      {
        q: "How many questions per level is ideal?",
        a: "For a 20-question formative quiz, a rough distribution like 6 Remember, 5 Understand, 4 Apply, 3 Analyze, 2 Evaluate gives the full picture of where a class stands.",
      },
      {
        q: "Is 'Create' testable in a quiz?",
        a: "Not well in multiple choice. Create-level assessment belongs in essays and projects; quizzing covers Remember through Evaluate reliably.",
      },
      {
        q: "Do Bloom's levels appear on the generated quizzes?",
        a: "Yes — every question in Examina carries a Bloom's level and a difficulty tag, and you can filter by level when reviewing.",
      },
    ],
  },
  {
    slug: "create-flashcards-with-ai",
    title: "How to Create Flashcards with AI: The Complete Guide",
    description:
      "AI-generated flashcards vs. manual creation, best practices for flashcard-based studying, and tools compared.",
    tag: "Study Tips",
    date: "Feb 2026",
    readTime: "5 min",
    sections: [
      {
        h: "Manual vs. AI-generated flashcards",
        p: [
          "Manual flashcards have one real advantage: writing them is itself a study pass. But the cost is brutal — a 40-slide lecture becomes hours of card-making, and most students quit before finishing.",
          "AI-generated flashcards trade that writing pass for speed and coverage: your entire chapter becomes cards in seconds, every concept gets covered, and you spend your time on the part that actually matters — retrieval.",
        ],
      },
      {
        h: "The three rules of good flashcards",
        list: [
          "One fact per card — split anything compound, or retrieval gets ambiguous",
          "Front asks, back answers — no hints on the front, no questions phrased as statements",
          "Closed cards beat open-ended — 'Name the enzyme' beats 'Explain enzymes'",
        ],
      },
      {
        h: "How to review with spaced repetition",
        p: [
          "A flashcard is only as good as its schedule. Spaced repetition asks each card right when you're about to forget it: review new cards the same day, then on one-day, three-day, and weekly intervals. Examina's study mode handles the scheduling automatically and tracks your streak.",
        ],
      },
      {
        h: "What to do with the cards you keep missing",
        p: [
          "Cards you repeatedly fail aren't just 'hard' — they're usually cards with two facts crammed together, or ones you wrote in the source material's words without understanding. When one keeps failing, split it in two and rephrase the front in your own words. Then let the scheduler handle the rest.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I make flashcards from a PDF?",
        a: "Yes — upload PDF, TXT, or Markdown, or paste text and photos of notes, and Examina generates review cards for the whole document.",
      },
      {
        q: "Are AI flashcards accurate enough?",
        a: "For well-structured study material, yes — but always skim the set once for mistakes, exactly as you would proofread hand-written cards. Errors are rarer and consistency is higher.",
      },
      {
        q: "Do flashcards share my quiz quota?",
        a: "Flashcards from generated quizzes come with the quiz. Standalone flashcard generation counts against your monthly quiz allowance like any other generation.",
      },
    ],
  },
  {
    slug: "ai-tools-for-teachers",
    title: "AI Tools for Teachers: Save 10+ Hours a Week on Assessments",
    description:
      "Where teachers lose time on assessment creation, and how AI quiz generators can streamline the workflow.",
    tag: "For Educators",
    date: "Feb 2026",
    readTime: "5 min",
    sections: [
      {
        h: "Where the hours actually go",
        p: [
          "Survey teachers about their workload and assessment creation is near the top: writing questions, formatting them, checking for ambiguity, and building versions for differentiated classes. A single unit test can consume an evening — and then it's outdated next year.",
        ],
      },
      {
        h: "What an AI generator does differently",
        p: [
          "Feed it your lesson, slides, or textbook chapter once. It produces the question set: four question types, plausible distractor answers, explanations for every question, and Bloom's Taxonomy levels so the test measures understanding rather than memorization.",
          "Teachers can then generate different versions for different classes in minutes — the same content, re-authored, which also solves the cheating problem that fixed question banks create.",
        ],
      },
      {
        h: "Live classroom quizzing",
        p: [
          "Beyond paper tests, generated questions power live game rounds: project the quiz, students answer with join codes from their phones, no accounts needed. Instant formative feedback, high participation, zero marking.",
        ],
      },
      {
        h: "A realistic workflow",
        list: [
          "Monday: paste the week's content, generate a diagnostic quiz, scan the levels report",
          "Wednesday: run the quiz as a live classroom game as a warm-up",
          "Friday: generate the exit ticket from the same content, review class-wide gaps",
        ],
      },
    ],
    faq: [
      {
        q: "Is it free for teachers?",
        a: "Examina's free plan includes 5 quizzes per month. The Team plan is designed for educators: unlimited quizzes, shared library, and up to five members.",
      },
      {
        q: "Can students take the quiz without an account?",
        a: "Yes — classroom games work with join codes; students play from any phone without signing up.",
      },
      {
        q: "Does it work in other languages?",
        a: "Examina generates in 29 languages, so assessments can be authored in students' home languages or the target language being taught.",
      },
    ],
  },
  {
    slug: "how-to-study-with-ai",
    title: "How to Study with AI in 2026: Tools, Techniques, and Tips",
    description:
      "A complete guide to AI study tools — quiz generators, flashcard makers, summarizers — and how to use them effectively.",
    tag: "Study Tips",
    date: "Mar 2026",
    readTime: "6 min",
    sections: [
      {
        h: "The right way to use AI for studying",
        p: [
          "The wrong way is passive: asking an AI to explain things while you read the answer like you'd read a textbook. The right way uses AI to force retrieval — because the learning still happens in YOUR head, not in the model's.",
          "AI's job in your study stack is to remove production work: writing questions, making flashcards, summarizing a chapter, building a practice test. Your job is the retrieval, the spacing, and the self-correction.",
        ],
      },
      {
        h: "The tool stack that works",
        list: [
          "Quiz generator — paste notes, get practice tests with explanations and Bloom's levels",
          "Flashcards with spaced repetition — scheduled review so cards ask again right when you'd forget",
          "Summarizer/assistant — turns a 40-page chapter into a study outline you then test yourself on",
          "Analytics — streaks and score trends tell you if you're actually improving, not just busy",
        ],
      },
      {
        h: "The 30-minute AI study session",
        p: [
          "Minutes 0–5: paste your notes and generate a quiz while skimming the source. Minutes 5–15: take the quiz cold, no notes. Minutes 15–25: review every wrong answer's explanation and regenerate flashcards for the failed topics. Minutes 25–30: add the misses to your spaced-repetition schedule for tomorrow.",
          "That single loop — generate, test, drill, schedule — is the closest thing to a universal study method.",
        ],
      },
      {
        h: "What AI still can't do for you",
        p: [
          "It can't decide what matters to you, can't feel which topics are shaky, and can't force you to show up tomorrow. The tool improves the efficiency of your effort — it never replaces it. Students who pair AI generation with honesty about what they don't know are the ones who see results.",
        ],
      },
    ],
    faq: [
      {
        q: "Will AI make me study worse?",
        a: "Only if you use it passively — reading AI outputs instead of testing yourself. Used as a question/flashcard generator with active retrieval, it reliably improves outcomes.",
      },
      {
        q: "Are AI-generated questions accurate?",
        a: "On well-structured source material, yes. Always skim explanations for subtle errors — and treat any unusual claim as something to verify against your notes.",
      },
      {
        q: "What's the best study routine with these tools?",
        a: "Start small: one quiz per lecture, taken the same day, plus scheduled flashcard reviews. Consistency beats intensity — a 30-minute daily loop outperforms a weekend marathon.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}