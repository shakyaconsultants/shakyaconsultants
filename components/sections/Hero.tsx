"use client";

import BookingCalendarWidget from "@/components/ui/BookingCalendarWidget";
import BookingCard from "@/components/ui/BookingCard";
import Button from "@/components/ui/Button";
import { useBookingModal } from "@/context/BookingModalContext";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Hero() {
  const { openBooking } = useBookingModal();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const avatars = [
    "https://i.pravatar.cc/150?u=a",
    "https://i.pravatar.cc/150?u=b",
    "https://i.pravatar.cc/150?u=c",
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center pt-16 md:pt-20 lg:pt-24 overflow-hidden bg-[#F7FAFF]"
    >
      {/* --- LAYERED DEPTH BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.04)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_right,transparent_10%,black_100%)] opacity-20"></div>
        
        {/* Layer 2: Radial Glow LEFT (Very Subtle) */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-500/[0.05] rounded-full blur-[120px]"></div>
        
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[560px] h-[560px] bg-accent-primary/[0.08] rounded-full blur-[140px]"></div>

        {/* Layer 4: Noise Grain */}
        <div className="hero-grain opacity-[0.02]"></div>

        <div className="vignette-overlay opacity-20"></div>
      </div>

      {/* --- HERO CONTENT WRAPPED IN NEW CONTAINER SYSTEM --- */}
      <div className="hero-container py-12 md:py-24">
        <div className="hero-grid">
          
          {/* Left Block: Strategic Messaging */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-700">
            {/* Elite Badge - Upgraded for Hierarchy */}
            <div className="reveal reveal-visible stagger-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 bg-white border border-black/[0.04] shadow-sm backdrop-blur-md">
               <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.25em] text-text-primary/70">
                 Product Engineering Team
               </span>
            </div>

            {/* Headline: Masterpiece Component */}
            <h1 className="reveal reveal-visible stagger-2 text-5xl md:text-7xl lg:text-8xl text-text-primary mb-6 font-bold leading-[1.05] tracking-[-0.5px]">
              We build <br className="hidden md:block" />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#4F46E5] bg-[length:200%_auto] animate-gradient-shift">
                 scalable digital products
                 <span className="absolute bottom-0 left-0 w-full h-[6px] bg-accent-primary/10 rounded-full blur-[8px] -z-10"></span>
              </span> <br className="hidden md:block" />
              for modern teams
            </h1>

            {/* Subtext: Focused & Readable */}
            <p className="reveal reveal-visible stagger-3 text-lg md:text-[18px] text-[#5B6474] leading-[1.6] mb-10 max-w-[520px] font-medium">
               We help startups and enterprises design, build, and scale reliable software with clean execution and measurable outcomes.
            </p>

            {/* CTA Layer - Precise Spacing */}
            <div className="reveal reveal-visible stagger-4 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
               <Button
                  variant="primary"
                  size="lg"
                  onClick={openBooking}
                  className="w-full sm:w-auto min-w-[220px]"
               >
                  Book a call
               </Button>
               
               <a
                  href="#work"
                  onClick={(e) => handleSmoothScroll(e, "#work")}
                  className="w-full sm:w-auto"
               >
                  <Button
                     variant="secondary"
                     size="lg"
                     className="w-full sm:w-auto min-w-[220px] bg-white hover:bg-slate-50 border-black/[0.08]"
                  >
                     View our work
                  </Button>
               </a>
            </div>

            {/* UPGRADED Trust Strip (Bottom Left) */}
            <div className="reveal reveal-visible stagger-5 mt-10 pt-10 border-t border-black/[0.04] flex items-center gap-5">
               <div className="flex -space-x-3">
                  {avatars.map((url, i) => (
                     <div key={i} className="relative w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100">
                        <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                     </div>
                  ))}
               </div>
               <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1">
                     <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                        ))}
                     </div>
                     <span className="text-[11px] font-bold text-text-primary tracking-tight">Rated 5.0/5.0</span>
                  </div>
                  <span className="text-[10px] font-bold text-text-muted/60 uppercase tracking-widest">
                     By <span className="text-text-primary">20+</span> High-Growth Teams
                  </span>
               </div>
            </div>
          </div>

          {/* Right side: Floating glassmorphism booking card centered for balance */}
          <div className="reveal reveal-visible stagger-6 relative w-full flex items-center justify-center lg:justify-end min-w-0">
            {/* Visual halo behind the asset - contained to prevent horizontal scroll */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none"></div>
            
            <div className="w-full max-w-[480px] animate-float relative z-10">
               <div className="relative group transition-all duration-700">
                 {/* High-intensity halo glow on hover */}
                 <div className="absolute -inset-10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-[40px] blur-[80px] opacity-0 group-hover:opacity-60 transition-opacity duration-1000"></div>
                 
                 <BookingCard 
                   className="relative shadow-none border-none overflow-hidden" 
                   brandName="Shakya"
                 >
                   <BookingCalendarWidget />
                 </BookingCard>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
