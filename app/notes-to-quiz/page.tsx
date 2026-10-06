import type { Metadata } from "next";
import { pageMetadata, LANGUAGE_COUNT } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";

// Re-rendered at least every 60s so the Halloween sale copy reverts on its own after the cutoff.
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Notes to Quiz — Turn Your Notes into a Quiz",
  description: "Turn lecture notes, typed or handwritten, into a practice quiz in seconds. Multiple choice, true/false and flashcards from your own notes. Start free.",
  path: "/notes-to-quiz",
  images: [
    {
      url: "https://www.examina.ink/og/notes-to-quiz.png",
      width: 1200,
      height: 630,
      alt: "Examina turning handwritten class notes into a practice quiz",
    },
  ],
});

const faqs = [
  {
    q: "Is turning notes into a quiz free?",
    a: "Yes. The Free plan includes 5 quizzes a month with no credit card. Paid plans start at $2/month.",
  },
  {
    q: "Do my notes need to be organised?",
    a: "No. Bullet points, half-sentences and shorthand all work. The AI identifies the concepts and writes complete questions.",
  },
  {
    q: "Can I use handwritten notes?",
    a: "Yes. Upload a clear photo of the page and the text is extracted before the quiz is generated.",
  },
  {
    q: "How much of my notes can I use at once?",
    a: "Each generation reads 50 to 15,000 characters, about one lecture. Split longer notes into several quizzes.",
  },
  {
    q: "What kinds of questions will I get?",
    a: "Multiple choice, true/false, fill-in-the-blank or flashcards, each with an answer, an explanation and a Bloom's taxonomy level.",
  },
  {
    q: "Are my notes saved?",
    a: "Your notes are used only to generate the questions and aren't stored on Examina's servers. The quizzes you generate are saved to your account.",
  },
  {
    q: "Can I share the quiz with my study group?",
    a: "Yes. Sharing by link and PDF download are available on paid plans.",
  },
];

export default function NotesToQuizPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/notes-to-quiz#webpage",
        url: "https://www.examina.ink/notes-to-quiz",
        name: "Notes to Quiz — Turn Your Notes into a Quiz | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
        about: { "@id": "https://www.examina.ink/#software" },
        primaryImageOfPage: "https://www.examina.ink/og/notes-to-quiz.png",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
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
        data={saleLandingData({
          kicker: "Notes to Quiz",
          h1: "Turn your notes into a",
          h1Accent: "quiz",
          subtitle: `You took the notes. Now find out what stuck. Paste your lecture notes or snap a photo of your notebook, and Examina writes a practice quiz from exactly what you wrote: same terms, same examples, same emphasis. Free to start, no credit card.`,
          cta: "Make a quiz from my notes",
          introTitle: "Why quiz yourself on your own notes",
          intro: [
            "Re-reading notes feels productive, but it mostly builds familiarity, not recall. Answering questions without looking (active recall) is what research keeps linking to better exam results. The catch is that writing good questions takes longer than reading. Examina removes that step. Because the quiz comes from your notes and not a generic question bank, it tests what your lecturer actually covered. Want to make a study guide from your notes? Check out our guide.",
          ],
          featuresTitle: "Works with messy, real-world notes",
          features: [
            {
              title: "Half-sentences and bullet fragments",
              body: "Class notes are rarely tidy. Examina picks out the concepts in shorthand and bullet lists and writes complete, readable questions from them.",
            },
            {
              title: "Handwritten pages",
              body: "Snap a photo of your notebook and the text is extracted before questions are generated. Good lighting and a flat page give the best results, and anything illegible is simply left out.",
            },
            {
              title: "Slides and handouts",
              body: "Copy the text from lecture slides or upload a handout PDF. For a full textbook PDF, see PDF to quiz.",
            },
          ],
          howTitle: "How to turn notes into a quiz",
          steps: [
            {
              n: "01",
              title: "Add your notes",
              body: "Paste typed notes from any app, upload a PDF, TXT or Markdown file, or take a clear photo of a handwritten page. Examina reads the text first (OCR for photos). Each generation handles 50 to 15,000 characters, about one lecture's worth.",
            },
            {
              n: "02",
              title: "Choose how you want to be tested",
              body: "Multiple choice for exam-style practice, true or false questions from your notes for quick checks, fill-in-the-blank to force exact recall, or flashcards for fast review.",
            },
            {
              n: "03",
              title: "Take the quiz and learn from your misses",
              body: "Every question comes with the answer and a short explanation, so a wrong answer becomes a mini-lesson. Retake the quiz a few days later, or move the tricky concepts into flashcards.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "Explore more ways to study",
          related: [
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/study-guide-generator", label: "Study Guide Generator" },
            { href: "/true-false-quiz-generator", label: "True/False Quiz Generator" },
            { href: "/ai-flashcards", label: "AI Flashcards" },
            { href: "/quiz-generator-from-text", label: "Quiz from Text" },
            { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
            { href: "/study-quiz", label: "Study Quiz" },
          ],
        }, now)}
      />
    </>
  );
}
