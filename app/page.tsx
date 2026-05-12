import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import FeaturedWork from "@/components/sections/FeaturedWork";
import FeaturesStrip from "@/components/sections/FeaturesStrip";
import About from "@/components/sections/About";
import Speed from "@/components/sections/Speed";
import Capabilities from "@/components/sections/Capabilities";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      
      <main className="min-h-screen bg-white">
        <Hero />
        
        {/* Layered Content Sections */}
        <div className="relative z-10 bg-white">
          <TrustedBy className="bg-white border-b border-border-subtle" />
          
          <FeaturedWork className="bg-bg-base/50" />
          
          <FeaturesStrip className="bg-white" />
          
          <About className="bg-bg-soft/20" />
          
          <Speed className="bg-white" />
          
          <Capabilities className="bg-bg-soft/40" />

          <section className="relative py-20 md:py-24 bg-white border-t border-border-subtle">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-text-primary tracking-tighter leading-[1.05]">
                Tailored pricing for every stage
              </h2>
              <p className="mt-6 text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium">
                Whether you&apos;re scaling fast, testing waters, or going all in - we&apos;ve got pricing models tailored to your rhythm.
              </p>
              <Link
                href="/pricing"
                className="mt-10 inline-flex items-center justify-center rounded-full bg-accent-primary px-8 py-4 text-xs md:text-sm font-black tracking-[0.16em] uppercase text-white shadow-glow-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-primary-soft"
              >
                See how our pricing works
              </Link>
            </div>
          </section>
          
          <Testimonials className="bg-bg-indigo-soft/30" />
          
          <FAQ className="bg-white" />
          
          <Contact className="bg-white" />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
