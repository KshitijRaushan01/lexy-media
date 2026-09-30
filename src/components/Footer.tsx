export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="bg-[#050505] border-t border-stone-900/60 px-6 md:px-16 py-10 relative z-20"
    >
      {/* Single compact row on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

        {/* LEFT: Brand + tagline */}
        <div className="flex flex-col gap-1">
          <span className="text-xl md:text-2xl font-serif uppercase tracking-[0.08em]">
            LEXy <span className="text-[#ff3b00]">MEDIA</span>
          </span>
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-stone-600">
            Let's Work Together
          </span>
        </div>

        {/* CENTRE: Contact details */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm">
          <a
            href="tel:7256972732"
            className="text-stone-500 hover:text-[#ff3b00] transition-colors duration-300"
          >
            +91 72569 72732
          </a>
          <div className="flex gap-5">
            <a
              href="https://wa.me/917256972732"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-[#ff3b00] transition-colors duration-300 text-sm"
            >
              WhatsApp ↗
            </a>
            <a href="#" className="text-stone-500 hover:text-[#ff3b00] transition-colors duration-300 text-sm">
              Instagram ↗
            </a>
            <a href="#" className="text-stone-500 hover:text-[#ff3b00] transition-colors duration-300 text-sm">
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* RIGHT: Map widget + copyright */}
        <div className="flex flex-col items-start md:items-end gap-3">
          {/* Compact map */}
          <a
            href="https://maps.app.goo.gl/pmfJhaVQ7bF12Pp49"
            target="_blank"
            rel="noreferrer"
            aria-label="View on Google Maps"
            className="group relative overflow-hidden rounded border border-stone-800 hover:border-stone-600 transition-colors duration-300 block"
            style={{ width: "200px", height: "100px" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14373.693929099756!2d85.10737!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2956da9b4ae9b%3A0x8dae2e7b76c2c3c5!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1234567890"
              width="200"
              height="100"
              style={{
                border: 0,
                filter: "grayscale(100%) brightness(50%) contrast(130%)",
                pointerEvents: "none",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LEXy MEDIA location"
            />
            <div className="absolute inset-0 flex items-end p-2 pointer-events-none">
              <span className="text-[8px] font-sans uppercase tracking-[0.25em] text-stone-600 group-hover:text-stone-400 transition-colors duration-300">
                Find Us ↗
              </span>
            </div>
          </a>

          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-stone-800">
            © {year} LEXy MEDIA
          </span>
        </div>

      </div>
    </footer>
  );
}
