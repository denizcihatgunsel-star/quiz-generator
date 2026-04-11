"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Participant {
  id: string;
  nickname: string;
  score: number;
}

interface SessionState {
  code: string;
  topic: string;
  status: string;
  currentQuestion: number;
  totalQuestions: number;
  question: {
    index: number;
    question: string;
    type: string;
    options: string[];
  } | null;
  participants: Participant[];
}

export default function HostPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const { data: session } = useSession();
  const router = useRouter();
  const [state, setState] = useState<SessionState | null>(null);
  const [advancing, setAdvancing] = useState(false);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch(`/api/classroom/${code}`);
      if (res.ok) {
        const data = await res.json();
        setState(data);
      }
    } catch {
      // retry on next poll
    }
  }, [code]);

  // Poll every 2 seconds
  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 2000);
    return () => clearInterval(interval);
  }, [fetchState]);

  const nextQuestion = async () => {
    setAdvancing(true);
    await fetch(`/api/classroom/${code}/next`, { method: "POST" });
    await fetchState();
    setAdvancing(false);
  };

  if (!state) {
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

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <header className="border-b border-neutral-200 bg-[#f5f5f0]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
            <span className="font-semibold text-neutral-900 text-lg">Examina</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-500">{state.topic}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Lobby */}
        {(state.status === "lobby" || state.currentQuestion === -1) && (
          <div className="text-center">
            <div className="mb-8">
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Join Code</p>
              <p className="text-7xl font-bold text-neutral-900 tracking-[0.2em] font-mono">{state.code}</p>
              <p className="text-neutral-500 mt-3">Share this code with your students</p>
              <p className="text-sm text-neutral-400 mt-1">Or go to <span className="font-medium text-violet-600">examina.ink/classroom/join</span></p>
            </div>

            <div className="mb-8 p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <p className="text-sm font-medium text-neutral-900 mb-4">
                {state.participants.length} {state.participants.length === 1 ? "player" : "players"} joined
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {state.participants.map((p) => (
                  <span key={p.id} className="px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-sm text-violet-700 font-medium">
                    {p.nickname}
                  </span>
                ))}
                {state.participants.length === 0 && (
                  <p className="text-sm text-neutral-400">Waiting for players...</p>
                )}
              </div>
            </div>

            <button
              onClick={nextQuestion}
              disabled={state.participants.length === 0 || advancing}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-lg shadow-lg shadow-violet-500/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {advancing ? "Starting..." : "Start Quiz"}
            </button>
          </div>
        )}

        {/* Active question */}
        {state.status === "question" && state.question && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-400">
                Question {state.question.index + 1} of {state.totalQuestions}
              </p>
              <p className="text-sm text-neutral-400">
                {state.participants.length} players
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-neutral-200 rounded-full mb-8">
              <div
                className="h-full bg-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${((state.question.index + 1) / state.totalQuestions) * 100}%` }}
              />
            </div>

            <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm mb-8">
              <p className="text-2xl font-bold text-neutral-900 text-center leading-relaxed">
                {state.question.question}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {state.question.options.map((opt, i) => {
                const colors = [
                  "bg-red-50 border-red-200 text-red-700",
                  "bg-blue-50 border-blue-200 text-blue-700",
                  "bg-emerald-50 border-emerald-200 text-emerald-700",
                  "bg-amber-50 border-amber-200 text-amber-700",
                ];
                return (
                  <div key={i} className={`p-5 rounded-xl border ${colors[i % 4]} text-center font-medium`}>
                    {opt}
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={nextQuestion}
                disabled={advancing}
                className="px-8 py-3 rounded-xl bg-neutral-900 text-white font-medium hover:bg-neutral-700 disabled:opacity-60 transition-colors"
              >
                {state.question.index + 1 >= state.totalQuestions
                  ? "Show Final Results"
                  : advancing ? "Loading..." : "Next Question"}
              </button>
            </div>

            {/* Live leaderboard */}
            <div className="mt-8 p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest mb-4">Leaderboard</h3>
              <div className="space-y-2">
                {state.participants.map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-neutral-50">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        i === 0 ? "bg-amber-100 text-amber-700" :
                        i === 1 ? "bg-neutral-200 text-neutral-600" :
                        i === 2 ? "bg-orange-100 text-orange-700" :
                        "bg-neutral-100 text-neutral-500"
                      }`}>{i + 1}</span>
                      <span className="text-sm font-medium text-neutral-900">{p.nickname}</span>
                    </div>
                    <span className="text-sm font-bold text-violet-600">{p.score} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Finished */}
        {state.status === "finished" && (
          <div className="text-center">
            <div className="text-5xl mb-4">&#127942;</div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Quiz Complete!</h2>
            <p className="text-neutral-500 mb-8">{state.topic}</p>

            <div className="max-w-md mx-auto p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm mb-8">
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest mb-4">Final Standings</h3>
              <div className="space-y-3">
                {state.participants.map((p, i) => (
                  <div key={p.id} className={`flex items-center justify-between py-3 px-4 rounded-xl ${
                    i === 0 ? "bg-amber-50 border border-amber-200" : "bg-neutral-50 border border-neutral-100"
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className={`text-xl ${i === 0 ? "" : ""}`}>
                        {i === 0 ? "\u{1F947}" : i === 1 ? "\u{1F948}" : i === 2 ? "\u{1F949}" : `#${i + 1}`}
                      </span>
                      <span className="text-sm font-medium text-neutral-900">{p.nickname}</span>
                    </div>
                    <span className="text-lg font-bold text-violet-600">{p.score} pts</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white font-medium hover:bg-neutral-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
