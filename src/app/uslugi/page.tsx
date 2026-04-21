import type { Metadata } from "next";
import { services } from "@/content/services";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Usługi — lok-ai | Automatyzacja i AI dla firm",
  description:
    "Automatyzacja procesów, chatboty AI, agenci głosowi, bazy wiedzy RAG, dashboardy i integracje systemów dla MŚP z Pomorza i Kujaw.",
};

export default function UslugiPage() {
  return (
    <section className="py-[100px] px-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between gap-8 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-px" style={{ background: "#f5b845" }} />
            <span
              className="font-mono text-[11px] uppercase"
              style={{ color: "#f5b845", letterSpacing: "0.15em" }}
            >
              Co automatyzujemy
            </span>
          </div>
          <h1
            className="font-heading font-bold text-text"
            style={{
              fontSize: "clamp(32px,4.5vw,56px)",
              letterSpacing: "-0.035em",
              lineHeight: 1,
              maxWidth: 680,
            }}
          >
            Sześć kierunków,{" "}
            <span
              className="font-display font-medium italic"
              style={{ color: "#f5b845", letterSpacing: "-0.01em" }}
            >
              jeden cel
            </span>
            : odzyskać&nbsp;czas.
          </h1>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
