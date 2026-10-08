import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Exit Ticket Generator — AI Exit Tickets for Teachers",
  description: "Generate exit ticket questions from lesson notes in seconds. Perfect for daily formative assessment.",
  path: "/exit-ticket-generator",
});

const faqs = [
  { q: "What's an exit ticket?", a: "A short formative assessment (2-3 questions) students complete at the end of a lesson. It tells teachers whether the class understood the day's content." },
  { q: "How many questions should an exit ticket have?", a: "2-3 questions that take 3-5 minutes total. Exit tickets are quick checks, not quizzes." },
  { q: "Can students take exit tickets without accounts?", a: "Yes. Share a link or display the questions. For live exit tickets, students join with a code from any device." },
  { q: "Is this free for teachers?", a: "Free accounts get 5 generations per month. For daily exit tickets, the Team plan ($15/month for 5 teachers) includes unlimited generations." },
];

export default function ExitTicketGeneratorPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": "https://www.examina.ink/exit-ticket-generator#webpage", url: "https://www.examina.ink/exit-ticket-generator", name: "Exit Ticket Generator | Examina", isPartOf: { "@id": "https://www.examina.ink/#website" } },
      { "@type": "SoftwareApplication", name: "Examina", url: "https://www.examina.ink", applicationCategory: "EducationalApplication", description: "Generate exit ticket questions for formative assessment.", offers: planOffers(now) },
      { "@type": "HowTo", name: "How to create exit tickets with AI", step: [
        { "@type": "HowToStep", position: 1, name: "Paste lesson key points", text: "Copy the key concepts from today's lesson" },
        { "@type": "HowToStep", position: 2, name: "Generate questions", text: "AI writes 2-3 quick check questions" },
        { "@type": "HowToStep", position: 3, name: "Run the exit ticket", text: "Students answer in the last 5 minutes of class" }
      ]},
      { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.examina.ink" },
        { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.examina.ink/exit-ticket-generator" }
      ]}
    ]
  };

  

  return (

    <>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <KeywordLanding
      data={saleLandingData({
        kicker: "Exit Ticket Generator",
        h1: "Exit ticket generator",
        h1Accent: "for teachers",
        subtitle: "Generate exit ticket questions from lesson notes in under 30 seconds. Quick checks teachers can use at the end of lessons.",
        cta: "Generate exit ticket",
        introTitle: "Daily formative assessment made fast",
        intro: ["Exit tickets are one of the most effective formative assessment tools—2-3 questions at the end of class that tell you whether students got it. The problem: writing good exit tickets every day takes time most teachers don't have.", "Examina generates exit tickets from your lesson notes in under 30 seconds. Paste the key concepts from today's lesson, get 2-3 targeted questions (one recall, one application), and you're ready to assess. Students answer in 3-5 minutes, you review responses that evening, and you know whether to re-teach tomorrow or move on."],
        featuresTitle: "Built for daily use",
        features: [
          { title: "Quick formative assessment", body: "2-3 targeted questions that take students 3-5 minutes to complete—perfect for the last moments of class." },
          { title: "Leveled questions", body: "Mix recall and application questions to quickly assess whether students got the concept or just the vocabulary." },
          { title: "Ready in seconds", body: "Generate exit tickets in under 30 seconds from lesson notes. No more spending evenings writing daily checks." },
        ],
        howTitle: "How to use it",
        steps: [
          { n: "01", title: "Paste lesson key points", body: "Copy the key concepts from today's lesson—could be from slides, board notes, or your lesson plan." },
          { n: "02", title: "Generate questions", body: "AI writes 2-3 quick check questions with answer keys in under 30 seconds." },
          { n: "03", title: "Run the exit ticket", body: "Project for the class, share a link, or launch live mode. Students answer in the last 5 minutes. Review responses to inform tomorrow's lesson." },
        ],
        faqTitle: "FAQs",
        faq: faqs,
        relatedTitle: "Related",
        related: [{ href: "/features/formative-assessment", label: "Formative Assessment" }, { href: "/for-teachers", label: "For Teachers" }, { href: "/blog/exit-ticket-ideas", label: "Exit Ticket Ideas" }],
      }, now)}
          />

      </>

    );
}
