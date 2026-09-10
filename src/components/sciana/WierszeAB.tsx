import Link from "next/link";

/**
 * Wiersze `A > B` — „konwerter” (przekaz niesiony formą: lokalne > światowe).
 * Strzałka w sygnale (jawny wyjątek kontrastu z DESIGN.md), cel po prawej pogrubiony.
 */
export interface WierszAB {
  from: string;
  to: string;
  href?: string;
}

export default function WierszeAB({ rows }: { rows: WierszAB[] }) {
  return (
    <ul className="routes">
      {rows.map((r) => (
        <li key={r.from + r.to}>
          <span>{r.from}</span>
          <span className="arrow" aria-hidden="true">
            &gt;
          </span>
          <span className="to">{r.href ? <Link href={r.href}>{r.to}</Link> : r.to}</span>
        </li>
      ))}
    </ul>
  );
}
