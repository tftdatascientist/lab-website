"use client";

/**
 * Paleta — wspólna wyszukiwarka Ctrl+K nad indeksem MiniSearch (procesy / słownik).
 * Indeks JSON ładowany leniwie przy pierwszym otwarciu. Otwiera ją skrót klawiszowy
 * albo zdarzenie `lokai:search` z SzukajPrzycisk (w nagłówku tabliczki huba).
 * Wygląd: tabliczka na płycie (`.palette` w globals.css) — bez rozmycia, bez #000.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import MiniSearch, { type SearchResult } from "minisearch";
import { SEARCH_EVENT } from "./SzukajPrzycisk";

export interface PaletaHit {
  id: string;
  level: string;
  href: string;
  /** kolumna lewa (kod PCF / skrót) */
  code?: string;
  /** tytuł */
  title: string;
  /** podpis pod tytułem */
  sub?: string;
}

export interface PaletaConfig<Raw> {
  indexUrl: string;
  options: object;
  boost: Record<string, number>;
  levelOrder: string[];
  label: string;
  placeholder: string;
  hint: React.ReactNode;
  footer: string;
  toHit: (r: Raw) => PaletaHit;
}

export default function Paleta<Raw extends { id: string }>({ config }: { config: PaletaConfig<Raw> }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<PaletaHit[]>([]);
  const indexRef = useRef<MiniSearch<Raw> | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onEvent = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(SEARCH_EVENT, onEvent);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(SEARCH_EVENT, onEvent);
    };
  }, []);

  const loadIndex = useCallback(async () => {
    if (indexRef.current || loadingRef.current) return;
    loadingRef.current = true;
    try {
      const res = await fetch(config.indexUrl);
      indexRef.current = MiniSearch.loadJSON<Raw>(await res.text(), config.options as never);
    } catch {
      /* brak indeksu — paleta nic nie zwróci */
    } finally {
      loadingRef.current = false;
    }
  }, [config.indexUrl, config.options]);

  useEffect(() => {
    if (open) loadIndex();
  }, [open, loadIndex]);

  useEffect(() => {
    const idx = indexRef.current;
    if (!idx || !query.trim()) {
      setHits([]);
      return;
    }
    const results = idx.search(query, { prefix: true, fuzzy: 0.2, boost: config.boost, combineWith: "AND" }) as (SearchResult &
      Raw)[];
    setHits(results.slice(0, 24).map((r) => config.toHit(r)));
  }, [query, config]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router],
  );

  const grouped = config.levelOrder
    .map((lvl) => ({ level: lvl, items: hits.filter((h) => h.level === lvl) }))
    .filter((g) => g.items.length);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label={config.label} shouldFilter={false} className="palette">
      <div className="veil" onClick={() => setOpen(false)} aria-hidden="true" />
      <div className="box">
        <header>
          <span className="mono" style={{ color: "var(--ink-3)" }}>
            Szukaj
          </span>
          <Command.Input value={query} onValueChange={setQuery} autoFocus placeholder={config.placeholder} />
          <kbd className="mono" style={{ color: "var(--ink-3)" }}>
            Esc
          </kbd>
        </header>

        <Command.List>
          {query.trim() && grouped.length === 0 && <Command.Empty className="hint">Brak wyników dla „{query}”.</Command.Empty>}
          {!query.trim() && <p className="hint">{config.hint}</p>}

          {grouped.map((g) => (
            <Command.Group key={g.level} heading={g.level}>
              {g.items.map((h) => (
                <Command.Item key={h.id} value={`${h.code ?? ""} ${h.title} ${h.id}`} onSelect={() => go(h.href)}>
                  <span className="code">{h.code ?? ""}</span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", fontWeight: 600 }}>{h.title}</span>
                    {h.sub && <span className="sub">{h.sub}</span>}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>

        <footer className="mono" style={{ color: "var(--ink-3)" }}>
          <span>{hits.length > 0 ? `${hits.length} wyników` : config.footer}</span>
          <span>↑↓ · Enter</span>
        </footer>
      </div>
    </Command.Dialog>
  );
}
