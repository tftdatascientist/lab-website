import type { Metadata } from "next";
import { services } from "@/content/services";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Usługi — LAB | Automatyzacja i AI dla firm",
  description:
    "Automatyzacja procesów, chatboty AI, agenci głosowi, bazy wiedzy RAG, dashboardy i integracje systemów dla MŚP z Pomorza i Kujaw.",
};

export default function UslugiPage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Usługi
            </span>
          </div>
          <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-on-surface mb-4">
            Nasze usługi
          </h1>
          <p className="text-on-surface-variant leading-relaxed">
            Kompleksowe rozwiązania automatyzacji i&nbsp;AI dopasowane do potrzeb
            małych i&nbsp;średnich firm z&nbsp;regionu kujawsko-pomorskiego.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
