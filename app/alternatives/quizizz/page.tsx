import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Quizizz Alternative — AI-Powered Quiz Maker for Teachers",
  description: "Free Quizizz alternative with AI question generation. Create self-paced or live quizzes from lesson notes. No question limits, better pricing.",
  path: "/alternatives/quizizz",
});

const faqs = [
  {
    q: "How is Examina different from Quizizz?",
    a: "Quizizz requires manual question entry. Examina generates questions from your lesson content using AI, saving hours of prep time.",
  },
  {
    q: "Does it support self-paced quizzes like Quizizz?",
    a: "Yes. Share a quiz link and students work at their own pace. Or run it live with real-time leaderboards.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. Generate 5 quizzes per month free. For unlimited use, Team plan is $15/month for up to 5 teachers.",
  },
  {
    q: "Can I see individual student results?",
    a: "Yes. View results by student, by question, and by class. Export to CSV for grade books.",
  },
  {
    q: "Do students need accounts?",
    a: "Not for live games—they join with a code. For self-paced quizzes, students can take them without signing up.",
  },
];

export default function QuizizzAlternativePage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/alternatives/quizizz#webpage",
        url: "https://www.examina.ink/alternatives/quizizz",
        name: "Quizizz Alternative — AI-Powered Quiz Maker for Teachers | Examina",
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
        name: "Quizizz Alternative Features",
        description: "Key features that make Examina a strong alternative to Quizizz",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AI question generation",
            description: "Generate quiz questions from your lesson notes automatically.",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Live and self-paced modes",
            description: "Run synchronous classroom games or assign self-paced homework quizzes.",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Better value",
            description: "Team plan with unlimited quizzes is $15/month—far less than Quizizz Super.",
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
            item: "https://www.examina.ink/alternatives/quizizz",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Quizizz Alternative",
            item: "https://www.examina.ink/alternatives/quizizz",
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
          kicker: "Quizizz Alternative",
          h1: "Quizizz alternative with",
          h1Accent: "AI generation",
          subtitle: `Create quizzes from lesson notes in seconds. Run them live in class or assign for homework. Students join with a code—no accounts needed.`,
          cta: "Try it free",
          introTitle: "The faster way to create classroom quizzes",
          intro: [
            "Quizizz is a favorite for self-paced and live quizzes, but building a question bank still takes hours. Examina automates that step: upload your lesson slides, paste notes, or photograph a handout, and the AI writes the questions.",
            "You get multiple choice, true/false, and fill-in-the-blank questions, each tagged with a Bloom's taxonomy level and difficulty. Review the set, launch it live or share a link for homework, and view results by student or by question. Same flexibility as Quizizz, fraction of the setup time.",
          ],
          featuresTitle: "Everything you need for classroom quizzes",
          features: [
            {
              title: "AI writes the questions",
              body: "Upload lesson content and get a complete quiz in under 30 seconds—questions, answers, explanations, and Bloom's levels.",
            },
            {
              title: "Live or self-paced",
              body: "Run synchronized classroom games with leaderboards, or share a link for students to complete at their own pace.",
            },
            {
              title: "Results and analytics",
              body: "See which questions stumped the class. Track scores by student. Export data to spreadsheets or your grade book.",
            },
          ],
          howTitle: "How it works",
          steps: [
            {
              n: "01",
              title: "Upload lesson content",
              body: "Paste text, upload slides, or photograph notes. Choose question types and difficulty.",
            },
            {
              n: "02",
              title: "Review and launch",
              body: "Check the AI-generated questions for accuracy. Launch live for in-class play, or share a link for homework.",
            },
            {
              n: "03",
              title: "Review results",
              body: "See real-time leaderboards during live games. After, view performance by student and by question to identify gaps.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "More for teachers",
          related: [
            { href: "/for-teachers", label: "For Teachers" },
            { href: "/alternatives/kahoot", label: "Kahoot Alternative" },
            { href: "/features/live-classroom-quiz", label: "Live Classroom Quiz" },
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Maker" },
          ],
        }, now)}
      />
    </>
  );
}
