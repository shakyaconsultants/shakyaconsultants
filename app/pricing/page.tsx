import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Pricing from "@/components/sections/Pricing";
import Section from "@/components/ui/Section";

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-bg-base pt-24">
        <Section
          className="pt-14 pb-16 md:pt-20 md:pb-20"
          style={{
            background: `
              radial-gradient(circle at 15% 15%, rgba(99,102,241,0.08), transparent 38%),
              radial-gradient(circle at 85% 20%, rgba(139,92,246,0.10), transparent 40%),
              linear-gradient(180deg, #F8FAFC, #FFFFFF)
            `,
          }}
        >
          <div className="max-w-5xl mx-auto text-center space-y-7">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-border-default shadow-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent-primary">
                Pricing
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary tracking-tight leading-[1.05]">
              Get started in as little as{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-indigo-500 to-purple-600">
                24 hours
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto font-medium">
              We provide a free and guaranteed estimate for cost and timeline with every engagement, then align you with the pricing model that fits your goals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="rounded-2xl border border-border-default bg-white/80 px-5 py-4 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-text-muted mb-2">Estimate</p>
                <p className="text-sm font-semibold text-text-primary">Free & guaranteed</p>
              </div>
              <div className="rounded-2xl border border-border-default bg-white/80 px-5 py-4 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-text-muted mb-2">Timeline</p>
                <p className="text-sm font-semibold text-text-primary">Aligned before kickoff</p>
              </div>
              <div className="rounded-2xl border border-border-default bg-white/80 px-5 py-4 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-text-muted mb-2">Models</p>
                <p className="text-sm font-semibold text-text-primary">6 flexible engagement types</p>
              </div>
            </div>
          </div>
        </Section>

        <Pricing className="bg-white border-t border-border-subtle" />
      </main>

      <Footer />
    </>
  );
}
