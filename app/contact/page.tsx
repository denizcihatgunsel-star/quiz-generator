import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Examina | Support & Feedback",
  description:
    "Get in touch with the Examina team. Reach us at support@examina.ink for help with accounts, billing, or feedback.",
  alternates: { canonical: "https://www.examina.ink/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDE8EC] via-[#FBF1EE] to-[#F8E9ED]">
      <header className="border-b border-[#F3D5DC]">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-lg italic tracking-tight text-[#3B2027]">
            Examina<span className="text-[#B0607A]">.</span>
          </Link>
          <Link href="/auth/register" className="rounded-full bg-[#3B2027] px-4 py-2 text-xs font-medium text-[#F6E3E8]">
            Get Started Free
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#A87680]">Contact</p>
        <h1 className="mt-6 font-serif text-4xl text-[#3B2027] sm:text-5xl">We&apos;re here to help.</h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[#9A7280]">
          Questions about your account, billing, or the product? Email us and we&apos;ll get back to you.
        </p>
        <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-[#F3D5DC] bg-white/75 px-8 py-5 shadow-[0_20px_50px_-30px_rgba(176,96,122,0.5)] backdrop-blur-xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#B0607A] to-[#E9A8B8] text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.9 5.3a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <a href="mailto:support@examina.ink" className="text-base font-medium text-[#3B2027] underline-offset-4 hover:underline">
            support@examina.ink
          </a>
        </div>
      </main>
    </div>
  );
}