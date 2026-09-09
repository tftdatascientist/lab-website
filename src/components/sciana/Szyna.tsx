"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MechanismLogoMark } from "@/components/mechanism";

/**
 * Szyna nawigacyjna: pionowa 56 px z lewej (dewiacja #1), na telefonie pasek dolny 52 px.
 * Pięć pozycji, zawsze widoczne. Kropka sygnału = Grudziądz, stoi (migotanie tylko za realnym stanem).
 * Znak logo (koło zębate) ≤ 40 px w szynie, w hero nieobecne (DESIGN.md §Powierzchnia); kolor = kość.
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
      <div className="brand-box">
        <Link className="mark" href="/" aria-label="lok-ai — strona główna">
          <MechanismLogoMark size={32} color="var(--bone-2)" />
        </Link>
        <Link className="brand" href="/" tabIndex={-1} aria-hidden="true">
          lok-ai
        </Link>
      </div>
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
