"use client";

import { useState, useEffect, useRef } from "react";
import type { MultipleChoiceQuestion } from "@/types/quiz";
import type { QuizTheme } from "@/lib/themes";
import { shuffleExamQuestions, type ShuffledQuestion } from "@/lib/examMode";

interface ExamRunnerProps {
  quizId: string;
  questions: MultipleChoiceQuestion[];
  theme: QuizTheme;
  examSeed: number;
  timeLimit?: number; // in seconds
  submitLabel: string;
  onSubmit: (correct: number, total: number, tabSwitchCount: number, shuffledQuestions: ShuffledQuestion[]) => void;
  onCancel: () => void;
}

interface ExamState {
  seed: number;
  startedAt: number;
}

export default function ExamRunner({ 
  quizId,
  questions, 
  theme,
  examSeed,
  timeLimit,
  submitLabel, 
  onSubmit,
  onCancel,
}: ExamRunnerProps) {
  const storageKey = `exam-${quizId}`;
  
  const [shuffledQuestions] = useState<ShuffledQuestion[]>(() => {
    return shuffleExamQuestions(questions, examSeed);
  });
  
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => shuffledQuestions.map(() => null));
  const [finished, setFinished] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(() => {
    if (!timeLimit || timeLimit <= 0) return null;
    
    // Try to restore from sessionStorage
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        const state: ExamState = JSON.parse(stored);
        if (state.seed === examSeed) {
          const elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
          const remaining = timeLimit - elapsed;
          return remaining > 0 ? remaining : 0;
        }
      }
    } catch {
      // ignore
    }
    
    // First time - store start time
    const state: ExamState = {
      seed: examSeed,
      startedAt: Date.now(),
    };
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // ignore if sessionStorage is unavailable
    }
    
    return timeLimit;
  });
  
  const hasStarted = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Track visibility changes for tab switching
  useEffect(() => {
    if (!hasStarted.current) return;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => prev + 1);
      }
    };

    const handleBlur = () => {
      setTabSwitchCount(prev => prev + 1);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // Start timer on first render
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    if (timeRemaining !== null && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            // Auto-submit when time expires
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      // Time already expired on refresh
      handleFinish();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeRemaining]);

  // Cleanup sessionStorage on unmount if finished
  useEffect(() => {
    return () => {
      if (finished) {
        try {
          sessionStorage.removeItem(storageKey);
        } catch {
          // ignore
        }
      }
    };
  }, [finished, storageKey]);

  const answer = answers[current];
  const correctCount = answers.reduce<number>(
    (sum, a, i) => sum + (a === shuffledQuestions[i].correctShuffledIndex ? 1 : 0),
    0
  );

  const choose = (optionIndex: number) => {
    const next = [...answers];
    next[current] = optionIndex;
    setAnswers(next);
  };

  const handleFinish = () => {
    if (finished) return;
    setFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const next = () => {
    if (current < shuffledQuestions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      handleFinish();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (shuffledQuestions.length === 0) return null;

  if (finished) {
    const percent = Math.round((correctCount / shuffledQuestions.length) * 100);
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
          {correctCount} of {shuffledQuestions.length} correct
        </p>
        <div className="mx-auto mt-6 h-2 w-48 overflow-hidden rounded-full bg-[#F6E4EA]">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${theme.swatch}, ${theme.to})` }}
          />
        </div>
        <p className={`mt-2 text-xs ${theme.muted}`}>{percent}%</p>
        
        {tabSwitchCount > 0 && (
          <p className={`mt-4 text-xs ${theme.muted}`}>
            Tab switches recorded: {tabSwitchCount}
          </p>
        )}
        
        <button
          onClick={() => onSubmit(correctCount, shuffledQuestions.length, tabSwitchCount, shuffledQuestions)}
          className={`mt-8 w-full rounded-full px-6 py-3 text-sm font-medium text-white transition-all active:scale-[0.98]`}
          style={{ background: `linear-gradient(135deg, ${theme.swatch}, ${theme.to})` }}
        >
          {submitLabel}
        </button>
      </div>
    );
  }

  const q = shuffledQuestions[current];
  const selected = answer;

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex items-center justify-between">
        <p className={`text-xs uppercase tracking-[0.18em] ${theme.muted}`}>
          Question {current + 1} / {shuffledQuestions.length}
        </p>
        <div className="flex items-center gap-3">
          {timeRemaining !== null && (
            <div className={`text-sm font-medium ${timeRemaining < 60 ? 'text-red-600' : theme.text}`}>
              {formatTime(timeRemaining)}
            </div>
          )}
          <div className="flex gap-1">
            {shuffledQuestions.map((_, i) => (
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
      </div>

      <div className={`rounded-2xl border p-7 ${theme.card}`}>
        <h2 className={`mb-6 text-lg font-medium leading-relaxed ${theme.text}`}>{q.question}</h2>
        <div className="space-y-2.5">
          {q.shuffledOptions.map((opt, i) => {
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
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all border ${theme.muted}`}
          >
            Cancel
          </button>
          <button
            onClick={next}
            disabled={selected === null}
            className="rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: `linear-gradient(135deg, ${theme.swatch}, ${theme.to})` }}
          >
            {current < shuffledQuestions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
