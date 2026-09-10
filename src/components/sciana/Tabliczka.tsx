import * as React from "react";

/**
 * Tabliczka znamionowa na ścianie (DESIGN.md §Powierzchnia — anatomia obowiązkowa):
 *   header (pasek mono: `Nr NN · tytuł` | pole prawe)
 *   .body
 *   footer (pasek mono: źródło / kolejność | numer)
 * `plate` = tabliczka grafitowa (Miejsce, Przegląd dnia). Pole na ścianie daje `className` (s-*).
 * Nigdy tabliczka w tabliczce, nigdy cień.
 */
export interface TabliczkaProps {
  nr: string;
  title: React.ReactNode;
  /** pole prawe paska nagłówka: liczba / miejsce / data */
  right?: React.ReactNode;
  /** lewa część stopki: źródło albo kolejność */
  footer: React.ReactNode;
  /** prawa część stopki; domyślnie numer tabliczki */
  footerRight?: React.ReactNode;
  plate?: boolean;
  /** pasek ostrzegawczy przed stopką — maks. jeden na stronę */
  hazard?: boolean;
  className?: string;
  as?: "section" | "article" | "aside" | "div";
  id?: string;
  children: React.ReactNode;
}

export default function Tabliczka({
  nr,
  title,
  right,
  footer,
  footerRight,
  plate = false,
  hazard = false,
  className = "",
  as: Tag = "section",
  id,
  children,
}: TabliczkaProps) {
  return (
    <Tag id={id} className={`tag${plate ? " plate" : ""} ${className}`.trim()}>
      <header className="mono">
        <span>
          Nr {nr} · {title}
        </span>
        {right != null && <span className="r">{right}</span>}
      </header>
      <div className="body">{children}</div>
      {hazard && <div className="hazard" aria-hidden="true" />}
      <footer className="mono">
        <span>{footer}</span>
        <span>{footerRight ?? nr}</span>
      </footer>
    </Tag>
  );
}
