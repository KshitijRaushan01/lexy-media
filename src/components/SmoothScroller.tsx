"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== "undefined") {
  (window as any).ScrollTrigger = ScrollTrigger;
}

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const rafCallback = useCallback((time: number) => {
    lenisRef.current?.raf(time * 1000);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Reset scroll position on every mount ────────────────────────────
    window.scrollTo(0, 0);

    // ── Tell ScrollTrigger NOT to compensate for Lenis virtual scroll ──
    // Lenis intercepts wheel events; ST must see the same "scroll" value.
    ScrollTrigger.defaults({ markers: false });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

      // ── The canonical Lenis + GSAP ScrollTrigger integration ─────────
      // 1. On each Lenis scroll event, tell ST the scroll happened
      lenis.on("scroll", ScrollTrigger.update);

      // 2. Drive Lenis from the GSAP ticker (NOT requestAnimationFrame directly)
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);

      // 3. Smooth anchor link navigation across pinned sections
      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest("a[href^='#']");
        if (!target) return;
        const href = target.getAttribute("href");
        if (!href || href === "#") return;
        const el = document.querySelector(href);
        if (el && lenisRef.current) {
          e.preventDefault();
          lenisRef.current.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
        }
      };
      document.addEventListener("click", handleAnchorClick);

      // 4. After all components mount and ScrollTriggers register, do a full refresh
      // Delay ensures all pinned sections have correct dimensions
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 300);

      return () => {
        clearTimeout(refreshTimer);
        document.removeEventListener("click", handleAnchorClick);
        gsap.ticker.remove(rafCallback);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        lenisRef.current = null;
      };
  }, [rafCallback]);

  return <>{children}</>;
}
