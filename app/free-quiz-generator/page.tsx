import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";

export const metadata: Metadata = {
  title: "Free Quiz Generator — 5 Quizzes a Month | Examina",
  description:
    "Make quizzes online for free with AI. No credit card. Generate up to 5 quizzes a month, or unlock more from $2/month.",
  alternates: { canonical: "https://www.examina.ink/free-quiz-generator" },
};

export default function FreeQuizPage() {
  return (
    <KeywordLanding
      data={{
        kicker: "Free Quiz Generator",
        h1: "Make free quizzes",
        h1Accent: "online",
        subtitle:
          "No credit card, no catch — start with 5 free AI generations every month and upgrade only when you need more.",
        cta: "Try it free",
        featuresTitle: "The free plan",
        features: [
          {
            title: "5 generations / month",
            body: "Turn up to 15,000 characters of notes into a quiz, five times every month, at no cost.",
          },
          {
            title: "All question types",
            body: "Multiple choice, flashcards, fill-in-the-blank, and true/false are all included in the free tier.",
          },
          {
            title: "Upgrade anytime",
            body: "Paid plans start at just $2/month for 20 generations, with 200 on Pro and unlimited on Team.",
          },
        ],
        howTitle: "How it works",
        steps: [
          { n: "01", title: "Create a free account", body: "Sign up in about 30 seconds. No credit card required." },
          { n: "02", title: "Paste your notes", body: "Add text, upload a PDF, or snap a photo of a page." },
          { n: "03", title: "Generate & study", body: "Take the quiz, review with flashcards, and track your streak." },
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { q: "Is there really a free plan?", a: "Yes. Everyone starts with 5 free generations per month and full access to all four question types." },
          { q: "Do I need a credit card to sign up?", a: "No. The free plan never asks for payment details." },
          { q: "What happens when I hit the free limit?", a: "You can upgrade to a paid plan or wait for your monthly allowance to reset." },
          { q: "How much do paid plans cost?", a: "Starter is $2/month for 20 quizzes, Plus $5/month for 60, Pro $9/month for 200, and Team $15/month for unlimited." },
        ],
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/create-a-quiz", label: "Create a Quiz" },
          { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
          { href: "/study-quiz", label: "Study Quiz" },
          { href: "/pricing", label: "View Pricing" },
        ],
      }}
    />
  );
}