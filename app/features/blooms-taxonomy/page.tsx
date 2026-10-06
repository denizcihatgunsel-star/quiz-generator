import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Bloom's Taxonomy Quiz Generator — Questions by Cognitive Level",
  description: "Generate quiz questions tagged with Bloom's taxonomy levels. Test recall, understanding, application, and analysis with AI-generated questions.",
  path: "/features/blooms-taxonomy",
});

const faqs = [
  {
    q: "What is Bloom's taxonomy?",
    a: "A framework for classifying learning objectives by cognitive complexity: Remember, Understand, Apply, Analyze, Evaluate, Create.",
  },
  {
    q: "Why do Bloom's levels matter for quizzes?",
    a: "They ensure you're testing understanding and application, not just memorization. Balanced quizzes include questions at multiple cognitive levels.",
  },
  {
    q: "How does Examina tag questions with Bloom's levels?",
    a: "The AI analyzes each question's cognitive demand and assigns a Bloom's level automatically. You see the distribution before using the quiz.",
  },
  {
    q: "Can I filter questions by level?",
    a: "Yes. View or export questions filtered by Remember, Understand, Apply, or Analyze levels.",
  },
  {
    q: "Is this feature free?",
    a: "Yes. Bloom's taxonomy tagging is included in all plans, including the free tier.",
  },
];

export default function BloomsTaxonomyPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/features/blooms-taxonomy#webpage",
        url: "https://www.examina.ink/features/blooms-taxonomy",
        name: "Bloom's Taxonomy Quiz Generator | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description:
          "Quiz generator that automatically tags questions with Bloom's taxonomy cognitive levels—Remember, Understand, Apply, Analyze—for balanced assessment design.",
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
            item: "https://www.examina.ink/features/blooms-taxonomy",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Bloom's Taxonomy",
            item: "https://www.examina.ink/features/blooms-taxonomy",
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
          kicker: "Bloom's Taxonomy",
          h1: "Questions tagged with",
          h1Accent: "Bloom's levels",
          subtitle: `Build balanced assessments that test understanding, not just recall. Every question Examina generates is tagged with its Bloom's taxonomy level automatically.`,
          cta: "Try it free",
          introTitle: "Why Bloom's taxonomy matters for assessment",
          intro: [
            "Most quiz generators produce questions that test one thing: can students recall a fact? That's Bloom's Remember level—the lowest cognitive tier. Real understanding requires higher-order thinking: explaining concepts (Understand), using knowledge in new situations (Apply), and breaking down arguments (Analyze).",
            "Examina generates questions at all four testable Bloom's levels and tags each one automatically. You see the distribution at a glance—6 Remember, 4 Understand, 2 Apply—and can adjust to match your learning objectives. No more quizzes that accidentally test only memorization.",
          ],
          featuresTitle: "How Bloom's tagging improves your quizzes",
          features: [
            {
              title: "Automatic cognitive tagging",
              body: "Every generated question is analyzed and tagged with its Bloom's level: Remember, Understand, Apply, or Analyze. No manual classification needed.",
            },
            {
              title: "Visual distribution",
              body: "See how many questions fall into each level before using the quiz. Adjust if it's too recall-heavy or too analysis-heavy for your goal.",
            },
            {
              title: "Filtered views",
              body: "Export or display questions by level. Use Remember questions for warm-ups, Apply questions for formative checks, and Analyze questions for summative tests.",
            },
          ],
          howTitle: "How it works",
          steps: [
            {
              n: "01",
              title: "Generate questions",
              body: "Upload lesson notes or paste text. Examina creates questions and assigns Bloom's levels automatically.",
            },
            {
              n: "02",
              title: "Review the distribution",
              body: "Check the breakdown: how many Remember vs. Apply questions? Regenerate if the balance doesn't match your learning objectives.",
            },
            {
              n: "03",
              title: "Use with confidence",
              body: "Launch the quiz knowing you're testing the right cognitive skills. Students and teachers see which levels were assessed.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "More for educators",
          related: [
            { href: "/for-teachers", label: "For Teachers" },
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/features/live-classroom-quiz", label: "Live Classroom Quiz" },
            { href: "/study-guide-generator", label: "Study Guide Generator" },
            { href: "/blog/blooms-taxonomy-for-quizzes", label: "Bloom's Taxonomy Guide" },
          ],
        }, now)}
      />
    </>
  );
}
