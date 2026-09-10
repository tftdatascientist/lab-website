"use client";

/**
 * SlownikSearch — Ctrl+K nad słownikiem IT (1201 haseł + węzły nawigacji), client-side.
 * Indeks MiniSearch (public/slownik-search.json, ~300 KB) ładowany leniwie przy otwarciu.
 * Opcje muszą się zgadzać z scripts/build-slownik-search-index.mjs. Wygląd: sciana/Paleta.
 */
import Paleta, { type PaletaConfig } from "@/components/sciana/Paleta";

const normalize = (term: string) => term.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[̀-ͯ]/g, "");

interface Raw {
  id: string;
  haslo: string;
  skrot: string;
  sub: string;
  level: string;
  href: string;
}

const CONFIG: PaletaConfig<Raw> = {
  indexUrl: "/slownik-search.json",
  options: {
    idField: "id",
    fields: ["haslo", "skrot"],
    storeFields: ["haslo", "skrot", "sub", "level", "href"],
    processTerm: (term: string) => {
      const t = normalize(term);
      return t.length ? t : null;
    },
    tokenize: (text: string) => text.split(/[\s/.,;:()„"”»«-]+/).filter(Boolean),
  },
  boost: { haslo: 3, skrot: 2 },
  levelOrder: ["Hasło", "Grupa", "Poddziedzina", "Kategoria"],
  label: "Wyszukiwarka słownika IT",
  placeholder: "Hasło albo skrót, np. RAG",
  hint: <>Wpisz hasło albo skrót — szukamy też w grupach i kategoriach.</>,
  footer: "Słownik IT · 1201 haseł",
  toHit: (r) => ({ id: r.id, level: r.level, href: r.href, code: r.skrot || "", title: r.haslo, sub: r.sub }),
};

export default function SlownikSearch() {
  return <Paleta config={CONFIG} />;
}
