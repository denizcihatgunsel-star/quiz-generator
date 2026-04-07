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

const LANGUAGES = [
  { code: "English", label: "English", flag: "🇺🇸" },
  { code: "Spanish", label: "Espa\u00f1ol", flag: "🇪🇸" },
  { code: "French", label: "Fran\u00e7ais", flag: "🇫🇷" },
  { code: "German", label: "Deutsch", flag: "🇩🇪" },
  { code: "Italian", label: "Italiano", flag: "🇮🇹" },
  { code: "Portuguese", label: "Portugu\u00eas", flag: "🇧🇷" },
  { code: "Dutch", label: "Nederlands", flag: "🇳🇱" },
  { code: "Russian", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", flag: "🇷🇺" },
  { code: "Chinese", label: "\u4e2d\u6587", flag: "🇨🇳" },
  { code: "Japanese", label: "\u65e5\u672c\u8a9e", flag: "🇯🇵" },
  { code: "Korean", label: "\ud55c\uad6d\uc5b4", flag: "🇰🇷" },
  { code: "Arabic", label: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "🇸🇦" },
  { code: "Turkish", label: "T\u00fcrk\u00e7e", flag: "🇹🇷" },
  { code: "Hindi", label: "\u0939\u093f\u0928\u094d\u0926\u0940", flag: "🇮🇳" },
  { code: "Polish", label: "Polski", flag: "🇵🇱" },
  { code: "Swedish", label: "Svenska", flag: "🇸🇪" },
  { code: "Norwegian", label: "Norsk", flag: "🇳🇴" },
  { code: "Danish", label: "Dansk", flag: "🇩🇰" },
  { code: "Finnish", label: "Suomi", flag: "🇫🇮" },
  { code: "Greek", label: "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac", flag: "🇬🇷" },
  { code: "Czech", label: "\u010ce\u0161tina", flag: "🇨🇿" },
  { code: "Romanian", label: "Rom\u00e2n\u0103", flag: "🇷🇴" },
  { code: "Hungarian", label: "Magyar", flag: "🇭🇺" },
  { code: "Vietnamese", label: "Ti\u1ebfng Vi\u1ec7t", flag: "🇻🇳" },
  { code: "Thai", label: "\u0e44\u0e17\u0e22", flag: "🇹🇭" },
  { code: "Indonesian", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "Ukrainian", label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430", flag: "🇺🇦" },
  { code: "Hebrew", label: "\u05e2\u05d1\u05e8\u05d9\u05ea", flag: "🇮🇱" },
];

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
  const [language, setLanguage] = useState("English");
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
        body: JSON.stringify({ lesson, language }),
      });

      // Non-streaming error responses (auth, validation, limit)
      if (!res.ok) {
        let data;
        try {
          data = await res.json();
        } catch {
          throw new Error(`Server returned ${res.status} — please try again.`);
        }
        if (data.code === "LIMIT_REACHED") {
          setLimitReached(true);
        }
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      // Read the streamed response
      const reader = res.body?.getReader();
      if (!reader) throw new Error("Failed to read response stream.");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      // Check for server-side error marker
      const errorMarker = "__EXAMINA_ERROR__:";
      if (fullText.includes(errorMarker)) {
        const errorMsg = fullText.split(errorMarker).pop()?.trim() || "Generation failed.";
        throw new Error(errorMsg);
      }

      // Try to parse JSON, with recovery for truncated responses
      let data;
      try {
        data = JSON.parse(fullText);
      } catch {
        // Attempt to fix truncated JSON by closing open brackets
        let fixed = fullText.replace(/```json\s*/g, "").replace(/```\s*$/g, "").trim();
        // Remove any trailing incomplete string/value
        fixed = fixed.replace(/,\s*"[^"]*$/, "").replace(/,\s*$/, "");
        // Count and close open brackets
        const openBraces = (fixed.match(/\{/g) || []).length - (fixed.match(/\}/g) || []).length;
        const openBrackets = (fixed.match(/\[/g) || []).length - (fixed.match(/\]/g) || []).length;
        for (let i = 0; i < openBrackets; i++) fixed += "]";
        for (let i = 0; i < openBraces; i++) fixed += "}";
        try {
          data = JSON.parse(fixed);
        } catch {
          throw new Error("Failed to parse quiz data. Please try again with shorter content.");
        }
      }

      // Ensure arrays exist
      if (!Array.isArray(data.fillInTheBlank)) data.fillInTheBlank = [];
      if (!Array.isArray(data.trueFalse)) data.trueFalse = [];

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
    <div className="min-h-screen bg-[#1c1c1c]">
      {/* ========== NAVIGATION ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Examina" className="w-7 h-7 rounded-lg object-cover" />
              <span className="font-medium text-white tracking-tight">Examina</span>
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <a href="#features" className="text-sm text-neutral-500 hover:text-white transition-colors">Features</a>
              <Link href="/pricing" className="text-sm text-neutral-500 hover:text-white transition-colors">Pricing</Link>
              <a href="#faq" className="text-sm text-neutral-500 hover:text-white transition-colors">FAQ</a>
              {isLoggedIn && (
                <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-white transition-colors">Dashboard</Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {quiz && (
              <button onClick={handleReset} className="text-sm text-neutral-500 hover:text-white transition-colors">
                New quiz
              </button>
            )}

            {sessionStatus === "loading" ? (
              <div className="w-7 h-7 rounded-full bg-neutral-800 animate-pulse" />
            ) : isLoggedIn && usage ? (
              <UserMenu used={usedCount} limit={limitCount} planId={planId} />
            ) : !isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/auth/login" className="text-sm text-neutral-500 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/auth/register" className="text-sm px-4 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-200">
                  Get started
                </Link>
              </div>
            ) : null}

            <button
              className="sm:hidden text-neutral-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/5 px-6 py-4 space-y-3">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-neutral-400 hover:text-white">Features</a>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-neutral-400 hover:text-white">Pricing</Link>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-neutral-400 hover:text-white">FAQ</a>
            {isLoggedIn && (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-neutral-400 hover:text-white">Dashboard</Link>
            )}
          </div>
        )}
      </nav>

      {/* ========== MAIN CONTENT ========== */}
      <main>
        {!quiz ? (
          <>
            {/* Hero */}
            <section className="pt-36 pb-20 sm:pt-48 sm:pb-32">
              <div className="max-w-5xl mx-auto px-6">
                <div className="max-w-3xl">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.08] mb-8">
                    Turn any lesson
                    <br />
                    into a quiz
                  </h1>

                  <p className="text-lg text-neutral-400 max-w-xl mb-16 leading-relaxed">
                    Paste your content, pick a language, and get multiple choice, flashcards, fill-in-the-blank, and true/false questions in seconds.
                  </p>
                </div>

                {/* Demo used — sign up CTA */}
                {!isLoggedIn && sessionStatus !== "loading" && demoUsed && (
                  <div className="mb-12 flex items-center gap-6">
                    <Link href="/auth/register" className="px-6 py-3 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors">
                      Create free account
                    </Link>
                    <Link href="/auth/login" className="text-sm text-neutral-500 hover:text-white transition-colors">
                      Sign in
                    </Link>
                  </div>
                )}

                {/* Demo hint */}
                {!isLoggedIn && sessionStatus !== "loading" && canGenerateDemo && (
                  <p className="text-xs text-neutral-600 mb-6">Try one quiz free — no account needed.</p>
                )}

                {/* Limit reached */}
                {isLoggedIn && atLimit && !limitReached && (
                  <div className="mb-8 p-5 border border-white/10 flex items-center justify-between gap-4 max-w-2xl">
                    <div>
                      <p className="text-sm text-white">Monthly limit reached</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {limitCount}/{limitCount} quizzes used on the {plan.name} plan.
                      </p>
                    </div>
                    <Link href="/pricing" className="shrink-0 px-4 py-2 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors">
                      Upgrade
                    </Link>
                  </div>
                )}

                {/* Usage bar */}
                {isLoggedIn && usage && !isUnlimited && !atLimit && (
                  <div className="max-w-md mb-8 flex items-center gap-3">
                    <div className="flex-1 h-px bg-neutral-800 relative overflow-hidden">
                      <div className="h-full bg-white transition-all absolute left-0 top-0" style={{ width: `${Math.min(100, (usedCount / limitCount) * 100)}%` }} />
                    </div>
                    <span className="text-xs text-neutral-600 shrink-0">{usedCount}/{limitCount}</span>
                  </div>
                )}

                {/* Quiz Input */}
                {(isLoggedIn || canGenerateDemo) && (
                  <div className="max-w-2xl">
                    <div className="border border-white/10 overflow-hidden">
                      <div className="flex items-center justify-between px-5 pt-4 pb-2">
                        <span className="text-xs text-neutral-600 uppercase tracking-[0.15em]">Content</span>
                        <div className="flex items-center gap-4">
                          <input ref={fileInputRef} type="file" accept=".pdf,.txt,.md" onChange={handleFileUpload} className="hidden" id="file-upload" />
                          <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="text-xs text-neutral-500 hover:text-white disabled:opacity-50 transition-colors">
                            {uploading ? "Extracting..." : "Upload file"}
                          </button>
                          <button onClick={loadExample} className="text-xs text-neutral-500 hover:text-white transition-colors">
                            Example
                          </button>
                        </div>
                      </div>

                      <textarea
                        id="lesson-input"
                        ref={textareaRef}
                        value={lesson}
                        onChange={(e) => setLesson(e.target.value)}
                        placeholder="Paste your lesson, article, or notes here..."
                        className="w-full px-5 pb-4 min-h-40 text-sm text-neutral-200 placeholder-neutral-700 bg-transparent resize-y focus:outline-none leading-relaxed"
                        aria-describedby="char-count"
                      />

                      <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
                        <div className="flex items-center gap-4">
                          <p id="char-count" className={`text-xs ${charCount < 50 ? "text-neutral-700" : charCount > 14000 ? "text-amber-500" : "text-neutral-500"}`}>
                            {charCount.toLocaleString()}/15k
                          </p>
                          <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="appearance-none bg-transparent border-none text-xs text-neutral-500 focus:outline-none cursor-pointer hover:text-white transition-colors"
                          >
                            {LANGUAGES.map((lang) => (
                              <option key={lang.code} value={lang.code} className="bg-neutral-900 text-white">
                                {lang.flag} {lang.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={handleGenerate}
                          disabled={!isReady || status === "loading" || atLimit}
                          className="px-5 py-2 bg-white text-black text-sm font-medium hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600 transition-colors disabled:cursor-not-allowed"
                          aria-busy={status === "loading"}
                        >
                          {status === "loading" ? "Generating..." : "Generate"}
                        </button>
                      </div>
                    </div>

                    {status === "error" && error && (
                      <div className="mt-4 p-4 border border-white/10 text-sm text-neutral-400">
                        {error}
                        {limitReached && (
                          <Link href="/pricing" className="ml-2 underline text-white">Upgrade</Link>
                        )}
                      </div>
                    )}

                    {status === "loading" && (
                      <div className="mt-8 flex items-center gap-3 text-neutral-600">
                        <div className="w-3 h-3 border border-neutral-600 border-t-white rounded-full animate-spin" />
                        <p className="text-xs">Reading your content...</p>
                      </div>
                    )}

                    {status === "idle" && (
                      <div className="mt-12">
                        <p className="text-xs text-neutral-600 uppercase tracking-[0.15em] mb-4">Or ask Examina</p>
                        <ChatBot onQuizGenerated={handleChatQuiz} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {status === "idle" && <LandingPage />}
          </>
        ) : (
          /* ========== QUIZ RESULTS ========== */
          <div className="pt-28 pb-16">
            <div className="max-w-3xl mx-auto px-6">
              {!isLoggedIn && (
                <div className="mb-8 p-6 border border-white/10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-white">Your quiz is ready.</p>
                      <p className="text-xs text-neutral-500 mt-1">Sign up to save, share, and generate more.</p>
                    </div>
                    <Link href="/auth/register" className="shrink-0 px-5 py-2 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors">
                      Create account
                    </Link>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <p className="text-xs text-neutral-600 uppercase tracking-[0.15em] mb-3">Quiz ready</p>
                <h2 className="text-2xl font-medium text-white">{quiz.topic}</h2>
                <p className="text-sm text-neutral-500 mt-2">
                  {quiz.multipleChoice.length} MCQ · {quiz.flashcards.length} flashcards
                  {quiz.fillInTheBlank?.length > 0 && ` · ${quiz.fillInTheBlank.length} fill-in-blank`}
                  {quiz.trueFalse?.length > 0 && ` · ${quiz.trueFalse.length} true/false`}
                </p>
              </div>

              {score && (
                <div className="mb-8 p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white">Complete</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{score.correct}/{score.total} correct</p>
                    </div>
                    <p className="text-3xl font-medium text-white">{Math.round((score.correct / score.total) * 100)}%</p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mb-8">
                {savedShareId && (
                  <button onClick={copyShareLink} className="text-sm text-neutral-500 hover:text-white transition-colors">
                    {copied ? "Copied" : "Share link"}
                  </button>
                )}
                <button onClick={downloadPDF} className="text-sm text-neutral-500 hover:text-white transition-colors">
                  Download PDF
                </button>
              </div>

              <div className="flex gap-6 mb-8 border-b border-white/5 overflow-x-auto">
                {TABS.filter((tab) => {
                  if (tab.id === "fillblank") return (quiz.fillInTheBlank?.length ?? 0) > 0;
                  if (tab.id === "truefalse") return (quiz.trueFalse?.length ?? 0) > 0;
                  return true;
                }).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                      activeTab === tab.id
                        ? "text-white border-white"
                        : "text-neutral-600 border-transparent hover:text-neutral-300"
                    }`}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div role="tabpanel">
                {activeTab === "mcq" && <MultipleChoiceView questions={quiz.multipleChoice} onComplete={handleScoreUpdate} />}
                {activeTab === "flashcards" && <FlashcardView flashcards={quiz.flashcards} />}
                {activeTab === "fillblank" && quiz.fillInTheBlank?.length > 0 && <FillInTheBlankView questions={quiz.fillInTheBlank} onComplete={handleScoreUpdate} />}
                {activeTab === "truefalse" && quiz.trueFalse?.length > 0 && <TrueFalseView questions={quiz.trueFalse} onComplete={handleScoreUpdate} />}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Examina" className="w-6 h-6 rounded-lg object-cover" />
              <span className="text-sm text-neutral-400">Examina</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-neutral-600">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-xs text-neutral-700">&copy; {new Date().getFullYear()} Examina</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
