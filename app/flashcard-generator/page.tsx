import type { Metadata } from "next";
import LandingPageLayout from "@/components/LandingPageLayout";

export const metadata: Metadata = {
  title: "AI Flashcard Generator — Create Flashcards from Notes | Examina",
  description:
    "Generate flashcards from any text instantly with AI. Paste your notes, get interactive study cards with 3D flip. Free AI flashcard generator.",
  alternates: { canonical: "https://www.examina.ink/flashcard-generator" },
};

export default function FlashcardGeneratorPage() {
  return (
    <LandingPageLayout>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            AI Flashcard Generator
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 leading-tight mb-6">
            Create Study Cards
            <br />
            from Any Text
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mb-10">
            Paste your notes and get a complete set of interactive flashcards in
            under 30 seconds. No manual card creation needed.
          </p>
          <a
            href="/auth/register"
            className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Generate Flashcards Free
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
            From notes to flashcards in three steps.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Paste your study material",
                desc: "Drop in lecture notes, textbook excerpts, articles, or any text between 50 and 15,000 characters. Upload PDF, TXT, or Markdown.",
              },
              {
                step: "02",
                title: "AI identifies key concepts",
                desc: "Examina reads your content and pulls out the most important terms, definitions, and relationships to create question-answer pairs.",
              },
              {
                step: "03",
                title: "Study with interactive cards",
                desc: "Your flashcards appear with a 3D flip animation. Click to reveal the answer. Share the deck via link or export to PDF.",
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

      {/* Why AI flashcards */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                Why AI-generated flashcards
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight">
                Skip the busywork.
                <br />
                Start studying.
              </h2>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "No manual card creation",
                  desc: "Traditional flashcard apps make you do all the work. Examina skips straight to the learning.",
                },
                {
                  title: "Context-aware questions",
                  desc: "The AI analyzes your full text for context, creating cards that capture nuance — not just isolated facts.",
                },
                {
                  title: "Bloom's Taxonomy mapping",
                  desc: "Cards span basic recall to analysis, giving you a more complete study session.",
                },
                {
                  title: "29 languages supported",
                  desc: "Generate flashcards in the same language as your source material. No translation needed.",
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
            What you can turn into flashcards
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Lecture notes", desc: "Get flashcards covering every key topic from class." },
              { title: "Textbook chapters", desc: "Upload a PDF chapter and generate cards for the entire section." },
              { title: "Research articles", desc: "Break down complex papers into digestible question-answer pairs." },
              { title: "Study guides", desc: "Convert existing study materials into an interactive format." },
              { title: "Training documents", desc: "Create flashcards from corporate training or onboarding materials." },
              { title: "Any text, any subject", desc: "Biology, history, law, medicine — if it's text, it works." },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-black/5">
                <h3 className="text-neutral-900 font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
}
