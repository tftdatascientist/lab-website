import data from "@/content/procesy.json";

export type ProcessLevel = "Kategoria" | "Grupa procesów" | "Proces" | "Działanie" | "Zadanie";

export interface ProcessCategory {
  num: number;
  code: string;
  slug: string;
  namePl: string;
  nameEng: string;
  descPl: string;
}

/** Węzeł taksonomii (poziomy 2-5) — wypełniany przez scripts/sync-pcf.mjs. */
export interface ProcessNode {
  code: string; // code1 z PCF, np. "1.1.1"
  level: ProcessLevel;
  categorySlug: string;
  parentCode: string | null;
  namePl: string;
  nameEng?: string;
  descPl?: string;
  descEng?: string;
}

interface ProcesyData {
  syncedAt: string | null;
  source: string;
  categories: ProcessCategory[];
  nodes: ProcessNode[];
}

const DATA = data as ProcesyData;

export const PCF_SOURCE = DATA.source;
export const PCF_SYNCED_AT = DATA.syncedAt;

// ── Indeksy (O(1) zamiast filtrowania całej tablicy 1908 węzłów) ─────────────
const byCode = new Map<string, ProcessNode>();
const byCategoryCode = new Map<string, ProcessCategory>();
const childrenByParent = new Map<string, ProcessNode[]>();

/** Klucz sortowania kodów PCF segmentowo ("8.2.10" po "8.2.2", nie alfabetycznie). */
function codeKey(code: string): string {
  return code
    .split(".")
    .map((s) => s.padStart(4, "0"))
    .join(".");
}

for (const c of DATA.categories) byCategoryCode.set(c.code, c);
for (const n of DATA.nodes) byCode.set(n.code, n);
for (const n of DATA.nodes) {
  if (!n.parentCode) continue;
  const arr = childrenByParent.get(n.parentCode);
  if (arr) arr.push(n);
  else childrenByParent.set(n.parentCode, [n]);
}
childrenByParent.forEach((arr) => arr.sort((a, b) => codeKey(a.code).localeCompare(codeKey(b.code))));

// ── Kategorie (poziom 1) ─────────────────────────────────────────────────────
export function getCategories(): ProcessCategory[] {
  return DATA.categories;
}

export function getCategory(slug: string): ProcessCategory | undefined {
  return DATA.categories.find((c) => c.slug === slug);
}

export function getCategorySlugs(): string[] {
  return DATA.categories.map((c) => c.slug);
}

/** Kategoria po kodzie PCF ("8.0") — przydatne przy budowie ścieżki z parentCode. */
export function getCategoryByCode(code: string): ProcessCategory | undefined {
  return byCategoryCode.get(code);
}

// ── Węzły (poziomy 2-5) ──────────────────────────────────────────────────────
export function getNode(code: string): ProcessNode | undefined {
  return byCode.get(code);
}

/** Węzły danej kategorii. */
export function getNodesByCategory(slug: string): ProcessNode[] {
  return DATA.nodes.filter((n) => n.categorySlug === slug);
}

/** Bezpośrednie dzieci węzła (posortowane po kodzie). */
export function getChildren(code: string): ProcessNode[] {
  return childrenByParent.get(code) ?? [];
}

export function getNodesByLevel(slug: string, level: ProcessLevel): ProcessNode[] {
  return DATA.nodes.filter((n) => n.categorySlug === slug && n.level === level);
}

/** Wszystkie Grupy procesów (poziom 2). */
export function getAllGroups(): ProcessNode[] {
  return DATA.nodes.filter((n) => n.level === "Grupa procesów");
}

/** Wszystkie Procesy (poziom 3) — strony „pillar". */
export function getAllProcesses(): ProcessNode[] {
  return DATA.nodes.filter((n) => n.level === "Proces");
}

export function totalNodeCount(): number {
  return DATA.nodes.length;
}

export function countByLevel(level: ProcessLevel): number {
  return DATA.nodes.reduce((acc, n) => (n.level === level ? acc + 1 : acc), 0);
}

/** Liczba wszystkich potomków węzła (całe poddrzewo) — do podsumowań „X elementów". */
export function countDescendants(code: string): number {
  const kids = childrenByParent.get(code);
  if (!kids) return 0;
  let total = kids.length;
  for (const k of kids) total += countDescendants(k.code);
  return total;
}

// ── Slugi (kod PCF ↔ slug URL: "8.2.1" ↔ "8-2-1") ───────────────────────────
export function codeToSlug(code: string): string {
  return code.replaceAll(".", "-");
}

export function slugToCode(slug: string): string {
  return slug.replaceAll("-", ".");
}

// ── Ścieżka / nawigacja ──────────────────────────────────────────────────────

/** Najbliższy przodek na poziomie „Proces" (dla anchorów L4/L5 → strona L3). */
export function getAncestorProcess(code: string): ProcessNode | undefined {
  let node = byCode.get(code);
  while (node) {
    if (node.level === "Proces") return node;
    node = node.parentCode ? byCode.get(node.parentCode) : undefined;
  }
  return undefined;
}

/** URL kanoniczny węzła (L2 → strona grupy, L3 → strona procesu, L4/L5 → anchor na stronie procesu). */
export function nodeHref(node: ProcessNode): string {
  switch (node.level) {
    case "Grupa procesów":
      return `/procesy/${node.categorySlug}/${codeToSlug(node.code)}`;
    case "Proces":
      return `/procesy/proces/${codeToSlug(node.code)}`;
    case "Działanie":
    case "Zadanie": {
      const proc = getAncestorProcess(node.code);
      return proc
        ? `/procesy/proces/${codeToSlug(proc.code)}#a-${codeToSlug(node.code)}`
        : `/procesy/${node.categorySlug}`;
    }
    default:
      return `/procesy/${node.categorySlug}`;
  }
}

export interface TrailItem {
  code: string;
  name: string;
  href: string;
  level: ProcessLevel;
}

/**
 * Pełna ścieżka okruszków od kategorii (L1) do węzła — do breadcrumbów i JSON-LD.
 * Kategoria pochodzi z categorySlug; pozostałe poziomy z łańcucha parentCode.
 */
export function buildTrail(code: string): TrailItem[] {
  const node = byCode.get(code);
  if (!node) return [];

  const chain: ProcessNode[] = [];
  let cur: ProcessNode | undefined = node;
  while (cur) {
    chain.unshift(cur);
    cur = cur.parentCode ? byCode.get(cur.parentCode) : undefined;
  }

  const trail: TrailItem[] = [];
  const cat = getCategory(node.categorySlug);
  if (cat) {
    trail.push({ code: cat.code, name: cat.namePl, href: `/procesy/${cat.slug}`, level: "Kategoria" });
  }
  for (const n of chain) {
    trail.push({ code: n.code, name: n.namePl, href: nodeHref(n), level: n.level });
  }
  return trail;
}
