import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";

export const metadata: Metadata = {
  title: "Daily Quiz — A New Challenge Every Day | Examina",
  description:
    "Play a fresh community quiz every day, earn XP, and keep your study streak alive. Free to play — a new challenge daily.",
  alternates: { canonical: "https://www.examina.ink/daily-quiz" },
};

export default function DailyQuizPage() {
  return (
    <KeywordLanding
      data={{
        kicker: "Daily Quiz",
        h1: "Test yourself with a",
        h1Accent: "daily quiz",
        subtitle:
          "A fresh community quiz every day, built by students and teachers. Earn XP, beat your best, and keep your streak alive.",
        cta: "Play today's quiz",
        featuresTitle: "Why play daily",
        features: [
          {
            title: "A new quiz each day",
            body: "A different community quiz appears every day, so there's always something fresh to test yourself on.",
          },
          {
            title: "Earn XP & streaks",
            body: "Complete daily challenges to earn XP and keep your streak going — the habit that keeps you studying.",
          },
          {
            title: "Community-made",
            body: "Quizzes come from real students and teachers covering biology, history, languages, and more.",
          },
        ],
        howTitle: "How it works",
        steps: [
          { n: "01", title: "Open today's challenge", body: "Find today's community quiz on the daily challenge page." },
          { n: "02", title: "Play & score", body: "Answer the questions and see how your best score improves over time." },
          { n: "03", title: "Return tomorrow", body: "A new quiz resets daily, and your streak grows the longer you keep playing." },
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { q: "How often is the quiz updated?", a: "A new community quiz is featured every day, and your daily progress resets each 24 hours." },
          { q: "Do I get rewarded for playing?", a: "Yes — completing the daily challenge earns XP, and daily play keeps your streak alive." },
          { q: "Can anyone submit a quiz?", a: "Yes — community quizzes are created by students and teachers using Examina, and they're featured daily." },
          { q: "Is the daily quiz free?", a: "Yes, the daily challenge is free to play for everyone." },
        ],
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/daily-challenge", label: "Daily Challenge" },
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/create-a-quiz", label: "Create a Quiz" },
          { href: "/study-quiz", label: "Study Quiz" },
          { href: "/explore", label: "Explore Quizzes" },
        ],
      }}
    />
  );
}