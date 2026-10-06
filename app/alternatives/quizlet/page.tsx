import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Quizlet Alternative — AI Flashcards & Quiz Generator Free",
  description: "Free Quizlet alternative with AI-powered flashcard and quiz generation. Turn notes or PDFs into study sets automatically. No user-generated content limits.",
  path: "/alternatives/quizlet",
});

const faqs = [
  {
    q: "How is Examina different from Quizlet?",
    a: "Examina generates flashcards and quizzes from YOUR notes using AI. Quizlet requires you to build sets manually or search user-generated content. Examina starts with your material, not someone else's.",
  },
  {
    q: "Is Examina free like Quizlet?",
    a: "Yes. Generate 5 study sets per month free. Paid plans start at $2/month for 20 sets—far cheaper than Quizlet Plus.",
  },
  {
    q: "Can I import my Quizlet sets?",
    a: "Export your Quizlet sets as text or CSV and paste them into Examina. Or start fresh—paste new notes and let AI generate the set.",
  },
  {
    q: "Does it have spaced repetition like Quizlet?",
    a: "Yes. Study mode uses spaced repetition to schedule reviews automatically, so you practice cards right before you'd forget them.",
  },
  {
    q: "What about live games like Quizlet Live?",
    a: "Examina has live classroom quiz mode with join codes. Students play from phones without accounts—similar to Quizlet Live, but with AI-generated questions.",
  },
  {
    q: "Can I use it for languages?",
    a: "Yes. Generate flashcards and quizzes in 29 languages. Perfect for vocabulary, grammar, and comprehension practice.",
  },
];

export default function QuizletAlternativePage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/alternatives/quizlet#webpage",
        url: "https://www.examina.ink/alternatives/quizlet",
        name: "Quizlet Alternative — AI Flashcards & Quiz Generator Free | Examina",
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
        name: "Quizlet Alternative Features",
        description: "Key features that make Examina a strong alternative to Quizlet",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AI generation from your notes",
            description: "Upload notes or PDFs and get flashcards automatically. No manual card creation.",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free tier with no ads",
            description: "5 generations per month free. No forced ads or locked features.",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Quiz and flashcard generation",
            description: "Get multiple choice, true/false, fill-in-the-blank, and flashcards from one upload.",
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
            item: "https://www.examina.ink/alternatives/quizlet",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Quizlet Alternative",
            item: "https://www.examina.ink/alternatives/quizlet",
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
          kicker: "Quizlet Alternative",
          h1: "Free Quizlet alternative with",
          h1Accent: "AI generation",
          subtitle: `Tired of typing every flashcard by hand? Examina generates flashcards and quizzes from your notes using AI. Upload a PDF or paste text—get a complete study set in seconds.`,
          cta: "Try it free",
          introTitle: "Why teachers and students are switching from Quizlet",
          intro: [
            "Quizlet revolutionized flashcards, but it still requires you to build every set manually or search user-generated content that may not match your course. Examina takes a different approach: paste your lecture notes, upload a PDF, or snap a photo, and the AI writes the flashcards for you.",
            "You get flashcards plus multiple choice, true/false, and fill-in-the-blank questions from the same source. Every card and question includes context and explanations, so review also teaches. And unlike Quizlet's expensive Plus tier, Examina's paid plans start at just $2/month.",
          ],
          featuresTitle: "What makes Examina different",
          features: [
            {
              title: "AI flashcard generation",
              body: "Upload notes or a PDF. Examina reads it and creates flashcards automatically—front, back, context. No typing every card by hand.",
            },
            {
              title: "Quiz questions included",
              body: "Get multiple choice, true/false, and fill-in-the-blank questions from the same upload. Study with cards, then test yourself with quizzes.",
            },
            {
              title: "Better free plan",
              body: "Quizlet's free tier has ads and locks features. Examina's free plan gives you 5 AI generations per month with no ads and no time limit.",
            },
          ],
          howTitle: "How to make flashcards with Examina",
          steps: [
            {
              n: "01",
              title: "Upload your material",
              body: "Paste text, upload a PDF, TXT or Markdown file, or take a photo of notes. Examina extracts the content.",
            },
            {
              n: "02",
              title: "AI generates the set",
              body: "In under 30 seconds, you get flashcards with context, plus quiz questions at multiple difficulty levels.",
            },
            {
              n: "03",
              title: "Study with spaced repetition",
              body: "Review cards on a schedule that adapts to what you know. Export, share, or run a live classroom quiz.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "Try these study tools",
          related: [
            { href: "/ai-flashcards", label: "AI Flashcards" },
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/study-guide-generator", label: "Study Guide Generator" },
            { href: "/alternatives/kahoot", label: "Kahoot Alternative" },
            { href: "/for-students", label: "For Students" },
            { href: "/for-teachers", label: "For Teachers" },
          ],
        }, now)}
      />
    </>
  );
}
