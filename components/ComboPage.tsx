/**
 * Combo page template for subject × tool pages (e.g., /subjects/biology/flashcards).
 * Delivers practice content, not just a tool pitch.
 */
"use client";

import { useState } from "react";
import type { ComboData } from "@/lib/seo/combos/types";
import { FREE_PLAN_LIMIT, STARTER_PLAN_PRICE } from "@/lib/subscription";

interface ComboPageProps {
  data: ComboData;
  hubName: string;
  hubPath: string;
  allCombos: ComboData[];
}

export default function ComboPage({ data, hubName, hubPath, allCombos }: ComboPageProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());

  const isFlashcardType = data.type === "flashcards";
  const isPracticeType = data.type === "practice-questions" || data.type === "quiz";

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const flipCard = () => setIsFlipped(!isFlipped);

  const nextCard = () => {
    if (currentCard < data.sampleItems.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
        <div className="mb-4 text-sm text-neutral-500">
          <a href="/" className="hover:text-neutral-900 transition-colors">
            Home
          </a>
          {" › "}
          <a href={hubPath.split("/").slice(0, -1).join("/") || "/subjects"} className="hover:text-neutral-900 transition-colors">
            {hubPath.includes("/exams/") ? "Exams" : "Subjects"}
          </a>
          {" › "}
          <a href={hubPath} className="hover:text-neutral-900 transition-colors">
            {hubName}
          </a>
          {" › "}
          <span className="text-neutral-900">{data.type === "practice-questions" ? "Practice Questions" : data.type === "flashcards" ? "Flashcards" : data.type === "quiz" ? "Quiz" : data.type === "worksheet-generator" ? "Worksheet Generator" : "Quiz Generator"}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight text-neutral-900 mb-6">
          {data.h1}
        </h1>

        <p className="text-lg text-neutral-600 leading-relaxed mb-16">{data.intro}</p>

        {/* Sample Practice Section */}
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-medium text-neutral-900 mb-2">
            {isFlashcardType ? "Sample Flashcards" : "Sample Questions"}
          </h2>
          <p className="text-sm text-neutral-500 mb-8">
            {isFlashcardType
              ? `${data.sampleItems.length} sample flashcards. Click to flip and reveal definitions.`
              : `${data.sampleItems.length} sample questions. Expand to see answers and explanations.`}
          </p>

          {isFlashcardType ? (
            <div>
              <div
                className="relative h-80 cursor-pointer"
                onClick={flipCard}
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`absolute w-full h-full transition-transform duration-500`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-violet-50 to-indigo-50 border-2 border-violet-200 rounded-2xl flex items-center justify-center p-8"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-wide text-neutral-400 mb-4">
                        Term
                      </p>
                      <p className="text-3xl font-medium text-neutral-900">
                        {data.sampleItems[currentCard]?.q}
                      </p>
                      {data.sampleItems[currentCard]?.bloomLevel && (
                        <p className="mt-6 text-xs text-neutral-500">
                          Bloom's: {data.sampleItems[currentCard].bloomLevel}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className="absolute w-full h-full bg-white border-2 border-neutral-300 rounded-2xl p-8 overflow-y-auto"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wide text-neutral-400 mb-4">
                        Definition
                      </p>
                      <p className="text-neutral-900 leading-relaxed whitespace-pre-line">
                        {data.sampleItems[currentCard]?.a}
                      </p>
                      {data.sampleItems[currentCard]?.explanation && (
                        <div className="mt-6 pt-6 border-t border-neutral-200">
                          <p className="text-xs uppercase tracking-wide text-neutral-400 mb-2">
                            Explanation
                          </p>
                          <p className="text-sm text-neutral-600 leading-relaxed">
                            {data.sampleItems[currentCard].explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SSR content for all flashcards */}
              <div className="sr-only" aria-hidden="true">
                {data.sampleItems.map((item, idx) => (
                  <div key={`fc-ssr-${idx}`}>
                    <p><strong>Flashcard {idx + 1} - Term:</strong> {item.q}</p>
                    <p><strong>Definition:</strong> {item.a}</p>
                    <p><strong>Explanation:</strong> {item.explanation}</p>
                    {item.bloomLevel && <p><strong>Bloom Level:</strong> {item.bloomLevel}</p>}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevCard();
                  }}
                  disabled={currentCard === 0}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous
                </button>
                <p className="text-sm text-neutral-500">
                  {currentCard + 1} / {data.sampleItems.length}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextCard();
                  }}
                  disabled={currentCard === data.sampleItems.length - 1}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {data.sampleItems.map((item, i) => (
                <details key={i} className="border-l-4 border-violet-500 pl-6 group">
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="text-neutral-900 font-medium flex-1">
                        {i + 1}. {item.q}
                      </p>
                      {item.bloomLevel && (
                        <span className="text-xs px-2 py-1 bg-violet-100 text-violet-700 rounded flex-shrink-0">
                          {item.bloomLevel}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-violet-600 hover:text-violet-700 font-medium group-open:hidden">
                      Show Answer →
                    </p>
                  </summary>
                  <div className="mt-4 bg-neutral-50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Answer</p>
                      <p className="text-sm font-medium text-emerald-700">{item.a}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Explanation</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">{item.explanation}</p>
                    </div>
                    {item.type && (
                      <p className="text-xs text-neutral-500">Type: {item.type.replace(/-/g, ' ')}</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Topics Covered */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium text-neutral-900 mb-6">Topics Covered</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data.topicsCovered.map((topic) => (
              <a
                key={topic}
                href="/create"
                className="block px-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 hover:border-violet-500 hover:text-violet-600 transition-colors"
              >
                {topic}
              </a>
            ))}
          </div>
        </div>

        {/* How to Study */}
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-medium text-neutral-900 mb-6">
            How to Study {hubName}
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-neutral-400 mb-3">
                Workflow
              </p>
              <ol className="space-y-3">
                {data.studyTips.workflow.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-600 text-xs font-medium flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-neutral-600 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-neutral-400 mb-3">Tips</p>
              <ul className="space-y-2">
                {data.studyTips.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-neutral-600 leading-relaxed">
                    <span className="text-violet-500 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 sm:p-12 text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4">
            Create Your Own {isFlashcardType ? "Flashcards" : "Quiz"}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Upload your notes, textbook pages, or study material and generate custom{" "}
            {isFlashcardType ? "flashcards" : "practice questions"} in seconds. Free plan
            includes {FREE_PLAN_LIMIT} generations per month. PDF upload available on Starter plan (${STARTER_PLAN_PRICE}/mo).
          </p>
          <a
            href="/create"
            className="inline-block bg-white text-violet-600 px-8 py-4 rounded-xl font-medium hover:bg-neutral-50 transition-colors"
          >
            Generate Now — Free
          </a>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium text-neutral-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {data.faq.map((item, i) => (
              <div key={i} className="bg-white border border-neutral-200 rounded-xl p-6">
                <h3 className="font-medium text-neutral-900 mb-2">{item.q}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Pages */}
        <div>
          <h2 className="text-2xl font-medium text-neutral-900 mb-6">Related Practice</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {allCombos
              .filter((c) => c.slug !== data.slug)
              .map((combo) => (
                <a
                  key={combo.slug}
                  href={`${hubPath}/${combo.slug}`}
                  className="block p-4 bg-white border border-neutral-200 rounded-xl hover:border-violet-500 transition-colors"
                >
                  <p className="font-medium text-neutral-900">{combo.h1}</p>
                </a>
              ))}
            {data.relatedPages.map((path) => {
              const labels: Record<string, string> = {
                "/ai-flashcards": "AI Flashcards Generator",
                "/practice-test-generator": "Practice Test Generator",
                "/ai-quiz-generator": "AI Quiz Generator",
                "/multiple-choice-quiz-maker": "Multiple Choice Quiz Maker",
                "/for-students": "For Students",
                "/features/worksheet-generator": "Worksheet Generator",
              };
              const label =
                labels[path] ||
                path
                  .split("/")
                  .pop()
                  ?.replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase()) ||
                path;
              return (
                <a
                  key={path}
                  href={path}
                  className="block p-4 bg-white border border-neutral-200 rounded-xl hover:border-violet-500 transition-colors"
                >
                  <p className="font-medium text-neutral-900">{label}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
