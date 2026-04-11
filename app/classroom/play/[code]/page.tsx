"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";

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
  participants: Array<{ id: string; nickname: string; score: number }>;
}

export default function PlayPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [state, setState] = useState<SessionState | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<{ correct: boolean; points: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lastAnsweredQuestion, setLastAnsweredQuestion] = useState(-1);

  // Load participant info from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem("classroom_participant");
    if (stored) {
      const data = JSON.parse(stored);
      setParticipantId(data.participantId);
      setNickname(data.nickname);
    }
  }, []);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch(`/api/classroom/${code}`);
      if (res.ok) {
        const data = await res.json();
        setState(data);

        // Reset answer state when question changes
        if (data.currentQuestion !== lastAnsweredQuestion && data.currentQuestion >= 0) {
          if (data.currentQuestion > lastAnsweredQuestion) {
            setSelectedAnswer(null);
            setAnswerResult(null);
          }
        }
      }
    } catch {
      // retry on next poll
    }
  }, [code, lastAnsweredQuestion]);

  // Poll every 2 seconds
  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 2000);
    return () => clearInterval(interval);
  }, [fetchState]);

  const submitAnswer = async (answerIndex: number) => {
    if (submitting || !participantId || answerResult) return;
    setSelectedAnswer(answerIndex);
    setSubmitting(true);

    try {
      const res = await fetch(`/api/classroom/${code}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, answerIndex }),
      });

      const data = await res.json();
      if (res.ok) {
        setAnswerResult({ correct: data.correct, points: data.points });
        setLastAnsweredQuestion(state?.currentQuestion ?? -1);
      }
    } catch {
      // ignore
    }
    setSubmitting(false);
  };

  // Find my score
  const myScore = state?.participants.find((p) => p.id === participantId)?.score ?? 0;
  const myRank = state?.participants.findIndex((p) => p.id === participantId) ?? -1;

  if (!participantId) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">Session expired. Please rejoin.</p>
          <Link href="/classroom/join" className="text-violet-600 font-medium hover:underline">
            Go to Join Page
          </Link>
        </div>
      </div>
    );
  }

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

  const optionColors = [
    { bg: "bg-red-500 hover:bg-red-600", selected: "bg-red-600 ring-4 ring-red-300" },
    { bg: "bg-blue-500 hover:bg-blue-600", selected: "bg-blue-600 ring-4 ring-blue-300" },
    { bg: "bg-emerald-500 hover:bg-emerald-600", selected: "bg-emerald-600 ring-4 ring-emerald-300" },
    { bg: "bg-amber-500 hover:bg-amber-600", selected: "bg-amber-600 ring-4 ring-amber-300" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Top bar */}
      <div className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-900">{nickname}</span>
        <span className="text-sm font-bold text-violet-600">{myScore} pts</span>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Waiting in lobby */}
        {(state.status === "lobby" || state.currentQuestion === -1) && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">&#9203;</div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">You&apos;re in!</h2>
            <p className="text-neutral-500 mb-2">Waiting for the host to start...</p>
            <p className="text-sm text-neutral-400">{state.topic}</p>
            <div className="mt-6 flex gap-1 justify-center">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          </div>
        )}

        {/* Active question */}
        {state.status === "question" && state.question && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-neutral-400">
                Question {state.question.index + 1} / {state.totalQuestions}
              </p>
              {myRank >= 0 && (
                <p className="text-sm text-neutral-400">
                  Rank: #{myRank + 1}
                </p>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm mb-6">
              <p className="text-lg font-bold text-neutral-900 text-center leading-relaxed">
                {state.question.question}
              </p>
            </div>

            {answerResult ? (
              <div className={`text-center py-8 rounded-2xl border ${
                answerResult.correct
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-red-50 border-red-200"
              }`}>
                <div className="text-4xl mb-2">
                  {answerResult.correct ? "\u2705" : "\u274C"}
                </div>
                <p className={`text-xl font-bold ${
                  answerResult.correct ? "text-emerald-700" : "text-red-700"
                }`}>
                  {answerResult.correct ? `+${answerResult.points} points!` : "Incorrect"}
                </p>
                <p className="text-sm text-neutral-500 mt-2">Waiting for next question...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {state.question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => submitAnswer(i)}
                    disabled={submitting || answerResult !== null}
                    className={`p-5 rounded-xl text-white font-bold text-base transition-all disabled:opacity-60 ${
                      selectedAnswer === i
                        ? optionColors[i % 4].selected
                        : optionColors[i % 4].bg
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Finished */}
        {state.status === "finished" && (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">
              {myRank === 0 ? "\u{1F947}" : myRank === 1 ? "\u{1F948}" : myRank === 2 ? "\u{1F949}" : "\u{1F389}"}
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">
              {myRank === 0 ? "You won!" : `#${myRank + 1} place!`}
            </h2>
            <p className="text-lg text-violet-600 font-bold mb-6">{myScore} points</p>

            <div className="max-w-sm mx-auto p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest mb-4">Final Standings</h3>
              <div className="space-y-2">
                {state.participants.map((p, i) => (
                  <div key={p.id} className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                    p.id === participantId ? "bg-violet-50 border border-violet-200" : "bg-neutral-50"
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-neutral-500">#{i + 1}</span>
                      <span className="text-sm font-medium text-neutral-900">
                        {p.nickname} {p.id === participantId && "(You)"}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-violet-600">{p.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
