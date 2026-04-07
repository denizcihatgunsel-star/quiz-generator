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
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Header */}
      <header className="border-b border-black/5 bg-[#f5f5f0]/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-medium text-neutral-900">Examina</span>
          </Link>
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            Back to app
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-medium text-neutral-900 tracking-tight mb-4">
            Simple, student-friendly pricing
          </h1>
          <p className="text-neutral-500 text-lg max-w-md mx-auto">
            Start free. Upgrade when you need more quizzes.
          </p>
        </div>

        {/* Toast */}
        {toast && (
          <div className="mb-8 max-w-md mx-auto p-4 border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm text-center">
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
                className={`relative flex flex-col border p-6 transition-all ${
                  isHighlighted
                    ? "border-neutral-900 bg-white shadow-sm"
                    : "border-neutral-200 bg-white hover:border-neutral-300"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 text-xs font-medium bg-neutral-900 text-white whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name & price */}
                <div className="mb-5">
                  <h2 className="text-sm font-medium text-neutral-500 mb-2">
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline gap-1">
                    {plan.price === 0 ? (
                      <span className="text-3xl font-medium text-neutral-900">Free</span>
                    ) : (
                      <>
                        <span className="text-3xl font-medium text-neutral-900">${plan.price}</span>
                        <span className="text-sm text-neutral-400">/mo</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-neutral-400 mt-1.5">
                    {plan.quizzesPerMonth === Infinity
                      ? "Unlimited quizzes"
                      : `${plan.quizzesPerMonth} quizzes / month`}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleSelect(plan.id)}
                  disabled={isBusy}
                  className={`w-full py-2.5 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    isHighlighted
                      ? "bg-neutral-900 text-white hover:bg-neutral-700"
                      : "bg-[#f5f5f0] text-neutral-900 border border-neutral-200 hover:border-neutral-400"
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
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors disabled:opacity-50"
            >
              {managingBilling ? "Opening..." : "Manage billing & invoices"}
            </button>
          </div>
        )}

        <p className="text-center text-sm text-neutral-400 mt-6">
          Secure payments via Stripe. Cancel anytime.
        </p>
      </main>
    </div>
  );
}
