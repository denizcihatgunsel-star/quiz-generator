import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { COMPARE_PAGES, getComparePage } from "@/lib/seo/comparisons";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export async function generateStaticParams() {
  return COMPARE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) return {};

  return pageMetadata({
    title: `${page.title} — Feature Comparison 2026`,
    description: `${page.subtitle} Compare features, pricing, and which platform is best for teachers and students.`,
    path: `/compare/${page.slug}`,
  });
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) notFound();

  const now = new Date();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://www.examina.ink/compare/${page.slug}#webpage`,
        url: `https://www.examina.ink/compare/${page.slug}`,
        name: `${page.title} | Examina`,
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description: "AI quiz generator - compare features, pricing, and capabilities with alternatives.",
        offers: planOffers(now),
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
        })),
      },
      ...(page.vs
        ? [
            {
              "@type": "ItemList",
              name: page.title,
              description: page.subtitle,
              itemListElement: page.vs.map((item, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: item.platform,
                description: item.description,
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.examina.ink",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Compare",
            item: `https://www.examina.ink/compare/${page.slug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.title,
            item: `https://www.examina.ink/compare/${page.slug}`,
          },
        ],
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
        data={saleLandingData(
          {
            kicker: "Platform Comparison",
            h1: page.title,
            h1Accent: "",
            subtitle: page.subtitle,
            cta: "Try Examina free",
            introTitle: "The comparison",
            intro: page.intro,
            featuresTitle: page.vs ? "Side by side" : "Key differences",
            features: page.vs
              ? page.vs.map((item) => ({
                  title: item.platform,
                  body: item.description,
                }))
              : [
                  {
                    title: "Feature comparison",
                    body: "Both platforms offer live classroom quizzes with different strengths.",
                  },
                ],
            howTitle: "Frequently asked questions",
            steps: [],
            faqTitle: "Frequently asked questions",
            faq: page.faq,
            relatedTitle: "Related pages",
            related: page.relatedTools.map((href) => {
              const labels: Record<string, string> = {
                "/alternatives/kahoot": "Kahoot Alternative",
                "/alternatives/quizizz": "Quizizz Alternative",
                "/alternatives/quizlet": "Quizlet Alternative",
                "/for-teachers": "For Teachers",
                "/features/live-classroom-quiz": "Live Classroom Quiz",
                "/ai-flashcards": "AI Flashcards",
                "/ai-quiz-generator": "AI Quiz Generator",
                "/for-students": "For Students",
              };
              return { href, label: labels[href] || href };
            }),
          },
          now
        )}
      />
    </>
  );
}
