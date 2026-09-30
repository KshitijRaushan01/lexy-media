"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force scroll top immediately
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const obj = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide the loader up off screen
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          delay: 0.1,
          onStart: () => {
            document.body.style.overflow = "";
          },
          onComplete: () => {
            onComplete();
            // After animation, hide it from accessibility tree
            if (containerRef.current) {
              containerRef.current.setAttribute("aria-hidden", "true");
              containerRef.current.style.pointerEvents = "none";
            }
          },
        });
      },
    });

    // Subtle logo entrance
    tl.fromTo(
      logoRef.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
      0
    );

    // Progress sweep: 0 → 100 over 1.6s
    tl.to(
      obj,
      {
        v: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          const n = Math.round(obj.v);
          if (numRef.current) numRef.current.textContent = String(n).padStart(2, "0");
          if (barRef.current) barRef.current.style.transform = `scaleX(${n / 100})`;
        },
      },
      0.2
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center"
      role="status"
      aria-label="Loading LEXy MEDIA"
    >
      <div className="flex flex-col items-center gap-10 w-full max-w-xs px-8">
        <div ref={logoRef} style={{ opacity: 0 }}>
          <h1 className="text-3xl md:text-4xl font-serif uppercase tracking-[0.15em] text-[#f0ede6]">
            LEXy <span className="text-[#ff3b00]">MEDIA</span>
          </h1>
        </div>

        <div className="w-full flex flex-col gap-2">
          {/* Bar */}
          <div className="w-full h-[1px] bg-stone-800 relative overflow-hidden">
            <div
              ref={barRef}
              className="absolute top-0 left-0 h-full w-full bg-[#ff3b00] origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          {/* Counter */}
          <div className="flex justify-between">
            <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-stone-700">
              Loading
            </span>
            <span
              ref={numRef}
              className="text-[9px] font-sans uppercase tracking-[0.35em] text-stone-500 tabular-nums"
            >
              00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
