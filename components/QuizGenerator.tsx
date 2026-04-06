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
import LandingPage from "./LandingPage";
import ChatBot from "./ChatBot";

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
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoUsed, setDemoUsed] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const charCount = lesson.trim().length;
  const isReady = charCount >= 50 && charCount <= 15000;
  const isLoggedIn = !!session;
  const canGenerateDemo = !isLoggedIn && !demoUsed;

  // Dark mode — default to dark
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    const isDark = stored === null ? true : stored === "true";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    // Check demo usage
    if (localStorage.getItem("examina_demo_used") === "true") {
      setDemoUsed(true);
    }
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

    if (file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      const text = await file.text();
      setLesson(text.slice(0, 15000));
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

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

      // Mark demo as used for non-logged-in users
      if (!isLoggedIn) {
        localStorage.setItem("examina_demo_used", "true");
        setDemoUsed(true);
      } else {
        fetchUsage();

        // Auto-save quiz (only for logged-in users)
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
          // Save failed silently
        }
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
      <p style="color:#888;font-size:13px;">Generated by Examina</p>
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

  const handleChatQuiz = (quizData: QuizData) => {
    setQuiz(quizData);
    setStatus("success");
    setActiveTab("mcq");
    fetchUsage();
  };

  const planId = (usage?.planId ?? "free") as PlanId;
  const plan = PLANS[planId];
  const isUnlimited = plan.quizzesPerMonth === Infinity;
  const usedCount = usage?.used ?? 0;
  const limitCount = usage?.limit ?? plan.quizzesPerMonth;
  const atLimit = !isUnlimited && usedCount >= limitCount;

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* ========== NAVIGATION ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <div className="max-w-5xl mx-auto">
          <div className="nav-glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
              <span className="font-semibold text-white text-lg tracking-tight">Examina</span>
            </div>

            {/* Center Links — Desktop */}
            <div className="hidden sm:flex items-center gap-1">
              <a href="#features" className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                Features
              </a>
              <Link href="/pricing" className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                Pricing
              </Link>
              <a href="#faq" className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                FAQ
              </a>
              {isLoggedIn && (
                <Link href="/dashboard" className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  Dashboard
                </Link>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                title={darkMode ? "Light mode" : "Dark mode"}
              >
                {darkMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" strokeWidth="2"/><path strokeWidth="2" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                )}
              </button>

              {quiz && (
                <button
                  onClick={handleReset}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  + New quiz
                </button>
              )}

              {sessionStatus === "loading" ? (
                <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
              ) : isLoggedIn && usage ? (
                <UserMenu used={usedCount} limit={limitCount} planId={planId} />
              ) : !isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-700 hover:border-zinc-500 text-sm text-white font-medium transition-all hover:bg-white/5"
                  >
                    Get started
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              ) : null}

              {/* Mobile menu button */}
              <button
                className="sm:hidden w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-2 nav-glass rounded-xl p-4 space-y-1">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/5">Features</a>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/5">Pricing</Link>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/5">FAQ</a>
              {isLoggedIn && (
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/5">Dashboard</Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* ========== MAIN CONTENT ========== */}
      <main>
        {!quiz ? (
          <>
            {/* Hero Section */}
            <section className="hero-gradient pt-32 pb-16 sm:pt-40 sm:pb-24">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  Powered by AI
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                  Turn Any Lesson
                  <br />
                  Into a Quiz.
                  <br />
                  <span className="gradient-text">Instantly.</span>
                </h1>

                <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                  Paste your content or upload a file — Examina AI generates multiple choice, flashcards,
                  fill-in-the-blank, and true/false questions in seconds.
                </p>

                {/* Not logged in + demo used — CTA to sign up */}
                {!isLoggedIn && sessionStatus !== "loading" && demoUsed && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link
                      href="/auth/register"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 text-base"
                    >
                      Get started free
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link
                      href="/auth/login"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium transition-all text-base"
                    >
                      Sign in
                    </Link>
                  </div>
                )}

                {/* Demo badge for non-logged-in users */}
                {!isLoggedIn && sessionStatus !== "loading" && canGenerateDemo && (
                  <div className="max-w-2xl mx-auto mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-xs text-violet-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Try 1 free quiz — no account required
                    </div>
                  </div>
                )}

                {/* Limit reached */}
                {isLoggedIn && atLimit && !limitReached && (
                  <div className="max-w-xl mx-auto mb-8 p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 flex items-center justify-between gap-4">
                    <div className="text-left">
                      <p className="text-sm font-medium text-amber-200">Monthly limit reached</p>
                      <p className="text-xs text-amber-400/70 mt-0.5">
                        You&apos;ve used all {limitCount} quizzes on the {plan.name} plan this month.
                      </p>
                    </div>
                    <Link
                      href="/pricing"
                      className="shrink-0 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium transition-colors"
                    >
                      Upgrade
                    </Link>
                  </div>
                )}

                {/* Usage bar */}
                {isLoggedIn && usage && !isUnlimited && !atLimit && (
                  <div className="max-w-md mx-auto mb-8 flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all"
                        style={{ width: `${Math.min(100, (usedCount / limitCount) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-500 shrink-0">
                      {usedCount}/{limitCount} quizzes
                    </span>
                    <Link href="/pricing" className="text-xs text-violet-400 hover:text-violet-300 shrink-0">
                      Upgrade
                    </Link>
                  </div>
                )}

                {/* Quiz Input Area */}
                {(isLoggedIn || canGenerateDemo) && (
                  <div className="max-w-2xl mx-auto">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/20 overflow-hidden glow-purple">
                      <div className="flex items-center justify-between px-5 pt-4 pb-2">
                        <label
                          htmlFor="lesson-input"
                          className="text-xs font-semibold text-zinc-500 uppercase tracking-widest"
                        >
                          Lesson Content
                        </label>
                        <div className="flex items-center gap-3">
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
                            disabled={uploading}
                            className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 disabled:opacity-50 transition-colors"
                          >
                            {uploading ? (
                              <>
                                <span className="inline-block w-3 h-3 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
                                Extracting...
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
                            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
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
                        placeholder="Paste your lesson, article, notes, or any educational content here... or upload a PDF/TXT file above."
                        className="w-full px-5 pb-4 min-h-44 text-sm text-zinc-200 placeholder-zinc-600 bg-transparent resize-y focus:outline-none leading-relaxed"
                        aria-describedby="char-count"
                      />

                      <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-800">
                        <p
                          id="char-count"
                          className={`text-xs ${
                            charCount < 50
                              ? "text-zinc-600"
                              : charCount > 14000
                              ? "text-amber-500"
                              : "text-emerald-500"
                          }`}
                        >
                          {charCount.toLocaleString()} / 15,000 chars
                          {charCount < 50 && charCount > 0 && <span className="ml-1">(min 50)</span>}
                          {charCount === 0 && <span className="ml-1 text-zinc-600">(~5 pages of notes)</span>}
                        </p>

                        <button
                          onClick={handleGenerate}
                          disabled={!isReady || status === "loading" || atLimit}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white disabled:text-zinc-500 text-sm font-medium transition-all disabled:cursor-not-allowed shadow-lg shadow-violet-500/20 disabled:shadow-none"
                          aria-busy={status === "loading"}
                        >
                          {status === "loading" ? (
                            <>
                              <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Generating...
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
                          ? "bg-amber-500/5 border-amber-500/30 text-amber-300"
                          : "bg-red-500/5 border-red-500/30 text-red-300"
                      }`}>
                        <strong>{limitReached ? "Limit reached: " : "Error: "}</strong>
                        {error}
                        {limitReached && (
                          <Link href="/pricing" className="ml-2 underline font-medium">
                            Upgrade
                          </Link>
                        )}
                      </div>
                    )}

                    {/* Loading hint */}
                    {status === "loading" && (
                      <div className="mt-8 flex flex-col items-center gap-3 text-zinc-500">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full bg-violet-500 animate-bounce"
                              style={{ animationDelay: `${i * 150}ms` }}
                            />
                          ))}
                        </div>
                        <p className="text-xs">Examina is reading your lesson and crafting questions...</p>
                      </div>
                    )}

                    {/* AI Chatbot */}
                    {status === "idle" && (
                      <div className="mt-8">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                            Or ask Examina AI
                          </span>
                        </div>
                        <ChatBot onQuizGenerated={handleChatQuiz} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Landing Page Sections */}
            {status === "idle" && <LandingPage />}
          </>
        ) : (
          /* ========== QUIZ RESULTS ========== */
          <div className="pt-28 pb-16">
            <div className="max-w-3xl mx-auto px-4">
              {/* Demo CTA — sign up to save */}
              {!isLoggedIn && (
                <div className="mb-6 p-5 rounded-2xl border border-violet-500/30 bg-violet-500/5">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-violet-200">Your demo quiz is ready!</p>
                      <p className="text-xs text-violet-400/70 mt-0.5">
                        Sign up to save quizzes, track scores, share with others, and generate more.
                      </p>
                    </div>
                    <Link
                      href="/auth/register"
                      className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-violet-500/20"
                    >
                      Create free account
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">
                    Quiz ready
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">{quiz.topic}</h2>
                <p className="text-sm text-zinc-500 mt-1">
                  {quiz.multipleChoice.length} MCQ · {quiz.flashcards.length} flashcards
                  {quiz.fillInTheBlank?.length > 0 && ` · ${quiz.fillInTheBlank.length} fill-in-blank`}
                  {quiz.trueFalse?.length > 0 && ` · ${quiz.trueFalse.length} true/false`}
                </p>
              </div>

              {/* Score card */}
              {score && (
                <div className="mb-6 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-200">Quiz Complete!</p>
                      <p className="text-xs text-emerald-400/70 mt-0.5">
                        You scored {score.correct} out of {score.total} ({Math.round((score.correct / score.total) * 100)}%)
                      </p>
                    </div>
                    <div className="text-3xl font-bold text-emerald-400">
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
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-800 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                    </svg>
                    {copied ? "Link copied!" : "Share"}
                  </button>
                )}
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-800 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Download PDF
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl mb-6 overflow-x-auto">
                {TABS.filter((tab) => {
                  if (tab.id === "fillblank") return (quiz.fillInTheBlank?.length ?? 0) > 0;
                  if (tab.id === "truefalse") return (quiz.trueFalse?.length ?? 0) > 0;
                  return true;
                }).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-zinc-800 text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                  >
                    <span className="mr-1">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
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
          </div>
        )}
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Examina" className="w-7 h-7 rounded-xl object-cover" />
              <span className="text-sm font-semibold text-zinc-300">Examina</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <span className="hover:text-white transition-colors cursor-default">Privacy</span>
              <span className="hover:text-white transition-colors cursor-default">Terms</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} Examina. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600">
              Powered by <span className="gradient-text font-medium">Examina AI</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
