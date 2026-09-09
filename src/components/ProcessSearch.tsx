"use client";

/**
 * ProcessSearch — Ctrl+K nad taksonomią PCF (1908 węzłów), client-side.
 * Indeks MiniSearch (public/procesy-search.json, ~750 KB) ładowany leniwie przy otwarciu.
 * Opcje muszą się zgadzać z scripts/build-search-index.mjs. Tylko warstwa UX —
 * pod spodem są crawlowalne strony SSG. Wygląd i skróty: sciana/Paleta.
 */
import Paleta, { type PaletaConfig } from "@/components/sciana/Paleta";

const normalize = (term: string) =>
  term
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

interface Raw {
  id: string;
  code: string;
  namePl: string;
  nameEng: string;
  level: string;
  category: string;
  href: string;
}

const CONFIG: PaletaConfig<Raw> = {
  indexUrl: "/procesy-search.json",
  options: {
    idField: "id",
    fields: ["code", "namePl", "nameEng"],
    storeFields: ["code", "namePl", "nameEng", "level", "category", "href"],
    processTerm: (term: string) => {
      const t = normalize(term);
      return t.length ? t : null;
    },
    tokenize: (text: string) => text.split(/[\s/.,;:()„"”»«-]+/).filter(Boolean),
  },
  boost: { code: 3, namePl: 2 },
  levelOrder: ["Kategoria", "Grupa procesów", "Proces", "Działanie", "Zadanie"],
  label: "Wyszukiwarka procesów PCF",
  placeholder: "Proces, działanie albo kod PCF (PL lub EN)",
  hint: (
    <>
      Wpisz nazwę procesu, działania albo kod PCF, np. <span className="mono">8.2.1</span>.
    </>
  ),
  footer: "APQC PCF 7.4 · 1908 węzłów",
  toHit: (r) => ({
    id: r.id,
    level: r.level,
    href: r.href,
    code: r.code,
    title: r.namePl,
    sub: r.nameEng ? `${r.category} · ${r.nameEng}` : r.category,
  }),
};

export default function ProcessSearch() {
  return <Paleta config={CONFIG} />;
}
