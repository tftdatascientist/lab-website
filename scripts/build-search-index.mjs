#!/usr/bin/env node
/**
 * build-search-index.mjs — buduje statyczny indeks wyszukiwania MiniSearch
 * z src/content/procesy.json → public/procesy-search.json.
 *
 * Indeksujemy TYLKO kod + nazwa PL + nazwa EN (bez opisów) — indeks zostaje mały
 * (~kilkaset KB), a opisy żyją na stronach. Klient ładuje indeks leniwie przy Cmd+K.
 *
 * Uruchamiane automatycznie w `prebuild` (czyta zacommitowany procesy.json, zero Notion).
 */
import fs from "node:fs";
import path from "node:path";
import MiniSearch from "minisearch";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src/content/procesy.json");
const OUT = path.join(ROOT, "public/procesy-search.json");

const data = JSON.parse(fs.readFileSync(SRC, "utf-8"));
const { categories, nodes } = data;

const codeToSlug = (code) => code.replaceAll(".", "-");

// mapa kod → węzeł (do wyznaczenia procesu-przodka dla anchorów L4/L5)
const byCode = new Map(nodes.map((n) => [n.code, n]));
const catBySlug = new Map(categories.map((c) => [c.slug, c]));

function ancestorProcess(code) {
  let n = byCode.get(code);
  while (n) {
    if (n.level === "Proces") return n;
    n = n.parentCode ? byCode.get(n.parentCode) : undefined;
  }
  return undefined;
}

function href(n) {
  switch (n.level) {
    case "Grupa procesów":
      return `/procesy/${n.categorySlug}/${codeToSlug(n.code)}`;
    case "Proces":
      return `/procesy/proces/${codeToSlug(n.code)}`;
    case "Działanie":
    case "Zadanie": {
      const p = ancestorProcess(n.code);
      return p ? `/procesy/proces/${codeToSlug(p.code)}#a-${codeToSlug(n.code)}` : `/procesy/${n.categorySlug}`;
    }
    default:
      return `/procesy/${n.categorySlug}`;
  }
}

// dokumenty: 13 kategorii + wszystkie węzły
const docs = [
  ...categories.map((c) => ({
    id: c.code,
    code: c.code,
    namePl: c.namePl,
    nameEng: c.nameEng,
    level: "Kategoria",
    category: c.namePl,
    href: `/procesy/${c.slug}`,
  })),
  ...nodes.map((n) => ({
    id: n.code,
    code: n.code,
    namePl: n.namePl,
    nameEng: n.nameEng || "",
    level: n.level,
    category: catBySlug.get(n.categorySlug)?.namePl || n.categorySlug,
    href: href(n),
  })),
];

// normalizacja: lowercase + usunięcie polskich/łacińskich diakrytyków (ł→l osobno)
const normalize = (term) =>
  term
    .toLowerCase()
    .replace(/ł/g, "l") // ł → l (nie rozkłada się przez NFD)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const mini = new MiniSearch({
  idField: "id",
  fields: ["code", "namePl", "nameEng"],
  storeFields: ["code", "namePl", "nameEng", "level", "category", "href"],
  processTerm: (term) => {
    const t = normalize(term);
    return t.length ? t : null;
  },
  tokenize: (text) => text.split(/[\s/.,;:()„"”»«-]+/).filter(Boolean),
});

mini.addAll(docs);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(mini.toJSON()), "utf-8");

const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`Zindeksowano ${docs.length} elementów → ${OUT} (${kb} KB).`);
