"use client";

/**
 * Mapa Grudziądza ładowana tylko w przeglądarce (`ssr: false` wolno tylko w komponencie klienckim).
 * Zaślepka = puste pole 16:9, żeby ściana nie skakała, gdy kod animacji dojedzie.
 */
import dynamic from "next/dynamic";

const MapaGrudziadz = dynamic(() => import("./mapa/MapaGrudziadz"), {
  ssr: false,
  loading: () => <div className="mapa" aria-hidden="true" style={{ width: "100%", aspectRatio: "16 / 9" }} />,
});

export default function Mapa() {
  return <MapaGrudziadz />;
}
