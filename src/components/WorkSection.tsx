"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "1",
    name: "PURE HYDRATION",
    client: "ECOWATER",
    category: "Social Media Management / Content Creation",
    year: "2024",
    bg: "#ffffffff",
    accent: "#00b4d8",
    logo: "/images/clients/ecowater.png",
    metric: "+110% Engagement · 300K+ Reach",
  },
  {
    index: "2",
    name: "FEAST & FLAVOR",
    client: "PARADISE - THE BARBEQUE",
    category: "Visual Identity / Short-Form Video",
    year: "2025",
    bg: "#ffffffff",
    accent: "#ff4d00",
    logo: "/images/clients/paradise_the_barbeque.svg",
    metric: "Viral Table-Top Reels · Brand Story",
  },
  {
    index: "3",
    name: "THE CRICKET FRENZY",
    client: "BIHAR T10 LEAGUE",
    category: "Sports Marketing / Event Campaigns",
    year: "2026",
    bg: "#ffffffff",
    accent: "#f59e0b",
    logo: "/images/clients/bihar_t10_league.png",
    metric: "Live Event Reach · 1M+ Digital Impressions",
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ─── Header reveal ──────────────────────────────────────────────
      gsap.fromTo(
        section.querySelector(".work-header"),
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );

      // ─── Per-card animations ─────────────────────────────────────────
      const cards = section.querySelectorAll<HTMLElement>(".project-card");
      cards.forEach((card, i) => {
        const visual = card.querySelector<HTMLElement>(".project-visual");
        const imgInner = card.querySelector<HTMLElement>(".project-img-inner");
        const content = card.querySelector<HTMLElement>(".project-content");

        // Visual: clip-path wipe from bottom
        if (visual) {
          gsap.fromTo(
            visual,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 82%" },
            }
          );
        }

        // Image inner: subtle parallax (scale + y)
        if (imgInner) {
          gsap.fromTo(
            imgInner,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Content: stagger fade-up with delay based on index
        if (content) {
          gsap.fromTo(
            content,
            { autoAlpha: 0, y: 35 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              delay: 0.15,
              scrollTrigger: { trigger: card, start: "top 80%" },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-[#080808] pt-16 pb-32 px-6 md:px-16"
    >
      {/* Header */}
      <div className="work-header flex items-center gap-4 mb-24 md:mb-40" style={{ opacity: 0 }}>
        <div className="w-6 h-[1px] bg-stone-700" />
        <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-stone-500">
          Selected Work
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-40 md:gap-56 max-w-7xl mx-auto">
        {projects.map((project, i) => (
          <article
            key={i}
            className={`project-card flex flex-col gap-10 md:gap-20 items-start md:items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
          >
            {/* Visual */}
            <div
              className="project-visual w-full md:w-[58%] aspect-[4/3] overflow-hidden relative group cursor-pointer"
              data-cursor-text="VIEW"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              <div
                className="project-img-inner absolute inset-[-15%] w-[130%] h-[130%]"
                style={{ backgroundColor: project.bg }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 40% 60%, ${project.accent}30 0%, transparent 65%)`,
                  }}
                />
                {/* Project number watermark */}
                <div className="absolute inset-0 flex items-end justify-start p-8 md:p-12">
                  <span
                    className="font-serif uppercase leading-none select-none"
                    style={{
                      fontSize: "clamp(8rem, 20vw, 22rem)",
                      color: project.accent,
                      opacity: 0.07,
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Logo Filling The Card */}
                <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 md:p-14 lg:p-16 pointer-events-none z-[2]">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={project.logo}
                      alt={`${project.client} logo`}
                      fill
                      className="object-contain filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 90vw, 55vw"
                      priority={i === 0}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className={`project-content w-full md:w-[42%] flex flex-col ${i % 2 !== 0 ? "md:items-end md:text-right" : ""
                }`}
              style={{ opacity: 0 }}
            >
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#ff3b00] block mb-4">
                {project.index} — {project.year}
              </span>

              <h3
                className="font-serif uppercase tracking-tight mb-4 leading-[0.9]"
                style={{ fontSize: "clamp(2rem, 5vw, 5.5rem)" }}
              >
                {project.name}
              </h3>

              <p className="text-base md:text-lg font-light text-stone-500 mb-4">
                {project.category}
              </p>

              <div className="flex items-center gap-2 mb-8">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-sans font-medium tracking-wider uppercase bg-white/[0.04] border border-white/10 text-stone-400">
                  {project.metric}
                </span>
              </div>

              <div className={`flex items-center gap-4 ${i % 2 !== 0 ? "flex-row-reverse" : ""}`}>
                <div className="w-6 h-[1px] bg-stone-700 shrink-0" />
                <div className={`flex items-center gap-3 ${i % 2 !== 0 ? "flex-row-reverse" : ""}`}>
                  <div className="relative w-8 h-8 rounded bg-[#111] border border-stone-800 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <Image
                      src={project.logo}
                      alt={project.client}
                      fill
                      className="object-contain p-0.5"
                      sizes="32px"
                      unoptimized
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-stone-600 block mb-0.5">
                      Client
                    </span>
                    <span className="text-xl md:text-2xl font-serif text-[#f0ede6]">{project.client}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
