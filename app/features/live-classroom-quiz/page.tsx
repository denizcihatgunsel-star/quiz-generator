import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Live Classroom Quiz — Real-Time Quiz Games for Students",
  description: "Run live quiz games in class. Students join with a code from any device. Real-time leaderboards, instant feedback, no accounts needed.",
  path: "/features/live-classroom-quiz",
});

const faqs = [
  {
    q: "Do students need accounts to play?",
    a: "No. Students enter a join code and a nickname—no sign-up, no app install, works in any browser.",
  },
  {
    q: "What devices work?",
    a: "Phones, tablets, laptops—anything with a browser. Mixed-device classrooms are fine.",
  },
  {
    q: "Can I control the pacing?",
    a: "Yes. You advance questions from the host view. Students can't skip ahead.",
  },
  {
    q: "Is there a leaderboard?",
    a: "Yes. Real-time leaderboard updates after each question. Display it on the projector or keep it private.",
  },
  {
    q: "Can I reuse quizzes?",
    a: "Yes. Save any quiz to your library and launch it again with a new code.",
  },
  {
    q: "Is this free?",
    a: "Yes. Live classroom mode is included in all plans, including the free tier (5 quizzes/month).",
  },
];

export default function LiveClassroomQuizPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/features/live-classroom-quiz#webpage",
        url: "https://www.examina.ink/features/live-classroom-quiz",
        name: "Live Classroom Quiz — Real-Time Quiz Games | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description:
          "Live classroom quiz platform with join codes, real-time leaderboards, and instant feedback. Students play from any device without accounts.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.examina.ink",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Features",
            item: "https://www.examina.ink/features/live-classroom-quiz",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Live Classroom Quiz",
            item: "https://www.examina.ink/features/live-classroom-quiz",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KeywordLanding
        data={saleLandingData({
          kicker: "Live Classroom Quiz",
          h1: "Real-time quiz games",
          h1Accent: "for class",
          subtitle: `Run live quiz games with join codes. Students answer on their phones, see the leaderboard, and get instant feedback. No accounts, no downloads.`,
          cta: "Try it free",
          introTitle: "Turn formative assessment into a game",
          intro: [
            "Live classroom quizzes combine the engagement of a game with the pedagogical value of retrieval practice. Students compete in real time, answer questions on their devices, and see their score climb (or drop) with each round. The social stakes—the leaderboard, the countdown—recruit attention that a paper quiz can't.",
            "And because Examina generates questions from your lesson notes using AI, you can launch a game in under a minute: paste today's content, generate questions, open the room, and students join with a code. Same energy as dedicated game platforms, but with questions drawn from YOUR curriculum.",
          ],
          featuresTitle: "Everything you need for live classroom quizzes",
          features: [
            {
              title: "Join codes, no accounts",
              body: "Display the join code. Students enter it and a nickname from any device—phones, tablets, laptops. No sign-ups, no app installs.",
            },
            {
              title: "Real-time leaderboards",
              body: "After each question, the leaderboard updates live. Project it for the class or keep it private. Students see their rank instantly.",
            },
            {
              title: "Instant explanations",
              body: "After each round, display the correct answer and an explanation. Turn the game into a teaching moment.",
            },
          ],
          howTitle: "How to run a live classroom quiz",
          steps: [
            {
              n: "01",
              title: "Generate or select a quiz",
              body: "Create a quiz from your lesson notes (AI writes the questions), or pick a saved quiz from your library.",
            },
            {
              n: "02",
              title: "Launch the room",
              body: "Open live mode and display the join code on the projector. Students enter the code on their devices and join instantly.",
            },
            {
              n: "03",
              title: "Run the game",
              body: "Advance through questions at your pace. Students answer, see the leaderboard, and read explanations after each question. Export results when done.",
            },
          ],
          faqTitle: "Frequently asked questions",
          faq: faqs,
          relatedTitle: "More for teachers",
          related: [
            { href: "/for-teachers", label: "For Teachers" },
            { href: "/alternatives/kahoot", label: "Kahoot Alternative" },
            { href: "/alternatives/quizizz", label: "Quizizz Alternative" },
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/features/blooms-taxonomy", label: "Bloom's Taxonomy" },
            { href: "/classroom/join", label: "Join a Quiz" },
          ],
        }, now)}
      />
    </>
  );
}
