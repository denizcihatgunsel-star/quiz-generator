import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Gimkit Alternative — AI Quiz Generator for Teachers",
  description:
    "Free Gimkit alternative with AI question generation. Create engaging classroom quizzes from lesson notes. No manual question entry required.",
  path: "/alternatives/gimkit",
});

const faqs = [
  {
    q: "How is Examina different from Gimkit?",
    a: "Gimkit requires manual question entry. Examina generates questions from your lesson notes using AI, saving hours of prep time for daily quizzes.",
  },
  {
    q: "Does it have in-game upgrades like Gimkit?",
    a: "Examina focuses on straightforward quiz gameplay with leaderboards and live results. For variety, mix question types or run multiple sessions.",
  },
  {
    q: "Is the free plan enough for teachers?",
    a: "Free plan includes 5 quiz generations per month. For daily classroom use, the Team plan ($15/month for 5 teachers) offers unlimited quizzes.",
  },
  {
    q: "Can students play without accounts?",
    a: "Yes. Students join with a code from any device. No sign-up required for classroom games.",
  },
];

export default function GimkitAlternativePage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/alternatives/gimkit#webpage",
        url: "https://www.examina.ink/alternatives/gimkit",
        name: "Gimkit Alternative | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description: "AI quiz generator with alternatives to Kahoot, Quizizz, and other platforms.",
        offers: planOffers(now),
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
        "@type": "ItemList",
        name: "Gimkit Alternative Features",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AI question generation",
            description: "Generate quiz questions from lesson notes automatically—no typing required.",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Live classroom mode",
            description: "Students join with a code and compete with live leaderboards.",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Affordable team pricing",
            description: "Team plan with unlimited quizzes is $15/month for 5 teachers.",
          },
        ],
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
            name: "Alternatives",
            item: "https://www.examina.ink/alternatives/gimkit",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Gimkit Alternative",
            item: "https://www.examina.ink/alternatives/gimkit",
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
            kicker: "Gimkit Alternative",
            h1: "Gimkit alternative with",
            h1Accent: "AI question generation",
            subtitle:
              "Stop typing every quiz question by hand. Upload lesson notes and Examina writes the questions for you. Run engaging classroom games with join codes—same excitement, fraction of the setup time.",
            cta: "Try it free",
            introTitle: "The faster way to create classroom quizzes",
            intro: [
              "Gimkit's game mechanics keep students engaged and motivated to earn in-game currency and upgrades. But creating a quiz for Gimkit still means typing every question, every answer choice, and every explanation manually. For teachers running daily formative assessments, that's time they don't have.",
              "Examina automates question creation: paste your lesson notes or upload slides, and AI generates the quiz questions automatically. You get multiple choice, true/false, and fill-in-the-blank questions with explanations and Bloom's taxonomy tags. Review them once, then launch a live classroom game where students join with a code. Same competitive energy, much faster teacher setup.",
            ],
            featuresTitle: "Built for daily classroom use",
            features: [
              {
                title: "Generate questions from notes",
                body: "Upload slides, paste notes, or photograph handouts. Get a complete quiz in under 30 seconds with questions, answers, and explanations.",
              },
              {
                title: "Live classroom gameplay",
                body: "Students join with a code from any device. Real-time leaderboards and result tracking keep engagement high.",
              },
              {
                title: "Affordable for teams",
                body: "Free tier for 5 quizzes/month. Team plan ($15/month for 5 teachers) includes unlimited quiz generation and shared question banks.",
              },
            ],
            howTitle: "How to run a classroom game",
            steps: [
              {
                n: "01",
                title: "Generate questions",
                body: "Paste notes or upload lesson materials. AI writes the quiz questions with answer explanations in seconds.",
              },
              {
                n: "02",
                title: "Launch the game",
                body: "Open classroom mode. Students enter the join code on their phones—no apps to install, no accounts needed.",
              },
              {
                n: "03",
                title: "Play and review",
                body: "Control question pacing, show leaderboards, and display explanations. Export results to track progress.",
              },
            ],
            faqTitle: "Frequently asked questions",
            faq: faqs,
            relatedTitle: "More alternatives",
            related: [
              { href: "/alternatives/kahoot", label: "Kahoot Alternative" },
              { href: "/alternatives/blooket", label: "Blooket Alternative" },
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
