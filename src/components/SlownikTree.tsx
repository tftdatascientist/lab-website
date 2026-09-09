/**
 * SlownikTree — serwerowe, crawlowalne drzewo nawigacji jednej kategorii słownika.
 * Zero JS: zagnieżdżone <details>, aktywna ścieżka rozwinięta, aktywny węzeł `aria-current`.
 * 3 poziomy: Poddziedzina (L2) → Grupa (L3) → Podgrupa (L4). Hasła na stronie grupy.
 * Style: `.tree` w globals.css.
 */
import Link from "next/link";
import { labelL1, labelL2, labelL3, labelL4, getL2sByL1, getL3sByL2, getL4sByL3, getL2ofL3 } from "@/lib/slownik";

export default function SlownikTree({ l1, activeL2, activeL3 }: { l1: string; activeL2?: string; activeL3?: string }) {
  const pathL2 = activeL2 ?? (activeL3 ? getL2ofL3(activeL3) : undefined);
  const l2s = getL2sByL1(l1);

  return (
    <nav aria-label={`Słownik — ${labelL1(l1)}`} className="tree">
      <Link href={`/slownik/kategoria/${l1}`} className="root">
        {labelL1(l1)}
      </Link>
      <ul>
        {l2s.map((l2) => {
          const l3s = getL3sByL2(l2);
          return (
            <li key={l2}>
              <details open={l2 === pathL2}>
                <summary>
                  <Item href={`/slownik/kategoria/${l1}/${l2}`} name={labelL2(l2)} active={l2 === activeL2 && !activeL3} />
                </summary>
                <ul>
                  {l3s.map((l3) => {
                    const l4s = getL4sByL3(l3);
                    const l3Active = l3 === activeL3;
                    return (
                      <li key={l3}>
                        {l4s.length > 0 ? (
                          <details open={l3Active}>
                            <summary>
                              <Item href={`/slownik/grupa/${l3}`} name={labelL3(l3)} active={l3Active} />
                            </summary>
                            <ul>
                              {l4s.map((l4) => (
                                <li key={l4} className="leaf">
                                  <Item href={`/slownik/grupa/${l3}#g-${l4}`} name={labelL4(l4)} />
                                </li>
                              ))}
                            </ul>
                          </details>
                        ) : (
                          <div className="leaf">
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

function Item({ href, name, active }: { href: string; name: string; active?: boolean }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined}>
      {name}
    </Link>
  );
}
