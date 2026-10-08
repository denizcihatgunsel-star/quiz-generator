import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Quiz Generator for Tutors — Custom Practice Tests",
  description: "Generate custom practice tests for tutoring students. AI quiz creation from any study material.",
  path: "/for-tutors",
});

const faqs = [
  { q: "How do tutors use this?", a: "Upload student's course material or weak-area notes and generate targeted practice questions. Share quizzes with students for homework or review together in sessions." },
  { q: "Can I track student progress?", a: "Yes. View quiz results and scores to identify which concepts need more work." },
  { q: "Is it affordable for private tutors?", a: "Individual plans start at $2/month for 20 quizzes. Most tutors use Plus ($5/month for 60 quizzes) or Pro ($10/month for 200 quizzes)." },
  { q: "Can students take quizzes on their own?", a: "Yes. Share quiz links with students. They can practice at home and you review results together in sessions." },
];

export default function ForTutorsPage() {
  const now = new Date();
  return (
    <KeywordLanding
      data={saleLandingData({
        kicker: "For Tutors",
        h1: "Quiz generator for tutors",
        h1Accent: "custom practice",
        subtitle: "Generate targeted practice tests for each student. AI creates questions from their course material or weak areas.",
        cta: "Try free",
        introTitle: "Custom practice for every student",
        intro: ["Private tutors need practice questions tailored to each student's course and weak areas. Generic question banks don't match the student's textbook, and writing custom questions for every session eats billable hours.", "Examina generates custom practice quizzes from each student's material. Upload their textbook chapter, course notes, or problem sets, and get practice questions specific to what they're learning. Save quizzes for reuse with other students on the same curriculum, or generate fresh ones for each session. Custom practice without the prep time."],
        featuresTitle: "Why tutors use Examina",
        features: [
          { title: "Student-specific practice", body: "Upload each student's course material and get practice questions matching what they're actually learning." },
          { title: "Track weak areas", body: "See which questions students miss most often. Focus sessions on real gaps, not guesses." },
          { title: "Homework between sessions", body: "Share quiz links with students. They practice at home, you review results together next session." },
        ],
        howTitle: "Typical tutor workflow",
        steps: [
          { n: "01", title: "Upload student's material", body: "Upload textbook pages, class notes, or problem sets for the concepts student struggles with." },
          { n: "02", title: "Generate practice quiz", body: "AI creates targeted practice questions with explanations at appropriate difficulty." },
          { n: "03", title: "Review together or assign", body: "Work through quiz in session, or share link for homework practice. Review results to guide next session." },
        ],
        faqTitle: "FAQs",
        faq: faqs,
        relatedTitle: "Related",
        related: [{ href: "/for-students", label: "For Students" }, { href: "/practice-test-generator", label: "Practice Test Generator" }, { href: "/ai-quiz-generator", label: "AI Quiz Generator" }],
      }, now)}
    />
  );
}
