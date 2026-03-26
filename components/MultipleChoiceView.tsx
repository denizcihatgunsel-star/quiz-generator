"use client";

import { useState } from "react";
import { MultipleChoiceQuestion } from "@/types/quiz";

interface MultipleChoiceViewProps {
  questions: MultipleChoiceQuestion[];
}

const OPTION_LABELS = ["A", "B", "C", "D"];

function QuestionItem({ question, index }: { question: MultipleChoiceQuestion; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === question.correctIndex;

  const getOptionStyle = (optionIndex: number) => {
    if (!answered) {
      return "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-violet-300 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950 cursor-pointer";
    }
    if (optionIndex === question.correctIndex) {
      return "border-emerald-400 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 cursor-default";
    }
    if (optionIndex === selected) {
      return "border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200 cursor-default";
    }
    return "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 opacity-60 cursor-default";
  };

  const getLabelStyle = (optionIndex: number) => {
    if (!answered) return "bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400";
    if (optionIndex === question.correctIndex) return "bg-emerald-400 dark:bg-emerald-500 text-white";
    if (optionIndex === selected) return "bg-red-400 dark:bg-red-500 text-white";
    return "bg-zinc-100 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-600";
  };

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 p-5 shadow-sm">
      {/* Question header */}
      <div className="flex gap-3 mb-4">
        <span className="shrink-0 w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed pt-0.5">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2 ml-10">
        {question.options.map((option, optionIndex) => (
          <button
            key={optionIndex}
            onClick={() => !answered && setSelected(optionIndex)}
            disabled={answered}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-all ${getOptionStyle(optionIndex)}`}
            aria-label={`Option ${OPTION_LABELS[optionIndex]}: ${option}`}
          >
            <span
              className={`shrink-0 w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center transition-colors ${getLabelStyle(optionIndex)}`}
            >
              {OPTION_LABELS[optionIndex]}
            </span>
            <span>{option}</span>
            {answered && optionIndex === question.correctIndex && (
              <span className="ml-auto text-emerald-500" aria-label="Correct">✓</span>
            )}
            {answered && optionIndex === selected && selected !== question.correctIndex && (
              <span className="ml-auto text-red-500" aria-label="Incorrect">✗</span>
            )}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {answered && (
        <div
          className={`mt-4 ml-10 p-3 rounded-lg text-sm leading-relaxed ${
            isCorrect
              ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800"
              : "bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
          }`}
        >
          <span className="font-semibold">{isCorrect ? "Correct! " : "Not quite. "}</span>
          {question.explanation}
        </div>
      )}
    </div>
  );
}

export default function MultipleChoiceView({ questions }: MultipleChoiceViewProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? questions : questions.slice(0, 3);

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {questions.length} questions — click an option to check your answer
      </p>
      {visible.map((q, i) => (
        <QuestionItem key={q.id} question={q} index={i} />
      ))}
      {!showAll && questions.length > 3 && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full py-3 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-600 text-sm text-zinc-500 dark:text-zinc-400 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          Show {questions.length - 3} more questions
        </button>
      )}
    </div>
  );
}
