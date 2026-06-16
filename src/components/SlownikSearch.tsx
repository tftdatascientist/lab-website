"use client";

/**
 * SlownikSearch — Cmd+K nad słownikiem IT (1201 haseł + węzły nawigacji), client-side.
 * Indeks MiniSearch (public/slownik-search.json, ~300 KB) ładowany leniwie przy otwarciu.
 * Opcje muszą się zgadzać z scripts/build-slownik-search-index.mjs.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import MiniSearch, { type SearchResult } from "minisearch";

const normalize = (term: string) =>
  term.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[̀-ͯ]/g, "");

const SEARCH_OPTIONS = {
  idField: "id",
  fields: ["haslo", "skrot"],
  storeFields: ["haslo", "skrot", "sub", "level", "href"],
  processTerm: (term: string) => {
    const t = normalize(term);
    return t.length ? t : null;
  },
  tokenize: (text: string) => text.split(/[\s/.,;:()„"”»«-]+/).filter(Boolean),
} as const;

const LEVEL_ORDER = ["Hasło", "Grupa", "Poddziedzina", "Kategoria"];

interface Hit {
  id: string;
  haslo: string;
  skrot: string;
  sub: string;
  level: string;
  href: string;
}

export default function SlownikSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const indexRef = useRef<MiniSearch<Hit> | null>(null);
  const loadingRef = useRef(false);

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
      const res = await fetch("/slownik-search.json");
      indexRef.current = MiniSearch.loadJSON<Hit>(await res.text(), SEARCH_OPTIONS as never);
    } catch {
      /* brak indeksu — search nic nie zwróci */
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
      boost: { haslo: 3, skrot: 2 },
      combineWith: "AND",
    }) as (SearchResult & Hit)[];
    setHits(
      results.slice(0, 24).map((r) => ({ id: r.id, haslo: r.haslo, skrot: r.skrot, sub: r.sub, level: r.level, href: r.href })),
    );
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 sm:bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-amber/30 bg-bg-soft/90 backdrop-blur px-4 py-2.5 text-[13px] text-text-dim shadow-lg hover:border-amber/60 hover:text-amber transition-colors"
        aria-label="Szukaj w słowniku"
      >
        <SearchIcon />
        <span className="font-medium">Szukaj hasła</span>
        <kbd className="hidden sm:inline font-mono text-[10px] text-text-mute border border-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Wyszukiwarka słownika IT"
        shouldFilter={false}
        className="fixed inset-0 z-[60] flex items-start justify-center"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
        <div className="relative mt-[12vh] w-full max-w-[640px] mx-4 rounded-2xl border border-border bg-bg-soft shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 border-b border-border">
            <SearchIcon />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              autoFocus
              placeholder="Szukaj hasła, skrótu, kategorii…"
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
                Wpisz nazwę hasła, skrót (np. <span className="font-mono text-text-dim">TCP</span>) albo kategorię.
              </p>
            )}

            {grouped.map((g) => (
              <Command.Group
                key={g.level}
                heading={
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-mute px-2">{g.level}</span>
                }
                className="mb-1"
              >
                {g.items.map((h) => (
                  <Command.Item
                    key={h.id}
                    value={`${h.haslo} ${h.skrot} ${h.id}`}
                    onSelect={() => go(h.href)}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 cursor-pointer text-[14px] aria-selected:bg-amber/10 aria-selected:text-amber transition-colors"
                  >
                    <span className="min-w-0">
                      <span className="block text-on-surface leading-snug truncate">
                        {h.haslo}
                        {h.skrot ? <span className="text-text-mute font-mono text-[12px] ml-2">{h.skrot}</span> : null}
                      </span>
                      <span className="block text-text-mute text-[11px] truncate">{h.sub}</span>
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>

          <div className="flex items-center justify-between px-4 py-2.5 border-t border-border text-[11px] text-text-mute">
            <span>{hits.length > 0 ? `${hits.length} wyników` : "Słownik IT · 1201 haseł"}</span>
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
