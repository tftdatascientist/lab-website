"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { L1_LABELS } from "@/lib/slownik";

interface Item {
  slug: string;
  haslo: string;
  skrot: string | null;
  typ: string;
  def: string;
  L1: string;
}

interface Props {
  items: Item[];
  categories: { key: string; label: string; count: number }[];
}

function firstLetter(haslo: string): string {
  const c = haslo.normalize("NFD").replace(/[̀-ͯ]/g, "")[0]?.toUpperCase();
  return c && /[A-Z]/.test(c) ? c : "#";
}

export default function SlownikListClient({ items, categories }: Props) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((it) => {
      if (cat && it.L1 !== cat) return false;
      if (!needle) return true;
      return (
        it.haslo.toLowerCase().includes(needle) ||
        (it.skrot || "").toLowerCase().includes(needle) ||
        it.def.toLowerCase().includes(needle)
      );
    });
  }, [items, q, cat]);

  // grupowanie alfabetyczne
  const groups = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => a.haslo.localeCompare(b.haslo, "pl"));
    const map = new Map<string, Item[]>();
    for (const it of sorted) {
      const L = firstLetter(it.haslo);
      if (!map.has(L)) map.set(L, []);
      map.get(L)!.push(it);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], "pl"));
  }, [filtered]);

  const chipBase =
    "font-mono text-[10px] font-medium uppercase tracking-[0.1em] px-3 py-[5px] rounded-full border transition-colors cursor-pointer";

  return (
    <>
      {/* Wyszukiwarka */}
      <div className="relative mb-6 max-w-[560px]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Szukaj hasła lub definicji…"
          aria-label="Szukaj w słowniku"
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-on-surface placeholder:text-text-mute outline-none focus:border-amber/60 transition-colors font-body text-[15px]"
        />
      </div>

      {/* Filtr kategorii */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setCat(null)}
          className={`${chipBase} ${
            cat === null ? "border-amber bg-amber/10 text-amber" : "border-border text-text-mute hover:text-text-dim"
          }`}
        >
          Wszystkie · {items.length}
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`${chipBase} ${
              cat === c.key ? "border-amber bg-amber/10 text-amber" : "border-border text-text-mute hover:text-text-dim"
            }`}
          >
            {c.label} · {c.count}
          </button>
        ))}
      </div>

      {/* Licznik wyników */}
      <p className="text-text-mute font-mono text-[11px] uppercase tracking-[0.12em] mb-6">
        {filtered.length === items.length
          ? `${filtered.length} haseł`
          : `${filtered.length} z ${items.length} haseł`}
      </p>

      {filtered.length === 0 && (
        <p className="text-text-dim text-[15px]">Brak haseł dla tego zapytania.</p>
      )}

      {/* Lista alfabetyczna */}
      <div className="space-y-10">
        {groups.map(([letter, list]) => (
          <div key={letter} id={`litera-${letter}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-amber text-2xl font-semibold leading-none">{letter}</span>
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] text-text-mute">{list.length}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {list.map((it) => (
                <Link
                  key={it.slug}
                  href={`/slownik/${it.slug}`}
                  className="group block rounded-xl border border-border bg-surface hover:border-amber/40 hover:-translate-y-0.5 transition-all p-4"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <span className="font-heading font-semibold text-on-surface group-hover:text-amber transition-colors leading-snug">
                      {it.haslo}
                    </span>
                    {it.skrot && (
                      <span className="font-mono text-[10px] text-text-mute shrink-0 truncate max-w-[40%]">
                        {it.skrot}
                      </span>
                    )}
                  </div>
                  <p className="text-text-dim text-[13px] leading-snug line-clamp-2">{it.def}</p>
                  <span className="mt-2 inline-block font-mono text-[9px] uppercase tracking-[0.1em] text-text-mute">
                    {L1_LABELS[it.L1] || it.L1}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
