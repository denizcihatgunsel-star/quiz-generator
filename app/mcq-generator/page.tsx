import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "MCQ Generator — Multiple Choice Question Generator Free",
  description:
    "Multiple choice questions generator that creates MCQs with plausible distractors. Free to try, no credit card required.",
  path: "/mcq-generator",
});

const faqs = [
  {
    q: "How many answer choices per question?",
    a: "Each MCQ has 4 answer choices: one correct answer and three distractors (wrong answers).",
  },
  {
    q: "Are the distractors believable?",
    a: "Yes. Distractors are based on common misconceptions and related concepts, not obviously wrong answers.",
  },
  {
    q: "Can I edit the questions?",
    a: "Yes. After generation, you can edit questions, answers, and explanations before saving or sharing.",
  },
  {
    q: "Is MCQ generation free?",
    a: "Free accounts get 5 quiz generations per month. Each generation can include MCQs. Paid plans start at $2/month.",
  },
];

export default function MCQGeneratorPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/mcq-generator#webpage",
        url: "https://www.examina.ink/mcq-generator",
        name: "MCQ Generator | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description:
          "Multiple choice questions generator that creates MCQs with plausible distractors from any text.",
        offers: planOffers(now),
      },
      {
        "@type": "HowTo",
        name: "How to generate MCQs",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Add content",
            text: "Paste your lesson content or upload study material",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Set quantity",
            text: "Specify how many MCQs you need",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Generate",
            text: "AI generates questions with 4 answer choices each",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Review",
            text: "Review questions and edit if needed",
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
            name: "MCQ Generator",
            item: "https://www.examina.ink/mcq-generator",
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
            kicker: "MCQ Generator",
            h1: "Multiple choice question generator",
            h1Accent: "with smart distractors",
            subtitle:
              "AI-powered MCQ generator that creates multiple choice questions with plausible distractors from any text. Perfect for teachers and students.",
            cta: "Generate MCQs free",
            introTitle: "Why use an MCQ generator",
            intro: [
              "Creating good multiple choice questions is harder than it looks. You need a clear question, one unambiguous correct answer, and three distractors that are believable but wrong. The distractors make or break an MCQ—if they're too obvious, the question tests nothing; if they're too similar, it becomes a guessing game.",
              "Examina's MCQ generator automates the hard part. Upload your study material or lesson content, and the AI generates multiple choice questions with distractors based on common misconceptions. Each question includes why the correct answer is right and what makes the distractors wrong, so students learn even when they miss one.",
            ],
            featuresTitle: "What makes good MCQs",
            features: [
              {
                title: "Plausible distractors",
                body: "Wrong answers are based on common misconceptions and related concepts, making questions effective for assessing real understanding instead of recognition.",
              },
              {
                title: "Difficulty levels",
                body: "Questions are tagged as easy, medium, or hard, and balanced across Bloom's taxonomy levels from simple recall to analysis and application.",
              },
              {
                title: "Detailed explanations",
                body: "Each MCQ includes why the correct answer is right and what makes each distractor incorrect, turning missed questions into learning moments.",
              },
            ],
            howTitle: "How to generate MCQs",
            steps: [
              {
                n: "01",
                title: "Add your content",
                body: "Paste text or upload a PDF with the material you want to test. Could be lecture notes, a textbook chapter, or training content.",
              },
              {
                n: "02",
                title: "Choose settings",
                body: "Specify how many MCQs you need and the difficulty level. The generator handles question writing and distractor creation.",
              },
              {
                n: "03",
                title: "Review and use",
                body: "Get your complete set of MCQs with answer keys. Edit if needed, then use for tests, study, or training assessments.",
              },
            ],
            faqTitle: "Frequently asked questions",
            faq: faqs,
            relatedTitle: "Related tools",
            related: [
              { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Maker" },
              { href: "/ai-question-generator", label: "AI Question Generator" },
              { href: "/test-generator", label: "Test Generator" },
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
