"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ReviewCard {
  id: string;
  front: string;
  back: string;
  interval: number;
  repetition: number;
  efactor: number;
}

export default function MobileStudy() {
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
    if (sessionStatus === "unauthenticated") router.push("/m/auth/login");
  }, [sessionStatus, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/flashcard-review")
        .then((r) => r.json())
        .then((d) => {
          setCards(d.cards);
          setDueCount(d.dueCount);
          setTotalCards(d.totalCards);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [session]);

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
      }, 180);
    } else {
      setCards([]);
      setSubmitting(false);
      submittingRef.current = false;
    }
  };

  if (sessionStatus === "loading" || loading) {
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

  const card = cards[currentIndex];

  return (
    <div>
      <p className="font-serif text-sm italic text-[#B0607A]">Spaced repetition</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
        Study <span className="font-serif italic text-[#B0607A]">mode</span>
      </h1>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-4 text-center shadow-[0_14px_40px_-28px_rgba(176,96,122,0.5)] backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#9A7280]">Due</p>
          <p className="mt-1 font-serif text-3xl text-[#3B2027]">{dueCount}</p>
        </div>
        <div className="rounded-2xl border border-[#F3D5DC] bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE] p-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#9A4F68]">Reviewed</p>
          <p className="mt-1 font-serif text-3xl text-[#B0607A]">{reviewed}</p>
        </div>
        <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-4 text-center shadow-[0_14px_40px_-28px_rgba(176,96,122,0.5)] backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#9A7280]">Total</p>
          <p className="mt-1 font-serif text-3xl text-[#3B2027]">{totalCards}</p>
        </div>
      </div>

      {totalCards === 0 ? (
        <div className="mt-8 rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-14 text-center backdrop-blur-xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]">
            <svg className="h-6 w-6 text-[#B0607A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="mb-2 font-serif text-xl italic text-[#3B2027]">No flashcards yet</p>
          <p className="mb-6 text-xs text-[#9A7280]">
            Generate a quiz first, then tap &quot;Add to Study Mode&quot; on the flashcards tab.
          </p>
          <Link href="/m/create" className="inline-block rounded-full bg-[#3B2027] px-6 py-3 text-sm font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]">
            Generate a quiz
          </Link>
        </div>
      ) : cards.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-14 text-center backdrop-blur-xl">
          <p className="mb-2 font-serif text-xl italic text-[#3B2027]">All caught up!</p>
          <p className="mb-2 text-sm text-[#9A7280]">You&apos;ve reviewed all due cards.</p>
          <p className="text-xs text-[#B4939F]">Reviewed {reviewed} cards this session.</p>
        </div>
      ) : card ? (
        <>
          <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-[#F6E4EA]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#B0607A] to-[#E9A8B8] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>

          <div
            className="flashcard-scene mt-6 h-64 cursor-pointer select-none"
            onClick={() => setFlipped((f) => !f)}
          >
            <div className={`flashcard-card ${flipped ? "flipped" : ""}`}>
              <div className="flashcard-face flashcard-front flex flex-col items-center justify-center rounded-2xl border border-[#F3D5DC] bg-white/80 p-7 shadow-[0_20px_60px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl">
                <p className="mb-4 font-serif text-xs italic uppercase tracking-[0.2em] text-[#B0607A]">Question</p>
                <p className="text-center text-lg font-medium leading-relaxed text-[#3B2027]">{card.front}</p>
                <p className="mt-5 text-xs text-[#B4939F]">Tap to reveal</p>
              </div>
              <div className="flashcard-face flashcard-back flex flex-col items-center justify-center rounded-2xl border border-[#E9B8C4] bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE] p-7 shadow-[0_20px_60px_-30px_rgba(176,96,122,0.55)]">
                <p className="mb-4 font-serif text-xs italic uppercase tracking-[0.2em] text-[#9A4F68]">Answer</p>
                <p className="text-center text-base leading-relaxed text-[#6E3345]">{card.back}</p>
              </div>
            </div>
          </div>

          {flipped && (
            <div className="mt-6">
              <p className="mb-3 text-center text-sm text-[#9A7280]">How well did you know this?</p>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleGrade(1)}
                  disabled={submitting}
                  className="rounded-full border border-[#F1C8C8] bg-[#FDF1F1] py-3 text-xs font-medium text-[#C25B5B] transition-colors hover:bg-[#F9E2E2] disabled:opacity-50"
                >
                  Again
                </button>
                <button
                  onClick={() => handleGrade(2)}
                  disabled={submitting}
                  className="rounded-full border border-[#F5DEC8] bg-[#FDF4EA] py-3 text-xs font-medium text-[#C07B3C] transition-colors hover:bg-[#F9E8D3] disabled:opacity-50"
                >
                  Hard
                </button>
                <button
                  onClick={() => handleGrade(4)}
                  disabled={submitting}
                  className="rounded-full border border-[#D4E8DC] bg-[#F0F8F3] py-3 text-xs font-medium text-[#3D8B5F] transition-colors hover:bg-[#DFEFE5] disabled:opacity-50"
                >
                  Good
                </button>
                <button
                  onClick={() => handleGrade(5)}
                  disabled={submitting}
                  className="rounded-full border border-[#D5E3F2] bg-[#F0F6FC] py-3 text-xs font-medium text-[#4A7FC0] transition-colors hover:bg-[#E1EDF9] disabled:opacity-50"
                >
                  Easy
                </button>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
