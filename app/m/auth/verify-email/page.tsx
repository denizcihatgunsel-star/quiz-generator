"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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
  const emailSent = searchParams.get("sent") !== "false";

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
      setTimeout(() => router.push(`/m/auth/login?verified=1&email=${encodeURIComponent(email)}`), 2500);
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
    "w-full rounded-xl border border-[#F3D5DC] bg-white/80 px-4 py-3.5 text-sm text-[#3B2027] placeholder:text-[#B4939F] shadow-[0_8px_24px_-20px_rgba(176,96,122,0.5)] transition-all focus:border-[#B0607A] focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30";

  return (
    <div className="pt-4 pb-6">
      {verified ? (
        <div className="text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#B0607A] text-[#F6E3E8]">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="font-serif text-sm italic text-[#B0607A]">Verified</p>
          <h1 className="mt-1 text-2xl font-medium tracking-tight text-[#3B2027]">
            You&apos;re all set!
          </h1>
          <p className="mt-2 text-sm text-[#9A7280]">Taking you to sign in&hellip;</p>
          <Link
            href={`/m/auth/login?verified=1&email=${encodeURIComponent(email)}`}
            className="mt-5 inline-block rounded-full bg-[#3B2027] px-6 py-3 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B]"
          >
            Sign in
          </Link>
        </div>
      ) : (
        <>
          <p className="font-serif text-sm italic text-[#B0607A]">One last step</p>
          <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
            Verify email
          </h1>
          {emailSent ? (
            <p className="mt-2 text-sm leading-relaxed text-[#9A7280]">
              We sent a 6-digit code to your email. Enter it below to activate your account.
            </p>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-[#C25B5B]">
              We couldn&apos;t send the code right now. Tap resend in a minute or contact support.
            </p>
          )}

          <div className="mt-7 rounded-2xl border border-[#F3D5DC] bg-white/75 p-6 shadow-[0_20px_60px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl">
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label htmlFor="m-verify-email" className="mb-1.5 block text-sm font-medium text-[#3B2027]">
                  Email
                </label>
                <input
                  id="m-verify-email"
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
                <label htmlFor="m-code" className="mb-1.5 block text-sm font-medium text-[#3B2027]">
                  Verification code
                </label>
                <input
                  id="m-code"
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
                {loading ? "Verifying..." : "Verify email"}
              </button>
            </form>

            <button
              onClick={handleResend}
              disabled={resending}
              className="mt-4 w-full text-center text-xs text-[#9A7280] transition-colors hover:text-[#3B2027] disabled:opacity-50"
            >
              {resending ? "Sending..." : "Didn't get the code? Send a new one"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-[#9A7280]">
            Already verified?{" "}
            <Link href="/m/auth/login" className="font-medium text-[#B0607A] hover:underline">
              Sign in
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default function MobileVerifyEmailPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  );
}
