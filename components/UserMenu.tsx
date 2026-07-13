"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { PLANS, type PlanId } from "@/lib/subscription";

interface UserMenuProps {
  used: number;
  limit: number;
  planId: PlanId;
}

export default function UserMenu({ used, limit, planId }: UserMenuProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const plan = PLANS[planId];
  const isUnlimited = plan.quizzesPerMonth === Infinity;
  const pct = isUnlimited ? 0 : Math.min(100, (used / limit) * 100);
  const nearLimit = !isUnlimited && used >= limit - 1;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!session) return null;

  const initials = (session.user.name ?? session.user.email ?? "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted"
        aria-label="User menu"
        aria-expanded={open}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
          {initials}
        </div>
        <span
          className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${
            planId === "pro"
              ? "bg-[color:var(--warning)]/10 text-[color:var(--warning)]"
              : planId === "plus"
              ? "bg-accent-soft text-accent"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {plan.name}
        </span>
        <svg className="h-3.5 w-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-60 overflow-hidden rounded-xl border border-border bg-card shadow-lg z-50">
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-medium text-foreground">
              {session.user.name ?? session.user.email}
            </p>
            {session.user.name && (
              <p className="truncate text-xs text-muted-foreground">
                {session.user.email}
              </p>
            )}
          </div>

          <div className="border-b border-border px-4 py-3">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Quizzes this month</p>
              <p className={`text-xs font-semibold ${nearLimit ? "text-[color:var(--warning)]" : "text-foreground"}`}>
                {isUnlimited ? `${used} used` : `${used} / ${limit}`}
              </p>
            </div>
            {!isUnlimited && (
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${
                    pct >= 100 ? "bg-danger" : pct >= 80 ? "bg-[color:var(--warning)]" : "bg-accent"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}
          </div>

          <div className="p-2">
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              {planId === "pro" ? "Manage plan" : "Upgrade plan"}
            </Link>

            <button
              onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
