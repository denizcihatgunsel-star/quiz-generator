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
import ExamRunner from "@/components/ExamRunner";
import ExamModeToggle from "@/components/ExamModeToggle";
import QuizNotebook from "@/components/QuizNotebook";
import type { ShuffledQuestion } from "@/lib/examMode";

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
  tabSwitchCount?: number;
}

export default function MobileSharedQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [quizMeta, setQuizMeta] = useState<{ 
    id: string; 
    shareId: string | null; 
    topic: string; 
    isOwner?: boolean;
    examModeEnabled?: boolean;
    examTimeLimit?: number | null;
    examSeed?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("mcq");
  const [taking, setTaking] = useState(false);
  const [takingExam, setTakingExam] = useState(false);
  const [showExamNotice, setShowExamNotice] = useState(false);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[] | null>(null);
  const [userRole, setUserRole] = useState<"student" | "teacher">("student");
  const [startingLive, setStartingLive] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);
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

  const loadQuiz = () => {
    fetch(`/api/quiz/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError(d.error);
        } else {
          setQuiz(d.data);
          setQuizMeta({ 
            id: d.id, 
            shareId: d.shareId ?? null, 
            topic: d.topic ?? "",
            isOwner: d.isOwner,
            examModeEnabled: d.examModeEnabled ?? false,
            examTimeLimit: d.examTimeLimit ?? null,
            examSeed: d.examSeed,
          });
        }
      })
      .catch(() => setError("Failed to load quiz."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadQuiz();
  }, [id]);

  useEffect(() => {
    if (!loading && !error) loadAttempts();
  }, [loading, error, session, id]);

  useEffect(() => {
    if (session) {
      fetch("/api/user")
        .then((r) => r.json())
        .then((d) => { if (d.role) setUserRole(d.role); })
        .catch(() => {});
    }
  }, [session]);

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

  const handleExamComplete = async (
    correct: number, 
    total: number, 
    tabSwitchCount: number,
    shuffledQuestions: ShuffledQuestion[]
  ) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    try {
      const answersJson = {
        questionOrder: shuffledQuestions.map(q => q.originalIndex),
        shuffledOptions: shuffledQuestions.map(q => q.shuffledOptions),
      };
      
      await fetch(`/api/quiz/${id}/take`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          score: correct, 
          total,
          tabSwitchCount,
          answersJson,
        }),
      });
    } catch { /* ignore */ } finally {
      submittingRef.current = false;
    }
    setTakingExam(false);
    loadAttempts();
  };

  const handleStartExam = () => {
    setShowExamNotice(true);
  };

  const handleConfirmExam = () => {
    setShowExamNotice(false);
    setTakingExam(true);
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

  const examModeEnabled = quizMeta?.examModeEnabled ?? false;

  return (
    <div className={`min-h-screen transition-colors ${theme.page}`}>
      <main className="mx-auto w-full max-w-lg px-1">
        <div className="mb-4">
          <div className="mb-1.5 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${theme.eyebrow}`}>Shared Quiz</span>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${theme.eyebrow}`}>{theme.label}</span>
            {examModeEnabled && (
              <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-violet-100 text-violet-700">Exam Mode</span>
            )}
          </div>
          <h1 className={`text-2xl font-medium leading-tight ${theme.text}`}>{quiz.topic}</h1>
          <p className={`mt-1 text-xs ${theme.muted}`}>
            {quiz.multipleChoice.length} MCQ &middot; {quiz.flashcards.length} cards
            {(quiz.fillInTheBlank?.length ?? 0) > 0 && ` \u00b7 ${quiz.fillInTheBlank.length} fill-blank`}
            {(quiz.trueFalse?.length ?? 0) > 0 && ` \u00b7 ${quiz.trueFalse.length} true/false`}
          </p>
        </div>

        {quizMeta?.isOwner && userRole === "teacher" && (
          <div className="mb-5">
            <ExamModeToggle 
              quizId={quizMeta.id}
              initialEnabled={examModeEnabled}
              initialTimeLimit={quizMeta.examTimeLimit}
              onUpdate={loadQuiz}
            />
          </div>
        )}

        {quiz.multipleChoice.length > 0 && (
          <div className="mb-5">
            {showExamNotice ? (
              <div className={`rounded-2xl border p-5 backdrop-blur-xl ${theme.card}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className={`text-base font-semibold ${theme.text}`}>Exam Mode Notice</h3>
                </div>
                <div className={`mb-4 space-y-2 text-sm ${theme.text}`}>
                  <p>This quiz is in exam mode. Before you begin:</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Questions and answer options are shuffled</li>
                    {quizMeta?.examTimeLimit && <li>Time limit: {Math.floor(quizMeta.examTimeLimit / 60)} minutes</li>}
                    <li>Tab switches are recorded and shared with your teacher</li>
                    <li>No penalties are applied for tab switches</li>
                  </ul>
                  <p className="text-xs italic text-neutral-500">Stay on this tab for the best experience.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowExamNotice(false)}
                    className={`flex-1 rounded-full border px-4 py-3 text-sm font-medium transition-all ${theme.text} ${theme.soft}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmExam}
                    className="flex-1 rounded-full bg-[#3B2027] py-3 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98]"
                  >
                    I Understand, Start
                  </button>
                </div>
              </div>
            ) : takingExam ? (
              <div className={`rounded-2xl border p-5 backdrop-blur-xl ${theme.card}`}>
                <p className={`mb-5 text-center font-serif text-lg italic ${theme.text}`}>Exam — {quiz.topic}</p>
                {quizMeta?.examSeed !== undefined ? (
                  <ExamRunner
                    quizId={quizMeta.id}
                    questions={quiz.multipleChoice}
                    theme={theme}
                    examSeed={quizMeta.examSeed}
                    timeLimit={quizMeta?.examTimeLimit ?? undefined}
                    submitLabel="Submit exam"
                    onSubmit={handleExamComplete}
                    onCancel={() => setTakingExam(false)}
                  />
                ) : (
                  <p className="text-center text-sm text-neutral-500">Loading exam...</p>
                )}
              </div>
            ) : taking ? (
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
              <div>
                <div className="space-y-2">
                  <button
                    onClick={examModeEnabled ? handleStartExam : () => setTaking(true)}
                    className="w-full rounded-full bg-[#3B2027] py-3.5 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98]"
                  >
                    {examModeEnabled ? 'Start Exam' : (attempts && attempts.length > 0 ? "Retake quiz" : "Take quiz")}
                    {bestAttempt !== null && !examModeEnabled && ` · best ${bestAttempt}%`}
                  </button>
                  {quizMeta?.isOwner && userRole === "teacher" && (
                    <button
                      onClick={async () => {
                        setStartingLive(true);
                        setLiveError(null);
                        try {
                          const res = await fetch("/api/classroom", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ quizId: quizMeta.id }),
                          });
                          const data = await res.json();
                          if (res.ok) {
                            window.location.href = `/classroom/host/${data.code}`;
                          } else {
                            setLiveError(data.error || "Failed to start classroom");
                          }
                        } catch {
                          setLiveError("Connection error. Please try again.");
                        }
                        setStartingLive(false);
                      }}
                      disabled={startingLive}
                      className="w-full rounded-full border border-[color:var(--success)]/20 bg-[color:var(--success)]/10 py-3.5 text-sm font-medium text-[color:var(--success)] transition-colors hover:opacity-80 disabled:opacity-60"
                    >
                      {startingLive ? "Starting..." : "Host Live in Class"}
                    </button>
                  )}
                </div>
                {liveError && (
                  <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{liveError}</p>
                )}
              </div>
            )}
          </div>
        )}

        {attempts && attempts.length > 0 && !taking && !takingExam && !showExamNotice && (
          <div className={`mb-5 rounded-2xl border p-5 ${theme.card}`}>
            <h2 className={`mb-2 font-serif text-base italic ${theme.text}`}>Your progress</h2>
            <div className="space-y-2">
              {attempts.slice(-6).map((a, i, arr) => (
                <div key={a.id} className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      a.percent === bestAttempt ? theme.soft + " " + theme.accent : theme.eyebrow
                    }`}
                  >
                    {arr.length - i}. {a.percent}%
                  </span>
                  {quizMeta?.isOwner && a.tabSwitchCount !== undefined && a.tabSwitchCount > 0 && (
                    <span className="text-xs text-neutral-500">
                      Left tab {a.tabSwitchCount} {a.tabSwitchCount === 1 ? 'time' : 'times'}
                    </span>
                  )}
                </div>
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

      {quizMeta && (
        <QuizNotebook
          open={notebookOpen}
          onToggle={() => setNotebookOpen((o) => !o)}
          theme={theme}
          quizId={quizMeta.id}
          shareId={quizMeta.shareId}
          topic={quizMeta.topic}
        />
      )}
    </div>
  );
}
