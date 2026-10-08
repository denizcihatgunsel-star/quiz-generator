import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Quiz Platform for Schools — District Quiz Software",
  description: "Quiz platform for schools and districts. AI quiz generation, shared question banks, and team plans for educators.",
  path: "/for-schools",
});

const faqs = [
  { q: "How does the school plan work?", a: "Team plan supports up to 5 teachers with unlimited quizzes and shared question banks. For larger schools, contact for district pricing." },
  { q: "Can teachers share question banks?", a: "Yes. Team members can access and reuse quizzes created by other teachers on the team." },
  { q: "Is there a free trial for schools?", a: "Yes. Each teacher can try the free tier (5 quizzes/month) before committing to Team plan." },
  { q: "Does it integrate with our LMS?", a: "Quizzes can be shared via link or manually copied into Canvas, Moodle, Google Classroom, or Blackboard." },
];

export default function ForSchoolsPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": "https://www.examina.ink/for-schools#webpage", url: "https://www.examina.ink/for-schools", name: "Quiz Platform for Schools | Examina", isPartOf: { "@id": "https://www.examina.ink/#website" } },
      { "@type": "SoftwareApplication", name: "Examina", url: "https://www.examina.ink", applicationCategory: "EducationalApplication", description: "Quiz platform for schools and districts with AI quiz generation.", offers: planOffers(now) },
      { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.examina.ink" },
        { "@type": "ListItem", position: 2, name: "For Schools", item: "https://www.examina.ink/for-schools" }
      ]}
    ]
  };

  

  return (

    <>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <KeywordLanding
      data={saleLandingData({
        kicker: "For Schools",
        h1: "Quiz platform for schools",
        h1Accent: "and districts",
        subtitle: "AI quiz generation saves teachers hours per week. Team plans include shared question banks and unlimited quizzes for up to 5 teachers.",
        cta: "Try free",
        introTitle: "Assessment tools that scale",
        intro: ["Teachers spend hours every week creating formative assessments—exit tickets, do-nows, unit quizzes. For a school with 20 teachers, that's hundreds of hours per month spent typing questions instead of teaching.", "Examina's AI quiz generator reduces that to minutes. Teachers upload lesson content and get quiz questions automatically. Team plans let teachers share question banks across departments, so one teacher's generated quiz becomes reusable for the whole team. Same quality assessments, fraction of the time investment."],
        featuresTitle: "Built for schools",
        features: [
          { title: "AI quiz generation", body: "Upload lesson material and get quiz questions in seconds. No manual typing, no question bank subscriptions." },
          { title: "Shared question banks", body: "Team members access and reuse quizzes. One teacher generates, the whole department benefits." },
          { title: "Unlimited quizzes", body: "Team plan ($15/month for 5 teachers) includes unlimited quiz generation—no per-quiz fees." },
        ],
        howTitle: "How schools use Examina",
        steps: [
          { n: "01", title: "Teachers generate quizzes", body: "Upload lesson notes, textbook chapters, or curriculum documents. AI writes quiz questions with explanations." },
          { n: "02", title: "Share across team", body: "Save quizzes to shared team library. Other teachers reuse and adapt for their classes." },
          { n: "03", title: "Run in classrooms", body: "Students join with codes for live games, or teachers share links for homework. No student accounts required." },
        ],
        faqTitle: "FAQs",
        faq: faqs,
        relatedTitle: "Related",
        related: [{ href: "/for-teachers", label: "For Teachers" }, { href: "/ai-quiz-generator", label: "AI Quiz Generator" }, { href: "/features/formative-assessment", label: "Formative Assessment" }],
      }, now)}
          />

      </>

    );
}
