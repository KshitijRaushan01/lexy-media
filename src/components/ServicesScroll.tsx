"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { index: "01", tag: "Strategy",   title: "CONTENT\nPLANNING",        desc: "We turn scattered ideas into content systems built around your brand, audience and goals." },
  { index: "02", tag: "Management", title: "SOCIAL MEDIA\nMANAGEMENT",  desc: "Your social presence should feel alive, consistent and unmistakably yours." },
  { index: "03", tag: "Creative",   title: "CREATIVE\nDIRECTION",       desc: "From visual identity to campaign concepts, we create content people actually want to look at." },
  { index: "04", tag: "Production", title: "REELS &\nSHORT-FORM VIDEO", desc: "Fast, visual and built for the way people consume content now." },
  { index: "05", tag: "Strategy",   title: "SOCIAL MEDIA\nSTRATEGY",    desc: "Every post should have a reason to exist." },
  { index: "06", tag: "Narrative",  title: "BRAND\nSTORYTELLING",      desc: "We turn what your brand does into something people remember." },
];

const VH_PER_PANEL = 90; // vh between each service reveal

export default function ServicesScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Total pinned scroll budget ──────────────────────────────────
      // Ample scroll distance giving each of the 6 services its own
      // entrance, reading dwell, and exit, exactly matching HeroCamera.
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "services-pinned-scroll",
          trigger: section,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 5.0),
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8, // Responsive scrub matching HeroCamera
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (counterRef.current) {
              const idx = Math.min(
                services.length,
                Math.floor(self.progress * (services.length - 0.02)) + 1
              );
              counterRef.current.textContent = `0${idx}`;
            }
          },
        },
      });

      // ── Layer Choreography matching HeroCamera kinematics ────────────
      // Layer 01: starts visible, dwells, then fades out upward
      tl.to(
        "#service-layer-0",
        { autoAlpha: 0, y: -60, duration: 1.2, ease: "power2.in" },
        1.4
      );

      // Layer 02: enters from y: 60 -> dwells -> exits upward to y: -60
      tl.fromTo(
        "#service-layer-1",
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" },
        2.0
      );
      tl.to(
        "#service-layer-1",
        { autoAlpha: 0, y: -60, duration: 1.2, ease: "power2.in" },
        4.2
      );

      // Layer 03: enters from y: 60 -> dwells -> exits upward to y: -60
      tl.fromTo(
        "#service-layer-2",
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" },
        4.8
      );
      tl.to(
        "#service-layer-2",
        { autoAlpha: 0, y: -60, duration: 1.2, ease: "power2.in" },
        7.0
      );

      // Layer 04: enters from y: 60 -> dwells -> exits upward to y: -60
      tl.fromTo(
        "#service-layer-3",
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" },
        7.6
      );
      tl.to(
        "#service-layer-3",
        { autoAlpha: 0, y: -60, duration: 1.2, ease: "power2.in" },
        9.8
      );

      // Layer 05: enters from y: 60 -> dwells -> exits upward to y: -60
      tl.fromTo(
        "#service-layer-4",
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" },
        10.4
      );
      tl.to(
        "#service-layer-4",
        { autoAlpha: 0, y: -60, duration: 1.2, ease: "power2.in" },
        12.6
      );

      // Layer 06 (FINAL): enters from y: 60 -> enters boldly
      tl.fromTo(
        "#service-layer-5",
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out" },
        13.2
      );

      // ────────────────────────────────────────────────────────────────
      // 14.4 -> 17.0: THE HOLD DWELL (Final Service 06 remains fixed)
      // Service 06 is fully readable, centered, and stationary while pinned.
      // The section moves ONLY after this scroll effect concludes.
      // ────────────────────────────────────────────────────────────────
      tl.to({}, { duration: 2.6 }, 14.4);

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#080808] overflow-hidden"
    >
      {/* Label */}
      <div className="absolute top-8 left-6 md:top-12 md:left-16 z-20 flex items-center gap-3">
        <div className="w-6 h-[1px] bg-stone-700" />
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-stone-500">
          What We Do
        </span>
      </div>

      {/* Counter */}
      <div className="absolute bottom-8 right-6 md:bottom-10 md:right-16 z-20">
        <span className="text-[10px] font-sans text-stone-600 tabular-nums">
          <span ref={counterRef} className="text-[#ff3b00] font-semibold">01</span> / 0{services.length} Services
        </span>
      </div>

      {/* ── Panels: stacked absolutely, scrubbed one by one ── */}
      {services.map((s, i) => (
        <div
          key={i}
          id={`service-layer-${i}`}
          className="absolute inset-0 flex items-end px-6 pb-20 md:px-16 md:pb-24 lg:px-24 pointer-events-none will-change-[transform,opacity]"
          style={i !== 0 ? { opacity: 0, visibility: "hidden" } : undefined}
        >
          <div className="w-full max-w-5xl pointer-events-auto">
            {/* Index + tag */}
            <span className="block text-[10px] font-sans uppercase tracking-[0.4em] text-[#ff3b00] mb-6">
              {s.index} — {s.tag}
            </span>

            {/* Title */}
            <h2
              className="font-serif uppercase tracking-tight mb-8"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 9rem)",
                lineHeight: 0.88,
                whiteSpace: "pre-line",
              }}
            >
              {s.title}
            </h2>

            {/* Description */}
            <div className="flex items-start gap-6 max-w-2xl">
              <div className="w-6 h-[1px] bg-stone-700 mt-3 shrink-0" />
              <p className="text-base md:text-lg font-light text-stone-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
