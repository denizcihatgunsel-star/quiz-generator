import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Exam Practice Test Generators — SAT, ACT, MCAT, NCLEX & More",
  description:
    "Generate practice questions for SAT, ACT, AP, MCAT, NCLEX, GRE, LSAT, TOEFL, IELTS, midterms, and finals. AI-powered exam prep from your study notes.",
  path: "/exams",
});

const exams = [
  { slug: "sat", name: "SAT", description: "SAT practice test generator" },
  { slug: "act", name: "ACT", description: "ACT practice questions" },
  { slug: "ap", name: "AP", description: "AP exam practice quiz generator" },
  { slug: "mcat", name: "MCAT", description: "MCAT practice questions" },
  { slug: "nclex", name: "NCLEX", description: "NCLEX practice generator" },
  { slug: "gre", name: "GRE", description: "GRE practice quiz generator" },
  { slug: "lsat", name: "LSAT", description: "LSAT practice quiz" },
  { slug: "toefl", name: "TOEFL", description: "TOEFL practice quiz generator" },
  { slug: "ielts", name: "IELTS", description: "IELTS practice quiz generator" },
  { slug: "midterm", name: "Midterm", description: "Midterm exam generator" },
  { slug: "finals", name: "Finals", description: "Final exam generator" },
];


const faqs = [
  { q: "How do AI practice test generators work?", a: "Upload your study material and AI generates realistic practice questions matching the exam format. Each question includes explanations and difficulty tags." },
  { q: "Are these official exam questions?", a: "No. These are original AI-generated practice questions based on your study material. They help you practice exam skills but are not official test items." },
  { q: "Which exams can I practice for?", a: "SAT, ACT, AP, MCAT, NCLEX, GRE, LSAT, TOEFL, IELTS, plus midterm and final exams for any course." },
  { q: "Is this free?", a: "Free accounts get 5 quiz generations per month. Paid plans start at $2/month for 20 quizzes." },
];

export default function ExamsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/exams#webpage`,
        url: `${SITE_URL}/exams`,
        name: "Exam Practice Test Generators | Examina",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "ItemList",
        name: "Exam Practice Test Generators",
        description:
          "AI practice test generators for SAT, ACT, AP, MCAT, NCLEX, GRE, LSAT, TOEFL, IELTS, and more",
        itemListElement: exams.map((exam, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${exam.name} Practice Test Generator`,
          url: `${SITE_URL}/exams/${exam.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Exams",
            item: `${SITE_URL}/exams`,
          },
        ],
      },,
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: SITE_URL,
        applicationCategory: "EducationalApplication",
        description: "AI practice test generator for standardized exams and course tests.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    ],
  };

  return (
    <LandingPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-[#f5f5f0] px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-neutral-400">
            Exam Prep
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-neutral-900 sm:text-6xl">
            Practice test generators for every exam
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Generate practice questions for standardized tests, licensing exams, and classroom
            assessments. Upload your study notes and get exam-style questions with explanations.
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <Link
              key={exam.slug}
              href={`/exams/${exam.slug}`}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md"
            >
              <h3 className="mb-2 text-xl font-medium text-neutral-900 group-hover:text-violet-600">
                {exam.name}
              </h3>
              <p className="text-sm text-neutral-600">{exam.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#f5f5f0] px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-medium text-neutral-900">How it works</h2>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600">
            Upload your review book chapter, course notes, or study guide. Choose the exam type and
            Examina generates practice questions matching that exam's format and difficulty. Every
            question includes an explanation and is tagged by cognitive level.
          </p>
          <Link
            href="/ai-quiz-generator"
            className="inline-block rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Generate practice questions
          </Link>
        </div>
      </section>


      <section className="border-t border-neutral-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-medium text-neutral-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="mb-2 text-lg font-medium text-neutral-900">{faq.q}</h3>
                <p className="text-sm text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
}
