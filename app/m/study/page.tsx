"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MultipleChoiceQuestion } from "@/types/quiz";

interface StudyItem {
  conceptId: string;
  concept: string;
  bloom: string;
  question: MultipleChoiceQuestion;
}

export default function MobileStudyModePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<StudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [dueCount, setDueCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/m/auth/login?callbackUrl=/m/study");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      loadStudyItems();
    }
  }, [session]);

  const loadStudyItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/study");
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
        setDueCount(data.dueCount);
      }
    } catch (err) {
      console.error("Failed to load study items:", err);
    } finally {
      setLoading(false);
    }
  };

  const pickOption = (optionIndex: number) => {
    if (revealed) return;
    setAnswer(optionIndex);
    setRevealed(true);
  };

  const handleNext = async () => {
    if (!revealed || !items[currentIndex]) return;

    const currentItem = items[currentIndex];
    const isCorrect = answer === currentItem.question.correctIndex;

    try {
      await fetch("/api/study", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptId: currentItem.conceptId,
          correct: isCorrect,
        }),
      });
    } catch (err) {
      console.error("Failed to grade review:", err);
    }

    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswer(null);
      setRevealed(false);
    } else {
      setCompleted(true);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pb-20">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-violet-600"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="px-4 py-6 pb-24">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-50">
            <svg
              className="h-8 w-8 text-violet-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-medium text-neutral-900">
            No concepts to review
          </h2>
          <p className="mb-6 text-sm text-neutral-600">
            Complete quizzes and miss some questions to build your study deck.
          </p>
          <button
            onClick={() => router.push("/m/dashboard")}
            className="w-full rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-sm active:scale-[0.98]"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="px-4 py-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-medium text-neutral-900">
            Session complete
          </h2>
          <p className="mb-6 text-sm text-neutral-600">
            You reviewed {items.length} concept{items.length === 1 ? "" : "s"}.
            {dueCount > items.length &&
              ` ${dueCount - items.length} more due today.`}
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                setCompleted(false);
                setCurrentIndex(0);
                setAnswer(null);
                setRevealed(false);
                loadStudyItems();
              }}
              className="w-full rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-sm active:scale-[0.98]"
            >
              Continue Studying
            </button>
            <button
              onClick={() => router.push("/m/dashboard")}
              className="w-full rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 active:scale-[0.98]"
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  const q = currentItem.question;
  const isCorrect = answer === q.correctIndex;

  return (
    <div className="px-4 py-6 pb-24">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-xl font-medium text-neutral-900">Study Mode</h1>
          <span className="text-sm text-neutral-600">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-600 to-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-700">
            {currentItem.bloom}
          </span>
          <span className="text-xs text-neutral-500">{currentItem.concept}</span>
        </div>

        <p className="mb-6 text-base font-medium leading-snug text-neutral-900">
          {q.question}
        </p>

        <div className="space-y-2">
          {q.options.map((option, idx) => {
            let style =
              "border-neutral-200 text-neutral-700 hover:border-violet-300 hover:bg-violet-50 active:scale-[0.98]";

            if (revealed) {
              if (idx === q.correctIndex) {
                style =
                  "border-emerald-300 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-300";
              } else if (idx === answer && answer !== q.correctIndex) {
                style = "border-red-300 bg-red-50 text-red-700 line-through";
              } else {
                style = "border-neutral-100 text-neutral-400";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => pickOption(idx)}
                disabled={revealed}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all ${style}`}
                style={{ minHeight: "44px" }}
              >
                <span className="mr-2 font-semibold opacity-50">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div
              className={`rounded-xl border p-4 ${
                isCorrect
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <span className={isCorrect ? "text-emerald-600" : "text-red-600"}>
                  {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </span>
              </p>
              <p className="text-sm leading-relaxed text-neutral-700">
                {q.explanation}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="mt-4 w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-medium text-white shadow-sm active:scale-[0.98]"
              style={{ minHeight: "44px" }}
            >
              {currentIndex < items.length - 1 ? "Next Concept" : "Finish Session"}
            </button>
          </motion.div>
        )}
      </motion.div>

      {dueCount > items.length && (
        <p className="mt-4 text-center text-sm text-neutral-500">
          {dueCount - items.length} more concept{dueCount - items.length === 1 ? "" : "s"} due
          today
        </p>
      )}
    </div>
  );
}
