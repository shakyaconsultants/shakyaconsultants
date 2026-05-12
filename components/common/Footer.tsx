"use client";

import { useBookingModal } from "@/context/BookingModalContext";
import * as Lucide from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const { openBooking } = useBookingModal();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      if (href.startsWith("/#")) {
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-[#F3F7FF] text-text-primary pt-16 pb-10 overflow-hidden border-t border-black/[0.05]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-accent-primary/8 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 left-0 w-[420px] h-[420px] bg-sky-400/10 rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-4">
              <Image
                src="/assets/logo.png"
                alt="Shakya Consultants"
                width={52}
                height={52}
                className="h-12 w-auto object-contain"
              />
              <div className="text-3xl md:text-4xl font-black tracking-tighter text-text-primary">
                Shakya <span className="text-accent-primary">Consultants</span>
              </div>
            </Link>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-md">
              We build modern software systems with a practical, product-first approach for ambitious teams.
            </p>
            <a
              href="https://www.linkedin.com/company/shakya-consultants/"
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border-default bg-white text-accent-primary hover:bg-accent-primary hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1zM5.54 9.78h2.8V18h-2.8V9.78zM10.02 9.78h2.69v1.12h.04c.37-.7 1.28-1.44 2.63-1.44 2.81 0 3.33 1.85 3.33 4.25V18h-2.8v-3.8c0-.9-.02-2.06-1.26-2.06-1.26 0-1.45.98-1.45 2v3.86h-2.8V9.78z" />
              </svg>
            </a>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">Services</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { name: "Engineering Speed", href: "/#speed" },
                  { name: "Capabilities", href: "/#capabilities" },
                  { name: "Featured Work", href: "/#work" },
                  { name: "Project Archive", href: "/projects" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e as any, item.href)}
                    className="text-sm font-semibold text-text-secondary hover:text-accent-primary transition-colors w-fit"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">Company</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { name: "About", href: "/#about" },
                  { name: "Approach", href: "/approach" },
                  { name: "Testimonials", href: "/#testimonials" },
                  { name: "FAQ", href: "/#faq" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e as any, item.href)}
                    className="text-sm font-semibold text-text-secondary hover:text-accent-primary transition-colors w-fit"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">Get In Touch</h4>

            <a href="mailto:info@ShakyaConsultants.com" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-border-default flex items-center justify-center text-accent-primary">
                <Lucide.Mail size={17} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Email</p>
                <p className="text-sm font-semibold text-text-primary">info@ShakyaConsultants.com</p>
              </div>
            </a>

            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 bg-accent-primary text-white py-3.5 px-5 rounded-xl text-xs font-black uppercase tracking-[0.16em] hover:bg-accent-primary-hover transition-colors"
            >
              Schedule Strategy
              <Lucide.ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-black/[0.06] flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} <span className="font-semibold text-text-primary">Shakya Consultants</span>
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted hover:text-accent-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted hover:text-accent-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
