import QuizGenerator from "@/components/QuizGenerator";
import { StructuredData } from "@/components/StructuredData";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What file types can I upload?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PDF, TXT, and Markdown files. Or just paste text directly into the editor.",
      },
    },
    {
      "@type": "Question",
      name: "How many quizzes can I generate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free accounts get 5 quizzes per month. Paid plans go up to unlimited quiz generation.",
      },
    },
    {
      "@type": "Question",
      name: "What makes the questions good?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Questions are mapped to Bloom's Taxonomy — testing recall, understanding, application, and analysis. Not just surface-level memorization.",
      },
    },
    {
      "@type": "Question",
      name: "Can I share quizzes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every quiz gets a unique shareable link. You can also export your quizzes to PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Is my content stored?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Content is sent to the AI for generation only. Generated quizzes are saved to your account, but your original content is not stored on our servers.",
      },
    },
  ],
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Examina",
  url: "https://www.examina.ink",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description:
    "AI-powered quiz generator that turns any lesson into multiple choice, flashcard, fill-in-the-blank, and true/false questions. Supports 29 languages and maps questions to Bloom's Taxonomy.",
  screenshot: "https://www.examina.ink/og-image.png",
  featureList: [
    "Multiple choice question generation",
    "Interactive flashcards with 3D flip",
    "Fill-in-the-blank questions",
    "True/false questions with explanations",
    "PDF, TXT, and Markdown upload",
    "29 language support",
    "Bloom's Taxonomy mapping",
    "Quiz sharing via link or PDF export",
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "5 quizzes per month, no credit card required",
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Examina",
  url: "https://www.examina.ink",
  logo: "https://www.examina.ink/logo.png",
  description:
    "AI-powered quiz generator that helps students, teachers, and professionals turn any lesson into interactive quizzes.",
};

export default function Home() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareAppSchema} />
      <StructuredData data={organizationSchema} />
      <QuizGenerator />
    </>
  );
}
