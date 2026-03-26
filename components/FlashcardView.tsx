"use client";

import { useState } from "react";
import { Flashcard } from "@/types/quiz";

interface FlashcardViewProps {
  flashcards: Flashcard[];
}

function FlashcardItem({ card }: { card: Flashcard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flashcard-scene cursor-pointer h-40 select-none"
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={`Flashcard: ${card.front}. Click to reveal answer.`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div className={`flashcard-card ${flipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="flashcard-face flashcard-front flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-center">
            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
              Term
            </p>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
              {card.front}
            </p>
          </div>
        </div>

        {/* Back */}
        <div className="flashcard-face flashcard-back flex items-center justify-center rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950 p-5 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-medium text-violet-400 dark:text-violet-400 uppercase tracking-widest mb-3">
              Definition
            </p>
            <p className="text-sm text-violet-900 dark:text-violet-100 leading-relaxed">
              {card.back}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlashcardView({ flashcards }: FlashcardViewProps) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<"single" | "grid">("single");

  const goTo = (index: number) => {
    setFlipped(false);
    setTimeout(() => setCurrent(index), 50);
  };

  if (viewMode === "grid") {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {flashcards.length} cards — click any card to flip
          </p>
          <button
            onClick={() => setViewMode("single")}
            className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
          >
            Single view
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {flashcards.map((card) => (
            <FlashcardItem key={card.id} card={card} />
          ))}
        </div>
      </div>
    );
  }

  const card = flashcards[current];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {current + 1} / {flashcards.length}
        </p>
        <button
          onClick={() => setViewMode("grid")}
          className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
        >
          Grid view
        </button>
      </div>

      {/* Single card */}
      <div
        className="flashcard-scene cursor-pointer h-52 select-none mb-4"
        onClick={() => setFlipped((f) => !f)}
        role="button"
        aria-label={`Flashcard: ${card.front}. Click to flip.`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
      >
        <div className={`flashcard-card ${flipped ? "flipped" : ""}`}>
          {/* Front */}
          <div className="flashcard-face flashcard-front flex flex-col items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-8 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
              Term
            </p>
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 text-center leading-relaxed">
              {card.front}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-5">
              Click to reveal →
            </p>
          </div>

          {/* Back */}
          <div className="flashcard-face flashcard-back flex flex-col items-center justify-center rounded-2xl border border-violet-200 dark:border-violet-800 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 p-8 shadow-sm">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">
              Definition
            </p>
            <p className="text-base text-violet-900 dark:text-violet-100 text-center leading-relaxed">
              {card.back}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => goTo(Math.max(0, current - 1))}
          disabled={current === 0}
          className="flex-1 py-2 px-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous card"
        >
          ← Previous
        </button>
        <button
          onClick={() => setFlipped((f) => !f)}
          className="py-2 px-4 rounded-lg text-sm font-medium bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors"
        >
          Flip
        </button>
        <button
          onClick={() => goTo(Math.min(flashcards.length - 1, current + 1))}
          disabled={current === flashcards.length - 1}
          className="flex-1 py-2 px-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next card"
        >
          Next →
        </button>
      </div>

      {/* Dot progress */}
      <div className="flex justify-center gap-1.5 mt-4">
        {flashcards.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current
                ? "bg-violet-500 w-4"
                : "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400"
            }`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
