"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 2.4 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-6 md:py-7 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/80 backdrop-blur-md border-b border-stone-900/60"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-serif tracking-[0.08em] uppercase relative group"
          aria-label="LEXy MEDIA home"
        >
          LEXy <span className="text-[#ff3b00]">MEDIA</span>
          <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#ff3b00] transition-all duration-500 group-hover:w-full" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-sans font-medium tracking-[0.2em] uppercase">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="relative group text-stone-400 hover:text-stone-100 transition-colors duration-300"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#ff3b00] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <a
            href="tel:7256972732"
            className="ml-4 px-5 py-2.5 text-[10px] border border-stone-700 hover:border-[#ff3b00] hover:text-[#ff3b00] transition-all duration-300"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block w-6 h-[1px] bg-stone-300 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-[1px] bg-stone-300 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[1px] bg-stone-300 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-[#080808] flex flex-col justify-center px-8 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <nav className="flex flex-col gap-8">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[12vw] font-serif uppercase text-stone-200 leading-none hover:text-[#ff3b00] transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-12 flex flex-col gap-4">
          <a
            href="tel:7256972732"
            onClick={() => setMenuOpen(false)}
            className="inline-block self-start px-6 py-3 text-xs uppercase tracking-widest border border-[#ff3b00] text-[#ff3b00]"
          >
            Let's Talk: 7256972732
          </a>
          <a href="mailto:hello@lexymedia.com" className="text-sm text-stone-500">
            hello@lexymedia.com
          </a>
        </div>
      </div>
    </>
  );
}
