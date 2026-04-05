"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { PLANS, type PlanId } from "@/lib/subscription";

export default function PricingPage() {
  return (
    <Suspense>
      <PricingContent />
    </Suspense>
  );
}

function PricingContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [upgrading, setUpgrading] = useState<PlanId | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [managingBilling, setManagingBilling] = useState(false);

  // Handle success/cancel redirects from Stripe
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      const plan = searchParams.get("plan");
      setToast(`Successfully upgraded to ${plan ? PLANS[plan as PlanId]?.name ?? plan : "your new plan"}! Enjoy your quizzes.`);
    }
    if (searchParams.get("canceled") === "true") {
      setToast("Checkout canceled. No charges were made.");
    }
  }, [searchParams]);

  const handleSelect = async (planId: PlanId) => {
    if (!session) {
      router.push("/auth/register");
      return;
    }

    // Free plan — downgrade directly
    if (planId === "free") {
      setUpgrading(planId);
      const res = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "free" }),
      });
      const data = await res.json();
      setUpgrading(null);
      if (res.ok) {
        setToast(data.message);
        setTimeout(() => router.push("/"), 2000);
      } else {
        setToast(data.error ?? "Something went wrong.");
      }
      return;
    }

    // Paid plan — redirect to Stripe payment link
    const paymentLinks: Record<string, string> = {
      starter: "https://buy.stripe.com/7sYbJ13Ch93y3nyer08bS00",
      plus: "https://buy.stripe.com/6oU3cv2yd6VqbU46Yy8bS02",
      pro: "https://buy.stripe.com/bJe28rc8N93y9LWbeO8bS03",
      team: "https://buy.stripe.com/eVq9AT5Kp1B62ju5Uu8bS04",
    };

    setUpgrading(planId);
    setToast(null);
    window.location.href = paymentLinks[planId] ?? paymentLinks.starter;
    return;
  };

  const handleManageBilling = async () => {
    setManagingBilling(true);
    try {
      const res = await fetch("/api/billing", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setToast(data.error ?? "Could not open billing portal.");
      }
    } catch {
      setToast("Something went wrong.");
    }
    setManagingBilling(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold">Q</div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">QuizGen</span>
          </Link>
          <Link href="/" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            ← Back to app
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            Simple, student-friendly pricing
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-md mx-auto">
            Start free. Upgrade when you need more quizzes.
          </p>
        </div>

        {/* Toast */}
        {toast && (
          <div className="mb-8 max-w-md mx-auto p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm text-center">
            {toast}
          </div>
        )}

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {Object.values(PLANS).map((plan) => {
            const isHighlighted = plan.id === "starter" || plan.id === "plus";
            const isBusy = upgrading === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  isHighlighted
                    ? "border-violet-400 dark:border-violet-600 bg-white dark:bg-zinc-800 shadow-lg shadow-violet-100 dark:shadow-violet-900/30"
                    : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-600 text-white whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name & price */}
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline gap-1">
                    {plan.price === 0 ? (
                      <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Free</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">${plan.price}</span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">/mo</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
                    {plan.quizzesPerMonth === Infinity
                      ? "Unlimited quizzes"
                      : `${plan.quizzesPerMonth} quizzes / month`}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleSelect(plan.id)}
                  disabled={isBusy}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    isHighlighted
                      ? "bg-violet-600 hover:bg-violet-700 text-white shadow-sm hover:shadow-md"
                      : "bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-100"
                  } disabled:opacity-60`}
                >
                  {isBusy ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : plan.price === 0 ? (
                    session ? "Downgrade to Free" : "Get started free"
                  ) : (
                    `Get ${plan.name} — $${plan.price}/mo`
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Manage billing */}
        {session && (
          <div className="text-center mt-10">
            <button
              onClick={handleManageBilling}
              disabled={managingBilling}
              className="text-sm text-violet-600 dark:text-violet-400 hover:underline disabled:opacity-50"
            >
              {managingBilling ? "Opening..." : "Manage billing & invoices"}
            </button>
          </div>
        )}

        <p className="text-center text-sm text-zinc-400 dark:text-zinc-600 mt-6">
          Secure payments via Stripe. Cancel anytime.
        </p>
      </main>
    </div>
  );
}
