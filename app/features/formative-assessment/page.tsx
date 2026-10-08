import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Formative Assessment Tool — AI Exit Tickets & Quick Checks",
  description:
    "Formative assessment tool with AI question generation. Create exit tickets, do-nows, and quick checks from lesson notes in seconds.",
  path: "/features/formative-assessment",
});

const faqs = [
  {
    q: "What's formative assessment?",
    a: "Formative assessment is low-stakes checking for understanding during learning. Exit tickets, do-nows, and quick checks tell you whether students got the concept before moving on.",
  },
  {
    q: "How many questions should a formative check have?",
    a: "2-3 questions that take 3-5 minutes. Formative assessments are quick pulses, not full quizzes.",
  },
  {
    q: "Can students take them without accounts?",
    a: "Yes. Share a link or project questions. For live checks, students join with a code from any device.",
  },
  {
    q: "Is this free for teachers?",
    a: "Free accounts get 10 generations per month. For daily formative checks, Team plan ($15/month for 5 teachers) includes unlimited generation.",
  },
];

export default function FormativeAssessmentPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/features/formative-assessment#webpage",
        url: "https://www.examina.ink/features/formative-assessment",
        name: "Formative Assessment Tool | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description:
          "Formative assessment tool with AI question generation for exit tickets and quick checks.",
        offers: planOffers(now),
      },
      {
        "@type": "HowTo",
        name: "How to create formative assessments with AI",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Paste lesson key points",
            text: "Copy the key concepts from today's lesson",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Generate 2-3 questions",
            text: "AI writes quick check questions in under 30 seconds",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Run the check",
            text: "Project, share link, or launch live mode for instant feedback",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
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
            name: "Features",
            item: "https://www.examina.ink/features",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Formative Assessment",
            item: "https://www.examina.ink/features/formative-assessment",
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
            kicker: "Formative Assessment",
            h1: "Formative assessment tool",
            h1Accent: "with AI",
            subtitle:
              "Generate exit tickets, do-nows, and quick checks from lesson notes in under 30 seconds. See what students understood before moving on.",
            cta: "Generate check free",
            introTitle: "Why formative assessment matters",
            intro: [
              "Formative assessment isn't grading—it's signaling. A well-run quick check tells you, mid-lesson, whether the class understood what you just taught. The problem: writing a good check and running it takes time most teachers don't have, so formative assessment becomes occasional instead of daily.",
              "Examina makes formative checks fast enough to run every day. Paste the key points from today's lesson, generate 2-3 questions, and project or share them. Students answer in 3-5 minutes, you see results immediately, and you know whether to re-teach tomorrow or move on. Same insight, fraction of the effort.",
            ],
            featuresTitle: "Built for daily checks",
            features: [
              {
                title: "Quick generation",
                body: "Paste lesson key points and get 2-3 targeted questions in under 30 seconds. No evening prep required.",
              },
              {
                title: "Leveled questions",
                body: "Mix recall and application questions to see whether students got the concept or just the vocabulary.",
              },
              {
                title: "Instant feedback",
                body: "Run checks live with join codes or share links. See which concepts landed and which need re-teaching.",
              },
            ],
            howTitle: "How to run daily formative checks",
            steps: [
              {
                n: "01",
                title: "Paste lesson key points",
                body: "Copy the 3-5 main concepts from today's lesson. Could be from slides, board notes, or your lesson plan.",
              },
              {
                n: "02",
                title: "Generate questions",
                body: "AI writes 2-3 questions (one recall, one application) with answer keys. Takes under 30 seconds.",
              },
              {
                n: "03",
                title: "Run the check",
                body: "Project for the class, share a link, or launch live mode. Students answer in 3-5 minutes. Review results to inform tomorrow's lesson.",
              },
            ],
            faqTitle: "Frequently asked questions",
            faq: faqs,
            relatedTitle: "Related tools",
            related: [
              { href: "/exit-ticket-generator", label: "Exit Ticket Generator" },
              { href: "/for-teachers", label: "For Teachers" },
              { href: "/features/live-classroom-quiz", label: "Live Classroom Quiz" },
              { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            ],
          },
          now
        )}
      />
    </>
  );
}
