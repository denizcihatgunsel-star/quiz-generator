"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  { q: "What file types are supported?", a: "You can upload PDF, TXT, and MD (Markdown) files. You can also paste text directly." },
  { q: "How many quizzes can I generate for free?", a: "Free accounts get 5 quizzes per month. Upgrade to Starter for 20, Plus for 60, Pro for 200, or Team for unlimited." },
  { q: "What AI model powers the quiz generation?", a: "Examina uses advanced AI to analyze your content and generate high-quality questions across multiple Bloom's Taxonomy levels." },
  { q: "Can I share quizzes with others?", a: "Yes! Every generated quiz gets a unique shareable link. You can also download quizzes as PDF." },
  { q: "Is my content stored?", a: "Your lesson content is sent to the AI for generation only. Generated quizzes are saved to your account so you can access them later." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="mt-20 space-y-24">
      {/* How It Works */}
      <section>
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-2">
          How It Works
        </h2>
        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mb-10">
          Three simple steps to create your quiz
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Paste Your Content",
              desc: "Paste your lesson notes, article, or upload a PDF/TXT file.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
            },
            {
              step: "2",
              title: "Click Generate",
              desc: "Our AI reads your content and creates questions across difficulty levels.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
            },
            {
              step: "3",
              title: "Get Your Quiz",
              desc: "Instantly receive multiple choice, flashcards, fill-in-blank, and true/false questions.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.step} className="text-center p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
              <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <div className="text-xs font-bold text-violet-600 dark:text-violet-400 mb-1">STEP {item.step}</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz Types */}
      <section>
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-2">
          4 Question Types
        </h2>
        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mb-10">
          Every quiz includes a mix of question formats
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* MCQ Preview */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🧠</span>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Multiple Choice</h3>
            </div>
            <div className="space-y-1.5 text-xs">
              <p className="text-zinc-600 dark:text-zinc-400 font-medium">What powers the water cycle?</p>
              <div className="pl-3 py-1 rounded bg-zinc-50 dark:bg-zinc-700/50 text-zinc-500 dark:text-zinc-400">A. Wind energy</div>
              <div className="pl-3 py-1 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">B. Solar energy ✓</div>
              <div className="pl-3 py-1 rounded bg-zinc-50 dark:bg-zinc-700/50 text-zinc-500 dark:text-zinc-400">C. Tidal forces</div>
              <div className="pl-3 py-1 rounded bg-zinc-50 dark:bg-zinc-700/50 text-zinc-500 dark:text-zinc-400">D. Geothermal</div>
            </div>
          </div>

          {/* Flashcard Preview */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🃏</span>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Flashcards</h3>
            </div>
            <div className="bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl p-4 text-white text-center">
              <p className="text-[10px] uppercase tracking-wider opacity-70 mb-1">Front</p>
              <p className="text-sm font-medium">What is condensation?</p>
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-[10px] uppercase tracking-wider opacity-70 mb-1">Back</p>
                <p className="text-xs opacity-90">Water vapor cooling and forming clouds</p>
              </div>
            </div>
          </div>

          {/* Fill in Blank Preview */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">✍️</span>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Fill in the Blank</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
              About 90% of atmospheric moisture comes from <span className="inline-block w-20 border-b-2 border-violet-400 text-violet-600 dark:text-violet-400 text-center font-medium">evaporation</span>.
            </p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
              Correct!
            </div>
          </div>

          {/* True/False Preview */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⚖️</span>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">True / False</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
              &ldquo;Transpiration is the process by which plants release water vapor through their leaves.&rdquo;
            </p>
            <div className="flex gap-2">
              <div className="flex-1 text-center py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-300 dark:border-emerald-700">
                True ✓
              </div>
              <div className="flex-1 text-center py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-700/50 text-zinc-400 text-xs">
                False
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-2">
          Loved by Students & Teachers
        </h2>
        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mb-10">
          See what others are saying about QuizGen
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { quote: "This saves me hours of work every week. I just paste my lecture notes and get a full quiz in seconds.", name: "Sarah M.", role: "High School Teacher", stars: 5 },
            { quote: "I use it before every exam. The fill-in-the-blank questions really help me memorize key terms.", name: "Alex K.", role: "University Student", stars: 5 },
            { quote: "Finally a quiz generator that actually tests understanding, not just memorization. The Bloom's taxonomy levels are a game changer.", name: "Dr. James L.", role: "Professor", stars: 5 },
          ].map((t) => (
            <div key={t.name} className="p-5 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mb-10">
          Everything you need to know
        </p>
        <div className="max-w-2xl mx-auto space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.q}</span>
                <svg
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
