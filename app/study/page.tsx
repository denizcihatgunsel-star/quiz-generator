"use client";

import { useState, useEffect, useCallback } from "react";
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
    if (submitting || !cards[currentIndex]) return;
    setSubmitting(true);

    await fetch("/api/flashcard-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId: cards[currentIndex].id, grade }),
    });

    setReviewed((r) => r + 1);
    setFlipped(false);

    if (currentIndex < cards.length - 1) {
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setSubmitting(false);
      }, 200);
    } else {
      // All done
      setCards([]);
      setSubmitting(false);
    }
  };

  if (sessionStatus === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  const card = cards[currentIndex];

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <header className="border-b border-neutral-200 bg-[#f5f5f0]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
            <span className="font-semibold text-neutral-900 text-lg">Examina</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Study Mode</h1>
          <p className="text-neutral-500 mt-1">Spaced repetition — review flashcards at the optimal time.</p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm text-center">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Due Today</p>
            <p className="text-2xl font-bold text-neutral-900">{dueCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm text-center">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Reviewed</p>
            <p className="text-2xl font-bold text-violet-600">{reviewed}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm text-center">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Total Cards</p>
            <p className="text-2xl font-bold text-neutral-900">{totalCards}</p>
          </div>
        </div>

        {totalCards === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <p className="text-neutral-500 mb-4">No flashcards added to study mode yet.</p>
            <p className="text-sm text-neutral-400 mb-6">Generate a quiz first, then click &quot;Add to Study Mode&quot; on the flashcards tab.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium shadow-lg shadow-violet-500/20"
            >
              Generate a quiz
            </Link>
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <div className="text-5xl mb-4">&#127881;</div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">All caught up!</h2>
            <p className="text-neutral-500 mb-2">You&apos;ve reviewed all due cards. Come back later for more.</p>
            <p className="text-sm text-neutral-400">Reviewed {reviewed} cards this session.</p>
          </div>
        ) : card ? (
          <>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-neutral-200 rounded-full mb-6">
              <div
                className="h-full bg-violet-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
              />
            </div>

            {/* Card */}
            <div
              className="flashcard-scene cursor-pointer h-64 select-none mb-6"
              onClick={() => setFlipped((f) => !f)}
            >
              <div className={`flashcard-card ${flipped ? "flipped" : ""}`}>
                <div className="flashcard-face flashcard-front flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Question</p>
                  <p className="text-lg font-medium text-neutral-900 text-center leading-relaxed">{card.front}</p>
                  <p className="text-xs text-neutral-400 mt-5">Click to reveal</p>
                </div>
                <div className="flashcard-face flashcard-back flex flex-col items-center justify-center rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-8 shadow-sm">
                  <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Answer</p>
                  <p className="text-base text-violet-900 text-center leading-relaxed">{card.back}</p>
                </div>
              </div>
            </div>

            {/* Grade buttons — only show when flipped */}
            {flipped && (
              <div className="space-y-3">
                <p className="text-sm text-neutral-500 text-center">How well did you know this?</p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleGrade(1)}
                    disabled={submitting}
                    className="py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    Again
                  </button>
                  <button
                    onClick={() => handleGrade(2)}
                    disabled={submitting}
                    className="py-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 text-sm font-medium hover:bg-orange-100 transition-colors disabled:opacity-50"
                  >
                    Hard
                  </button>
                  <button
                    onClick={() => handleGrade(4)}
                    disabled={submitting}
                    className="py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-medium hover:bg-emerald-100 transition-colors disabled:opacity-50"
                  >
                    Good
                  </button>
                  <button
                    onClick={() => handleGrade(5)}
                    disabled={submitting}
                    className="py-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors disabled:opacity-50"
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
