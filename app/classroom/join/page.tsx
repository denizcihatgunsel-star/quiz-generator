"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JoinClassroom() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const handleJoin = async () => {
    if (!code.trim() || !nickname.trim()) return;
    setError(null);
    setJoining(true);

    try {
      const res = await fetch(`/api/classroom/${code.trim()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nickname.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to join");
        setJoining(false);
        return;
      }

      // Store participant info and navigate to play page
      sessionStorage.setItem("classroom_participant", JSON.stringify({
        participantId: data.participantId,
        nickname: data.nickname,
      }));

      router.push(`/classroom/play/${code.trim()}`);
    } catch {
      setError("Connection failed. Try again.");
      setJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-9 h-9 rounded-xl object-cover" />
            <span className="font-semibold text-neutral-900 text-lg">Examina</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-neutral-900 mb-1">Join a Live Quiz</h1>
          <p className="text-sm text-neutral-500 mb-6">Enter the code from your teacher</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Game Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-center text-2xl font-bold tracking-[0.3em] placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Your Nickname</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value.slice(0, 20))}
                placeholder="Enter your name"
                maxLength={20}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>
            )}

            <button
              onClick={handleJoin}
              disabled={code.length < 6 || !nickname.trim() || joining}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60 text-white text-sm font-medium transition-all shadow-lg shadow-violet-500/20 disabled:cursor-not-allowed"
            >
              {joining ? "Joining..." : "Join Game"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
