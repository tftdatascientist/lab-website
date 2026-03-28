import { services } from "@/content/services";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section id="uslugi" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-cyan" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              Usługi
            </span>
          </div>
          <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-text-primary mb-4">
            Co automatyzujemy?
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Od prostych workflow po zaawansowanych agentów AI — dobieramy
            rozwiązania do skali i&nbsp;potrzeb Twojej firmy.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
