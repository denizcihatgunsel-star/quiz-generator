"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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

const HOW_IT_WORKS_STEPS = [
  {
    num: "01",
    title: "Paste or Upload Your Notes",
    desc: "Copy lecture notes, textbook sections, or study materials directly into Examina. Supports PDF, TXT, and Markdown files, or just paste text from anywhere.",
  },
  {
    num: "02",
    title: "Generate Questions in Seconds",
    desc: "AI reads your content and creates multiple choice, true/false, fill-in-the-blank, and flashcard questions automatically. Takes under 30 seconds per quiz.",
  },
  {
    num: "03",
    title: "Review and Customize",
    desc: "Check the generated questions. Edit any question or answer, adjust difficulty tags, or regenerate specific questions you want to improve.",
  },
  {
    num: "04",
    title: "Study, Share, or Export",
    desc: "Take the quiz yourself for practice, share a link with classmates or students, or export to PDF for offline study and printing.",
  },
];

const USE_CASES = [
  {
    icon: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M12.5 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
    title: "Students",
    desc: "Turn lecture notes and textbook chapters into practice quizzes. Study with active recall instead of passive re-reading. Identify weak areas before exams.",
    link: "/for-students",
  },
  {
    icon: "M22 10v6M2 10l10-5 10 5-10 5z M2 10v6c0 1-1 2 0 3l10 5 10-5c1-1 0-2 0-3v-6",
    title: "Teachers",
    desc: "Create formative assessments, exit tickets, and review quizzes from lesson content in minutes. Generate questions that test understanding, not just memorization.",
    link: "/for-teachers",
  },
  {
    icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    title: "Tutors",
    desc: "Build custom practice sets for each student based on their specific course material. Save hours creating worksheets and assessments manually.",
    link: "/",
  },
  {
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Corporate Training",
    desc: "Create compliance training quizzes and knowledge checks from policy documents, training manuals, and onboarding materials quickly.",
    link: "/",
  },
];

const QUESTION_TYPES_DETAIL = [
  {
    type: "Multiple Choice",
    ideal: "Testing recall, understanding, and application of concepts.",
    example: "What is the primary function of mitochondria? (4-6 answer choices with explanations)",
  },
  {
    type: "True/False",
    ideal: "Quick concept verification and identifying misconceptions.",
    example: "True or False: Photosynthesis only occurs during daylight. (Includes detailed explanation of why it's true or false)",
  },
  {
    type: "Fill-in-the-Blank",
    ideal: "Testing terminology recall and ensuring real understanding.",
    example: "The process by which plants convert sunlight into energy is called ___. (Tests if you actually know it, not just recognize it)",
  },
  {
    type: "Flashcards",
    ideal: "Active recall practice and spaced repetition study sessions.",
    example: "Front: DNA replication | Back: Semi-conservative process where each strand serves as template for a new complementary strand.",
  },
];

const FAQ_ITEMS = [
  { q: "What file types can I upload?", a: "PDF, TXT, and Markdown files. Or just paste text directly into the editor." },
  { q: "How many quizzes can I generate?", a: "Free accounts get 5 quizzes per month. Paid plans go up to unlimited quiz generation." },
  { q: "What makes the questions good?", a: "Questions are mapped to Bloom's Taxonomy — testing recall, understanding, application, and analysis. Not just surface-level memorization." },
  { q: "Can I share quizzes?", a: "Every quiz gets a unique shareable link. You can also export your quizzes to PDF." },
  { q: "Is my content stored?", a: "Content is sent to the AI for generation only. Generated quizzes are saved to your account, but your original content is not stored on our servers." },
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
      {/* What Examina Does */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="py-20 sm:py-28"
      >
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-center text-3xl font-medium tracking-tight text-[#3B2027] sm:text-4xl">
            What <span className="font-serif italic text-[#B0607A]">Examina</span> does
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-[#5D4450]">
            <p>
              Examina is an AI-powered quiz generator that transforms any text into interactive practice questions. Instead of spending hours manually writing quiz questions, flashcards, and study materials, you upload your content and AI creates a complete quiz in under 30 seconds.
            </p>
            <p>
              The platform supports multiple question formats: multiple choice questions with 4-6 answer options and detailed explanations, true/false statements with reasoning, fill-in-the-blank questions that test actual recall, and interactive flashcards with 3D flip animations. Every question is tagged with difficulty levels and mapped to Bloom's Taxonomy cognitive levels—so you know whether you're testing simple recall or higher-order thinking like analysis and application.
            </p>
            <p>
              Examina works in 29 languages, accepts PDF files (on paid plans), plain text, and Markdown, and handles content from 50 to 15,000 characters per generation. Students use it to turn lecture notes into practice tests. Teachers use it to create formative assessments and review materials in minutes instead of hours. The free plan includes 5 quiz generations per month with no credit card required—enough to try it properly before deciding if you need more.
            </p>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="border-y border-[#F3D5DC] bg-[#FDF4F5]/60 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-medium tracking-tight text-[#3B2027] sm:text-4xl">
            How it <span className="font-serif italic text-[#B0607A]">works</span>
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.1 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#B0607A] font-mono text-sm font-medium text-white">
                  {step.num}
                </div>
                <h3 className="mb-2 font-medium text-[#3B2027]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#9A7280]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Use Cases */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-center text-3xl font-medium tracking-tight text-[#3B2027] sm:text-4xl">
            Who uses <span className="font-serif italic text-[#B0607A]">Examina</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed text-[#9A7280]">
            Students, teachers, tutors, and training professionals use Examina to create practice questions that test real understanding.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
              >
                <Link
                  href={useCase.link}
                  className="group block h-full rounded-2xl border border-[#F3D5DC] bg-white/70 p-6 backdrop-blur-xl transition-colors hover:border-[#E9B8C4] hover:bg-white/90"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FDE8EC]">
                    <svg className="h-5 w-5 text-[#B0607A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={useCase.icon} />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-medium text-[#3B2027]">{useCase.title}</h3>
                  <p className="text-sm leading-relaxed text-[#9A7280]">{useCase.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Question Types Detail */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="border-y border-[#F3D5DC] bg-[#FDF4F5]/60 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-center text-3xl font-medium tracking-tight text-[#3B2027] sm:text-4xl">
            Four <span className="font-serif italic text-[#B0607A]">question types</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed text-[#9A7280]">
            Each question format serves a specific learning purpose. Examina generates all four types from the same source material.
          </p>
          <div className="space-y-6">
            {QUESTION_TYPES_DETAIL.map((qt, i) => (
              <motion.div
                key={qt.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
                className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-6 backdrop-blur-xl"
              >
                <h3 className="mb-2 font-medium text-[#3B2027]">{qt.type}</h3>
                <p className="mb-2 text-sm text-[#9A7280]">
                  <span className="font-medium text-[#5D4450]">Ideal for:</span> {qt.ideal}
                </p>
                <p className="text-sm italic text-[#B4939F]">{qt.example}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* What you get */}
      <motion.section
        id="features"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#A87680]" data-halloween-hide="true">What you get</p>
          <h2 className="mb-12 max-w-xl text-3xl font-medium tracking-tight text-[#3B2027] sm:text-4xl" data-halloween-heading="true">
            <span data-halloween-hide="true">Four question types.</span>
            <span className="halloween-section-heading hidden" data-halloween-show="true">H<span className="pumpkin-o"><span className="sr-only">O</span><img src="/seasonal/halloween/pumpkin-flat.svg" alt="" aria-hidden="true" style={{ display: 'inline-block', height: '0.74em', width: '0.74em', verticalAlign: '-0.04em', margin: '0 0.02em' }} /></span>W IT W<span className="pumpkin-o"><span className="sr-only">O</span><img src="/seasonal/halloween/pumpkin-flat.svg" alt="" aria-hidden="true" style={{ display: 'inline-block', height: '0.74em', width: '0.74em', verticalAlign: '-0.04em', margin: '0 0.02em' }} /></span>RKS</span>
            <br data-halloween-hide="true" />
            <span className="font-serif italic text-[#B0607A]" data-halloween-hide="true">One click.</span>
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

      {/* Who it's for */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-[#A87680]">
            Made for the classroom
          </p>
          <h2 className="mb-12 text-center text-3xl font-medium tracking-tight text-[#3B2027] sm:text-4xl">
            Students, teachers, <span className="font-serif italic text-[#B0607A]">and live quizzes.</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <Link
              href="/for-students"
              className="group rounded-2xl border border-[#F3D5DC] bg-white/70 p-7 backdrop-blur-xl transition-colors hover:border-[#E9B8C4] hover:bg-white/90"
            >
              <h3 className="font-serif text-lg italic text-[#3B2027]">For students</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#9A7280]">
                Turn lecture notes into practice quizzes and flashcards, then study with active recall.
              </p>
              <span className="mt-4 inline-block text-sm text-[#B0607A] transition-transform group-hover:translate-x-0.5">
                Study smarter →
              </span>
            </Link>
            <Link
              href="/for-teachers"
              className="group rounded-2xl border border-[#F3D5DC] bg-white/70 p-7 backdrop-blur-xl transition-colors hover:border-[#E9B8C4] hover:bg-white/90"
            >
              <h3 className="font-serif text-lg italic text-[#3B2027]">For teachers</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#9A7280]">
                Create formative assessments, homework quizzes, and review materials in seconds.
              </p>
              <span className="mt-4 inline-block text-sm text-[#B0607A] transition-transform group-hover:translate-x-0.5">
                Save planning time →
              </span>
            </Link>
            <Link
              href="/classroom/join"
              className="group rounded-2xl border border-[#F3D5DC] bg-white/70 p-7 backdrop-blur-xl transition-colors hover:border-[#E9B8C4] hover:bg-white/90"
            >
              <h3 className="font-serif text-lg italic text-[#3B2027]">Live classroom quizzes</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#9A7280]">
                Join a live quiz with a classroom code and answer in real time alongside your class.
              </p>
              <span className="mt-4 inline-block text-sm text-[#B0607A] transition-transform group-hover:translate-x-0.5">
                Join a quiz →
              </span>
            </Link>
          </div>
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
                  <div
                    className={`overflow-hidden transition-all duration-350 ease-out ${
                      open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[#9A7280]">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
}