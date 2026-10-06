import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, planOffers, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Exam Generator — Create Practice Exams from Your Notes",
  description: "Generate practice exams from notes, PDFs, or textbooks with AI. Multiple choice, true/false, fill-in-the-blank questions with answer keys. Free.",
  path: "/exam-generator",
  images: [
    {
      url: "https://www.examina.ink/og/exam-generator.png",
      width: 1200,
      height: 630,
      alt: "Exam generator creating practice tests from study material",
    },
  ],
});

const faqs = [
  {
    q: "What kind of exams can I generate?",
    a: "Practice exams for any subject. Upload your study material and get multiple choice, true/false, and fill-in-the-blank questions with full answer keys.",
  },
  {
    q: "Is the exam generator free?",
    a: "Yes. Create up to 5 exams per month free. Paid plans start at $2/month for 20 exams.",
  },
  {
    q: "How long does it take to generate an exam?",
    a: "Most exams generate in under 30 seconds. Larger documents may take up to a minute.",
  },
  {
    q: "Can I control the difficulty?",
    a: "Yes. Choose easy, medium, or hard. Every question is also tagged with its Bloom's taxonomy level so you can see the cognitive complexity.",
  },
  {
    q: "Are these official practice exams?",
    a: "No. Examina creates practice questions based on YOUR study material. It does not produce official exam content.",
  },
  {
    q: "Can I print the exam?",
    a: "Yes. Download any exam as a PDF for printing or offline use.",
  },
];

export default function ExamGeneratorPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/exam-generator#webpage",
        url: "https://www.examina.ink/exam-generator",
        name: "Exam Generator — Create Practice Exams from Your Notes | Examina",
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
          "Exam generator that creates practice tests from study notes, PDFs, or textbooks. Includes multiple choice, true/false, and fill-in-the-blank questions with answer keys and explanations.",
        offers: planOffers(now),
        publisher: { "@id": "https://www.examina.ink/#organization" },
      },
      {
        "@type": "HowTo",
        name: "How to Generate a Practice Exam",
        description: "Create a practice exam in three steps using AI",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Upload study material",
            text: "Paste notes, upload a PDF or textbook chapter, or photograph study guides.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Set preferences",
            text: "Choose question types, difficulty level, and number of questions.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Generate and practice",
            text: "Get your exam with full answer key and explanations. Take it online, share it, or print it.",
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
            name: "Exam Generator",
            item: "https://www.examina.ink/exam-generator",
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
          kicker: "Exam Generator",
          h1: "Generate practice exams from",
          h1Accent: "your notes",
          subtitle: `Turn study material into full practice exams. Upload notes or a textbook chapter and get a complete test with multiple choice, true/false, and fill-in-the-blank questions—all with an answer key.`,
          cta: "Generate an exam free",
          introTitle: "Practice exams that test what you're actually studying",
          intro: [
            "The best exam prep comes from testing yourself on the material before the real thing. Examina's exam generator reads your lecture notes, textbook chapters, or study guides and produces a complete practice test with questions at every difficulty level.",
            "Every exam includes an answer key with explanations, so taking a practice exam also becomes a study session. Questions are tagged by Bloom's taxonomy level—recall, understanding, application, analysis—so you can see which cognitive skills you're strong in and which need more work.",
          ],
          featuresTitle: "What you get with every exam",
          features: [
            {
              title: "Complete answer keys",
              body: "Every question comes with the correct answer and a brief explanation. Know why you got something wrong, not just that you did.",
            },
            {
              title: "Balanced difficulty",
              body: "Questions span easy, medium, and hard, and are tagged with Bloom's levels. Practice recall and application, not just memorization.",
            },
            {
              title: "Export and share",
              body: "Download as PDF for printing. Share by link with classmates or students. Run as a live quiz with join codes.",
            },
          ],
          howTitle: "How to create a practice exam",
          steps: [
            {
              n: "01",
              title: "Add your material",
              body: "Paste text, upload a PDF, TXT or Markdown file, or snap a photo of printed or handwritten notes. Examina processes up to 15,000 characters per generation.",
            },
            {
              n: "02",
              title: "Choose your settings",
              body: "Pick question types (multiple choice, true/false, fill-in-the-blank), set difficulty, and select a language. The generator handles the rest.",
            },
            {
              n: "03",
              title: "Practice and review",
              body: "Take the exam online with instant scoring. Review explanations for every question. Come back later to track improvement.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "Related exam prep tools",
          related: [
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/study-guide-generator", label: "Study Guide Generator" },
            { href: "/notes-to-quiz", label: "Notes to Quiz" },
            { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
            { href: "/study-quiz", label: "Study Quiz" },
            { href: "/for-students", label: "For Students" },
          ],
        }, now)}
      />
    </>
  );
}
