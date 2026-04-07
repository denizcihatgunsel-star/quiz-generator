"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  { q: "What file types can I upload?", a: "PDF, TXT, and Markdown files. Or just paste text directly." },
  { q: "How many quizzes can I generate?", a: "Free accounts get 5 per month. Paid plans go up to unlimited." },
  { q: "What makes the questions good?", a: "Questions are mapped to Bloom's Taxonomy — testing recall, understanding, application, and analysis. Not just surface-level memorization." },
  { q: "Can I share quizzes?", a: "Every quiz gets a unique link. You can also export to PDF." },
  { q: "Is my content stored?", a: "Content is sent to the AI for generation only. Generated quizzes are saved to your account." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* What you get */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">What you get</p>
              <h2 className="text-3xl sm:text-4xl font-medium text-white leading-tight">
                Four question types,
                <br />
                one click.
              </h2>
            </div>
            <div className="space-y-8">
              {[
                { title: "Multiple Choice", desc: "5-6 questions with explanations, difficulty tags, and Bloom's Taxonomy levels." },
                { title: "Flashcards", desc: "Interactive cards with 3D flip. Great for active recall before exams." },
                { title: "Fill in the Blank", desc: "Tests whether you actually know the material, not just recognize it." },
                { title: "True / False", desc: "Quick comprehension checks with detailed explanations." },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs text-neutral-600 font-mono">0{i + 1}</span>
                    <div>
                      <h3 className="text-white font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {i < 3 && <div className="mt-8 border-b border-white/5" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="features" className="py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-white leading-tight mb-20">
            Paste. Generate. Study.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Add your content", desc: "Paste lesson notes, an article, or upload a PDF. Anything between 50 and 15,000 characters." },
              { step: "02", title: "AI builds the quiz", desc: "Examina reads your content and creates questions across difficulty levels and Bloom's Taxonomy." },
              { step: "03", title: "Study and share", desc: "Take the quiz instantly. Track your score. Share it with a link or download as PDF." },
            ].map((item) => (
              <div key={item.step}>
                <span className="text-xs text-neutral-600 font-mono">{item.step}</span>
                <h3 className="text-white font-medium mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
            {[
              { number: "29", label: "Languages supported" },
              { number: "4", label: "Question types" },
              { number: "<30s", label: "Generation time" },
              { number: "Free", label: "To get started" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl sm:text-5xl font-medium text-white">{stat.number}</p>
                <p className="text-sm text-neutral-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">From our users</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
            {[
              { quote: "This saves me hours every week. I paste my lecture notes and get a full quiz in seconds.", name: "Sarah M.", role: "High School Teacher" },
              { quote: "The fill-in-the-blank questions really test whether I know the material. Way better than just re-reading notes.", name: "Alex K.", role: "University Student" },
              { quote: "Finally a tool that tests understanding, not just memorization. The Bloom's taxonomy mapping is a game changer.", name: "Dr. James L.", role: "Professor" },
              { quote: "I use it to prep for every exam. The flashcards with flip animation make studying actually engaging.", name: "Maria T.", role: "Medical Student" },
            ].map((t, i) => (
              <div key={i} className="bg-[#0c0c0c] p-10">
                <p className="text-neutral-300 leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-neutral-500 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-white leading-tight mb-16">
            Common questions
          </h2>

          <div className="divide-y divide-white/5">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-white text-sm pr-8">{item.q}</span>
                  <span className="text-neutral-600 text-lg shrink-0 transition-transform duration-200" style={{ transform: openFaq === i ? "rotate(45deg)" : "none" }}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? "max-h-32 pb-6" : "max-h-0"}`}>
                  <p className="text-sm text-neutral-400 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-medium text-white leading-tight mb-6">
            Start studying smarter.
          </h2>
          <p className="text-neutral-400 mb-10 max-w-md mx-auto">
            5 free quizzes per month. No credit card required.
          </p>
          <a
            href="/auth/register"
            className="inline-block px-8 py-3 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-colors duration-200"
          >
            Create free account
          </a>
        </div>
      </section>
    </div>
  );
}
