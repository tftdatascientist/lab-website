/**
 * SlownikTree — serwerowe, crawlowalne drzewo nawigacji jednej kategorii słownika.
 * Zero JS: zagnieżdżone <details>, aktywna ścieżka rozwinięta, aktywny węzeł podświetlony.
 * 3 poziomy w railu: Poddziedzina (L2) → Grupa (L3) → Podgrupa (L4). Hasła na stronie grupy.
 */
import Link from "next/link";
import {
  labelL1,
  labelL2,
  labelL3,
  labelL4,
  getL2sByL1,
  getL3sByL2,
  getL4sByL3,
  getL2ofL3,
} from "@/lib/slownik";

export default function SlownikTree({
  l1,
  activeL2,
  activeL3,
}: {
  l1: string;
  activeL2?: string;
  activeL3?: string;
}) {
  const pathL2 = activeL2 ?? (activeL3 ? getL2ofL3(activeL3) : undefined);
  const l2s = getL2sByL1(l1);

  return (
    <nav aria-label={`Słownik — ${labelL1(l1)}`} className="text-[13px] leading-snug">
      <Link
        href={`/slownik/kategoria/${l1}`}
        className="block mb-3 font-heading font-semibold text-on-surface hover:text-amber transition-colors"
      >
        {labelL1(l1)}
      </Link>

      <ul className="space-y-0.5">
        {l2s.map((l2) => {
          const l3s = getL3sByL2(l2);
          const l2Active = l2 === pathL2;
          return (
            <li key={l2}>
              <details open={l2Active}>
                <summary className="flex cursor-pointer rounded px-1.5 py-1 hover:bg-surface marker:text-text-mute">
                  <Item href={`/slownik/kategoria/${l1}/${l2}`} name={labelL2(l2)} active={l2 === activeL2 && !activeL3} />
                </summary>
                <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-border pl-2">
                  {l3s.map((l3) => {
                    const l4s = getL4sByL3(l3);
                    const l3Active = l3 === activeL3;
                    return (
                      <li key={l3}>
                        {l4s.length > 0 ? (
                          <details open={l3Active}>
                            <summary className="flex cursor-pointer rounded px-1.5 py-1 hover:bg-surface marker:text-text-mute">
                              <Item href={`/slownik/grupa/${l3}`} name={labelL3(l3)} active={l3Active} />
                            </summary>
                            <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-border pl-2">
                              {l4s.map((l4) => (
                                <li key={l4} className="px-1.5 py-0.5">
                                  <Item href={`/slownik/grupa/${l3}#g-${l4}`} name={labelL4(l4)} muted />
                                </li>
                              ))}
                            </ul>
                          </details>
                        ) : (
                          <div className="px-1.5 py-1">
                            <Item href={`/slownik/grupa/${l3}`} name={labelL3(l3)} active={l3Active} />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Item({ href, name, active, muted }: { href: string; name: string; active?: boolean; muted?: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`block min-w-0 truncate transition-colors ${
        active ? "text-amber font-medium" : muted ? "text-text-mute hover:text-amber" : "text-text-dim hover:text-amber"
      }`}
    >
      {name}
    </Link>
  );
}
