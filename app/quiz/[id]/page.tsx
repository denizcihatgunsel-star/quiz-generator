"use client";

import { useState, useEffect, use, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { QuizData } from "@/types/quiz";
import { getQuizTheme } from "@/lib/themes";
import MultipleChoiceView from "@/components/MultipleChoiceView";
import FlashcardView from "@/components/FlashcardView";
import FillInTheBlankView from "@/components/FillInTheBlankView";
import TrueFalseView from "@/components/TrueFalseView";
import QuizRunner from "@/components/QuizRunner";

const TABS = [
  { id: "mcq", label: "Multiple Choice", icon: "\ud83e\udde0" },
  { id: "flashcards", label: "Flashcards", icon: "\ud83c\udccf" },
  { id: "fillblank", label: "Fill in Blank", icon: "\u270d\ufe0f" },
  { id: "truefalse", label: "True / False", icon: "\u2696\ufe0f" },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface Attempt {
  id: string;
  score: number;
  total: number;
  percent: number;
  createdAt: string;
}

export default function SharedQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("mcq");
  const [copied, setCopied] = useState(false);
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

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <div className="flex min-h-screen items-center justify-center bg-background">
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
      <div className={`flex min-h-screen items-center justify-center ${theme.page}`}>
        <div className="text-center">
          <p className={`mb-4 ${theme.muted}`}>{error ?? "Quiz not found."}</p>
          <Link href="/" className={`text-sm ${theme.accent} transition-colors`}>
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

  const bestAttempt = attempts && attempts.length > 0
    ? Math.max(...attempts.map((a) => a.percent))
    : null;

  const Curve = ({ attempts }: { attempts: Attempt[] }) => {
    if (attempts.length < 2) return null;
    const max = 100;
    const min = 0;
    const points = attempts
      .map((a, i) => {
        const x = (i / (attempts.length - 1)) * 100;
        const y = 100 - ((a.percent - min) / (max - min)) * 80 - 10;
        return `${x},${y}`;
      })
      .join(" ");
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-24 w-full">
        <polyline
          points={points}
          fill="none"
          stroke={theme.swatch}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {attempts.map((a, i) => {
          const x = (i / (attempts.length - 1)) * 100;
          const y = 100 - ((a.percent - min) / (max - min)) * 80 - 10;
          return (
            <circle key={a.id} cx={x} cy={y} r="3" fill={theme.swatch} stroke={theme.page} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          );
        })}
      </svg>
    );
  };

  return (
    <div className={`min-h-screen transition-colors ${theme.page}`}>
      <header className={`sticky top-0 z-10 border-b backdrop-blur-xl ${theme.card}`}>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="h-8 w-8 rounded-xl object-cover" />
            <span className={`text-lg font-medium ${theme.text}`}>Examina</span>
          </Link>
          <button
            onClick={copyLink}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${theme.muted} ${theme.card} hover:opacity-80`}
          >
            {copied ? "Link copied!" : "Share quiz"}
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="mb-6">
          <div className="mb-1 flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${theme.eyebrow}`}>Shared Quiz</span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${theme.eyebrow}`}>{theme.label}</span>
          </div>
          <h1 className={`text-2xl font-medium ${theme.text}`}>{quiz.topic}</h1>
          <p className={`mt-1 text-sm ${theme.muted}`}>
            {quiz.multipleChoice.length} MCQ &middot; {quiz.flashcards.length} flashcards
            {(quiz.fillInTheBlank?.length ?? 0) > 0 && ` \u00b7 ${quiz.fillInTheBlank.length} fill-in-blank`}
            {(quiz.trueFalse?.length ?? 0) > 0 && ` \u00b7 ${quiz.trueFalse.length} true/false`}
          </p>
        </div>

        {quiz.multipleChoice.length > 0 && (
          <div className="mb-6">
            {taking ? (
              <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-6 backdrop-blur-xl">
                <p className={`mb-5 text-center font-serif text-xl italic ${theme.text}`}>Take quiz — {quiz.topic}</p>
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
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setTaking(true)}
                  className="rounded-full bg-[#3B2027] px-6 py-3 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98]"
                >
                  {attempts && attempts.length > 0 ? "Retake quiz" : "Take quiz"}
                </button>
                {bestAttempt !== null && (
                  <span className={`text-sm ${theme.muted}`}>
                    Best: <span className={`font-medium ${theme.accent}`}>{bestAttempt}%</span>
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {attempts && attempts.length > 0 && !taking && (
          <div className={`mb-8 rounded-2xl border p-6 ${theme.card}`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className={`font-serif text-lg italic ${theme.text}`}>Your progress</h2>
              <span className={`text-xs ${theme.muted}`}>
                {attempts.length} attempt{attempts.length === 1 ? "" : "s"}
                {bestAttempt !== null && ` · best ${bestAttempt}%`}
              </span>
            </div>
            <Curve attempts={attempts} />
            <div className="mt-3 flex flex-wrap gap-2">
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

        <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border p-1 backdrop-blur-xl">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? `${theme.soft} ${theme.text} shadow-sm`
                  : `${theme.muted} hover:opacity-80`
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
