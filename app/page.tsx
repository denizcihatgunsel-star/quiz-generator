import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import QuizGenerator from "@/components/QuizGenerator";
import { StructuredData } from "@/components/StructuredData";
import { PLANS } from "@/lib/subscription";
import { withSaleOffer } from "@/lib/pricing";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Examina — AI Quiz Generator | Turn Notes into Quizzes",
  description:
    "Examina is the AI quiz generator that turns any text into multiple choice, flashcards, fill-in-the-blank & true/false questions in seconds. Free to try.",
  path: "/",
  ogTitle: "Examina — AI Quiz Generator | Turn Notes into Quizzes Instantly",
  ogDescription:
    "Examina turns any lesson into multiple choice, flashcards, fill-in-the-blank, and true/false questions in seconds. Free to try.",
  languages: true,
});

const FAQ_ITEMS = [
  {
    q: "What file types can I upload?",
    a: "PDF, TXT, and Markdown files. Or just paste text directly into the editor.",
  },
  {
    q: "How many quizzes can I generate?",
    a: "Free accounts get 5 quizzes per month. Paid plans go up to unlimited quiz generation.",
  },
  {
    q: "What makes the questions good?",
    a: "Questions are mapped to Bloom's Taxonomy — testing recall, understanding, application, and analysis. Not just surface-level memorization.",
  },
  {
    q: "Can I share quizzes?",
    a: "Every quiz gets a unique shareable link. You can also export your quizzes to PDF.",
  },
  {
    q: "Is my content stored?",
    a: "Content is sent to the AI for generation only. Generated quizzes are saved to your account, but your original content is not stored on our servers.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Built per render (ISR, revalidate 60s) so the Halloween sale offer data reverts after the cutoff.
function getSoftwareAppSchema(now: Date) {
  return {
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
    publisher: { "@type": "Organization", "@id": "https://www.examina.ink/#organization" },
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description: "5 quizzes per month, no credit card required",
        url: "https://www.examina.ink/pricing",
      },
      withSaleOffer(
        {
          "@type": "Offer" as const,
          name: "Starter",
          price: "2",
          priceCurrency: "USD",
          description: "20 quizzes per month",
          url: "https://www.examina.ink/pricing",
        },
        PLANS.starter,
        now
      ),
      withSaleOffer(
        {
          "@type": "Offer" as const,
          name: "Plus",
          price: "5",
          priceCurrency: "USD",
          description: "60 quizzes per month",
          url: "https://www.examina.ink/pricing",
        },
        PLANS.plus,
        now
      ),
      withSaleOffer(
        {
          "@type": "Offer" as const,
          name: "Pro",
          price: "9",
          priceCurrency: "USD",
          description: "200 quizzes per month",
          url: "https://www.examina.ink/pricing",
        },
        PLANS.pro,
        now
      ),
      withSaleOffer(
        {
          "@type": "Offer" as const,
          name: "Team",
          price: "15",
          priceCurrency: "USD",
          description: "Unlimited quizzes for up to 5 members",
          url: "https://www.examina.ink/pricing",
        },
        PLANS.team,
        now
      ),
    ],
  };
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.examina.ink/#organization",
  name: "Examina",
  url: "https://www.examina.ink",
  logo: "https://www.examina.ink/logo.png",
  description:
    "AI-powered quiz generator that helps students, teachers, and professionals turn any lesson into interactive quizzes.",
};

export default function Home() {
  const softwareAppSchema = getSoftwareAppSchema(new Date());
    return (
    <>
      <QuizGenerator />
      {/* Lightweight SSR FAQ for crawlers; rich UI loads client-side below the fold */}
      <section id="seo-ssr-faq" className="sr-only" aria-label="Frequently asked questions">
        <h2>Frequently asked questions</h2>
        <ul>
          {FAQ_ITEMS.map((f) => (
            <li key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </li>
          ))}
        </ul>
      </section>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareAppSchema} />
      <StructuredData data={organizationSchema} />
    </>
  );
}
