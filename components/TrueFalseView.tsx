"use client";

import { useState, useEffect } from "react";
import { TrueFalseQuestion } from "@/types/quiz";

interface Props {
  questions: TrueFalseQuestion[];
  onComplete?: (correct: number, total: number) => void;
}

export default function TrueFalseView({ questions, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);

  const answeredCount = Object.keys(revealed).length;
  const allAnswered = answeredCount === questions.length;

  useEffect(() => {
    if (allAnswered && !completed) {
      setCompleted(true);
      const correct = questions.filter(
        (q) => answers[q.id] === q.correct
      ).length;
      onComplete?.(correct, questions.length);
    }
  }, [allAnswered, completed, questions, answers, onComplete]);

  const pick = (qId: string, value: boolean) => {
    if (revealed[qId]) return;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    setRevealed((prev) => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-500"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">
          {answeredCount}/{questions.length}
        </span>
      </div>

      {questions.map((q, qi) => {
        const chosen = answers[q.id];
        const isRevealed = revealed[q.id];
        const isCorrect = chosen === q.correct;

        return (
          <div
            key={q.id}
            className={`rounded-2xl border p-5 transition-all ${
              isRevealed
                ? isCorrect
                  ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30"
                  : "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/30"
                : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50"
            }`}
          >
            {/* Difficulty + Bloom's tags */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
                {q.difficulty}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400">
                {q.bloomLevel}
              </span>
            </div>

            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">
              <span className="text-violet-500 dark:text-violet-400 mr-1.5">{qi + 1}.</span>
              {q.statement}
            </p>

            <div className="flex gap-3">
              {[true, false].map((value) => {
                const isChosen = chosen === value;
                const isAnswer = q.correct === value;
                const label = value ? "True" : "False";

                let style =
                  "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/30 cursor-pointer";

                if (isRevealed) {
                  if (isAnswer) {
                    style =
                      "border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-300 dark:ring-emerald-700";
                  } else if (isChosen && !isAnswer) {
                    style =
                      "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300";
                  } else {
                    style =
                      "border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-default";
                  }
                }

                return (
                  <button
                    key={label}
                    onClick={() => pick(q.id, value)}
                    disabled={isRevealed}
                    className={`flex-1 text-center px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${style}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {isRevealed && (
              <div className="mt-3 flex items-start gap-2 text-xs leading-relaxed">
                <span className={isCorrect ? "text-emerald-500" : "text-red-500"}>
                  {isCorrect ? "\u2713" : "\u2717"}
                </span>
                <p className="text-zinc-600 dark:text-zinc-400">{q.explanation}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Final score */}
      {allAnswered && (
        <div className="mt-6 p-5 rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 text-center">
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {questions.filter((q) => answers[q.id] === q.correct).length} / {questions.length} correct
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {Math.round(
              (questions.filter((q) => answers[q.id] === q.correct).length /
                questions.length) *
                100
            )}% accuracy
          </p>
        </div>
      )}
    </div>
  );
}
