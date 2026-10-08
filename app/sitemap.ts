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
    { url: `${SITE}/study-guide-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
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
    // Wave 1 NEW pages
    { url: `${SITE}/online-quiz-maker`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/ai-question-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/exam-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/alternatives/quizlet`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/alternatives/kahoot`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/alternatives/quizizz`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/integrations/google-forms`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/features/blooms-taxonomy`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/features/live-classroom-quiz`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/features/worksheet-generator`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/es/generador-de-quizzes`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/es/generador-quiz-pdf`, changeFrequency: "monthly" as const, priority: 0.8 },
    // Wave 2: Exams (11)
    { url: `${SITE}/exams`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/exams/sat`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/exams/act`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/exams/ap`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/exams/mcat`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/exams/nclex`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/exams/gre`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/exams/lsat`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/exams/toefl`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/exams/ielts`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/exams/midterm`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/exams/finals`, changeFrequency: "monthly" as const, priority: 0.7 },
    // Wave 2: Subjects (12)
    { url: `${SITE}/subjects`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/biology`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/chemistry`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/physics`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/math`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/history`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/english`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/vocabulary`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/spanish`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/anatomy`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/nursing`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/psychology`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/subjects/computer-science`, changeFrequency: "monthly" as const, priority: 0.8 },
    // Wave 2: Comparisons & Alternatives (4 + 1 hub)
    { url: `${SITE}/alternatives`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/alternatives/blooket`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/alternatives/gimkit`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/alternatives/nearpod`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/alternatives/google-forms`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/compare/kahoot-vs-examina`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/compare/quizizz-vs-kahoot`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/compare/quizlet-vs-examina`, changeFrequency: "monthly" as const, priority: 0.7 },
    // Wave 2: Integrations (5)
    { url: `${SITE}/integrations`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/integrations/canvas`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/integrations/moodle`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/integrations/google-classroom`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/integrations/blackboard`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/integrations/qti`, changeFrequency: "monthly" as const, priority: 0.7 },
    // Wave 2: Features (4)
    { url: `${SITE}/features`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/features/formative-assessment`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/features/ocr-quiz`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/features/export-pdf`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/features/shared-quiz-links`, changeFrequency: "monthly" as const, priority: 0.7 },
    // Wave 2: Tools (4)
    { url: `${SITE}/test-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/mcq-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/practice-test-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/exit-ticket-generator`, changeFrequency: "monthly" as const, priority: 0.9 },
    // Wave 2: Audiences (3)
    { url: `${SITE}/for-schools`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/for-tutors`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/for-corporate-training`, changeFrequency: "monthly" as const, priority: 0.7 },
    // Wave 2: Spanish alternative
    { url: `${SITE}/es/alternativa-kahoot`, changeFrequency: "monthly" as const, priority: 0.7 },
  ].map((p) => ({ ...p, lastModified: now }));

  // Intentionally omit thin client shells /explore, /daily-challenge, and /study (noindex instead)
  return [...pages, ...posts, ...languages];
}
