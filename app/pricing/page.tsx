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

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      fetch("/api/checkout/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            const planName = PLANS[data.plan as PlanId]?.name ?? data.plan;
            setToast(`Successfully upgraded to ${planName}! Enjoy your quizzes.`);
            setTimeout(() => router.push("/"), 3000);
          } else {
            setToast(data.error ?? "Could not verify payment.");
          }
        })
        .catch(() => setToast("Could not verify payment. Please contact support."));
    }
    if (searchParams.get("canceled") === "true") {
      setToast("Checkout canceled. No charges were made.");
    }
  }, [searchParams, router]);

  const handleSelect = async (planId: PlanId) => {
    if (!session) {
      router.push("/auth/register");
      return;
    }

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

    setUpgrading(planId);
    setToast(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();
      setUpgrading(null);

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setToast(data.error ?? "Failed to start checkout.");
      }
    } catch {
      setUpgrading(null);
      setToast("Something went wrong. Please try again.");
    }
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
    <div className="min-h-screen bg-[#141414]">
      {/* Header */}
      <header className="border-b border-zinc-800/50 bg-[#141414]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
            <span className="font-semibold text-white text-lg">Examina</span>
          </Link>
          <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
            Back to app
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Simple, student-friendly pricing
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mx-auto">
            Start free. Upgrade when you need more quizzes.
          </p>
        </div>

        {/* Toast */}
        {toast && (
          <div className="mb-8 max-w-md mx-auto p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-sm text-center">
            {toast}
          </div>
        )}

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Object.values(PLANS).map((plan) => {
            const isHighlighted = plan.id === "starter" || plan.id === "plus";
            const isBusy = upgrading === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                  isHighlighted
                    ? "border-violet-500/40 bg-zinc-900/80 shadow-lg shadow-violet-500/10"
                    : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white whitespace-nowrap shadow-lg shadow-violet-500/20">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name & price */}
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-white mb-2">
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline gap-1">
                    {plan.price === 0 ? (
                      <span className="text-3xl font-bold text-white">Free</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-white">${plan.price}</span>
                        <span className="text-sm text-zinc-500">/mo</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 mt-1.5">
                    {plan.quizzesPerMonth === Infinity
                      ? "Unlimited quizzes"
                      : `${plan.quizzesPerMonth} quizzes / month`}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/20"
                      : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
                  } disabled:opacity-60`}
                >
                  {isBusy ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                      Processing...
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
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors disabled:opacity-50"
            >
              {managingBilling ? "Opening..." : "Manage billing & invoices"}
            </button>
          </div>
        )}

        <p className="text-center text-sm text-zinc-600 mt-6">
          Secure payments via Stripe. Cancel anytime.
        </p>
      </main>
    </div>
  );
}
