import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Corporate Training Quiz Generator — L&D Assessment AI",
  description: "Generate training quizzes for corporate L&D. AI quiz creation from training materials and compliance content.",
  path: "/for-corporate-training",
});

const faqs = [
  { q: "What training topics work?", a: "Any corporate training content: compliance training, onboarding materials, product knowledge, sales enablement, safety procedures, or technical training." },
  { q: "Can we use it for compliance testing?", a: "Yes. Generate quizzes from compliance materials and track completion. Results show who passed and who needs re-training." },
  { q: "Is there team pricing?", a: "Team plan ($15/month) supports 5 L&D staff with unlimited quiz generation. For larger teams, contact for enterprise pricing." },
  { q: "Can we track employee scores?", a: "Yes. View quiz results, scores, and completion status for all employees who take training quizzes." },
];

export default function ForCorporateTrainingPage() {
  const now = new Date();
  return (
    <KeywordLanding
      data={saleLandingData({
        kicker: "Corporate Training",
        h1: "Training quiz generator",
        h1Accent: "for L&D teams",
        subtitle: "Generate training assessment quizzes from corporate materials. AI quiz creation for onboarding, compliance, and product training.",
        cta: "Try free",
        introTitle: "Assessment for corporate training",
        intro: ["Corporate training needs assessment to verify learning. Writing quiz questions for onboarding modules, compliance training, and product knowledge takes L&D time away from content creation.", "Examina generates training quizzes from your existing materials. Upload training slides, policy documents, or product specs, and get assessment questions automatically. Track who completed training and who needs re-training. Same learning verification, fraction of the L&D effort."],
        featuresTitle: "Built for corporate L&D",
        features: [
          { title: "Generate from training content", body: "Upload onboarding decks, compliance materials, or product docs. AI writes assessment questions with explanations." },
          { title: "Track completion", body: "See who took training quizzes, their scores, and which topics need reinforcement." },
          { title: "Compliance-ready", body: "Generate quizzes from policy documents and safety procedures. Verify employees understood training content." },
        ],
        howTitle: "How L&D teams use it",
        steps: [
          { n: "01", title: "Upload training materials", body: "Upload onboarding slides, compliance documents, product training, or technical manuals." },
          { n: "02", title: "Generate assessment", body: "AI creates quiz questions covering key concepts. Review and adjust difficulty as needed." },
          { n: "03", title: "Assign to employees", body: "Share quiz link via email or learning platform. Track completion and scores to verify training effectiveness." },
        ],
        faqTitle: "FAQs",
        faq: faqs,
        relatedTitle: "Related",
        related: [{ href: "/for-schools", label: "For Schools" }, { href: "/test-generator", label: "Test Generator" }, { href: "/ai-quiz-generator", label: "AI Quiz Generator" }],
      }, now)}
    />
  );
}
