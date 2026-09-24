import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";

export const metadata: Metadata = pageMetadata({
  title: "Create a Quiz Online — AI, Free & Shareable | Examina",
  description: "Create a quiz online in minutes. Generate questions from notes with AI, share a link, or export to PDF. Free to start.",
  path: "/create-a-quiz",
});

export default function CreateQuizPage() {
  return (
    <KeywordLanding
      data={{
        kicker: "Create a Quiz",
        h1: "Create a quiz in",
        h1Accent: "minutes",
        subtitle:
          "From blank page to finished, shareable quiz — no templates, no fiddly form builders, just paste and generate.",
        cta: "Create a quiz",
        introTitle: "Create a quiz online without the form-builder struggle",
        intro: [
          "The old way to create a quiz online means wrestling a form builder: manually typing every question, every option, every answer key. Examina skips that entirely — you create a quiz by pasting your content and letting the AI write the questions, so a finished quiz is minutes away instead of an evening of clicking.",
          "Once it's made, you're not stuck with a static file. Every quiz gets a unique share link that anyone can open without an account, score tracking shows how players perform on each question, and PDF export lets you print a copy or distribute it offline. It's built for teachers handing out a class review and students making a quiz to trade with a study group alike.",
        ],
        featuresTitle: "Why create with Examina",
        features: [
          {
            title: "From notes in seconds",
            body: "Skip the form builder entirely — paste content and the AI writes questions mapped to Bloom's Taxonomy.",
          },
          {
            title: "Share & play",
            body: "Share a unique link for friends or students to play, and review results with built-in score tracking.",
          },
          {
            title: "Export to PDF",
            body: "Download any quiz as a PDF for printing or offline study on Plus plans and above.",
          },
        ],
        howTitle: "How it works",
        steps: [
          { n: "01", title: "Add your material", body: "Paste text, upload a PDF, or snap a photo of a page." },
          { n: "02", title: "Generate questions", body: "Choose a format and let the AI write the quiz from your content." },
          { n: "03", title: "Share it", body: "Send a link, take it yourself, or export it as a PDF." },
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { q: "Can I create a quiz without writing questions?", a: "Yes — paste your study material and the AI generates the questions for you automatically." },
          { q: "How do I share a quiz?", a: "Every quiz gets a unique link you can send to anyone. No account is needed to play it." },
          { q: "Can I export my quiz?", a: "Yes, you can download quizzes as PDFs on Plus plans and above." },
          { q: "Is creating a quiz free?", a: "Free accounts get 5 generations per month. Paid plans start at $2/month." },
        ],
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/free-quiz-generator", label: "Free Quiz Generator" },
          { href: "/quiz-generator-from-text", label: "Quiz Generator from Text" },
          { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
          { href: "/daily-quiz", label: "Daily Quiz" },
        ],
      }}
    />
  );
}