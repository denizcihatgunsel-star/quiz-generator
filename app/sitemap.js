import { POSTS } from "@/lib/blog/posts";

const SITE = "https://www.examina.ink";

function isoDay(d) {
  return new Date(d).toISOString();
}

export default function sitemap() {
  const now = isoDay(new Date());

  const posts = POSTS.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: isoDay(post.dateIso || post.date || now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const languages = ["es", "de", "fr", "pt", "tr"].map((code) => ({
    url: `${SITE}/${code}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Home uses trailing slash to match canonical https://www.examina.ink/
  const pages = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/pricing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/flashcard-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/multiple-choice-quiz-maker`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/true-false-quiz-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/fill-in-the-blank-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/ai-quiz-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/free-quiz-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/quiz-generator-from-pdf`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/quiz-generator-from-text`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/create-a-quiz`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/study-quiz`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/study`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/daily-quiz`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/for-teachers`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/for-students`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/classroom/join`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ].map((p) => ({ ...p, lastModified: now }));

  // Intentionally omit thin client shells /explore and /daily-challenge (noindex instead)
  return [...pages, ...posts, ...languages];
}
