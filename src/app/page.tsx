"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import HeroCamera from "@/components/HeroCamera";
import ServicesScroll from "@/components/ServicesScroll";
import ClientMarquee from "@/components/ClientMarquee";
import WorkSection from "@/components/WorkSection";
import StatementSection from "@/components/StatementSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Prevent browser scroll restoration from jumping to mid-page
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // When loader finishes and main content becomes visible, refresh ScrollTrigger
  useEffect(() => {
    if (!loaded) return;
    gsap.registerPlugin(ScrollTrigger);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [loaded]);

  return (
    <>
      {/* Loading screen is always in DOM but controls visibility */}
      <LoadingScreen onComplete={handleLoadComplete} />

      <main
        id="main-content"
        className="w-full flex flex-col"
        // Keep in DOM but invisible so GSAP can measure heights during load
        style={{
          visibility: loaded ? "visible" : "hidden",
          pointerEvents: loaded ? "auto" : "none",
        }}
        aria-hidden={!loaded}
      >
        {/* 1. Hero — pinned, scroll-scrubs video + text layers */}
        <HeroCamera />

        {/* 2. Services — pinned, sequential panel reveal */}
        <ServicesScroll />

        {/* 3. Work transition heading */}
        <div className="bg-[#080808] w-full py-28 px-6 md:px-16 overflow-hidden">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-[1px] bg-stone-700" />
            <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-stone-500">
              The Work
            </span>
          </div>
          <h2
            className="font-serif uppercase tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 11vw, 12rem)", lineHeight: 0.88 }}
          >
            LET'S LOOK
            <br />
            <span
              className="italic"
              style={{ WebkitTextStroke: "1.5px #f0ede6", color: "transparent" }}
            >
              AT THE WORK.
            </span>
          </h2>
        </div>

        {/* 4. Client marquee with logos */}
        <ClientMarquee />

        {/* 5. Selected work with clip-path reveals */}
        <WorkSection />

        {/* 6. Statement — pinned, scrub reveals both lines */}
        <StatementSection />

        {/* 7. About — staggered line reveals */}
        <AboutSection />

        {/* 8. Contact CTA */}
        <ContactSection />

        {/* 9. Footer */}
        <Footer />
      </main>
    </>
  );
}
