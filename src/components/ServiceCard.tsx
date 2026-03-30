import Link from "next/link";
import type { Service } from "@/content/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className="group relative block rounded-2xl border border-outline-variant/15 bg-surface-container p-8 transition-all duration-300 hover:-translate-y-1.5 hover:bg-surface-container-high hover:shadow-[0_0_40px_rgba(0,212,255,0.08)]"
    >
      {/* Gradient top border on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl" />

      <span className="text-[32px] block mb-4">{service.icon}</span>

      <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
        {service.title}
      </h3>

      <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
        {service.desc}
      </p>

      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary/80 border border-primary/20 rounded-full px-2.5 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
