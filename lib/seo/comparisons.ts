/**
 * Comparison pages collection for programmatic SEO Wave 2.
 */

export interface ComparisonPage {
  slug: string;
  title: string;
  subtitle: string;
  intro: string[];
  vs?: { platform: string; description: string }[];
  faq: { q: string; a: string }[];
  relatedTools: string[];
}

export const COMPARE_PAGES: ComparisonPage[] = [
  {
    slug: "kahoot-vs-examina",
    title: "Kahoot vs Examina",
    subtitle: "Which quiz platform is right for your classroom?",
    intro: [
      "Kahoot made classroom quizzing fun and engaging, bringing game-based learning to millions of teachers. But creating Kahoot questions still means typing every single one by hand—a time-consuming process for teachers juggling multiple preps.",
      "Examina takes a different approach: it generates quiz questions from your lesson notes using AI, then lets you run them as live classroom games (like Kahoot) or share for self-paced study. Here's how they compare.",
    ],
    vs: [
      {
        platform: "Kahoot",
        description:
          "Live classroom game platform. High student engagement. Manual question creation. Free tier shows ads. Teacher plans start at $10/month per teacher.",
      },
      {
        platform: "Examina",
        description:
          "AI question generation from notes. Live classroom mode plus self-paced quizzes. No ads on free tier. Team plan is $15/month for 5 teachers with unlimited quizzes.",
      },
    ],
    faq: [
      {
        q: "Which is better for daily formative assessment?",
        a: "Examina, if prep time is a concern. You can generate a 10-question exit ticket from lesson notes in under a minute. Kahoot requires typing every question manually.",
      },
      {
        q: "Which has better student engagement?",
        a: "Both have strong game energy. Kahoot is more established and students recognize it. Examina has similar live features (join codes, leaderboards) with faster teacher setup.",
      },
      {
        q: "Can I import my Kahoot questions to Examina?",
        a: "Yes. Export your Kahoot questions and paste them into Examina, or regenerate new questions from the same source material.",
      },
      {
        q: "Which is more affordable?",
        a: "Examina for teams. One $15/month Team plan covers 5 teachers with unlimited quizzes. Kahoot charges per teacher ($10-20/month each).",
      },
    ],
    relatedTools: [
      "/alternatives/kahoot",
      "/alternatives/quizizz",
      "/for-teachers",
      "/features/live-classroom-quiz",
    ],
  },
  {
    slug: "quizizz-vs-kahoot",
    title: "Quizizz vs Kahoot",
    subtitle: "Comparing the top two classroom quiz platforms",
    intro: [
      "Quizizz and Kahoot are the two most popular classroom quiz platforms. Both offer live and self-paced quizzes, both work with join codes, and both have large teacher communities. So what's different?",
      "The main distinction: Quizizz allows students to work at their own pace even in live mode, while Kahoot synchronizes the whole class on the same question. Here's the full comparison.",
    ],
    vs: [
      {
        platform: "Kahoot",
        description:
          "Synchronized live quizzes—everyone on the same question. High energy, competitive. Manual question creation. Free tier with ads. From $10/month per teacher.",
      },
      {
        platform: "Quizizz",
        description:
          "Self-paced and live modes. Students progress independently even in class. Manual question creation. Free tier with ads. From $19/month per teacher.",
      },
    ],
    faq: [
      {
        q: "Which is better for mixed-ability classes?",
        a: "Quizizz. Self-paced mode lets faster students move ahead while struggling students take their time, reducing anxiety and improving completion rates.",
      },
      {
        q: "Which has better question creation?",
        a: "Both require manual entry. For AI question generation, use Examina—then export to either platform if needed.",
      },
      {
        q: "Which is more affordable?",
        a: "Kahoot is slightly cheaper per teacher ($10-15/month vs $19/month), but both are expensive for full-time teachers who need unlimited quizzes.",
      },
      {
        q: "Can I use both?",
        a: "Yes. Many teachers use Kahoot for high-energy reviews and Quizizz for homework or self-paced assessments.",
      },
    ],
    relatedTools: [
      "/alternatives/kahoot",
      "/alternatives/quizizz",
      "/for-teachers",
    ],
  },
  {
    slug: "quizlet-vs-examina",
    title: "Quizlet vs Examina",
    subtitle: "Flashcards vs AI quiz generator—which is better for studying?",
    intro: [
      "Quizlet is the go-to platform for flashcards, with millions of student-created study sets and multiple study modes. Examina focuses on AI-generated quizzes and flashcards from your own notes. Both use active recall, but in different formats.",
      "The key difference: Quizlet is built around flashcard sets (which you create or find), while Examina generates both flashcards and quiz questions from whatever you're currently studying. Here's how they compare.",
    ],
    vs: [
      {
        platform: "Quizlet",
        description:
          "Manual flashcard creation or search community sets. Study modes: flashcards, learn, match, test. Free tier with ads. Quizlet Plus is $8/month.",
      },
      {
        platform: "Examina",
        description:
          "AI flashcard and quiz generation from notes. Multiple question types (MCQ, T/F, fill-blank, flashcards) from one upload. Free tier no ads. From $2/month.",
      },
    ],
    faq: [
      {
        q: "Which is better for long-term retention?",
        a: "Both work with spaced repetition. Examina adds quiz-style questions that test application, not just recognition, which can lead to deeper understanding.",
      },
      {
        q: "Can I import my Quizlet sets to Examina?",
        a: "Yes. Export your Quizlet set as text and paste into Examina, or regenerate fresh flashcards from your current notes.",
      },
      {
        q: "Which is faster to set up?",
        a: "Examina. Upload notes once and get flashcards + quizzes together. Quizlet requires typing every card individually unless you find an existing set.",
      },
      {
        q: "Is Examina replacing Quizlet?",
        a: "No. Quizlet has a huge community and established study modes. Examina is best for students who want to skip card-making and focus on retrieval practice.",
      },
    ],
    relatedTools: [
      "/alternatives/quizlet",
      "/ai-flashcards",
      "/ai-quiz-generator",
      "/for-students",
    ],
  },
];

export function getComparePage(slug: string): ComparisonPage | undefined {
  return COMPARE_PAGES.find((c) => c.slug === slug);
}
