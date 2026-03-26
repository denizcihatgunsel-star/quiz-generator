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

  // Close on outside click
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
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="User menu"
        aria-expanded={open}
      >
        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
          {initials}
        </div>
        {/* Plan badge */}
        <span
          className={`text-xs font-medium px-1.5 py-0.5 rounded-md ${
            planId === "pro"
              ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400"
              : planId === "plus"
              ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-400"
              : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
          }`}
        >
          {plan.name}
        </span>
        <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-60 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg z-50 overflow-hidden">
          {/* User info */}
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
              {session.user.name ?? session.user.email}
            </p>
            {session.user.name && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {session.user.email}
              </p>
            )}
          </div>

          {/* Usage */}
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Quizzes this month</p>
              <p className={`text-xs font-semibold ${nearLimit ? "text-amber-600 dark:text-amber-400" : "text-zinc-700 dark:text-zinc-300"}`}>
                {isUnlimited ? `${used} used` : `${used} / ${limit}`}
              </p>
            </div>
            {!isUnlimited && (
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-violet-500"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-2">
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              {planId === "pro" ? "Manage plan" : "Upgrade plan"}
            </Link>

            <button
              onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
