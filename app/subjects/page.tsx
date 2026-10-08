import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Quiz Generators by Subject — Biology, Math, History & More",
  description:
    "Generate subject-specific quiz questions from your notes. Biology, chemistry, math, history, English, vocabulary, anatomy, nursing, and more.",
  path: "/subjects",
});

const subjects = [
  { slug: "biology", name: "Biology" },
  { slug: "chemistry", name: "Chemistry" },
  { slug: "physics", name: "Physics" },
  { slug: "math", name: "Mathematics" },
  { slug: "history", name: "History" },
  { slug: "english", name: "English" },
  { slug: "vocabulary", name: "Vocabulary" },
  { slug: "spanish", name: "Spanish" },
  { slug: "anatomy", name: "Anatomy" },
  { slug: "nursing", name: "Nursing" },
  { slug: "psychology", name: "Psychology" },
  { slug: "computer-science", name: "Computer Science" },
];


const faqs = [
  { q: "What subjects does this work for?", a: "Any subject: biology, chemistry, physics, math, history, English, vocabulary, Spanish, anatomy, nursing, psychology, computer science, and more." },
  { q: "How does it generate subject-specific questions?", a: "AI reads your course notes and generates questions matching the subject's concepts, terminology, and difficulty level." },
  { q: "Can I use this for college courses?", a: "Yes. Upload lecture notes, textbook chapters, or study guides and get practice questions for any college subject." },
  { q: "Is this free?", a: "Free accounts get 10 quiz generations per month. Team plans with unlimited generation start at $15/month for 5 teachers." },
];

export default function SubjectsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/subjects#webpage`,
        url: `${SITE_URL}/subjects`,
        name: "Quiz Generators by Subject | Examina",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "ItemList",
        name: "Quiz Generators by Subject",
        itemListElement: subjects.map((subject, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${subject.name} Quiz Generator`,
          url: `${SITE_URL}/subjects/${subject.slug}`,
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
            name: "Subjects",
            item: `${SITE_URL}/subjects`,
          },
        ],
      },,
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: SITE_URL,
        applicationCategory: "EducationalApplication",
        description: "Generate subject-specific quiz questions from course notes for any academic subject.",
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
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-neutral-400">By Subject</p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-neutral-900 sm:text-6xl">
            Quiz generators for every subject
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Generate practice questions from your class notes, textbook chapters, or study guides.
            Questions are tailored to your specific course material.
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/subjects/${subject.slug}`}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md"
            >
              <h3 className="text-xl font-medium text-neutral-900 group-hover:text-violet-600">
                {subject.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#f5f5f0] px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-medium text-neutral-900">
            Study from your own material
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600">
            Upload notes from any subject and get practice questions covering your specific course
            content. Questions include explanations and are tagged by difficulty and Bloom's
            taxonomy level.
          </p>
          <Link
            href="/notes-to-quiz"
            className="inline-block rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Turn notes into quiz
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
