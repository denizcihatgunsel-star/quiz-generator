"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { PLANS, type PlanId } from "@/lib/subscription";
import SiteHeader from "@/components/SiteHeader";

export default function PricingPage() {
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

function PricingCard({
  plan,
  isFeatured,
  isBusy,
  onSelect,
  session,
}: {
  plan: (typeof PLANS)[PlanId];
  isFeatured: boolean;
  isBusy: boolean;
  onSelect: (planId: PlanId) => void;
  session: ReturnType<typeof useSession>["data"];
}) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 260, damping: 24 });
  const sy = useSpring(my, { stiffness: 260, damping: 24 });
  const rotateX = useTransform(sy, [0, 1], [6, -6]);
  const rotateY = useTransform(sx, [0, 1], [-6, 6]);
  const spotlightX = useTransform(sx, (v) => `${v * 100}%`);
  const spotlightY = useTransform(sy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${spotlightX} ${spotlightY}, rgba(176,96,122,0.16), transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className={isFeatured ? "xl:-translate-y-3 xl:scale-[1.02]" : ""}>
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className={`group relative flex flex-col rounded-2xl p-6 ${
          isFeatured
            ? "border border-[#B0607A]/40 bg-gradient-to-b from-[#FDE8EC] to-white shadow-[0_30px_80px_-30px_rgba(176,96,122,0.55)]"
            : plan.id === "starter"
            ? "border border-[#F3D5DC] bg-[#FDF4F5]/80 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(176,96,122,0.4)]"
            : "border border-[#F3D5DC] bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(176,96,122,0.4)] hover:border-[#E9B8C4]"
        }`}
      >
        {/* Cursor spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        {/* Badge */}
        {plan.badge && (
          <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2">
            <span
              className={`whitespace-nowrap rounded-full px-3.5 py-1 text-[11px] font-medium tracking-wide ${
                isFeatured
                  ? "bg-gradient-to-r from-[#B0607A] to-[#C98A98] text-white shadow-[0_8px_20px_-8px_rgba(176,96,122,0.7)]"
                  : "bg-[#3B2027] text-[#F6E3E8]"
              }`}
            >
              {plan.badge}
            </span>
          </div>
        )}

        {/* Plan name & price */}
        <div className="mb-6">
          <h2 className={`mb-3 font-serif text-lg italic ${isFeatured ? "text-[#9A4F68]" : "text-[#3B2027]"}`}>
            {plan.name}
          </h2>
          <div className="flex items-baseline gap-1.5">
            {plan.price === 0 ? (
              <span className="font-serif text-5xl text-[#3B2027]">Free</span>
            ) : (
              <>
                <span className={`font-serif text-5xl ${isFeatured ? "text-[#B0607A]" : "text-[#3B2027]"}`}>
                  ${plan.price}
                </span>
                <span className="text-sm text-[#9A7280]">/mo</span>
              </>
            )}
          </div>
          <p className="mt-2 text-sm text-[#9A7280]">
            {plan.quizzesPerMonth === Infinity
              ? "Unlimited quizzes"
              : `${plan.quizzesPerMonth} quizzes / month`}
          </p>
        </div>

        {/* Features */}
        <ul className="mb-7 flex-1 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-[#5D4450]">
              <span className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${
                isFeatured ? "bg-[#B0607A] text-white" : "bg-[#FDE8EC] text-[#B0607A]"
              }`}>
                {CHECK}
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => onSelect(plan.id)}
          disabled={isBusy}
          className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-all disabled:opacity-60 ${
            isFeatured
              ? "bg-[#3B2027] text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.7)] hover:bg-[#52303B] hover:shadow-[0_16px_38px_-12px_rgba(59,32,39,0.75)] active:scale-[0.98]"
              : "border border-[#F3D5DC] bg-white/70 text-[#7E3E55] hover:border-[#E9B8C4] hover:bg-[#F6EBEE] active:scale-[0.98]"
          }`}
        >
          {isBusy ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
              Processing...
            </>
          ) : plan.price === 0 ? (
            session ? "Downgrade to Free" : "Get started free"
          ) : (
            `Get ${plan.name} — $${plan.price}/mo`
          )}
        </button>
      </motion.div>
    </div>
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
      const t = setTimeout(() => setToast("Checkout canceled. No charges were made."), 0);
      return () => clearTimeout(t);
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

  const featuredId: PlanId = "plus";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        {/* Hero */}
        <div className="mb-14 text-center sm:mb-16">
          <p className="mb-4 font-serif text-base italic text-[#B0607A]">Pricing</p>
          <h1 className="text-4xl font-medium tracking-tight text-[#3B2027] sm:text-5xl">
            Simple, student-friendly <span className="font-serif italic text-[#B0607A]">pricing</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#9A7280]">
            Start free. Upgrade when you need more quizzes. Cancel anytime.
          </p>
        </div>

        {/* Toast */}
        {toast && (
          <div className="mx-auto mb-10 max-w-md rounded-full border border-[#F3D5DC] bg-white/80 px-5 py-3 text-center text-sm text-[#7E3E55] shadow-[0_12px_36px_-20px_rgba(176,96,122,0.5)] backdrop-blur-xl">
            {toast}
          </div>
        )}

        {/* Plans */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Object.values(PLANS).map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isFeatured={plan.id === featuredId}
              isBusy={upgrading === plan.id}
              onSelect={handleSelect}
              session={session}
            />
          ))}
        </div>

        {/* Manage billing */}
        {session && (
          <div className="mt-12 text-center">
            <button
              onClick={handleManageBilling}
              disabled={managingBilling}
              className="text-sm text-[#9A7280] underline-offset-4 transition-colors hover:text-[#3B2027] hover:underline disabled:opacity-50"
            >
              {managingBilling ? "Opening..." : "Manage billing & invoices"}
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-[#B4939F]">
          Secure payments via Stripe. Cancel anytime.
        </p>
      </main>
    </div>
  );
}
