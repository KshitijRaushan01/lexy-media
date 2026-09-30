"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(
        section.querySelector(".about-label"),
        { autoAlpha: 0, x: -20 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      // Each headline line staggers in
      const lines = section.querySelectorAll<HTMLElement>(".about-line");
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: section, start: "top 70%" },
          }
        );
      });

      // Body copy + descriptors
      gsap.fromTo(
        section.querySelector(".about-body"),
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.35,
          scrollTrigger: { trigger: section, start: "top 65%" },
        }
      );

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#080808] py-36 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <div
          className="about-label flex items-center gap-3 mb-20"
          style={{ opacity: 0 }}
        >
          <div className="w-6 h-[1px] bg-stone-700" />
          <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-stone-500">
            About
          </span>
        </div>

        {/* Headline lines */}
        <div className="flex flex-col gap-0 mb-16">
          {[
            { text: "WE DON'T JUST", red: false, italic: false },
            { text: "MANAGE SOCIAL MEDIA.", red: false, italic: false },
            { text: "WE BUILD THE REASON", red: true, italic: true },
            { text: "PEOPLE STOP SCROLLING.", red: true, italic: true },
          ].map(({ text, red, italic }, i) => (
            <p
              key={i}
              className={`about-line font-serif uppercase leading-[0.9] tracking-tight ${
                italic ? "italic" : ""
              } ${red ? "text-[#ff3b00]" : ""}`}
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 6.5rem)", opacity: 0 }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Body */}
        <div
          className="about-body flex flex-col md:flex-row gap-12 md:gap-24"
          style={{ opacity: 0 }}
        >
          <p className="text-lg md:text-xl font-light text-stone-400 leading-relaxed max-w-xl">
            LEXy MEDIA helps brands turn ideas into strategic, creative and consistent
            social media experiences.
          </p>

          <div className="flex flex-col gap-6 md:ml-auto md:items-end">
            {[
              ["Strategy", "We plan with purpose"],
              ["Content", "We create with intention"],
              ["Growth", "We measure what matters"],
            ].map(([label, val]) => (
              <div key={label} className="flex items-start gap-4 md:flex-row-reverse md:gap-6">
                <div className="md:text-right">
                  <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-stone-600 block mb-0.5">
                    {label}
                  </span>
                  <span className="text-sm font-light text-stone-400">{val}</span>
                </div>
                <div className="w-6 h-[1px] bg-stone-700 mt-2.5 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
