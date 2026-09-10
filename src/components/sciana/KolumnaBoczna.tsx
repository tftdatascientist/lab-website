import * as React from "react";
import Miejsce from "./Miejsce";
import Tabliczka from "./Tabliczka";
import WierszeAB, { type WierszAB } from "./WierszeAB";
import CtaPole from "./CtaPole";

/**
 * Kolumna metadanych podstrony (kol. 9–12): Miejsce (skrócona) + „Skąd > dokąd” dla tego
 * tematu + CTA — warunek utrzymania odróżnialności z DESIGN.md (uniqueness check).
 * `children` = dodatkowe tabliczki (drzewo, spis treści) między wierszami a CTA.
 * Jedyny sygnał na podstronie to pole CTA, więc hub NIE dokłada drugiego.
 */
export default function KolumnaBoczna({
  routes,
  routesFooter = "/procesy · /slownik · /blog",
  ctaLabel,
  ctaHref,
  nrStart = 2,
  children,
}: {
  routes: WierszAB[];
  routesFooter?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** numer pierwszej tabliczki w kolumnie (tabliczka czytania = 01) */
  nrStart?: number;
  children?: React.ReactNode;
}) {
  const nr = (i: number) => String(nrStart + i).padStart(2, "0");
  return (
    <aside className="s-side" aria-label="metadane">
      <Miejsce nr={nr(0)} className="" short />
      <Tabliczka nr={nr(1)} title="Skąd > dokąd" right={routes.length} footer={routesFooter}>
        <WierszeAB rows={routes} />
      </Tabliczka>
      {children}
      <CtaPole className="" label={ctaLabel} href={ctaHref} />
    </aside>
  );
}
