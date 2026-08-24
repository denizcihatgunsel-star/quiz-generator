"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MultipleChoiceQuestion } from "@/types/quiz";

const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;
const TIME_PER_QUESTION = 45;
const PASS_PERCENT = 70;

interface Props {
  questions: MultipleChoiceQuestion[];
  onComplete?: (correct: number, total: number) => void;
  onExit?: () => void;
}

export default function ExamView({ questions, onComplete, onExit }: Props) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(questions.length * TIME_PER_QUESTION);
  const [submitted, setSubmitted] = useState(false);
  const submittedRef = useRef(false);

  const answeredCount = Object.keys(answers).length;
  const unanswered = questions.length - answeredCount;

  const submit = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const correct = questions.filter((q) => answers[q.id] === q.correctIndex).length;
    setSubmitted(true);
    onComplete?.(correct, questions.length);
  };

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          submit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const mm = Math.floor(timeLeft / 60);
  const ss = String(timeLeft % 60).padStart(2, "0");
  const lowTime = timeLeft <= 60;

  if (submitted) {
    const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length;
    const percent = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`rounded-2xl border p-6 text-center ${
            percent >= PASS_PERCENT
              ? "border-emerald-200 bg-emerald-50/60"
              : "border-amber-200 bg-amber-50/50"
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Exam results
          </p>
          <p className="mt-2 font-serif text-5xl text-zinc-900">
            {correctCount}/{questions.length}
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-600">
            {percent}% — {percent >= PASS_PERCENT ? "Passed" : "Keep practicing"}
          </p>
        </motion.div>

        {onExit && (
          <button
            onClick={onExit}
            className="w-full rounded-xl border border-dashed border-violet-200 py-2.5 text-sm font-medium text-violet-600 transition-colors hover:bg-violet-50"
          >
            Back to practice mode
          </button>
        )}

        {questions.map((q, qi) => {
          const chosen = answers[q.id];
          const isCorrect = chosen === q.correctIndex;
          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: Math.min(qi * 0.05, 0.4) }}
              className={`rounded-2xl border p-5 ${
                isCorrect
                  ? "border-emerald-200 bg-emerald-50/40"
                  : "border-red-200 bg-red-50/40"
              }`}
            >
              <p className="mb-3 text-sm font-medium text-zinc-900">
                <span className="mr-1.5 text-violet-500">{qi + 1}.</span>
                {q.question}
                {!isCorrect && (
                  <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-red-500">
                    {chosen === undefined ? "Unanswered" : "Wrong"}
                  </span>
                )}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt, oi) => {
                  const isAnswer = q.correctIndex === oi;
                  const isChosen = chosen === oi;
                  let style =
                    "border-zinc-100 text-zinc-400 cursor-default";
                  if (isAnswer)
                    style =
                      "border-emerald-300 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-300";
                  else if (isChosen)
                    style = "border-red-300 bg-red-50 text-red-700 line-through";
                  return (
                    <div
                      key={oi}
                      className={`w-full rounded-xl border px-4 py-2 text-left text-sm ${style}`}
                    >
                      <span className="mr-2 font-semibold opacity-50">
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      {opt}
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">{q.explanation}</p>
            </motion.div>
          );
        })}
      </div>
    );
  }

  const q = questions[idx];

  return (
    <div className="space-y-4">
      {/* Exam bar */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
          Exam mode
        </span>
        <span
          className={`font-mono text-lg font-bold tabular-nums ${
            lowTime ? "animate-pulse text-red-500" : "text-zinc-800"
          }`}
        >
          {mm}:{ss}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {questions.map((qq, i) => (
          <button
            key={qq.id}
            onClick={() => setIdx(i)}
            aria-label={`Go to question ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === idx
                ? "scale-125 bg-violet-600"
                : answers[qq.id] !== undefined
                  ? "bg-violet-300"
                  : "bg-zinc-200 hover:bg-zinc-300"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <p className="mb-3 text-sm font-medium text-zinc-900">
          <span className="mr-1.5 text-violet-500">{idx + 1}.</span>
          {q.question}
        </p>
        <div className="grid grid-cols-1 gap-2">
          {q.options.map((opt, oi) => {
            const isChosen = answers[q.id] === oi;
            return (
              <button
                key={oi}
                onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-all ${
                  isChosen
                    ? "border-[#3B2027] bg-[#3B2027] text-[#F6E3E8]"
                    : "border-zinc-200 text-zinc-700 hover:border-violet-300 hover:bg-violet-50/50"
                }`}
              >
                <span className="mr-2 font-semibold opacity-60">
                  {String.fromCharCode(65 + oi)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="rounded-xl border border-zinc-200 px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-40"
          >
            Previous
          </button>
          {idx < questions.length - 1 ? (
            <button
              onClick={() => setIdx((i) => Math.min(questions.length - 1, i + 1))}
              className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
            >
              Next
            </button>
          ) : (
            <span className="text-xs text-zinc-400">Last question</span>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={submit}
        className="w-full rounded-xl bg-[#3B2027] py-3.5 text-sm font-semibold text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.99]"
      >
        Submit exam
        {unanswered > 0 && (
          <span className="ml-2 font-normal opacity-70">({unanswered} unanswered)</span>
        )}
      </button>
      <p className="-mt-2 text-center text-xs text-zinc-400">
        No feedback until you submit — just like the real thing.
      </p>

      {onExit && (
        <button
          onClick={onExit}
          className="w-full text-center text-xs text-zinc-400 transition-colors hover:text-zinc-600"
        >
          Abandon exam
        </button>
      )}
    </div>
  );
}