import Link from "next/link";
import { copyText, saleCopy } from "@/lib/pricing";

const TOOLS = [
  { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
  { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Maker" },
  { href: "/ai-flashcards", label: "Flashcard Generator" },
  { href: "/fill-in-the-blank-generator", label: "Fill in the Blank" },
  { href: "/true-false-quiz-generator", label: "True & False" },
  { href: "/study-guide-generator", label: "Study Guide Generator" },
  { href: "/quiz-generator-from-pdf", label: "PDF to Quiz" },
];

// Server component: rendered with its page (ISR, revalidate 60s), so the sale copy is per render.
export default function ToolCrossLinks({ faqs }: { faqs: { q: string; a: string }[] }) {
  const now = new Date();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
            More generators
          </p>
          <div className="flex flex-wrap gap-3">
            {TOOLS.map((t) => (
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
    </>
  );
}