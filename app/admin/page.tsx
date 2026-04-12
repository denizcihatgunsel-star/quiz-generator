"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserItem {
  id: string;
  name: string | null;
  email: string;
  role: string;
  plan: string;
  createdAt: string;
}

const PLANS = ["free", "starter", "plus", "pro", "team"];
const ROLES = ["student", "teacher"];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/admin/users")
        .then((r) => {
          if (r.status === 403) throw new Error("Access denied");
          return r.json();
        })
        .then((d) => setUsers(d.users ?? []))
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [session]);

  const updateUser = async (userId: string, data: { plan?: string; role?: string }) => {
    setUpdating(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...data }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? { ...u, ...(data.plan ? { plan: data.plan } : {}), ...(data.role ? { role: data.role } : {}) }
              : u
          )
        );
      }
    } catch {
      // ignore
    }
    setUpdating(null);
  };

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

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

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium mb-2">Access Denied</p>
          <p className="text-sm text-neutral-500">You are not authorized to view this page.</p>
          <Link href="/" className="text-sm text-violet-600 hover:underline mt-4 block">Go home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <header className="border-b border-neutral-200 bg-[#f5f5f0]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
            <span className="font-semibold text-neutral-900 text-lg">Examina</span>
            <span className="px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-medium">Admin</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Admin Panel</h1>
          <p className="text-neutral-500 mt-1">{users.length} total users</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full max-w-md px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition"
          />
        </div>

        {/* Users table */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-widest">User</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-widest">Role</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-widest">Plan</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-widest">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-neutral-900">{u.name || "—"}</p>
                    <p className="text-xs text-neutral-400">{u.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => updateUser(u.id, { role: e.target.value })}
                      disabled={updating === u.id}
                      className="px-2 py-1 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-500/40 disabled:opacity-50"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={u.plan}
                      onChange={(e) => updateUser(u.id, { plan: e.target.value })}
                      disabled={updating === u.id}
                      className={`px-2 py-1 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/40 disabled:opacity-50 ${
                        u.plan === "team"
                          ? "border-violet-200 bg-violet-50 text-violet-700"
                          : u.plan === "pro"
                          ? "border-amber-200 bg-amber-50 text-amber-700"
                          : u.plan === "plus"
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : u.plan === "starter"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-neutral-200 bg-neutral-50 text-neutral-700"
                      }`}
                    >
                      {PLANS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-xs text-neutral-400">
                    {new Date(u.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-sm text-neutral-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
