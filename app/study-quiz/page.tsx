import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";
import { FREE_PLAN_LIMIT, STARTER_PLAN_PRICE } from "@/lib/subscription";

// Re-rendered at least every 60s so the Halloween sale copy reverts on its own after the cutoff.
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Study Quiz — Practice Quizzes with Spaced Repetition",
  description: "Turn your notes into a study quiz that uses active recall and spaced repetition. Flashcards, quizzes & streaks to stay consistent.",
  path: "/study-quiz",
});

const faqs = [
  { q: "How is a study quiz different from a normal quiz?", a: "A study quiz is generated from your own notes and is designed to be repeated, so it supports active recall and spaced repetition." },
  { q: "Does Examina schedule my reviews?", a: "Yes — study mode schedules flashcard reviews at intervals optimized for memory retention." },
  { q: "Can I track my progress?", a: "Yes, with streaks, XP, and score history across your quizzes." },
  { q: "Is the study quiz free?", a: `Free accounts get ${FREE_PLAN_LIMIT} generations per month. Paid plans start at $${STARTER_PLAN_PRICE}/month.` },
];

export default function StudyQuizPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/study-quiz#webpage",
        url: "https://www.examina.ink/study-quiz",
        name: "Study Quiz — Practice Quizzes with Spaced Repetition | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        applicationCategory: "EducationalApplication",
        description: "Study quiz generator with active recall, spaced repetition, and streak tracking for consistent learning.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KeywordLanding
      data={saleLandingData({
        kicker: "Study Quiz",
        h1: "Study smarter with",
        h1Accent: "quizzes",
        subtitle:
          "Active recall beats re-reading. Turn your notes into a study quiz, then review on a schedule so knowledge sticks.",
        cta: "Start studying free",
        introTitle: "A study quiz built for the way memory works",
        intro: [
          "Reading notes feels productive but does little for recall. A study quiz forces retrieval — answering without looking — which is the retrieval practice that research consistently links to better exam performance. Examina generates that quiz from your own notes, so it tests your course, not a generic fact bank.",
          "The study loop goes beyond a single pass: study mode schedules your flashcards with spaced repetition, re-asking them at the moments you'd otherwise forget, while daily challenges and streaks keep the schedule honest. Take a quiz the same day you learn something, review the misses on a schedule, and the material actually sticks.",
        ],
        featuresTitle: "Built for retention",
        features: [
          {
            title: "Active recall",
            body: "Answering questions beats passive reading. Examina turns your notes into a constant test of what you know.",
          },
          {
            title: "Spaced repetition",
            body: "Study mode schedules flashcards for review at the right moments, right before you're about to forget.",
          },
          {
            title: "Streak tracking",
            body: "Daily challenges and streaks keep you consistent, so studying becomes a habit, not a chore.",
          },
        ],
        howTitle: "How it works",
        steps: [
          { n: "01", title: "Add your notes", body: "Paste your lecture notes or upload a PDF." },
          { n: "02", title: "Generate a study quiz", body: "Get flashcards and questions from your own material, not generic content." },
          { n: "03", title: "Review on a schedule", body: "Use study mode and daily challenges to reinforce what you've learned." },
        ],
        faqTitle: "Frequently asked questions",
        faq: faqs,
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/ai-flashcards", label: "Flashcard Generator" },
          { href: "/create-a-quiz", label: "Create a Quiz" },
          { href: "/study-guide-generator", label: "Study Guide Generator" },
          { href: "/study", label: "Study Mode" },
          { href: "/daily-quiz", label: "Daily Quiz" },
        ],
      }, now)}
      />
    </>
  );
}