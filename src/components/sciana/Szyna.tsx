"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Szyna nawigacyjna: pionowa 56 px z lewej (dewiacja #1), na telefonie pasek dolny 52 px.
 * Pięć pozycji, zawsze widoczne. Kropka sygnału = Grudziądz, stoi (migotanie tylko za realnym stanem).
 * Reszta ścieżek (Portfolio, FAQ, Cennik, O nas, regulaminy) siedzi w stopce ściany.
 */
export const NAV = [
  { label: "Wdrożenia", href: "/wdrozenia" },
  { label: "Procesy", href: "/procesy" },
  { label: "Słownik", href: "/slownik" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export default function Szyna() {
  const pathname = usePathname() ?? "/";
  return (
    <nav className="rail" aria-label="główna">
      <Link className="brand" href="/" aria-label="lok-ai — strona główna">
        lok-ai
      </Link>
      <ul className="mono">
        {NAV.map((item) => {
          const current = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <span className="dot" title="Grudziądz · 53°29′N 18°45′E" aria-hidden="true" />
    </nav>
  );
}
