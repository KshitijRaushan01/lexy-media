"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * StatementSection — PINNED
 * The section pins on entering the viewport.
 * While pinned:
 *   1. Line 1 wipes in from left (clip-path)
 *   2. Line 2 wipes in from left (scrubbed, slower)
 * Only after both lines are fully revealed does the pin release
 * and the page scrolls to the next section.
 */
export default function StatementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "statement-scroll",
          trigger: section,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 1.5),
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Line 1: wipes in fast (0% to 35% of the scroll)
      tl.fromTo(
        line1Ref.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 3.5, ease: "none" },
        0
      );

      // Line 2: wipes in (42% to 75% of the scroll)
      tl.fromTo(
        line2Ref.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 3.3, ease: "none" },
        4.2
      );

      // Dedicated hold dwell (7.5 to 10.0 = 25% of scroll distance)
      // Both lines stay 100% revealed, sharp, and stationary while pinned.
      // The section moves ONLY after this scroll effect ends.
      tl.to({}, { duration: 2.5 }, 7.5);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="relative w-full h-screen flex items-center bg-[#f0ede6] text-[#080808] overflow-hidden px-6 md:px-16"
    >
      <div className="w-full max-w-[95vw]">
        {/* Line 1 — clipped from right, reveals left-to-right */}
        <div
          ref={line1Ref}
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <p
            className="font-serif uppercase tracking-tight leading-[0.88]"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 9rem)" }}
          >
            GOOD CONTENT GETS SEEN.
          </p>
        </div>

        {/* Spacer */}
        <div className="h-3 md:h-5" />

        {/* Line 2 — outlined italic, also clipped */}
        <div
          ref={line2Ref}
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <p
            className="font-serif uppercase italic tracking-tight leading-[0.88]"
            style={{
              fontSize: "clamp(2.8rem, 7.5vw, 9rem)",
              WebkitTextStroke: "1.5px #080808",
              color: "transparent",
            }}
          >
            GREAT CONTENT GETS REMEMBERED.
          </p>
        </div>
      </div>

      {/* Decorative label */}
      <div className="absolute bottom-10 left-6 md:left-16 flex items-center gap-3">
        <div className="w-6 h-[1px] bg-[#080808]/30" />
        <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-[#080808]/40">
          Our Philosophy
        </span>
      </div>
    </section>
  );
}
