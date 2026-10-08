import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import ComboPage from "@/components/ComboPage";
import { SUBJECTS, getSubject } from "@/lib/seo/subjects";
import { COMBO_TYPE_LABELS, SUBJECT_COMBOS } from "@/lib/seo/combos";
import { copyText, saleCopy, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 60;

export async function generateStaticParams() {
  const params: { subject: string; combo: string }[] = [];
  Object.entries(SUBJECT_COMBOS).forEach(([subjectSlug, combos]) => {
    combos.forEach((combo) => {
      params.push({ subject: subjectSlug, combo: combo.slug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; combo: string }>;
}): Promise<Metadata> {
  const { subject: subjectSlug, combo: comboSlug } = await params;
  const subject = getSubject(subjectSlug);
  const combos = SUBJECT_COMBOS[subjectSlug];
  const combo = combos?.find((c) => c.slug === comboSlug);

  if (!subject || !combo) return {};

  const typeLabel = COMBO_TYPE_LABELS[combo.type];
  const title = `${subject.name} ${typeLabel}: ${combo.meta.primaryKeyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Examina`;
  const description = combo.intro.slice(0, 155) + "...";

  return pageMetadata({
    title,
    description,
    path: `/subjects/${subject.slug}/${combo.slug}`,
  });
}

export default async function SubjectComboPage({
  params,
}: {
  params: Promise<{ subject: string; combo: string }>;
}) {
  const { subject: subjectSlug, combo: comboSlug } = await params;
  const subject = getSubject(subjectSlug);
  const combos = SUBJECT_COMBOS[subjectSlug];
  const combo = combos?.find((c) => c.slug === comboSlug);

  if (!subject || !combo) notFound();

  const now = new Date();
  const typeLabel = COMBO_TYPE_LABELS[combo.type];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://www.examina.ink/subjects/${subject.slug}/${combo.slug}#webpage`,
        url: `https://www.examina.ink/subjects/${subject.slug}/${combo.slug}`,
        name: `${subject.name} ${typeLabel} | Examina`,
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
            name: "Subjects",
            item: "https://www.examina.ink/subjects",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: subject.name,
            item: `https://www.examina.ink/subjects/${subject.slug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: typeLabel,
            item: `https://www.examina.ink/subjects/${subject.slug}/${combo.slug}`,
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
      ...(combo.type === "flashcards" || combo.type === "worksheet-generator" || combo.type === "quiz-generator"
        ? [
            {
              "@type": "LearningResource",
              name: `${subject.name} ${typeLabel}`,
              description: combo.intro,
              educationalLevel: "High School to College",
              learningResourceType: combo.type === "flashcards" ? "Flashcards" : "Worksheet",
            },
          ]
        : []),
      ...(combo.type === "practice-questions" || combo.type === "quiz"
        ? [
            {
              "@type": "Quiz",
              name: `${subject.name} ${typeLabel}`,
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
        hubName={subject.name}
        hubPath={`/subjects/${subject.slug}`}
        allCombos={combos}
      />
    </>
  );
}
