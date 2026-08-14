import { POSTS } from "@/lib/blog/posts";

export default function sitemap() {
  const posts = POSTS.map((post) => ({
    url: `https://www.examina.ink/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const languages = ["es", "de", "fr", "pt", "tr"].map((code) => ({
    url: `https://www.examina.ink/${code}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const pages = [
    { url: "https://www.examina.ink", changeFrequency: "weekly", priority: 1 },
    { url: "https://www.examina.ink/pricing", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.examina.ink/flashcard-generator", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.examina.ink/multiple-choice-quiz-maker", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.examina.ink/true-false-quiz-generator", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.examina.ink/fill-in-the-blank-generator", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.examina.ink/ai-quiz-generator", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.examina.ink/free-quiz-generator", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.examina.ink/quiz-generator-from-pdf", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.examina.ink/quiz-generator-from-text", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.examina.ink/create-a-quiz", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.examina.ink/study-quiz", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.examina.ink/daily-quiz", changeFrequency: "weekly", priority: 0.7 },
    { url: "https://www.examina.ink/for-teachers", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.examina.ink/for-students", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.examina.ink/daily-challenge", changeFrequency: "daily", priority: 0.7 },
    { url: "https://www.examina.ink/classroom/join", changeFrequency: "monthly", priority: 0.6 },
    { url: "https://www.examina.ink/explore", changeFrequency: "daily", priority: 0.7 },
    { url: "https://www.examina.ink/about", changeFrequency: "yearly", priority: 0.5 },
    { url: "https://www.examina.ink/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://www.examina.ink/terms", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://www.examina.ink/contact", changeFrequency: "yearly", priority: 0.4 },
    { url: "https://www.examina.ink/blog", changeFrequency: "weekly", priority: 0.8 },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  return [...pages, ...posts, ...languages];
}