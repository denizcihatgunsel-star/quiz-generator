"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { QuizData, GenerateStatus } from "@/types/quiz";
import { PLANS, type PlanId } from "@/lib/subscription";
import MultipleChoiceView from "./MultipleChoiceView";
import FlashcardView from "./FlashcardView";
import UserMenu from "./UserMenu";

const EXAMPLE_LESSON = `The water cycle, also known as the hydrological cycle, describes the continuous movement of water on, above, and below Earth's surface. The main stages are:

1. Evaporation: The sun heats surface water in oceans, lakes, and rivers, converting it to water vapor that rises into the atmosphere. About 90% of atmospheric moisture comes from evaporation.

2. Condensation: As water vapor rises, it cools and condenses around tiny particles (dust, pollen) to form clouds and fog. This is the process that creates clouds.

3. Precipitation: When water droplets in clouds combine and grow heavy enough, they fall as rain, snow, sleet, or hail depending on atmospheric temperature.

4. Collection: Precipitation collects in oceans, rivers, and lakes (surface runoff) or soaks into the ground (infiltration) to become groundwater. Plants absorb groundwater through their roots.

5. Transpiration: Plants release water vapor through their leaves—a process combined with evaporation called evapotranspiration, which returns significant moisture to the atmosphere.

The water cycle is powered primarily by solar energy and gravity. It plays a critical role in distributing freshwater, regulating temperature, and shaping weather patterns across the globe.`;

const TABS = [
  { id: "mcq", label: "Multiple Choice" },
  { id: "flashcards", label: "Flashcards" },
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = lesson.trim().length;
  const isReady = charCount >= 50 && charCount <= 15000;
  const isLoggedIn = !!session;

  // Fetch usage info on load / after each generation
  const fetchUsage = async () => {
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
  };

  useEffect(() => {
    if (session) fetchUsage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleGenerate = async () => {
    if (!isReady || status === "loading") return;

    setStatus("loading");
    setError(null);
    setLimitReached(false);
    setQuiz(null);

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
      fetchUsage(); // refresh usage counter
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
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const loadExample = () => {
    setLesson(EXAMPLE_LESSON);
    textareaRef.current?.focus();
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
                Paste your lesson content below and DeepSeek will generate multiple
                choice questions and flashcards instantly.
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

            {/* Usage bar (logged in, not unlimited) */}
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
                <button
                  onClick={loadExample}
                  className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
                >
                  Load example
                </button>
              </div>

              <textarea
                id="lesson-input"
                ref={textareaRef}
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                placeholder="Paste your lesson, article, notes, or any educational content here…"
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

            {/* Feature cards (idle + logged out) */}
            {status === "idle" && !isLoggedIn && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "🧠", title: "Multiple Choice", desc: "5–8 questions with instant feedback and explanations" },
                  { icon: "🃏", title: "Flashcards", desc: "8–12 cards with flip animation for active recall practice" },
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
                  role="tab"
                  aria-selected={activeTab === tab.id}
                >
                  {tab.id === "mcq" ? "🧠 " : "🃏 "}
                  {tab.label}
                </button>
              ))}
            </div>

            <div role="tabpanel">
              {activeTab === "mcq" ? (
                <MultipleChoiceView questions={quiz.multipleChoice} />
              ) : (
                <FlashcardView flashcards={quiz.flashcards} />
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
        · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
