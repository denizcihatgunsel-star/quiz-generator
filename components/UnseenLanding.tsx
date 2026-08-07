"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
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
    <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">{children}</p>
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
          <span className="whitespace-nowrap font-serif text-xl italic text-neutral-800 sm:text-2xl">
            {item}
          </span>
          <span className="mx-8 text-neutral-300">•</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-neutral-200 bg-gradient-to-b from-[#FDE8EC]/60 via-white to-white py-5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export default function UnseenLanding() {
  return (
    <div>
      <Marquee />

      {/* Selected — four ways to study */}
      <Reveal id="selected" className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-baseline justify-between border-b border-neutral-200 pb-8">
            <Kicker>Selected</Kicker>
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
              01 — 04
            </span>
          </div>

          <div>
            {SELECTED.map((item) => (
              <Link
                key={item.n}
                href={item.href}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-neutral-200 py-10 transition-colors duration-300 sm:grid-cols-[3rem_1fr_1fr] sm:gap-10"
              >
                <span className="font-mono text-xs text-neutral-300 transition-colors duration-300 group-hover:text-black">
                  {item.n}
                </span>
                <span className="font-serif text-3xl tracking-tight text-black transition-all duration-300 group-hover:italic sm:text-5xl">
                  {item.title}
                </span>
                <span className="col-span-2 text-sm leading-relaxed text-neutral-500 sm:col-span-1">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Numbers */}
      <Reveal className="border-t border-neutral-200 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Kicker>By the numbers</Kicker>
          <div className="mt-14 grid grid-cols-2 gap-12 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-5xl tracking-tight text-black sm:text-6xl">
                  {stat.number}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-neutral-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* World — dot map */}
      <Reveal className="border-t border-neutral-200 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-baseline justify-between">
            <Kicker>World</Kicker>
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
              Scroll to explore
            </span>
          </div>
          <DotMap className="mx-auto mt-16 w-full max-w-3xl" />
        </div>
      </Reveal>

      {/* Start studying */}
      <Reveal className="border-t border-neutral-200 py-28 sm:py-40">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Kicker>Start studying</Kicker>
          <h2 className="mx-auto mt-8 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-black sm:text-6xl lg:text-7xl">
            Put your notes to work.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-neutral-500">
            Paste a lesson, upload a PDF, or ask the assistant. Your quiz is ready in
            under thirty seconds.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register"
              className="group flex items-center gap-3 rounded-full bg-black py-3 pl-6 pr-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-800"
            >
              <span>Sign up free</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 group-hover:translate-x-0.5">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                </svg>
              </span>
            </Link>
            <a
              href="#generate"
              className="text-sm text-neutral-500 underline underline-offset-4 transition-colors duration-200 hover:text-black"
            >
              or try the demo
            </a>
          </div>
        </div>
      </Reveal>

      {/* Footer */}
      <footer className="bg-black px-6 py-12 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-2xl">Examina.</p>
            <p className="mt-2 text-xs text-white/50">©2026 Examina — World</p>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <Link href="/pricing" className="text-xs uppercase tracking-[0.25em] text-white/60 transition-colors duration-200 hover:text-white">
              Pricing
            </Link>
            <Link href="/explore" className="text-xs uppercase tracking-[0.25em] text-white/60 transition-colors duration-200 hover:text-white">
              Explore
            </Link>
            <Link href="/auth/login" className="text-xs uppercase tracking-[0.25em] text-white/60 transition-colors duration-200 hover:text-white">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
