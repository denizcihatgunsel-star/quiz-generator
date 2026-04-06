"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  { q: "What file types are supported?", a: "You can upload PDF, TXT, and MD (Markdown) files. You can also paste text directly into the editor." },
  { q: "How many quizzes can I generate for free?", a: "Free accounts get 5 quizzes per month. Upgrade to Starter for 20, Plus for 60, Pro for 200, or Team for unlimited." },
  { q: "What AI model powers the quiz generation?", a: "Examina uses advanced AI to analyze your content and generate high-quality questions across multiple Bloom's Taxonomy levels." },
  { q: "Can I share quizzes with others?", a: "Yes! Every generated quiz gets a unique shareable link. You can also download quizzes as PDF." },
  { q: "Is my content stored?", a: "Your lesson content is sent to the AI for generation only. Generated quizzes are saved to your account so you can access them later." },
];

const BRAND_LOGOS = [
  "Stanford",
  "Harvard",
  "MIT",
  "Coursera",
  "Khan Academy",
  "Duolingo",
  "Quizlet",
  "Notion",
];

const FEATURES = [
  {
    title: "Multiple Choice",
    desc: "5-8 questions with instant feedback, explanations, and difficulty levels mapped to Bloom's Taxonomy.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Flashcards",
    desc: "8-12 interactive cards with 3D flip animations for active recall and spaced repetition.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "Fill in the Blank",
    desc: "3-5 questions testing recall and application with smart answer validation.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "True / False",
    desc: "3-5 statements testing comprehension with instant feedback and explanations.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: "PDF & File Upload",
    desc: "Upload PDF, TXT, or Markdown files and let Examina extract and analyze the content automatically.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    title: "Track & Share",
    desc: "View quiz history, track scores over time, and share quizzes with unique links or PDF downloads.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    step: "01",
    title: "Paste Your Content",
    desc: "Paste your lesson notes, article, or upload a PDF, TXT, or Markdown file.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "AI Generates Your Quiz",
    desc: "Examina AI reads your content and creates questions across multiple difficulty levels and Bloom's Taxonomy.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Study & Share",
    desc: "Take your quiz instantly with interactive views, track your score, and share with a unique link.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    quote: "This saves me hours of work every week. I just paste my lecture notes and get a full quiz in seconds. The quality is remarkable.",
    name: "Sarah M.",
    role: "High School Teacher",
    stars: 5,
  },
  {
    quote: "I use it before every exam. The fill-in-the-blank questions really help me memorize key terms. Game changer for studying.",
    name: "Alex K.",
    role: "University Student",
    stars: 5,
  },
  {
    quote: "Finally a quiz generator that actually tests understanding, not just memorization. The Bloom's taxonomy levels are a game changer.",
    name: "Dr. James L.",
    role: "Professor",
    stars: 5,
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {/* Brand Logos / Social Proof */}
      <section className="py-16 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm text-zinc-500 mb-8 uppercase tracking-widest font-medium">
            Trusted by students & educators at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {BRAND_LOGOS.map((brand) => (
              <div
                key={brand}
                className="px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm font-semibold tracking-wide"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to create
              <br />
              <span className="gradient-text">the perfect quiz</span>
            </h2>
            <p className="text-zinc-400 text-base max-w-2xl mx-auto">
              Examina generates four distinct question types from any content, complete with difficulty levels, explanations, and instant feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="card-glow p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Three steps to your quiz
            </h2>
            <p className="text-zinc-400 text-base max-w-2xl mx-auto">
              From content to complete quiz in under 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map((item, index) => (
              <div key={item.step} className="relative">
                {index < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
                )}
                <div className="text-center p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 card-glow">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-violet-500/20">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-violet-400 mb-2 tracking-widest">STEP {item.step}</div>
                  <h3 className="font-semibold text-white mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Loved by students & educators
            </h2>
            <p className="text-zinc-400 text-base max-w-2xl mx-auto">
              See what others are saying about Examina.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 card-glow flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-zinc-300 mb-6 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Quote */}
          <div className="text-center py-12 px-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <p className="text-3xl sm:text-4xl font-bold text-white italic mb-4">
              &ldquo;Incredible&rdquo;
            </p>
            <p className="text-zinc-400 text-sm">
              Thousands of quizzes generated every month
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-zinc-400 text-base">
              Everything you need to know about Examina.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-zinc-900/80 overflow-hidden card-glow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium text-white pr-4">{item.q}</span>
                  <svg
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to transform your content?
          </h2>
          <p className="text-zinc-400 text-base mb-8 max-w-lg mx-auto">
            Join thousands of educators and students using Examina to create quizzes instantly.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/auth/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
            >
              Get started free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 font-medium transition-all"
            >
              View pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
