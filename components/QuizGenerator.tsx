"use client";

import { useState, useRef, useEffect, useCallback, type MouseEvent } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, type Variants } from "framer-motion";
import { QuizData, GenerateStatus } from "@/types/quiz";
import { PLANS, type PlanId } from "@/lib/subscription";
import MultipleChoiceView from "./MultipleChoiceView";
import FlashcardView from "./FlashcardView";
import FillInTheBlankView from "./FillInTheBlankView";
import TrueFalseView from "./TrueFalseView";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";
import EditorialNav from "./EditorialNav";
import AmbientBackground from "./AmbientBackground";
import UnseenLanding from "./UnseenLanding";
import WaterCanvas from "./WaterCanvas";
import InteractiveWordmark from "./InteractiveWordmark";
import SoundToggle from "./SoundToggle";
import ChatBot from "./ChatBot";
import ImageOCR from "./ImageOCR";
import QuizEditor from "./QuizEditor";
import VideoExplanationLink from "./VideoExplanationLink";
import { useTranslation } from "@/lib/i18n";

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
  { id: "fillblank", label: "Fill in Blank" },
  { id: "truefalse", label: "True / False" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const LANGUAGES = [
  { code: "English", label: "English" },
  { code: "Spanish", label: "Espa\u00f1ol" },
  { code: "French", label: "Fran\u00e7ais" },
  { code: "German", label: "Deutsch" },
  { code: "Italian", label: "Italiano" },
  { code: "Portuguese", label: "Portugu\u00eas" },
  { code: "Dutch", label: "Nederlands" },
  { code: "Russian", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
  { code: "Chinese", label: "\u4e2d\u6587" },
  { code: "Japanese", label: "\u65e5\u672c\u8a9e" },
  { code: "Korean", label: "\ud55c\uad6d\uc5b4" },
  { code: "Arabic", label: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629" },
  { code: "Turkish", label: "T\u00fcrk\u00e7e" },
  { code: "Hindi", label: "\u0939\u093f\u0928\u094d\u0926\u0940" },
  { code: "Polish", label: "Polski" },
  { code: "Swedish", label: "Svenska" },
  { code: "Norwegian", label: "Norsk" },
  { code: "Danish", label: "Dansk" },
  { code: "Finnish", label: "Suomi" },
  { code: "Greek", label: "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac" },
  { code: "Czech", label: "\u010ce\u0161tina" },
  { code: "Romanian", label: "Rom\u00e2n\u0103" },
  { code: "Hungarian", label: "Magyar" },
  { code: "Vietnamese", label: "Ti\u1ebfng Vi\u1ec7t" },
  { code: "Thai", label: "\u0e44\u0e17\u0e22" },
  { code: "Indonesian", label: "Bahasa Indonesia" },
  { code: "Ukrainian", label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430" },
  { code: "Hebrew", label: "\u05e2\u05d1\u05e8\u05d9\u05ea" },
];

interface UsageInfo {
  used: number;
  limit: number;
  planId: PlanId;
}

export default function QuizGenerator({ hideChrome = false }: { hideChrome?: boolean }) {
  const { t } = useTranslation();
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoUsed, setDemoUsed] = useState(false);
  const [language, setLanguage] = useState("English");
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const diveScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const diveOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.1]);
  const diveY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const tiltX = useSpring(0, { stiffness: 150, damping: 20 });
  const tiltY = useSpring(0, { stiffness: 150, damping: 20 });
  const onTiltMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 8);
    tiltX.set(-py * 8);
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };
  const onTiltLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const charCount = lesson.trim().length;
  const isReady = charCount >= 50 && charCount <= 15000;
  const isLoggedIn = !!session;
  const canGenerateDemo = !isLoggedIn && !demoUsed;

  useEffect(() => {
    if (localStorage.getItem("examina_demo_used") === "true") {
      setDemoUsed(true);
    }
  }, []);

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

      // Ensure arrays exist (guards against truncated-stream recovery)
      if (!Array.isArray(data.multipleChoice)) data.multipleChoice = [];
      if (!Array.isArray(data.flashcards)) data.flashcards = [];
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

  const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;
  const heroContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };
  const heroItem: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE_OUT },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {(isLoggedIn || quiz) && <AmbientBackground />}
      {!isLoggedIn && !quiz && !hideChrome && <SoundToggle />}
      {/* ========== NAVIGATION ========== */}
      {hideChrome ? null : sessionStatus === "loading" ? null : isLoggedIn || quiz ? (
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Examina" className="w-7 h-7 rounded-lg object-cover" />
              <span className="font-medium text-foreground tracking-tight">Examina</span>
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{t("nav.features")}</a>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{t("nav.pricing")}</Link>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{t("nav.faq")}</a>
              {isLoggedIn && (
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{t("nav.dashboard")}</Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle className="hidden sm:inline-flex" />
            {quiz && (
              <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                {t("nav.newQuiz")}
              </button>
            )}

            {isLoggedIn && usage ? (
              <UserMenu used={usedCount} limit={limitCount} planId={planId} />
            ) : !isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {t("nav.login")}
                </Link>
                <Link href="/auth/register" className="text-sm font-medium px-4 py-2 bg-foreground text-background hover:opacity-90 transition-colors duration-200">
                  {t("nav.getStarted")}
                </Link>
              </div>
            ) : null}

            <button
              className="sm:hidden text-muted-foreground hover:text-foreground"
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
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden border-t border-border px-6 py-4 space-y-3 bg-background"
          >
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Features</a>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Pricing</Link>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">FAQ</a>
            {isLoggedIn && (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Dashboard</Link>
            )}
          </motion.div>
        )}
      </motion.nav>
      ) : (
        <EditorialNav />
      )}

      {/* ========== MAIN CONTENT ========== */}
      <main className="relative z-10">
        {!quiz ? (
          <>
            {/* Hero */}
            {sessionStatus === "loading" ? null : (
            <section
              ref={heroRef}
              className={`relative overflow-hidden ${hideChrome ? "pt-6 pb-16" : "pb-32"} ${isLoggedIn ? "pt-36 sm:pt-48" : "bg-gradient-to-b from-[#FDE8EC] via-[#FBF1EE] to-[#FDE8EC] pt-40 sm:pt-48"}`}
            >
              {!isLoggedIn && !hideChrome && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <WaterCanvas className="pointer-events-none absolute inset-0 h-full w-full" />
                </div>
              )}
              <motion.div
                style={isLoggedIn ? undefined : { scale: diveScale, opacity: diveOpacity, y: diveY }}
                className="relative z-10 max-w-5xl mx-auto px-6"
              >
                {isLoggedIn ? (
                <motion.div
                  className="max-w-3xl"
                  variants={heroContainer}
                  initial="hidden"
                  animate="show"
                >
                  <motion.h1
                    variants={heroItem}
                    className="text-4xl sm:text-6xl lg:text-7xl font-medium text-foreground tracking-tight leading-[1.08] mb-8"
                  >
                    {t("hero.title1")}
                    <br />
                    <span className="font-serif italic text-accent">{t("hero.title2")}</span>
                  </motion.h1>

                  <motion.p
                    variants={heroItem}
                    className="text-lg text-muted-foreground max-w-xl mb-16 leading-relaxed"
                  >
                    {t("hero.subtitle")}
                  </motion.p>
                </motion.div>
                ) : hideChrome ? null : (
                <div className="mx-auto max-w-5xl text-center">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-[#A87680]">
                    A quiz generator
                  </p>
                  <h1 className="mt-8 font-serif text-7xl font-medium tracking-tight leading-[0.95] text-[#3B2027] sm:text-8xl lg:text-9xl">
                    <InteractiveWordmark />
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.55 }}
                    className="mx-auto mt-8 max-w-xl font-serif text-xl italic leading-relaxed text-[#8C5A68] sm:text-2xl"
                  >
                    Turn your study notes into structured quizzes, instantly.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.75 }}
                    className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
                  >
                    <a
                      href="#generate"
                      className="group flex items-center gap-3 rounded-full bg-[#3B2027] py-3 pl-6 pr-2 text-sm font-medium text-[#F6E3E8] transition-colors duration-200 hover:bg-[#52303B]"
                    >
                      <span>Start generating</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6E3E8] text-[#3B2027] transition-transform duration-200 group-hover:translate-x-0.5">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                        </svg>
                      </span>
                    </a>
                    <a
                      href="#selected"
                      className="text-sm text-[#9A7280] underline underline-offset-4 transition-colors duration-200 hover:text-[#3B2027]"
                    >
                      How it works
                    </a>
                  </motion.div>
                </div>
                )}

                <motion.div
                  variants={heroContainer}
                  initial="hidden"
                  animate="show"
                  transition={{ delayChildren: 0.25, staggerChildren: 0.08 }}
                >
                {/* Demo used — sign up CTA */}
                {!isLoggedIn && demoUsed && (
                  <motion.div variants={heroItem} className={`mb-12 flex items-center gap-6 ${isLoggedIn ? "" : "justify-center"}`}>
                    <Link href="/auth/register" className="px-6 py-3 bg-[#3B2027] text-[#F6E3E8] text-sm font-medium hover:bg-[#52303B] transition-colors duration-200">
                      {t("hero.createAccount")}
                    </Link>
                    <Link href="/auth/login" className="text-sm text-[#9A7280] hover:text-[#3B2027] transition-colors duration-200">
                      {t("hero.signIn")}
                    </Link>
                  </motion.div>
                )}

                {/* Demo hint */}
                {!isLoggedIn && canGenerateDemo && (
                  <motion.p variants={heroItem} className={`text-xs text-[#9A7280] mb-6 ${isLoggedIn ? "" : "text-center"}`}>{t("hero.demoHint")}</motion.p>
                )}

                {/* Limit reached */}
                {isLoggedIn && atLimit && !limitReached && (
                  <motion.div variants={heroItem} className="mb-8 p-5 rounded-2xl border border-[#F3D5DC] bg-white/70 backdrop-blur-xl shadow-sm flex items-center justify-between gap-4 max-w-2xl">
                    <div>
                      <p className="text-sm text-[#4A3038]">Monthly limit reached</p>
                      <p className="text-xs text-[#9A7280] mt-0.5">
                        {limitCount}/{limitCount} quizzes used on the {plan.name} plan.
                      </p>
                    </div>
                    <Link href="/pricing" className="shrink-0 px-4 py-2 bg-[#3B2027] text-[#F6E3E8] text-sm font-medium hover:bg-[#52303B] transition-colors duration-200">
                      Upgrade
                    </Link>
                  </motion.div>
                )}

                {/* Usage bar */}
                {isLoggedIn && usage && !isUnlimited && !atLimit && (
                  <motion.div variants={heroItem} className="max-w-md mb-8 flex items-center gap-3">
                    <div className="flex-1 h-px bg-[#F6E4EA] relative overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#E9A8B8] to-[#B0607A] absolute left-0 top-0"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (usedCount / limitCount) * 100)}%` }}
                        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
                      />
                    </div>
                    <span className="text-xs text-[#9A7280] shrink-0">{usedCount}/{limitCount}</span>
                  </motion.div>
                )}

                {/* Quiz Input */}
                {(isLoggedIn || canGenerateDemo) && (
                  <motion.div variants={heroItem} id="generate" className={`relative max-w-2xl scroll-mt-28 ${isLoggedIn ? "" : "mx-auto"}`}>
                    <div aria-hidden className="pointer-events-none absolute -inset-12 -z-10">
                      <div className="orb-drift h-44 w-44 bg-[#E9A8B8]/70" style={{ animationDelay: "-3s", top: "-3rem", left: "-4rem" }} />
                      <div className="orb-drift h-36 w-36 bg-[#F6DCE5]/90" style={{ animationDelay: "-8s", bottom: "-2rem", right: "-3.5rem" }} />
                      <div className="orb-drift h-28 w-28 bg-[#C98A98]/50" style={{ animationDelay: "-12s", top: "40%", right: "-6rem" }} />
                      <span className="twinkle absolute -top-3 left-8 h-1.5 w-1.5 rounded-full bg-[#B0607A]" />
                      <span className="twinkle absolute -top-6 right-1/4 h-2 w-2 rounded-full bg-[#E9A8B8]" style={{ animationDelay: "-1s" }} />
                      <span className="twinkle absolute -bottom-4 left-1/3 h-1.5 w-1.5 rounded-full bg-[#C98A98]" style={{ animationDelay: "-1.8s" }} />
                      <span className="twinkle absolute bottom-10 -right-4 h-2 w-2 rounded-full bg-[#F6DCE5]" style={{ animationDelay: "-0.6s" }} />
                      <span className="float-glyph -left-10 top-6 text-lg text-[#E9A8B8]">✦</span>
                      <span className="float-glyph -right-12 top-16 text-sm text-[#C98A98]" style={{ animationDelay: "-3s" }}>❀</span>
                      <span className="float-glyph left-6 -bottom-8 text-sm text-[#B0607A]/70" style={{ animationDelay: "-5s" }}>✦</span>
                    </div>
                    <motion.div
                      style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
                      onMouseMove={onTiltMove}
                      onMouseLeave={onTiltLeave}
                      className="relative will-change-transform"
                    >
                    <div className="animate-border rounded-3xl">
                    <div className="rounded-3xl border border-[#F3D5DC] bg-white/70 backdrop-blur-xl card-breathe overflow-hidden transition-all duration-300 hover:border-[#E9B8C4] focus-within:border-[#E9B8C4]">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(240px circle at var(--mx,50%) var(--my,50%), rgba(233,168,184,0.28), transparent 70%)",
                        }}
                      />
                      <div className="flex items-center justify-between px-5 pt-4 pb-2">
                        <span className="text-xs text-[#A87680] uppercase tracking-[0.2em]">{t("input.content")}</span>
                        <div className="flex items-center gap-4">
                          <input ref={fileInputRef} type="file" accept=".pdf,.txt,.md" onChange={handleFileUpload} className="hidden" id="file-upload" />
                          <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="text-xs text-[#9A7280] hover:text-[#3B2027] disabled:opacity-50 transition-colors duration-200">
                            {uploading ? t("input.extracting") : t("input.upload")}
                          </button>
                          <button onClick={loadExample} className="text-xs text-[#9A7280] hover:text-[#3B2027] transition-colors duration-200">
                            {t("input.example")}
                          </button>
                        </div>
                      </div>

                      <textarea
                        id="lesson-input"
                        ref={textareaRef}
                        value={lesson}
                        onChange={(e) => setLesson(e.target.value)}
                        placeholder={t("input.placeholder")}
                        className="w-full px-5 pb-4 min-h-40 text-sm text-[#4A3038] placeholder-neutral-400 bg-transparent resize-y focus:outline-none leading-relaxed"
                        aria-describedby="char-count"
                      />

                      {/* Character progress bar */}
                      <div className="h-0.5 bg-[#F6E4EA]">
                        <div
                          className={`h-full transition-all duration-200 ${charCount > 14000 ? "bg-warning" : "bg-gradient-to-r from-[#E9A8B8] to-[#B0607A]"}`}
                          style={{ width: `${Math.min(100, (charCount / 15000) * 100)}%` }}
                        />
                      </div>

                      {/* Image OCR */}
                      <div className="px-5 py-2 border-t border-[#F6E4EA]">
                        <ImageOCR onTextExtracted={(text) => setLesson((prev) => prev ? prev + "\n\n" + text : text)} />
                      </div>

                      <div className="flex items-center justify-between px-5 py-3 border-t border-[#F6E4EA]">
                        <div className="flex items-center gap-4">
                          <p id="char-count" className={`text-xs ${charCount < 50 ? "text-[#E9B8C4]" : charCount > 14000 ? "text-amber-500" : "text-[#9A7280]"}`}>
                            {charCount.toLocaleString()}/15k
                          </p>
                          <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="appearance-none bg-transparent border-none text-xs text-[#9A7280] focus:outline-none cursor-pointer hover:text-[#3B2027] transition-colors duration-200"
                          >
                            {LANGUAGES.map((lang) => (
                              <option key={lang.code} value={lang.code} className="bg-white text-[#4A3038]">
                                {lang.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <motion.button
                          onClick={handleGenerate}
                          disabled={!isReady || status === "loading" || atLimit}
                          whileHover={!isReady || status === "loading" || atLimit ? undefined : { scale: 1.02 }}
                          whileTap={!isReady || status === "loading" || atLimit ? undefined : { scale: 0.98 }}
                          className={`btn-sheen px-5 py-2 bg-[linear-gradient(120deg,#3B2027,#6A3A4C,#3B2027)] gradient-shift text-[#F6E3E8] text-sm font-medium disabled:opacity-60 transition-opacity duration-200 disabled:cursor-not-allowed ${isReady && status !== "loading" && !atLimit ? "btn-ready-rose" : ""}`}
                          aria-busy={status === "loading"}
                        >
                          {status === "loading" ? t("input.generating") : t("input.generate")}
                        </motion.button>
                      </div>
                    </div>
                    </div>
                    </motion.div>

                    {status === "error" && error && (
                      <div className="mt-4 p-4 rounded-2xl border border-[#F3D5DC] bg-white/70 backdrop-blur-xl shadow-sm text-sm text-[#9A7280]">
                        {error}
                        {limitReached && (
                          <Link href="/pricing" className="ml-2 underline text-[#3B2027]">Upgrade</Link>
                        )}
                      </div>
                    )}

                    {status === "loading" && (
                      <>
                      <div className="mt-8 flex items-center gap-3 text-[#9A7280]">
                        <div className="flex items-center gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-[#B0607A] animate-bounce"
                              style={{ animationDelay: `${i * 0.15}s` }}
                            />
                          ))}
                          <span className="spin-slow ml-1.5 inline-block text-xs text-[#B0607A]">✦</span>
                        </div>
                        <p className="text-xs">{t("input.reading")}</p>
                      </div>
                      <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-[#F6E4EA]">
                        <div className="shimmer-slide h-full w-1/3 rounded-full bg-gradient-to-r from-[#E9A8B8] to-[#B0607A]" />
                      </div>
                      </>
                    )}

                    {status === "idle" && (
                      <div className="mt-12">
                        <p className="text-xs text-[#A87680] uppercase tracking-[0.2em] mb-4">{t("input.orAsk")}</p>
                        <div className="relative">
                          <ChatBot onQuizGenerated={handleChatQuiz} />
                          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-8 h-24">
                            {[8, 26, 44, 62, 80].map((left, i) => (
                              <span
                                key={i}
                                className="ambient-particle"
                                style={{ left: `${left}%`, animationDelay: `${i * 1.1}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
                </motion.div>
                </motion.div>
            </section>
            )}

            {sessionStatus === "loading" ? null : !isLoggedIn && status === "idle" && <UnseenLanding />}
          </>
        ) : (
          /* ========== QUIZ RESULTS ========== */
          <div className="pt-28 pb-16">
            <div className="max-w-3xl mx-auto px-6">
              {!isLoggedIn && (
                <div className="mb-8 p-6 border border-[#F3D5DC] bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-24px_rgba(176,96,122,0.4)]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#4A3038]">{t("quiz.yourQuizReady")}</p>
                      <p className="text-xs text-[#9A7280] mt-1">{t("quiz.signUpToSave")}</p>
                    </div>
                    <Link href="/auth/register" className="shrink-0 px-5 py-2 bg-[#3B2027] text-[#F6E3E8] text-sm font-medium hover:bg-[#52303B] transition-colors">
                      {t("quiz.createAccount")}
                    </Link>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <p className="text-xs text-[#A87680] uppercase tracking-[0.15em] mb-3">{t("quiz.ready")}</p>
                <h2 className="animate-gradient-text text-2xl font-medium">{quiz.topic}</h2>
                <p className="text-sm text-[#9A7280] mt-2">
                  {quiz.multipleChoice.length} MCQ · {quiz.flashcards.length} flashcards
                  {quiz.fillInTheBlank?.length > 0 && ` · ${quiz.fillInTheBlank.length} fill-in-blank`}
                  {quiz.trueFalse?.length > 0 && ` · ${quiz.trueFalse.length} true/false`}
                </p>
                <div className="mt-5">
                  <VideoExplanationLink topic={quiz.topic} />
                </div>
              </div>

              {score && (
                <div className="mb-8 p-6 border border-[#F3D5DC] bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-24px_rgba(176,96,122,0.4)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#4A3038]">{t("quiz.complete")}</p>
                      <p className="text-xs text-[#9A7280] mt-0.5">{score.correct}/{score.total} {t("quiz.correct")}</p>
                    </div>
                    <div className="relative h-20 w-20">
                      <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#F6E4EA" strokeWidth="7" />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="34"
                          fill="none"
                          stroke="#B0607A"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 34}
                          initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - score.correct / score.total) }}
                          transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.25 }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xl font-medium text-[#B0607A]">
                        {Math.round((score.correct / score.total) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mb-8">
                {savedShareId && (
                  <button onClick={copyShareLink} className="text-sm text-[#9A7280] hover:text-[#3B2027] transition-colors">
                    {copied ? t("quiz.copied") : t("quiz.shareLink")}
                  </button>
                )}
                <button onClick={downloadPDF} className="text-sm text-[#9A7280] hover:text-[#3B2027] transition-colors">
                  {t("quiz.downloadPdf")}
                </button>
                {savedQuizId && isLoggedIn && (
                  <button onClick={() => setEditing(true)} className="text-sm text-[#B0607A] hover:opacity-80 transition-colors">
                    Edit Quiz
                  </button>
                )}
              </div>

              <div className="flex gap-6 mb-8 border-b border-[#F3D5DC] overflow-x-auto">
                {TABS.filter((tab) => {
                  if (tab.id === "fillblank") return (quiz.fillInTheBlank?.length ?? 0) > 0;
                  if (tab.id === "truefalse") return (quiz.trueFalse?.length ?? 0) > 0;
                  return true;
                }).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id ? "text-[#4A3038]" : "text-[#9A7280] hover:text-[#4A3038]"
                    }`}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.span
                        layoutId="active-tab-underline"
                        className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#B0607A]"
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {editing && savedQuizId ? (
                <QuizEditor
                  quiz={quiz}
                  quizId={savedQuizId}
                  onSave={(updated) => {
                    setQuiz(updated);
                    setEditing(false);
                  }}
                  onCancel={() => setEditing(false)}
                />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    role="tabpanel"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    {activeTab === "mcq" && <MultipleChoiceView questions={quiz.multipleChoice} onComplete={handleScoreUpdate} />}
                    {activeTab === "flashcards" && <FlashcardView flashcards={quiz.flashcards} quizId={savedQuizId} />}
                    {activeTab === "fillblank" && quiz.fillInTheBlank?.length > 0 && <FillInTheBlankView questions={quiz.fillInTheBlank} onComplete={handleScoreUpdate} />}
                    {activeTab === "truefalse" && quiz.trueFalse?.length > 0 && <TrueFalseView questions={quiz.trueFalse} onComplete={handleScoreUpdate} />}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ========== FOOTER ========== */}
      {!hideChrome && (
      <footer className="border-t border-[#F3D5DC]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Examina" className="w-6 h-6 rounded-lg object-cover" />
              <span className="text-sm text-[#9A7280]">Examina</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-[#9A7280]">
              <a href="#features" className="hover:text-[#3B2027] transition-colors">Features</a>
              <Link href="/pricing" className="hover:text-[#3B2027] transition-colors">Pricing</Link>
              <a href="#faq" className="hover:text-[#3B2027] transition-colors">FAQ</a>
              <Link href="/dashboard" className="hover:text-[#3B2027] transition-colors">Dashboard</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#F3D5DC]">
            <p className="text-xs text-[#9A7280]">&copy; {new Date().getFullYear()} Examina</p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
