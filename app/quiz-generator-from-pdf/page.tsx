import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, planOffers, saleCopy, saleLandingData } from "@/lib/pricing";

// Re-rendered at least every 60s so the Halloween sale copy reverts on its own after the cutoff.
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Quiz Maker from PDF — Convert PDF to Quiz Free",
  description: "Upload a PDF and turn it into quiz questions with AI. PDF to quiz maker for students and teachers. Works with scans too. Free.",
  path: "/quiz-generator-from-pdf",
});

const faqs = [
  { q: "How large a PDF can I upload?", a: "Examina reads up to 15,000 characters of text per generation — enough for most handouts and chapter sections." },
  { q: "Can I convert a photo of a page?", a: "Yes. Upload a picture of a printed page and OCR extracts the text before the AI generates questions." },
  { q: "Does the PDF generator preserve my file?", a: "Your original text is used only to generate questions and is not stored on our servers." },
  { q: "Is converting a PDF to a quiz free?", a: "Free accounts get 5 generations per month. Paid plans start at $2/month." },
];

export default function PdfQuizPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/quiz-generator-from-pdf#webpage",
        url: "https://www.examina.ink/quiz-generator-from-pdf",
        name: "Quiz Maker from PDF — Convert PDF to Quiz | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "PDF to quiz maker that converts PDF documents into quiz questions and flashcards using AI. Supports OCR for scanned documents.",
        offers: planOffers(now),
        publisher: { "@id": "https://www.examina.ink/#organization" },
      },
      {
        "@type": "HowTo",
        name: "How to Convert a PDF to a Quiz",
        description: "Convert PDF documents to quiz questions in three steps",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Upload your PDF",
            text: "Drag and drop your file or choose it from your device. No reformatting needed.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "AI extracts the content",
            text: "Examina reads the document and identifies the terms and concepts worth testing.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Get your quiz",
            text: "Download as PDF or practice in the app with flashcards and score tracking.",
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
        kicker: "Quiz Generator from PDF",
        h1: "Turn a PDF into a",
        h1Accent: "quiz",
        subtitle:
          "Upload a study guide, textbook chapter, or handout and Examina reads it and writes the questions for you.",
        cta: "Convert a PDF free",
        introTitle: "From PDF to quiz in one upload",
        intro: [
          "PDFs are how most course material ships — study guides, textbook chapters, past papers, and journal articles. Examina's PDF-to-quiz converter reads the document directly and turns it into multiple choice questions and flashcards, so the review-ready version of your reading is one upload away. Want to create a study guide from a PDF or turn it into a true/false quiz from a PDF? Just upload and generate.",
          "You're not limited to clean digital text either: snap a photo of a printed page and OCR pulls out the content before generation. Every question ships with an explanation, meaning the same PDF session that tests you also teaches you. Files are read transiently and aren't stored on the server, so converting a confidential handout stays private.",
        ],
        featuresTitle: "Built for documents",
        features: [
          {
            title: "PDF, TXT & Markdown",
            body: "Upload PDF, TXT, or Markdown files of up to 15,000 characters and extract the key concepts automatically.",
          },
          {
            title: "Photo & scan support",
            body: "Not a digital file? Snap a photo of a printed page and Examina's OCR pulls out the text to quiz you on.",
          },
          {
            title: "Explanations included",
            body: "Every question comes with a rationale, so a PDF review session doubles as a learning session.",
          },
        ],
        howTitle: "How it works",
        steps: [
          { n: "01", title: "Upload your PDF", body: "Drag and drop your file or choose it from your device. No reformatting needed." },
          { n: "02", title: "AI extracts the content", body: "Examina reads the document and identifies the terms and concepts worth testing." },
          { n: "03", title: "Get your quiz", body: "Download as PDF or practice in the app with flashcards and score tracking." },
        ],
        faqTitle: "Frequently asked questions",
        faq: faqs,
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/study-guide-generator", label: "Study Guide Generator" },
          { href: "/true-false-quiz-generator", label: "True/False Quiz Generator" },
          { href: "/quiz-generator-from-text", label: "Quiz Generator from Text" },
          { href: "/notes-to-quiz", label: "Notes to Quiz" },
          { href: "/free-quiz-generator", label: "Free Quiz Generator" },
          { href: "/study-quiz", label: "Study Quiz" },
          { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Maker" },
        ],
      }, now)}
      />
    </>
  );
}