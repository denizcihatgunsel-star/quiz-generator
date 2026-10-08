import type { Metadata } from "next";
import Link from "next/link";
import RegisterFormClient from "./RegisterFormClient";

export const metadata: Metadata = {
  title: "Create account",
};

export default function MobileRegisterPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  return (
    <div className="pt-4 pb-[calc(80px+env(safe-area-inset-bottom)+24px)]">
      <p className="font-serif text-sm italic text-[#B0607A]">Free forever plan</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
        Create your <span className="font-serif italic text-[#B0607A]">account</span>
      </h1>
      <p className="mt-2 text-sm text-[#9A7280]">Start with 5 free quizzes per month.</p>

      <div className="mt-7 rounded-2xl border border-[#F3D5DC] bg-white/75 p-6 shadow-[0_20px_60px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl">
        <RegisterFormClient refCode={searchParams.ref} />
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
