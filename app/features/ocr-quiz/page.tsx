import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "OCR Quiz Generator — Turn Photos of Notes into Quizzes",
  description: "Quiz from image OCR. Photograph handwritten notes and generate practice questions.",
  path: "/features/ocr-quiz",
});

const faqs = [
  { q: "How does OCR quiz generation work?", a: "Take a photo of handwritten or printed notes. Examina uses OCR to extract the text, then AI generates quiz questions from it." },
  { q: "Does it work with handwriting?", a: "Yes, but legible handwriting works best. Print or typed text gives the most accurate OCR results." },
  { q: "What image formats work?", a: "JPEG, PNG, and other common image formats. Photo quality affects OCR accuracy—good lighting and clear text help." },
  { q: "Is OCR free?", a: "OCR processing is included. Free accounts get 5 quiz generations per month. Paid plans start at $2/month." },
];

export default function OCRQuizPage() {
  const now = new Date();
  return (
    <KeywordLanding
      data={saleLandingData({
        kicker: "OCR Quiz",
        h1: "Quiz from photos",
        h1Accent: "with OCR",
        subtitle: "Photograph notes and generate questions. OCR extracts text, AI writes the quiz.",
        cta: "Upload photo",
        introTitle: "Study from handwritten notes",
        intro: ["Handwritten notes work for many students, but turning them into practice quizzes means typing everything out first. OCR skips that step—photograph the notes and Examina extracts the text automatically.", "Once text is extracted, AI generates quiz questions. Study from handwritten material without manual transcription."],
        featuresTitle: "How it works",
        features: [
          { title: "Photo to text", body: "Upload a photo. OCR extracts the text automatically." },
          { title: "Text to questions", body: "AI generates quiz questions with answer keys and explanations." },
          { title: "Review and study", body: "Check questions for accuracy, then take the quiz." },
        ],
        howTitle: "How to use it",
        steps: [
          { n: "01", title: "Take a clear photo", body: "Photograph notes with good lighting." },
          { n: "02", title: "Upload to Examina", body: "OCR extracts text automatically." },
          { n: "03", title: "Generate quiz", body: "AI generates questions from extracted text." },
        ],
        faqTitle: "FAQs",
        faq: faqs,
        relatedTitle: "Related",
        related: [{ href: "/notes-to-quiz", label: "Notes to Quiz" }, { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" }],
      }, now)}
    />
  );
}
