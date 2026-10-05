import type { Metadata } from "next";
import { pageMetadata, LANGUAGE_COUNT } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "AI Quiz Generator — Quizzes from Any Material",
  description: "Paste notes, upload a PDF or snap a photo and Examina's AI quiz generator writes multiple choice, true/false, fill-in-the-blank and flashcards. Free.",
  path: "/ai-quiz-generator",
  images: [
    {
      url: "https://www.examina.ink/og/ai-quiz-generator.png",
      width: 1200,
      height: 630,
      alt: "Examina AI quiz generator turning notes into a multiple-choice quiz",
    },
  ],
});

const faqs = [
  {
    q: "Is the AI quiz generator free?",
    a: "Yes. The Free plan includes 5 quizzes per month and doesn't need a credit card. Paid plans start at $2/month for 20 quizzes.",
  },
  {
    q: "What question types can it generate?",
    a: "Multiple choice, true/false, fill-in-the-blank and flashcards, all from the same source material. Each question includes the answer, an explanation and a difficulty tag.",
  },
  {
    q: "What can I upload?",
    a: "Paste text, or upload a PDF, TXT or Markdown file, or a photo of a page. Each generation reads 50 to 15,000 characters.",
  },
  {
    q: "How good are the questions?",
    a: "Questions are written only from your material and tagged by Bloom's taxonomy level, from recall to analysis. Like any AI output, they should be reviewed before you use them for grades.",
  },
  {
    q: "Can I share a quiz with students or classmates?",
    a: "Yes. Sharing by link and PDF download are available on paid plans, and students can join a live classroom quiz with a code.",
  },
  {
    q: "Does it work in other languages?",
    a: `Yes. Examina generates questions in ${LANGUAGE_COUNT} languages.`,
  },
  {
    q: "Is my content stored?",
    a: "Your source text is used to generate the questions and isn't stored on Examina's servers. The quizzes you generate are saved to your account.",
  },
];

export default function AiQuizGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/ai-quiz-generator#webpage",
        url: "https://www.examina.ink/ai-quiz-generator",
        name: "AI Quiz Generator — Quizzes from Any Material | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
        about: { "@id": "https://www.examina.ink/#software" },
        primaryImageOfPage: "https://www.examina.ink/og/ai-quiz-generator.png",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "AI quiz and flashcard generator that turns notes, PDFs or pasted text into multiple choice, true/false, fill-in-the-blank questions and flashcards tagged by Bloom's taxonomy level.",
        offers: [
          {
            "@type": "Offer",
            name: "Free",
            price: "0",
            priceCurrency: "USD",
            url: "https://www.examina.ink/pricing",
          },
          {
            "@type": "Offer",
            name: "Starter",
            price: "2",
            priceCurrency: "USD",
            url: "https://www.examina.ink/pricing",
          },
          {
            "@type": "Offer",
            name: "Plus",
            price: "5",
            priceCurrency: "USD",
            url: "https://www.examina.ink/pricing",
          },
          {
            "@type": "Offer",
            name: "Pro",
            price: "9",
            priceCurrency: "USD",
            url: "https://www.examina.ink/pricing",
          },
          {
            "@type": "Offer",
            name: "Team",
            price: "15",
            priceCurrency: "USD",
            url: "https://www.examina.ink/pricing",
          },
        ],
        publisher: { "@id": "https://www.examina.ink/#organization" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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
        data={{
          kicker: "AI Quiz Generator",
          h1: "AI quiz generator for your own study",
          h1Accent: "material",
          subtitle: `Paste your notes, upload a PDF or snap a photo of a page. Examina reads it and writes a quiz from that material: multiple choice, true/false, fill-in-the-blank and flashcards, each question tagged with its Bloom's taxonomy level. Free to start, no credit card.`,
          cta: "Generate a quiz free",
          introTitle: "What Examina's AI quiz generator does",
          intro: [
            "Most quiz makers still expect you to write the questions yourself. Examina's AI quiz generator starts from the material you give it (lecture notes, a textbook section, a handout, an article) and writes questions about that content, not generic trivia on a topic. Every question comes with the correct answer, a short explanation and a difficulty tag, so a practice round also teaches you why an answer is right.",
            `You can paste anywhere from 50 to 15,000 characters per generation, roughly a few paragraphs up to a long chapter section. For longer documents, generate in parts so each quiz stays focused. Want to turn your notes into a study guide? Check out the study guide generator.`,
          ],
          featuresTitle: "Four question types from one source",
          features: [
            {
              title: "Multiple choice",
              body: "Each generation gives you 5–6 multiple-choice questions with four options. The wrong answers are plausible distractors rather than obvious throwaways, so you can tell whether you really understand a concept.",
            },
            {
              title: "True/false",
              body: "Quick checks for facts and common misconceptions, each with an explanation. Learn more about creating true/false questions.",
            },
            {
              title: "Fill-in-the-blank",
              body: "Cloze-style questions that make you recall the exact term instead of recognising it from a list.",
            },
          ],
          howTitle: "How to generate a quiz with AI",
          steps: [
            {
              n: "01",
              title: "Add your material",
              body: "Paste text, upload a PDF, TXT or Markdown file, or take a photo of a printed or handwritten page. Examina extracts the text first.",
            },
            {
              n: "02",
              title: "Pick a format and generate",
              body: "Choose multiple choice, true/false, fill-in-the-blank or flashcards. Most quizzes are ready in under 30 seconds.",
            },
            {
              n: "03",
              title: "Practice, review and share",
              body: "Take the quiz, read the explanations for anything you missed, and come back to it later. Depending on your plan, you can also share a quiz by link or download it as a PDF.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "More ways to turn material into questions",
          related: [
            { href: "/notes-to-quiz", label: "Notes to Quiz" },
            { href: "/ai-flashcards", label: "AI Flashcards" },
            { href: "/true-false-quiz-generator", label: "True/False Quiz Generator" },
            { href: "/study-guide-generator", label: "Study Guide Generator" },
            { href: "/create-a-quiz", label: "Create a Quiz" },
            { href: "/free-quiz-generator", label: "Free Quiz Generator" },
            { href: "/quiz-generator-from-text", label: "Quiz Generator from Text" },
            { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
          ],
        }}
      />
    </>
  );
}