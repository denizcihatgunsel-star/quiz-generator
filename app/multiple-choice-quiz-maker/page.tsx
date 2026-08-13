import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import ToolCrossLinks from "@/components/ToolCrossLinks";

export const metadata: Metadata = {
  title: "AI Multiple Choice Quiz Maker — Generate MCQs Instantly | Examina",
  description:
    "Create multiple choice quizzes from any text with AI. Get 5-6 MCQs with explanations, difficulty tags & Bloom's Taxonomy levels. Free to try.",
  alternates: { canonical: "https://www.examina.ink/multiple-choice-quiz-maker" },
};

export default function MultipleChoiceQuizMakerPage() {
  return (
    <LandingPageLayout>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            AI Multiple Choice Quiz Maker
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 leading-tight mb-6">
            Generate MCQs
            <br />
            from Any Text
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mb-10">
            Paste your content and get 5-6 well-structured multiple choice
            questions with explanations, difficulty ratings, and Bloom&apos;s
            Taxonomy classification in under 30 seconds.
          </p>
          <a
            href="/auth/register"
            className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Create Multiple Choice Quiz
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-20">
            From content to quiz in three steps.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Add your content",
                desc: "Paste text from lecture notes, textbooks, or study guides. Upload PDF, TXT, or Markdown. 50-15,000 characters.",
              },
              {
                step: "02",
                title: "AI generates MCQs",
                desc: "Examina creates 5-6 multiple choice questions with four options each, correct answers, explanations, and difficulty tags.",
              },
              {
                step: "03",
                title: "Use your quiz immediately",
                desc: "Take it yourself, share via unique link, or export to PDF. Perfect for self-study or classroom assessments.",
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

      {/* What makes these different */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                Not your average quiz generator
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight">
                Questions you&apos;d actually
                <br />
                see on an exam.
              </h2>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "Plausible distractors",
                  desc: "Wrong answers are realistic — they test whether you truly understand the concept.",
                },
                {
                  title: "Bloom's Taxonomy mapping",
                  desc: "Questions span recall, comprehension, application, and analysis. Mirrors how real exams are designed.",
                },
                {
                  title: "Detailed explanations",
                  desc: "Every question includes a rationale for the correct answer, turning each quiz into a learning opportunity.",
                },
                {
                  title: "Difficulty tags",
                  desc: "Each question is tagged with its difficulty level so you can gauge your understanding at a glance.",
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

      {/* Use cases */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            Who uses this
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
            {[
              { title: "Students", desc: "Generate practice MCQs from your study notes before an exam. Test yourself on the exact material you need to know." },
              { title: "Teachers", desc: "Create formative assessments, homework quizzes, or review activities without spending your evening writing questions." },
              { title: "Corporate trainers", desc: "Build knowledge checks for training modules. Upload documentation and generate assessment questions." },
              { title: "Certification prep", desc: "Paste your study guide sections and generate realistic MCQs that match the exam format." },
            ].map((item, i) => (
              <div key={i} className="p-8 border border-black/5">
                <h3 className="text-neutral-900 font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ToolCrossLinks
        faqs={[
          { q: "How does the multiple choice quiz maker work?", a: "Paste or upload your study material and the AI generates 5-6 multiple choice questions with explanations, difficulty tags, and Bloom's Taxonomy levels." },
          { q: "Is the MCQ generator free?", a: "Yes — free accounts get 5 generations per month. Paid plans start at $2/month." },
          { q: "Can I export my multiple choice quiz?", a: "Yes — download the quiz as a PDF or share it with a unique link on Plus plans and above." },
        ]}
      />
    </LandingPageLayout>
  );
}
