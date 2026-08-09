"use client";

import { useState, useEffect, use, useRef } from "react";
import { useSession } from "next-auth/react";
import { QuizData } from "@/types/quiz";
import { getQuizTheme } from "@/lib/themes";
import MultipleChoiceView from "@/components/MultipleChoiceView";
import FlashcardView from "@/components/FlashcardView";
import FillInTheBlankView from "@/components/FillInTheBlankView";
import TrueFalseView from "@/components/TrueFalseView";
import QuizRunner from "@/components/QuizRunner";

const TABS = [
  { id: "mcq", label: "Quiz", icon: "\ud83e\udde0" },
  { id: "flashcards", label: "Cards", icon: "\ud83c\udccf" },
  { id: "fillblank", label: "Fill Blank", icon: "\u270d\ufe0f" },
  { id: "truefalse", label: "T / F", icon: "\u2696\ufe0f" },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface Attempt {
  id: string;
  score: number;
  total: number;
  percent: number;
  createdAt: string;
}

export default function MobileSharedQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("mcq");
  const [taking, setTaking] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[] | null>(null);
  const submittingRef = useRef(false);

  const theme = getQuizTheme(quiz?.theme);

  const loadAttempts = () => {
    if (!session?.user) {
      setAttempts(null);
      return;
    }
    fetch(`/api/quiz/${id}/attempts`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setAttempts(d.attempts ?? []);
      })
      .catch(() => {});
  };

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

  useEffect(() => {
    if (!loading && !error) loadAttempts();
  }, [loading, error, session, id]);

  const handleTakeComplete = async (correct: number, total: number) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    try {
      await fetch(`/api/quiz/${id}/take`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: correct, total }),
      });
    } catch { /* ignore */ } finally {
      submittingRef.current = false;
    }
    setTaking(false);
    loadAttempts();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-2 w-2 animate-bounce rounded-full bg-[#B0607A]" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="py-24 text-center">
        <p className={`mb-4 ${theme.muted}`}>{error ?? "Quiz not found."}</p>
        <a href="/m" className={`text-sm ${theme.accent} transition-colors`}>
          Back to home
        </a>
      </div>
    );
  }

  const availableTabs = TABS.filter((tab) => {
    if (tab.id === "fillblank") return (quiz.fillInTheBlank?.length ?? 0) > 0;
    if (tab.id === "truefalse") return (quiz.trueFalse?.length ?? 0) > 0;
    return true;
  });

  const bestAttempt = attempts && attempts.length > 0
    ? Math.max(...attempts.map((a) => a.percent))
    : null;

  return (
    <div className={`min-h-screen transition-colors ${theme.page}`}>
      <main className="mx-auto w-full max-w-lg px-1">
        <div className="mb-4">
          <div className="mb-1.5 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${theme.eyebrow}`}>Shared Quiz</span>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${theme.eyebrow}`}>{theme.label}</span>
          </div>
          <h1 className={`text-2xl font-medium leading-tight ${theme.text}`}>{quiz.topic}</h1>
          <p className={`mt-1 text-xs ${theme.muted}`}>
            {quiz.multipleChoice.length} MCQ &middot; {quiz.flashcards.length} cards
            {(quiz.fillInTheBlank?.length ?? 0) > 0 && ` \u00b7 ${quiz.fillInTheBlank.length} fill-blank`}
            {(quiz.trueFalse?.length ?? 0) > 0 && ` \u00b7 ${quiz.trueFalse.length} true/false`}
          </p>
        </div>

        {quiz.multipleChoice.length > 0 && (
          <div className="mb-5">
            {taking ? (
              <div className={`rounded-2xl border p-5 backdrop-blur-xl ${theme.card}`}>
                <p className={`mb-5 text-center font-serif text-lg italic ${theme.text}`}>Take quiz — {quiz.topic}</p>
                <QuizRunner
                  questions={quiz.multipleChoice}
                  theme={theme}
                  submitLabel="Submit & compare"
                  onSubmit={handleTakeComplete}
                />
                <button
                  onClick={() => setTaking(false)}
                  className={`mt-4 w-full text-center text-xs ${theme.muted} hover:underline`}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setTaking(true)}
                className="w-full rounded-full bg-[#3B2027] py-3.5 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98]"
              >
                {attempts && attempts.length > 0 ? "Retake quiz" : "Take quiz"}
                {bestAttempt !== null && ` · best ${bestAttempt}%`}
              </button>
            )}
          </div>
        )}

        {attempts && attempts.length > 0 && !taking && (
          <div className={`mb-5 rounded-2xl border p-5 ${theme.card}`}>
            <h2 className={`mb-2 font-serif text-base italic ${theme.text}`}>Your progress</h2>
            <div className="flex flex-wrap gap-1.5">
              {attempts.slice(-6).map((a, i, arr) => (
                <span
                  key={a.id}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    a.percent === bestAttempt ? theme.soft + " " + theme.accent : theme.eyebrow
                  }`}
                >
                  {arr.length - i}. {a.percent}%
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4 flex gap-1 overflow-x-auto rounded-xl border p-1 backdrop-blur-xl">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? `${theme.soft} ${theme.text} shadow-sm`
                  : `${theme.muted} hover:opacity-80`
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "mcq" && <MultipleChoiceView questions={quiz.multipleChoice} />}
          {activeTab === "flashcards" && <FlashcardView flashcards={quiz.flashcards} />}
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
