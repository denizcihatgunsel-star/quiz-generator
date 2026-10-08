import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Test Generator — AI Practice Test Maker Free",
  description:
    "Create practice tests from study material with AI. Upload notes and generate complete tests with answer keys. Free to try.",
  path: "/test-generator",
});

const faqs = [
  {
    q: "How is a test different from a quiz?",
    a: "Tests are typically longer and more comprehensive than quizzes. Both can be generated from your study material—use 'quiz' for quick checks and 'test' for full assessments.",
  },
  {
    q: "Can I create midterm or final exams?",
    a: "Yes. Upload notes from multiple units or an entire semester and generate a comprehensive practice test covering all material.",
  },
  {
    q: "Do tests include an answer key?",
    a: "Yes. Every test includes a complete answer key with explanations for all questions.",
  },
  {
    q: "Is this free?",
    a: "Free accounts get 5 test generations per month. Paid plans start at $2/month for 20 generations.",
  },
];

export default function TestGeneratorPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/test-generator#webpage",
        url: "https://www.examina.ink/test-generator",
        name: "Test Generator | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description:
          "AI test generator that creates practice tests from any study material. Upload notes and get complete tests with answer keys.",
        offers: planOffers(now),
      },
      {
        "@type": "HowTo",
        name: "How to generate a practice test",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Upload study material",
            text: "Upload your study material (PDF, text, or notes)",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Choose settings",
            text: "Choose question types and difficulty level",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Review test",
            text: "Review the generated test with answer key",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Take or share",
            text: "Take it online, share by link, or export as PDF",
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
            name: "Test Generator",
            item: "https://www.examina.ink/test-generator",
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
            kicker: "AI Test Generator",
            h1: "Test generator",
            h1Accent: "from your notes",
            subtitle:
              "AI test generator that creates practice tests from any study material. Upload notes and get complete tests with answer keys in seconds.",
            cta: "Generate test free",
            introTitle: "Create practice tests automatically",
            intro: [
              "Creating quality test questions takes time. A comprehensive practice test with good questions, plausible distractors, and detailed explanations can take hours to write by hand.",
              "Examina's test generator automates that process. Upload your study material or lesson notes, and the AI reads it to generate test questions automatically. You get multiple choice, true/false, and fill-in-the-blank questions with complete answer keys and explanations in under 30 seconds. Perfect for students preparing for exams or teachers creating assessments.",
            ],
            featuresTitle: "Why use an AI test generator",
            features: [
              {
                title: "Complete test creation",
                body: "Generate full-length practice tests with multiple question types, difficulty levels, and comprehensive answer keys all at once.",
              },
              {
                title: "Answer explanations",
                body: "Every question includes the correct answer and a detailed explanation showing why it's right and why other options are wrong.",
              },
              {
                title: "Bloom's taxonomy tagging",
                body: "Questions are tagged by cognitive level (Remember, Understand, Apply, Analyze) so you know what skills you're testing and where to focus study efforts.",
              },
            ],
            howTitle: "How to generate a test",
            steps: [
              {
                n: "01",
                title: "Upload study material",
                body: "Paste text, upload a PDF, or photograph your notes. Anything from a single chapter to a full semester's material.",
              },
              {
                n: "02",
                title: "Choose test format",
                body: "Select question types (MCQ, T/F, fill-blank) and how many questions you want. AI handles the rest.",
              },
              {
                n: "03",
                title: "Review and take",
                body: "Get your complete test with answer key. Take it online, share by link for study groups, or export as PDF to print.",
              },
            ],
            faqTitle: "Frequently asked questions",
            faq: faqs,
            relatedTitle: "Related tools",
            related: [
              { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
              { href: "/practice-test-generator", label: "Practice Test Generator" },
              { href: "/exam-generator", label: "Exam Generator" },
              { href: "/mcq-generator", label: "MCQ Generator" },
              { href: "/for-students", label: "For Students" },
            ],
          },
          now
        )}
      />
    </>
  );
}
