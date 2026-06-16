#!/usr/bin/env node
/**
 * build-slownik-search-index.mjs — statyczny indeks MiniSearch dla słownika IT
 * z src/content/slownik.json → public/slownik-search.json.
 *
 * Indeksuje hasła (1201) + węzły nawigacji (kategorie L1, poddziedziny L2, grupy L3).
 * Tylko nazwy/skróty (bez definicji) → indeks mały, ładowany leniwie przy Cmd+K.
 * Uruchamiane w `prebuild` (czyta zacommitowany JSON, zero sieci).
 */
import fs from "node:fs";
import path from "node:path";
import MiniSearch from "minisearch";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src/content/slownik.json");
const OUT = path.join(ROOT, "public/slownik-search.json");

const terms = JSON.parse(fs.readFileSync(SRC, "utf-8"));

const L1_LABELS = {
  "teoria-cs": "Teoria informatyki",
  systemy: "Systemy i architektura",
  sieci: "Sieci",
  dane: "Dane i bazy danych",
  bezpieczenstwo: "Bezpieczeństwo",
  "ai-ml": "AI / Machine Learning",
  infrastruktura: "Chmura i DevOps",
  "inzynieria-oprogramowania": "Inżynieria oprogramowania",
};
const L2_LABELS = {
  "algorytmy-i-struktury-danych": "Algorytmy i struktury danych",
  "matematyka-dyskretna-i-teoria-obliczen": "Matematyka dyskretna i teoria obliczeń",
  "jezyki-i-teoria-typow": "Języki i teoria typów",
  "systemy-operacyjne-i-architektura": "Systemy operacyjne i architektura",
  "sieci-i-protokoly": "Sieci i protokoły",
  "bazy-danych-i-modelowanie": "Bazy danych i modelowanie",
  "systemy-rozproszone-i-wspolbieznosc": "Systemy rozproszone i współbieżność",
  "bezpieczenstwo-i-kryptografia": "Bezpieczeństwo i kryptografia",
  "ai-ml-dl-nlp": "AI / ML / DL / NLP",
  "chmura-devops-sre": "Chmura, DevOps i SRE",
  "inzynieria-i-wzorce": "Inżynieria i wzorce",
};
const ACR = { ai: "AI", ml: "ML", dl: "DL", nlp: "NLP", llm: "LLM", rag: "RAG", sre: "SRE", devops: "DevOps", api: "API", cs: "CS", os: "OS", db: "DB", sql: "SQL", nosql: "NoSQL", http: "HTTP", https: "HTTPS", tcp: "TCP", udp: "UDP", ip: "IP", dns: "DNS", gpu: "GPU", cpu: "CPU", ci: "CI", cd: "CD", ux: "UX", ui: "UI", oop: "OOP", fp: "FP", io: "I/O", vm: "VM" };
const deslug = (s) => {
  const j = s.split("-").map((w) => ACR[w] ?? w).join(" ");
  return j.charAt(0).toUpperCase() + j.slice(1);
};
const labelL1 = (l1) => L1_LABELS[l1] || deslug(l1);
const labelL2 = (l2) => L2_LABELS[l2] || deslug(l2);

// węzły nawigacji (unikalne)
const l1Set = new Set();
const l2ToL1 = new Map();
const l3ToL2 = new Map();
for (const t of terms) {
  l1Set.add(t.L1);
  l2ToL1.set(t.L2, t.L1);
  l3ToL2.set(t.L3, t.L2);
}

const docs = [
  ...Array.from(l1Set).map((l1) => ({
    id: `l1:${l1}`, haslo: labelL1(l1), skrot: "", sub: "Kategoria", level: "Kategoria", href: `/slownik/kategoria/${l1}`,
  })),
  ...Array.from(l2ToL1.entries()).map(([l2, l1]) => ({
    id: `l2:${l2}`, haslo: labelL2(l2), skrot: "", sub: labelL1(l1), level: "Poddziedzina", href: `/slownik/kategoria/${l1}/${l2}`,
  })),
  ...Array.from(l3ToL2.entries()).map(([l3, l2]) => ({
    id: `l3:${l3}`, haslo: deslug(l3), skrot: "", sub: labelL2(l2), level: "Grupa", href: `/slownik/grupa/${l3}`,
  })),
  ...terms.map((t) => ({
    id: t.slug, haslo: t.haslo, skrot: t.skrot || "", sub: labelL1(t.L1), level: "Hasło", href: `/slownik/${t.slug}`,
  })),
];

const normalize = (term) =>
  term.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[̀-ͯ]/g, "");

const mini = new MiniSearch({
  idField: "id",
  fields: ["haslo", "skrot"],
  storeFields: ["haslo", "skrot", "sub", "level", "href"],
  processTerm: (t) => {
    const x = normalize(t);
    return x.length ? x : null;
  },
  tokenize: (text) => text.split(/[\s/.,;:()„"”»«-]+/).filter(Boolean),
});
mini.addAll(docs);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(mini.toJSON()), "utf-8");
const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`Zindeksowano ${docs.length} pozycji słownika → ${OUT} (${kb} KB).`);
