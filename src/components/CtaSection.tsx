export default function CtaSection() {
  return (
    <section id="kontakt" className="py-20 lg:py-28">
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-cyan/12 bg-gradient-to-br from-cyan/[0.06] to-amber/[0.06] p-8 sm:p-10 text-center overflow-hidden">
          {/* Gradient top line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan to-amber" />

          <h2 className="font-heading text-[clamp(24px,3.5vw,36px)] font-bold tracking-[-0.5px] text-text-primary mb-4">
            Bezpłatna konsultacja — 30&nbsp;minut
          </h2>

          <p className="text-text-secondary leading-relaxed mb-8 max-w-md mx-auto">
            Opowiedz nam o&nbsp;swoim biznesie, a&nbsp;pokażemy, które procesy
            można zautomatyzować i&nbsp;ile czasu zaoszczędzisz.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/kontakt"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan to-blue-500 rounded-full hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-shadow"
            >
              Umów rozmowę →
            </a>
            <a
              href="tel:+48000000000"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-text-secondary border border-white/[0.12] rounded-full hover:text-text-primary hover:border-white/[0.24] transition-colors"
            >
              📞 +48 xxx xxx xxx
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
