import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "LMS Integrations — Canvas, Moodle, Google Classroom, Blackboard",
  description:
    "Generate quiz questions for your LMS. Works with Canvas, Moodle, Google Classroom, Blackboard, and QTI format.",
  path: "/integrations",
});

const integrations = [
  {
    slug: "google-forms",
    name: "Google Forms",
    description: "Generate questions, copy to Forms for auto-grading",
  },
  { slug: "canvas", name: "Canvas", description: "Generate questions for Canvas quizzes" },
  { slug: "moodle", name: "Moodle", description: "Create Moodle quiz questions with AI" },
  {
    slug: "google-classroom",
    name: "Google Classroom",
    description: "Assign quizzes in Classroom via Forms",
  },
  {
    slug: "blackboard",
    name: "Blackboard",
    description: "Generate questions for Blackboard tests",
  },
  { slug: "qti", name: "QTI Format", description: "IMS QTI export roadmap" },
];


const faqs = [
  { q: "Can Examina export directly to my LMS?", a: "Not currently. Generate questions in Examina, then manually copy into Canvas, Moodle, Blackboard, or Google Classroom. Or share Examina quiz links as external resources." },
  { q: "Does it support QTI format?", a: "QTI export is not available yet. Current workflow is generate → manual copy or share link." },
  { q: "Can students take Examina quizzes through the LMS?", a: "Students can take quizzes via shared Examina links (tracked in Examina) or you can manually recreate quizzes in your LMS for native gradebook integration." },
  { q: "Why use this if I have to copy questions manually?", a: "AI generates questions in seconds vs. hours of manual typing. Copy-paste takes 2 minutes; writing 20 questions by hand takes 60+ minutes." },
];

export default function IntegrationsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/integrations#webpage`,
        url: `${SITE_URL}/integrations`,
        name: "LMS Integrations | Examina",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: SITE_URL,
        applicationCategory: "EducationalApplication",
        description: "Generate quiz questions for Canvas, Moodle, Google Classroom, Blackboard, and other LMS platforms.",
      },
      {
        "@type": "ItemList",
        name: "LMS Integrations",
        description:
          "Use Examina-generated quiz questions with Canvas, Moodle, Google Classroom, Blackboard, and more",
        itemListElement: integrations.map((int, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: int.name,
          url: `${SITE_URL}/integrations/${int.slug}`,
          description: int.description,
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
            name: "Integrations",
            item: `${SITE_URL}/integrations`,
          },
        ],
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
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-neutral-400">Integrations</p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-neutral-900 sm:text-6xl">
            Use with your LMS
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Generate quiz questions with AI, then use them in Canvas, Moodle, Google Classroom,
            Blackboard, or any LMS. Questions include answer keys and explanations.
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl font-medium text-neutral-900">How it works</h2>
          <div className="mb-12 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 font-medium">
                1
              </div>
              <h3 className="mb-2 font-medium text-neutral-900">Generate in Examina</h3>
              <p className="text-sm text-neutral-600">
                Upload course material and AI writes quiz questions with answer keys.
              </p>
            </div>
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 font-medium">
                2
              </div>
              <h3 className="mb-2 font-medium text-neutral-900">Review questions</h3>
              <p className="text-sm text-neutral-600">
                Check for accuracy and edit wording if needed. All questions include explanations.
              </p>
            </div>
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 font-medium">
                3
              </div>
              <h3 className="mb-2 font-medium text-neutral-900">Add to your LMS</h3>
              <p className="text-sm text-neutral-600">
                Manually copy questions into your LMS quiz or share Examina link with students.
              </p>
            </div>
          </div>

          <h2 className="mb-8 text-2xl font-medium text-neutral-900">Available integrations</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {integrations.map((int) => (
              <Link
                key={int.slug}
                href={`/integrations/${int.slug}`}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md"
              >
                <h3 className="mb-2 text-xl font-medium text-neutral-900 group-hover:text-violet-600">
                  {int.name}
                </h3>
                <p className="text-sm text-neutral-600">{int.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#f5f5f0] px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-medium text-neutral-900">Save hours on quiz creation</h2>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600">
            Stop typing every question manually. Generate quiz questions in seconds and add them to
            your LMS.
          </p>
          <Link
            href="/ai-quiz-generator"
            className="inline-block rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Generate questions
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
