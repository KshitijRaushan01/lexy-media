"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll<HTMLElement>(".contact-reveal");
      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            },
          }
        );
      });
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#080808] py-36 px-6 md:px-16 min-h-[75vh] flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Label */}
        <div
          className="contact-reveal flex items-center gap-3 mb-14"
          style={{ opacity: 0 }}
        >
          <div className="w-6 h-[1px] bg-stone-700" />
          <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-stone-500">
            Start a Project
          </span>
        </div>

        {/* Headline */}
        <p
          className="contact-reveal font-serif uppercase leading-[0.88] tracking-tight mb-3"
          style={{ fontSize: "clamp(3rem, 8vw, 9.5rem)", opacity: 0 }}
        >
          HAVE SOMETHING
        </p>
        <p
          className="contact-reveal font-serif uppercase italic leading-[0.88] tracking-tight mb-3"
          style={{
            fontSize: "clamp(3rem, 8vw, 9.5rem)",
            WebkitTextStroke: "1.5px #f0ede6",
            color: "transparent",
            opacity: 0,
          }}
        >
          WORTH SAYING?
        </p>
        <p
          className="contact-reveal font-serif uppercase leading-[0.88] tracking-tight mb-3 text-stone-600"
          style={{ fontSize: "clamp(3rem, 8vw, 9.5rem)", opacity: 0 }}
        >
          LET'S MAKE
        </p>
        <p
          className="contact-reveal font-serif uppercase leading-[0.88] tracking-tight mb-16 text-[#ff3b00]"
          style={{ fontSize: "clamp(3rem, 8vw, 9.5rem)", opacity: 0 }}
        >
          PEOPLE LISTEN.
        </p>

        {/* CTAs */}
        <div
          className="contact-reveal flex flex-col sm:flex-row gap-5 sm:gap-8"
          style={{ opacity: 0 }}
        >
          <a
            href="tel:7256972732"
            data-cursor-text="CALL"
            className="group relative inline-flex items-center gap-4 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#f0ede6] border border-stone-700 px-8 py-5 overflow-hidden hover:border-[#ff3b00] transition-colors duration-400"
          >
            {/* Red fill sweep */}
            <span
              className="absolute inset-0 bg-[#ff3b00] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              aria-hidden="true"
            />
            <span className="relative z-10">Start a Project</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>

          <a
            href="https://wa.me/917256972732?text=Hi%20LEXy%20MEDIA,%20I'd%20like%20to%20discuss%20a%20project!"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="WHATSAPP"
            className="group relative inline-flex items-center gap-3 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-[#ff3b00] transition-colors duration-300 py-5"
          >
            <span>Get in Touch</span>
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">↗</span>
            <span className="absolute bottom-4 left-0 right-0 h-[1px] bg-stone-800 group-hover:bg-[#ff3b00] transition-colors duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
