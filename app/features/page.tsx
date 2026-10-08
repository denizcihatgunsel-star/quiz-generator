import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Features — Bloom's Taxonomy, Live Quiz, OCR, PDF Export & More",
  description:
    "Examina features: Bloom's taxonomy tagging, live classroom quizzes, OCR from photos, PDF export, shared quiz links, and formative assessment.",
  path: "/features",
});

const features = [
  {
    slug: "blooms-taxonomy",
    name: "Bloom's Taxonomy",
    description: "Questions tagged by cognitive level",
  },
  {
    slug: "live-classroom-quiz",
    name: "Live Classroom Quiz",
    description: "Students join with codes for game-based review",
  },
  {
    slug: "worksheet-generator",
    name: "Worksheet Generator",
    description: "AI-generated practice worksheets",
  },
  {
    slug: "formative-assessment",
    name: "Formative Assessment",
    description: "Exit tickets and quick checks in seconds",
  },
  { slug: "ocr-quiz", name: "OCR Quiz", description: "Generate quizzes from photos of notes" },
  { slug: "export-pdf", name: "Export PDF", description: "Download quizzes as printable PDFs" },
  {
    slug: "shared-quiz-links",
    name: "Shared Quiz Links",
    description: "Share quizzes with unique URLs",
  },
];


const faqs = [
  { q: "What features are included in the free plan?", a: "All features are available on the free plan: Bloom's taxonomy tagging, live classroom mode, OCR quiz from photos, PDF export, shared quiz links, and formative assessment tools. Free tier: 10 quizzes/month." },
  { q: "How does Bloom's taxonomy tagging work?", a: "Every question is automatically tagged with its cognitive level (Remember, Understand, Apply, Analyze, Evaluate, Create) so you know what skills you're testing." },
  { q: "Can I run live classroom quizzes like Kahoot?", a: "Yes. Students join with a code from any device. You control question pacing, show leaderboards, and display explanations." },
  { q: "Does OCR work with handwritten notes?", a: "Yes. Photograph handwritten or printed notes and Examina extracts the text using OCR, then generates quiz questions from it." },
];

export default function FeaturesHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/features#webpage`,
        url: `${SITE_URL}/features`,
        name: "Features | Examina",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: SITE_URL,
        applicationCategory: "EducationalApplication",
        description: "Quiz generator with Bloom's taxonomy, live classroom mode, OCR, PDF export, and more.",
      },
      {
        "@type": "ItemList",
        name: "Examina Features",
        description:
          "Key features: Bloom's taxonomy, live classroom quizzes, OCR, PDF export, shared links, formative assessment",
        itemListElement: features.map((feat, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: feat.name,
          url: `${SITE_URL}/features/${feat.slug}`,
          description: feat.description,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Features",
            item: `${SITE_URL}/features`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    ],
  };

  return (
    <LandingPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-[#f5f5f0] px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-neutral-400">Features</p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-neutral-900 sm:text-6xl">
            Everything you need for quiz generation
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600 sm:text-xl">
            AI question generation, Bloom's taxonomy tagging, live classroom mode, OCR, PDF export,
            and more. All the features teachers and students need for effective assessment.
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {features.map((feat) => (
            <Link
              key={feat.slug}
              href={`/features/${feat.slug}`}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md"
            >
              <h3 className="mb-2 text-xl font-medium text-neutral-900 group-hover:text-violet-600">
                {feat.name}
              </h3>
              <p className="text-sm text-neutral-600">{feat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#f5f5f0] px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-medium text-neutral-900">Try all features free</h2>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600">
            Generate 10 quizzes per month free. All features included. No credit card required.
          </p>
          <Link
            href="/ai-quiz-generator"
            className="inline-block rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Generate quiz free
          </Link>
        </div>
      </section>


      <section className="border-t border-neutral-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-medium text-neutral-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="mb-2 text-lg font-medium text-neutral-900">{faq.q}</h3>
                <p className="text-sm text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
}
