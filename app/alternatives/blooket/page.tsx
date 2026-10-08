import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Blooket Alternative — AI Quiz Generator for Teachers",
  description:
    "Free Blooket alternative with AI question generation. Create game-based classroom quizzes from lesson notes. No manual typing required.",
  path: "/alternatives/blooket",
});

const faqs = [
  {
    q: "How is Examina different from Blooket?",
    a: "Blooket requires manual question entry for each game. Examina generates questions from your lesson notes using AI, then lets you run them as live classroom games.",
  },
  {
    q: "Does it have game modes like Blooket?",
    a: "Examina focuses on traditional quiz gameplay with leaderboards and live results. For variety, use the same questions across different sessions or mix question types.",
  },
  {
    q: "Is the free plan enough for teachers?",
    a: "Free plan includes 5 quiz generations per month—good for trying it out. The Team plan ($15/month for 5 teachers) offers unlimited quizzes for daily classroom use.",
  },
  {
    q: "Can students play without accounts?",
    a: "Yes. Students join with a code from any device. No sign-up required for classroom games.",
  },
];

export default function BlooketAlternativePage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/alternatives/blooket#webpage",
        url: "https://www.examina.ink/alternatives/blooket",
        name: "Blooket Alternative | Examina",
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
        name: "Blooket Alternative Features",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AI question generation",
            description: "Generate quiz questions from lesson notes automatically—no typing.",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Live classroom mode",
            description: "Students join with a code and play together with live leaderboards.",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Affordable pricing",
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
            item: "https://www.examina.ink/alternatives/blooket",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Blooket Alternative",
            item: "https://www.examina.ink/alternatives/blooket",
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
            kicker: "Blooket Alternative",
            h1: "Blooket alternative with",
            h1Accent: "AI question generation",
            subtitle:
              "Stop typing every quiz question by hand. Upload lesson notes and Examina writes the questions for you. Run live classroom games with join codes—same engagement, fraction of the setup time.",
            cta: "Try it free",
            introTitle: "The faster way to create classroom quiz games",
            intro: [
              "Blooket's game modes make review sessions exciting for students. But creating a 20-question game still means typing every question, every answer choice, and every explanation manually. For teachers with multiple preps, that time adds up fast.",
              "Examina automates question creation: paste your lesson notes or upload slides, and AI generates the quiz questions automatically. You get multiple choice, true/false, and fill-in-the-blank questions with explanations and Bloom's taxonomy tags. Review them once, then launch a live classroom game where students join with a code. Same engaging review format, much faster teacher setup.",
            ],
            featuresTitle: "Built for teachers who need quizzes daily",
            features: [
              {
                title: "Generate questions from lesson notes",
                body: "Upload slides, paste notes, or photograph handouts. Get a complete quiz in under 30 seconds with questions, answers, and explanations.",
              },
              {
                title: "Live classroom gameplay",
                body: "Students join with a code from any device. No accounts needed. Real-time leaderboards and result tracking just like Blooket.",
              },
              {
                title: "Affordable team plans",
                body: "Free tier for 5 quizzes/month. Team plan ($15/month for 5 teachers) includes unlimited quiz generation and shared question banks.",
              },
            ],
            howTitle: "How to run a classroom quiz game",
            steps: [
              {
                n: "01",
                title: "Generate questions from your lesson",
                body: "Paste notes or upload lesson materials. AI writes the quiz questions with answer explanations.",
              },
              {
                n: "02",
                title: "Launch the game",
                body: "Open classroom mode. Students enter the join code on their phones—no apps to install.",
              },
              {
                n: "03",
                title: "Play and review results",
                body: "Control pacing, show leaderboards, and display explanations after each question. Export results when done.",
              },
            ],
            faqTitle: "Frequently asked questions",
            faq: faqs,
            relatedTitle: "More alternatives",
            related: [
              { href: "/alternatives/kahoot", label: "Kahoot Alternative" },
              { href: "/alternatives/gimkit", label: "Gimkit Alternative" },
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
