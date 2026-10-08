import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { SUBJECTS, getSubject } from "@/lib/seo/subjects";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export async function generateStaticParams() {
  return SUBJECTS.map((subject) => ({ subject: subject.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);
  if (!subject) return {};

  return pageMetadata({
    title: `${subject.name} Quiz Generator — AI ${subject.name} Practice Questions`,
    description: `Generate ${subject.name} quiz questions from your notes. ${subject.description} Free to try.`,
    path: `/subjects/${subject.slug}`,
  });
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);
  if (!subject) notFound();

  const now = new Date();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://www.examina.ink/subjects/${subject.slug}#webpage`,
        url: `https://www.examina.ink/subjects/${subject.slug}`,
        name: `${subject.name} Quiz Generator | Examina`,
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description: `${subject.name} quiz generator. ${subject.description}`,
        offers: planOffers(now),
      },
      {
        "@type": "FAQPage",
        mainEntity: subject.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
        })),
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
            kicker: `${subject.name} Quiz Generator`,
            h1: `${subject.name} quiz generator`,
            h1Accent: "from your notes",
            subtitle: `${subject.description} Upload your class notes, textbook pages, or lecture slides and get quiz questions with explanations instantly.`,
            cta: "Generate quiz",
            introTitle: `Turn ${subject.name} notes into practice questions`,
            intro: [
              `Studying ${subject.name.toLowerCase()} means understanding concepts, not just memorizing definitions. The best way to test understanding is through practice questions—but writing good questions takes time most students don't have.`,
              `Examina reads your ${subject.name.toLowerCase()} notes and generates quiz questions automatically. Upload a textbook chapter, paste lecture notes, or photograph study material, and get multiple choice, true/false, and fill-in-the-blank questions with explanations. Questions are tagged by difficulty and Bloom's taxonomy level so you know whether you're testing recall or real comprehension.`,
              ...(subject.topicsList
                ? [
                    `Common ${subject.name.toLowerCase()} topics you can generate questions for: ${subject.topicsList.join("; ")}.`,
                  ]
                : []),
            ],
            featuresTitle: `What makes good ${subject.name} questions`,
            features: [
              {
                title: "Based on your material",
                body: `Questions come from your specific notes and textbook, not generic question banks, so practice matches what you're actually studying in class.`,
              },
              {
                title: "Explanations included",
                body: `Every question includes the correct answer and an explanation. When you miss one, you learn why immediately instead of just seeing a score.`,
              },
              {
                title: "Mixed difficulty",
                body: `Questions span easy recall to harder application and analysis, helping you identify which concepts you understand and which need more work.`,
              },
            ],
            howTitle: `Sample ${subject.name} questions`,
            intro2: [
              `Here are examples of ${subject.name.toLowerCase()} questions Examina can generate. Actual questions come from your uploaded study material, so they match your course content exactly.`,
              ...(subject.questionTypesAdvice ? [`**Which question types work best for ${subject.name.toLowerCase()}:** ${subject.questionTypesAdvice}`] : []),
              ...(subject.studyTips
                ? [`**Study tips for ${subject.name.toLowerCase()}:** ${subject.studyTips.join(" ")}`]
                : []),
            ],
            steps: subject.sampleQuestions.map((sq, i) => ({
              n: `0${i + 1}`,
              title: sq.q,
              body: `Answer: ${sq.a}. Explanation: ${sq.explanation}`,
            })),
            faqTitle: "Frequently asked questions",
            faq: subject.faq,
            relatedTitle: "Related tools",
            related: subject.relatedTools.map((href) => {
              const labels: Record<string, string> = {
                "/ai-quiz-generator": "AI Quiz Generator",
                "/multiple-choice-quiz-maker": "Multiple Choice Maker",
                "/quiz-generator-from-pdf": "PDF to Quiz",
                "/notes-to-quiz": "Notes to Quiz",
                "/study-guide-generator": "Study Guide Generator",
                "/ai-flashcards": "AI Flashcards",
                "/for-students": "For Students",
                "/vocabulary": "Vocabulary Quiz",
                "/fill-in-the-blank-generator": "Fill in the Blank",
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
