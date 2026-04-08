import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";

export const metadata: Metadata = {
  title: "Fill in the Blank Generator AI — Create Cloze Questions | Examina",
  description:
    "Generate fill-in-the-blank questions from any text with AI. Test real recall, not just recognition. Free AI cloze question generator.",
  alternates: { canonical: "https://www.examina.ink/fill-in-the-blank-generator" },
};

export default function FillInTheBlankGeneratorPage() {
  return (
    <LandingPageLayout>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            Fill in the Blank Generator
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 leading-tight mb-6">
            Test What You
            <br />
            Actually Know
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mb-10">
            Multiple choice lets you recognize the answer. Fill-in-the-blank
            makes you recall it. Generate cloze-style questions from any text in
            seconds.
          </p>
          <a
            href="/auth/register"
            className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Generate Fill-in-the-Blank Questions
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
            From notes to recall practice in seconds.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Paste your study material",
                desc: "Add lecture notes, textbook content, or training documents. Upload PDF, TXT, or Markdown, or paste directly.",
              },
              {
                step: "02",
                title: "AI identifies key terms",
                desc: "Examina reads your content, identifies the most important concepts, and creates strategically placed blanks.",
              },
              {
                step: "03",
                title: "Practice active recall",
                desc: "Answer each question by typing the missing word or phrase. Get immediate feedback and explanations.",
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

      {/* Why it matters */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                The science of recall
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight">
                Retrieval practice
                <br />
                builds stronger memory.
              </h2>
              <p className="text-neutral-500 mt-6 leading-relaxed">
                Research in cognitive science consistently shows that actively
                pulling information from memory produces stronger long-term
                retention than re-reading or highlighting. Fill-in-the-blank is
                one of the purest forms of retrieval practice.
              </p>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "Medical students",
                  desc: "Memorizing anatomy, pharmacology, and clinical terminology.",
                },
                {
                  title: "Language learners",
                  desc: "Drilling vocabulary and grammar structures.",
                },
                {
                  title: "Law students",
                  desc: "Recalling case names, statutes, and legal principles.",
                },
                {
                  title: "STEM students",
                  desc: "Remembering formulas, constants, and technical terminology.",
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

      {/* Smarter blanks */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            Smarter blanks
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-6">
            Not random word deletion.
          </h2>
          <p className="text-neutral-500 leading-relaxed max-w-xl mx-auto">
            Examina doesn&apos;t just randomly remove words from your text. The
            AI identifies which terms are conceptually important and creates
            blanks that test understanding of the material&apos;s core ideas.
            The result: questions that feel like they belong on a real exam.
          </p>
        </div>
      </section>
    </LandingPageLayout>
  );
}
