"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  Suspense,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { PLANS, type Plan, type PlanId } from "@/lib/subscription";

type Actions = {
  session: ReturnType<typeof useSession>["data"];
  upgrading: PlanId | null;
  handleSelect: (planId: PlanId) => void;
};

const PricingActionsContext = createContext<Actions | null>(null);

function usePricingActions(): Actions {
  const ctx = useContext(PricingActionsContext);
  if (!ctx) throw new Error("Pricing actions used outside provider");
  return ctx;
}

function CheckoutReturnHandler({ onToast }: { onToast: (msg: string) => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();

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
            onToast(`Successfully upgraded to ${planName}! Enjoy your quizzes.`);
            setTimeout(() => router.push("/m/dashboard"), 3000);
          } else {
            onToast(data.error ?? "Could not verify payment.");
          }
        })
        .catch(() => onToast("Could not verify payment. Please contact support."));
    }
    if (searchParams.get("canceled") === "true") {
      onToast("Checkout canceled. No charges were made.");
    }
  }, [searchParams, router, onToast]);

  return null;
}

export function PricingActionsProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [upgrading, setUpgrading] = useState<PlanId | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const onToast = useCallback((msg: string) => setToast(msg), []);

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

  return (
    <PricingActionsContext.Provider value={{ session, upgrading, handleSelect }}>
      <Suspense fallback={null}>
        <CheckoutReturnHandler onToast={onToast} />
      </Suspense>
      {toast && (
        <div className="mt-5 rounded-2xl border border-[#E9B8C4] bg-white/80 px-4 py-3 text-center text-sm text-[#7E3E55] shadow-[0_12px_36px_-20px_rgba(176,96,122,0.5)] backdrop-blur-xl">
          {toast}
        </div>
      )}
      {children}
    </PricingActionsContext.Provider>
  );
}

export function PlanCta({ plan, isFeatured }: { plan: Plan; isFeatured: boolean }) {
  const { session, upgrading, handleSelect } = usePricingActions();
  const isBusy = upgrading === plan.id;

  return (
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
  );
}
