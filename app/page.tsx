import QuizGenerator from "@/components/QuizGenerator";
import { StructuredData } from "@/components/StructuredData";

export const revalidate = 60;

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
    {
      "@type": "Offer",
      name: "Starter",
      price: "2",
      priceCurrency: "USD",
      description: "20 quizzes per month",
      url: "https://www.examina.ink/pricing",
    },
    {
      "@type": "Offer",
      name: "Plus",
      price: "5",
      priceCurrency: "USD",
      description: "60 quizzes per month",
      url: "https://www.examina.ink/pricing",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "9",
      priceCurrency: "USD",
      description: "200 quizzes per month",
      url: "https://www.examina.ink/pricing",
    },
    {
      "@type": "Offer",
      name: "Team",
      price: "15",
      priceCurrency: "USD",
      description: "Unlimited quizzes for up to 5 members",
      url: "https://www.examina.ink/pricing",
    },
  ],
};

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
    return (
    <>
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
      <QuizGenerator />
    </>
  );
}
