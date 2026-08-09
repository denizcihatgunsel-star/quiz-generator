"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileJoinClassroom() {
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
    <div className="pt-4">
      <p className="font-serif text-sm italic text-[#B0607A]">Live classroom</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
        Join a <span className="font-serif italic text-[#B0607A]">live quiz</span>
      </h1>
      <p className="mt-2 text-sm text-[#9A7280]">Enter the code from your teacher.</p>

      <div className="mt-7 rounded-2xl border border-[#F3D5DC] bg-white/75 p-6 shadow-[0_20px_60px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#3B2027]">Game Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              className="w-full rounded-xl border border-[#F3D5DC] bg-white px-4 py-4 text-center text-3xl font-bold tracking-[0.3em] text-[#3B2027] placeholder:text-[#F3D5DC] focus:border-[#B0607A] focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#3B2027]">Your Nickname</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value.slice(0, 20))}
              placeholder="Enter your name"
              maxLength={20}
              className="w-full rounded-xl border border-[#F3D5DC] bg-white/80 px-4 py-3 text-sm text-[#3B2027] placeholder:text-[#B4939F] focus:border-[#B0607A] focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-[#F1C8C8] bg-[#FDF1F1] px-3.5 py-2.5 text-sm text-[#C25B5B]">{error}</p>
          )}

          <button
            onClick={handleJoin}
            disabled={code.length < 6 || !nickname.trim() || joining}
            className="w-full rounded-full bg-[#3B2027] py-3.5 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98] disabled:opacity-60"
          >
            {joining ? "Joining..." : "Join Game"}
          </button>
        </div>
      </div>
    </div>
  );
}
