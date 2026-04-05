"use client";

import { useState, useEffect } from "react";
import { FillInTheBlankQuestion } from "@/types/quiz";

interface Props {
  questions: FillInTheBlankQuestion[];
  onComplete?: (correct: number, total: number) => void;
}

export default function FillInTheBlankView({ questions, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);

  const submittedCount = Object.keys(submitted).length;
  const allSubmitted = submittedCount === questions.length;

  useEffect(() => {
    if (allSubmitted && !completed) {
      setCompleted(true);
      const correct = questions.filter((q) => {
        const userAnswer = (answers[q.id] ?? "").trim().toLowerCase();
        return userAnswer === q.answer.trim().toLowerCase();
      }).length;
      onComplete?.(correct, questions.length);
    }
  }, [allSubmitted, completed, questions, answers, onComplete]);

  const handleInputChange = (qId: string, value: string) => {
    if (submitted[qId]) return;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = (qId: string) => {
    if (submitted[qId] || !(answers[qId] ?? "").trim()) return;
    setSubmitted((prev) => ({ ...prev, [qId]: true }));
  };

  const isCorrect = (q: FillInTheBlankQuestion) => {
    const userAnswer = (answers[q.id] ?? "").trim().toLowerCase();
    return userAnswer === q.answer.trim().toLowerCase();
  };

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-500"
            style={{ width: `${(submittedCount / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">
          {submittedCount}/{questions.length}
        </span>
      </div>

      {questions.map((q, qi) => {
        const isSubmitted = submitted[q.id];
        const correct = isSubmitted && isCorrect(q);

        // Split sentence around "___"
        const parts = q.sentence.split("___");

        return (
          <div
            key={q.id}
            className={`rounded-2xl border p-5 transition-all ${
              isSubmitted
                ? correct
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

            <div className="text-sm text-zinc-900 dark:text-zinc-100 mb-3">
              <span className="text-violet-500 dark:text-violet-400 mr-1.5 font-medium">{qi + 1}.</span>
              {parts[0]}
              {isSubmitted ? (
                <span className={`font-bold ${correct ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                  {correct ? answers[q.id] : `${answers[q.id]} → ${q.answer}`}
                </span>
              ) : (
                <input
                  type="text"
                  value={answers[q.id] ?? ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(q.id)}
                  placeholder="type answer"
                  className="inline-block w-40 mx-1 px-2 py-0.5 text-sm border-b-2 border-violet-300 dark:border-violet-600 bg-transparent focus:outline-none focus:border-violet-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600"
                />
              )}
              {parts[1] ?? ""}
            </div>

            {!isSubmitted && (
              <button
                onClick={() => handleSubmit(q.id)}
                disabled={!(answers[q.id] ?? "").trim()}
                className="text-xs px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white disabled:text-zinc-500 font-medium transition-colors"
              >
                Check
              </button>
            )}

            {isSubmitted && (
              <div className="mt-3 flex items-start gap-2 text-xs leading-relaxed">
                <span className={correct ? "text-emerald-500" : "text-red-500"}>
                  {correct ? "\u2713" : "\u2717"}
                </span>
                <p className="text-zinc-600 dark:text-zinc-400">{q.explanation}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Final score */}
      {allSubmitted && (
        <div className="mt-6 p-5 rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 text-center">
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {questions.filter((q) => isCorrect(q)).length} / {questions.length} correct
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {Math.round(
              (questions.filter((q) => isCorrect(q)).length / questions.length) * 100
            )}% accuracy
          </p>
        </div>
      )}
    </div>
  );
}
