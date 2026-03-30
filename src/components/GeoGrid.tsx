const cities = [
  { name: "Grudziądz", note: "siedziba" },
  { name: "Toruń" },
  { name: "Bydgoszcz" },
  { name: "Świecie" },
  { name: "Chełmno" },
  { name: "Wąbrzeźno" },
  { name: "Inowrocław" },
  { name: "Brodnica" },
];

export default function GeoGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Zasięg
            </span>
          </div>
          <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-on-surface mb-4">
            Automatyzacja AI blisko Twojej firmy
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Obsługujemy firmy z&nbsp;całego województwa kujawsko-pomorskiego.
            Lokalnie, z&nbsp;pełnym zrozumieniem rynku.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cities.map((city) => (
            <div
              key={city.name}
              className="rounded-xl border border-outline-variant/15 bg-surface-container px-5 py-4 text-center hover:border-secondary/40 transition-colors"
            >
              <span className="font-heading text-sm font-semibold text-on-surface">
                {city.name}
              </span>
              {city.note && (
                <span className="block text-[11px] text-secondary mt-0.5">
                  {city.note}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
