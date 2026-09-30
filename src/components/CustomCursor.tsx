"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });

    // Snap the dot to cursor immediately (quickTo for performance)
    const dotX = gsap.quickTo(dot, "x", { duration: 0.05 });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.05 });

    // Lag the ring a little for a trailing effect
    const ringX = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3" });

    // Reveal on first mouse move
    let revealed = false;

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      if (!revealed) {
        gsap.to([dot, ring], { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
        revealed = true;
      }
    };

    const onEnterInteractive = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor-text]");
      if (!el) return;

      const text = el.getAttribute("data-cursor-text") || "";
      if (text && label) {
        label.textContent = text;
        gsap.to(ring, { scale: 3.5, backgroundColor: "#ff3b00", borderColor: "#ff3b00", duration: 0.35, ease: "power2.out" });
        gsap.to(dot, { scale: 0, duration: 0.2 });
        gsap.to(label, { autoAlpha: 1, duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 1.8, backgroundColor: "transparent", borderColor: "#f0ede6", duration: 0.3, ease: "power2.out" });
        gsap.to(dot, { scale: 1.5, backgroundColor: "#ff3b00", duration: 0.25 });
        gsap.to(label, { autoAlpha: 0, duration: 0.15 });
      }
    };

    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderColor: "#f0ede630", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, backgroundColor: "#f0ede6", duration: 0.25 });
      gsap.to(label, { autoAlpha: 0, duration: 0.15 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnterInteractive);
    window.addEventListener("mouseout", onLeaveInteractive);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnterInteractive);
      window.removeEventListener("mouseout", onLeaveInteractive);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#f0ede6] pointer-events-none z-[9999] hidden sm:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#f0ede630] pointer-events-none z-[9998] hidden sm:flex items-center justify-center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <span
          ref={labelRef}
          className="text-[7px] font-sans font-bold uppercase tracking-widest text-[#f0ede6] opacity-0"
        />
      </div>
    </>
  );
}
