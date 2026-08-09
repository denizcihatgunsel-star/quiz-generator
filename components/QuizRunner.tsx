"use client";

import { useState } from "react";
import type { MultipleChoiceQuestion } from "@/types/quiz";
import type { QuizTheme } from "@/lib/themes";

interface QuizRunnerProps {
  questions: MultipleChoiceQuestion[];
  theme: QuizTheme;
  submitLabel: string;
  onSubmit: (correct: number, total: number) => void;
}

export default function QuizRunner({ questions, theme, submitLabel, onSubmit }: QuizRunnerProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [finished, setFinished] = useState(false);

  const answer = answers[current];
  const correctCount = answers.reduce<number>(
    (sum, a, i) => sum + (a === questions[i].correctIndex ? 1 : 0),
    0
  );

  const choose = (optionIndex: number) => {
    const next = [...answers];
    next[current] = optionIndex;
    setAnswers(next);
  };

  const next = () => {
    if (current < questions.length - 1) setCurrent((c) => c + 1);
    else setFinished(true);
  };

  if (questions.length === 0) return null;

  if (finished) {
    const percent = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-[#F3D5DC] bg-white/70 p-8 text-center backdrop-blur-xl">
        <div
          className="mx-auto mb-5 flex h-20 w-20 items-center justify-center text-white"
          style={{ background: `linear-gradient(135deg, ${theme.swatch}, ${theme.to})`, borderRadius: "9999px" }}
        >
          <span className="text-3xl">{percent >= 80 ? "★" : percent >= 50 ? "◆" : "•"}</span>
        </div>
        <h2 className={`font-serif text-3xl italic ${theme.text}`}>
          {percent === 100 ? "Flawless." : percent >= 80 ? "Brilliant work." : percent >= 50 ? "Good effort." : "Keep practicing."}
        </h2>
        <p className={`mt-2 text-sm ${theme.muted}`}>
          {correctCount} of {questions.length} correct
        </p>
        <div className="mx-auto mt-6 h-2 w-48 overflow-hidden rounded-full bg-[#F6E4EA]">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${theme.swatch}, ${theme.to})` }}
          />
        </div>
        <p className={`mt-2 text-xs ${theme.muted}`}>{percent}%</p>
        <button
          onClick={() => onSubmit(correctCount, questions.length)}
          className={`mt-8 w-full rounded-full px-6 py-3 text-sm font-medium text-white transition-all active:scale-[0.98]`}
          style={{ background: `linear-gradient(135deg, ${theme.swatch}, ${theme.to})` }}
        >
          {submitLabel}
        </button>
      </div>
    );
  }

  const q = questions[current];
  const selected = answer;

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex items-center justify-between">
        <p className={`text-xs uppercase tracking-[0.18em] ${theme.muted}`}>
          Question {current + 1} / {questions.length}
        </p>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-4 rounded-full"
              style={{
                background: answers[i] === null ? "#F6E4EA" : `linear-gradient(90deg, ${theme.swatch}, ${theme.to})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className={`rounded-2xl border p-7 ${theme.card}`}>
        <h2 className={`mb-6 text-lg font-medium leading-relaxed ${theme.text}`}>{q.question}</h2>
        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                  isSelected
                    ? "border-transparent text-white shadow-md"
                    : `bg-white ${theme.text} border-[#F3D5DC] hover:border-[#E9B8C4]`
                }`}
                style={isSelected ? { background: `linear-gradient(135deg, ${theme.swatch}, ${theme.to})` } : undefined}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    isSelected ? "bg-white/25 text-white" : `bg-[#F6EBEE] ${theme.accent}`
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-40 ${theme.text} ${theme.soft}`}
        >
          Back
        </button>
        <button
          onClick={next}
          disabled={selected === null}
          className="rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-40"
          style={{ background: `linear-gradient(135deg, ${theme.swatch}, ${theme.to})` }}
        >
          {current < questions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
}
