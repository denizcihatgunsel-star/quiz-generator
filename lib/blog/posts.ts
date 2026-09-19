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
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}