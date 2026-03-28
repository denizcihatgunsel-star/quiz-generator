"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { QuizData } from "@/types/quiz";
import MultipleChoiceView from "@/components/MultipleChoiceView";
import FlashcardView from "@/components/FlashcardView";

const TABS = [
  { id: "mcq", label: "Multiple Choice" },
  { id: "flashcards", label: "Flashcards" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function SharedQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("mcq");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/quiz/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError(d.error);
        } else {
          setQuiz(d.data);
        }
      })
      .catch(() => setError("Failed to load quiz."))
      .finally(() => setLoading(false));
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">{error ?? "Quiz not found."}</p>
          <Link href="/" className="text-sm text-violet-600 dark:text-violet-400 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold">Q</div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">QuizGen</span>
          </Link>
          <button
            onClick={copyLink}
            className="text-sm px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
          >
            {copied ? "Link copied!" : "Share quiz"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              Shared Quiz
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{quiz.topic}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {quiz.multipleChoice.length} questions · {quiz.flashcards.length} flashcards
          </p>
        </div>

        <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
            >
              {tab.id === "mcq" ? "Multiple Choice" : "Flashcards"}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "mcq" ? (
            <MultipleChoiceView questions={quiz.multipleChoice} />
          ) : (
            <FlashcardView flashcards={quiz.flashcards} />
          )}
        </div>
      </main>
    </div>
  );
}
