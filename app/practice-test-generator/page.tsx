import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Practice Test Generator — Create Practice Tests from Notes",
  description: "Generate practice tests for exam prep. Upload study material and get complete practice tests with answer keys.",
  path: "/practice-test-generator",
});

const faqs = [
  { q: "What subjects can I create practice tests for?", a: "Any subject. Upload notes from math, science, history, language, or any other course and get subject-specific practice questions." },
  { q: "Can I simulate test conditions?", a: "Yes. Set a timer and take the practice test under exam-like conditions to build stamina and reduce test anxiety." },
  { q: "How realistic are the questions?", a: "Questions match the style and difficulty of your target exam based on the material you upload. They test the same skills." },
  { q: "Can I retake tests?", a: "Yes. All generated tests are saved to your account and you can retake them anytime to track improvement." },
];

export default function PracticeTestGeneratorPage() {
  const now = new Date();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/practice-test-generator#webpage",
        url: "https://www.examina.ink/practice-test-generator",
        name: "Practice Test Generator | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description: "Generate practice tests for exam prep from study materials.",
        offers: planOffers(now),
      },
      {
        "@type": "HowTo",
        name: "How to create practice tests with AI",
        step: [
          { "@type": "HowToStep", position: 1, name: "Upload study materials", text: "Upload notes for the topic you're practicing" },
          { "@type": "HowToStep", position: 2, name: "Generate practice test", text: "AI creates a complete practice test with questions" },
          { "@type": "HowToStep", position: 3, name: "Take under test conditions", text: "Set a timer and take the test like the real exam" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.examina.ink" },
          { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.examina.ink/practice-test-generator" },
        ],
      },
    ],
  };
  
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <KeywordLanding
      data={saleLandingData({
        kicker: "Practice Test Generator",
        h1: "Practice test generator",
        h1Accent: "for exam prep",
        subtitle: "Create practice tests from your study notes. Generate realistic practice questions with answer keys for any exam.",
        cta: "Generate practice test",
        introTitle: "Exam prep with realistic practice",
        intro: ["Effective exam prep requires practice with realistic questions. Creating those questions by hand is time-consuming, and generic question banks don't match your specific course material.", "Examina generates practice tests from your own study material. Upload your review book chapter, course notes, or study guide, and get practice questions matching your content. Questions include explanations and are tagged by difficulty, helping you identify weak areas before test day."],
        featuresTitle: "Build exam confidence",
        features: [
          { title: "Exam-style practice", body: "Questions mirror real exam format and difficulty, helping you prepare for SAT, ACT, AP, MCAT, or classroom tests." },
          { title: "Score tracking", body: "Track your performance over multiple practice tests to see improvement and identify weak areas." },
          { title: "Instant feedback", body: "Get immediate feedback on every answer with explanations showing the correct reasoning." },
        ],
        howTitle: "How to use it",
        steps: [
          { n: "01", title: "Upload study materials", body: "Upload notes for the topic you're practicing. Could be a textbook chapter, review guide, or course notes." },
          { n: "02", title: "Generate practice test", body: "AI creates a complete practice test with questions at appropriate difficulty." },
          { n: "03", title: "Take under test conditions", body: "Set a timer and take the test like the real exam. Review explanations for missed questions." },
        ],
        faqTitle: "FAQs",
        faq: faqs,
        relatedTitle: "Related",
        related: [{ href: "/test-generator", label: "Test Generator" }, { href: "/exam-generator", label: "Exam Generator" }, { href: "/for-students", label: "For Students" }],
      }, now)}
      />
    </>
  );
}
