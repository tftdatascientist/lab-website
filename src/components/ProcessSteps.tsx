const steps = [
  {
    num: "01",
    title: "Audyt",
    desc: "Analizujemy procesy w Twojej firmie i identyfikujemy obszary do automatyzacji.",
  },
  {
    num: "02",
    title: "Projekt",
    desc: "Projektujemy rozwiązanie dopasowane do skali i budżetu.",
  },
  {
    num: "03",
    title: "Wdrożenie",
    desc: "Budujemy, testujemy i uruchamiamy automatyzację w Twoim środowisku.",
  },
  {
    num: "04",
    title: "Wsparcie",
    desc: "Monitorujemy, optymalizujemy i rozwijamy wdrożone rozwiązania.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Proces
            </span>
          </div>
          <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-on-surface mb-4">
            Jak pracujemy?
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Cztery kroki od analizy do działającego rozwiązania — przejrzyście
            i&nbsp;bez niespodzianek.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-primary to-secondary opacity-30" />

          {steps.map((step) => (
            <div key={step.num} className="relative text-center lg:text-center">
              {/* Circle */}
              <div className="relative z-10 mx-auto w-16 h-16 rounded-full border border-outline-variant/20 bg-surface-container flex items-center justify-center mb-5">
                <span className="font-heading text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {step.num}
                </span>
              </div>

              <h3 className="font-heading text-base font-semibold text-on-surface mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
