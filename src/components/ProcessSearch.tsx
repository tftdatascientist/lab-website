"use client";

/**
 * ProcessSearch — Cmd+K nad taksonomią PCF (1908+ węzłów), w pełni client-side.
 *
 * Indeks MiniSearch (public/procesy-search.json, ~750 KB) ładowany LENIWIE dopiero
 * przy pierwszym otwarciu. Opcje muszą się zgadzać z scripts/build-search-index.mjs.
 * Tylko warstwa UX — pod spodem są crawlowalne strony SSG.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import MiniSearch, { type SearchResult } from "minisearch";

const normalize = (term: string) =>
  term
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const SEARCH_OPTIONS = {
  idField: "id",
  fields: ["code", "namePl", "nameEng"],
  storeFields: ["code", "namePl", "nameEng", "level", "category", "href"],
  processTerm: (term: string) => {
    const t = normalize(term);
    return t.length ? t : null;
  },
  tokenize: (text: string) => text.split(/[\s/.,;:()„"”»«-]+/).filter(Boolean),
} as const;

const LEVEL_ORDER = ["Kategoria", "Grupa procesów", "Proces", "Działanie", "Zadanie"];

interface Hit {
  id: string;
  code: string;
  namePl: string;
  nameEng: string;
  level: string;
  category: string;
  href: string;
}

export default function ProcessSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const indexRef = useRef<MiniSearch<Hit> | null>(null);
  const loadingRef = useRef(false);

  // skrót klawiszowy ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const loadIndex = useCallback(async () => {
    if (indexRef.current || loadingRef.current) return;
    loadingRef.current = true;
    try {
      const res = await fetch("/procesy-search.json");
      const json = await res.text();
      indexRef.current = MiniSearch.loadJSON<Hit>(json, SEARCH_OPTIONS as never);
    } catch {
      // brak indeksu — search po prostu nie zwróci wyników
    } finally {
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (open) loadIndex();
  }, [open, loadIndex]);

  useEffect(() => {
    const idx = indexRef.current;
    if (!idx || !query.trim()) {
      setHits([]);
      return;
    }
    const results = idx.search(query, {
      prefix: true,
      fuzzy: 0.2,
      boost: { code: 3, namePl: 2 },
      combineWith: "AND",
    }) as (SearchResult & Hit)[];
    setHits(results.slice(0, 24).map((r) => ({ id: r.id, code: r.code, namePl: r.namePl, nameEng: r.nameEng, level: r.level, category: r.category, href: r.href })));
  }, [query]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router],
  );

  const grouped = LEVEL_ORDER.map((lvl) => ({ level: lvl, items: hits.filter((h) => h.level === lvl) })).filter(
    (g) => g.items.length,
  );

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 sm:bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-amber/30 bg-bg-soft/90 backdrop-blur px-4 py-2.5 text-[13px] text-text-dim shadow-lg hover:border-amber/60 hover:text-amber transition-colors"
        aria-label="Szukaj w procesach"
      >
        <SearchIcon />
        <span className="font-medium">Szukaj procesu</span>
        <kbd className="hidden sm:inline font-mono text-[10px] text-text-mute border border-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Wyszukiwarka procesów PCF"
        shouldFilter={false}
        className="fixed inset-0 z-[60] flex items-start justify-center"
      >
        {/* overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div className="relative mt-[12vh] w-full max-w-[640px] mx-4 rounded-2xl border border-border bg-bg-soft shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 border-b border-border">
            <SearchIcon />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              autoFocus
              placeholder="Szukaj procesu, działania, kodu PCF… (PL lub EN)"
              className="flex-1 bg-transparent py-4 text-[15px] text-on-surface placeholder:text-text-mute outline-none"
            />
            <kbd className="font-mono text-[10px] text-text-mute border border-border rounded px-1.5 py-0.5">ESC</kbd>
          </div>

          <Command.List className="max-h-[56vh] overflow-y-auto p-2">
            {query.trim() && grouped.length === 0 && (
              <Command.Empty className="px-3 py-8 text-center text-[14px] text-text-mute">
                Brak wyników dla „{query}".
              </Command.Empty>
            )}
            {!query.trim() && (
              <p className="px-3 py-8 text-center text-[13px] text-text-mute">
                Wpisz nazwę procesu, działania albo kod PCF (np. <span className="font-mono text-text-dim">8.2.1</span>).
              </p>
            )}

            {grouped.map((g) => (
              <Command.Group
                key={g.level}
                heading={
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-mute px-2">
                    {g.level}
                  </span>
                }
                className="mb-1"
              >
                {g.items.map((h) => (
                  <Command.Item
                    key={h.id}
                    value={`${h.code} ${h.namePl} ${h.id}`}
                    onSelect={() => go(h.href)}
                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 cursor-pointer text-[14px] aria-selected:bg-amber/10 aria-selected:text-amber transition-colors"
                  >
                    <span className="font-mono text-[11px] text-amber mt-0.5 whitespace-nowrap">{h.code}</span>
                    <span className="min-w-0">
                      <span className="block text-on-surface leading-snug truncate">{h.namePl}</span>
                      <span className="block text-text-mute text-[11px] truncate">
                        {h.category}
                        {h.nameEng ? ` · ${h.nameEng}` : ""}
                      </span>
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>

          <div className="flex items-center justify-between px-4 py-2.5 border-t border-border text-[11px] text-text-mute">
            <span>{hits.length > 0 ? `${hits.length} wyników` : "APQC PCF 7.4 · 1908 elementów"}</span>
            <span className="font-mono">↑↓ nawigacja · ↵ otwórz</span>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="text-text-mute shrink-0">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}
