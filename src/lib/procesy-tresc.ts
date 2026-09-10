import { getNode, type ProcessNode } from "@/lib/procesy";

/**
 * Procesy wplecione w treść (decyzja właściciela 2026-09-10: „wykorzystanie opisów procesów
 * i wplatanie ich między treści strony”). Każde miejsce na stronie, które mówi o usłudze,
 * korzyści albo temacie, wskazuje konkretne procesy z klasyfikacji APQC PCF 7.4 (tłum. własne)
 * — z kodem, nazwą i pierwszym zdaniem opisu. Kody dobrane ręcznie; brak kodu w bazie
 * przerywa build (żadnych martwych odwołań).
 */

/** usługa (slug z content/services.ts) → procesy PCF, które to wdrożenie obejmuje */
export const PROCESY_USLUG: Record<string, string[]> = {
  "automatyzacja-n8n": ["9.2.2", "3.5.4", "3.5.1", "9.6.1", "13.1.5"],
  "chatboty-ai": ["6.2.2", "6.1.3", "3.5.8", "6.5.1", "6.2.3"],
  "agenci-glosowi": ["6.2.1", "6.2.2", "6.1.5", "3.5.1", "5.3.1"],
  "bazy-wiedzy-rag": ["13.5.1", "13.5.3", "8.4.4", "7.3.1", "8.7.8"],
  "dashboardy-raporty": ["9.1.4", "13.6.3", "13.7.6", "3.3.5", "9.3.4"],
  "integracje-systemow": ["8.5.1", "8.4.2", "8.6.4", "2.1.4", "8.6.3"],
};

/** tag wpisu bloga → proces, do którego wpis prowadzi w „Zobacz też” */
export const PROCESY_TAGOW: Record<string, string> = {
  automatyzacja: "13.1.5",
  n8n: "13.1.5",
  "ai dla biznesu": "8.2.7",
  "ai dla msp": "8.2.7",
  "polska scena ai": "8.2.7",
  cyfryzacja: "8.6.4",
  "uslugi cyfrowe": "3.5.8",
  "prawo ai": "8.3.1",
  "nowe produkty ai": "2.2.2",
  startupy: "2.2.2",
  "big tech": "8.2.2",
  chatboty: "6.2.2",
  "agenci-glosowi": "6.2.1",
  voicebot: "6.2.1",
};

/** „Co dostajesz” na /kontakt → proces, którego dotyczy dany krok */
export const PROCESY_KONTAKTU: Record<string, string> = {
  Rozmowa: "13.1.3",
  Audyt: "13.1.5",
  Wygrane: "9.1.3",
  Szacunek: "13.4.1",
};

/** /o-nas — wspólny język z klientem: zarządzanie procesami */
export const PROCESY_O_NAS = ["13.1.1", "13.1.2", "13.1.3"];

export function pierwszeZdanie(text: string | undefined, max = 160): string {
  if (!text) return "";
  const s = text.split(/(?<=\.)\s/)[0].trim();
  return s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s;
}

export function procesyZKodow(codes: string[]): ProcessNode[] {
  return codes.map((code) => {
    const n = getNode(code);
    if (!n) throw new Error(`procesy-tresc: brak procesu ${code} w content/procesy.json`);
    return n;
  });
}

export function procesyUslugi(slug: string): ProcessNode[] {
  return procesyZKodow(PROCESY_USLUG[slug] ?? []);
}

/** procesy dla tagów wpisu (bez powtórzeń, w kolejności tagów) */
export function procesyTagow(tags: string[] | undefined, limit = 2): ProcessNode[] {
  const seen = new Set<string>();
  const out: ProcessNode[] = [];
  for (const t of tags ?? []) {
    const code = PROCESY_TAGOW[t.toLowerCase()];
    if (!code || seen.has(code)) continue;
    seen.add(code);
    const n = getNode(code);
    if (n) out.push(n);
    if (out.length >= limit) break;
  }
  return out;
}
