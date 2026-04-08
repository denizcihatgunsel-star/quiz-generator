import Link from "next/link";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#f5f5f0]/80 border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-neutral-900 font-medium text-sm">
            Examina
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
              Pricing
            </Link>
            <Link
              href="/auth/register"
              className="text-xs px-4 py-2 border border-neutral-900 text-neutral-900 font-medium hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Get Started Free
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <section className="py-32 bg-neutral-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-medium text-white leading-tight mb-6">
            Start studying smarter.
          </h2>
          <p className="text-neutral-400 mb-10 max-w-md mx-auto">
            Paste your first lesson and generate a quiz in under 30 seconds. No credit card required.
          </p>
          <a
            href="/auth/register"
            className="inline-block px-8 py-3 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-colors duration-200"
          >
            Try Examina Free
          </a>
        </div>
      </section>
    </div>
  );
}
