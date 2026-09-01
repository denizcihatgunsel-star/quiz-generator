import { PLANS, type PlanId } from "@/lib/subscription";
import SiteHeader from "@/components/SiteHeader";
import { CardShell, ManageBilling, PlanCta, PricingActionsProvider } from "./PricingClient";

const CHECK = (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const featuredId: PlanId = "plus";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-14 text-center sm:mb-16">
          <p className="mb-4 font-serif text-base italic text-[#B0607A]">Pricing</p>
          <h1 className="text-4xl font-medium tracking-tight text-[#3B2027] sm:text-5xl">
            Simple, student-friendly <span className="font-serif italic text-[#B0607A]">pricing</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#9A7280]">
            Start free. Upgrade when you need more quizzes. Cancel anytime.
          </p>
        </div>

        <PricingActionsProvider>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Object.values(PLANS).map((plan) => {
              const isFeatured = plan.id === featuredId;
              return (
                <div key={plan.id} className={isFeatured ? "xl:-translate-y-3 xl:scale-[1.02]" : ""}>
                  <CardShell isFeatured={isFeatured} planId={plan.id}>
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

                    <ul className="mb-7 flex-1 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-[#5D4450]">
                          <span
                            className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${
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
                  </CardShell>
                </div>
              );
            })}
          </div>

          <ManageBilling />
        </PricingActionsProvider>

        <p className="mt-8 text-center text-sm text-[#B4939F]">
          Secure payments via Stripe. Cancel anytime.
        </p>
      </main>
    </div>
  );
}
