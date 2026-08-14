import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Examina",
  description:
    "How Examina handles your data: content is used for AI quiz generation only and is not stored, and account data is kept secure.",
  alternates: { canonical: "https://www.examina.ink/privacy" },
};

export default function PrivacyPage() {
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
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-3xl text-[#3B2027]">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[#9A7280]">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#3B2027]">
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">1. What we collect</h2>
            <p className="text-[#9A7280]">
              When you create an account we collect your name and email address. When you generate a quiz we process the content you
              paste or upload so the AI can produce questions. We also collect basic usage data (like quiz scores and streaks) to power
              your dashboard.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">2. How we use your content</h2>
            <p className="text-[#9A7280]">
              The text you provide is used solely to generate your quiz. Your original source text is not stored on our servers.
              Generated quizzes are saved to your account so you can access and share them anytime.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">3. Payments</h2>
            <p className="text-[#9A7280]">
              Payments are processed by Stripe. We do not store your card details on our servers.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">4. Third parties</h2>
            <p className="text-[#9A7280]">
              We use third-party services for authentication (Google), payments (Stripe), hosting, and AI generation. Each provider
              handles data under its own privacy policy.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">5. Cookies & analytics</h2>
            <p className="text-[#9A7280]">
              We use cookies to keep you signed in and to understand how the site is used. You can control cookies in your browser.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">6. Your rights</h2>
            <p className="text-[#9A7280]">
              You can request a copy or deletion of your personal data at any time by contacting us. Email us at{" "}
              <a href="mailto:support@examina.ink" className="text-[#B0607A] underline">support@examina.ink</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}