"use client";

import Image from "next/image";

// ── Real clients from kisatmedia.in + local logo images ──────────────────────
const clients: { name: string; logo: string; logoAlt: string }[] = [
  { name: "Skoda",             logo: "/images/clients/Skoda.png",               logoAlt: "Skoda logo" },
  { name: "TVS",               logo: "/images/clients/tvs_logo.png",            logoAlt: "TVS logo" },
  { name: "Euro Kids",         logo: "/images/clients/eurokids.png",            logoAlt: "Euro Kids logo" },
  { name: "EcoWater",          logo: "/images/clients/ecowater.png",            logoAlt: "EcoWater logo" },
  { name: "Paradise",          logo: "/images/clients/paradise_the_barbeque.png", logoAlt: "Paradise - The Barbeque logo" },
  { name: "Corporate Strikers",logo: "/images/clients/corporate_strikers.png",  logoAlt: "Corporate Strikers logo" },
  { name: "Bihar T10 League",  logo: "/images/clients/bihar_t10_league.png",    logoAlt: "Bihar T10 League logo" },
  { name: "Enspire Talks",     logo: "/images/clients/enspire_talks.png",       logoAlt: "Enspire Talks logo" },
  { name: "SmartFix India",    logo: "/images/clients/smartfix_india.png",      logoAlt: "SmartFix India logo" },
  { name: "GJAV",              logo: "/images/clients/GJAV.png",                logoAlt: "GJAV logo" },
  { name: "Jinvani",           logo: "/images/clients/jinvani.png",             logoAlt: "Jinvani logo" },
  { name: "Zarkala",           logo: "/images/clients/zarkala.png",             logoAlt: "Zarkala logo" },
];

// Split into two tracks
const track1 = clients.slice(0, 6);
const track2 = clients.slice(5);   // slight overlap for visual variety

// Triple each track for a seamless loop
const makeTrack = <T,>(arr: T[]) => [...arr, ...arr, ...arr];

function ClientChip({ client }: { client: typeof clients[number] }) {
  return (
    <div className="flex items-center gap-3 mx-8 md:mx-12 shrink-0 select-none">
      {/* Logo pill */}
      <div className="relative h-8 md:h-10 w-20 md:w-28 shrink-0 flex items-center justify-center bg-[#111] rounded px-2 border border-stone-800/50">
        <Image
          src={client.logo}
          alt={client.logoAlt}
          fill
          className="object-contain p-1"
          sizes="112px"
          unoptimized
        />
      </div>
      {/* Name */}
      <span className="text-[5vw] sm:text-[3.5vw] md:text-[2.8vw] lg:text-[2.2vw] font-sans font-black uppercase leading-none text-[#f0ede6] whitespace-nowrap">
        {client.name}
      </span>
      {/* Separator dot */}
      <span className="text-stone-600 text-xl ml-4">·</span>
    </div>
  );
}

export default function ClientMarquee() {
  return (
    <section
      id="clients"
      className="relative py-24 overflow-hidden bg-[#0c0c0c]"
      aria-label="Our Clients"
    >
      {/* Gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10 pointer-events-none" />

      {/* Label */}
      <div className="flex items-center gap-3 px-6 md:px-16 mb-14">
        <div className="w-6 h-[1px] bg-stone-700" />
        <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-stone-500">
          Brands We've Worked With
        </span>
      </div>

      {/* ── Track 1: Left ──────────────────────────────────────────── */}
      <div className="w-full overflow-hidden mb-6 group">
        <div className="flex marquee-track animate-marquee-left group-hover:[animation-play-state:paused]">
          {makeTrack(track1).map((c, i) => (
            <ClientChip key={`t1-${i}`} client={c} />
          ))}
        </div>
      </div>

      {/* ── Track 2: Right ─────────────────────────────────────────── */}
      <div className="w-full overflow-hidden group">
        <div className="flex marquee-track animate-marquee-right group-hover:[animation-play-state:paused]">
          {makeTrack(track2).map((c, i) => (
            <ClientChip key={`t2-${i}`} client={c} />
          ))}
        </div>
      </div>

      {/* Client count */}
      <div className="flex items-center justify-end gap-3 px-6 md:px-16 mt-14">
        <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-stone-600">
          {clients.length}+ Brands
        </span>
        <div className="w-6 h-[1px] bg-stone-700" />
      </div>
    </section>
  );
}
