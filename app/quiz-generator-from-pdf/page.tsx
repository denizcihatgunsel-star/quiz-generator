import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";

export const metadata: Metadata = {
  title: "PDF to Quiz Generator — Convert Documents | Examina",
  description:
    "Upload a PDF and turn it into multiple choice questions and flashcards with AI. Works with photos and scans too. Free to try.",
  alternates: { canonical: "https://www.examina.ink/quiz-generator-from-pdf" },
};

export default function PdfQuizPage() {
  return (
    <KeywordLanding
      data={{
        kicker: "Quiz Generator from PDF",
        h1: "Turn a PDF into a",
        h1Accent: "quiz",
        subtitle:
          "Upload a study guide, textbook chapter, or handout and Examina reads it and writes the questions for you.",
        cta: "Convert a PDF free",
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
        faq: [
          { q: "How large a PDF can I upload?", a: "Examina reads up to 15,000 characters of text per generation — enough for most handouts and chapter sections." },
          { q: "Can I convert a photo of a page?", a: "Yes. Upload a picture of a printed page and OCR extracts the text before the AI generates questions." },
          { q: "Does the PDF generator preserve my file?", a: "Your original text is used only to generate questions and is not stored on our servers." },
          { q: "Is converting a PDF to a quiz free?", a: "Free accounts get 5 generations per month. Paid plans start at $2/month." },
        ],
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/quiz-generator-from-text", label: "Quiz Generator from Text" },
          { href: "/free-quiz-generator", label: "Free Quiz Generator" },
          { href: "/study-quiz", label: "Study Quiz" },
          { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Maker" },
        ],
      }}
    />
  );
}