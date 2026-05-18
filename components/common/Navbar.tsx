"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBookingModal } from "@/context/BookingModalContext";

import Button from "@/components/ui/Button";

const MENU_ANIMATION_MS = 250;
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/#about" },
  { label: "Resources", href: "/#faq" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Navbar() {
  const { openBooking, openApplyModal } = useBookingModal();
  const [crmLoginUrl, setCrmLoginUrl] = useState(
    "https://crm-eight-lac.vercel.app"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [panelEntered, setPanelEntered] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Sticky navbar: always visible; only update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection ? `#${currentSection}` : "");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCrmLoginUrl = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data?.success && data?.data?.crmLoginUrl) {
          setCrmLoginUrl(data.data.crmLoginUrl);
        }
      } catch (err) {
        console.error("Failed to fetch CRM login URL");
      }
    };

    fetchCrmLoginUrl();
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're not on the homepage and the link is a hashtag, let the default Link behavior take over to go to homepage
    if (window.location.pathname !== "/") {
      return; // Regular link behavior will navigate to /#section
    }

    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsMobileMenuOpen(false);
    }
  };


  const closeMobileMenu = useCallback(() => {
    if (!isMobileMenuOpen && !isMenuClosing) return;
    if (isMenuClosing) return;
    setIsMenuClosing(true);
    window.setTimeout(() => {
      menuToggleRef.current?.focus({ preventScroll: true });
      setIsMobileMenuOpen(false);
      setIsMenuClosing(false);
      setPanelEntered(false);
    }, MENU_ANIMATION_MS);
  }, [isMobileMenuOpen, isMenuClosing]);

  // Lock body scroll when mobile menu is open; restore when closed
  useEffect(() => {
    if (isMobileMenuOpen || isMenuClosing) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobileMenuOpen, isMenuClosing]);

  // Enter animation: after mount, trigger slide-in
  useEffect(() => {
    if (isMobileMenuOpen && !isMenuClosing) {
      setPanelEntered(false);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelEntered(true));
      });
      return () => cancelAnimationFrame(frame);
    }
    if (!isMobileMenuOpen) setPanelEntered(false);
  }, [isMobileMenuOpen, isMenuClosing]);

  // Focus close button when menu opens; trap focus and handle Escape
  useEffect(() => {
    if (!isMobileMenuOpen || isMenuClosing) return;
    closeButtonRef.current?.focus({ preventScroll: true });
    const el = menuRef.current;
    if (!el) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobileMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (node) => node.offsetParent !== null
      );
      if (focusable.length === 0) return;
      const i = focusable.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? focusable.length - 1 : i - 1) : (i === -1 || i >= focusable.length - 1 ? 0 : i + 1);
      e.preventDefault();
      focusable[next]?.focus();
    };
    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, isMenuClosing, closeMobileMenu]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 h-[68px] bg-white/85 backdrop-blur-[10px] border-b border-black/[0.05] shadow-[0_3px_14px_rgba(30,64,175,0.08)]"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              href="/#hero"
              onClick={(e) => handleSmoothScroll(e, "#hero")}
              className="flex items-center gap-2 md:gap-2.5 focus:outline-none rounded-md shrink-0"
            >
              <Image
                src="/assets/logo.png"
                alt="Shakya Consultants"
                width={52}
                height={52}
                className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain shrink-0"
                priority
              />
              <div className="text-base md:text-lg lg:text-xl font-bold tracking-tighter flex items-center leading-none whitespace-nowrap">
                <span className="text-accent-primary mr-1">Shakya</span>
                <span className="text-text-primary">Consultants</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href || (activeSection === "" && item.href === "#work");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className={`font-bold transition-all duration-300 focus:outline-none rounded-md px-1.5 py-1 relative group text-[10px] xl:text-[11px] uppercase tracking-[0.16em] xl:tracking-[0.2em] whitespace-nowrap nav-link-lift hover:-translate-y-0.5 ${
                      isActive ? "text-accent-primary" : "text-slate-600 hover:text-accent-primary"
                    }`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-[2.5px] bg-gradient-to-r from-accent-primary to-purple-600 transition-all duration-300 rounded-full shadow-[0_1px_4px_rgba(79,70,229,0.3)] ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}></span>
                  </a>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2 ml-2">
              <a
                href={crmLoginUrl}
                className="inline-flex items-center justify-center px-3.5 py-2 text-[9px] xl:text-[10px] uppercase tracking-[0.16em] xl:tracking-[0.2em] whitespace-nowrap rounded-xl border border-border-default text-text-primary font-bold transition-all duration-300 hover:border-accent-primary hover:text-accent-primary hover:scale-[1.03] active:scale-[0.95]"
              >
                Login to CRM
              </a>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  openApplyModal();
                  closeMobileMenu();
                }}
              >
                Join Our Team
              </Button>
            </div>

            {/* Mobile Menu Button — ensure always clickable above page content */}
            <button
              ref={menuToggleRef}
              type="button"
              onClick={() => {
                if (isMobileMenuOpen) closeMobileMenu();
                else setIsMobileMenuOpen(true);
              }}
              className="lg:hidden p-2 relative z-10 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer touch-manipulation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center pointer-events-none bg-accent-primary/15"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={isMobileMenuOpen ? "/assets/icon-close.svg" : "/assets/icon-menu.svg"}
                  alt=""
                  width={24}
                  height={24}
                  className="icon-primary"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile: full-screen overlay — flex column, only links section scrolls */}
      {(isMobileMenuOpen || isMenuClosing) && (
        <div
          ref={menuRef}
          className={`lg:hidden fixed top-0 left-0 w-full h-full z-[9999] flex flex-col overflow-hidden transition-transform duration-[250ms] ease-out isolate bg-[#F9FAFB] bg-[radial-gradient(circle_at_70%_30%,rgba(79,70,229,0.05),transparent_60%)] ${
            panelEntered && !isMenuClosing ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          {/* Decorative layers — no layout impact */}
          <div
            className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(1200px_circle_at_30%_20%,rgba(128,0,255,0.15),transparent_55%)]"
          />
          <div className="mobile-menu-grain absolute inset-0 pointer-events-none" aria-hidden="true" />

          {/* 3-section layout: header → Join Our Team → links (only links scroll) */}
          <div className="mobile-menu flex flex-col flex-1 min-h-0 relative z-10">
            <div className="menu-header shrink-0 flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-100">
              <a
                href="#hero"
                onClick={(e) => {
                  handleSmoothScroll(e, "#hero");
                  closeMobileMenu();
                }}
                className="flex items-center gap-3 focus:outline-none rounded-md"
              >
                <Image
                  src="/assets/logo.png"
                  alt="Shakya Consultants"
                  width={72}
                  height={72}
                  className="w-16 h-16 object-contain"
                />
                <div className="text-3xl font-bold tracking-tighter shrink-0 text-text-primary">
                  <span className="text-accent-primary">Shakya</span> <span className="text-text-primary">Consultants</span>
                </div>
              </a>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMobileMenu}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-text-primary hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary bg-accent-primary/15"
                aria-label="Close menu"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/icon-close.svg" alt="" width={24} height={24} className="icon-primary" />
              </button>
            </div>

            <div className="apply-section shrink-0 px-4 sm:px-6 py-4 border-b border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={crmLoginUrl}
                  onClick={() => closeMobileMenu()}
                  className="w-full min-h-[48px] py-4 rounded-button font-semibold text-base text-text-primary border border-border-default bg-white text-center cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-white active:opacity-90 touch-manipulation"
                >
                  Login to CRM
                </a>
                <button
                  type="button"
                  onClick={() => {
                    openApplyModal();
                    closeMobileMenu();
                  }}
                  className="w-full min-h-[48px] py-4 rounded-button font-semibold text-base text-white cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-white active:opacity-90 touch-manipulation shadow-glow-primary bg-accent-primary"
                >
                  Join Our Team
                </button>
              </div>
            </div>

            <div className="nav-links flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-4">
              <nav className="mobile-nav flex flex-col items-center gap-3" aria-label="Main">
                {navItems.map((item) =>
                  item.href === "#contact" ? (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => {
                        openBooking();
                        closeMobileMenu();
                      }}
                      className="mobile-nav-link w-full max-w-xs py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-base text-left text-text-primary"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className="mobile-nav-link block w-full max-w-xs py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-base text-text-primary text-center"
                    >
                      {item.label}
                    </a>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
