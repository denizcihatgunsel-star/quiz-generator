import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";
import ToolCrossLinks from "@/components/ToolCrossLinks";

export const metadata: Metadata = {
  title: "True/False Quiz Generator AI — Create T/F Questions | Examina",
  description:
    "Generate true/false quiz questions from any text with AI. Each question includes detailed explanations. Free AI true/false quiz generator.",
  alternates: { canonical: "https://www.examina.ink/true-false-quiz-generator" },
};

export default function TrueFalseQuizGeneratorPage() {
  return (
    <LandingPageLayout>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            True / False Quiz Generator
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 leading-tight mb-6">
            Create T/F Questions
            <br />
            with AI
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mb-10">
            Generate well-crafted true/false questions from any source material
            in seconds. Each question includes the correct answer and a detailed
            explanation.
          </p>
          <a
            href="/auth/register"
            className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Generate True/False Quiz
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
            Quick comprehension checks, instantly.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Paste or upload content",
                desc: "Add lecture notes, textbook passages, or articles. Text input (50-15,000 characters) or PDF, TXT, Markdown uploads.",
              },
              {
                step: "02",
                title: "AI creates T/F questions",
                desc: "Examina generates true/false statements that test understanding of key concepts, with correct answers and explanations.",
              },
              {
                step: "03",
                title: "Study or share",
                desc: "Take the quiz immediately, share it with a link, or export to PDF for offline review.",
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

      {/* Why these are better */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                Not your average T/F questions
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight">
                Statements that require
                <br />
                genuine understanding.
              </h2>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "Nuanced wording",
                  desc: "Statements are carefully phrased so correct answers require knowing the details, not just the gist.",
                },
                {
                  title: "Conceptual traps",
                  desc: "False statements contain subtle inaccuracies that only someone who studied the material would catch.",
                },
                {
                  title: "Full explanations",
                  desc: "Every question comes with a rationale, so you learn from your mistakes immediately.",
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
                  {i < 2 && <div className="mt-8 border-b border-black/5" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* When to use */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            When to use true/false quizzes
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
            {[
              { title: "Classroom warm-ups", desc: "Start a class with 5 T/F questions from the previous lecture. Quick, engaging, and revealing." },
              { title: "Pre-exam review", desc: "Rapidly scan your knowledge. If you're marking statements wrong, you know where to focus." },
              { title: "Reading checks", desc: "Assign a chapter and generate T/F questions to verify students did the reading." },
              { title: "Quick self-assessment", desc: "When you don't have time for a full practice exam, T/F gives you a fast read on where you stand." },
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
          { q: "How does the true/false quiz generator work?", a: "Paste your study material and the AI creates declarative statements that are clearly true or false, with explanations for every answer." },
          { q: "Is the true/false generator free?", a: "Yes — free accounts get 5 generations per month. Paid plans start at $2/month." },
          { q: "Why are true/false questions useful?", a: "They're the fastest way to scan a topic for gaps — ideal for classroom warm-ups, reading checks, and pre-exam review." },
        ]}
      />
    </LandingPageLayout>
  );
}
