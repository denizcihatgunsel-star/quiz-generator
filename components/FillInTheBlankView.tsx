"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FillInTheBlankQuestion } from "@/types/quiz";

const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;

interface Props {
  questions: FillInTheBlankQuestion[];
  onComplete?: (correct: number, total: number) => void;
}

export default function FillInTheBlankView({ questions, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const completedRef = useRef(false);

  const submittedCount = Object.keys(submitted).length;
  const allSubmitted = submittedCount === questions.length;

  useEffect(() => {
    if (allSubmitted && !completedRef.current) {
      completedRef.current = true;
      const correct = questions.filter((q) => {
        const userAnswer = (answers[q.id] ?? "").trim().toLowerCase();
        return userAnswer === q.answer.trim().toLowerCase();
      }).length;
      onComplete?.(correct, questions.length);
    }
  }, [allSubmitted, questions, answers, onComplete]);

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
          <motion.div
            className="h-full rounded-full bg-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${(submittedCount / questions.length) * 100}%` }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          />
        </div>
        <motion.span
          key={submittedCount}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0"
        >
          {submittedCount}/{questions.length}
        </motion.span>
      </div>

      {questions.map((q, qi) => {
        const isSubmitted = submitted[q.id];
        const correct = isSubmitted && isCorrect(q);

        // Split sentence around "___"
        const parts = q.sentence.split("___");

        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: Math.min(qi * 0.07, 0.5) }}
            className={`rounded-2xl border p-5 transition-colors duration-300 ${
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
                <motion.span
                  key={`${q.id}-${correct ? "ok" : "bad"}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={correct
                    ? { scale: [0.9, 1.08, 1], opacity: 1 }
                    : { x: [0, -8, 8, -5, 5, 0], opacity: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={`inline-block font-bold ${
                    correct ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {correct ? answers[q.id] : `${answers[q.id]} → ${q.answer}`}
                </motion.span>
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
              <motion.button
                onClick={() => handleSubmit(q.id)}
                disabled={!(answers[q.id] ?? "").trim()}
                whileHover={(answers[q.id] ?? "").trim() ? { scale: 1.03 } : undefined}
                whileTap={(answers[q.id] ?? "").trim() ? { scale: 0.96 } : undefined}
                className="text-xs px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white disabled:text-zinc-500 font-medium transition-colors"
              >
                Check
              </motion.button>
            )}

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.1 }}
                className="mt-3 flex items-start gap-2 text-xs leading-relaxed"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className={correct ? "text-emerald-500" : "text-red-500"}
                >
                  {correct ? "\u2713" : "\u2717"}
                </motion.span>
                <p className="text-zinc-600 dark:text-zinc-400">{q.explanation}</p>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Final score */}
      {allSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mt-6 p-5 rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 text-center"
        >
          <motion.p
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.15 }}
            className="text-lg font-bold text-zinc-900 dark:text-zinc-100"
          >
            {questions.filter((q) => isCorrect(q)).length} / {questions.length} correct
          </motion.p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {Math.round(
              (questions.filter((q) => isCorrect(q)).length / questions.length) * 100
            )}% accuracy
          </p>
        </motion.div>
      )}
    </div>
  );
}
