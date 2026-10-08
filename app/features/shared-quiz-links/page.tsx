import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Shared Quiz Links — Share Quizzes with Students",
  description: "Every quiz gets a shareable link. Students take quizzes without accounts. Track results and scores.",
  path: "/features/shared-quiz-links",
});

const faqs = [
  { q: "How do shared quiz links work?", a: "Every quiz you create gets a unique shareable URL. Share the link with students via email, LMS, or messaging. They take the quiz in their browser without creating an account." },
  { q: "Do students need accounts?", a: "No. Students can take quizzes from shared links without signing up or logging in." },
  { q: "Can I see who took the quiz?", a: "Yes. View results and scores for quizzes taken via shared links in your Examina dashboard." },
  { q: "Can I revoke a shared link?", a: "Shared links are tied to saved quizzes. Delete the quiz to make the link inactive." },
];

export default function SharedQuizLinksPage() {
  const now = new Date();
  return (
    <KeywordLanding
      data={saleLandingData({
        kicker: "Shared Quiz Links",
        h1: "Share quizzes",
        h1Accent: "with a link",
        subtitle: "Every quiz gets a unique shareable URL. Students take quizzes without accounts. You track results.",
        cta: "Create quiz",
        introTitle: "The easiest way to distribute quizzes",
        intro: ["Email attachments, printed copies, and manual distribution take time. Share a link instead—students click it and take the quiz in their browser. No accounts, no apps to install, no friction.", "Every quiz you create in Examina gets a unique shareable link automatically. Copy the link and share it via email, LMS, messaging apps, or post it in your classroom. Students open it, take the quiz, and their results sync to your dashboard. One link, unlimited uses."],
        featuresTitle: "What you get with shared links",
        features: [
          { title: "No student accounts needed", body: "Students click the link and take the quiz immediately. No sign-up, no login, no barriers to completion." },
          { title: "Results tracking", body: "See who took the quiz, their scores, and which questions they missed. All results sync to your Examina dashboard." },
          { title: "Works everywhere", body: "Links work on phones, tablets, and computers. Students can take quizzes from any device with a browser." },
        ],
        howTitle: "How to share a quiz",
        steps: [
          { n: "01", title: "Generate quiz", body: "Create a quiz from your notes using AI. Examina generates a shareable link automatically." },
          { n: "02", title: "Copy link", body: "Click 'Share Link' to copy the URL to your clipboard." },
          { n: "03", title: "Distribute to students", body: "Share the link via email, LMS, messaging apps, or post it in your classroom. Students click and take the quiz." },
        ],
        faqTitle: "FAQs",
        faq: faqs,
        relatedTitle: "Related",
        related: [{ href: "/features/export-pdf", label: "Export PDF" }, { href: "/for-teachers", label: "For Teachers" }, { href: "/ai-quiz-generator", label: "AI Quiz Generator" }],
      }, now)}
    />
  );
}
