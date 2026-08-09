"use client";

import { useState, FormEvent, Suspense } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogle = () => {
    localStorage.setItem("examina_pending_role", role);
    const callbackUrl = role === "teacher" ? "/api/auth/set-role?role=teacher" : "/m/dashboard";
    signIn("google", { callbackUrl });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Registration failed.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Account created — please sign in.");
      router.push("/m/auth/login");
      return;
    }

    if (refCode) {
      try {
        await fetch("/api/referral", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referralCode: refCode }),
        });
      } catch {
        // silently ignore referral errors
      }
    }

    router.push("/m/dashboard");
    router.refresh();
  };

  const inputClass =
    "w-full rounded-xl border border-[#F3D5DC] bg-white/80 px-4 py-3.5 text-sm text-[#3B2027] placeholder:text-[#B4939F] shadow-[0_8px_24px_-20px_rgba(176,96,122,0.5)] transition-all focus:border-[#B0607A] focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30";

  return (
    <div className="pt-4">
      <p className="font-serif text-sm italic text-[#B0607A]">Free forever plan</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
        Create your <span className="font-serif italic text-[#B0607A]">account</span>
      </h1>
      <p className="mt-2 text-sm text-[#9A7280]">Start with 5 free quizzes per month.</p>

      <div className="mt-7 rounded-2xl border border-[#F3D5DC] bg-white/75 p-6 shadow-[0_20px_60px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl">
        <label className="mb-2 block text-sm font-medium text-[#3B2027]">I am a...</label>
        <div className="mb-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`rounded-xl border py-3 text-sm font-medium transition-all ${
              role === "student"
                ? "border-[#B0607A] bg-[#FDE8EC] text-[#9A4F68]"
                : "border-[#F3D5DC] bg-white text-[#9A7280] hover:bg-[#F6EBEE]"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`rounded-xl border py-3 text-sm font-medium transition-all ${
              role === "teacher"
                ? "border-[#B0607A] bg-[#FDE8EC] text-[#9A4F68]"
                : "border-[#F3D5DC] bg-white text-[#9A7280] hover:bg-[#F6EBEE]"
            }`}
          >
            Teacher
          </button>
        </div>

        <button
          onClick={handleGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-[#F3D5DC] bg-white py-3.5 text-sm font-medium text-[#3B2027] transition-colors hover:bg-[#F6EBEE]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign up with Google
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#F3D5DC]" />
          <span className="text-xs text-[#9A7280]">or</span>
          <div className="h-px flex-1 bg-[#F3D5DC]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="m-name" className="mb-1.5 block text-sm font-medium text-[#3B2027]">
              Name <span className="text-[#9A7280]">(optional)</span>
            </label>
            <input
              id="m-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Your name"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="m-email" className="mb-1.5 block text-sm font-medium text-[#3B2027]">Email</label>
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
            <label htmlFor="m-password" className="mb-1.5 block text-sm font-medium text-[#3B2027]">Password</label>
            <input
              id="m-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              minLength={8}
              className={inputClass}
            />
          </div>

          {error && (
            <p className="rounded-xl border border-[#F1C8C8] bg-[#FDF1F1] px-3.5 py-2.5 text-sm text-[#C25B5B]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3B2027] py-3.5 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create free account"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-[#9A7280]">
        Already have an account?{" "}
        <Link href="/m/auth/login" className="font-medium text-[#B0607A] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function MobileRegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
