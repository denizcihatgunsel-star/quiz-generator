import type { Metadata } from "next";
import { pageMetadata, LANGUAGE_COUNT } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "AI Flashcards — Generate Flashcards from Notes | Examina",
  description: "Make AI flashcards from your notes, a PDF or a photo in seconds. Study with flip cards and spaced repetition, then quiz yourself. Free to start.",
  path: "/ai-flashcards",
  images: [
    {
      url: "https://www.examina.ink/og/ai-flashcards.png",
      width: 1200,
      height: 630,
      alt: "Examina AI flashcards generated from study notes",
    },
  ],
});

const faqs = [
  {
    q: "Are the AI flashcards free?",
    a: "Yes. The Free plan includes 5 generations a month with no credit card, and paid plans start at $2/month.",
  },
  {
    q: "Can I make flashcards from a PDF or a photo?",
    a: "Yes. Upload a PDF, TXT or Markdown file, or a photo of a page, or paste text directly. Each generation reads up to 15,000 characters.",
  },
  {
    q: "Do the flashcards use spaced repetition?",
    a: "Yes. Study mode schedules flashcard reviews at spaced intervals, so the cards you find hard come back more often.",
  },
  {
    q: "Do the flashcards work on mobile?",
    a: "Yes. Cards flip with a 3D animation and work in modern mobile browsers.",
  },
  {
    q: "Can I turn the same notes into a quiz?",
    a: "Yes. The same material can become multiple choice, true/false or fill-in-the-blank questions as well as flashcards.",
  },
  {
    q: "Can I share a deck?",
    a: "Yes. Sharing by link and PDF download are available on paid plans.",
  },
  {
    q: "What languages are supported?",
    a: `Examina generates flashcards in ${LANGUAGE_COUNT} languages, in the language of your source material or the one you're learning.`,
  },
];

export default function AiFlashcardsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/ai-flashcards#webpage",
        url: "https://www.examina.ink/ai-flashcards",
        name: "AI Flashcards — Generate Flashcards from Notes | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
        about: { "@id": "https://www.examina.ink/#software" },
        primaryImageOfPage: "https://www.examina.ink/og/ai-flashcards.png",
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
          kicker: "AI Flashcards",
          h1: "AI flashcards from your own",
          h1Accent: "notes",
          subtitle: `Skip the hours of typing cards. Paste your notes, upload a PDF or snap a photo of a page, and Examina's AI flashcard generator builds a deck of question-and-answer cards in under 30 seconds, ready to flip, review and quiz yourself on. Free to start.`,
          cta: "Generate flashcards free",
          introTitle: "What makes a good AI flashcard",
          intro: [
            "A good flashcard tests one idea, asks a specific question and has a short answer you can check instantly. Examina reads your whole text for context, pulls out the key terms, definitions and relationships, and writes cards that follow those rules. You get 'What does the mitochondrial inner membrane host?' rather than a card with half the chapter pasted on the back. Each card is tagged with a Bloom's taxonomy level, so your deck goes beyond definitions. Want to build a full study set with quizzes and flashcards? Check out the study guide generator.",
          ],
          featuresTitle: "Flashcards and quizzes from the same notes",
          features: [
            {
              title: "Spaced repetition and streaks",
              body: "Cramming a deck once doesn't last. Examina's study mode spaces your reviews out, showing cards you struggle with more often and easy ones less often. Daily challenges and streaks help the habit stick.",
            },
            {
              title: "Works on mobile",
              body: `Cards flip with a 3D animation and work in all modern mobile browsers. Study anywhere.`,
            },
            {
              title: `${LANGUAGE_COUNT} languages`,
              body: `Generate flashcards in the same language as your source material, useful for vocabulary from a text you're reading.`,
            },
          ],
          howTitle: "How the AI flashcard generator works",
          steps: [
            {
              n: "01",
              title: "Add your study material",
              body: "Paste 50 to 15,000 characters of text, upload a PDF, TXT or Markdown file, or take a photo of a printed or handwritten page.",
            },
            {
              n: "02",
              title: "AI writes the cards",
              body: "Examina identifies what's worth remembering and turns it into question-and-answer pairs.",
            },
            {
              n: "03",
              title: "Flip, review, repeat",
              body: "Study the cards with a 3D flip on desktop or mobile. Study mode then schedules reviews with spaced repetition, bringing cards back just before you'd forget them.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "Explore more ways to study",
          related: [
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/study-guide-generator", label: "Study Guide Generator" },
            { href: "/notes-to-quiz", label: "Notes to Quiz" },
            { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
            { href: "/study-quiz", label: "Study Quiz" },
          ],
        }}
      />
    </>
  );
}
