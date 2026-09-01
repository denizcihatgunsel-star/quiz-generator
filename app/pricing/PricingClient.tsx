"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  Suspense,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { PLANS, type Plan, type PlanId } from "@/lib/subscription";

type Actions = {
  session: ReturnType<typeof useSession>["data"];
  upgrading: PlanId | null;
  managingBilling: boolean;
  handleSelect: (planId: PlanId) => void;
  handleManageBilling: () => void;
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
            onToast(`Successfully upgraded to ${PLANS[data.plan as PlanId]?.name ?? data.plan}! Enjoy your quizzes.`);
            setTimeout(() => router.push("/"), 3000);
          } else {
            onToast(data.error ?? "Could not verify payment.");
          }
        })
        .catch(() => onToast("Could not verify payment. Please contact support."));
    }
    if (searchParams.get("canceled") === "true") {
      const t = setTimeout(() => onToast("Checkout canceled. No charges were made."), 0);
      return () => clearTimeout(t);
    }
  }, [searchParams, router, onToast]);

  return null;
}

export function PricingActionsProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [upgrading, setUpgrading] = useState<PlanId | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [managingBilling, setManagingBilling] = useState(false);

  const onToast = useCallback((msg: string) => setToast(msg), []);

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
    <PricingActionsContext.Provider
      value={{ session, upgrading, managingBilling, handleSelect, handleManageBilling }}
    >
      <Suspense fallback={null}>
        <CheckoutReturnHandler onToast={onToast} />
      </Suspense>
      {toast && (
        <div className="mx-auto mb-10 max-w-md rounded-full border border-[#F3D5DC] bg-white/80 px-5 py-3 text-center text-sm text-[#7E3E55] shadow-[0_12px_36px_-20px_rgba(176,96,122,0.5)] backdrop-blur-xl">
          {toast}
        </div>
      )}
      {children}
    </PricingActionsContext.Provider>
  );
}

export function CardShell({
  isFeatured,
  planId,
  children,
}: {
  isFeatured: boolean;
  planId: PlanId;
  children: ReactNode;
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

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative flex flex-col rounded-2xl p-6 ${
        isFeatured
          ? "border border-[#B0607A]/40 bg-gradient-to-b from-[#FDE8EC] to-white shadow-[0_30px_80px_-30px_rgba(176,96,122,0.55)]"
          : planId === "starter"
          ? "border border-[#F3D5DC] bg-[#FDF4F5]/80 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(176,96,122,0.4)]"
          : "border border-[#F3D5DC] bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(176,96,122,0.4)] hover:border-[#E9B8C4]"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  );
}

export function PlanCta({ plan, isFeatured }: { plan: Plan; isFeatured: boolean }) {
  const { session, upgrading, handleSelect } = usePricingActions();
  const isBusy = upgrading === plan.id;

  return (
    <button
      onClick={() => handleSelect(plan.id)}
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
  );
}

export function ManageBilling() {
  const { session, managingBilling, handleManageBilling } = usePricingActions();
  if (!session) return null;

  return (
    <div className="mt-12 text-center">
      <button
        onClick={handleManageBilling}
        disabled={managingBilling}
        className="text-sm text-[#9A7280] underline-offset-4 transition-colors hover:text-[#3B2027] hover:underline disabled:opacity-50"
      >
        {managingBilling ? "Opening..." : "Manage billing & invoices"}
      </button>
    </div>
  );
}
