import Link from "next/link";

export interface LocaleData {
  code: string;
  url: string;
  kicker: string;
  h1: string;
  subtitle: string;
  cta: string;
  price: string;
  featuresTitle: string;
  features: { title: string; body: string }[];
  howTitle: string;
  steps: { n: string; title: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  footer: string;
}

export default function LocalizedLanding({ data }: { data: LocaleData }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDE8EC] via-[#FBF1EE] to-[#F8E9ED]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="border-b border-[#F3D5DC]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-serif text-lg italic tracking-tight text-[#3B2027]"
          >
            Examina<span className="text-[#B0607A]">.</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/pricing"
              className="text-xs text-[#9A7280] transition-colors hover:text-[#3B2027]"
            >
              {data.price}
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex h-8 items-center rounded-full bg-[#3B2027] px-4 text-xs font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]"
            >
              {data.cta}
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="px-6 py-20 text-center sm:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#A87680]">
            {data.kicker}
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-[#3B2027] sm:text-6xl">
            {data.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#9A7280] sm:text-base">
            {data.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register"
              className="group flex items-center gap-3 rounded-full bg-[#3B2027] py-3 pl-6 pr-2 text-sm font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]"
            >
              <span>{data.cta}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6E3E8] text-[#3B2027] transition-transform group-hover:translate-x-0.5">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="grid gap-6 sm:grid-cols-3">
            {data.features.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#F3D5DC] bg-white/75 p-7 shadow-[0_20px_50px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl"
              >
                <h2 className="font-serif text-lg italic text-[#3B2027]">{f.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#9A7280]">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="text-center font-serif text-2xl text-[#3B2027] sm:text-3xl">
              {data.howTitle}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {data.steps.map((s) => (
                <div key={s.n} className="text-center">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#F3D5DC] bg-white font-mono text-xs text-[#B0607A]">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-serif text-base italic text-[#3B2027]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9A7280]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 rounded-2xl border border-[#F3D5DC] bg-white/75 p-8 shadow-[0_20px_50px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl">
            <h2 className="font-serif text-lg italic text-[#3B2027]">{data.faqTitle}</h2>
            <div className="mt-6 space-y-6">
              {data.faq.map((f, i) => (
                <div key={i}>
                  <p className="text-sm font-medium text-[#3B2027]">{f.q}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#9A7280]">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#3B2027] px-6 py-10 text-center text-xs text-[#E7BEC9]/70">
        <p className="font-serif text-lg italic text-[#F6E3E8]">Examina.</p>
        {data.footer}
      </footer>
    </div>
  );
}