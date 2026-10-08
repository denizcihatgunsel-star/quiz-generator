import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Kahoot Alternative — AI Quiz Generator for Teachers Free",
  description: "Free Kahoot alternative with AI question generation. Create live classroom quizzes from your lesson notes. No question bank limits, no expensive plans.",
  path: "/alternatives/kahoot",
});

const faqs = [
  {
    q: "How is Examina different from Kahoot?",
    a: "Kahoot requires you to write every question by hand. Examina generates quiz questions from your lesson notes using AI. Upload notes, get a game-ready quiz in seconds.",
  },
  {
    q: "Can I run live classroom games like Kahoot?",
    a: "Yes. Students join with a code from their phones—no accounts required. You control pacing and see live results.",
  },
  {
    q: "Is the free plan enough for teachers?",
    a: "The free plan gives 10 quiz generations per month. For daily classroom use, the Team plan ($15/month) offers unlimited quizzes and shared question banks for up to 5 teachers.",
  },
  {
    q: "Do questions have answer explanations?",
    a: "Yes. Every question includes the answer and a brief explanation, so even game-style quizzes teach concepts.",
  },
  {
    q: "Can I reuse questions across classes?",
    a: "Yes. Save any quiz to your library and reuse or remix it. Paid plans let you share quiz banks with other teachers.",
  },
  {
    q: "What about question difficulty?",
    a: "Every question is tagged with a Bloom's taxonomy level (Remember, Understand, Apply, Analyze). Balance easy recall with higher-order thinking.",
  },
];

export default function KahootAlternativePage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/alternatives/kahoot#webpage",
        url: "https://www.examina.ink/alternatives/kahoot",
        name: "Kahoot Alternative — AI Quiz Generator for Teachers Free | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
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
        name: "Kahoot Alternative Features",
        description: "Key features that make Examina a strong alternative to Kahoot for teachers",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AI question generation",
            description: "Upload lesson notes and get quiz questions automatically. No manual typing.",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Live classroom mode",
            description: "Students join with a code. No accounts needed. Real-time results and leaderboards.",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Affordable for teachers",
            description: "Free tier for trying it out. Team plan with unlimited quizzes is $15/month for 5 teachers.",
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
            item: "https://www.examina.ink/alternatives/kahoot",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Kahoot Alternative",
            item: "https://www.examina.ink/alternatives/kahoot",
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
        data={saleLandingData({
          kicker: "Kahoot Alternative",
          h1: "Kahoot alternative with",
          h1Accent: "AI generation",
          subtitle: `Stop typing every quiz question by hand. Upload your lesson notes and Examina writes the questions for you. Run live classroom games with join codes—just like Kahoot, but faster to create.`,
          cta: "Try it free",
          introTitle: "Why teachers are switching from Kahoot",
          intro: [
            "Kahoot made classroom quizzes engaging, but creating a 20-question game still means typing every question, every distractor, and every explanation by hand. For teachers juggling multiple preps, that's hours per week.",
            "Examina flips the process: paste your lesson notes or upload a slide deck, and the AI generates quiz questions automatically—multiple choice, true/false, fill-in-the-blank. Every question includes an explanation and a Bloom's taxonomy tag. You review for accuracy, launch the game, and students join with a code. Same energy as Kahoot, fraction of the prep time.",
          ],
          featuresTitle: "Built for teachers who need quizzes daily",
          features: [
            {
              title: "Generate questions from lessons",
              body: "Upload slides, paste notes, or photograph handouts. Get a complete quiz in under 30 seconds—questions, answers, explanations.",
            },
            {
              title: "Live classroom mode",
              body: "Students join with a code from any device. No sign-up required. You control pacing, see live results, and review explanations after each question.",
            },
            {
              title: "Affordable team plans",
              body: "Free tier for 10 quizzes/month. Team plan ($15/month for 5 teachers) includes unlimited quizzes and a shared question library.",
            },
          ],
          howTitle: "How to run a live quiz with Examina",
          steps: [
            {
              n: "01",
              title: "Generate questions from your lesson",
              body: "Paste notes, upload a PDF or slide deck. Choose multiple choice, true/false, or mixed. AI writes the questions.",
            },
            {
              n: "02",
              title: "Launch the quiz",
              body: "Open classroom mode. Students enter the join code on their phones or laptops—no accounts, no apps to install.",
            },
            {
              n: "03",
              title: "Play and review",
              body: "Control question pacing, display the leaderboard, and show explanations after each round. Export results to track progress.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "More for teachers",
          related: [
            { href: "/for-teachers", label: "For Teachers" },
            { href: "/features/live-classroom-quiz", label: "Live Classroom Quiz" },
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/alternatives/quizizz", label: "Quizizz Alternative" },
            { href: "/alternatives/quizlet", label: "Quizlet Alternative" },
            { href: "/features/blooms-taxonomy", label: "Bloom's Taxonomy" },
          ],
        }, now)}
      />
    </>
  );
}
