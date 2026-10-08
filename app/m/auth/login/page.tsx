import type { Metadata } from "next";
import Link from "next/link";
import LoginFormClient from "./LoginFormClient";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function MobileLoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string; ref?: string };
}) {
  const callbackUrl = searchParams.callbackUrl ?? "/m/dashboard";
  const authError = searchParams.error;

  return (
    <div className="pt-4 pb-[calc(80px+env(safe-area-inset-bottom)+24px)]">
      <p className="font-serif text-sm italic text-[#B0607A]">Welcome back</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
        Sign in to <span className="font-serif italic text-[#B0607A]">Examina</span>
      </h1>

      {authError && (
        <p role="alert" className="mt-5 rounded-xl border border-[#F1C8C8] bg-[#FDF1F1] px-3.5 py-2.5 text-sm text-[#C25B5B]">
          Sign-in didn&apos;t complete. Please try again.
        </p>
      )}

      <div className="mt-7 rounded-2xl border border-[#F3D5DC] bg-white/75 p-6 shadow-[0_20px_60px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl">
        <LoginFormClient callbackUrl={callbackUrl} refCode={searchParams.ref} />

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#F3D5DC]" />
          <span className="text-xs text-[#9A7280]">or</span>
          <div className="h-px flex-1 bg-[#F3D5DC]" />
        </div>

        <Link
          href={`/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-[#F3D5DC] bg-white py-3.5 text-sm font-medium text-[#3B2027] transition-colors hover:bg-[#F6EBEE]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </Link>
      </div>

      <p className="mt-6 text-center text-sm text-[#9A7280]">
        Don&apos;t have an account?{" "}
        <Link href="/m/auth/register" className="font-medium text-[#B0607A] hover:underline">
          Create one free
        </Link>
      </p>
    </div>
  );
}
