"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  lastUsed: string | null;
  createdAt: string;
}

interface TeamData {
  id: string;
  name: string;
  inviteCode: string;
  members: Array<{ id: string; name: string | null; email: string; role: string }>;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);
  const [team, setTeam] = useState<TeamData | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      Promise.all([
        fetch("/api/keys").then((r) => r.json()),
        fetch("/api/team").then((r) => r.json()),
      ]).then(([keysData, teamData]) => {
        setApiKeys(keysData.keys || []);
        setTeam(teamData.team || null);
        setIsOwner(teamData.isOwner || false);
        setLoading(false);
      });
    }
  }, [session]);

  const busyRef = useRef(false);

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
        // Refresh keys
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
      // Refresh team
      const teamRes = await fetch("/api/team");
      const teamData = await teamRes.json();
      setTeam(teamData.team);
      setJoinCode("");
    } else {
      setError(data.error);
    }
    } finally {
      busyRef.current = false;
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (status === "loading" || loading) {
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
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
            <span className="font-semibold text-neutral-900 text-lg">Examina</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Dashboard</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Settings</h1>
          <p className="text-neutral-500 mt-1">API keys, team management</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>
        )}

        {/* API Keys */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest mb-4">API Keys</h2>
          <p className="text-sm text-neutral-500 mb-4">Use API keys to generate quizzes programmatically. Requires Pro or Team plan.</p>

          {createdKey && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <p className="text-xs text-emerald-700 font-medium mb-1">New key created — copy it now, it won&apos;t be shown again:</p>
              <div className="flex gap-2">
                <code className="flex-1 text-xs bg-white px-2 py-1 rounded border border-emerald-200 text-emerald-800 font-mono break-all">{createdKey}</code>
                <button onClick={() => { copyText(createdKey, "newkey"); setCreatedKey(null); }} className="text-xs text-emerald-600 hover:underline shrink-0">
                  {copied === "newkey" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}

          {apiKeys.length > 0 && (
            <div className="space-y-2 mb-4">
              {apiKeys.map((k) => (
                <div key={k.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{k.name}</p>
                    <p className="text-xs text-neutral-400 font-mono">{k.key}</p>
                  </div>
                  <button onClick={() => deleteKey(k.id)} className="text-xs text-red-400 hover:text-red-600">Revoke</button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Key name (optional)"
              className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
            <button onClick={createKey} className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors">
              Create Key
            </button>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
            <p className="text-xs font-medium text-neutral-700 mb-1">API Usage:</p>
            <code className="text-xs text-neutral-500 block">
              curl -X POST https://www.examina.ink/api/v1/generate \<br />
              &nbsp;&nbsp;-H &quot;Authorization: Bearer exm_your_key&quot; \<br />
              &nbsp;&nbsp;-H &quot;Content-Type: application/json&quot; \<br />
              &nbsp;&nbsp;-d &apos;{`{"content": "Your lesson text...", "language": "English"}`}&apos;
            </code>
          </div>
        </div>

        {/* Team */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest mb-4">Team</h2>

          {team ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-medium text-neutral-900">{team.name}</p>
                  <p className="text-xs text-neutral-400">{team.members.length}/5 members</p>
                </div>
                {isOwner && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">Invite code:</span>
                    <code className="text-xs font-mono bg-neutral-50 px-2 py-1 rounded border border-neutral-200">{team.inviteCode}</code>
                    <button onClick={() => copyText(team.inviteCode, "invite")} className="text-xs text-violet-600 hover:underline">
                      {copied === "invite" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {team.members.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{m.name || "Unnamed"}</p>
                      <p className="text-xs text-neutral-400">{m.email}</p>
                    </div>
                    <span className="text-xs text-neutral-400 capitalize">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-neutral-500">Create a team to share quizzes with up to 5 members. Requires Team plan.</p>

              <div className="flex gap-2">
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Team name"
                  className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
                <button onClick={createTeam} className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors">
                  Create Team
                </button>
              </div>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-neutral-200" />
                <span className="text-xs text-neutral-400">or join existing</span>
                <div className="flex-1 h-px bg-neutral-200" />
              </div>

              <div className="flex gap-2">
                <input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="Enter invite code"
                  className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
                <button onClick={joinTeam} className="px-4 py-2 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                  Join
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
