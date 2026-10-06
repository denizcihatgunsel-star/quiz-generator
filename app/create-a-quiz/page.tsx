import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, planOffers, saleCopy, saleLandingData } from "@/lib/pricing";

// Re-rendered at least every 60s so the Halloween sale copy reverts on its own after the cutoff.
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Create a Quiz Online — AI Quiz Maker Free & Shareable",
  description: "Create a quiz online in minutes. Generate questions from notes with AI, share a link, or export to PDF. Free to start.",
  path: "/create-a-quiz",
});

const faqs = [
  { q: "Can I create a quiz without writing questions?", a: "Yes — paste your study material and the AI generates the questions for you automatically." },
  { q: "How do I share a quiz?", a: "Every quiz gets a unique link you can send to anyone. No account is needed to play it." },
  { q: "Can I export my quiz?", a: "Yes, you can download quizzes as PDFs on Plus plans and above." },
  { q: "Is creating a quiz free?", a: "Free accounts get 5 generations per month. Paid plans start at $2/month." },
];

export default function CreateQuizPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/create-a-quiz#webpage",
        url: "https://www.examina.ink/create-a-quiz",
        name: "Create a Quiz Online — AI Quiz Maker | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description: "Create quizzes online with AI. Generate questions from notes, share by link, export as PDF.",
        offers: planOffers(now),
      },
      {
        "@type": "HowTo",
        name: "How to Create a Quiz Online",
        description: "Create a quiz in three steps using AI",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Add your material",
            text: "Paste text, upload a PDF, or snap a photo of a page.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Generate questions",
            text: "Choose a format and let the AI write the quiz from your content.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Share it",
            text: "Send a link, take it yourself, or export it as a PDF.",
          },
        ],
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
        faq: faqs,
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/free-quiz-generator", label: "Free Quiz Generator" },
          { href: "/quiz-generator-from-text", label: "Quiz Generator from Text" },
          { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
          { href: "/online-quiz-maker", label: "Online Quiz Maker" },
          { href: "/daily-quiz", label: "Daily Quiz" },
        ],
      }, now)}
      />
    </>
  );
}