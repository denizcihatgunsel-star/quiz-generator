import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, planOffers, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Online Quiz Maker — Create Quizzes Online Free",
  description: "Make quizzes online with AI. Upload notes or paste text and get multiple choice, true/false, fill-in-the-blank questions. Start free.",
  path: "/online-quiz-maker",
  images: [
    {
      url: "https://www.examina.ink/og/online-quiz-maker.png",
      width: 1200,
      height: 630,
      alt: "Examina online quiz maker interface",
    },
  ],
});

const faqs = [
  {
    q: "Is the online quiz maker free?",
    a: "Yes. Create up to 10 quizzes per month free. Paid plans start at $2/month for 20 quizzes.",
  },
  {
    q: "What question types can I create?",
    a: "Multiple choice, true/false, fill-in-the-blank, and flashcards—all generated from your content.",
  },
  {
    q: "Do I need to download software?",
    a: "No. Examina works entirely in your browser on any device.",
  },
  {
    q: "Can I share quizzes with students?",
    a: "Yes. Share by link or download as PDF. Live classroom mode available for real-time quizzes.",
  },
  {
    q: "How long does it take to make a quiz?",
    a: "Most quizzes generate in under 30 seconds from your notes.",
  },
];

export default function OnlineQuizMakerPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/online-quiz-maker#webpage",
        url: "https://www.examina.ink/online-quiz-maker",
        name: "Online Quiz Maker — Create Quizzes Online Free | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
        about: { "@id": "https://www.examina.ink/#software" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "Online quiz maker that turns notes, PDFs or text into multiple choice, true/false, fill-in-the-blank questions and flashcards using AI. No software to install.",
        offers: planOffers(now),
        publisher: { "@id": "https://www.examina.ink/#organization" },
      },
      {
        "@type": "HowTo",
        name: "How to Create a Quiz Online",
        description: "Create a quiz online in three steps with AI-powered question generation",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Upload your material",
            text: "Paste text, upload a PDF, TXT or Markdown file, or snap a photo of notes.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Choose question types",
            text: "Select multiple choice, true/false, fill-in-the-blank or flashcards.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Generate and share",
            text: "Get your quiz in seconds. Share by link, download as PDF, or host a live session.",
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
            name: "Online Quiz Maker",
            item: "https://www.examina.ink/online-quiz-maker",
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
          kicker: "Online Quiz Maker",
          h1: "Create quizzes",
          h1Accent: "online",
          subtitle: `Make professional quizzes online without downloads or setup. Paste your notes, upload a document, or snap a photo—Examina's AI writes the questions for you.`,
          cta: "Start creating free",
          introTitle: "The online quiz maker that writes questions for you",
          intro: [
            "Traditional quiz makers require you to type every question by hand. Examina is different: it reads your study material—lecture notes, a textbook chapter, a PDF, or a photo—and generates the questions automatically. You get multiple choice, true/false, fill-in-the-blank, and flashcards from a single upload, all with answer keys and explanations.",
            "Because it runs entirely in your browser, there's no software to install and no platform lock-in. Create a quiz on your laptop, review it on your phone, share a link with students, or download a PDF for printing.",
          ],
          featuresTitle: "Everything you need to create quizzes online",
          features: [
            {
              title: "AI question generation",
              body: "Upload notes or paste text. Examina writes multiple choice, true/false, fill-in-the-blank questions and flashcards automatically, each with answers and explanations.",
            },
            {
              title: "Works on any device",
              body: "Create and edit quizzes from your browser—desktop, tablet, or phone. No apps or downloads required.",
            },
            {
              title: "Share instantly",
              body: "Every quiz gets a shareable link. Students can take it without an account. Export to PDF for printing or offline use.",
            },
          ],
          howTitle: "How to make a quiz online in three steps",
          steps: [
            {
              n: "01",
              title: "Add your content",
              body: "Paste text, upload a PDF, TXT or Markdown file, or take a photo of handwritten or printed notes.",
            },
            {
              n: "02",
              title: "Pick your question types",
              body: "Choose multiple choice, true/false, fill-in-the-blank, flashcards, or all four. Set the difficulty and language.",
            },
            {
              n: "03",
              title: "Generate and share",
              body: "Your quiz is ready in under 30 seconds. Share by link, download as PDF, or launch a live classroom session with join codes.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "More ways to create quizzes",
          related: [
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/free-quiz-generator", label: "Free Quiz Generator" },
            { href: "/create-a-quiz", label: "Create a Quiz" },
            { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
            { href: "/for-teachers", label: "For Teachers" },
            { href: "/for-students", label: "For Students" },
          ],
        }, now)}
      />
    </>
  );
}
