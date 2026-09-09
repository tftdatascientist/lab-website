/**
 * RelatedLinks — sekcja "Zobacz też" (internal-linking mesh).
 * Wiersze `rodzaj > hasło` w mono (konwerter), bez chipów i kart. Server component.
 */
import * as React from "react";
import Link from "next/link";

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
    <section className="ruled" aria-label={title}>
      <h2 className="label">{title}</h2>
      <ul className="routes">
        {items.map((it) => (
          <li key={it.href}>
            <span>{it.kind ? KIND_LABEL[it.kind] : "Link"}</span>
            <span className="arrow" aria-hidden="true">
              &gt;
            </span>
            <span className="to">
              <Link href={it.href}>{it.label}</Link>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
