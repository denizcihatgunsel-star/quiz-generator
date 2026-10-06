import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, planOffers, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "AI Question Generator — Generate Questions from Any Text",
  description: "Turn any text into quiz questions with AI. Generate multiple choice, true/false, fill-in-the-blank questions from notes, PDFs, or documents. Free.",
  path: "/ai-question-generator",
  images: [
    {
      url: "https://www.examina.ink/og/ai-question-generator.png",
      width: 1200,
      height: 630,
      alt: "AI question generator creating quiz questions from text",
    },
  ],
});

const faqs = [
  {
    q: "How does the AI question generator work?",
    a: "Upload your content or paste text. The AI reads it, identifies key concepts, and generates questions at different cognitive levels—from recall to analysis.",
  },
  {
    q: "What question formats does it generate?",
    a: "Multiple choice, true/false, fill-in-the-blank, and flashcards. All from the same source material.",
  },
  {
    q: "Is it free to use?",
    a: "Yes. Generate 5 question sets per month free. Paid plans start at $2/month for 20 generations.",
  },
  {
    q: "Are the questions accurate?",
    a: "Questions are generated directly from your material and tagged with Bloom's taxonomy levels. Always review generated content before using it for grading.",
  },
  {
    q: "Can I edit the generated questions?",
    a: "Yes. Every question is editable. Adjust wording, change options, or regenerate if needed.",
  },
  {
    q: "What file types are supported?",
    a: "PDF, TXT, Markdown, pasted text, and photos of notes (OCR).",
  },
];

export default function AiQuestionGeneratorPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/ai-question-generator#webpage",
        url: "https://www.examina.ink/ai-question-generator",
        name: "AI Question Generator — Generate Questions from Any Text | Examina",
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
          "AI question generator that creates multiple choice, true/false, fill-in-the-blank questions and flashcards from any text, with Bloom's taxonomy tagging.",
        offers: planOffers(now),
        publisher: { "@id": "https://www.examina.ink/#organization" },
      },
      {
        "@type": "HowTo",
        name: "How to Generate Questions with AI",
        description: "Generate quiz questions from any text using AI in three steps",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Input your material",
            text: "Paste text, upload a PDF, TXT or Markdown file, or photograph notes.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Select question types",
            text: "Choose from multiple choice, true/false, fill-in-the-blank, or flashcards.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Review and use",
            text: "Get generated questions with answers, explanations, and Bloom's levels. Edit as needed.",
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
            name: "AI Question Generator",
            item: "https://www.examina.ink/ai-question-generator",
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
          kicker: "AI Question Generator",
          h1: "Generate questions from",
          h1Accent: "any text",
          subtitle: `Turn lecture notes, textbook chapters, or articles into quiz questions automatically. The AI reads your material and writes questions at every cognitive level—from basic recall to critical analysis.`,
          cta: "Generate questions free",
          introTitle: "AI that writes questions the way teachers do",
          intro: [
            "Good questions test understanding, not just memory. Examina's AI question generator analyzes your content and creates questions across Bloom's taxonomy—remember, understand, apply, analyze. You get multiple choice questions with plausible distractors, true/false checks for misconceptions, fill-in-the-blank for terminology, and flashcards for review.",
            "Every question includes the answer, an explanation, and a difficulty tag. That means the output is immediately usable for practice or teaching—just review for accuracy and you're done.",
          ],
          featuresTitle: "What makes these questions different",
          features: [
            {
              title: "Bloom's taxonomy mapping",
              body: "Every question is tagged with its cognitive level—Remember, Understand, Apply, or Analyze. Build balanced assessments that test more than memorization.",
            },
            {
              title: "Context-aware generation",
              body: "Questions are written from YOUR material, not generic trivia. The AI identifies key concepts, creates plausible wrong answers from common misconceptions, and writes explanations that teach.",
            },
            {
              title: "Four question types",
              body: "Get multiple choice, true/false, fill-in-the-blank, and flashcards from a single upload. Mix formats to test different skills.",
            },
          ],
          howTitle: "How it works",
          steps: [
            {
              n: "01",
              title: "Upload content",
              body: "Paste text (50 to 15,000 characters), upload a PDF, TXT or Markdown file, or take a photo of notes. Examina extracts and processes the text.",
            },
            {
              n: "02",
              title: "AI generates questions",
              body: "The model reads your material, identifies key concepts, and writes questions at multiple cognitive levels with answers and explanations.",
            },
            {
              n: "03",
              title: "Review and export",
              body: "Check the questions for accuracy, edit as needed, then use them for practice, teaching, or assessments. Share by link or export to PDF.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "Related tools",
          related: [
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Quiz Maker" },
            { href: "/true-false-quiz-generator", label: "True/False Generator" },
            { href: "/notes-to-quiz", label: "Notes to Quiz" },
            { href: "/quiz-generator-from-text", label: "Quiz from Text" },
            { href: "/study-guide-generator", label: "Study Guide Generator" },
          ],
        }, now)}
      />
    </>
  );
}
