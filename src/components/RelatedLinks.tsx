/**
 * RelatedLinks — sekcja "Zobacz też" (internal-linking mesh).
 *
 * Renderuje zestaw chipów/kart w motywie mechanizmu: linki do haseł słownika,
 * procesów, wdrożeń itp. Server component (brak interaktywności klienta).
 */
import * as React from "react";
import Link from "next/link";
import { TinyGear } from "@/components/mechanism";

export type RelatedKind = "slownik" | "proces" | "wdrozenie" | "blog" | "link";

export interface RelatedItem {
  label: string;
  href: string;
  kind?: RelatedKind;
}

const KIND_LABEL: Record<RelatedKind, string> = {
  slownik: "Słownik",
  proces: "Proces",
  wdrozenie: "Wdrożenie",
  blog: "Blog",
  link: "Link",
};

export default function RelatedLinks({
  title = "Zobacz też",
  items,
}: {
  title?: string;
  items: RelatedItem[];
}) {
  if (!items?.length) return null;

  return (
    <section className="mt-14" aria-label={title}>
      <h2 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-mute mb-4">
        <TinyGear dir="cw" dur={22} size={13} color="currentColor" />
        {title}
      </h2>
      <ul className="flex flex-wrap gap-2.5">
        {items.map((it) => {
          const kindLabel = it.kind ? KIND_LABEL[it.kind] : null;
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] text-text-dim transition-colors hover:border-amber/40 hover:text-amber"
              >
                {kindLabel && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-mute group-hover:text-amber/70 transition-colors">
                    {kindLabel}
                  </span>
                )}
                <span className="font-heading leading-snug">{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
