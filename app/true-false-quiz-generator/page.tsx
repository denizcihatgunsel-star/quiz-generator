import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import LandingPageLayout from "@/components/LandingPageLayout";
import { copyText, saleCopy } from "@/lib/pricing";
import { CopyText } from "@/components/seasonal/halloween/SalePrice";

// Re-rendered at least every 60s so the Halloween sale copy reverts on its own after the cutoff.
export const revalidate = 60;
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "True or False Generator — AI True/False Quiz Maker",
  description: "AI true or false generator: turn notes, PDFs or pasted text into true/false questions with answers and explanations. Free plan includes 5 quizzes a month.",
  path: "/true-false-quiz-generator",
});

const FAQ_ITEMS = [
  {
    q: "What is a true or false generator?",
    a: "A tool that turns source material into true/false statements. Examina's AI reads your notes, PDF, TXT/Markdown or pasted text and writes true/false questions with the correct answer and an explanation.",
  },
  {
    q: "Is the true/false quiz generator free?",
    a: "Yes, you can start on the Free plan, which includes 5 quizzes per month. Paid plans start at $2/month for more quizzes.",
  },
  {
    q: "Can it answer or solve true or false questions for me?",
    a: "Examina is built to create true/false questions from your material, not to solve someone else's test. Every question it creates includes the answer and an explanation, so you can check your understanding.",
  },
  {
    q: "What can I upload?",
    a: "PDF (Starter and above), TXT and Markdown files, or paste 50–15,000 characters of text.",
  },
  {
    q: "How do I make good true or false questions?",
    a: "Test one idea per statement, avoid giveaway words like \"always\" and \"never\", skip double negatives, and make false statements plausible by changing one key detail. See our full guide for examples.",
  },
  {
    q: "Do the questions include explanations?",
    a: "Yes. Each true/false question comes with the correct answer and a short explanation.",
  },
  {
    q: "Can I share the quiz or download it as a PDF?",
    a: "Yes, on Plus ($5/mo) and above you can share quizzes with a link and download them as PDF.",
  },
  {
    q: "Can my students take the quiz in class?",
    a: "Yes. Students join at examina.ink/classroom/join using a game code.",
  },
];

export default function TrueFalseQuizGeneratorPage() {
  const now = new Date();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
    })),
  };

  return (
    <LandingPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            True / False Quiz Generator
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 leading-tight mb-6">
            True or False Quiz Generator — Make True/False Questions with AI
          </h1>
          <p className="text-lg text-neutral-500 max-w-3xl mb-10">
            Paste your notes or upload a PDF, TXT or Markdown file, and Examina&apos;s AI true or false generator writes true/false statements with the correct answer and an explanation for each one. Start free with 5 quizzes a month.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity rounded-lg"
            >
              Generate a true/false quiz
            </a>
            <a
              href="/pricing"
              className="inline-block px-8 py-3 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium hover:border-neutral-900 transition-colors rounded-lg"
            >
              See pricing
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-20">
            Three steps to better true/false questions.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Paste or upload content.",
                desc: "Add lecture notes, textbook passages or articles. Paste 50–15,000 characters of text, or upload a PDF, TXT or Markdown file.",
              },
              {
                step: "02",
                title: "AI writes true/false statements.",
                desc: "Examina turns the key ideas into true or false questions that test understanding, each with the correct answer and a short explanation. Questions are tagged with Bloom's taxonomy levels so you can see whether you're testing recall or deeper understanding.",
              },
              {
                step: "03",
                title: "Study or share.",
                desc: "Take the quiz right away. On Plus and above you can share it with a link or download it as a PDF. Teachers can run it in class; students join at examina.ink/classroom/join with a game code.",
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

      {/* Not your average T/F questions */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                Not your average T/F questions
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight">
                Statements that require genuine understanding.
              </h2>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "Nuanced wording",
                  desc: "Statements are phrased so the right answer depends on knowing the details, not just the gist.",
                },
                {
                  title: "Conceptual traps",
                  desc: "False statements contain subtle inaccuracies that only someone who studied the material would catch.",
                },
                {
                  title: "Full explanations",
                  desc: "Every question comes with a rationale, so you learn from mistakes immediately.",
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

      {/* True and false quiz template */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-6">
            True and false quiz template (with examples)
          </h2>
          <p className="text-lg text-neutral-500 mb-12 max-w-3xl">
            Want to build one yourself, or see what the generator produces? Use this simple true and false quiz template. It works on paper, in a doc, or as a checklist for reviewing AI output.
          </p>

          <div className="mb-12">
            <h3 className="text-xl font-medium text-neutral-900 mb-4">Template</h3>
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 font-mono text-sm text-neutral-700">
              <pre className="whitespace-pre-wrap">
Quiz title: ______________________   Topic / source: ______________
Instructions: Read each statement. Write T if it is true and F if it is false.

1. [Statement about one single fact or idea]          T / F
   Answer: ___   Why: [one-sentence explanation, citing the source]
2. ...

Answer key: 1 __ 2 __ 3 __ 4 __ 5 __
              </pre>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-medium text-neutral-900 mb-4">
              Example true/false questions (biology – photosynthesis)
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-violet-600 pl-4">
                <p className="text-neutral-700 mb-2">
                  <strong>1.</strong> Photosynthesis takes place mainly in the chloroplasts of plant cells. — <strong>True.</strong>
                </p>
                <p className="text-sm text-neutral-500">
                  Chloroplasts contain chlorophyll, which captures light energy.
                </p>
              </div>
              <div className="border-l-4 border-violet-600 pl-4">
                <p className="text-neutral-700 mb-2">
                  <strong>2.</strong> Oxygen is a reactant in photosynthesis. — <strong>False.</strong>
                </p>
                <p className="text-sm text-neutral-500">
                  Oxygen is a product; carbon dioxide and water are the reactants.
                </p>
              </div>
              <div className="border-l-4 border-violet-600 pl-4">
                <p className="text-neutral-700 mb-2">
                  <strong>3.</strong> The light-dependent reactions produce ATP and NADPH. — <strong>True.</strong>
                </p>
                <p className="text-sm text-neutral-500">
                  These carriers power the Calvin cycle.
                </p>
              </div>
              <div className="border-l-4 border-violet-600 pl-4">
                <p className="text-neutral-700 mb-2">
                  <strong>4.</strong> The Calvin cycle can only run in complete darkness. — <strong>False.</strong>
                </p>
                <p className="text-sm text-neutral-500">
                  It doesn&apos;t need light directly, but it runs during the day using products of the light reactions.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-medium text-neutral-900 mb-4">
              Example true/false questions (history – the printing press)
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-violet-600 pl-4">
                <p className="text-neutral-700 mb-2">
                  <strong>1.</strong> Johannes Gutenberg developed a movable-type printing press in Europe around 1440. — <strong>True.</strong>
                </p>
              </div>
              <div className="border-l-4 border-violet-600 pl-4">
                <p className="text-neutral-700 mb-2">
                  <strong>2.</strong> The printing press made books more expensive and harder to obtain. — <strong>False.</strong>
                </p>
                <p className="text-sm text-neutral-500">
                  It lowered the cost of producing books.
                </p>
              </div>
            </div>
          </div>

          <p className="text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-lg p-6">
            <strong>Tip:</strong> aim for a roughly even mix of true and false answers so students can&apos;t guess a pattern. To skip the manual work, paste your own notes above and generate a true/false quiz in seconds.
          </p>
        </div>
      </section>

      {/* How to write good true/false questions */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-6">
            How to write good true/false questions
          </h2>
          <p className="text-lg text-neutral-500 mb-12 max-w-3xl">
            Whether you write them yourself or edit what an AI true false generator gives you, the same rules make a fair, useful question:
          </p>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>Test one idea per statement.</strong> "Mitochondria produce ATP and are found only in animals" mixes a true and a false claim; split it in two.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>Avoid absolute giveaway words.</strong> "Always", "never" and "all" usually signal <em>false</em>; "sometimes" and "usually" usually signal <em>true</em>. Use them only when they&apos;re the point.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>Skip double negatives.</strong> "It is not untrue that…" tests reading, not knowledge.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>Make false statements plausible.</strong> Change one meaningful detail (a date, a cause, a direction) rather than writing something absurd.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>Keep length similar.</strong> Long, heavily qualified statements tend to be true; keep true and false items about the same length.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>Tie every item to the source.</strong> If you can&apos;t point to the sentence that proves it, rewrite it.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>Add an explanation.</strong> A one-line "why" turns a test into a learning moment, which is why Examina includes one with every question.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-neutral-600">
            For a deeper walkthrough with more examples, read our guide:{" "}
            <Link href="/blog/how-to-write-true-or-false-questions" className="text-violet-600 hover:underline">
              How to write true or false questions (with examples)
            </Link>
            .
          </p>
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
              { title: "Classroom warm-ups", desc: "Open class with five T/F questions from the last lecture." },
              { title: "Pre-exam review", desc: "Rapidly scan your knowledge; wrong answers show you where to focus." },
              { title: "Reading checks", desc: "Assign a chapter, then check it was read." },
              { title: "Quick self-assessment", desc: "When there's no time for a full practice exam." },
            ].map((item, i) => (
              <div key={i} className="p-8 border border-neutral-200 rounded-2xl shadow-sm bg-white">
                <h3 className="text-neutral-900 font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-neutral-600 max-w-3xl">
            True/false works best for fast checks of facts and misconceptions. For deeper practice, mix it with{" "}
            <Link href="/multiple-choice-quiz-maker" className="text-violet-600 hover:underline">multiple choice questions</Link>,{" "}
            <Link href="/fill-in-the-blank-generator" className="text-violet-600 hover:underline">fill-in-the-blank</Link> and{" "}
            <Link href="/ai-flashcards" className="text-violet-600 hover:underline">flashcards</Link>.
          </p>
        </div>
      </section>

      {/* Turn any source */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-12">
            Turn any source into a true/false test
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-neutral-200 rounded-xl bg-white">
              <h3 className="font-medium text-neutral-900 mb-2">From notes</h3>
              <p className="text-sm text-neutral-600 mb-4">
                <Link href="/notes-to-quiz" className="text-violet-600 hover:underline">
                  Turn your notes into a quiz
                </Link>
              </p>
            </div>
            <div className="p-6 border border-neutral-200 rounded-xl bg-white">
              <h3 className="font-medium text-neutral-900 mb-2">From a PDF</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Use the <Link href="/quiz-generator-from-pdf" className="text-violet-600 hover:underline">PDF quiz generator</Link> (PDF upload is included from the Starter plan).
              </p>
            </div>
            <div className="p-6 border border-neutral-200 rounded-xl bg-white">
              <h3 className="font-medium text-neutral-900 mb-2">Build a full study set</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Combine T/F with flashcards using the <Link href="/study-guide-generator" className="text-violet-600 hover:underline">study guide generator</Link>.
              </p>
            </div>
            <div className="p-6 border border-neutral-200 rounded-xl bg-white">
              <h3 className="font-medium text-neutral-900 mb-2">All question types</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Start from the <Link href="/ai-quiz-generator" className="text-violet-600 hover:underline">AI quiz generator</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-6">
            Pricing at a glance
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            <CopyText value={saleCopy("Free: 5 quizzes/month. Starter $2/mo, Plus $5/mo, Pro $9/mo, Team $15/mo. Sharing and PDF download are included from Plus.", now)} />{" "}
            <Link href="/pricing" className="text-violet-600 hover:underline">Compare plans</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-12">
            True or false generator FAQ
          </h2>
          <div className="space-y-8">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="pb-8 border-b border-neutral-200 last:border-0">
                <h3 className="text-lg font-medium text-neutral-900 mb-3">{item.q}</h3>
                <p className="text-neutral-600 leading-relaxed"><CopyText value={saleCopy(item.a, now)} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-6">
            Start studying smarter
          </h2>
          <p className="text-lg text-neutral-600 mb-10 max-w-2xl mx-auto">
            Paste your first lesson and generate a quiz in under 30 seconds. No credit card required.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity rounded-lg"
          >
            Try Examina free
          </a>
        </div>
      </section>

      {/* More generators */}
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            More generators
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
              { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Maker" },
              { href: "/ai-flashcards", label: "Flashcard Generator" },
              { href: "/fill-in-the-blank-generator", label: "Fill in the Blank" },
              { href: "/study-guide-generator", label: "Study Guide Generator" },
              { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
}
