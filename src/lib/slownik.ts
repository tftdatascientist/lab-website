import data from "@/content/slownik.json";

export interface Term {
  slug: string;
  haslo: string;
  skrot: string | null;
  poddziedzina: number;
  typ: "obiekt" | "proces" | "cecha";
  definicja: string;
  hiperonim: string;
  zobaczTez: string[];
  zrodlo: string;
  L1: string;
  L2: string;
  L3: string;
  L4: string;
}

export const TERMS = data as Term[];

// ── Etykiety controlled vocab (kebab → czytelne PL) ─────────────────────────
export const L1_LABELS: Record<string, string> = {
  "teoria-cs": "Teoria informatyki",
  systemy: "Systemy i architektura",
  sieci: "Sieci",
  dane: "Dane i bazy danych",
  bezpieczenstwo: "Bezpieczeństwo",
  "ai-ml": "AI / Machine Learning",
  infrastruktura: "Chmura i DevOps",
  "inzynieria-oprogramowania": "Inżynieria oprogramowania",
};

export const L1_ORDER = [
  "teoria-cs",
  "systemy",
  "sieci",
  "dane",
  "bezpieczenstwo",
  "ai-ml",
  "infrastruktura",
  "inzynieria-oprogramowania",
];

export const L2_LABELS: Record<string, string> = {
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

export const TYP_LABELS: Record<string, string> = {
  obiekt: "obiekt",
  proces: "proces",
  cecha: "cecha",
};

// ── Indeksy ─────────────────────────────────────────────────────────────────
const BY_SLUG = new Map(TERMS.map((t) => [t.slug, t]));
const BY_HASLO = new Map(TERMS.map((t) => [t.haslo.toLowerCase(), t]));

export function getAllTerms(): Term[] {
  return TERMS;
}

export function getAllSlugs(): string[] {
  return TERMS.map((t) => t.slug);
}

export function getTerm(slug: string): Term | undefined {
  return BY_SLUG.get(slug);
}

/** Rozwiązuje nazwę z "zobacz też" na istniejący termin (jeśli jest w słowniku). */
export function resolveTermByName(name: string): Term | undefined {
  return BY_HASLO.get((name || "").toLowerCase());
}

/** Pierwsza litera do indeksu alfabetycznego (cyfry/skróty → "#"). */
export function firstLetter(haslo: string): string {
  const c = haslo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")[0]
    ?.toUpperCase();
  return c && /[A-Z]/.test(c) ? c : "#";
}

/** Kategorie L1 z licznikami, w ustalonej kolejności. */
export function getCategories(): { key: string; label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const t of TERMS) counts.set(t.L1, (counts.get(t.L1) || 0) + 1);
  return L1_ORDER.filter((k) => counts.has(k)).map((k) => ({
    key: k,
    label: L1_LABELS[k] || k,
    count: counts.get(k) || 0,
  }));
}

/** Powiązane terminy: ta sama poddziedzina L2, bez bieżącego, maks. n. */
export function getRelated(term: Term, n = 6): Term[] {
  return TERMS.filter((t) => t.L2 === term.L2 && t.slug !== term.slug).slice(0, n);
}
