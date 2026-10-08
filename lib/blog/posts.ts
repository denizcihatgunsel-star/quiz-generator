export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tag: string;
  /** Display date (human) */
  date: string;
  /** ISO-8601 date for Article schema / sitemap lastmod */
  dateIso: string;
  readTime: string;
  sections: { h: string; p?: string[]; list?: string[] }[];
  faq: { q: string; a: string }[];
  /** Internal links to Examina tool pages (rendered as a call-to-action strip) */
  tools?: { href: string; label: string }[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "make-a-quiz-from-your-notes",
    title: "How to Make a Quiz from Your Notes in 60 Seconds",
    description:
      "Why self-testing beats re-reading, and a step-by-step walkthrough of turning any notes into a practice quiz with AI.",
    tag: "Study Tips",
    date: "Jan 2026",
    dateIso: "2026-01-15",
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
          "Want to go further? Learn how to make a study guide from your notes that includes quizzes and flashcards for complete exam prep.",
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
    dateIso: "2026-01-22",
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
          "Ready to put it into practice? Turn your notes into a study set with the AI study guide generator.",
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
    dateIso: "2026-02-05",
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
    dateIso: "2026-02-12",
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
    dateIso: "2026-02-19",
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
    dateIso: "2026-03-05",
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
  {
    slug: "ai-multiple-choice-quiz-maker",
    title: "How to Make a Multiple-Choice Quiz with AI (Distractors That Actually Work)",
    description:
      "The anatomy of a good multiple-choice question, common AI pitfalls, and a repeatable workflow for generating reliable MCQ tests from your notes.",
    tag: "For Educators",
    date: "Mar 2026",
    dateIso: "2026-03-19",
    readTime: "5 min",
    sections: [
      {
        h: "What separates a good multiple-choice question from a bad one",
        p: [
          "A multiple-choice question is only as good as its alternatives. If the wrong answers are obviously wrong, you've built a recognition test — students eliminate the garbage options and can guess the right one, which is why 'multiple guess' quizzes flatter weak preparation.",
          "A strong question presents four options that are all plausible to a partially-prepared student, with one that is unambiguously correct. The distractors should be drawn from real misconceptions, not random filler.",
        ],
      },
      {
        h: "The four parts of a well-built distractor",
        list: [
          "Plausibility — each wrong option must be something a student who half-understands the topic would believe",
          "Misconception anchoring — base distractors on common errors (units, sign, causality, over-generalization)",
          "Similar length and structure to the correct answer — short correct answers next to long distractors are a giveaway",
          "One unambiguous correct answer — never two defensible options",
        ],
      },
      {
        h: "Where AI-generated MCQs trip up",
        p: [
          "Generative models excel at vocabulary but can drift on expert topics: vague distractors, 'all of the above' crutches, or questions that test keyword matching rather than understanding. The fix is review discipline: skim the question set once with an eye for anything you could eliminate on style alone.",
          "That review pass is fast when the generation is structured — Bloom's level and difficulty tags on every question let you spot a lopsided test at a glance.",
        ],
      },
      {
        h: "A repeatable AI workflow",
        p: [
          "Paste the week's lesson or textbook chapter, ask for multiple-choice questions across the Bloom's levels, then skim for distractors and balance. Differentiated version for a second class? Regenerate from the same source — the model re-authors rather than reuses, which also makes it hard for students to memorize a shared question bank.",
          "Want to explore other question types? Learn about writing true or false questions to complement your MCQs.",
        ],
      },
    ],
    faq: [
      {
        q: "How many options should each question have?",
        a: "Three or four. Four is the standard for assessing serious exams; three is fine for quick checks. Fewer than three makes guessing too easy, more than four rarely adds discrimination.",
      },
      {
        q: "Are generated distractors actually plausible?",
        a: "Usually — but they improve with review. Look specifically for options that are obviously wrong and replace or regenerate them, because an implausible distractor turns a 4-option question into a 2-option question.",
      },
      {
        q: "Do the questions map to Bloom's Taxonomy?",
        a: "Yes. Every Examina question carries a Bloom's level and difficulty tag, so you can check whether your quiz tests recall, comprehension, or application.",
      },
    ],
    tools: [
      { href: "/multiple-choice-quiz-maker", label: "Multiple-Choice Quiz Maker" },
      { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
      { href: "/create-a-quiz", label: "Create a Quiz" },
    ],
  },
  {
    slug: "spaced-repetition-schedule",
    title: "The Ultimate Spaced Repetition Schedule (Backed by Research)",
    description:
      "How to build a review schedule that catches forgetting right before it happens — from the first learning session to exam day.",
    tag: "Study Tips",
    date: "Apr 2026",
    dateIso: "2026-04-02",
    readTime: "5 min",
    sections: [
      {
        h: "Why review needs a schedule at all",
        p: [
          "Memory decays on a predictable curve: most of what you learn is gone within days unless it's pulled back. Re-reading briefly flattens the curve; retrieval practice at planned intervals flattens it dramatically. The intervals are the entire game — too long and you've forgotten, too short and you're wasting sessions on material you still know.",
        ],
      },
      {
        h: "A practical interval ladder",
        list: [
          "Same day — first quiz or flashcard pass, 1–2 hours after learning",
          "Day 2 — refresh before it slips; this is when most forgetting would start",
          "Day 4 — second retrieval; correctly answered cards get quiet",
          "Day 7 — weekly review consolidates the week's material",
          "Day 21 — month checkpoint; keeps exam-month material alive",
          "Before the exam — one final pass on the cards you still miss",
        ],
      },
      {
        h: "How the ladder becomes automatic",
        p: [
          "Tracking six intervals by hand works until it doesn't — schedules collapse under a real workload. Spaced-repetition tools mark each card new, learning, or mature and reschedule it automatically based on how you answer, which is exactly how effective review becomes routine rather than willpower.",
        ],
      },
      {
        h: "What actually makes the schedule work",
        p: [
          "Two things: a queue you don't have to think about, and honest grading. If you mark a card 'easy' when you barely recalled it, the schedule lengthens and you'll hit exam week with soft memory. Grade harder than feels comfortable — your future self won't mind the extra pass.",
        ],
      },
    ],
    faq: [
      {
        q: "What intervals should I actually use as a beginner?",
        a: "Start simple: same day, day 2, day 7. Add the day-4 and day-21 rungs once you're consistent. Perfect scheduling beats none by a little; consistent scheduling beats occasional intense sessions by a lot.",
      },
      {
        q: "How many new items per day is realistic?",
        a: "For flashcards, 20–30 new cards a day is a healthy ceiling for most people. More than that and the review backlog doubles quickly and the queue becomes demoralizing.",
      },
      {
        q: "Does Examina schedule reviews for me?",
        a: "Yes — study mode tracks each card's state (new, learning, mature) and schedules the next review automatically, so the ladder above runs itself.",
      },
    ],
    tools: [
      { href: "/study-quiz", label: "Study Quiz" },
      { href: "/flashcard-generator", label: "Flashcard Generator" },
    ],
  },
  {
    slug: "flashcards-vs-quizzes",
    title: "Flashcards vs Quizzes: Which Should You Use to Study?",
    description:
      "Flashcards and quizzes are both retrieval practice — but they test you differently. Here's when to use each and how to combine them.",
    tag: "Study Tips",
    date: "Apr 2026",
    dateIso: "2026-04-16",
    readTime: "4 min",
    sections: [
      {
        h: "Same engine, different gears",
        p: [
          "Both flashcards and quizzes work through retrieval: forcing your brain to reconstruct the answer. That shared mechanism is why both outperform re-reading. The difference is in the size and format of what you're asked to recall.",
          "A flashcard asks one atomic fact. A quiz asks you to reason across multiple facts — context switching, applying a concept to a scenario, or choosing between subtly different claims. One builds precise memory; the other builds flexible understanding.",
        ],
      },
      {
        h: "When flashcards win",
        list: [
          "Vocabulary and definitions — languages, terminology, formulas, dates",
          "Scheduling, because one-fact cards grade cleanly (know it / don't)",
          "High-volume material where a quiz would take too long",
        ],
      },
      {
        h: "When quizzes win",
        list: [
          "After a first pass, when you need to connect ideas rather than recognize terms",
          "Before an exam, to simulate the real task under a little time pressure",
          "Diagnosing what you don't know — missing a connected question reveals a gap a single card can't",
        ],
      },
      {
        h: "The combination that beats either alone",
        p: [
          "Learn with cards, verify with quizzes. Build your vocabulary or fact base with flashcards and spaced repetition, then take a quiz on the same material to see whether your recall survives in context. Re-write the cards you get wrong in the quiz — you've found the boundary of your knowledge, and that's exactly where studying should aim.",
        ],
      },
    ],
    faq: [
      {
        q: "Should I do flashcards or quizzes first?",
        a: "Flashcards first for raw recall, quizzes second to connect the facts. Skipping straight to quizzes on unfamiliar material just turns them into low-confidence guessing.",
      },
      {
        q: "Is quizzing alone enough?",
        a: "For exam-style subjects, mostly — but vocabulary and formulas benefit from the atomic, spaced flashcard format. Using both usually beats choosing one.",
      },
      {
        q: "Can I get both from the same material?",
        a: "Yes — one generation pass produces multiple-choice questions and flashcards from the same source, so you learn and verify against the same content.",
      },
    ],
    tools: [
      { href: "/flashcard-generator", label: "Flashcard Generator" },
      { href: "/study-quiz", label: "Study Quiz" },
      { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
    ],
  },
  {
    slug: "formative-assessment-with-ai",
    title: "Formative Assessment with AI: Quick Checks That Actually Inform Teaching",
    description:
      "Exit tickets, do-nows, and five-minute checks students won't dread — generated in seconds from your lesson content.",
    tag: "For Educators",
    date: "May 2026",
    dateIso: "2026-05-07",
    readTime: "5 min",
    sections: [
      {
        h: "What formative assessment is supposed to do",
        p: [
          "Formative assessment isn't grading — it's signaling. A well-run quick check tells you, mid-lesson, whether the class understood the concept you just taught, so you can slow down, re-teach, or move on. The problem has always been throughput: writing a good check and marking it takes an evening, so most teachers run a fraction of the checks they'd like.",
        ],
      },
      {
        h: "Formats that work without killing your evening",
        list: [
          "Do-nows — three questions from yesterday's lesson to open the period",
          "Exit tickets — two or three items from today's lesson, answered on the way out",
          "Show-me boards — four quick multiple-choice items as a mid-lesson pulse",
          "Leveled checks — one item at Remember, one at Apply, for a 60-second spread read",
        ],
      },
      {
        h: "The five-minute generation workflow",
        p: [
          "Paste the lesson's key points, pick a format from above, and generate. You want a short set with Bloom's levels visible so you can see at a glance whether students got the concept or just the vocabulary. That level breakdown is the difference between 'they were confused' and 'they were lost at application but fine at recall'.",
        ],
      },
      {
        h: "What to do with the results",
        p: [
          "Sort the misses by level, not by who. If the class fails Apply questions but passes Remember, the concept was taught once and never connected — tomorrow's opener should re-model the application, not repeat the definition. If a handful of students miss across all levels, they need a smaller-group conversation. That's the loop AI makes cheap enough to run every day.",
        ],
      },
    ],
    faq: [
      {
        q: "How often should I run formative checks?",
        a: "At least one pulse per lesson — an opener, a midpoint check, or an exit ticket. Daily frequency matters more than length: five minutes every day outperforms a 40-minute quiz once a week.",
      },
      {
        q: "Do students take these with accounts?",
        a: "For live checks, no. Project the quiz and students answer with a join code from any phone — no sign-up, which lowers friction and maximizes participation.",
      },
      {
        q: "Is this free?",
        a: "Examina's free plan covers 5 quizzes a month — plenty for daily checks across a couple of classes. The Team plan is built for educators with unlimited generation and a shared library.",
      },
    ],
    tools: [
      { href: "/for-teachers", label: "For Teachers" },
      { href: "/classroom/join", label: "Classroom Quiz" },
      { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
    ],
  },
  {
    slug: "classroom-quiz-games",
    title: "How to Run a Classroom Quiz Game: Scoring, Teams, and Tech",
    description:
      "A teacher's playbook for live quiz games — join codes, team formats, fairness rules, and pacing tips that keep every student in.",
    tag: "For Educators",
    date: "May 2026",
    dateIso: "2026-05-21",
    readTime: "5 min",
    sections: [
      {
        h: "Why live quiz games engage classes",
        p: [
          "A live quiz game turns retrieval practice into a shared event. The social stakes — speed, teams, the scoreboard — recruit attention that a worksheet can't, and the questions themselves are still doing the retrieval work. Get the format right and students ask for a game before an exam instead of dreading one.",
        ],
      },
      {
        h: "Formats that keep every student in",
        list: [
          "Teams of four with a rotating captain — nobody hides, everyone defends a stake",
          "Individual speed rounds for a quick 5-minute opener",
          "Whole-class with join codes, points awarded for correct-plus-fast",
          "Bracket mode for a Friday review — small teams, single elimination",
        ],
      },
      {
        h: "Pacing and fairness rules",
        p: [
          "Reveal each question, give a countdown, then show the explanation — the explanation pass is what turns the game into study time. For fairness: randomize team composition, assign one reader per team for students who need it, and highlight the scoreboard without shaming low scores. Celebrate the comeback, not just the lead.",
        ],
      },
      {
        h: "The tech setup (it's minimal)",
        p: [
          "You need one display and phones in students' pockets — no accounts, no apps to install. Generate the question set from the week's content, open the room, and students join with a code. The teacher app shows live progress so you can call 'last question' when momentum peaks rather than when the bell rings.",
        ],
      },
    ],
    faq: [
      {
        q: "Do students need to create accounts?",
        a: "No. Classroom games run with a join code from a browser on any device — students enter a nickname and play.",
      },
      {
        q: "Does it work on phones, tablets, and laptops?",
        a: "Yes — the player experience runs in the browser, so mixed-device classrooms are fine. Only the host needs an adequate display.",
      },
      {
        q: "Is the game feature free?",
        a: "Classroom quizzing is part of the free tier, and the Team plan adds unlimited question generation and a shared question library across teachers.",
      },
    ],
    tools: [
      { href: "/classroom/join", label: "Classroom Quiz" },
      { href: "/for-teachers", label: "For Teachers" },
      { href: "/create-a-quiz", label: "Create a Quiz" },
    ],
  },
  {
    slug: "language-learning-with-ai-flashcards",
    title: "Learn a Language with AI Flashcards: A System That Actually Works",
    description:
      "How to turn vocabulary into effective flashcards — and use AI-generated practice sentences to move from recognition to real recall.",
    tag: "Study Tips",
    date: "Jun 2026",
    dateIso: "2026-06-04",
    readTime: "5 min",
    sections: [
      {
        h: "Why vocabulary decks fail",
        p: [
          "Most learners quit their flashcard app for the same reason: recognition becomes a reflex while recall stays weak. See the L2 word, nudge the memory, 'flash' — but ask them to produce the word from the L1 meaning and it's gone. Language memory built only on recognition is exactly the wrong kind.",
        ],
      },
      {
        h: "How to build language flashcards right",
        list: [
          "Front in the language you struggle with; use it both directions",
          "One word or phrase per card, with one meaning — no synonym decks",
          "Add a sentence-level example the first time you miss the card",
          "Prefer word-in-context cards (fill the gap) over isolated word pairs once the basics stick",
        ],
      },
      {
        h: "Add retrieval sentences to break the recognition reflex",
        p: [
          "The upgrade is context. Generate sample sentences for each card in your target language, then quiz yourself sentence-in, production-out: given a scenario in your native language, produce the target-language sentence. You're no longer recognizing a word; you're retrieving a construction, which is the skill actual conversation needs.",
        ],
      },
      {
        h: "The full system in two passes a day",
        p: [
          "Pass one: scheduled cards only — five minutes, honest grading. Pass two: one fresh mini-generation on the day's theme, then add its sentences back into the deck for tomorrow. That's a loop that compounds: the deck grows, the schedule keeps it reviewed, and every miss becomes a sentence to practice. Languages are vocabulary plus pattern; this system maintains both.",
        ],
      },
    ],
    faq: [
      {
        q: "Does it generate cards in my target language?",
        a: "Yes — Examina generates questions and flashcards in 29 languages, including example sentences, so your deck matches the language you're actually learning.",
      },
      {
        q: "How many new cards per day?",
        a: "20 new cards daily with reviews is sustainable for most learners. Language decks benefit from production practice, so keep the review queue small and the quality high.",
      },
      {
        q: "Does this help with grammar, or just vocabulary?",
        a: "Vocabulary first; grammar second. Context sentences expose common patterns (gender agreement, verb regimes) far faster than word-pair decks, and cloze-style cards train the structures themselves.",
      },
    ],
    tools: [
      { href: "/flashcard-generator", label: "Flashcard Generator" },
      { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
      { href: "/quiz-generator-from-pdf", label: "Quiz from PDF" },
    ],
  },
  {
    slug: "how-to-write-true-or-false-questions",
    title: "How to Write True or False Questions (With Examples)",
    description: "Learn how to write true or false questions that test real understanding: 8 rules, good vs bad examples, a free template, and a faster way with AI.",
    tag: "Study Tips",
    date: "Oct 2026",
    dateIso: "2026-10-05",
    readTime: "6 min",
    sections: [
      {
        h: "Introduction",
        p: [
          "True or false questions look like the easiest thing in the world to write. One sentence, two possible answers, done. But anyone who has taken a badly written true/false test knows the problem: you can often guess the answer from the wording alone. A good true/false question tests what someone knows. A bad one tests how well they read test-writers' habits.",
          "This guide shows you how to make true or false questions that are fair, clear and actually useful, with good and bad examples for each rule and a template you can copy.",
        ],
      },
      {
        h: "When true/false questions are the right choice",
        list: [
          "Quick checks of facts such as dates, definitions and cause and effect.",
          "Surfacing misconceptions. A false statement built around a common mistake shows instantly who still believes it.",
          "Warm-ups and reading checks. Students can answer ten in a couple of minutes.",
        ],
        p: [
          "They're weaker for testing complex reasoning, and a student has a 50% chance of guessing right. So use them alongside other formats such as multiple choice, fill-in-the-blank and short answer, not instead of them.",
        ],
      },
      {
        h: "8 rules for writing good true or false questions",
        p: [
          "1. Test one idea per statement. If a statement contains two claims, one might be true and the other false, and the student can't answer honestly. ❌ The heart has four chambers and pumps blood only to the lungs. ✅ The human heart has four chambers. (True) ✅ The right ventricle pumps blood to the lungs. (True)",
          "2. Avoid absolute and hedge words that give it away. \"Always\", \"never\", \"all\" and \"none\" are usually false; \"often\", \"usually\" and \"may\" are usually true. Test-savvy students know this. ❌ Metals are always solid at room temperature. (Students guess \"false\" from \"always\".) ✅ Mercury is a metal that is liquid at room temperature. (True)",
          "3. Make the false statements plausible. A false statement should be wrong in one meaningful way: a changed number, a swapped cause, a reversed direction. It shouldn't be absurd. ❌ World War II ended in 1066. ✅ World War II ended in 1918. (False. That's WWI; it tests whether students mix up the two.)",
          "4. Don't use double negatives. ❌ It is not true that plants do not need sunlight. ✅ Plants need light to carry out photosynthesis. (True)",
          "5. Keep true and false items a similar length. Writers tend to add qualifiers to make true statements precise, so long statements end up true more often. Watch for it.",
          "6. Base each statement on the material, not trivia. Ask: \"Would understanding this lesson help someone answer this?\" If the answer depends on a footnote or a trick of phrasing, rewrite it.",
          "7. Balance the answer key. Aim for roughly half true and half false, in no predictable pattern (not T, F, T, F…).",
          "8. Add a one-line explanation. \"False: oxygen is a product, not a reactant\" turns a mark into a lesson. This matters most in self-study.",
        ],
      },
      {
        h: "A true and false quiz template you can copy",
        p: [
          "Title: __________________ Class/Topic: __________ Date: ______",
          "Directions: Write T if the statement is true and F if it is false.",
          "1. ______________________________________ ___",
          "2. ______________________________________ ___",
          "3. ______________________________________ ___",
          "Answer key + explanations",
          "1. __ because ____________________________",
          "2. __ because ____________________________",
          "Variation: \"correct the false ones.\" Ask students to rewrite every false statement so it becomes true. This removes the 50% guessing advantage and checks real understanding.",
        ],
      },
      {
        h: "Worked example: from notes to questions",
        p: [
          "Say your notes read: \"The water cycle is driven by the sun. Water evaporates from oceans, condenses into clouds, and falls as precipitation. Transpiration from plants also adds water vapor to the air.\"",
          "Statements you could write:",
          "1. The sun provides the energy that drives the water cycle. (T)",
          "2. Condensation is the process of water vapor turning into liquid droplets. (T)",
          "3. Precipitation is how water vapor enters the atmosphere. (F: that's evaporation and transpiration.)",
          "4. Plants add water vapor to the air through transpiration. (T)",
          "5. Clouds form when liquid water evaporates directly into ice crystals. (F: clouds form through condensation.)",
          "Notice each one tests a single idea from the notes, and the false ones swap a real term for a related but wrong one.",
        ],
      },
      {
        h: "How to make true or false questions faster with AI",
        p: [
          "Writing twenty balanced, well-worded statements by hand takes a while. An AI tool can do the first draft for you. With Examina's true or false quiz generator, you paste notes (or upload a PDF, TXT or Markdown file) and get true/false questions with the correct answer and an explanation for each. Every question is tagged with a Bloom's taxonomy level, so you can tell recall items from understanding items.",
          "Whatever tool you use, run its output through the 8 rules above. They work just as well as an editing checklist.",
        ],
      },
    ],
    faq: [
      {
        q: "How many true/false questions should a quiz have?",
        a: "For a quick check, 5–10 is enough. Because of guessing, use more items (or mix formats) when the score really matters.",
      },
      {
        q: "Should I use \"always\" and \"never\"?",
        a: "Only when the absolute is the point being tested, and then use them in both true and false items.",
      },
      {
        q: "How do I stop students from guessing?",
        a: "Ask them to correct false statements, mix in other question types, and keep a balanced, random answer key.",
      },
    ],
    tools: [
      { href: "/true-false-quiz-generator", label: "True/False Quiz Generator" },
      { href: "/notes-to-quiz", label: "Notes to Quiz" },
      { href: "/quiz-generator-from-pdf", label: "PDF Quiz Generator" },
      { href: "/ai-flashcards", label: "AI Flashcards" },
    ],
  },
  {
    slug: "how-to-make-a-study-guide-from-notes",
    title: "How to Make a Study Guide from Your Notes (Fast)",
    description: "A fast, step-by-step way to turn messy notes into a study guide that tests you: pick key ideas, write questions, make flashcards, and review on a schedule.",
    tag: "Study Tips",
    date: "Oct 2026",
    dateIso: "2026-10-05",
    readTime: "7 min",
    sections: [
      {
        h: "Introduction",
        p: [
          "You have weeks of notes, an exam coming up, and no idea where to start. Making a study guide is the classic answer, but many students spend hours rewriting notes into a prettier version of the same notes, then read it and feel ready, until the exam.",
          "The fix is to build a study guide that asks you questions instead of just restating information. Here's a fast method that works on paper, in a doc, or with an AI tool.",
        ],
      },
      {
        h: "Step 1: Collect and trim (10 minutes)",
        p: [
          "Gather everything for one exam or one unit: lecture notes, slides, handouts, the chapters you were assigned. Then cut.",
        ],
        list: [
          "Remove anything your teacher said won't be tested.",
          "Group the rest into 3–6 topics (for example \"Cell structure\", \"Photosynthesis\", \"Respiration\").",
          "Under each topic, list the 5–10 ideas you'd be embarrassed to get wrong. That list is the skeleton of your study guide.",
        ],
      },
      {
        h: "Step 2: Turn each key idea into a question (20 minutes)",
        p: [
          "This is the step that makes a study guide work. For every key idea, write at least one question you'd have to answer from memory. Use different formats:",
        ],
        list: [
          "Definition → flashcard. Front: What is osmosis? Back: Movement of water across a semi-permeable membrane from lower to higher solute concentration.",
          "Fact → true/false. Osmosis requires energy from ATP. (False: it's passive.)",
          "Key term → fill-in-the-blank. The ______ is the powerhouse of the cell.",
          "Concept → multiple choice. Which process produces the most ATP? (a) glycolysis (b) Krebs cycle (c) electron transport chain (d) fermentation.",
          "Big idea → \"explain\" question. Explain why a cell placed in salt water shrinks.",
          "Aim to mix easy recall questions with \"why\" and \"how\" questions. Bloom's taxonomy is a useful checklist here: remember, understand, apply, analyze. Our post on Bloom's taxonomy for quizzes has examples at each level.",
        ],
      },
      {
        h: "Step 3: Add answers, but hide them",
        p: [
          "Put answers on the back of the card, at the bottom of the page, or in a separate column you can fold over. If you can see the answer while reading the question, you're not studying. You're re-reading.",
        ],
      },
      {
        h: "Step 4: Test yourself and mark what you miss",
        p: [
          "Go through the whole guide once without looking. Mark every question you got wrong or hesitated on. That's your real study list, usually a third of the original or less. This is active recall, and it's far more effective than highlighting.",
        ],
      },
      {
        h: "Step 5: Review on a schedule",
        p: [
          "Revisit the missed questions the next day, then a few days later, then right before the exam. Spacing reviews out beats cramming. Here's a simple spaced repetition schedule you can follow.",
        ],
      },
      {
        h: "Example: one page of notes → study guide",
        p: [
          "Notes (history): The Industrial Revolution began in Britain in the late 18th century. Key drivers: coal, iron, the steam engine (improved by James Watt), and the factory system in textiles. It led to rapid urbanization and new working conditions, including child labor.",
          "Study guide:",
        ],
        list: [
          "Flashcard: Where did the Industrial Revolution begin? → Britain, late 18th century.",
          "True/false: James Watt invented the first steam engine. → False: he significantly improved it.",
          "Fill-in-the-blank: The ______ system transformed textile production. → factory",
          "Multiple choice: Which was NOT a key driver? (a) coal (b) iron (c) electricity grids (d) steam power → (c)",
          "Explain: Why did the Industrial Revolution cause urbanization?",
          "Five questions from four sentences. That's the ratio to aim for.",
        ],
      },
      {
        h: "Common mistakes to avoid",
        list: [
          "Copying notes word for word. If it isn't a question, it isn't testing you.",
          "Making it too pretty. Colors and fonts eat time you could spend recalling.",
          "Only easy questions. If you get 100% on the first try, write harder ones.",
          "Building it the night before. The guide is a tool for several review sessions, not one.",
        ],
      },
      {
        h: "The fast way: use an AI study guide maker",
        p: [
          "Steps 2 and 3 take the most time. That's where AI helps. With Examina's study guide generator, you paste your notes (or upload a PDF, TXT or Markdown file) and get quiz questions and flashcards with answers and explanations, each tagged with a Bloom's level. It doesn't write a summary document. It gives you the question-based study set that steps 2–4 describe, so you can go straight to testing yourself.",
          "You can also pick a single format: AI flashcards for terms and definitions, True/false quiz generator for quick fact checks, Fill-in-the-blank generator for key vocabulary, Multiple choice quiz maker for exam-style practice, Quiz generator from PDF if your notes are slides or handouts.",
          "Then do steps 4 and 5 yourself: test, mark, and review on a schedule.",
        ],
      },
    ],
    faq: [
      {
        q: "How long should a study guide be?",
        a: "As long as your list of key ideas. For one unit, 20–50 questions is typical.",
      },
      {
        q: "Should I handwrite or type it?",
        a: "Either works. What matters is that it's question-based and you test yourself with it.",
      },
      {
        q: "Can AI make a study guide for me?",
        a: "AI can draft the questions and flashcards from your notes in seconds. You still need to check them against your material and actually test yourself.",
      },
    ],
    tools: [
      { href: "/study-guide-generator", label: "Study Guide Generator" },
      { href: "/ai-flashcards", label: "AI Flashcards" },
      { href: "/true-false-quiz-generator", label: "True/False Quiz Generator" },
      { href: "/fill-in-the-blank-generator", label: "Fill-in-the-Blank Generator" },
      { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Quiz Maker" },
      { href: "/quiz-generator-from-pdf", label: "Quiz from PDF" },
    ],
  },
  {
    slug: "kahoot-alternatives-2026",
    title: "Best Kahoot Alternatives 2026 — Free & Paid Quiz Platforms Compared",
    description:
      "Looking for a Kahoot alternative? Compare the top quiz platforms for teachers—features, pricing, AI generation, and live classroom modes.",
    tag: "For Educators",
    date: "Oct 2026",
    dateIso: "2026-10-06",
    readTime: "8 min",
    sections: [
      {
        h: "Why look for a Kahoot alternative?",
        p: [
          "Kahoot brought game-based learning to millions of classrooms, and it's still a solid choice. But it has limitations: creating quizzes is manual (you type every question), the free tier shows ads, and pricing jumps quickly for schools. If you're running daily formative assessments across multiple preps, those friction points add up.",
          "The good news: there are now strong alternatives that solve Kahoot's pain points. Some offer AI question generation (no more typing every question by hand). Others focus on better free tiers, self-paced modes, or deeper analytics. This guide compares the top platforms for teachers in 2026.",
        ],
      },
      {
        h: "What to look for in a Kahoot alternative",
        list: [
          "Question creation speed — Can you import, generate, or reuse questions, or do you type everything from scratch?",
          "Live vs. self-paced — Does it support synchronous classroom games, asynchronous homework, or both?",
          "Pricing — What does the free tier include, and what do you give up if you don't pay?",
          "Student experience — Do students need accounts? How many devices/platforms does it support?",
          "Analytics — Can you see which questions tripped up the class, or just overall scores?",
        ],
      },
      {
        h: "Top Kahoot alternatives for 2026",
        p: [
          "**Examina** — AI-powered quiz generator with live classroom mode. Upload your lesson notes and Examina writes the questions for you (multiple choice, true/false, fill-in-the-blank). Students join with a code, no accounts needed. Free tier: 5 quizzes/month. Team plan: $15/month for unlimited quizzes and 5 teachers. Best for: teachers who want to skip manual question entry and run daily formative checks.",
          "**Quizizz** — Self-paced and live quiz platform. Students work at their own speed even in live mode. Strong question bank and reports. Free tier has ads; paid plans start at $19/month per teacher. Best for: mixed live/homework workflows and classes that need differentiated pacing.",
          "**Blooket** — Game-style quiz platform with multiple game modes (Tower Defense, Gold Quest, etc.). Very engaging for younger students. Free tier is generous. Paid ($36/year) adds question sets and more game modes. Best for: elementary/middle school engagement.",
          "**Gimkit** — Live quiz platform where students earn in-game currency and buy upgrades. High engagement. Created by a high school student, now widely used. Free tier limited; paid is $60/year per teacher. Best for: high engagement in competitive classrooms.",
          "**Quizlet Live** — Team-based quiz game from the flashcard platform. Students work in groups. Requires existing Quizlet sets. Free with Quizlet account. Best for: schools already using Quizlet for flashcards.",
          "**Formative** — Real-time formative assessment platform. Not as game-like as Kahoot, but deeper analytics and question types (including drawing/audio). Free tier available; premium starts at $12/month. Best for: teachers who want detailed diagnostics over gamification.",
        ],
      },
      {
        h: "Feature comparison table",
        p: [
          "| Platform | AI Generation | Free Tier | Live Mode | Self-Paced | Starting Price |",
          "|----------|--------------|-----------|-----------|------------|----------------|",
          "| Examina | ✅ Yes | 5 quizzes/month | ✅ Yes | ✅ Yes | $2/mo (Starter) |",
          "| Quizizz | ❌ No | Yes (with ads) | ✅ Yes | ✅ Yes | $19/mo/teacher |",
          "| Blooket | ❌ No | Generous | ✅ Yes | ❌ Live only | $36/year |",
          "| Gimkit | ❌ No | Limited | ✅ Yes | ❌ Live only | $60/year |",
          "| Quizlet Live | ❌ No | Yes | ✅ Yes | ❌ Live only | Free |",
          "| Formative | ❌ No | Yes | ✅ Yes | ✅ Yes | $12/mo |",
        ],
      },
      {
        h: "Which one should you choose?",
        p: [
          "If you're tired of typing questions: **Examina**. Upload lesson notes and AI writes the questions. Huge time saver for daily use.",
          "If you need self-paced homework + live games: **Quizizz** or **Examina**. Both support async and sync modes.",
          "If engagement is everything and budget is tight: **Blooket** or **Quizlet Live**. Both have strong free tiers and high student engagement.",
          "If you want deep diagnostics: **Formative**. Best analytics of the group, but less game-like.",
          "If you're all-in on Quizlet already: **Quizlet Live**. Natural extension if students are already using flashcard sets.",
        ],
      },
      {
        h: "How to switch from Kahoot",
        p: [
          "Export your Kahoot questions (download as spreadsheet). Most alternatives let you import or copy-paste from CSV/Excel. For platforms with AI generation like Examina, you can also just upload the source material (lesson notes, slides) and regenerate the questions—often faster than importing.",
          "Run a trial game with a single class before rolling out school-wide. Students adapt quickly (join codes work the same way across platforms), but you'll want to confirm your workflow works.",
        ],
      },
    ],
    faq: [
      {
        q: "Is there a completely free Kahoot alternative?",
        a: "Quizlet Live and Blooket have strong free tiers. Examina offers 5 AI-generated quizzes per month free—enough for trying it out or occasional use.",
      },
      {
        q: "Which alternative is closest to Kahoot?",
        a: "Blooket and Gimkit have similar live game energy. Examina and Quizizz add self-paced modes on top of live.",
      },
      {
        q: "Do students need accounts?",
        a: "For live games: no accounts needed on Examina, Kahoot, Quizizz, Blooket, or Gimkit. Students just enter a join code.",
      },
    ],
    tools: [
      { href: "/alternatives/kahoot", label: "Kahoot Alternative" },
      { href: "/alternatives/quizizz", label: "Quizizz Alternative" },
      { href: "/for-teachers", label: "For Teachers" },
      { href: "/features/live-classroom-quiz", label: "Live Classroom Quiz" },
      { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
    ],
  },
  {
    slug: "pdf-to-quiz-guide",
    title: "How to Convert PDF to Quiz — Complete Guide with AI (2026)",
    description:
      "Turn any PDF into a quiz in minutes. Step-by-step guide to converting lecture notes, textbook chapters, and study guides into practice questions.",
    tag: "Study Tips",
    date: "Oct 2026",
    dateIso: "2026-10-06",
    readTime: "7 min",
    sections: [
      {
        h: "Why convert PDFs to quizzes?",
        p: [
          "You have lecture slides as PDFs, textbook chapters saved as PDFs, scanned notes as PDFs. Reading them prepares you, sure—but testing yourself on them is what makes the material stick. Turning a PDF into a quiz forces active recall, the single most effective study technique.",
          "The old way: read the PDF, write questions by hand, make an answer key. The new way: upload the PDF and let AI generate the questions. This guide shows you how.",
        ],
      },
      {
        h: "Method 1: AI PDF to quiz generators (fastest)",
        p: [
          "AI quiz generators read your PDF and write questions automatically. Upload a file, pick question types, and get a complete quiz with answer key in under 30 seconds.",
          "**How to use Examina for PDF to quiz:** Go to Examina and create a free account (5 quizzes/month, no credit card). Click 'Upload' and select your PDF (up to 15,000 characters, roughly 5-10 pages). Choose question types: multiple choice, true/false, fill-in-the-blank, or flashcards. Click 'Generate.' In 20-30 seconds, you get questions with answers and explanations. Review the quiz. Edit any question if needed. Take it online, share by link, or export as PDF.",
          "**Pros:** Fastest method by far. Automatically generates plausible distractors for multiple choice. Includes Bloom's taxonomy tagging.",
          "**Cons:** Requires a tool subscription after free tier (but cheap—starts at $2/month). Questions should be reviewed for accuracy (like any AI output).",
        ],
      },
      {
        h: "Method 2: Copy-paste from PDF into quiz tools",
        p: [
          "If your PDF is text-selectable (not a scanned image), you can copy the content and paste it into quiz platforms like Google Forms, Quizlet, or Kahoot. Then type questions manually based on the content.",
          "This works, but it's slow—you're still writing every question by hand. Only worth it if you need a very small quiz (3-5 questions) or your PDF is short.",
        ],
      },
      {
        h: "Method 3: OCR for scanned PDFs",
        p: [
          "If your PDF is a scanned image (like a photographed textbook page), you need OCR (optical character recognition) to extract the text first.",
          "**Steps:** Use a free OCR tool like Adobe Acrobat, Google Drive (upload and 'Open with Google Docs'), or an online OCR service. Copy the extracted text. Paste it into an AI quiz generator (like Examina) or a quiz platform.",
          "Examina also has built-in OCR—just upload a photo of notes and it extracts text automatically before generating questions.",
        ],
      },
      {
        h: "Best practices for PDF to quiz conversion",
        list: [
          "Use focused PDFs — one chapter or topic per quiz. A 50-page textbook PDF will hit character limits and produce scattered questions.",
          "Check question accuracy — AI gets most things right, but always skim the output. Look for questions where the 'correct' answer is ambiguous.",
          "Mix question types — Multiple choice tests recognition; fill-in-the-blank tests recall. Use both for stronger practice.",
          "Add your own questions — AI generates from content it sees. If you know a concept students struggle with, add a manual question for it.",
        ],
      },
      {
        h: "Tools comparison: PDF to quiz",
        p: [
          "| Tool | AI Generation | PDF Support | Free Tier | Price |",
          "|------|--------------|-------------|-----------|-------|",
          "| **Examina** | ✅ Yes | ✅ Native upload | 5/month | $2/mo for 20 |",
          "| **Quizlet** | ❌ No | Copy-paste only | ✅ Yes | $8/mo Plus |",
          "| **Google Forms** | ❌ No | Copy-paste only | ✅ Yes | Free |",
          "| **Kahoot** | ❌ No | Copy-paste only | ✅ Limited | $10/mo+ |",
          "| **PDF to Text tools** | N/A (OCR only) | ✅ Yes | Varies | Free-$5/mo |",
        ],
      },
      {
        h: "Common issues and fixes",
        p: [
          "**Issue:** PDF is scanned and text won't copy. **Fix:** Use OCR (Google Drive, Adobe, or a tool with built-in OCR like Examina).",
          "**Issue:** Questions are too easy or too hard. **Fix:** Adjust difficulty setting in the AI tool, or manually edit questions after generation.",
          "**Issue:** Quiz only covers first few pages of PDF. **Fix:** Most tools have character limits (Examina: 15,000 chars). Break long PDFs into chunks.",
          "**Issue:** AI-generated questions seem off-topic. **Fix:** Make sure the PDF has clear, structured text. Heavily formatted or image-heavy PDFs confuse extraction.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I convert a 100-page PDF to quiz?",
        a: "Not all at once. Most tools process 5-15 pages per generation. Break the PDF into chapters and generate a quiz per chapter.",
      },
      {
        q: "Is PDF to quiz free?",
        a: "Examina offers 5 free quizzes/month. Google Forms is free but requires manual question writing. Quizlet is free with ads.",
      },
      {
        q: "Does it work with scanned PDFs?",
        a: "Yes, if you use OCR to extract text first. Examina has built-in OCR for photos, which works for scanned PDFs too.",
      },
      {
        q: "How accurate are AI-generated questions?",
        a: "Usually 85-95% accurate on well-structured content. Always review questions before using them for grades.",
      },
    ],
    tools: [
      { href: "/quiz-generator-from-pdf", label: "PDF to Quiz Generator" },
      { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
      { href: "/notes-to-quiz", label: "Notes to Quiz" },
      { href: "/es/generador-quiz-pdf", label: "Generador PDF (ES)" },
      { href: "/study-guide-generator", label: "Study Guide Generator" },
    ],
  },
  {
    slug: "quizlet-alternatives",
    title: "Best Free Quizlet Alternatives 2026 — AI Flashcards & Study Tools Compared",
    description:
      "Looking for a free Quizlet alternative? Compare AI flashcard generators, quiz tools, and study platforms—features, pricing, and which one to choose.",
    tag: "Study Tips",
    date: "Oct 2026",
    dateIso: "2026-10-06",
    readTime: "8 min",
    sections: [
      {
        h: "Why look for a Quizlet alternative?",
        p: [
          "Quizlet is the most popular flashcard platform for a reason: it's easy to use, has a huge library of user-generated sets, and the free tier is real. But it has pain points. Creating sets is still manual (you type every card by hand). The free tier shows ads. Quizlet Plus is $8/month, which adds up for students. And searching user-generated content is hit-or-miss—sometimes you find a perfect set, often you find one with errors or missing content.",
          "In 2026, there are now strong alternatives. Some offer AI flashcard generation (upload notes, get cards automatically). Others focus on better free tiers or features Quizlet locks behind Plus. This guide compares the top options.",
        ],
      },
      {
        h: "What to look for in a Quizlet alternative",
        list: [
          "Flashcard creation speed — Can you generate cards from notes, or do you type them all by hand?",
          "Study modes — Does it offer spaced repetition, matching games, tests, or just flip-through?",
          "Free tier — What do you get for free, and what's locked behind a paywall?",
          "Multi-format support — Can you turn the same content into quizzes, too, or just flashcards?",
          "Quality control — Are you making your own sets (higher quality) or searching user-generated ones (hit or miss)?",
        ],
      },
      {
        h: "Top Quizlet alternatives for 2026",
        p: [
          "**Examina** — AI flashcard and quiz generator. Upload notes or a PDF and get flashcards + multiple choice + true/false questions from the same source. Study mode uses spaced repetition. Free: 5 generations/month. Paid: $2/month for 20. Best for: students who want to skip typing cards and need quizzes + flashcards together.",
          "**Anki** — The gold standard for spaced repetition. Powerful, customizable, free on desktop (iOS is $25 one-time). Steep learning curve. You type cards manually or import from CSV. Best for: serious students willing to invest time in setup for maximum retention.",
          "**Knowt** — Free flashcard platform with AI generation from notes and quizzes. Also converts Quizlet sets. Very generous free tier. Best for: students who want AI flashcards but don't need advanced analytics.",
          "**Brainscape** — Confidence-based spaced repetition. You rate how well you know each card. Huge marketplace of pre-made decks. Free tier limited; Pro is $10/month or $40/year. Best for: students using popular exam prep (MCAT, NCLEX, bar exam) with existing Brainscape decks.",
          "**RemNote** — Combines note-taking and flashcard generation. Turn any note into a flashcard by highlighting. Free for students. Best for: students who want flashcards embedded in their note-taking workflow.",
          "**Mochi** — Markdown-based flashcards with spaced repetition. Free and open-source. Very customizable. Best for: students comfortable with Markdown who want a lightweight, offline-first tool.",
        ],
      },
      {
        h: "Feature comparison table",
        p: [
          "| Platform | AI Generation | Spaced Repetition | Free Tier | Also Does Quizzes | Price |",
          "|----------|--------------|-------------------|-----------|-------------------|-------|",
          "| Examina | ✅ Yes | ✅ Yes | 5/month | ✅ Yes | $2/mo |",
          "| Anki | ❌ No | ✅ Yes (best) | ✅ Yes (desktop) | ❌ No | Free (desktop) |",
          "| Knowt | ✅ Yes | ✅ Yes | ✅ Generous | ✅ Yes | Free |",
          "| Brainscape | ❌ No | ✅ Yes | ✅ Limited | ❌ No | $10/mo |",
          "| RemNote | Partial | ✅ Yes | ✅ Yes | ❌ No | Free for students |",
          "| Mochi | ❌ No | ✅ Yes | ✅ Yes | ❌ No | Free |",
        ],
      },
      {
        h: "Which Quizlet alternative should you choose?",
        p: [
          "**If you want to skip typing cards:** Examina or Knowt. Both have AI generation from notes.",
          "**If you're studying for a big standardized test (MCAT, NCLEX, bar exam):** Brainscape. Pre-made decks exist and are highly rated.",
          "**If you want the most powerful spaced repetition:** Anki. It's free, works offline, and has decades of research behind it. But the learning curve is real.",
          "**If you want flashcards + quizzes together:** Examina. One upload gets you both, which is faster than managing separate tools.",
          "**If you're budget-conscious:** Knowt (generous free tier), Anki (free on desktop), or Mochi (open-source, free forever).",
          "**If you take notes in Markdown or Notion:** RemNote or Mochi. Flashcards live alongside your notes.",
        ],
      },
      {
        h: "How to migrate from Quizlet",
        p: [
          "Most alternatives let you import Quizlet sets. **To Examina:** Export your Quizlet set as text or CSV. Paste it into Examina or just upload new notes and regenerate with AI. **To Anki:** Use the AnkiWeb add-on 'Quizlet to Anki Importer' or export Quizlet as CSV and import to Anki. **To Knowt:** Knowt has a built-in Quizlet importer. Paste the Quizlet URL and it converts the set. **To Brainscape:** Brainscape can import from spreadsheet. Export Quizlet, upload CSV.",
          "Alternatively, if your Quizlet sets are old or have errors, regenerating fresh flashcards from your current notes (using an AI tool) often beats importing.",
        ],
      },
    ],
    faq: [
      {
        q: "Is there a completely free Quizlet alternative?",
        a: "Yes. Anki (desktop), Mochi, and Knowt all have strong free tiers. Examina offers 5 free AI generations per month.",
      },
      {
        q: "Which alternative is most like Quizlet?",
        a: "Knowt is the closest—AI generation, free tier, and quiz modes. Examina is similar but focuses more on quizzes + flashcards together.",
      },
      {
        q: "Can I import my Quizlet sets?",
        a: "Yes. Most alternatives support CSV import. Knowt can import directly from a Quizlet URL.",
      },
      {
        q: "Is Anki really better than Quizlet?",
        a: "For spaced repetition and long-term retention, yes. But the UI is less polished and setup takes time.",
      },
    ],
    tools: [
      { href: "/alternatives/quizlet", label: "Quizlet Alternative" },
      { href: "/ai-flashcards", label: "AI Flashcards" },
      { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
      { href: "/study-guide-generator", label: "Study Guide Generator" },
      { href: "/for-students", label: "For Students" },
    ],
  },
  {
    slug: "exit-ticket-ideas",
    title: "50 Exit Ticket Ideas Teachers Can Use Tomorrow",
    description:
      "Exit ticket ideas for every subject and grade level. Examples, templates, and how to generate exit tickets with AI in under 30 seconds.",
    tag: "For Educators",
    date: "Oct 2026",
    dateIso: "2026-10-08",
    readTime: "9 min",
    sections: [
      {
        h: "What is an exit ticket?",
        p: [
          "An exit ticket is a short formative assessment students complete at the end of a lesson. It's called an exit ticket because students hand it in (or submit it) before leaving class—like showing a ticket to exit.",
          "The goal isn't grading. It's feedback: did the class understand today's lesson, or do you need to re-teach tomorrow? A good exit ticket takes 3-5 minutes and reveals gaps before they become test failures.",
        ],
      },
      {
        h: "Why exit tickets work",
        list: [
          "They're quick — 2-3 questions max, completed in the last 5 minutes of class",
          "They're low-stakes — formative assessment, not for grades",
          "They reveal gaps immediately — you see which concepts landed and which didn't before moving on",
          "They force retrieval — students can't just nod along; they have to produce an answer",
        ],
      },
      {
        h: "50 exit ticket ideas by type",
        p: [
          "**Quick recall (Remember level)**",
          "1. List 3 key terms from today's lesson",
          "2. Define [concept] in your own words",
          "3. What is the formula for [calculation]?",
          "4. Name the 3 branches of government",
          "5. What year did [historical event] occur?",
          "**Comprehension (Understand level)**",
          "6. Explain why [process] happens",
          "7. What's the difference between [term A] and [term B]?",
          "8. Summarize today's lesson in one sentence",
          "9. How does [concept] relate to [other concept]?",
          "10. Why is [fact] important?",
          "**Application (Apply level)**",
          "11. Solve this problem: [similar to today's example but with different numbers]",
          "12. Give an example of [concept] in real life",
          "13. If [scenario], what would happen?",
          "14. Use [vocab word] in a sentence",
          "15. Draw a diagram showing [process]",
          "**Analysis & Evaluation**",
          "16. Which concept from today was hardest? Why?",
          "17. What question do you still have about [topic]?",
          "18. Compare [method A] and [method B]. Which is better and why?",
          "19. What mistake do you think students might make on this topic?",
          "20. Rate your understanding 1-5. What would move you to a 5?",
          "**Self-assessment prompts**",
          "21. One thing I learned today:",
          "22. One thing I'm still confused about:",
          "23. A question I'd like answered next class:",
          "24. How confident am I (1-5) with today's material?",
          "25. The concept I need to review is:",
          "**Subject-specific: Math**",
          "26. Solve: [1-step problem from today's lesson]",
          "27. Explain how you'd solve [word problem]",
          "28. What's the first step in [procedure]?",
          "29. Check this work and explain the error: [worked example with mistake]",
          "30. Write a word problem for [equation]",
          "**Subject-specific: Science**",
          "31. Draw and label [structure or cycle]",
          "32. Predict what would happen if [variable changed]",
          "33. Explain the relationship between [concept A] and [concept B]",
          "34. What evidence supports [scientific claim]?",
          "35. Design an experiment to test [hypothesis]",
          "**Subject-specific: English/Language Arts**",
          "36. Identify the theme of [today's reading]",
          "37. Find an example of [literary device] in the text",
          "38. Write one strong thesis statement for [prompt]",
          "39. Correct these sentences: [2-3 sentences with grammar errors]",
          "40. What does [vocabulary word] mean? Use context clues.",
          "**Subject-specific: History/Social Studies**",
          "41. What caused [historical event]?",
          "42. Compare [time period A] to [time period B]",
          "43. How did [event] affect [group of people]?",
          "44. What evidence supports [historical claim]?",
          "45. If you were [historical figure], what would you have done differently?",
          "**Creative & engagement prompts**",
          "46. Draw an emoji that represents today's lesson. Why?",
          "47. Teach today's concept to a 5-year-old in 2 sentences",
          "48. Write a tweet (280 characters) summarizing the lesson",
          "49. What real-world job uses today's skill?",
          "50. If this lesson were a movie, what would the title be?",
        ],
      },
      {
        h: "How to actually use exit tickets (the logistics)",
        p: [
          "**Paper method**: Print 30 copies of 3 questions. Students write answers and drop them in a basket on the way out. Sort by correctness at your desk in 5 minutes.",
          "**Digital method**: Project 2-3 questions. Students submit via Google Form, Examina join code, or class LMS before leaving. Review responses that evening.",
          "**Whiteboard method**: Students answer on personal whiteboards and hold them up. You scan the room, note who's solid and who's shaky, and move on. Fastest method but no written record.",
        ],
      },
      {
        h: "Generate exit tickets with AI in 30 seconds",
        p: [
          "Writing 3 good questions every day is exhausting. Use Examina's exit ticket generator: paste today's lesson notes, generate 2-3 leveled questions (one recall, one application), and you're done. Questions include answer keys and explanations so you can review tomorrow if needed.",
          "Works for any subject. Upload a slide deck, paste your lesson plan, or photograph the board before students leave, and AI writes the exit ticket questions. You spend 30 seconds instead of 15 minutes, and the questions are still tailored to your exact lesson.",
        ],
      },
      {
        h: "What to do with exit ticket responses",
        p: [
          "The point of exit tickets isn't the grade—it's the insight. Sort responses into three piles: got it, mostly got it, didn't get it. If most of the class missed the question, re-teach that concept tomorrow. If only a handful struggled, pull them for small-group re-teaching or intervention.",
          "Track patterns over time. If students consistently struggle with application questions but ace recall, you're teaching facts well but need more practice with using them. If the same 5 students miss every exit ticket, they need a different intervention, not just harder exit tickets.",
        ],
      },
    ],
    faq: [
      {
        q: "How many questions should an exit ticket have?",
        a: "2-3 questions max. Students should finish in 3-5 minutes. One recall question, one application question, and optionally one self-reflection prompt.",
      },
      {
        q: "Should exit tickets be graded?",
        a: "No. Exit tickets are formative assessment—they inform your teaching, not student grades. If students know it's graded, they'll stress instead of answering honestly.",
      },
      {
        q: "What if students don't take them seriously?",
        a: "Make the routine non-negotiable: no one leaves until they submit. Keep them short enough that even resistant students can finish in 3 minutes. Show that you use the feedback (e.g., 'Yesterday's exit tickets showed confusion on X, so let's review').",
      },
      {
        q: "How often should I use exit tickets?",
        a: "Daily, or at least 3-4 times per week. The consistency builds the routine and gives you continuous feedback on student learning. Skip them on test days or days with major activities.",
      },
    ],
    tools: [
      { href: "/exit-ticket-generator", label: "Exit Ticket Generator" },
      { href: "/for-teachers", label: "For Teachers" },
      { href: "/features/formative-assessment", label: "Formative Assessment" },
      { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}