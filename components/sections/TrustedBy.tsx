"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";

export default function TrustedBy({ className = "" }: { className?: string }) {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients");
        const data = await res.json();
        if (data.success) {
          // DEBUG CHECK: Ensure all expected logos are present
          console.log("Client Logos Data:", data.data);
          
          // Remove potential duplicates and empty logos in UI for safety
          const uniqueClients = data.data.filter((client: any, index: number, self: any[]) =>
            client.logoUrl && 
            client.name && 
            self.findIndex(c => c.logoUrl === client.logoUrl || c.name === client.name) === index
          );
          
          setClients(uniqueClients);
        }
      } catch (err) {
        console.error("Failed to fetch clients logos");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const formattedClients = clients.map((c) => ({
    src: c.logoUrl,
    alt: c.name,
  }));

  if (!loading && formattedClients.length === 0) {
    return null;
  }

  const LogoItem = ({ logo }: { logo: { src: string, alt: string } }) => (
    <div className="relative flex items-center justify-center w-80 md:w-[28rem] h-30 md:h-36 flex-shrink-0">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={340}
        height={140}
        className="max-h-full max-w-full w-auto h-auto object-contain pointer-events-none select-none opacity-100 brightness-110 contrast-125 saturate-125 drop-shadow-[0_6px_18px_rgba(37,99,235,0.18)] transition-all duration-300 hover:scale-[1.03] hover:drop-shadow-[0_10px_26px_rgba(37,99,235,0.28)]"
      />
    </div>
  );

  // Single Source of Truth for both rows
  const marqueeData = [...formattedClients, ...formattedClients, ...formattedClients, ...formattedClients];

  return (
    <Section
      id="trusted"
      className={`relative py-16 overflow-hidden border-y border-black/[0.03] bg-base ${className}`}
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(99,102,241,0.03), transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(139,92,246,0.03), transparent 40%),
          #F8FAFC
        `
      }}
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay hero-grain"></div>
      {/* Visual Depth Glow */}
      <div className="absolute inset-0 blur-3xl opacity-5 pointer-events-none z-0 bg-accent-primary/10"></div>

      <div className="container mx-auto px-4 md:px-8 mb-10 text-center space-y-4 relative z-10">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-border-default shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent-primary">
            Trusted Partners
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tighter leading-[1.1] max-w-3xl mx-auto">
          Fueling the next generation <br className="hidden md:block" />
          of digital disruptors
        </h2>
      </div>

      <div className="relative z-10">
        {/* Edge Fade Masks - Matched to Soft Neutral Gray */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent z-10 pointer-events-none"></div>

        {loading ? (
          <div className="flex justify-center gap-10 overflow-hidden px-4 animate-pulse">
            {[1, 2, 3, 4, 5].map(n => <div key={n} className="w-80 md:w-[28rem] h-30 md:h-36 bg-slate-100 rounded-md" />)}
          </div>
        ) : (
          <div className="overflow-hidden w-full">
            <div className="flex flex-nowrap w-max gap-10 md:gap-12 animate-marquee pause-on-hover px-4">
              {marqueeData.map((logo, index) => (
                <LogoItem key={`row-${index}`} logo={logo} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
