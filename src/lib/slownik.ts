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

// ── Etykiety L3/L4 (deslugify, bo brak słownika nazw dla tych poziomów) ──────
const ACRONYMS: Record<string, string> = {
  ai: "AI", ml: "ML", dl: "DL", nlp: "NLP", llm: "LLM", rag: "RAG", sre: "SRE",
  devops: "DevOps", api: "API", cs: "CS", os: "OS", db: "DB", sql: "SQL",
  nosql: "NoSQL", http: "HTTP", https: "HTTPS", tcp: "TCP", udp: "UDP", ip: "IP",
  dns: "DNS", gpu: "GPU", cpu: "CPU", ci: "CI", cd: "CD", ux: "UX", ui: "UI",
  oop: "OOP", fp: "FP", io: "I/O", vm: "VM",
};

/** Slug PCF-podobny → czytelna etykieta PL (z poprawą akronimów). */
export function deslugify(slug: string): string {
  const words = slug.split("-").map((w) => ACRONYMS[w] ?? w);
  const joined = words.join(" ");
  return joined.charAt(0).toUpperCase() + joined.slice(1);
}

export function labelL1(l1: string): string {
  return L1_LABELS[l1] || deslugify(l1);
}
export function labelL2(l2: string): string {
  return L2_LABELS[l2] || deslugify(l2);
}
export const labelL3 = deslugify;
export const labelL4 = deslugify;

// ── Indeksy ─────────────────────────────────────────────────────────────────
const BY_SLUG = new Map(TERMS.map((t) => [t.slug, t]));
const BY_HASLO = new Map(TERMS.map((t) => [t.haslo.toLowerCase(), t]));

// hierarchia: rodzice
const L2_TO_L1 = new Map<string, string>();
const L3_TO_L2 = new Map<string, string>();
// dzieci (unikalne, kolejność = alfabetycznie po etykiecie / haśle)
const L2S_BY_L1 = new Map<string, Set<string>>();
const L3S_BY_L2 = new Map<string, Set<string>>();
const L4S_BY_L3 = new Map<string, Set<string>>();
const TERMS_BY_L3 = new Map<string, Term[]>();
const TERMS_BY_L4 = new Map<string, Term[]>(); // klucz: `${L3}|${L4}` (L4 nie jest globalnie unikalne)

for (const t of TERMS) {
  L2_TO_L1.set(t.L2, t.L1);
  L3_TO_L2.set(t.L3, t.L2);
  if (!L2S_BY_L1.has(t.L1)) L2S_BY_L1.set(t.L1, new Set());
  L2S_BY_L1.get(t.L1)!.add(t.L2);
  if (!L3S_BY_L2.has(t.L2)) L3S_BY_L2.set(t.L2, new Set());
  L3S_BY_L2.get(t.L2)!.add(t.L3);
  if (!L4S_BY_L3.has(t.L3)) L4S_BY_L3.set(t.L3, new Set());
  L4S_BY_L3.get(t.L3)!.add(t.L4);
  if (!TERMS_BY_L3.has(t.L3)) TERMS_BY_L3.set(t.L3, []);
  TERMS_BY_L3.get(t.L3)!.push(t);
  const k4 = `${t.L3}|${t.L4}`;
  if (!TERMS_BY_L4.has(k4)) TERMS_BY_L4.set(k4, []);
  TERMS_BY_L4.get(k4)!.push(t);
}

const byHaslo = (a: Term, b: Term) => a.haslo.localeCompare(b.haslo, "pl");
const byLabel = (a: string, b: string) => deslugify(a).localeCompare(deslugify(b), "pl");
TERMS_BY_L3.forEach((arr) => arr.sort(byHaslo));
TERMS_BY_L4.forEach((arr) => arr.sort(byHaslo));

// ── Nawigacja po hierarchii ──────────────────────────────────────────────────

/** Poddziedziny L2 należące do kategorii L1 (alfabetycznie po etykiecie). */
export function getL2sByL1(l1: string): string[] {
  return Array.from(L2S_BY_L1.get(l1) ?? []).sort((a, b) => labelL2(a).localeCompare(labelL2(b), "pl"));
}
/** Grupy L3 należące do poddziedziny L2. */
export function getL3sByL2(l2: string): string[] {
  return Array.from(L3S_BY_L2.get(l2) ?? []).sort(byLabel);
}
/** Podgrupy L4 należące do grupy L3. */
export function getL4sByL3(l3: string): string[] {
  return Array.from(L4S_BY_L3.get(l3) ?? []).sort(byLabel);
}
/** Hasła grupy L3 (alfabetycznie). */
export function getTermsByL3(l3: string): Term[] {
  return TERMS_BY_L3.get(l3) ?? [];
}
/** Hasła podgrupy L4 (w obrębie konkretnego L3). */
export function getTermsByL4(l3: string, l4: string): Term[] {
  return TERMS_BY_L4.get(`${l3}|${l4}`) ?? [];
}

/** Liczba haseł w poddziedzinie L2 (suma po jej grupach L3). */
export function getTermsByL2Count(l2: string): number {
  return getL3sByL2(l2).reduce((acc, l3) => acc + (TERMS_BY_L3.get(l3)?.length ?? 0), 0);
}

export function getL1ofL2(l2: string): string | undefined {
  return L2_TO_L1.get(l2);
}
export function getL2ofL3(l3: string): string | undefined {
  return L3_TO_L2.get(l3);
}

/** Wszystkie L3 (globalnie unikalne) — do generateStaticParams /slownik/grupa/[l3]. */
export function getAllL3Slugs(): string[] {
  return Array.from(L3_TO_L2.keys());
}
/** Wszystkie pary (l1, l2) — do generateStaticParams /slownik/kategoria/[l1]/[l2]. */
export function getAllL2Pairs(): { l1: string; l2: string }[] {
  return Array.from(L2_TO_L1.entries()).map(([l2, l1]) => ({ l1, l2 }));
}

export interface SlownikTrailItem {
  label: string;
  href: string;
}

/** Okruszki dla węzła taksonomii (do breadcrumbów + JSON-LD). Podaj najgłębszy znany poziom. */
export function buildSlownikTrail(opts: { l1?: string; l2?: string; l3?: string }): SlownikTrailItem[] {
  const trail: SlownikTrailItem[] = [];
  const l1 = opts.l1 ?? (opts.l2 ? getL1ofL2(opts.l2) : opts.l3 ? getL1ofL2(getL2ofL3(opts.l3) || "") : undefined);
  const l2 = opts.l2 ?? (opts.l3 ? getL2ofL3(opts.l3) : undefined);
  if (l1) trail.push({ label: labelL1(l1), href: `/slownik/kategoria/${l1}` });
  if (l2 && l1) trail.push({ label: labelL2(l2), href: `/slownik/kategoria/${l1}/${l2}` });
  if (opts.l3) trail.push({ label: labelL3(opts.l3), href: `/slownik/grupa/${opts.l3}` });
  return trail;
}

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

/** Wszystkie hasła danej kategorii L1, alfabetycznie. */
export function getTermsByL1(l1: string): Term[] {
  return TERMS.filter((t) => t.L1 === l1).sort((a, b) =>
    a.haslo.localeCompare(b.haslo, "pl"),
  );
}

/** Slugi kategorii L1 (w kolejności L1_ORDER), które mają przynajmniej jedno hasło. */
export function getL1Slugs(): string[] {
  const present = new Set(TERMS.map((t) => t.L1));
  return L1_ORDER.filter((k) => present.has(k));
}
