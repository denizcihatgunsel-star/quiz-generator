import type { Metadata } from "next";
import Link from "next/link";
import LandingPageLayout from "@/components/LandingPageLayout";

export const metadata: Metadata = {
  title: "Blog — AI Quiz Generator Tips & Study Guides | Examina",
  description:
    "Tips, guides, and insights on AI quiz generation, study techniques, active recall, and educational technology from the Examina team.",
  alternates: { canonical: "https://www.examina.ink/blog" },
};

const POSTS = [
  {
    title: "How to Make a Quiz from Your Notes in 60 Seconds",
    description:
      "Why self-testing beats re-reading, and a step-by-step walkthrough of turning any notes into a practice quiz with AI.",
    tag: "Study Tips",
    date: "Coming Soon",
  },
  {
    title: "Active Recall: The #1 Study Technique You're Probably Not Using",
    description:
      "The research behind active recall, why it outperforms highlighting and re-reading, and how to build it into your routine.",
    tag: "Science of Learning",
    date: "Coming Soon",
  },
  {
    title: "Bloom's Taxonomy for Quizzes: Write Questions That Actually Test Understanding",
    description:
      "The 6 cognitive levels applied to quiz questions, with examples at each level and tips for balanced assessments.",
    tag: "For Educators",
    date: "Coming Soon",
  },
  {
    title: "How to Create Flashcards with AI: The Complete Guide",
    description:
      "AI-generated flashcards vs. manual creation, best practices for flashcard-based studying, and tools compared.",
    tag: "Study Tips",
    date: "Coming Soon",
  },
  {
    title: "AI Tools for Teachers: Save 10+ Hours a Week on Assessments",
    description:
      "Where teachers lose time on assessment creation, and how AI quiz generators can streamline the workflow.",
    tag: "For Educators",
    date: "Coming Soon",
  },
  {
    title: "How to Study with AI in 2026: Tools, Techniques, and Tips",
    description:
      "A complete guide to AI study tools — quiz generators, flashcard makers, summarizers — and how to use them effectively.",
    tag: "Study Tips",
    date: "Coming Soon",
  },
];

export default function BlogPage() {
  return (
    <LandingPageLayout>
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 leading-tight mb-6">
            Learn, Study, Teach
            <br />
            — Smarter.
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mb-20">
            Tips, guides, and research-backed insights on studying, teaching,
            and making the most of AI-powered learning tools.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200">
            {POSTS.map((post, i) => (
              <div key={i} className="bg-[#f5f5f0] p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                    {post.tag}
                  </span>
                  <span className="text-xs text-neutral-300">
                    {post.date}
                  </span>
                </div>
                <h2 className="text-neutral-900 font-medium text-lg mb-3 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {post.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
}
