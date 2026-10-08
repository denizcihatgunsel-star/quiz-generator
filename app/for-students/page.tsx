import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import LandingPageLayout from "@/components/LandingPageLayout";
import { copyText, planOffers, saleCopy } from "@/lib/pricing";

export const metadata: Metadata = pageMetadata({
  title: "AI Quiz Generator for Students — Turn Notes into Quizzes Free",
  description: "AI quiz generator for students. Turn lecture notes into practice quizzes with AI. Flashcards, multiple choice, fill-in-the-blank. Free to start.",
  path: "/for-students",
});

const faqs = [
  { q: "Is the AI quiz generator free for students?", a: "Yes. Students start with 10 free quiz generations per month. Paid plans start at $2/month." },
  { q: "What types of questions can I generate?", a: "Multiple choice, true/false, fill-in-the-blank, and flashcards. All with explanations and Bloom's taxonomy tags." },
  { q: "Can I use handwritten notes?", a: "Yes. Upload a photo of your handwritten notes and OCR extracts the text before generating questions." },
  { q: "Does it work with PDFs?", a: "Yes. Upload lecture slides, textbook chapters, or study guides as PDF and turn them into quiz questions." },
  { q: "Can I study with spaced repetition?", a: "Yes. Flashcard mode uses spaced repetition to schedule reviews based on what you know and don't know." },
];

export default function ForStudentsPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/for-students#webpage",
        url: "https://www.examina.ink/for-students",
        name: "AI Quiz Generator for Students | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "AI quiz generator for students that turns lecture notes into practice quizzes, flashcards, and study questions with active recall and spaced repetition.",
        offers: planOffers(now),
        publisher: { "@id": "https://www.examina.ink/#organization" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageLayout>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            For Students
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 leading-tight mb-6">
            Turn Your Notes into
            <br />
            Practice Quizzes
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mb-10">
            Re-reading your notes doesn&apos;t work. Active recall — testing
            yourself — is the single most effective study technique. Examina
            makes it effortless.
          </p>
          <a
            href="/auth/register"
            className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Generate Your First Quiz
          </a>
        </div>
      </section>

      {/* How students use it */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            How students use Examina
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-20">
            Study smarter, not harder.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "After every lecture",
                desc: "Paste your notes, generate a quiz. Ten minutes of self-testing beats an hour of re-reading.",
              },
              {
                step: "02",
                title: "Before exams",
                desc: "Generate practice tests from each chapter. Work through them to find your weak spots.",
              },
              {
                step: "03",
                title: "With study groups",
                desc: "Generate a quiz and share the link. Everyone takes the same quiz, then discuss what you got wrong.",
              },
            ].map((item) => (
              <div key={item.step}>
                <span className="text-xs text-neutral-300 font-mono">
                  {item.step}
                </span>
                <h3 className="text-neutral-900 font-medium mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                Why it works
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight">
                Questions you haven&apos;t
                <br />
                seen before, from
                <br />
                your own material.
              </h2>
              <p className="text-neutral-500 mt-6 leading-relaxed">
                When you write your own practice questions, you already know the
                answers. Your brain skips the retrieval step entirely. Examina
                generates questions you haven&apos;t seen, tailored to exactly
                what you need to study.
              </p>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "Multiple choice",
                  desc: "The classic exam format. 5-6 questions with explanations so you learn from every answer.",
                },
                {
                  title: "Flashcards",
                  desc: "Interactive cards with 3D flip. Great for drilling definitions and key concepts.",
                },
                {
                  title: "Fill-in-the-blank",
                  desc: "The hardest format. No options to choose from — the most effective for building recall.",
                },
                {
                  title: "True / false",
                  desc: "Quick comprehension checks. Fast to complete, great for a final review pass.",
                },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs text-neutral-300 font-mono">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-neutral-900 font-medium mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  {i < 3 && <div className="mt-8 border-b border-black/5" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Works with everything */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            Works with everything you&apos;re studying
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Lecture notes", desc: "Paste directly from your note-taking app." },
              { title: "Textbook chapters", desc: "Upload the PDF and generate questions." },
              { title: "Research papers", desc: "Break down complex readings into testable concepts." },
              { title: "Slide decks", desc: "Copy text from your professor's slides." },
              { title: "Study guides", desc: "Convert any study material into an interactive quiz." },
              { title: "Any subject", desc: "Biology, history, CS, law, medicine — if it's text, it works." },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-black/5">
                <h3 className="text-neutral-900 font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            From students
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-100 mt-12">
            {[
              {
                quote:
                  "The fill-in-the-blank questions really test whether I know the material. Way better than just re-reading notes.",
                name: "Alex K.",
                role: "University Student",
              },
              {
                quote:
                  "I use it to prep for every exam. The flashcards with flip animation make studying actually engaging.",
                name: "Maria T.",
                role: "Medical Student",
              },
            ].map((t, i) => (
              <div key={i} className="bg-[#f5f5f0] p-10">
                <p className="text-neutral-600 leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-neutral-900 text-sm font-medium">
                    {t.name}
                  </p>
                  <p className="text-neutral-400 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-medium text-neutral-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">{faq.q}</h3>
                <p className="text-neutral-600">{copyText(saleCopy(faq.a, now))}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingPageLayout>
    </>
  );
}
