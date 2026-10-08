import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { INTEGRATIONS, getIntegration } from "@/lib/seo/integrations";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export async function generateStaticParams() {
  return INTEGRATIONS.map((int) => ({ integration: int.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ integration: string }>;
}): Promise<Metadata> {
  const { integration: integrationSlug } = await params;
  const integration = getIntegration(integrationSlug);
  if (!integration) return {};

  return pageMetadata({
    title: `${integration.name} Quiz Generator — AI Questions for ${integration.fullName}`,
    description: `${integration.description} Free to try.`,
    path: `/integrations/${integration.slug}`,
  });
}

export default async function IntegrationPage({ params }: { params: Promise<{ integration: string }> }) {
  const { integration: integrationSlug } = await params;
  const integration = getIntegration(integrationSlug);
  if (!integration) notFound();

  const now = new Date();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://www.examina.ink/integrations/${integration.slug}#webpage`,
        url: `https://www.examina.ink/integrations/${integration.slug}`,
        name: `${integration.name} Quiz Generator | Examina`,
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description: integration.description,
        offers: planOffers(now),
      },
      {
        "@type": "HowTo",
        name: `How to use Examina with ${integration.name}`,
        step: integration.workflow.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step,
          text: step,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: integration.faq.map((f) => ({
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
            name: "Integrations",
            item: "https://www.examina.ink/integrations",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: integration.name,
            item: `https://www.examina.ink/integrations/${integration.slug}`,
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
            kicker: `${integration.name} Integration`,
            h1: `${integration.name} quiz generator`,
            h1Accent: "with AI",
            subtitle: integration.description,
            cta: "Generate questions free",
            introTitle: `How to use Examina with ${integration.name}`,
            intro: [
              `Creating quiz questions for ${integration.name} takes time. You have to write every question, every answer choice, and every explanation manually, then enter them into ${integration.name}.`,
              `Examina speeds that up: upload your course material and AI generates quiz questions automatically. Review them, then add to ${integration.name} using the workflow below. Same final quiz, fraction of the setup time.`,
            ],
            featuresTitle: "What you get",
            features: [
              {
                title: "AI question generation",
                body: "Upload content and get multiple choice, true/false, and fill-in-the-blank questions with answer keys in under 30 seconds.",
              },
              {
                title: "Review and edit",
                body: "Check AI-generated questions for accuracy. Edit wording, answers, or explanations before using them.",
              },
              {
                title: `Works with ${integration.name}`,
                body: `Follow the workflow below to add questions to ${integration.name} or share quiz links directly with students.`,
              },
            ],
            howTitle: `Workflow: Examina → ${integration.name}`,
            steps: integration.workflow.map((step, i) => ({
              n: `0${i + 1}`,
              title: step,
              body: step,
            })),
            faqTitle: "Frequently asked questions",
            faq: integration.faq,
            relatedTitle: "Related integrations",
            related: integration.relatedTools.map((href) => {
              const labels: Record<string, string> = {
                "/integrations/canvas": "Canvas Integration",
                "/integrations/moodle": "Moodle Integration",
                "/integrations/google-forms": "Google Forms Integration",
                "/integrations/google-classroom": "Google Classroom",
                "/integrations/blackboard": "Blackboard Integration",
                "/integrations/qti": "QTI Format",
                "/ai-quiz-generator": "AI Quiz Generator",
                "/for-teachers": "For Teachers",
                "/test-generator": "Test Generator",
                "/multiple-choice-quiz-maker": "Multiple Choice Maker",
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
