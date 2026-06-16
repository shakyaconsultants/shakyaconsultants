"use client";

import Section from "@/components/ui/Section";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function About({ className = "" }: { className?: string }) {
  return (
    <Section 
      id="about" 
      className={`relative py-16 md:py-24 overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(99,102,241,0.08), transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(139,92,246,0.12), transparent 40%),
          linear-gradient(180deg, #F8FAFC, #FFFFFF)
        `
      }}
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay hero-grain"></div>
      {/* Visual Depth: Floating Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Superior 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: High-Impact Headline */}
          <div className="relative">
            {/* Subtle floating glow behind text */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent-primary/10 rounded-full blur-3xl opacity-50"></div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-text-primary leading-[1.05] tracking-tighter">
              We build <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-indigo-500 to-purple-600">
                scalable software
              </span> <br />
              that drives real business impact
            </h2>
          </div>

          {/* Right Side: Premium Copy & CTA */}
          <div className="flex flex-col items-start">
            <div className="max-w-xl space-y-6">
              <p className="text-lg md:text-xl text-text-muted/90 leading-relaxed font-medium">
                Our engineering approach is built around performance, scalability, and long-term business impact. 
                We design systems that are not only technically robust but strategically aligned with your growth goals.
              </p>
              
              <p className="text-lg md:text-xl text-text-muted/70 leading-relaxed">
                From backend architecture to full-scale platforms, we help companies build reliable, 
                high-performing products that scale with confidence.
              </p>

              <p className="text-lg md:text-xl text-text-muted/70 leading-relaxed">
                Every solution we deliver is crafted with deep technical expertise and a strong understanding 
                of modern digital ecosystems — ensuring your business stays ahead in a competitive landscape.
              </p>

                <Link
                  href="/approach"
                  className="inline-flex items-center gap-2 text-accent-primary text-lg font-black tracking-widest uppercase transition-all duration-300 group relative py-2"
                >
                  Explore our approach
                  <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
                  
                  {/* Premium Hover Underline Animation */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>

            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
