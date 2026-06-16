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

export function getCategories(): ProcessCategory[] {
  return DATA.categories;
}

export function getCategory(slug: string): ProcessCategory | undefined {
  return DATA.categories.find((c) => c.slug === slug);
}

export function getCategorySlugs(): string[] {
  return DATA.categories.map((c) => c.slug);
}

/** Węzły danej kategorii (puste dopóki nie uruchomisz sync-pcf). */
export function getNodesByCategory(slug: string): ProcessNode[] {
  return DATA.nodes.filter((n) => n.categorySlug === slug);
}

/** Bezpośrednie dzieci węzła (po parentCode). */
export function getChildren(code: string): ProcessNode[] {
  return DATA.nodes.filter((n) => n.parentCode === code);
}

export function getNodesByLevel(slug: string, level: ProcessLevel): ProcessNode[] {
  return DATA.nodes.filter((n) => n.categorySlug === slug && n.level === level);
}

export function totalNodeCount(): number {
  return DATA.nodes.length;
}
