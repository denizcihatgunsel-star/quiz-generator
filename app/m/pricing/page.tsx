"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { PLANS, type PlanId } from "@/lib/subscription";

export default function MobilePricingPage() {
  return (
    <Suspense>
      <PricingContent />
    </Suspense>
  );
}

const CHECK = (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

function PricingContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [upgrading, setUpgrading] = useState<PlanId | null>(null);
  const [toast, setToast] = useState<string | null>(null);

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
            setTimeout(() => router.push("/m/dashboard"), 3000);
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
      router.push("/m/auth/register");
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
        setTimeout(() => router.push("/m/dashboard"), 2000);
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

  const featuredId: PlanId = "plus";

  return (
    <div>
      <p className="font-serif text-sm italic text-[#B0607A]">Pricing</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
        Simple, student-friendly <span className="font-serif italic text-[#B0607A]">pricing</span>
      </h1>
      <p className="mt-2 text-sm text-[#9A7280]">Start free. Upgrade when you need more. Cancel anytime.</p>

      {toast && (
        <div className="mt-5 rounded-2xl border border-[#E9B8C4] bg-white/80 px-4 py-3 text-center text-sm text-[#7E3E55] shadow-[0_12px_36px_-20px_rgba(176,96,122,0.5)] backdrop-blur-xl">
          {toast}
        </div>
      )}

      <div className="mt-7 space-y-4">
        {Object.values(PLANS).map((plan) => {
          const isFeatured = plan.id === featuredId;
          const isBusy = upgrading === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-5 transition-all ${
                isFeatured
                  ? "border border-[#B0607A]/40 bg-gradient-to-b from-[#FDE8EC] to-white shadow-[0_30px_80px_-30px_rgba(176,96,122,0.55)]"
                  : "border border-[#F3D5DC] bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(176,96,122,0.4)]"
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-2.5 right-4 rounded-full px-3 py-1 text-[10px] font-medium tracking-wide ${
                    isFeatured
                      ? "bg-gradient-to-r from-[#B0607A] to-[#C98A98] text-white"
                      : "bg-[#3B2027] text-[#F6E3E8]"
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`font-serif text-lg italic ${isFeatured ? "text-[#9A4F68]" : "text-[#3B2027]"}`}>{plan.name}</h2>
                  <p className="mt-1 text-xs text-[#9A7280]">
                    {plan.quizzesPerMonth === Infinity
                      ? "Unlimited quizzes"
                      : `${plan.quizzesPerMonth} quizzes / month`}
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span className="font-serif text-3xl text-[#3B2027]">Free</span>
                  ) : (
                    <>
                      <span className={`font-serif text-3xl ${isFeatured ? "text-[#B0607A]" : "text-[#3B2027]"}`}>${plan.price}</span>
                      <span className="text-xs text-[#9A7280]">/mo</span>
                    </>
                  )}
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#5D4450]">
                    <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                      isFeatured ? "bg-[#B0607A] text-white" : "bg-[#FDE8EC] text-[#B0607A]"
                    }`}>
                      {CHECK}
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(plan.id)}
                disabled={isBusy}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-all disabled:opacity-60 active:scale-[0.98] ${
                  isFeatured
                    ? "bg-[#3B2027] text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.7)] hover:bg-[#52303B]"
                    : "border border-[#F3D5DC] bg-white/70 text-[#7E3E55] hover:border-[#E9B8C4] hover:bg-[#F6EBEE]"
                }`}
              >
                {isBusy
                  ? "Processing..."
                  : plan.price === 0
                  ? session
                    ? "Downgrade to Free"
                    : "Get started free"
                  : `Get ${plan.name} — $${plan.price}/mo`}
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-[#B4939F]">
        Secure payments via Stripe. Cancel anytime.
      </p>
    </div>
  );
}
