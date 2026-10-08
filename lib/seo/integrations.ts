/**
 * Integration pages collection for programmatic SEO Wave 2.
 * LMS and export format integrations.
 */

export interface Integration {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  workflow: string[];
  faq: { q: string; a: string }[];
  relatedTools: string[];
}

export const INTEGRATIONS: Integration[] = [
  {
    slug: "google-forms",
    name: "Google Forms",
    fullName: "Google Forms",
    description:
      "Generate quiz questions from notes, then add to Google Forms. AI creates multiple choice and true/false questions compatible with Google Forms.",
    workflow: [
      "Generate quiz questions in Examina from your lesson notes",
      "Review questions and note the answer key",
      "Manually create Google Forms quiz and paste questions",
      "Set up auto-grading in Forms using the answer key",
    ],
    faq: [
      {
        q: "Can Examina export directly to Google Forms?",
        a: "Examina generates quiz questions you can copy into Google Forms. Future updates may include direct export.",
      },
      {
        q: "What question types work with Google Forms?",
        a: "Multiple choice and true/false questions transfer perfectly. Fill-in-the-blank works as short answer questions.",
      },
      {
        q: "Is this free?",
        a: "Yes. Generate 5 quizzes per month free. Paid plans start at $2/month for 20 quizzes.",
      },
      {
        q: "Why use this instead of typing questions directly in Google Forms?",
        a: "AI generates questions from your lesson content in seconds. You get a complete quiz with answers and explanations, then transfer it to Google Forms.",
      },
    ],
    relatedTools: [
      "/integrations/google-classroom",
      "/for-teachers",
      "/ai-quiz-generator",
    ],
  },
  {
    slug: "canvas",
    name: "Canvas",
    fullName: "Canvas LMS",
    description:
      "Generate quiz questions for Canvas LMS. Create questions with AI, then import to Canvas manually or via share link.",
    workflow: [
      "Generate quiz questions in Examina from your course material",
      "Review questions and copy them (or use share link for students)",
      "Manually create Canvas quiz and paste questions, or share Examina link for practice",
      "Canvas doesn't support direct import—workflow is copy-paste or external link",
    ],
    faq: [
      {
        q: "Can Examina export directly to Canvas?",
        a: "No. Canvas doesn't provide a direct import API for third-party questions. Generate questions in Examina, then manually copy them into Canvas quizzes or share an Examina link with students.",
      },
      {
        q: "Does it support Canvas QTI format?",
        a: "QTI export is not currently available. The workflow is to generate questions in Examina and manually create the quiz in Canvas.",
      },
      {
        q: "Can students take Examina quizzes through Canvas?",
        a: "Not directly integrated. Share an Examina quiz link in Canvas as an external resource, or manually recreate the quiz in Canvas.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 5 quiz generations per month. Paid plans start at $2/month for 20 quizzes.",
      },
    ],
    relatedTools: [
      "/integrations/qti",
      "/ai-quiz-generator",
      "/for-teachers",
    ],
  },
  {
    slug: "moodle",
    name: "Moodle",
    fullName: "Moodle LMS",
    description:
      "Create quiz questions for Moodle. Generate questions with AI, then import to Moodle manually.",
    workflow: [
      "Generate quiz questions in Examina from your content",
      "Review and edit questions as needed",
      "Manually create Moodle quiz and copy questions over",
      "Moodle XML export is not currently supported—workflow is manual copy",
    ],
    faq: [
      {
        q: "Can I export to Moodle XML format?",
        a: "Not currently. Generate questions in Examina and manually create the quiz in Moodle by copying questions and answers.",
      },
      {
        q: "Does it work with Moodle question banks?",
        a: "Indirectly. Generate questions in Examina, then manually add them to your Moodle question bank.",
      },
      {
        q: "Can I use Examina quizzes in Moodle courses?",
        a: "Share an Examina quiz link as an external resource in Moodle, or manually recreate the quiz in Moodle.",
      },
      {
        q: "What question types work with Moodle?",
        a: "Multiple choice and true/false transfer directly. Fill-in-the-blank becomes short answer in Moodle.",
      },
    ],
    relatedTools: [
      "/integrations/qti",
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
    ],
  },
  {
    slug: "google-classroom",
    name: "Google Classroom",
    fullName: "Google Classroom",
    description:
      "Generate quiz questions for Google Classroom. Create questions with AI, add to Google Forms, then assign in Classroom.",
    workflow: [
      "Generate quiz questions in Examina from lesson material",
      "Copy questions into Google Forms and set up auto-grading",
      "Assign the Google Form quiz in Google Classroom",
      "Or share Examina quiz link directly in Classroom for practice",
    ],
    faq: [
      {
        q: "Does Examina integrate with Google Classroom?",
        a: "No direct integration. Generate questions in Examina, copy them into Google Forms, then assign the Form in Classroom. Or share an Examina quiz link as a Classroom material.",
      },
      {
        q: "Can students submit through Classroom?",
        a: "If you use Google Forms, yes—Forms submissions sync with Classroom. Examina quizzes track scores internally but don't sync to Classroom gradebook.",
      },
      {
        q: "What's the fastest workflow?",
        a: "Generate questions in Examina, copy into Google Forms, assign Form in Classroom. Total time: 2-3 minutes for a complete quiz.",
      },
      {
        q: "Is this better than typing questions in Google Forms?",
        a: "Yes. AI generates questions in seconds vs. typing every question manually. You just copy-paste the final set.",
      },
    ],
    relatedTools: [
      "/integrations/google-forms",
      "/for-teachers",
      "/ai-quiz-generator",
    ],
  },
  {
    slug: "blackboard",
    name: "Blackboard",
    fullName: "Blackboard Learn",
    description:
      "Create quiz questions for Blackboard. Generate questions with AI, then manually add to Blackboard tests.",
    workflow: [
      "Generate quiz questions in Examina",
      "Review questions for accuracy",
      "Manually create Blackboard test and copy questions",
      "Blackboard doesn't support third-party question import—workflow is manual",
    ],
    faq: [
      {
        q: "Can Examina export to Blackboard?",
        a: "No. Blackboard doesn't provide an import API for external questions. Generate in Examina, then manually create the test in Blackboard.",
      },
      {
        q: "Does it work with Blackboard test banks?",
        a: "Indirectly. Generate questions in Examina and manually add them to your Blackboard test bank.",
      },
      {
        q: "Can I share Examina quizzes with Blackboard students?",
        a: "Yes. Share an Examina quiz link as an external tool or content item in Blackboard.",
      },
      {
        q: "Is there a faster way?",
        a: "The fastest workflow is generate in Examina → copy into Blackboard. Saves hours vs. writing questions manually.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/for-teachers",
      "/test-generator",
    ],
  },
  {
    slug: "qti",
    name: "QTI",
    fullName: "IMS QTI (Question & Test Interoperability)",
    description:
      "QTI export is not currently available. Generate questions in Examina and manually import to your LMS, or use share links.",
    workflow: [
      "Generate quiz questions in Examina from your content",
      "Copy questions and manually create quiz in your LMS (Canvas, Moodle, Blackboard)",
      "Or share Examina quiz link directly with students as external practice",
      "QTI export may be added in future—current workflow is manual or link sharing",
    ],
    faq: [
      {
        q: "Does Examina support QTI export?",
        a: "Not currently. QTI export is a planned feature. Right now, generate questions in Examina and manually copy them into your LMS or share quiz links.",
      },
      {
        q: "What's the alternative to QTI?",
        a: "Generate questions in Examina, then manually copy into Canvas/Moodle/Blackboard quizzes. Or share Examina quiz links as external practice—students can take them without LMS integration.",
      },
      {
        q: "Will QTI export be available in the future?",
        a: "It's on the roadmap. For now, the workflow is generate → manual copy or share link.",
      },
      {
        q: "Can I still use Examina with my LMS?",
        a: "Yes. Generate questions and manually add them to LMS quizzes, or share Examina quiz links as external resources. Both work with any LMS.",
      },
    ],
    relatedTools: [
      "/integrations/canvas",
      "/integrations/moodle",
      "/integrations/blackboard",
    ],
  },
];

export function getIntegration(slug: string): Integration | undefined {
  return INTEGRATIONS.find((i) => i.slug === slug);
}
