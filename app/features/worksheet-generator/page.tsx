import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "AI Worksheet Generator — Create Practice Worksheets from Notes",
  description: "Generate printable worksheets from lesson notes. Multiple choice, fill-in-the-blank, true/false questions with answer keys. Export to PDF.",
  path: "/features/worksheet-generator",
});

const faqs = [
  {
    q: "What's included in a generated worksheet?",
    a: "Questions (multiple choice, true/false, fill-in-the-blank) based on your lesson content, plus a separate answer key with explanations.",
  },
  {
    q: "Can I print the worksheets?",
    a: "Yes. Export any worksheet as a PDF for printing. Answer key included.",
  },
  {
    q: "Is this free?",
    a: "Yes. Generate 5 worksheets per month free. Paid plans start at $2/month for 20 worksheets.",
  },
  {
    q: "Can I edit the questions before printing?",
    a: "Yes. Review and edit any question, answer, or explanation before exporting.",
  },
  {
    q: "What subjects does it work for?",
    a: "Any subject. Upload lesson notes and the AI generates questions from your content—science, history, math, languages, anything.",
  },
];

export default function WorksheetGeneratorPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/features/worksheet-generator#webpage",
        url: "https://www.examina.ink/features/worksheet-generator",
        name: "AI Worksheet Generator — Create Practice Worksheets | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description:
          "AI worksheet generator that creates printable practice worksheets from lesson notes. Includes multiple choice, fill-in-the-blank, and true/false questions with answer keys.",
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
            item: "https://www.examina.ink/features/worksheet-generator",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Worksheet Generator",
            item: "https://www.examina.ink/features/worksheet-generator",
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
          kicker: "AI Worksheet Generator",
          h1: "Generate printable worksheets",
          h1Accent: "from notes",
          subtitle: `Turn lesson notes into practice worksheets. Upload your content and get multiple choice, fill-in-the-blank, and true/false questions with answer keys. Download as PDF and print.`,
          cta: "Generate a worksheet free",
          introTitle: "Worksheets that write themselves",
          intro: [
            "Creating a worksheet by hand—typing questions, formatting answer blanks, writing an answer key, laying it out for printing—takes an hour for a single page. Multiply that by every prep, every week, and it's easy to see why teachers skip practice worksheets they'd otherwise assign.",
            "Examina automates the entire process: paste your lesson notes or upload slides, choose question types, and generate a complete worksheet with an answer key in under 30 seconds. Review the questions, export as PDF, and print. The time saved goes back into teaching.",
          ],
          featuresTitle: "What you get",
          features: [
            {
              title: "AI-generated questions",
              body: "Upload lesson content and get worksheet questions automatically—multiple choice, fill-in-the-blank, true/false. Each question is drawn from YOUR material.",
            },
            {
              title: "Answer keys included",
              body: "Every worksheet comes with a separate answer key with explanations. Print both or keep the key for yourself.",
            },
            {
              title: "PDF export for printing",
              body: "Export worksheets as PDFs formatted for standard paper. Print as many copies as you need.",
            },
          ],
          howTitle: "How to create a worksheet",
          steps: [
            {
              n: "01",
              title: "Upload lesson content",
              body: "Paste text, upload a PDF, or photograph notes. Choose question types and difficulty.",
            },
            {
              n: "02",
              title: "Review and edit",
              body: "Check the generated questions. Edit wording, adjust difficulty, or regenerate if needed.",
            },
            {
              n: "03",
              title: "Download and print",
              body: "Export as PDF with the answer key. Print copies for class or assign digitally.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "Related tools",
          related: [
            { href: "/for-teachers", label: "For Teachers" },
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/fill-in-the-blank-generator", label: "Fill-in-the-Blank Generator" },
            { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Maker" },
            { href: "/study-guide-generator", label: "Study Guide Generator" },
          ],
        }, now)}
      />
    </>
  );
}
