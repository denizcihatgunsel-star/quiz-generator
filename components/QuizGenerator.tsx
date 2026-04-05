"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { QuizData, GenerateStatus } from "@/types/quiz";
import { PLANS, type PlanId } from "@/lib/subscription";
import MultipleChoiceView from "./MultipleChoiceView";
import FlashcardView from "./FlashcardView";
import FillInTheBlankView from "./FillInTheBlankView";
import TrueFalseView from "./TrueFalseView";
import UserMenu from "./UserMenu";

const EXAMPLE_LESSON = `The water cycle, also known as the hydrological cycle, describes the continuous movement of water on, above, and below Earth's surface. The main stages are:

1. Evaporation: The sun heats surface water in oceans, lakes, and rivers, converting it to water vapor that rises into the atmosphere. About 90% of atmospheric moisture comes from evaporation.

2. Condensation: As water vapor rises, it cools and condenses around tiny particles (dust, pollen) to form clouds and fog. This is the process that creates clouds.

3. Precipitation: When water droplets in clouds combine and grow heavy enough, they fall as rain, snow, sleet, or hail depending on atmospheric temperature.

4. Collection: Precipitation collects in oceans, rivers, and lakes (surface runoff) or soaks into the ground (infiltration) to become groundwater. Plants absorb groundwater through their roots.

5. Transpiration: Plants release water vapor through their leaves—a process combined with evaporation called evapotranspiration, which returns significant moisture to the atmosphere.

The water cycle is powered primarily by solar energy and gravity. It plays a critical role in distributing freshwater, regulating temperature, and shaping weather patterns across the globe.`;

const TABS = [
  { id: "mcq", label: "Multiple Choice", icon: "\ud83e\udde0" },
  { id: "flashcards", label: "Flashcards", icon: "\ud83c\udccf" },
  { id: "fillblank", label: "Fill in Blank", icon: "\u270d\ufe0f" },
  { id: "truefalse", label: "True / False", icon: "\u2696\ufe0f" },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface UsageInfo {
  used: number;
  limit: number;
  planId: PlanId;
}

export default function QuizGenerator() {
  const { data: session, status: sessionStatus } = useSession();
  const [lesson, setLesson] = useState("");
  const [status, setStatus] = useState<GenerateStatus>("idle");
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("mcq");
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [savedShareId, setSavedShareId] = useState<string | null>(null);
  const [savedQuizId, setSavedQuizId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const charCount = lesson.trim().length;
  const isReady = charCount >= 50 && charCount <= 15000;
  const isLoggedIn = !!session;

  // Dark mode
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    const isDark = stored === "true" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", String(next));
    document.documentElement.classList.toggle("dark", next);
  };

  const fetchUsage = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const res = await fetch("/api/usage");
      if (res.ok) {
        const data = await res.json();
        setUsage(data);
      }
    } catch {
      // silently ignore
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (session) fetchUsage();
  }, [session, fetchUsage]);

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TXT and MD files — read client-side
    if (file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      const text = await file.text();
      setLesson(text.slice(0, 15000));
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // PDF — send to server
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setLesson(data.text);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
      return;
    }

    setError("Unsupported file type. Please upload a PDF, TXT, or MD file.");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!isReady || status === "loading") return;

    setStatus("loading");
    setError(null);
    setLimitReached(false);
    setQuiz(null);
    setSavedShareId(null);
    setSavedQuizId(null);
    setScore(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lesson }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error(`Server returned ${res.status} — this usually means the request timed out. Try a shorter lesson.`);
      }

      if (!res.ok) {
        if (data.code === "LIMIT_REACHED") {
          setLimitReached(true);
        }
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      setQuiz(data);
      setStatus("success");
      setActiveTab("mcq");
      fetchUsage();

      // Auto-save quiz
      try {
        const saveRes = await fetch("/api/quiz/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: data.topic, data }),
        });
        const saveData = await saveRes.json();
        if (saveRes.ok) {
          setSavedShareId(saveData.shareId);
          setSavedQuizId(saveData.id);
        }
      } catch {
        // Save failed silently — quiz still works
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setQuiz(null);
    setError(null);
    setLimitReached(false);
    setLesson("");
    setSavedShareId(null);
    setSavedQuizId(null);
    setScore(null);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const loadExample = () => {
    setLesson(EXAMPLE_LESSON);
    textareaRef.current?.focus();
  };

  const copyShareLink = () => {
    if (!savedShareId) return;
    navigator.clipboard.writeText(`${window.location.origin}/quiz/${savedShareId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download quiz as PDF (simple print approach)
  const downloadPDF = () => {
    if (!quiz) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>${quiz.topic} - Quiz</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; padding: 0 20px; color: #1a1a1a; }
        h1 { font-size: 22px; margin-bottom: 6px; }
        h2 { font-size: 16px; margin-top: 30px; color: #7c3aed; }
        .q { margin-bottom: 20px; }
        .q p { margin: 0 0 6px; font-weight: bold; }
        .opt { margin: 2px 0 2px 20px; }
        .correct { color: #16a34a; font-weight: bold; }
        .exp { font-size: 13px; color: #555; margin-top: 4px; }
        .fc { display: inline-block; width: 45%; vertical-align: top; margin: 8px 2%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; }
        .fc strong { display: block; margin-bottom: 4px; }
      </style></head><body>
      <h1>${quiz.topic}</h1>
      <p style="color:#888;font-size:13px;">Generated by QuizGen</p>
      <h2>Multiple Choice</h2>
      ${quiz.multipleChoice.map((q, i) => `
        <div class="q">
          <p>${i + 1}. ${q.question}</p>
          ${q.options.map((o, j) => `<div class="opt ${j === q.correctIndex ? "correct" : ""}">${String.fromCharCode(65 + j)}. ${o}</div>`).join("")}
          <div class="exp">${q.explanation}</div>
        </div>
      `).join("")}
      ${(quiz.fillInTheBlank?.length ?? 0) > 0 ? `
      <h2>Fill in the Blank</h2>
      ${quiz.fillInTheBlank.map((q: { sentence: string; answer: string; explanation: string }, i: number) => `
        <div class="q">
          <p>${i + 1}. ${q.sentence}</p>
          <div class="correct">Answer: ${q.answer}</div>
          <div class="exp">${q.explanation}</div>
        </div>
      `).join("")}` : ""}
      ${(quiz.trueFalse?.length ?? 0) > 0 ? `
      <h2>True / False</h2>
      ${quiz.trueFalse.map((q: { statement: string; correct: boolean; explanation: string }, i: number) => `
        <div class="q">
          <p>${i + 1}. ${q.statement}</p>
          <div class="correct">Answer: ${q.correct ? "True" : "False"}</div>
          <div class="exp">${q.explanation}</div>
        </div>
      `).join("")}` : ""}
      <h2>Flashcards</h2>
      ${quiz.flashcards.map((f) => `<div class="fc"><strong>${f.front}</strong>${f.back}</div>`).join("")}
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  // Score callback from MCQ view
  const handleScoreUpdate = async (correct: number, total: number) => {
    setScore({ correct, total });
    if (savedQuizId) {
      try {
        await fetch(`/api/quiz/${savedQuizId}/score`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score: correct, total }),
        });
      } catch {
        // silently ignore
      }
    }
  };

  const planId = (usage?.planId ?? "free") as PlanId;
  const plan = PLANS[planId];
  const isUnlimited = plan.quizzesPerMonth === Infinity;
  const usedCount = usage?.used ?? 0;
  const limitCount = usage?.limit ?? plan.quizzesPerMonth;
  const atLimit = !isUnlimited && usedCount >= limitCount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
              Q
            </div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">QuizGen</span>
            <span className="text-xs text-zinc-400 dark:text-zinc-600 hidden sm:inline">
              · powered by DeepSeek
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" strokeWidth="2"/><path strokeWidth="2" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              )}
            </button>

            {/* Dashboard link */}
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Dashboard
              </Link>
            )}

            {quiz && (
              <button
                onClick={handleReset}
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                ← New quiz
              </button>
            )}

            {sessionStatus === "loading" ? (
              <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            ) : isLoggedIn && usage ? (
              <UserMenu used={usedCount} limit={limitCount} planId={planId} />
            ) : !isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors"
                >
                  Get started
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {!quiz ? (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                Turn any lesson into a quiz
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-base">
                Paste your lesson content or upload a file and DeepSeek will generate multiple
                choice, fill-in-the-blank, true/false questions and flashcards instantly.
              </p>
            </div>

            {/* Not logged in — gate */}
            {!isLoggedIn && sessionStatus !== "loading" && (
              <div className="mb-6 p-5 rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 text-center">
                <p className="text-sm font-medium text-violet-900 dark:text-violet-200 mb-1">
                  Sign in to generate quizzes
                </p>
                <p className="text-xs text-violet-600 dark:text-violet-400 mb-4">
                  Free accounts get 5 quizzes per month — no credit card needed.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
                  >
                    Create free account
                  </Link>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 rounded-lg border border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 text-sm font-medium hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            )}

            {/* Limit reached */}
            {isLoggedIn && atLimit && !limitReached && (
              <div className="mb-6 p-5 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                    Monthly limit reached
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                    You&apos;ve used all {limitCount} quizzes on the {plan.name} plan this month.
                  </p>
                </div>
                <Link
                  href="/pricing"
                  className="shrink-0 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium transition-colors"
                >
                  Upgrade →
                </Link>
              </div>
            )}

            {/* Usage bar */}
            {isLoggedIn && usage && !isUnlimited && !atLimit && (
              <div className="mb-4 flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-violet-500 transition-all"
                    style={{ width: `${Math.min(100, (usedCount / limitCount) * 100)}%` }}
                  />
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">
                  {usedCount}/{limitCount} quizzes used
                </span>
                <Link href="/pricing" className="text-xs text-violet-600 dark:text-violet-400 hover:underline shrink-0">
                  Upgrade
                </Link>
              </div>
            )}

            {/* Input area */}
            <div className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <label
                  htmlFor="lesson-input"
                  className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest"
                >
                  Lesson Content
                </label>
                <div className="flex items-center gap-3">
                  {/* File upload button */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading || !isLoggedIn}
                    className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 hover:underline disabled:opacity-50 disabled:no-underline"
                  >
                    {uploading ? (
                      <>
                        <span className="inline-block w-3 h-3 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
                        Extracting…
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                        </svg>
                        Upload file
                      </>
                    )}
                  </button>
                  <button
                    onClick={loadExample}
                    className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    Load example
                  </button>
                </div>
              </div>

              <textarea
                id="lesson-input"
                ref={textareaRef}
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                placeholder="Paste your lesson, article, notes, or any educational content here… or upload a PDF/TXT file above."
                className="w-full px-4 pb-4 min-h-52 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 bg-transparent resize-y focus:outline-none leading-relaxed"
                aria-describedby="char-count"
              />

              <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-100 dark:border-zinc-700">
                <p
                  id="char-count"
                  className={`text-xs ${
                    charCount < 50
                      ? "text-zinc-400 dark:text-zinc-600"
                      : charCount > 14000
                      ? "text-amber-500"
                      : "text-emerald-500"
                  }`}
                >
                  {charCount.toLocaleString()} / 15,000 chars
                  {charCount < 50 && charCount > 0 && (
                    <span className="ml-1">(min 50)</span>
                  )}
                </p>

                <button
                  onClick={handleGenerate}
                  disabled={!isReady || status === "loading" || !isLoggedIn || atLimit}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white disabled:text-zinc-400 dark:disabled:text-zinc-600 text-sm font-medium transition-all disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:shadow-none"
                  aria-busy={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate Quiz
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {status === "error" && error && (
              <div className={`mt-4 p-4 rounded-xl border text-sm ${
                limitReached
                  ? "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                  : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
              }`}>
                <strong>{limitReached ? "Limit reached: " : "Error: "}</strong>
                {error}
                {limitReached && (
                  <Link href="/pricing" className="ml-2 underline font-medium">
                    Upgrade →
                  </Link>
                )}
              </div>
            )}

            {/* Loading hint */}
            {status === "loading" && (
              <div className="mt-6 flex flex-col items-center gap-3 text-zinc-400 dark:text-zinc-600">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
                <p className="text-xs">DeepSeek is reading your lesson and crafting questions…</p>
              </div>
            )}

            {/* Feature cards */}
            {status === "idle" && !isLoggedIn && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "\ud83e\udde0", title: "Multiple Choice", desc: "5\u20138 questions with instant feedback and explanations" },
                  { icon: "\ud83c\udccf", title: "Flashcards", desc: "8\u201312 cards with flip animation for active recall" },
                  { icon: "\u270d\ufe0f", title: "Fill in the Blank", desc: "3\u20135 questions testing recall and application" },
                  { icon: "\u2696\ufe0f", title: "True / False", desc: "3\u20135 statements testing comprehension" },
                  { icon: "\ud83d\udcc4", title: "Upload Files", desc: "Upload PDF or TXT files to generate quizzes" },
                  { icon: "\ud83d\udcca", title: "Track Progress", desc: "View quiz history, scores, and stats" },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
                    <span className="text-2xl">{f.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Results */
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  Quiz ready
                </span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{quiz.topic}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {quiz.multipleChoice.length} MCQ · {quiz.flashcards.length} flashcards
                {quiz.fillInTheBlank?.length > 0 && ` · ${quiz.fillInTheBlank.length} fill-in-blank`}
                {quiz.trueFalse?.length > 0 && ` · ${quiz.trueFalse.length} true/false`}
              </p>
            </div>

            {/* Score card */}
            {score && (
              <div className="mb-6 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
                      Quiz Complete!
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                      You scored {score.correct} out of {score.total} ({Math.round((score.correct / score.total) * 100)}%)
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {Math.round((score.correct / score.total) * 100)}%
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {savedShareId && (
                <button
                  onClick={copyShareLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                  </svg>
                  {copied ? "Link copied!" : "Share"}
                </button>
              )}
              <button
                onClick={downloadPDF}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Download PDF
              </button>
            </div>

            <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-6 overflow-x-auto">
              {TABS.filter((tab) => {
                if (tab.id === "fillblank") return (quiz.fillInTheBlank?.length ?? 0) > 0;
                if (tab.id === "truefalse") return (quiz.trueFalse?.length ?? 0) > 0;
                return true;
              }).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                >
                  <span className="mr-1">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            <div role="tabpanel">
              {activeTab === "mcq" && (
                <MultipleChoiceView questions={quiz.multipleChoice} onComplete={handleScoreUpdate} />
              )}
              {activeTab === "flashcards" && (
                <FlashcardView flashcards={quiz.flashcards} />
              )}
              {activeTab === "fillblank" && quiz.fillInTheBlank?.length > 0 && (
                <FillInTheBlankView questions={quiz.fillInTheBlank} onComplete={handleScoreUpdate} />
              )}
              {activeTab === "truefalse" && quiz.trueFalse?.length > 0 && (
                <TrueFalseView questions={quiz.trueFalse} onComplete={handleScoreUpdate} />
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-xs text-zinc-400 dark:text-zinc-600">
        Built with{" "}
        <a href="https://deepseek.com" className="hover:text-violet-500 transition-colors" target="_blank" rel="noopener noreferrer">
          DeepSeek
        </a>{" "}
        ·{" "}
        <Link href="/pricing" className="hover:text-violet-500 transition-colors">
          Pricing
        </Link>{" "}
        ·{" "}
        <Link href="/dashboard" className="hover:text-violet-500 transition-colors">
          Dashboard
        </Link>{" "}
        · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
