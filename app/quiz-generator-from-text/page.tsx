import type { Metadata } from "next";
import { pageMetadata, LANGUAGE_COUNT } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";

// Re-rendered at least every 60s so the Halloween sale copy reverts on its own after the cutoff.
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Quiz Generator from Text — Paste & Generate Questions",
  description: `Paste any notes and generate multiple choice, flashcards & true/false questions instantly. Works in ${LANGUAGE_COUNT} languages. Free to try.`,
  path: "/quiz-generator-from-text",
});

const faqs = [
  { q: "What formats can I paste?", a: "Plain text, Markdown, and TXT all work. You can paste anything from a few lines to 15,000 characters." },
  { q: "Does it work in languages other than English?", a: `Yes — ${LANGUAGE_COUNT} languages are supported, making it ideal for language learning.` },
  { q: "How long does generation take?", a: "Most quizzes are ready in under 30 seconds." },
  { q: "Is the text generator free?", a: "Free accounts get 5 generations per month. Paid plans start at $2/month." },
];

export default function TextQuizPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/quiz-generator-from-text#webpage",
        url: "https://www.examina.ink/quiz-generator-from-text",
        name: "Quiz Generator from Text — Paste & Generate | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        applicationCategory: "EducationalApplication",
        description: "Quiz generator that creates questions from pasted text. Supports multiple choice, flashcards, fill-in-the-blank, and true/false.",
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
        kicker: "Quiz Generator from Text",
        h1: "Turn any text into a",
        h1Accent: "quiz",
        subtitle:
          "Paste your study notes, a textbook passage, or an article and Examina writes questions from it in seconds.",
        cta: "Generate from text",
        introTitle: "Paste text in, get questions out",
        intro: [
          "You already have your material — you just don't have questions for it. With the text-based quiz generator you paste anything from a few sentences to 15,000 characters, and Examina writes multiple choice, flashcards, fill-in-the-blank, and true/false questions from that exact content, with no reformatting and no tables to build.",
          "Because generation starts from your words rather than a topic search, the questions follow what your instructor actually emphasized instead of generic facts pulled from the web. Working from your own class notes? Try the notes to quiz generator.",
        ],
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
        faq: faqs,
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/notes-to-quiz", label: "Notes to Quiz" },
          { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
          { href: "/create-a-quiz", label: "Create a Quiz" },
          { href: "/ai-question-generator", label: "AI Question Generator" },
          { href: "/study-quiz", label: "Study Quiz" },
        ],
      }, now)}
      />
    </>
  );
}