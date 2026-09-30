"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroCamera() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let ctx: gsap.Context | null = null;

    const boot = () => {
      if (ctx) return; // prevent double-init
      if (!video.duration || video.duration === Infinity) return;

      ctx = gsap.context(() => {
        const SCROLL = "+=260vh";

        // ─── UNIFIED TIMELINE WITH PINNING ────────────────────────────────
        // Single ScrollTrigger manages pinning, video scrubbing, text layers,
        // and a dedicated hold dwell so the section moves ONLY when the effect ends.
        const tl = gsap.timeline({
          scrollTrigger: {
            id: "hero-pinned-scroll",
            trigger: section,
            start: "top top",
            end: SCROLL,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.8, // Responsive scrub without sluggish trailing lag
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Video scrubs cleanly from 0 to full duration, finishing by 80% scroll
              // so the final dramatic cinematic frame holds during the dwell.
              if (video.duration) {
                const videoProgress = Math.min(1, self.progress / 0.82);
                const targetTime = videoProgress * video.duration;
                if (Math.abs(video.currentTime - targetTime) > 0.04) {
                  video.currentTime = targetTime;
                }
              }

              // Progress bar
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }

              // Hide scroll hint once scrolling starts
              if (scrollHintRef.current) {
                if (self.progress > 0.03) {
                  scrollHintRef.current.style.opacity = "0";
                  scrollHintRef.current.style.transform = "translateY(10px)";
                } else {
                  scrollHintRef.current.style.opacity = "1";
                  scrollHintRef.current.style.transform = "translateY(0)";
                }
              }
            },
          },
        });

        // ── Text Choreography (Total timeline: 10 units) ──
        // 0.0 -> 2.2: Layer 1 ("LEXy MEDIA") dwells then fades out upward
        tl.to("#hero-layer-1", { autoAlpha: 0, y: -60, duration: 2.0, ease: "power2.in" }, 0.4);

        // 2.0 -> 3.8: Layer 2 ("SOCIAL CONTENT STRATEGY") enters
        tl.fromTo(
          "#hero-layer-2",
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1.8, ease: "power2.out" },
          2.0
        );

        // 4.6 -> 5.8: Layer 2 exits upward
        tl.to("#hero-layer-2", { autoAlpha: 0, y: -60, duration: 1.4, ease: "power2.in" }, 4.6);

        // 5.8 -> 7.6: Layer 3 ("THAT MAKES PEOPLE STOP") enters boldly
        tl.fromTo(
          "#hero-layer-3",
          { autoAlpha: 0, y: 60, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.8, ease: "power3.out" },
          5.8
        );

        // ──────────────────────────────────────────────────────────────────
        // 7.6 -> 10.0: THE HOLD DWELL (24% of total scroll distance!)
        // Layer 3 and the final video frame are 100% fully presented and fixed.
        // The section remains solidly PINNED until this hold ends.
        // Only then does the section unpin and scroll away to Services.
        // ──────────────────────────────────────────────────────────────────
        tl.to({}, { duration: 2.4 }, 7.6);

        ScrollTrigger.refresh();
      });
    };

    // Boot: video metadata might already be available
    if (video.readyState >= 1 && video.duration > 0) {
      boot();
    } else {
      video.addEventListener("loadedmetadata", boot, { once: true });
      // Fallback: if metadata never fires (some browsers cache differently)
      const fallback = setTimeout(boot, 2500);
      return () => {
        clearTimeout(fallback);
        ctx?.revert();
      };
    }

    return () => { ctx?.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen bg-black overflow-hidden"
      aria-label="LEXy MEDIA – Hero"
    >
      {/* ── Video ─────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        preload="auto"
        muted
        playsInline
        src="/video/camera.mp4"
        aria-hidden="true"
      />

      {/* ── Vignettes ─────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/55 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent pointer-events-none z-[1]" />

      {/* ── Film grain ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
        }}
      />

      {/* ── Scroll progress bar ───────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-[10] overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-[#ff3b00] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* ────────────────────────────────────────────────────────
          TEXT LAYERS — Important: layers 2 & 3 use inline style
          opacity:0; visibility:hidden so they are CSS-hidden
          BEFORE JavaScript runs. GSAP autoAlpha will take over.
      ──────────────────────────────────────────────────────── */}

      {/* Layer 1 — LEXy MEDIA (visible by default) */}
      <div
        id="hero-layer-1"
        className="absolute inset-0 z-[3] flex flex-col justify-end px-8 pb-28 md:px-16 md:pb-24 pointer-events-none"
      >
        <p className="text-[10px] md:text-xs font-sans uppercase tracking-[0.4em] text-stone-400 mb-5">
          Social Media &amp; Creative Agency
        </p>
        <h1
          className="font-serif uppercase leading-[0.85] tracking-tight text-[#f0ede6]"
          style={{ fontSize: "clamp(4rem, 12vw, 13rem)" }}
        >
          LEXy<br />MEDIA
        </h1>
        <p className="mt-6 text-sm md:text-lg font-light tracking-[0.12em] uppercase text-stone-400 max-w-sm">
          We make brands impossible to scroll past.
        </p>
      </div>

      {/* Layer 2 — SOCIAL CONTENT STRATEGY (CSS-hidden initially) */}
      <div
        id="hero-layer-2"
        className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <div className="flex flex-col items-center text-center">
          {(["SOCIAL", "CONTENT", "STRATEGY"] as const).map((word, i) => (
            <span
              key={word}
              className="font-serif uppercase leading-[0.82] tracking-tight"
              style={{
                fontSize: "clamp(3rem, 11vw, 12rem)",
                WebkitTextStroke: i === 1 ? "1px #f0ede6" : undefined,
                color: i === 1 ? "transparent" : "#f0ede6",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Layer 3 — THAT MAKES PEOPLE STOP (CSS-hidden initially) */}
      <div
        id="hero-layer-3"
        className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <h2
          className="font-serif uppercase leading-[0.85] text-center tracking-tight text-[#ff3b00] px-6"
          style={{ fontSize: "clamp(3rem, 10vw, 11rem)" }}
        >
          THAT MAKES<br />PEOPLE STOP.
        </h2>
      </div>

      {/* ── Scroll hint ───────────────────────────────────────── */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-8 md:left-16 z-[5] flex flex-col items-start gap-2 pointer-events-none"
      >
        <span className="text-[9px] font-sans uppercase tracking-[0.45em] text-stone-600">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-stone-800 overflow-hidden relative">
          <div className="absolute inset-0 bg-stone-500 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
