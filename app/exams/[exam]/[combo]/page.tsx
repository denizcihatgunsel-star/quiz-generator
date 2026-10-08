import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import ComboPage from "@/components/ComboPage";
import { EXAMS, getExam } from "@/lib/seo/exams";
import { COMBO_TYPE_LABELS, EXAM_COMBOS } from "@/lib/seo/combos";
import { copyText, saleCopy, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 60;

export async function generateStaticParams() {
  const params: { exam: string; combo: string }[] = [];
  Object.entries(EXAM_COMBOS).forEach(([examSlug, combos]) => {
    combos.forEach((combo) => {
      params.push({ exam: examSlug, combo: combo.slug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ exam: string; combo: string }>;
}): Promise<Metadata> {
  const { exam: examSlug, combo: comboSlug } = await params;
  const exam = getExam(examSlug);
  const combos = EXAM_COMBOS[examSlug];
  const combo = combos?.find((c) => c.slug === comboSlug);

  if (!exam || !combo) return {};

  const typeLabel = COMBO_TYPE_LABELS[combo.type];
  const title = `${exam.name} ${typeLabel} — ${combo.h1}`;
  const description = combo.intro.slice(0, 155) + "...";

  return pageMetadata({
    title,
    description,
    path: `/exams/${exam.slug}/${combo.slug}`,
  });
}

export default async function ExamComboPage({
  params,
}: {
  params: Promise<{ exam: string; combo: string }>;
}) {
  const { exam: examSlug, combo: comboSlug } = await params;
  const exam = getExam(examSlug);
  const combos = EXAM_COMBOS[examSlug];
  const combo = combos?.find((c) => c.slug === comboSlug);

  if (!exam || !combo) notFound();

  const now = new Date();
  const typeLabel = COMBO_TYPE_LABELS[combo.type];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://www.examina.ink/exams/${exam.slug}/${combo.slug}#webpage`,
        url: `https://www.examina.ink/exams/${exam.slug}/${combo.slug}`,
        name: `${exam.name} ${typeLabel} | Examina`,
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
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
            name: "Exams",
            item: "https://www.examina.ink/exams",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: exam.name,
            item: `https://www.examina.ink/exams/${exam.slug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: typeLabel,
            item: `https://www.examina.ink/exams/${exam.slug}/${combo.slug}`,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        applicationCategory: "EducationalApplication",
        offers: planOffers(now),
      },
      {
        "@type": "FAQPage",
        mainEntity: combo.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
        })),
      },
      ...(combo.type === "flashcards"
        ? [
            {
              "@type": "LearningResource",
              name: `${exam.name} ${typeLabel}`,
              description: combo.intro,
              educationalLevel: "High School to College",
              learningResourceType: "Flashcards",
            },
          ]
        : []),
      ...(combo.type === "practice-questions" || combo.type === "quiz"
        ? [
            {
              "@type": "Quiz",
              name: `${exam.name} ${typeLabel}`,
              description: combo.intro,
              hasPart: combo.sampleItems.slice(0, 5).map((item) => ({
                "@type": "Question",
                text: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ComboPage
        data={combo}
        hubName={exam.fullName}
        hubPath={`/exams/${exam.slug}`}
        allCombos={combos}
      />
    </>
  );
}
