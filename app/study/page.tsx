"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

interface ReviewCard {
  id: string;
  front: string;
  back: string;
  interval: number;
  repetition: number;
  efactor: number;
}

const ARROW = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

export default function StudyPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [cards, setCards] = useState<ReviewCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dueCount, setDueCount] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [reviewed, setReviewed] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const advanceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (sessionStatus === "unauthenticated") router.push("/auth/login");
  }, [sessionStatus, router]);

  const fetchCards = useCallback(async () => {
    const res = await fetch("/api/flashcard-review");
    if (res.ok) {
      const data = await res.json();
      setCards(data.cards);
      setDueCount(data.dueCount);
      setTotalCards(data.totalCards);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (session) fetchCards();
  }, [session, fetchCards]);

  const handleGrade = async (grade: number) => {
    if (submittingRef.current || !cards[currentIndex]) return;
    submittingRef.current = true;
    setSubmitting(true);

    try {
      await fetch("/api/flashcard-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: cards[currentIndex].id, grade }),
      });
    } catch { /* ignore */ }

    setReviewed((r) => r + 1);
    setFlipped(false);

    if (currentIndex < cards.length - 1) {
      advanceTimerRef.current = window.setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setSubmitting(false);
        submittingRef.current = false;
      }, 200);
    } else {
      // All done
      setCards([]);
      setSubmitting(false);
      submittingRef.current = false;
    }
  };

  if (sessionStatus === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 animate-bounce rounded-full bg-[#B0607A]"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const card = cards[currentIndex];

  const statCard =
    "rounded-2xl border border-[#F3D5DC] bg-white/70 p-5 text-center shadow-[0_16px_50px_-28px_rgba(176,96,122,0.45)] backdrop-blur-xl";

  const statLabel =
    "mb-1 text-[11px] uppercase tracking-[0.18em] text-[#9A7280]";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <p className="mb-3 font-serif text-sm italic text-[#B0607A]">Spaced repetition</p>
          <h1 className="text-4xl font-medium tracking-tight text-[#3B2027] sm:text-5xl">
            Study <span className="font-serif italic text-[#B0607A]">mode</span>
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#9A7280]">
            Review flashcards at the optimal time.
          </p>
        </div>

        {/* Stats bar */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className={statCard}>
            <p className={statLabel}>Due Today</p>
            <p className="font-serif text-4xl text-[#3B2027]">{dueCount}</p>
          </div>
          <div className={`${statCard} bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]`}>
            <p className={`${statLabel} text-[#9A4F68]`}>Reviewed</p>
            <p className="font-serif text-4xl text-[#B0607A]">{reviewed}</p>
          </div>
          <div className={statCard}>
            <p className={statLabel}>Total Cards</p>
            <p className="font-serif text-4xl text-[#3B2027]">{totalCards}</p>
          </div>
        </div>

        {totalCards === 0 ? (
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-20 text-center backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]">
              <svg className="h-7 w-7 text-[#B0607A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="mb-2 font-serif text-2xl italic text-[#3B2027]">No flashcards yet</p>
            <p className="mb-8 text-sm text-[#9A7280]">
              Generate a quiz first, then click &quot;Add to Study Mode&quot; on the flashcards tab.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#3B2027] px-6 py-3 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] hover:shadow-[0_16px_38px_-12px_rgba(59,32,39,0.65)] active:scale-[0.98]"
            >
              Generate a quiz {ARROW}
            </Link>
          </div>
        ) : cards.length === 0 ? (
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-20 text-center backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]">
              <svg className="h-7 w-7 text-[#B0607A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="mb-2 font-serif text-2xl italic text-[#3B2027]">All caught up!</h2>
            <p className="mb-2 text-sm text-[#9A7280]">You&apos;ve reviewed all due cards. Come back later for more.</p>
            <p className="text-sm text-[#B4939F]">Reviewed {reviewed} cards this session.</p>
          </div>
        ) : card ? (
          <>
            {/* Progress bar */}
            <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[#F6E4EA]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#B0607A] to-[#E9A8B8] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
              />
            </div>

            {/* Card */}
            <div
              className="flashcard-scene mb-6 h-64 cursor-pointer select-none"
              onClick={() => setFlipped((f) => !f)}
            >
              <div className={`flashcard-card ${flipped ? "flipped" : ""}`}>
                <div className="flashcard-face flashcard-front flex flex-col items-center justify-center rounded-2xl border border-[#F3D5DC] bg-white/80 p-8 shadow-[0_20px_60px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl">
                  <p className="mb-4 font-serif text-xs italic uppercase tracking-[0.2em] text-[#B0607A]">Question</p>
                  <p className="text-center text-lg font-medium leading-relaxed text-[#3B2027]">{card.front}</p>
                  <p className="mt-5 text-xs text-[#B4939F]">Click to reveal</p>
                </div>
                <div className="flashcard-face flashcard-back flex flex-col items-center justify-center rounded-2xl border border-[#E9B8C4] bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE] p-8 shadow-[0_20px_60px_-30px_rgba(176,96,122,0.55)]">
                  <p className="mb-4 font-serif text-xs italic uppercase tracking-[0.2em] text-[#9A4F68]">Answer</p>
                  <p className="text-center text-base leading-relaxed text-[#6E3345]">{card.back}</p>
                </div>
              </div>
            </div>

            {/* Grade buttons — only show when flipped */}
            {flipped && (
              <div className="space-y-3">
                <p className="text-center text-sm text-[#9A7280]">How well did you know this?</p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleGrade(1)}
                    disabled={submitting}
                    className="rounded-full border border-[#F1C8C8] bg-[#FDF1F1] py-3 text-sm font-medium text-[#C25B5B] transition-colors hover:bg-[#F9E2E2] disabled:opacity-50"
                  >
                    Again
                  </button>
                  <button
                    onClick={() => handleGrade(2)}
                    disabled={submitting}
                    className="rounded-full border border-[#F5DEC8] bg-[#FDF4EA] py-3 text-sm font-medium text-[#C07B3C] transition-colors hover:bg-[#F9E8D3] disabled:opacity-50"
                  >
                    Hard
                  </button>
                  <button
                    onClick={() => handleGrade(4)}
                    disabled={submitting}
                    className="rounded-full border border-[#D4E8DC] bg-[#F0F8F3] py-3 text-sm font-medium text-[#3D8B5F] transition-colors hover:bg-[#DFEFE5] disabled:opacity-50"
                  >
                    Good
                  </button>
                  <button
                    onClick={() => handleGrade(5)}
                    disabled={submitting}
                    className="rounded-full border border-[#D5E3F2] bg-[#F0F6FC] py-3 text-sm font-medium text-[#4A7FC0] transition-colors hover:bg-[#E1EDF9] disabled:opacity-50"
                  >
                    Easy
                  </button>
                </div>
              </div>
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}
