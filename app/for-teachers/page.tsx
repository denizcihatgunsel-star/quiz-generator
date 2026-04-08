import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";

export const metadata: Metadata = {
  title: "AI Quiz Generator for Teachers — Create Assessments Fast | Examina",
  description:
    "AI quiz generator built for teachers. Paste lesson content and generate classroom-ready quizzes with Bloom's Taxonomy mapping in seconds.",
  alternates: { canonical: "https://www.examina.ink/for-teachers" },
};

export default function ForTeachersPage() {
  return (
    <LandingPageLayout>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            For Teachers
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 leading-tight mb-6">
            Create Classroom-Ready
            <br />
            Quizzes in Seconds
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mb-10">
            You became a teacher to educate, not to spend your evenings writing
            quiz questions. Paste your lesson notes and get a complete assessment
            in under 30 seconds.
          </p>
          <a
            href="/auth/register"
            className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Create Your First Quiz
          </a>
        </div>
      </section>

      {/* How teachers use it */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            How teachers use Examina
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-20">
            From lesson plan to quiz in 30 seconds.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                title: "Formative assessments",
                desc: "Check understanding mid-lesson or at the end of class. Paste the key points from today's lesson and generate a quick quiz.",
              },
              {
                title: "Homework & reading checks",
                desc: "Assign a chapter, then generate a quiz to verify students engaged with the material. Share via link for online submission.",
              },
              {
                title: "Review sessions",
                desc: "Before a unit test, generate practice quizzes from your lesson notes. Share the link and let students practice on their own time.",
              },
              {
                title: "Full practice exams",
                desc: "Combine quizzes from multiple lessons to build comprehensive review materials for midterms and finals.",
              },
            ].map((item, i) => (
              <div key={i} className="p-8 border border-black/5">
                <h3 className="text-neutral-900 font-medium mb-2">
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

      {/* Bloom's Taxonomy */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                Built around Bloom&apos;s Taxonomy
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight">
                Questions tagged by
                <br />
                cognitive level.
              </h2>
              <p className="text-neutral-500 mt-6 leading-relaxed">
                Every question is tagged with its Bloom&apos;s Taxonomy level —
                from basic recall to analysis. Quickly review whether your quiz
                covers the cognitive levels your learning objectives require.
              </p>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "Four question types",
                  desc: "Multiple choice, flashcards, fill-in-the-blank, and true/false — all from a single piece of content.",
                },
                {
                  title: "Share and export",
                  desc: "Every quiz gets a unique link. Students can take it on any device. Export to PDF for printing.",
                },
                {
                  title: "Works with your materials",
                  desc: "Paste from lesson plans, slide notes, or curriculum documents. Upload PDFs. No reformatting needed.",
                },
                {
                  title: "29 languages",
                  desc: "Works for ESL classrooms, foreign language courses, and multilingual schools.",
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

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            From educators
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-100 mt-12">
            {[
              {
                quote:
                  "I used to spend an hour writing a quiz for each chapter. Now I paste my notes and have one ready in 30 seconds. The Bloom's Taxonomy tags are a huge bonus.",
                name: "Sarah M.",
                role: "High School Teacher",
              },
              {
                quote:
                  "Finally a tool that tests understanding, not just memorization. The Bloom's taxonomy mapping is a game changer.",
                name: "Dr. James L.",
                role: "Professor",
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
    </LandingPageLayout>
  );
}
