import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";

export const metadata: Metadata = {
  title: "About Examina — AI Quiz Generator for Students & Teachers",
  description:
    "Examina is an AI-powered quiz generator that turns any lesson into multiple choice, flashcards, fill-in-the-blank, and true/false questions. Learn more about Examina.",
  alternates: { canonical: "https://www.examina.ink/about" },
};

export default function AboutPage() {
  return (
    <LandingPageLayout>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            About
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 leading-tight mb-6">
            About Examina
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mb-16">
            The AI quiz generator built for everyone who learns or teaches.
          </p>

          <div className="space-y-8 text-neutral-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-medium text-neutral-900 mb-4">
                What is Examina?
              </h2>
              <p>
                Examina is an AI-powered quiz generator that turns any text into
                interactive practice questions. Paste your lecture notes, textbook
                chapters, training documents, or any study material, and Examina
                generates a complete quiz in under 30 seconds.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-neutral-900 mb-4">
                Why Examina exists
              </h2>
              <p>
                Studying by re-reading notes is passive and ineffective. Decades of
                cognitive science research show that active recall — testing yourself
                on material — produces stronger, longer-lasting memory. But creating
                practice questions manually takes time most people don&apos;t have.
              </p>
              <p className="mt-4">
                Examina was built to solve this problem. By using AI to generate
                questions from any source material, Examina makes active recall
                effortless for students, teachers, and professionals.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-neutral-900 mb-4">
                How Examina works
              </h2>
              <p>
                Examina reads your content and generates four types of questions:
                multiple choice (with explanations and difficulty tags), interactive
                flashcards (with 3D flip animation), fill-in-the-blank (for pure
                recall practice), and true/false (for quick comprehension checks).
              </p>
              <p className="mt-4">
                Every question Examina generates is mapped to Bloom&apos;s Taxonomy,
                ensuring quizzes test across cognitive levels — from basic remembering
                to analysis. This is the same framework educators use to design
                real exams.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-neutral-900 mb-4">
                Who uses Examina
              </h2>
              <ul className="space-y-3">
                <li>
                  <span className="font-medium text-neutral-900">Students</span>{" "}
                  — use Examina to turn lecture notes into practice quizzes, drill
                  flashcards before exams, and study with active recall instead of
                  passive re-reading.
                </li>
                <li>
                  <span className="font-medium text-neutral-900">Teachers</span>{" "}
                  — use Examina to create formative assessments, homework quizzes,
                  and review materials in seconds instead of hours.
                </li>
                <li>
                  <span className="font-medium text-neutral-900">Professionals</span>{" "}
                  — use Examina for certification prep, compliance training, and
                  onboarding knowledge checks.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium text-neutral-900 mb-4">
                Examina at a glance
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-6">
                {[
                  { number: "4", label: "Question types" },
                  { number: "29", label: "Languages" },
                  { number: "<30s", label: "Generation time" },
                  { number: "Free", label: "To start" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-medium text-neutral-900">
                      {stat.number}
                    </p>
                    <p className="text-sm text-neutral-400 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium text-neutral-900 mb-4">
                Privacy
              </h2>
              <p>
                Your content is sent to the AI for question generation only.
                Examina does not store your original text on its servers.
                Generated quizzes are saved to your account so you can access
                them anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
}
