import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";

export const metadata: Metadata = {
  title: "Quiz Generator from Text — Paste & Generate | Examina",
  description:
    "Paste any notes and generate multiple choice, flashcards & true/false questions instantly. Works in 29 languages. Free to try.",
  alternates: { canonical: "https://www.examina.ink/quiz-generator-from-text" },
};

export default function TextQuizPage() {
  return (
    <KeywordLanding
      data={{
        kicker: "Quiz Generator from Text",
        h1: "Turn any text into a",
        h1Accent: "quiz",
        subtitle:
          "Paste your study notes, a textbook passage, or an article and Examina writes questions from it in seconds.",
        cta: "Generate from text",
        featuresTitle: "Why it helps",
        features: [
          {
            title: "Instant questions",
            body: "No formatting required — paste raw text and get structured questions with explanations right away.",
          },
          {
            title: "Works with any topic",
            body: "History, science, languages, medicine, law — the AI adapts question style to your material.",
          },
          {
            title: "Multiple formats",
            body: "Switch between multiple choice, flashcards, fill-in-the-blank, and true/false without re-entering your text.",
          },
        ],
        howTitle: "How it works",
        steps: [
          { n: "01", title: "Paste your text", body: "Copy from notes, a website, or a document. 50 to 15,000 characters." },
          { n: "02", title: "Pick a format", body: "Choose multiple choice, flashcards, fill-in-the-blank, or true/false." },
          { n: "03", title: "Study immediately", body: "Take the quiz in the app, share a link, or export it as a PDF." },
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { q: "What formats can I paste?", a: "Plain text, Markdown, and TXT all work. You can paste anything from a few lines to 15,000 characters." },
          { q: "Does it work in languages other than English?", a: "Yes — 29 languages are supported, making it ideal for language learning." },
          { q: "How long does generation take?", a: "Most quizzes are ready in under 30 seconds." },
          { q: "Is the text generator free?", a: "Free accounts get 5 generations per month. Paid plans start at $2/month." },
        ],
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
          { href: "/create-a-quiz", label: "Create a Quiz" },
          { href: "/study-quiz", label: "Study Quiz" },
          { href: "/true-false-quiz-generator", label: "True & False Generator" },
        ],
      }}
    />
  );
}