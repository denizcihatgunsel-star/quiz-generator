"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/ui";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devLink, setDevLink] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      if (data.devResetLink) setDevLink(data.devResetLink);
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Wordmark />
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          {sent ? (
            <>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">Check your email</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                If an account exists for that email, we&apos;ve sent a link to reset your
                password. The link expires in 60 minutes.
              </p>
              {devLink && (
                <div className="mt-4">
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                    No email service configured — dev link:
                  </p>
                  <a
                    href={devLink}
                    className="block break-all rounded-lg border border-border bg-muted px-3 py-2 text-xs text-accent hover:underline"
                  >
                    {devLink}
                  </a>
                </div>
              )}
              <Link
                href="/auth/login"
                className="mt-6 block text-center text-sm font-medium text-accent hover:underline"
              >
                Back to sign in
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">Forgot your password?</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
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
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                {error && (
                  <p className="rounded-lg border border-border bg-danger-soft px-3 py-2 text-sm text-danger">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                      Sending link...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Remembered it?{" "}
                <Link href="/auth/login" className="font-medium text-accent hover:underline">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
