"use client";

import Section from "@/components/ui/Section";
import { useBookingModal } from "@/context/BookingModalContext";
import { Check, FileText, RefreshCw, Timer, TrendingUp, UserPlus, Users } from "lucide-react";
import { pricingModels } from "@/data/pricing";

const iconMap = {
  users: Users,
  userPlus: UserPlus,
  fileText: FileText,
  refreshCw: RefreshCw,
  timer: Timer,
  trendingUp: TrendingUp,
};

export default function Pricing({ className = "" }: { className?: string }) {
  const { openBooking } = useBookingModal();

  return (
    <Section
      id="pricing"
      className={`relative py-16 md:py-24 overflow-hidden border-t border-black/[0.03] ${className}`}
      style={{
        background: `
          radial-gradient(circle at 20% 10%, rgba(99,102,241,0.06), transparent 40%),
          radial-gradient(circle at 80% 90%, rgba(139,92,246,0.06), transparent 45%),
          linear-gradient(180deg, #F8FAFC, #FFFFFF)
        `
      }}
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay hero-grain"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-primary/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-border-default shadow-sm mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent-primary">
              Pricing Models
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-text-primary tracking-tighter leading-[1.05]">
            Flexible <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-indigo-500 to-purple-600">engagements</span>.{" "}
            <br className="hidden md:block" />
            Clear <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-accent-primary">delivery models</span>.
          </h2>

          <p className="text-lg md:text-xl text-text-muted/80 leading-relaxed max-w-[600px] mx-auto font-medium">
            Choose from six proven pricing structures, each designed for a different stage of product growth and delivery certainty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          {pricingModels.map((model, index) => {
            const Icon = iconMap[model.icon];
            return (
              <div
                key={model.id}
                className={`
                  relative flex flex-col rounded-[2rem] p-7 md:p-8 transition-all duration-500 group
                  ${
                    model.highlighted
                      ? "bg-gradient-to-b from-[#0f172a] to-[#020617] text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/5"
                      : "bg-white/75 backdrop-blur-xl border border-white shadow-premium hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
                  }
                `}
              >
                {model.highlighted && (
                  <div className="absolute inset-0 rounded-[2rem] border border-accent-primary/30 opacity-50 pointer-events-none"></div>
                )}

                {model.highlighted && (
                  <div className="absolute -top-5 left-6 flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-gradient-to-r from-accent-primary to-purple-600 text-white shadow-glow-primary">
                    Highlighted
                  </div>
                )}

                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${
                      model.highlighted
                        ? "bg-white/5 shadow-inner"
                        : "bg-gradient-to-br from-bg-base to-white shadow-sm"
                    }`}
                  >
                    <Icon size={24} strokeWidth={2} className="text-accent-primary" />
                  </div>
                  <span
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-black tracking-wider ${
                      model.highlighted
                        ? "bg-white/10 text-white"
                        : "bg-accent-primary/10 text-accent-primary"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mb-6">
                  <p
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black tracking-[0.16em] uppercase mb-4 ${
                      model.highlighted ? "bg-white/10 text-white/80" : "bg-accent-primary/10 text-accent-primary"
                    }`}
                  >
                    {model.badge}
                  </p>
                  <h3 className={`text-2xl font-black mb-2 tracking-tight ${model.highlighted ? "text-white" : "text-text-primary"}`}>
                    {model.title}
                  </h3>
                  <p className={`text-[11px] font-black tracking-[0.2em] uppercase ${model.highlighted ? "text-accent-primary" : "text-text-muted"}`}>
                    {model.pricingTitle}
                  </p>
                </div>

                <div className="mb-6">
                  <p className={`text-sm leading-relaxed font-semibold ${model.highlighted ? "text-white/90" : "text-text-secondary"}`}>
                    {model.pricingSummary}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className={`text-sm font-black uppercase tracking-[0.14em] mb-3 ${model.highlighted ? "text-white/90" : "text-text-primary"}`}>
                    When is it a good fit?
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {model.whenFit.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            model.highlighted ? "bg-accent-primary shadow-glow-primary-soft" : "bg-accent-primary/10"
                          }`}
                        >
                          <Check size={10} strokeWidth={4} className={model.highlighted ? "text-white" : "text-accent-primary"} />
                        </span>
                        <span className={`text-sm leading-relaxed ${model.highlighted ? "text-white/75" : "text-text-secondary"}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {model.pricingItems && (
                  <div className={`mb-8 rounded-2xl border px-4 py-3 ${model.highlighted ? "border-white/15 bg-white/5" : "border-border-default bg-bg-base/40"}`}>
                    <ul className="space-y-2.5">
                      {model.pricingItems.map((item) => (
                        <li key={item.label} className="flex items-start justify-between gap-4">
                          <span className={`text-xs font-black uppercase tracking-[0.12em] ${model.highlighted ? "text-white/75" : "text-text-muted"}`}>
                            {item.label}
                          </span>
                          <span className={`text-xs text-right leading-relaxed ${model.highlighted ? "text-white/85" : "text-text-secondary"}`}>
                            {item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  type="button"
                  onClick={openBooking}
                  className={`
                    mt-auto w-full py-4 rounded-xl font-black text-[11px] md:text-xs tracking-[0.16em] uppercase transition-all duration-300
                    ${
                      model.highlighted
                        ? "bg-gradient-to-r from-accent-primary to-purple-600 text-white shadow-glow-primary hover:shadow-glow-primary-soft hover:-translate-y-0.5"
                        : "bg-text-primary text-white hover:bg-black hover:-translate-y-0.5"
                    }
                  `}
                >
                  Discuss This Model
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-10 md:mt-14 text-center">
          <p className="text-sm md:text-base text-text-muted">
            Every engagement starts with a free estimate for cost and timeline.
          </p>
        </div>
      </div>
    </Section>
  );
}
