"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;

const FEATURES = [
  {
    title: "Multiple Choice",
    desc: "5-6 questions with explanations, difficulty tags, and Bloom's Taxonomy levels.",
    icon: "M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1m0-12.8l-2.1 2.1M7.7 16.3l-2.1 2.1",
    tint: "#B0607A",
  },
  {
    title: "Flashcards",
    desc: "Interactive cards with 3D flip. Great for active recall before exams.",
    icon: "M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 5h6M9 12h6",
    tint: "#8A5A44",
  },
  {
    title: "Fill in the Blank",
    desc: "Tests whether you actually know the material, not just recognize it.",
    icon: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
    tint: "#5B7A4A",
  },
  {
    title: "True / False",
    desc: "Quick comprehension checks with detailed explanations.",
    icon: "M5 13l4 4L19 7",
    tint: "#7A5BA0",
  },
];

const FAQ_ITEMS = [
  { q: "What file types can I upload?", a: "PDF, TXT, and Markdown files. Or just paste text directly." },
  { q: "How many quizzes can I generate?", a: "Free accounts get 5 per month. Paid plans go up to unlimited." },
  { q: "What makes the questions good?", a: "Questions are mapped to Bloom's Taxonomy — testing recall, understanding, application, and analysis. Not just surface-level memorization." },
  { q: "Can I share quizzes?", a: "Every quiz gets a unique link. You can also export to PDF." },
  { q: "Is my content stored?", a: "Content is sent to the AI for generation only. Generated quizzes are saved to your account." },
];

const STATS = [
  { number: "29", label: "Languages supported" },
  { number: "4", label: "Question types" },
  { number: "<30s", label: "Generation time" },
  { number: "Free", label: "To get started" },
];

export default function HomeSections() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="border-t border-[#F3D5DC]">
      {/* What you get */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#A87680]">What you get</p>
          <h2 className="mb-12 max-w-xl text-3xl font-medium tracking-tight text-[#3B2027] sm:text-4xl">
            Four question types.
            <br />
            <span className="font-serif italic text-[#B0607A]">One click.</span>
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-[#F3D5DC] bg-white/70 p-6 backdrop-blur-xl"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: f.tint }}
                />
                <span
                  className="spin-slow mb-5 flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ background: `${f.tint}1A`, color: f.tint }}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={f.icon} />
                  </svg>
                </span>
                <h3 className="mb-2 font-medium text-[#3B2027]">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[#9A7280]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Numbers */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="border-y border-[#F3D5DC] bg-[#FDF4F5]/60 py-16"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-serif text-4xl text-[#3B2027] sm:text-5xl">{s.number}</p>
              <p className="mt-2 text-sm text-[#9A7280]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        id="faq"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="py-20 sm:py-28"
      >
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-[#A87680]">FAQ</p>
          <h2 className="mb-12 text-center text-3xl font-medium tracking-tight text-[#3B2027] sm:text-4xl">
            Questions, <span className="font-serif italic text-[#B0607A]">answered.</span>
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    open ? "border-[#E9B8C4] bg-white/80" : "border-[#F3D5DC] bg-white/60"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-[#3B2027] sm:text-base">{item.q}</span>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDE8EC] text-[#B0607A]"
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-[#9A7280]">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
}