import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Google Forms Quiz Generator — Turn Notes into Google Forms Quizzes",
  description: "Generate quiz questions from notes, then export to Google Forms. AI creates multiple choice and true/false questions compatible with Google Forms format.",
  path: "/integrations/google-forms",
});

const faqs = [
  {
    q: "Can Examina export directly to Google Forms?",
    a: "Examina generates quiz questions you can copy into Google Forms. Future updates may include direct export.",
  },
  {
    q: "What question types work with Google Forms?",
    a: "Multiple choice and true/false questions transfer perfectly. Fill-in-the-blank works as short answer questions.",
  },
  {
    q: "Is this free?",
    a: "Yes. Generate 5 quizzes per month free. Paid plans start at $2/month for 20 quizzes.",
  },
  {
    q: "Why use this instead of typing questions directly in Google Forms?",
    a: "AI generates questions from your lesson content in seconds. You get a complete quiz with answers and explanations, then transfer it to Google Forms.",
  },
  {
    q: "Does it include answer keys?",
    a: "Yes. Every question includes the correct answer and an explanation. Paste both into Google Forms for auto-grading.",
  },
];

export default function GoogleFormsIntegrationPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/integrations/google-forms#webpage",
        url: "https://www.examina.ink/integrations/google-forms",
        name: "Google Forms Quiz Generator | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "Quiz generator that creates Google Forms-compatible questions from lesson notes using AI. Includes multiple choice, true/false questions with answer keys.",
      },
      {
        "@type": "HowTo",
        name: "How to Generate Quiz Questions for Google Forms",
        description: "Create quiz questions with AI and add them to Google Forms",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Generate questions",
            text: "Upload lesson notes to Examina and generate quiz questions with AI.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Review and edit",
            text: "Check questions for accuracy. Edit as needed. Note the answer key.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Add to Google Forms",
            text: "Create a new Google Form quiz. Copy questions and answers from Examina. Set correct answers for auto-grading.",
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
            name: "Integrations",
            item: "https://www.examina.ink/integrations/google-forms",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Google Forms",
            item: "https://www.examina.ink/integrations/google-forms",
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
          kicker: "Google Forms Integration",
          h1: "Generate questions for",
          h1Accent: "Google Forms",
          subtitle: `Stop typing every quiz question into Google Forms. Upload your lesson notes and Examina writes the questions for you. Copy them into Google Forms with answer keys for auto-grading.`,
          cta: "Generate questions free",
          introTitle: "The faster way to create Google Forms quizzes",
          intro: [
            "Google Forms is great for quizzes—students submit from any device, it auto-grades, and results sync with Google Classroom. But creating a 20-question quiz still means typing every question, every answer choice, and every correct answer by hand.",
            "Examina speeds that up: paste your lesson notes or upload slides, and the AI generates quiz questions automatically. You get multiple choice and true/false questions with complete answer keys. Review them in Examina, then copy into Google Forms. Same final quiz, fraction of the time.",
          ],
          featuresTitle: "Why teachers use this workflow",
          features: [
            {
              title: "AI writes the questions",
              body: "Upload lesson content and get multiple choice and true/false questions in under 30 seconds. Each includes answer choices, the correct answer, and an explanation.",
            },
            {
              title: "Google Forms compatible",
              body: "Questions are formatted for easy copy-paste into Google Forms. Answer keys transfer directly for auto-grading setup.",
            },
            {
              title: "Bloom's taxonomy tagging",
              body: "Every question is tagged with its cognitive level—Remember, Understand, Apply, Analyze. Build quizzes that test understanding, not just recall.",
            },
          ],
          howTitle: "How to create Google Forms quizzes faster",
          steps: [
            {
              n: "01",
              title: "Generate questions in Examina",
              body: "Paste lesson notes, upload a PDF, or photograph handouts. Choose multiple choice or true/false. AI generates the questions with answer keys.",
            },
            {
              n: "02",
              title: "Review and edit",
              body: "Check questions for accuracy. Edit wording if needed. All questions include correct answers and explanations.",
            },
            {
              n: "03",
              title: "Copy into Google Forms",
              body: "Open Google Forms. Copy questions from Examina and paste them into your form. Set correct answers for auto-grading. Publish.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "Related tools",
          related: [
            { href: "/for-teachers", label: "For Teachers" },
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Maker" },
            { href: "/true-false-quiz-generator", label: "True/False Generator" },
            { href: "/alternatives/kahoot", label: "Kahoot Alternative" },
          ],
        }, now)}
      />
    </>
  );
}
