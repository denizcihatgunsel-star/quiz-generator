import { PLANS, type PlanId } from "@/lib/subscription";
import { PlanCta, PricingActionsProvider } from "./PricingClient";

const CHECK = (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const featuredId: PlanId = "plus";

export default function MobilePricingPage() {
  return (
    <div>
      <p className="font-serif text-sm italic text-[#B0607A]">Pricing</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
        Simple, student-friendly <span className="font-serif italic text-[#B0607A]">pricing</span>
      </h1>
      <p className="mt-2 text-sm text-[#9A7280]">Start free. Upgrade when you need more. Cancel anytime.</p>

      <PricingActionsProvider>
        <div className="mt-7 space-y-4">
          {Object.values(PLANS).map((plan) => {
            const isFeatured = plan.id === featuredId;

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
                    <h2 className={`font-serif text-lg italic ${isFeatured ? "text-[#9A4F68]" : "text-[#3B2027]"}`}>
                      {plan.name}
                    </h2>
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
                        <span className={`font-serif text-3xl ${isFeatured ? "text-[#B0607A]" : "text-[#3B2027]"}`}>
                          ${plan.price}
                        </span>
                        <span className="text-xs text-[#9A7280]">/mo</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[#5D4450]">
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          isFeatured ? "bg-[#B0607A] text-white" : "bg-[#FDE8EC] text-[#B0607A]"
                        }`}
                      >
                        {CHECK}
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <PlanCta plan={plan} isFeatured={isFeatured} />
              </div>
            );
          })}
        </div>
      </PricingActionsProvider>

      <p className="mt-8 text-center text-xs text-[#B4939F]">
        Secure payments via Stripe. Cancel anytime.
      </p>
    </div>
  );
}
