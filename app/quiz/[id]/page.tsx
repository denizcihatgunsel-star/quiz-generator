"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { QuizData } from "@/types/quiz";
import MultipleChoiceView from "@/components/MultipleChoiceView";
import FlashcardView from "@/components/FlashcardView";
import FillInTheBlankView from "@/components/FillInTheBlankView";
import TrueFalseView from "@/components/TrueFalseView";

const TABS = [
  { id: "mcq", label: "Multiple Choice", icon: "\ud83e\udde0" },
  { id: "flashcards", label: "Flashcards", icon: "\ud83c\udccf" },
  { id: "fillblank", label: "Fill in Blank", icon: "\u270d\ufe0f" },
  { id: "truefalse", label: "True / False", icon: "\u2696\ufe0f" },
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
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">{error ?? "Quiz not found."}</p>
          <Link href="/" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const availableTabs = TABS.filter((tab) => {
    if (tab.id === "fillblank") return (quiz.fillInTheBlank?.length ?? 0) > 0;
    if (tab.id === "truefalse") return (quiz.trueFalse?.length ?? 0) > 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#141414]">
      <header className="border-b border-zinc-800/50 bg-[#141414]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
            <span className="font-semibold text-white text-lg">Examina</span>
          </Link>
          <button
            onClick={copyLink}
            className="px-4 py-2 rounded-full border border-zinc-800 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
          >
            {copied ? "Link copied!" : "Share quiz"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">
              Shared Quiz
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">{quiz.topic}</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {quiz.multipleChoice.length} MCQ &middot; {quiz.flashcards.length} flashcards
            {(quiz.fillInTheBlank?.length ?? 0) > 0 && ` \u00b7 ${quiz.fillInTheBlank.length} fill-in-blank`}
            {(quiz.trueFalse?.length ?? 0) > 0 && ` \u00b7 ${quiz.trueFalse.length} true/false`}
          </p>
        </div>

        <div className="flex gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl mb-6 overflow-x-auto">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div>
          {activeTab === "mcq" && (
            <MultipleChoiceView questions={quiz.multipleChoice} />
          )}
          {activeTab === "flashcards" && (
            <FlashcardView flashcards={quiz.flashcards} />
          )}
          {activeTab === "fillblank" && quiz.fillInTheBlank?.length > 0 && (
            <FillInTheBlankView questions={quiz.fillInTheBlank} />
          )}
          {activeTab === "truefalse" && quiz.trueFalse?.length > 0 && (
            <TrueFalseView questions={quiz.trueFalse} />
          )}
        </div>
      </main>
    </div>
  );
}
