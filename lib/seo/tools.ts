/**
 * Additional tools collection for programmatic SEO Wave 2.
 * Tool landing pages for P0 keywords.
 */

export interface ToolLanding {
  slug: string;
  name: string;
  description: string;
  howTo: string[];
  features: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  relatedTools: string[];
}

export const TOOLS: ToolLanding[] = [
  {
    slug: "test-generator",
    name: "Test Generator",
    description:
      "AI test generator that creates practice tests from any study material. Upload notes and get complete tests with answer keys.",
    howTo: [
      "Upload your study material (PDF, text, or notes)",
      "Choose question types and difficulty level",
      "Review the generated test with answer key",
      "Take it online, share by link, or export as PDF",
    ],
    features: [
      {
        title: "Complete test creation",
        body: "Generate full-length practice tests with multiple question types, difficulty levels, and comprehensive answer keys.",
      },
      {
        title: "Answer explanations",
        body: "Every question includes the correct answer and a detailed explanation showing why it's right and why other options are wrong.",
      },
      {
        title: "Bloom's taxonomy tagging",
        body: "Questions are tagged by cognitive level (Remember, Understand, Apply, Analyze) so you know what skills you're testing.",
      },
    ],
    faq: [
      {
        q: "How is a test different from a quiz?",
        a: "Tests are typically longer and more comprehensive than quizzes. Both can be generated from your study material—use 'quiz' for quick checks and 'test' for full assessments.",
      },
      {
        q: "Can I create midterm or final exams?",
        a: "Yes. Upload notes from multiple units or an entire semester and generate a comprehensive practice test covering all material.",
      },
      {
        q: "Do tests include an answer key?",
        a: "Yes. Every test includes a complete answer key with explanations for all questions.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 10 test generations per month. Paid plans start at $2/month for 20 generations.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/practice-test-generator",
      "/exam-generator",
    ],
  },
  {
    slug: "mcq-generator",
    name: "MCQ Generator",
    description:
      "Multiple choice questions generator that creates MCQs with plausible distractors from any text. Perfect for teachers and students.",
    howTo: [
      "Paste your lesson content or upload study material",
      "Specify how many MCQs you need",
      "AI generates questions with 4 answer choices each",
      "Review questions and edit if needed",
    ],
    features: [
      {
        title: "Plausible distractors",
        body: "Wrong answers are based on common misconceptions, not random words, making questions effective for assessing real understanding.",
      },
      {
        title: "Difficulty levels",
        body: "Questions are tagged as easy, medium, or hard, and balanced across Bloom's taxonomy levels from recall to analysis.",
      },
      {
        title: "Detailed explanations",
        body: "Each MCQ includes why the correct answer is right and what makes the distractors incorrect.",
      },
    ],
    faq: [
      {
        q: "How many answer choices per question?",
        a: "Each MCQ has 4 answer choices: one correct answer and three distractors (wrong answers).",
      },
      {
        q: "Are the distractors believable?",
        a: "Yes. Distractors are based on common misconceptions and related concepts, not obviously wrong answers.",
      },
      {
        q: "Can I edit the questions?",
        a: "Yes. After generation, you can edit questions, answers, and explanations before saving or sharing.",
      },
      {
        q: "Is MCQ generation free?",
        a: "Free accounts get 10 quiz generations per month. Each generation can include MCQs. Paid plans start at $2/month.",
      },
    ],
    relatedTools: [
      "/multiple-choice-quiz-maker",
      "/ai-question-generator",
      "/ai-quiz-generator",
    ],
  },
  {
    slug: "practice-test-generator",
    name: "Practice Test Generator",
    description:
      "Create practice tests for exam preparation from your study notes. Generate realistic practice questions with answer keys.",
    howTo: [
      "Upload study materials for the topic you're practicing",
      "Select test length and question types",
      "Generate a complete practice test",
      "Take it under timed conditions or review at your own pace",
    ],
    features: [
      {
        title: "Exam-style practice",
        body: "Questions mirror real exam format and difficulty, helping you prepare for SAT, ACT, AP, MCAT, or classroom tests.",
      },
      {
        title: "Score tracking",
        body: "Track your performance over multiple practice tests to see improvement and identify weak areas.",
      },
      {
        title: "Instant feedback",
        body: "Get immediate feedback on every answer with explanations showing the correct reasoning.",
      },
    ],
    faq: [
      {
        q: "What subjects can I create practice tests for?",
        a: "Any subject. Upload notes from math, science, history, language, or any other course and get subject-specific practice questions.",
      },
      {
        q: "Can I simulate test conditions?",
        a: "Yes. Set a timer and take the practice test under exam-like conditions to build stamina and reduce test anxiety.",
      },
      {
        q: "How realistic are the questions?",
        a: "Questions match the style and difficulty of your target exam based on the material you upload. They're generated to test the same skills.",
      },
      {
        q: "Can I retake tests?",
        a: "Yes. All generated tests are saved to your account and you can retake them anytime to track improvement.",
      },
    ],
    relatedTools: [
      "/test-generator",
      "/exam-generator",
      "/ai-quiz-generator",
    ],
  },
  {
    slug: "exit-ticket-generator",
    name: "Exit Ticket Generator",
    description:
      "Generate exit ticket questions for formative assessment. Quick checks teachers can use at the end of lessons.",
    howTo: [
      "Paste the key concepts from today's lesson",
      "Generate 2-3 quick check questions",
      "Project for the class or share a link",
      "Review responses to assess understanding",
    ],
    features: [
      {
        title: "Quick formative assessment",
        body: "2-3 targeted questions that take students 3-5 minutes to complete—perfect for the last moments of class.",
      },
      {
        title: "Leveled questions",
        body: "Mix recall and application questions to quickly assess whether students got the concept or just the vocabulary.",
      },
      {
        title: "Ready in seconds",
        body: "Generate exit tickets in under 30 seconds from lesson notes. No more spending evenings writing daily checks.",
      },
    ],
    faq: [
      {
        q: "What's an exit ticket?",
        a: "A short formative assessment (2-3 questions) students complete at the end of a lesson. It tells teachers whether the class understood the day's content.",
      },
      {
        q: "How many questions should an exit ticket have?",
        a: "2-3 questions that take 3-5 minutes total. Exit tickets are quick checks, not quizzes.",
      },
      {
        q: "Can students take exit tickets without accounts?",
        a: "Yes. Share a link or display the questions. For live exit tickets, students join with a code from any device.",
      },
      {
        q: "Is this free for teachers?",
        a: "Free accounts get 10 generations per month. For daily exit tickets, the Team plan ($15/month for 5 teachers) includes unlimited generations.",
      },
    ],
    relatedTools: [
      "/for-teachers",
      "/features/formative-assessment",
      "/ai-quiz-generator",
    ],
  },
];

export function getTool(slug: string): ToolLanding | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
