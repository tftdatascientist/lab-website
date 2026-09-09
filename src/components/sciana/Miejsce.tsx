import Tabliczka from "./Tabliczka";
import Odczyt from "./Odczyt";

/**
 * Tabliczka „Miejsce” (grafitowa): współrzędne Grudziądza i odległości drogowe.
 * Obowiązkowa na stronie głównej i na każdej podstronie treści (uniqueness check).
 * `short` = wariant dla kolumny metadanych podstrony.
 */
export const MIEJSCE = {
  lat: "53°29′N",
  lon: "18°45′E",
  city: "Grudziądz",
  region: "kujawsko-pomorskie",
  distances: "Toruń 60 km · Bydgoszcz 100 km",
} as const;

export default function Miejsce({
  nr = "02",
  className = "s-geo",
  short = false,
}: {
  nr?: string;
  className?: string;
  short?: boolean;
}) {
  return (
    <Tabliczka nr={nr} title="Miejsce" right="PL" footer="Spotykamy się na żywo" plate className={className}>
      <Odczyt
        value={
          <>
            {MIEJSCE.lat}
            <br />
            {MIEJSCE.lon}
          </>
        }
        label={`${MIEJSCE.city} · ${MIEJSCE.region}`}
      />
      {!short && (
        <p className="mono" style={{ color: "var(--bone-2)" }}>
          {MIEJSCE.distances}
        </p>
      )}
    </Tabliczka>
  );
}
