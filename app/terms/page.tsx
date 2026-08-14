import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Examina",
  description:
    "The terms for using Examina: acceptable use of the quiz generator, accounts, plans, and content ownership.",
  alternates: { canonical: "https://www.examina.ink/terms" },
};

export default function TermsPage() {
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
        <h1 className="font-serif text-3xl text-[#3B2027]">Terms of Service</h1>
        <p className="mt-2 text-sm text-[#9A7280]">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#3B2027]">
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">1. Acceptance of terms</h2>
            <p className="text-[#9A7280]">
              By creating an account or using Examina you agree to these Terms of Service. If you do not agree, please do not use the service.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">2. Your account</h2>
            <p className="text-[#9A7280]">
              You are responsible for safeguarding your account credentials and for activity that happens under your account.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">3. Acceptable use</h2>
            <p className="text-[#9A7280]">
              You agree not to misuse the service, attempt to break its security, or use it to generate content that is unlawful, harmful, or
              infringing. You must have the right to use any content you upload.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">4. Plans and payment</h2>
            <p className="text-[#9A7280]">
              Paid plans are billed monthly and may be cancelled anytime. Free accounts include a limited number of generations per month.
              Fees are charged by Stripe and are non-refundable except as required by law.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">5. Content ownership</h2>
            <p className="text-[#9A7280]">
              You retain ownership of the content you provide and the quizzes you generate. By sharing a quiz publicly, you allow other users
              to view and play it.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">6. Service availability</h2>
            <p className="text-[#9A7280]">
              We aim to keep Examina available at all times but do not guarantee uninterrupted service. We may change, suspend, or discontinue
              features at any time.
            </p>
          </section>
          <section>
            <h2 className="mb-2 font-serif text-lg italic text-[#3B2027]">7. Contact</h2>
            <p className="text-[#9A7280]">
              Questions about these terms can be sent to{" "}
              <a href="mailto:support@examina.ink" className="text-[#B0607A] underline">support@examina.ink</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}