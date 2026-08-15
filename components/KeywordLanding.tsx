"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;

export interface KeywordLandingData {
  kicker: string;
  h1: string;
  h1Accent: string;
  subtitle: string;
  cta: string;
  featuresTitle: string;
  features: { title: string; body: string }[];
  howTitle: string;
  steps: { n: string; title: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  relatedTitle: string;
  related: { href: string; label: string }[];
}

const FOOTER_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function KeywordLanding({ data }: { data: KeywordLandingData }) {
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
              Pricing
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex h-8 items-center rounded-full bg-[#3B2027] px-4 text-xs font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]"
            >
              Get Started Free
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="px-6 py-20 text-center sm:py-28">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#A87680]"
          >
            {data.kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
            className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-[#3B2027] sm:text-6xl"
          >
            {data.h1}{" "}
            <span className="italic text-[#B0607A]">{data.h1Accent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.16 }}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#9A7280] sm:text-base"
          >
            {data.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.24 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
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
          </motion.div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="grid gap-6 sm:grid-cols-3">
            {data.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="hover-lift rounded-2xl border border-[#F3D5DC] bg-white/75 p-7 shadow-[0_20px_50px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl"
              >
                <h2 className="font-serif text-lg italic text-[#3B2027]">{f.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#9A7280]">{f.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="text-center font-serif text-2xl text-[#3B2027] sm:text-3xl">
              {data.howTitle}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {data.steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.08 }}
                  className="text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 + i * 0.08 }}
                    className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#F3D5DC] bg-white font-mono text-xs text-[#B0607A]"
                  >
                    {s.n}
                  </motion.span>
                  <h3 className="mt-4 font-serif text-base italic text-[#3B2027]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9A7280]">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20 rounded-2xl border border-[#F3D5DC] bg-white/75 p-8 shadow-[0_20px_50px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="font-serif text-lg italic text-[#3B2027]"
            >
              {data.faqTitle}
            </motion.h2>
            <div className="mt-6 space-y-6">
              {data.faq.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: EASE_OUT, delay: i * 0.05 }}
                >
                  <p className="text-sm font-medium text-[#3B2027]">{f.q}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#9A7280]">{f.a}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-center font-serif text-2xl text-[#3B2027] sm:text-3xl">
              {data.relatedTitle}
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {data.related.map((r, i) => (
                <motion.div
                  key={r.href}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    href={r.href}
                    className="inline-block rounded-full border border-[#F3D5DC] bg-white/70 px-5 py-2.5 text-sm text-[#8C5A68] backdrop-blur-xl transition-colors hover:border-[#B0607A] hover:text-[#3B2027]"
                  >
                    {r.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#3B2027] px-6 py-10 text-center">
        <p className="font-serif text-lg italic text-[#F6E3E8]">Examina.</p>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-[#E7BEC9]/70 transition-colors hover:text-[#F6E3E8]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-[11px] text-[#E7BEC9]/50">
          © {new Date().getFullYear()} Examina. All rights reserved.
        </p>
      </footer>
    </div>
  );
}