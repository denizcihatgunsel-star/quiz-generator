import Link from "next/link";

const TOOLS = [
  { href: "/multiple-choice-quiz-maker", label: "Multiple Choice Maker" },
  { href: "/flashcard-generator", label: "Flashcard Generator" },
  { href: "/fill-in-the-blank-generator", label: "Fill in the Blank" },
  { href: "/true-false-quiz-generator", label: "True & False" },
];

export default function ToolCrossLinks({ faqs }: { faqs: { q: string; a: string }[] }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
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