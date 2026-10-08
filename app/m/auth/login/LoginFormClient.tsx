"use client";

import { useState, FormEvent, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storePendingRef } from "@/components/ReferralAttribution";

export default function LoginFormClient({
  callbackUrl,
  refCode,
}: {
  callbackUrl: string;
  refCode?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (refCode) storePendingRef(refCode);
  }, [refCode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  const inputClass =
    "w-full rounded-xl border border-[#F3D5DC] bg-white/80 px-4 py-3.5 text-sm text-[#3B2027] placeholder:text-[#B4939F] shadow-[0_8px_24px_-20px_rgba(176,96,122,0.5)] transition-all focus:border-[#B0607A] focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="m-email" className="mb-1.5 block text-sm font-medium text-[#3B2027]">
          Email
        </label>
        <input
          id="m-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="m-password" className="mb-1.5 block text-sm font-medium text-[#3B2027]">
          Password
        </label>
        <input
          id="m-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClass}
        />
        <div className="mt-1.5 text-right">
          <Link href="/auth/forgot-password" className="text-xs font-medium text-[#B0607A] hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-[#F1C8C8] bg-[#FDF1F1] px-3.5 py-2.5 text-sm text-[#C25B5B]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3B2027] py-3.5 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
