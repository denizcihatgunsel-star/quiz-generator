"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import DotMap from "./DotMap";

const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;

function Reveal({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      {children}
    </motion.section>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.4em] text-[#A87680]">{children}</p>
  );
}

function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const n = parseInt(value, 10);
  const isNumeric = !Number.isNaN(n) && String(n) === value;
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(0, n, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, isNumeric, n]);

  return (
    <span ref={ref} className={className}>
      {isNumeric ? display : value}
    </span>
  );
}

const MARQUEE_ITEMS = [
  "Turn your notes into quizzes",
  "4 question types",
  "29 languages",
  "50 – 15,000 characters",
  "Bloom's Taxonomy levels",
  "Free to start",
];

const SELECTED = [
  {
    n: "01",
    title: "Multiple Choice",
    desc: "5–6 questions with explanations, difficulty tags, and Bloom's Taxonomy levels.",
    href: "/multiple-choice-quiz-maker",
  },
  {
    n: "02",
    title: "Flashcards",
    desc: "Interactive cards with 3D flip. Great for active recall before exams.",
    href: "/flashcard-generator",
  },
  {
    n: "03",
    title: "Fill in the Blank",
    desc: "Tests whether you actually know the material, not just recognize it.",
    href: "/fill-in-the-blank-generator",
  },
  {
    n: "04",
    title: "True & False",
    desc: "Quick comprehension checks with detailed explanations.",
    href: "/true-false-quiz-generator",
  },
];

const STATS = [
  { number: "29", label: "Languages supported" },
  { number: "4", label: "Question types" },
  { number: "<30s", label: "Generation time" },
  { number: "Free", label: "To get started" },
];

function Marquee() {
  const row = (hidden: boolean) => (
    <div className="flex items-center pr-10" aria-hidden={hidden}>
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap font-serif text-xl italic text-[#7A5560] sm:text-2xl">
            {item}
          </span>
          <span className="mx-8 text-[#E9B8C4]">•</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden marquee-pause border-y border-[#F3D5DC] py-5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export default function UnseenLanding() {
  return (
    <div className="bg-gradient-to-b from-[#FDE8EC] via-[#FBF1EE] to-[#F8E9ED]">
      <Marquee />

      {/* Selected — four ways to study */}
      <Reveal id="selected" className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-baseline justify-between border-b border-[#F3D5DC] pb-8">
            <Kicker>Selected</Kicker>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C98A98]">
              01 — 04
            </span>
          </div>

          <div>
            {SELECTED.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.07 }}
              >
                <Link
                  href={item.href}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-[#F3D5DC] py-10 transition-colors duration-300 sm:grid-cols-[3rem_1fr_1fr] sm:gap-10"
                >
                  <span className="font-mono text-xs text-[#D8A5B2] transition-colors duration-300 group-hover:text-[#8C5563]">
                    {item.n}
                  </span>
                  <span className="font-serif text-3xl tracking-tight text-[#4A3038] transition-all duration-300 group-hover:italic sm:text-5xl">
                    {item.title}
                    <span
                      aria-hidden
                      className="ml-3 inline-block text-[#B0607A] opacity-0 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </span>
                  <span className="col-span-2 text-sm leading-relaxed text-[#9A7280] sm:col-span-1">
                    {item.desc}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Numbers */}
      <Reveal className="border-t border-[#F3D5DC] py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Kicker>By the numbers</Kicker>
          <div className="mt-14 grid grid-cols-2 gap-12 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
              >
                <CountUp
                  value={stat.number}
                  className="font-serif text-5xl tracking-tight text-[#B0607A] sm:text-6xl"
                />
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-[#9A7280]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* World — scroll to explore */}
      <section className="border-t border-[#F3D5DC] pt-24 sm:pt-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-baseline justify-between">
            <Kicker>World</Kicker>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C98A98]">
              Scroll to explore
            </span>
          </div>
          <div aria-hidden className="mt-6 flex justify-center">
            <span className="bounce-soft text-lg text-[#C98A98]">↓</span>
          </div>
        </div>
        <DotMap className="mx-auto mt-14 w-full max-w-4xl" />
      </section>

      {/* Start studying */}
      <Reveal className="border-t border-[#F3D5DC] py-28 sm:py-40">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Kicker>Start studying</Kicker>
          <h2 className="mx-auto mt-8 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-[#4A3038] sm:text-6xl lg:text-7xl">
            {"Put your notes to work.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.06 }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[#9A7280]">
            Paste a lesson, upload a PDF, or ask the assistant. Your quiz is ready in
            under thirty seconds.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register"
              className="group flex items-center gap-3 rounded-full bg-[#3B2027] py-3 pl-6 pr-2 text-sm font-medium text-[#F6E3E8] transition-colors duration-200 hover:bg-[#52303B]"
            >
              <span>Sign up free</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6E3E8] text-[#3B2027] transition-transform duration-200 group-hover:translate-x-0.5">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                </svg>
              </span>
            </Link>
            <a
              href="#generate"
              className="text-sm text-[#9A7280] underline underline-offset-4 transition-colors duration-200 hover:text-[#3B2027]"
            >
              or try the demo
            </a>
          </div>
        </div>
      </Reveal>

      {/* Footer */}
      <footer className="bg-[#3B2027] px-6 py-12 text-[#F6E3E8]">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-2xl">Examina.</p>
            <p className="mt-2 text-xs text-[#E7BEC9]/70">©2026 Examina — World</p>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <Link href="/pricing" className="text-xs uppercase tracking-[0.25em] text-[#E7BEC9] transition-colors duration-200 hover:text-white">
              Pricing
            </Link>
            <Link href="/explore" className="text-xs uppercase tracking-[0.25em] text-[#E7BEC9] transition-colors duration-200 hover:text-white">
              Explore
            </Link>
            <Link href="/auth/login" className="text-xs uppercase tracking-[0.25em] text-[#E7BEC9] transition-colors duration-200 hover:text-white">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
