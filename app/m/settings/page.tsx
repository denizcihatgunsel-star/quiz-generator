"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function MobileSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [team, setTeam] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const busyRef = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/m/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      Promise.all([fetch("/api/keys").then((r) => r.json()), fetch("/api/team").then((r) => r.json())])
        .then(([keysData, teamData]) => {
          setApiKeys(keysData.keys || []);
          setTeam(teamData.team || null);
          setIsOwner(teamData.isOwner || false);
          setLoading(false);
        });
    }
  }, [session]);

  const createKey = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setError(null);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName || "Default" }),
      });
      const data = await res.json();
      if (res.ok) {
        setCreatedKey(data.key);
        setNewKeyName("");
        const keysRes = await fetch("/api/keys");
        const keysData = await keysRes.json();
        setApiKeys(keysData.keys || []);
      } else {
        setError(data.error);
      }
    } finally {
      busyRef.current = false;
    }
  };

  const deleteKey = async (keyId: string) => {
    if (busyRef.current) return;
    busyRef.current = true;
    try {
      await fetch("/api/keys", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyId }),
      });
      setApiKeys((prev) => prev.filter((k) => k.id !== keyId));
    } finally {
      busyRef.current = false;
    }
  };

  const createTeam = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setError(null);
    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: teamName || "My Team" }),
      });
      const data = await res.json();
      if (res.ok) {
        setTeam(data.team);
        setIsOwner(true);
        setTeamName("");
      } else {
        setError(data.error);
      }
    } finally {
      busyRef.current = false;
    }
  };

  const joinTeam = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setError(null);
    try {
      const res = await fetch("/api/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode: joinCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setTeam(data.team);
        setJoinCode("");
      } else {
        setError(data.error);
      }
    } finally {
      busyRef.current = false;
    }
  };

  if (status === "loading" || loading) {
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

  const card = "rounded-2xl border border-[#F3D5DC] bg-white/75 p-5 shadow-[0_14px_40px_-28px_rgba(176,96,122,0.5)] backdrop-blur-xl";
  const input =
    "w-full rounded-xl border border-[#F3D5DC] bg-white/80 px-4 py-3 text-sm text-[#3B2027] placeholder:text-[#B4939F] focus:border-[#B0607A] focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30";

  return (
    <div>
      <p className="font-serif text-sm italic text-[#B0607A]">Settings</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">Your <span className="font-serif italic text-[#B0607A]">account</span></h1>

      {error && (
        <p className="mt-5 rounded-xl border border-[#F1C8C8] bg-[#FDF1F1] px-3.5 py-2.5 text-sm text-[#C25B5B]">{error}</p>
      )}

      <section className={`${card} mt-6`}>
        <h2 className="mb-1 font-serif text-lg italic text-[#3B2027]">API keys</h2>
        <p className="mb-4 text-xs text-[#9A7280]">Use keys to generate quizzes from your own apps.</p>
        {createdKey && (
          <div className="mb-4 rounded-xl border border-[#E9B8C4] bg-[#FDE8EC] px-4 py-3">
            <p className="mb-1 text-xs font-medium text-[#9A4F68]">Copy your key — it won&apos;t be shown again:</p>
            <code className="break-all text-xs text-[#3B2027]">{createdKey}</code>
          </div>
        )}
        {apiKeys.map((k) => (
          <div key={k.id} className="mb-2 flex items-center justify-between gap-3 rounded-xl border border-[#F3D5DC] bg-white/70 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#3B2027]">{k.name}</p>
              <p className="text-xs text-[#9A7280]">{new Date(k.createdAt).toLocaleDateString()}</p>
            </div>
            <button onClick={() => deleteKey(k.id)} className="shrink-0 rounded-full border border-[#F3D5DC] px-3.5 py-1.5 text-xs text-[#9A7280] hover:border-[#C25B5B]/20 hover:text-[#C25B5B]">
              Revoke
            </button>
          </div>
        ))}
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Key name"
            className={input}
          />
          <button onClick={createKey} className="shrink-0 rounded-full bg-[#3B2027] px-5 py-3 text-sm font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]">
            Create
          </button>
        </div>
      </section>

      <section className={`${card} mt-5`}>
        <h2 className="mb-1 font-serif text-lg italic text-[#3B2027]">Team</h2>
        <p className="mb-4 text-xs text-[#9A7280]">Share quizzes with your team.</p>
        {team ? (
          <div className="rounded-xl border border-[#F3D5DC] bg-white/70 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#3B2027]">{team.name}</p>
                <p className="text-xs text-[#9A7280]">{isOwner ? "Owner" : "Member"}</p>
              </div>
              {isOwner && (
                <button onClick={() => navigator.clipboard.writeText(team.inviteCode)} className="rounded-full border border-[#F3D5DC] px-3.5 py-1.5 text-xs text-[#9A7280] hover:text-[#3B2027]">
                  Copy invite
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team name"
                className={input}
              />
              <button onClick={createTeam} className="shrink-0 rounded-full bg-[#3B2027] px-5 py-3 text-sm font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]">
                Create
              </button>
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Invite code"
                className={input}
              />
              <button onClick={joinTeam} className="shrink-0 rounded-full border border-[#F3D5DC] px-5 py-3 text-sm font-medium text-[#7E3E55] transition-colors hover:bg-[#F6EBEE]">
                Join
              </button>
            </div>
          </>
        )}
      </section>

      <Link
        href="/pricing"
        className={`${card} mt-5 flex items-center justify-between`}
      >
        <div>
          <p className="font-serif text-lg italic text-[#3B2027]">Plans &amp; billing</p>
          <p className="mt-0.5 text-xs text-[#9A7280]">Compare plans and upgrade</p>
        </div>
        <span className="text-[#B0607A]">→</span>
      </Link>

      <button
        onClick={() => signOut({ callbackUrl: "/m" })}
        className="mt-5 w-full rounded-full border border-[#F1C8C8] bg-[#FDF1F1] py-3.5 text-sm font-medium text-[#C25B5B] transition-colors hover:bg-[#F9E2E2]"
      >
        Sign out
      </button>
    </div>
  );
}
