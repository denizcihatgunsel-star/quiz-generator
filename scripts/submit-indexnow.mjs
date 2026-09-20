const KEY = "308eca5d747a43448ee45db07be1f489";
const HOST = "www.examina.ink";
const BASE = `https://${HOST}`;

const BLOG_POSTS = [
  "make-a-quiz-from-your-notes",
  "active-recall-guide",
  "blooms-taxonomy-for-quizzes",
  "create-flashcards-with-ai",
  "ai-tools-for-teachers",
  "how-to-study-with-ai",
  "ai-multiple-choice-quiz-maker",
  "spaced-repetition-schedule",
  "flashcards-vs-quizzes",
  "formative-assessment-with-ai",
  "classroom-quiz-games",
  "language-learning-with-ai-flashcards",
];

const PAGES = [
  "/pricing",
  "/flashcard-generator",
  "/multiple-choice-quiz-maker",
  "/true-false-quiz-generator",
  "/fill-in-the-blank-generator",
  "/ai-quiz-generator",
  "/free-quiz-generator",
  "/quiz-generator-from-pdf",
  "/quiz-generator-from-text",
  "/create-a-quiz",
  "/study-quiz",
  "/daily-quiz",
  "/for-teachers",
  "/for-students",
  "/classroom/join",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
  "/blog",
  ...BLOG_POSTS.map((s) => `/blog/${s}`),
  "/es",
  "/de",
  "/fr",
  "/pt",
  "/tr",
];

const urlList = [`${BASE}/`, ...PAGES.map((p) => `${BASE}${p}`)];

async function main() {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${BASE}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow ping -> ${res.status} ${res.statusText} (${urlList.length} URLs)`);
}

main().catch((err) => {
  console.error(`IndexNow ping failed (non-fatal): ${err.message}`);
  process.exit(0);
});