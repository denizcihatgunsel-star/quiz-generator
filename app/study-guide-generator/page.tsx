import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import LandingPageLayout from "@/components/LandingPageLayout";
import { copyText, planOffers, saleCopy } from "@/lib/pricing";
import { CopyText } from "@/components/seasonal/halloween/SalePrice";

// Re-rendered at least every 60s so the Halloween sale copy reverts on its own after the cutoff.
export const revalidate = 60;
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "Study Guide Generator — AI Quiz & Flashcard Maker Free",
  description: "Generate study guides from notes with AI. Turn notes or PDFs into quiz questions and flashcards tagged by Bloom's taxonomy. Free to start.",
  path: "/study-guide-generator",
});

const FAQ_ITEMS = [
  {
    q: "Does Examina create a written study guide document?",
    a: "No. Examina turns your notes into a study set of quiz questions (multiple choice, true/false, fill-in-the-blank) and flashcards. Many students use that set as their study guide because it tests them instead of just summarizing.",
  },
  {
    q: "What can I turn into a study guide?",
    a: "Paste 50–15,000 characters of text, or upload a PDF, TXT or Markdown file such as lecture notes or a textbook chapter.",
  },
  {
    q: "Is the AI study guide generator free?",
    a: "You can start on the Free plan with 10 quizzes per month. Paid plans start at $2/month.",
  },
  {
    q: "What are the Bloom's taxonomy tags?",
    a: "Each question is tagged with a Bloom's taxonomy level, such as recall, understanding, application or analysis, so you can see whether your study set goes beyond memorization.",
  },
  {
    q: "Can I share my study set or print it?",
    a: "Yes. All plans including Free support sharing quiz links and PDF export.",
  },
  {
    q: "Can teachers use it for class review?",
    a: "Yes. Students join at examina.ink/classroom/join with a game code.",
  },
];

export default function StudyGuideGeneratorPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "Study guide generator that turns notes into quiz questions and flashcards with AI. Includes Bloom's taxonomy tagging and spaced repetition.",
        offers: planOffers(now),
        publisher: { "@id": "https://www.examina.ink/#organization" },
      },
      {
        "@type": "HowTo",
        name: "How to Generate a Study Guide",
        description: "Create an AI study guide from your notes in three steps",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Add your study material",
            text: "Paste text, upload notes as PDF/TXT/Markdown, or photograph a printed page.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Generate quiz and flashcards",
            text: "AI extracts key concepts and creates questions tagged by Bloom's taxonomy level.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Study and track progress",
            text: "Practice with the generated questions, review explanations, and use spaced repetition for flashcards.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
        })),
      },
    ],
  };

  return (
    <LandingPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            AI Study Guide Generator
          </p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 leading-tight mb-6">
            AI Study Guide Generator: Turn Notes into a Study Set
          </h1>
          <p className="text-lg text-neutral-500 max-w-3xl mb-6">
            A study guide should tell you what you know and what you don&apos;t. Examina turns your notes, PDFs or pasted text into a study set of quiz questions and flashcards you can work through, so your study guide quizzes you back.
          </p>
          <p className="text-sm text-neutral-400 mb-10 max-w-3xl italic">
            Examina creates quizzes and flashcards, not a written outline or summary.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity rounded-lg"
            >
              Make my study set
            </a>
            <a
              href="#how-it-works"
              className="inline-block px-8 py-3 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium hover:border-neutral-900 transition-colors rounded-lg"
            >
              How it works
            </a>
          </div>
        </div>
      </section>

      {/* A study guide you can actually test yourself with */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-6">
            A study guide you can actually test yourself with
          </h2>
          <div className="space-y-6 text-neutral-600 leading-relaxed max-w-3xl">
            <p>
              A traditional study guide is a page of summaries and key terms. It&apos;s useful for reading, but reading isn&apos;t the same as remembering. Research on learning keeps pointing to active recall (pulling an answer out of memory) as one of the most effective ways to study. Learn more in our{" "}
              <Link href="/blog/active-recall-guide" className="text-violet-600 hover:underline">
                active recall guide
              </Link>
              .
            </p>
            <p>
              Examina works as a study guide maker built around that idea. Instead of rewriting your notes into another document, it turns them into questions:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-violet-600 font-medium">•</span>
                <span><strong>Multiple choice</strong> to check you can pick out the right concept</span>
              </li>
              <li className="flex gap-3">
                <span className="text-violet-600 font-medium">•</span>
                <span><strong>True/false</strong> for fast checks of facts and common misconceptions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-violet-600 font-medium">•</span>
                <span><strong>Fill-in-the-blank</strong> to make you recall key terms without hints</span>
              </li>
              <li className="flex gap-3">
                <span className="text-violet-600 font-medium">•</span>
                <span><strong>Flashcards</strong> to drill definitions and core ideas</span>
              </li>
            </ul>
            <p>
              Every question is tagged with a Bloom&apos;s taxonomy level (for example recall, understanding, application or analysis), so your study set covers more than memorizing.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 border-t border-black/5" id="how-it-works">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-20">
            How to turn your notes into a study guide (3 steps)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Add your material.",
                desc: "Paste 50–15,000 characters of notes, or upload a PDF, TXT or Markdown file: lecture notes, a textbook chapter, a reading.",
              },
              {
                step: "02",
                title: "Generate your study set.",
                desc: "Examina's AI writes quiz questions and flashcards from your content, with explanations so you understand why an answer is right.",
              },
              {
                step: "03",
                title: "Study, then repeat.",
                desc: "Work through the quiz, check what you missed, and drill the weak spots with flashcards. Come back over the next few days; a spaced repetition schedule helps it stick.",
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
          <p className="mt-12 text-neutral-600">
            Come back over the next few days; a{" "}
            <Link href="/blog/spaced-repetition-schedule" className="text-violet-600 hover:underline">
              spaced repetition schedule
            </Link>{" "}
            helps it stick.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-12">
            What goes into your study set
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-4 px-4 font-medium text-neutral-900">Part of a classic study guide</th>
                  <th className="text-left py-4 px-4 font-medium text-neutral-900">Examina equivalent</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-200">
                  <td className="py-4 px-4 text-neutral-600">Key terms and definitions</td>
                  <td className="py-4 px-4 text-neutral-600">
                    <Link href="/ai-flashcards" className="text-violet-600 hover:underline">AI flashcards</Link> and fill-in-the-blank items
                  </td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-4 px-4 text-neutral-600">"Check your understanding" questions</td>
                  <td className="py-4 px-4 text-neutral-600">
                    <Link href="/multiple-choice-quiz-maker" className="text-violet-600 hover:underline">Multiple choice</Link> and{" "}
                    <Link href="/true-false-quiz-generator" className="text-violet-600 hover:underline">true/false</Link> questions
                  </td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-4 px-4 text-neutral-600">Fill-in-the-blank review sheet</td>
                  <td className="py-4 px-4 text-neutral-600">
                    <Link href="/fill-in-the-blank-generator" className="text-violet-600 hover:underline">Fill-in-the-blank generator</Link>
                  </td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-4 px-4 text-neutral-600">Mix of easy and hard questions</td>
                  <td className="py-4 px-4 text-neutral-600">Bloom&apos;s taxonomy tags on every question</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-4 px-4 text-neutral-600">Answer key</td>
                  <td className="py-4 px-4 text-neutral-600">Correct answers with explanations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-12">
            Who it&apos;s for
          </h2>
          <div className="space-y-8 max-w-3xl">
            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Students</h3>
              <p className="text-neutral-600 leading-relaxed">
                Before an exam, take your notes from the last few weeks and turn them into a study set per chapter. Start with flashcards to load the terms, then take the quiz to find gaps. Using a PDF of slides or a handout? Try the{" "}
                <Link href="/quiz-generator-from-pdf" className="text-violet-600 hover:underline">
                  PDF quiz generator
                </Link>
                .
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Teachers</h3>
              <p className="text-neutral-600 leading-relaxed">
                Turn a unit&apos;s reading into a review set for the class. Students join at examina.ink/classroom/join with a game code, so review day can be a live quiz rather than a handout. On Plus and above you can also share a set with a link or download it as a PDF to hand out.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Self-learners</h3>
              <p className="text-neutral-600 leading-relaxed">
                Reading a long article or a book chapter? Paste it in and get a quick quiz so you know whether it actually landed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why quiz-based study guides work */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-12">
            Why quiz-based study guides work
          </h2>
          <div className="space-y-6 max-w-3xl">
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>You find gaps early.</strong> A summary looks familiar even when you can&apos;t reproduce it. A question you get wrong is impossible to ignore.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>Explanations close the loop.</strong> Each answer comes with a short explanation, so every mistake teaches you something.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>Mixed formats.</strong> Switching between flashcards, multiple choice and fill-in-the-blank stops you from simply recognizing answers. See{" "}
                  <Link href="/blog/flashcards-vs-quizzes" className="text-violet-600 hover:underline">
                    flashcards vs quizzes
                  </Link>{" "}
                  for when to use each.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-violet-600 font-medium">•</span>
              <div>
                <p className="text-neutral-700">
                  <strong>It&apos;s fast.</strong> You spend your time studying, not formatting a document.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-neutral-600 max-w-3xl">
            Want the manual method too? Read{" "}
            <Link href="/blog/how-to-make-a-study-guide-from-notes" className="text-violet-600 hover:underline">
              how to make a study guide from your notes
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-6">
            Pricing
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl">
            <CopyText value={saleCopy("Start free with 10 quizzes a month. Starter $2/mo, Plus $5/mo, Pro $9/mo, Team $15/mo. Sharing and PDF download are included on all plans.", now)} />{" "}
            <Link href="/pricing" className="text-violet-600 hover:underline">See plans</Link>.
          </p>
        </div>
      </section>

      {/* More ways to study */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-12">
            More ways to study with Examina
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/ai-quiz-generator", label: "AI quiz generator" },
              { href: "/notes-to-quiz", label: "Notes to quiz" },
              { href: "/ai-flashcards", label: "AI flashcards" },
              { href: "/true-false-quiz-generator", label: "True/false quiz generator" },
              { href: "/multiple-choice-quiz-maker", label: "Multiple choice quiz maker" },
              { href: "/fill-in-the-blank-generator", label: "Fill-in-the-blank generator" },
              { href: "/quiz-generator-from-pdf", label: "Quiz from PDF" },
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

      {/* FAQ */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-12">
            Frequently asked questions
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
            Turn tonight&apos;s notes into tomorrow&apos;s study guide
          </h2>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity rounded-lg"
          >
            Make my study set — free
          </a>
        </div>
      </section>
    </LandingPageLayout>
  );
}
