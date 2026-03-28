import Link from "next/link";
import type { Service } from "@/content/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className="group relative block rounded-2xl border border-white/[0.06] bg-bg-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:bg-bg-card-hover hover:shadow-[0_0_40px_rgba(0,212,255,0.08)]"
    >
      {/* Gradient top border on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan to-amber opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl" />

      <span className="text-[32px] block mb-4">{service.icon}</span>

      <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
        {service.title}
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed mb-5">
        {service.desc}
      </p>

      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-cyan/80 border border-cyan/20 rounded-full px-2.5 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
