import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";

export const metadata: Metadata = {
  title: "AI Study Tool for Students — Generate Quizzes from Notes | Examina",
  description:
    "Turn your lecture notes into practice quizzes with AI. Flashcards, multiple choice, fill-in-the-blank — study smarter with Examina. Free to start.",
  alternates: { canonical: "https://www.examina.ink/for-students" },
};

export default function ForStudentsPage() {
  return (
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
    </LandingPageLayout>
  );
}
