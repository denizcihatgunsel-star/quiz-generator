import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Nearpod Alternative — AI Quiz Generator for Teachers",
  description:
    "Free Nearpod alternative with AI question generation. Create interactive quizzes from lesson content in seconds.",
  path: "/alternatives/nearpod",
});

const faqs = [
  {
    q: "How is Examina different from Nearpod?",
    a: "Nearpod is a full presentation platform with embedded assessments. Examina focuses specifically on quiz generation with AI, turning your existing lessons into practice questions instantly.",
  },
  {
    q: "Does it work with presentations?",
    a: "Yes. Upload your slide deck PDF or paste lesson content, and Examina generates quiz questions from it. Use those questions in Nearpod or run them independently.",
  },
  {
    q: "Is there a free tier?",
    a: "Free plan includes 5 quiz generations per month. Team plan ($15/month for 5 teachers) offers unlimited quizzes.",
  },
  {
    q: "Can I export questions to Nearpod?",
    a: "Examina generates questions you can manually copy into Nearpod or use directly in Examina's live classroom mode.",
  },
];

export default function NearpodAlternativePage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/alternatives/nearpod#webpage",
        url: "https://www.examina.ink/alternatives/nearpod",
        name: "Nearpod Alternative | Examina",
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
        name: "Nearpod Alternative Features",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AI quiz generation",
            description: "Generate quiz questions from lesson content automatically.",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Live and self-paced modes",
            description: "Run quizzes live in class or share links for homework.",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Better value",
            description: "Focus on assessment without paying for full presentation software.",
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
            item: "https://www.examina.ink/alternatives/nearpod",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Nearpod Alternative",
            item: "https://www.examina.ink/alternatives/nearpod",
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
            kicker: "Nearpod Alternative",
            h1: "Nearpod alternative for",
            h1Accent: "quiz creation",
            subtitle:
              "If you need quiz questions from lesson content but don't need full presentation software, Examina generates questions with AI. Fast, affordable, focused on assessment.",
            cta: "Generate quiz free",
            introTitle: "Assessment without the full platform",
            intro: [
              "Nearpod is a comprehensive interactive lesson platform with embedded quizzes, polls, and virtual reality. It's powerful but comes with complexity and cost. If you already have presentation tools and just need better formative assessments, you're paying for features you don't use.",
              "Examina focuses on one thing: generating quiz questions from your lesson content using AI. Upload your slides or paste notes, get multiple choice and true/false questions with explanations, then run them live or share for homework. Use alongside your existing presentation tools, or use Examina's classroom mode for game-based review.",
            ],
            featuresTitle: "What you get",
            features: [
              {
                title: "AI question generation",
                body: "Upload lesson content and get quiz questions in under 30 seconds. Questions include answers, explanations, and difficulty tags.",
              },
              {
                title: "Live classroom mode",
                body: "Students join with a code. Real-time leaderboards and pacing controls, no Nearpod subscription required.",
              },
              {
                title: "Focus on what matters",
                body: "No learning curve for presentation features you don't need. Just generate questions and assess understanding.",
              },
            ],
            howTitle: "How it works",
            steps: [
              {
                n: "01",
                title: "Upload lesson content",
                body: "Paste text or upload your existing presentation as PDF. Examina reads it and identifies key concepts.",
              },
              {
                n: "02",
                title: "Generate questions",
                body: "AI writes quiz questions with answer choices and explanations. Review and edit if needed.",
              },
              {
                n: "03",
                title: "Assess students",
                body: "Run the quiz live in class, share a link for homework, or copy questions into Nearpod if you prefer.",
              },
            ],
            faqTitle: "Frequently asked questions",
            faq: faqs,
            relatedTitle: "More alternatives",
            related: [
              { href: "/alternatives/kahoot", label: "Kahoot Alternative" },
              { href: "/alternatives/quizizz", label: "Quizizz Alternative" },
              { href: "/for-teachers", label: "For Teachers" },
              { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            ],
          },
          now
        )}
      />
    </>
  );
}
