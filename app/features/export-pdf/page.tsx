import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Export Quiz to PDF — Download and Print Quizzes",
  description:
    "Export quizzes to PDF for printing. Generate questions with AI, then download as PDF using your browser. Free to try.",
  path: "/features/export-pdf",
});

const faqs = [
  {
    q: "How does PDF export work?",
    a: "After generating a quiz, click 'Download PDF' and your browser opens a print dialog. Save as PDF to get a formatted document with questions and answer key.",
  },
  {
    q: "Does it include answer keys?",
    a: "Yes. The PDF includes all questions, answer choices, correct answers, and explanations in a printable format.",
  },
  {
    q: "Is PDF export free?",
    a: "Yes. PDF export uses your browser's built-in print-to-PDF feature and is available on all plans including free.",
  },
  {
    q: "Can I edit the PDF after exporting?",
    a: "The PDF is a formatted snapshot. To edit questions, make changes in Examina before exporting.",
  },
];

export default function ExportPDFPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/features/export-pdf#webpage",
        url: "https://www.examina.ink/features/export-pdf",
        name: "Export Quiz to PDF | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description: "Export quizzes to PDF for printing. Browser-based PDF generation.",
        offers: planOffers(now),
      },
      {
        "@type": "HowTo",
        name: "How to export quiz to PDF",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Generate quiz",
            text: "Create a quiz from your notes using AI",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Click Download PDF",
            text: "Browser opens print dialog with formatted quiz",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Save as PDF",
            text: "Choose 'Save as PDF' in print dialog to download",
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
            name: "Features",
            item: "https://www.examina.ink/features",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Export PDF",
            item: "https://www.examina.ink/features/export-pdf",
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
            kicker: "Export to PDF",
            h1: "Export quizzes to PDF",
            h1Accent: "for printing",
            subtitle:
              "Generate quizzes with AI, then export to PDF using your browser. Print for paper quizzes or distribute offline.",
            cta: "Generate quiz",
            introTitle: "Print quizzes for offline use",
            intro: [
              "Not every quiz needs to be digital. Paper quizzes work for testing centers, classrooms without devices, and students who prefer physical study materials. Generating questions with AI is fast—getting them into a printable format shouldn't slow you down.",
              "Examina's PDF export uses your browser's built-in print-to-PDF feature. Generate a quiz from your notes, click 'Download PDF,' and your browser opens a formatted document with all questions, answer choices, and answer key. Save as PDF to download, then print or distribute. No special software, no account requirements beyond basic Examina access.",
            ],
            featuresTitle: "What's included in the PDF",
            features: [
              {
                title: "Formatted questions",
                body: "All quiz questions with answer choices laid out in a clean, printable format. Questions are numbered and clearly separated.",
              },
              {
                title: "Complete answer key",
                body: "Correct answers and explanations for every question included at the end. Mark paper quizzes faster or let students self-check.",
              },
              {
                title: "Browser-based",
                body: "Uses your browser's native print-to-PDF feature. Works on all plans, no special export subscription required.",
              },
            ],
            howTitle: "How to export to PDF",
            steps: [
              {
                n: "01",
                title: "Generate quiz",
                body: "Upload notes or paste text. AI generates quiz questions with answers and explanations.",
              },
              {
                n: "02",
                title: "Click Download PDF",
                body: "Browser opens a print dialog showing the formatted quiz with questions and answer key.",
              },
              {
                n: "03",
                title: "Save and print",
                body: "Choose 'Save as PDF' to download, or send directly to printer. Distribute to students or use for paper testing.",
              },
            ],
            faqTitle: "Frequently asked questions",
            faq: faqs,
            relatedTitle: "Related features",
            related: [
              { href: "/features/shared-quiz-links", label: "Shared Quiz Links" },
              { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
              { href: "/for-teachers", label: "For Teachers" },
            ],
          },
          now
        )}
      />
    </>
  );
}
