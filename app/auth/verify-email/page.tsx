"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: code.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Verification failed.");
        setLoading(false);
        return;
      }

      setVerified(true);
      setLoading(false);
      setTimeout(() => router.push("/auth/login"), 2500);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setNotice(null);
    if (!email) {
      setError("Enter your email first.");
      return;
    }
    setResending(true);
    try {
      const res = await fetch("/api/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.sent) {
        setNotice("New code sent — check your inbox.");
      } else {
        setError(data.error ?? data.message ?? "Could not resend the code right now.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setResending(false);
  };

  const inputClass =
    "w-full rounded-xl border border-[#F3D5DC] bg-white/80 px-4 py-3 text-sm text-[#3B2027] placeholder:text-[#B4939F] shadow-[0_8px_24px_-20px_rgba(176,96,122,0.5)] transition-all focus:border-[#B0607A] focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDE8EC] via-[#FBF1EE] to-[#F8E9ED] px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb-drift absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#E9A8B8]/40 blur-3xl" />
        <div className="orb-drift absolute -right-28 bottom-12 h-80 w-80 rounded-full bg-[#C98A98]/30 blur-3xl" style={{ animationDelay: "-6s" }} />
        <span className="twinkle absolute right-1/4 top-16 h-2 w-2 rounded-full bg-[#B0607A]" />
        <span className="twinkle absolute left-1/4 bottom-24 h-1.5 w-1.5 rounded-full bg-[#E9A8B8]" style={{ animationDelay: "-1.4s" }} />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-serif text-4xl tracking-tight text-[#3B2027]">
            Examina<span className="text-[#B0607A]">.</span>
          </span>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.4em] text-[#A87680]">
            A quiz generator
          </p>
        </div>

        <div className="rounded-2xl border border-[#F3D5DC] bg-white/75 p-8 shadow-[0_24px_70px_-40px_rgba(176,96,122,0.6)] backdrop-blur-xl">
          {verified ? (
            <div className="text-center">
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#B0607A] text-[#F6E3E8]">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p className="font-serif text-sm italic text-[#B0607A]">Verified</p>
              <h1 className="mt-1 font-serif text-2xl tracking-tight text-[#3B2027]">
                You&apos;re all set!
              </h1>
              <p className="mt-2 text-sm text-[#9A7280]">Taking you to sign in&hellip;</p>
              <Link
                href="/auth/login"
                className="mt-5 inline-block rounded-full bg-[#3B2027] px-6 py-3 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B]"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <>
              <p className="font-serif text-sm italic text-[#B0607A]">One last step</p>
              <h1 className="mt-1 font-serif text-3xl tracking-tight text-[#3B2027]">
                Verify your email
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#9A7280]">
                We sent a 6-digit code to your email. Enter it below to activate your account.
              </p>

              <form onSubmit={handleVerify} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#3B2027]">
                    Email
                  </label>
                  <input
                    id="email"
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
                  <label htmlFor="code" className="mb-1.5 block text-sm font-medium text-[#3B2027]">
                    Verification code
                  </label>
                  <input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    required
                    autoComplete="one-time-code"
                    placeholder="000000"
                    className={`${inputClass} text-center text-2xl font-semibold tracking-[0.5em]`}
                  />
                </div>

                {error && (
                  <p className="rounded-xl border border-[#F1C8C8] bg-[#FDF1F1] px-3.5 py-2.5 text-sm text-[#C25B5B]">
                    {error}
                  </p>
                )}
                {notice && (
                  <p className="rounded-xl border border-[#D8EFD8] bg-[#F1FDF1] px-3.5 py-2.5 text-sm text-[#4A8A4A]">
                    {notice}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3B2027] py-3.5 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#F6E3E8]/30 border-t-[#F6E3E8]" />
                      Verifying...
                    </>
                  ) : (
                    "Verify email"
                  )}
                </button>
              </form>

              <button
                onClick={handleResend}
                disabled={resending}
                className="mt-4 w-full text-center text-xs text-[#9A7280] transition-colors hover:text-[#3B2027] disabled:opacity-50"
              >
                {resending ? "Sending..." : "Didn't get the code? Send a new one"}
              </button>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-[#9A7280]">
          Already verified?{" "}
          <Link href="/auth/login" className="font-medium text-[#B0607A] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  );
}