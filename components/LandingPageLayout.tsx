import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-[15px] font-semibold tracking-tight text-foreground">
            Examina
          </Link>
          <nav className="flex items-center gap-3">
            <ThemeToggle className="h-8 w-8" />
            <Link
              href="/pricing"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex h-8 items-center rounded-lg border border-border bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              Get Started Free
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <section className="bg-foreground py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-medium leading-tight text-background sm:text-5xl">
            Start studying smarter.
          </h2>
          <p className="mx-auto mb-10 max-w-md text-background/60">
            Paste your first lesson and generate a quiz in under 30 seconds. No credit card required.
          </p>
          <a
            href="/auth/register"
            className="inline-block border border-background/30 bg-transparent px-8 py-3 text-sm font-medium text-background transition-colors duration-200 hover:bg-background hover:text-foreground"
          >
            Try Examina Free
          </a>
        </div>
      </section>
    </div>
  );
}
