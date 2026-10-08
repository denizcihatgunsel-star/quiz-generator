import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, planOffers, saleCopy, saleLandingData } from "@/lib/pricing";

// Re-rendered at least every 60s so the Halloween sale copy reverts on its own after the cutoff.
export const revalidate = 60;

export function generateMetadata(): Metadata {
  return pageMetadata({
    title: "Free Quiz Maker — Create Quizzes Online Free",
    description: copyText(
      saleCopy("Free quiz maker with AI. No credit card needed. Generate up to 10 quizzes a month free, or unlock more from $2/month.")
    ),
    path: "/free-quiz-generator",
  });
}

const faqs = [
  { q: "Is there really a free plan?", a: "Yes. Everyone starts with 10 free generations per month and full access to all four question types." },
  { q: "Do I need a credit card to sign up?", a: "No. The free plan never asks for payment details." },
  { q: "What happens when I hit the free limit?", a: "You can upgrade to a paid plan or wait for your monthly allowance to reset." },
  { q: "How much do paid plans cost?", a: "Starter is $2/month for 20 quizzes, Plus $5/month for 60, Pro $9/month for 200, and Team $15/month for unlimited." },
];

export default function FreeQuizPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/free-quiz-generator#webpage",
        url: "https://www.examina.ink/free-quiz-generator",
        name: "Free Quiz Maker — Create Quizzes Online Free | Examina",
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
          "Free quiz maker that generates quizzes from your notes with AI. No credit card required. 5 free quizzes per month.",
        offers: planOffers(now),
        publisher: { "@id": "https://www.examina.ink/#organization" },
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
        kicker: "Free Quiz Generator",
        h1: "Make free quizzes",
        h1Accent: "online",
        subtitle:
          "No credit card, no catch — start with 10 free AI generations every month and upgrade only when you need more.",
        cta: "Try it free",
        introTitle: "The genuinely free quiz generator",
        intro: [
          "'Free' usually means a trial that expires or a watermark on the result. Examina's free quiz generator gives you a working tool with no credit card and no trial clock: ten full AI generations every month, all four question types, share links, flashcard review, and streak tracking.",
          "When you hit the monthly limit you get a choice instead of a wall — wait for the reset, or upgrade from $2/month. And because the generator works from your own notes, whether text, PDF, or photo, even the free tier produces quizzes tailored to your course rather than generic templates.",
        ],
        featuresTitle: "The free plan",
        features: [
          {
            title: "10 generations / month",
            body: "Turn up to 15,000 characters of notes into a quiz, ten times every month, at no cost.",
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
        faq: faqs,
        relatedTitle: "Explore more ways to study",
        related: [
          { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
          { href: "/create-a-quiz", label: "Create a Quiz" },
          { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
          { href: "/online-quiz-maker", label: "Online Quiz Maker" },
          { href: "/study-quiz", label: "Study Quiz" },
          { href: "/pricing", label: "View Pricing" },
        ],
      }, now)}
      />
    </>
  );
}