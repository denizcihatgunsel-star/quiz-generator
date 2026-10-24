import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog/posts";

const SITE = "https://www.examina.ink";

function isoDay(d: Date | string): string {
  return new Date(d).toISOString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = isoDay(new Date());

  const posts = POSTS.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: isoDay(post.dateIso || post.date || now),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const languages = ["es", "de", "fr", "pt", "tr"].map((code) => ({
    url: `${SITE}/${code}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Home uses trailing slash to match canonical https://www.examina.ink/
  const pages = [
    { url: `${SITE}/`, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${SITE}/pricing`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/ai-flashcards`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/notes-to-quiz`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/multiple-choice-quiz-maker`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/true-false-quiz-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/fill-in-the-blank-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/ai-quiz-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/free-quiz-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/quiz-generator-from-pdf`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/quiz-generator-from-text`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/create-a-quiz`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/study-quiz`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/daily-quiz`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE}/for-teachers`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/for-students`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/classroom/join`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE}/about`, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${SITE}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE}/contact`, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${SITE}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
  ].map((p) => ({ ...p, lastModified: now }));

  // Intentionally omit thin client shells /explore, /daily-challenge, and /study (noindex instead)
  return [...pages, ...posts, ...languages];
}
