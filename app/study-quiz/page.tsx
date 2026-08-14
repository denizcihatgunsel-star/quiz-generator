import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";

export const metadata: Metadata = {
  title: "Study Quiz Generator — Active Recall & Flashcards | Examina",
  description:
    "Turn your notes into a study quiz that uses active recall and spaced repetition. Flashcards, quizzes & streaks to stay consistent.",
  alternates: { canonical: "https://www.examina.ink/study-quiz" },
};

export default function StudyQuizPage() {
  return (
    <KeywordLanding
      data={{
        kicker: "Study Quiz",
        h1: "Study smarter with",
        h1Accent: "quizzes",
        subtitle:
          "Active recall beats re-reading. Turn your notes into a study quiz, then review on a schedule so knowledge sticks.",
        cta: "Start studying free",
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
        faq: [
          { q: "How is a study quiz different from a normal quiz?", a: "A study quiz is generated from your own notes and is designed to be repeated, so it supports active recall and spaced repetition." },
          { q: "Does Examina schedule my reviews?", a: "Yes — study mode schedules flashcard reviews at intervals optimized for memory retention." },
          { q: "Can I track my progress?", a: "Yes, with streaks, XP, and score history across your quizzes." },
          { q: "Is the study quiz free?", a: "Free accounts get 5 generations per month. Paid plans start at $2/month." },
        ],
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/flashcard-generator", label: "Flashcard Generator" },
          { href: "/create-a-quiz", label: "Create a Quiz" },
          { href: "/study", label: "Study Mode" },
          { href: "/daily-quiz", label: "Daily Quiz" },
        ],
      }}
    />
  );
}