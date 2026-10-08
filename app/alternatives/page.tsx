import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Kahoot, Quizizz, Quizlet, Blooket & Gimkit Alternatives — Free Quiz Platforms",
  description:
    "Compare alternatives to Kahoot, Quizizz, Quizlet, Blooket, Gimkit, and Nearpod. AI-powered quiz generation for teachers and students.",
  path: "/alternatives",
});

const alternatives = [
  {
    slug: "kahoot",
    name: "Kahoot Alternative",
    description: "AI question generation vs manual typing",
  },
  {
    slug: "quizizz",
    name: "Quizizz Alternative",
    description: "Self-paced and live quizzes with AI",
  },
  {
    slug: "quizlet",
    name: "Quizlet Alternative",
    description: "AI flashcards and quizzes from notes",
  },
  {
    slug: "blooket",
    name: "Blooket Alternative",
    description: "Game-based review with auto-generated questions",
  },
  {
    slug: "gimkit",
    name: "Gimkit Alternative",
    description: "Live quizzes with AI question creation",
  },
  {
    slug: "nearpod",
    name: "Nearpod Alternative",
    description: "Assessment-focused alternative",
  },
  {
    slug: "google-forms",
    name: "Google Forms Alternative",
    description: "Generate questions for Forms or run directly",
  },
];

export default function AlternativesHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/alternatives#webpage`,
        url: `${SITE_URL}/alternatives`,
        name: "Quiz Platform Alternatives | Examina",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "ItemList",
        name: "Quiz Platform Alternatives",
        description:
          "AI-powered alternatives to Kahoot, Quizizz, Quizlet, Blooket, Gimkit, Nearpod, and Google Forms",
        itemListElement: alternatives.map((alt, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: alt.name,
          url: `${SITE_URL}/alternatives/${alt.slug}`,
          description: alt.description,
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
            name: "Alternatives",
            item: `${SITE_URL}/alternatives`,
          },
        ],
      },
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
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-neutral-400">
            Compare Platforms
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-neutral-900 sm:text-6xl">
            Quiz platform alternatives
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Looking for an alternative to Kahoot, Quizizz, Quizlet, Blooket, Gimkit, or Nearpod?
            Examina generates quiz questions with AI so you can skip manual question entry.
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl font-medium text-neutral-900">
            What makes Examina different
          </h2>
          <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-2 font-medium text-neutral-900">AI question generation</h3>
              <p className="text-sm text-neutral-600">
                Upload lesson notes and get quiz questions automatically. No typing every question
                by hand.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-neutral-900">Live classroom mode</h3>
              <p className="text-sm text-neutral-600">
                Students join with a code. Real-time leaderboards and results just like Kahoot or
                Gimkit.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-neutral-900">Study from notes</h3>
              <p className="text-sm text-neutral-600">
                Turn lecture notes into flashcards and quizzes for active recall practice like
                Quizlet.
              </p>
            </div>
          </div>

          <h2 className="mb-8 text-2xl font-medium text-neutral-900">Browse alternatives</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {alternatives.map((alt) => (
              <Link
                key={alt.slug}
                href={`/alternatives/${alt.slug}`}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md"
              >
                <h3 className="mb-2 text-xl font-medium text-neutral-900 group-hover:text-violet-600">
                  {alt.name}
                </h3>
                <p className="text-sm text-neutral-600">{alt.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#f5f5f0] px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-medium text-neutral-900">Try it free</h2>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600">
            Generate 5 quizzes per month free. No credit card required. Paid plans start at
            $2/month.
          </p>
          <Link
            href="/ai-quiz-generator"
            className="inline-block rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Generate quiz free
          </Link>
        </div>
      </section>
    </LandingPageLayout>
  );
}
