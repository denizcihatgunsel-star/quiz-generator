"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { LoadingDots } from "@/components/ui";

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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingDots />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="mb-2 font-medium text-danger">Access Denied</p>
          <p className="text-sm text-muted-foreground">You are not authorized to view this page.</p>
          <Link href="/" className="mt-4 block text-sm text-accent hover:underline">Go home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">{users.length} total users</p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="flex h-10 w-full max-w-md rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">User</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Role</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Plan</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-border transition-colors last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-foreground">{u.name || "—"}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => updateUser(u.id, { role: e.target.value })}
                      disabled={updating === u.id}
                      className="rounded-lg border border-border bg-background px-2 py-1 text-sm text-foreground transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
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
                      className={`rounded-lg border px-2 py-1 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${
                        u.plan === "team"
                          ? "border-accent/20 bg-accent-soft text-accent"
                          : u.plan === "pro"
                          ? "border-[color:var(--warning)]/20 bg-[color:var(--warning)]/10 text-[color:var(--warning)]"
                          : u.plan === "plus"
                          ? "border-accent/20 bg-accent-soft text-accent"
                          : u.plan === "starter"
                          ? "border-[color:var(--success)]/20 bg-[color:var(--success)]/10 text-[color:var(--success)]"
                          : "border-border bg-background text-foreground"
                      }`}
                    >
                      {PLANS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">
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
                  <td colSpan={4} className="px-5 py-8 text-center text-sm text-muted-foreground">
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
