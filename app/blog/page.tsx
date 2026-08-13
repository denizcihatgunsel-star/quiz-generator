import type { Metadata } from "next";
import Link from "next/link";
import LandingPageLayout from "@/components/LandingPageLayout";
import { POSTS } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog — AI Quiz Generator Tips & Study Guides | Examina",
  description:
    "Tips, guides, and insights on AI quiz generation, study techniques, active recall, and educational technology from the Examina team.",
  alternates: { canonical: "https://www.examina.ink/blog" },
};

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
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-[#f5f5f0] p-8 sm:p-10 transition-colors hover:bg-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                    {post.tag}
                  </span>
                  <span className="text-xs text-neutral-300">
                    {post.date} · {post.readTime} read
                  </span>
                </div>
                <h2 className="text-neutral-900 font-medium text-lg mb-3 leading-snug transition-colors group-hover:text-neutral-700">
                  {post.title}
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {post.description}
                </p>
                <span className="mt-4 inline-block text-sm text-neutral-400 transition-colors group-hover:text-neutral-900">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
}