"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

const FAQ_ITEMS = [
  { q: "What file types can I upload?", a: "PDF, TXT, and Markdown files. Or just paste text directly." },
  { q: "How many quizzes can I generate?", a: "Free accounts get 5 per month. Paid plans go up to unlimited." },
  { q: "What makes the questions good?", a: "Questions are mapped to Bloom's Taxonomy — testing recall, understanding, application, and analysis. Not just surface-level memorization." },
  { q: "Can I share quizzes?", a: "Every quiz gets a unique link. You can also export to PDF." },
  { q: "Is my content stored?", a: "Content is sent to the AI for generation only. Generated quizzes are saved to your account." },
];

export default function LandingPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* What you get */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">{t("landing.whatYouGet")}</p>
              <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight">
                {t("landing.fourTypes")}
                <br />
                {t("landing.oneClick")}
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
                    <span className="text-xs text-neutral-300 font-mono">0{i + 1}</span>
                    <div>
                      <h3 className="text-neutral-900 font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {i < 3 && <div className="mt-8 border-b border-black/5" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">{t("landing.howItWorks")}</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-20">
            {t("landing.pasteGenerateStudy")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Add your content", desc: "Paste lesson notes, an article, or upload a PDF. Anything between 50 and 15,000 characters." },
              { step: "02", title: "AI builds the quiz", desc: "Examina reads your content and creates questions across difficulty levels and Bloom's Taxonomy." },
              { step: "03", title: "Study and share", desc: "Take the quiz instantly. Track your score. Share it with a link or download as PDF." },
            ].map((item) => (
              <div key={item.step}>
                <span className="text-xs text-neutral-300 font-mono">{item.step}</span>
                <h3 className="text-neutral-900 font-medium mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
            {[
              { number: "29", label: "Languages supported" },
              { number: "4", label: "Question types" },
              { number: "<30s", label: "Generation time" },
              { number: "Free", label: "To get started" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl sm:text-5xl font-medium text-neutral-900">{stat.number}</p>
                <p className="text-sm text-neutral-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why active recall works */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">The science behind it</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-8">
            Why testing yourself beats re-reading
          </h2>
          <div className="space-y-6 text-neutral-600 leading-relaxed">
            <p>
              Most people study by re-reading their notes, highlighting passages, or staring at textbook pages.
              It feels productive, but decades of cognitive science research tell a different story. Passive review
              is one of the least effective ways to learn.
            </p>
            <p>
              Active recall — the process of testing yourself on material — is consistently shown to produce
              stronger, longer-lasting memory. When you force your brain to retrieve information rather than
              simply recognize it, you build stronger neural pathways. The harder the retrieval, the stronger
              the learning.
            </p>
            <p>
              Examina is built around this principle. Instead of giving you another way to read your notes,
              it turns them into questions. Multiple choice tests recognition and reasoning. Fill-in-the-blank
              tests pure recall. Flashcards enable rapid-fire retrieval practice. True/false checks
              comprehension of nuanced details. Together, these four formats create a complete active recall
              system from any source material.
            </p>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">Built for everyone who learns or teaches</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-16">
            Students, teachers, and professionals.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <h3 className="text-neutral-900 font-medium mb-3">Students</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Paste your lecture notes after class and generate a practice quiz in seconds. Use flashcards
                to drill key terms before exams. Switch to fill-in-the-blank when you need to verify you
                can recall information from memory, not just recognize it from a list. Whether you are
                preparing for midterms, finals, board exams, or professional certifications, Examina helps
                you study with purpose instead of hope.
              </p>
            </div>
            <div>
              <h3 className="text-neutral-900 font-medium mb-3">Teachers</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Creating quizzes from scratch is one of the most time-consuming parts of teaching. Paste a
                chapter summary, a set of learning objectives, or your own lesson notes and Examina generates
                a balanced assessment in seconds. Questions are tagged with Bloom&apos;s Taxonomy levels and
                difficulty ratings, so you can verify your quiz covers the right cognitive depth. Use it for
                formative checks, homework, review sessions, or full practice exams.
              </p>
            </div>
            <div>
              <h3 className="text-neutral-900 font-medium mb-3">Professionals</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Corporate trainers, medical professionals, and certification candidates all need efficient
                knowledge assessment. Upload your training manual or study guide, generate a quiz, and use
                it to verify retention across your team or test yourself before a high-stakes exam.
                Examina works with compliance training, onboarding materials, continuing education content,
                and any professional development material.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What makes Examina different */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">What makes Examina different</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-8">
            More than a quiz generator.
          </h2>
          <div className="space-y-6 text-neutral-600 leading-relaxed">
            <p>
              Most AI quiz tools generate shallow multiple choice questions with obvious wrong answers.
              Examina takes a fundamentally different approach. Every question is mapped to Bloom&apos;s
              Taxonomy — the same framework educators worldwide use to design exams. You get questions
              that test remembering, understanding, applying, and analyzing, not just surface-level
              recognition.
            </p>
            <p>
              Wrong answers are designed to be plausible. Explanations accompany every question so you
              learn from both correct and incorrect responses. And because Examina generates four distinct
              question types from a single piece of content, you get a complete study experience instead of
              just another list of multiple choice questions.
            </p>
            <p>
              Your content stays private. Text is sent to the AI for question generation only and is not
              stored on our servers. Generated quizzes are saved to your account so you can revisit them
              anytime, share them via a unique link, or export them as PDF. Everything works in 29 languages
              with no configuration — just paste content in any supported language and Examina handles the rest.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">{t("landing.fromUsers")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-100">
            {[
              { quote: "This saves me hours every week. I paste my lecture notes and get a full quiz in seconds.", name: "Sarah M.", role: "High School Teacher" },
              { quote: "The fill-in-the-blank questions really test whether I know the material. Way better than just re-reading notes.", name: "Alex K.", role: "University Student" },
              { quote: "Finally a tool that tests understanding, not just memorization. The Bloom's taxonomy mapping is a game changer.", name: "Dr. James L.", role: "Professor" },
              { quote: "I use it to prep for every exam. The flashcards with flip animation make studying actually engaging.", name: "Maria T.", role: "Medical Student" },
            ].map((t, i) => (
              <div key={i} className="bg-[#f5f5f0] p-10">
                <p className="text-neutral-600 leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-neutral-900 text-sm font-medium">{t.name}</p>
                  <p className="text-neutral-400 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 border-t border-black/5">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">{t("landing.faq")}</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-16">
            {t("landing.commonQuestions")}
          </h2>

          <div className="divide-y divide-black/5">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-neutral-900 text-sm pr-8">{item.q}</span>
                  <span className="text-neutral-300 text-lg shrink-0 transition-transform duration-200" style={{ transform: openFaq === i ? "rotate(45deg)" : "none" }}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? "max-h-32 pb-6" : "max-h-0"}`}>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 bg-neutral-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-medium text-white leading-tight mb-6">
            {t("landing.ctaTitle")}
          </h2>
          <p className="text-neutral-400 mb-10 max-w-md mx-auto">
            {t("landing.ctaSubtitle")}
          </p>
          <a
            href="/auth/register"
            className="inline-block px-8 py-3 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-colors duration-200"
          >
            {t("landing.ctaButton")}
          </a>
        </div>
      </section>
    </div>
  );
}
