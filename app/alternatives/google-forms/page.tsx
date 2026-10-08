import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Google Forms Quiz Alternative — AI Quiz Generator",
  description:
    "Better than Google Forms for quiz creation. Generate questions with AI, then use them in Forms or run them directly. Free to try.",
  path: "/alternatives/google-forms",
});

const faqs = [
  {
    q: "Should I use this instead of Google Forms?",
    a: "Use both. Examina generates the questions with AI, then you can copy them into Google Forms for auto-grading or run them directly in Examina's live classroom mode.",
  },
  {
    q: "What's the advantage over typing in Google Forms?",
    a: "AI generates questions from your lesson content in seconds. You skip the manual typing and get explanations and answer keys automatically.",
  },
  {
    q: "Does it export directly to Google Forms?",
    a: "Examina generates questions you can copy-paste into Google Forms. Direct export may come in future updates.",
  },
  {
    q: "Is this free?",
    a: "Free accounts get 10 quiz generations per month. Paid plans start at $2/month for 20 quizzes.",
  },
];

export default function GoogleFormsAlternativePage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/alternatives/google-forms#webpage",
        url: "https://www.examina.ink/alternatives/google-forms",
        name: "Google Forms Quiz Alternative | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description: "AI quiz generator with alternatives to Kahoot, Quizizz, and other platforms.",
        offers: planOffers(now),
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
        "@type": "ItemList",
        name: "Google Forms Alternative Features",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AI question generation",
            description: "Generate quiz questions from lesson notes—no manual typing.",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Works with Forms",
            description: "Copy generated questions into Google Forms or use them directly in Examina.",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Explanations included",
            description: "Every question includes why the answer is correct.",
          },
        ],
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
            name: "Alternatives",
            item: "https://www.examina.ink/alternatives/google-forms",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Google Forms Alternative",
            item: "https://www.examina.ink/alternatives/google-forms",
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
            kicker: "Google Forms Alternative",
            h1: "Generate questions for",
            h1Accent: "Google Forms",
            subtitle:
              "Stop typing every quiz question into Google Forms. Upload lesson notes and Examina writes the questions for you. Copy them into Forms or use them directly.",
            cta: "Generate questions free",
            introTitle: "The faster way to create Forms quizzes",
            intro: [
              "Google Forms is free, integrates with Google Classroom, and auto-grades. But creating a 20-question quiz still means typing every question, every answer choice, and every correct answer by hand. For teachers with multiple classes, that's hours per week.",
              "Examina speeds that up: paste your lesson notes or upload slides, and AI generates quiz questions automatically. You get multiple choice and true/false questions with complete answer keys. Review them in Examina, then copy into Google Forms for auto-grading, or run them directly in Examina's live classroom mode.",
            ],
            featuresTitle: "How teachers use this",
            features: [
              {
                title: "AI writes the questions",
                body: "Upload lesson content and get multiple choice and true/false questions in under 30 seconds. Each includes the correct answer and an explanation.",
              },
              {
                title: "Works with Google Forms",
                body: "Questions are formatted for easy copy-paste into Google Forms. Answer keys transfer directly for auto-grading setup.",
              },
              {
                title: "Or skip Forms entirely",
                body: "Run quizzes live in Examina's classroom mode or share links for self-paced homework. No manual copying required.",
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
                title: "Use them",
                body: "Copy into Google Forms and set up auto-grading, or run the quiz directly in Examina for live classroom games.",
              },
            ],
            faqTitle: "Frequently asked questions",
            faq: faqs,
            relatedTitle: "Related tools",
            related: [
              { href: "/integrations/google-forms", label: "Google Forms Integration" },
              { href: "/for-teachers", label: "For Teachers" },
              { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
              { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Maker" },
            ],
          },
          now
        )}
      />
    </>
  );
}
