import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";

export const metadata: Metadata = {
  title: "AI Quiz Generator — Turn Notes into Quizzes | Examina",
  description:
    "Generate quizzes from any text with AI. Multiple choice, flashcards, fill-in-the-blank & true/false in 29 languages. Free to try.",
  alternates: { canonical: "https://www.examina.ink/ai-quiz-generator" },
};

export default function AiQuizGeneratorPage() {
  return (
    <KeywordLanding
      data={{
        kicker: "AI Quiz Generator",
        h1: "Generate a quiz with",
        h1Accent: "AI",
        subtitle:
          "Paste your notes and get four question formats mapped to Bloom's Taxonomy — in any of 29 languages — in under 30 seconds.",
        cta: "Start generating free",
        featuresTitle: "What you get",
        features: [
          {
            title: "Four question types",
            body: "Multiple choice, flashcards, fill-in-the-blank, and true/false — all generated from the same source material.",
          },
          {
            title: "Bloom's Taxonomy mapping",
            body: "Questions span recall, comprehension, application, and analysis, mirroring how real exams are designed.",
          },
          {
            title: "29 languages",
            body: "Generate questions in English, Spanish, French, German, Turkish, and 24 more languages from any source.",
          },
        ],
        howTitle: "How it works",
        steps: [
          { n: "01", title: "Add your content", body: "Paste lecture notes, upload a PDF, or snap a photo of a page. 50 to 15,000 characters." },
          { n: "02", title: "AI builds the quiz", body: "Examina reads your material and writes questions with explanations and difficulty tags." },
          { n: "03", title: "Practice anywhere", body: "Take the quiz, review with flashcards, and track your streak — on any device." },
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { q: "Is the AI quiz generator free?", a: "Yes. Free accounts get 5 generations per month with no credit card. Paid plans start at $2/month." },
          { q: "Which question types can it generate?", a: "Multiple choice, flashcards, fill-in-the-blank (cloze), and true/false questions from the same notes." },
          { q: "Does it work in other languages?", a: "Yes — Examina generates questions in 29 languages, so you can study vocabulary or course material in any of them." },
          { q: "Do I need to enter payment details?", a: "No. Sign up free, paste your notes, and start generating immediately." },
        ],
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/create-a-quiz", label: "Create a Quiz" },
          { href: "/free-quiz-generator", label: "Free Quiz Generator" },
          { href: "/quiz-generator-from-text", label: "Quiz Generator from Text" },
          { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
          { href: "/study-quiz", label: "Study Quiz" },
          { href: "/flashcard-generator", label: "Flashcard Generator" },
        ],
      }}
    />
  );
}