/**
 * autolink — internal-linking mesh dla treści MDX.
 *
 * Buduje mapę haslo(lowercase) → slug ze słownika (getAllTerms) i dostarcza
 * komponenty MDX (p, li, td), które podmieniają PIERWSZE wystąpienie każdego
 * hasła w tekście na <Link href="/slownik/{slug}">.
 *
 * Reguły:
 *  - dedup w obrębie artykułu (Set) — każde hasło linkowane maks. raz,
 *  - globalny limit linków na artykuł (MAX_LINKS_PER_ARTICLE),
 *  - tylko węzły tekstowe akapitów / list / komórek (nagłówki, kod, linki
 *    pozostają nietknięte — nie eksportujemy dla nich nadpisań),
 *  - dłuższe hasła mają priorytet (mniej zachłanne dopasowania),
 *  - dopasowanie tylko po pełnych słowach (granice \b z obsługą PL).
 *
 * Wydajność: mapa i regex budowane raz na poziomie modułu (memo).
 */
import * as React from "react";
import Link from "next/link";
import { getAllTerms } from "@/lib/slownik";

const MAX_LINKS_PER_ARTICLE = 8;

// ── Mapa haseł (module-level memo) ──────────────────────────────────────────
interface AutolinkEntry {
  haslo: string;
  lower: string;
  slug: string;
}

let _entries: AutolinkEntry[] | null = null;
let _matcher: RegExp | null = null;

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildEntries(): AutolinkEntry[] {
  if (_entries) return _entries;
  const seen = new Set<string>();
  const entries: AutolinkEntry[] = [];
  for (const t of getAllTerms()) {
    const haslo = (t.haslo || "").trim();
    if (!haslo) continue;
    const lower = haslo.toLowerCase();
    // unikamy bardzo krótkich/szumiących haseł (1-2 znaki, np. skróty)
    if (lower.length < 3) continue;
    if (seen.has(lower)) continue;
    seen.add(lower);
    entries.push({ haslo, lower, slug: t.slug });
  }
  // dłuższe hasła najpierw — w regexie alternatywa dopasuje najdłuższe
  entries.sort((a, b) => b.lower.length - a.lower.length);
  _entries = entries;
  return entries;
}

/** Buduje (raz) jeden regex z alternatywą wszystkich haseł, z granicami słów. */
function buildMatcher(): RegExp {
  if (_matcher) return _matcher;
  const entries = buildEntries();
  const alt = entries.map((e) => escapeRe(e.haslo)).join("|");
  // (?<![\p{L}\p{N}_]) / (?![\p{L}\p{N}_]) — granice słów z obsługą znaków PL
  _matcher = new RegExp(`(?<![\\p{L}\\p{N}_])(${alt})(?![\\p{L}\\p{N}_])`, "giu");
  return _matcher;
}

// Mapa lower → slug do szybkiego rozwiązania trafienia.
let _bySlug: Map<string, string> | null = null;
function lowerToSlug(): Map<string, string> {
  if (_bySlug) return _bySlug;
  _bySlug = new Map(buildEntries().map((e) => [e.lower, e.slug]));
  return _bySlug;
}

/**
 * Stan linkowania współdzielony w obrębie jednego renderu artykułu.
 * Tworzony przez createAutolinkComponents() — każdy artykuł dostaje świeży Set.
 */
interface LinkState {
  used: Set<string>;
  count: number;
}

/**
 * Linkuje pojedynczy ciąg tekstowy. Zwraca tablicę węzłów React
 * (tekst + <Link>). Podmienia tylko pierwsze wystąpienie nieużytego hasła.
 */
function linkifyText(text: string, state: LinkState, keyPrefix: string): React.ReactNode {
  if (!text || state.count >= MAX_LINKS_PER_ARTICLE) return text;
  const matcher = buildMatcher();
  matcher.lastIndex = 0;
  const map = lowerToSlug();

  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  while ((m = matcher.exec(text)) !== null) {
    if (state.count >= MAX_LINKS_PER_ARTICLE) break;
    const raw = m[1];
    const lower = raw.toLowerCase();
    const slug = map.get(lower);
    if (!slug || state.used.has(lower)) continue;

    state.used.add(lower);
    state.count += 1;

    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link
        key={`${keyPrefix}-al-${i++}`}
        href={`/slownik/${slug}`}
        className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary transition-colors"
      >
        {raw}
      </Link>,
    );
    last = m.index + raw.length;
  }

  if (out.length === 0) return text;
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/**
 * Rekurencyjnie przetwarza children: tekst → linkify, elementy → pozostawione
 * (nie linkujemy wewnątrz już istniejących linków, kodu, mocnych itp. —
 * przetwarzamy wyłącznie surowe stringi).
 */
function processChildren(
  children: React.ReactNode,
  state: LinkState,
  keyPrefix: string,
): React.ReactNode {
  return React.Children.map(children, (child, idx) => {
    if (typeof child === "string") {
      return linkifyText(child, state, `${keyPrefix}-${idx}`);
    }
    // Nie wchodzimy w <a>, <code>, <strong> itp. — zostawiamy nietknięte,
    // żeby nie zagnieżdżać linków ani nie linkować w kodzie.
    return child;
  });
}

type ElProps = React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode };

/**
 * Tworzy obiekt `components` dla <MDXRemote components={...}/> z autolinkiem.
 * Każde wywołanie = nowy stan (Set) per artykuł.
 */
export function createAutolinkComponents() {
  const state: LinkState = { used: new Set<string>(), count: 0 };

  function Paragraph({ children, ...rest }: ElProps) {
    return <p {...rest}>{processChildren(children, state, "p")}</p>;
  }
  function ListItem({ children, ...rest }: ElProps) {
    return <li {...rest}>{processChildren(children, state, "li")}</li>;
  }
  function TableCell({ children, ...rest }: ElProps) {
    return <td {...rest}>{processChildren(children, state, "td")}</td>;
  }

  return {
    p: Paragraph,
    li: ListItem,
    td: TableCell,
  };
}

/** Liczba unikalnych haseł słownika dostępnych do linkowania (diagnostyka). */
export function autolinkTermCount(): number {
  return buildEntries().length;
}
