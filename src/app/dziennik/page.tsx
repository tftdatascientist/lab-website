import type { Metadata } from "next";
import Link from "next/link";
import { getAllDziennikPosts } from "@/lib/dziennik";
import DziennikCard from "@/components/DziennikCard";

export const metadata: Metadata = {
  title: "Dziennik AI — lok-ai.pl",
  description:
    "Codzienny digest ze świata AI — publikacje dnia, wiadomości Claude Code News i przegląd wpisów. Aktualizowany 3 razy dziennie.",
};

const CATEGORIES = [
  { key: "", label: "Wszystko" },
  { key: "publikacja-dnia", label: "Publikacja dnia" },
  { key: "ccn", label: "CCN" },
  { key: "przeglad", label: "Przegląd" },
] as const;

interface Props {
  searchParams: { category?: string };
}

export default function DziennikPage({ searchParams }: Props) {
  const allPosts = getAllDziennikPosts();
  const activeCategory = searchParams.category ?? "";

  const filtered =
    activeCategory === ""
      ? allPosts
      : allPosts.filter((p) => p.frontmatter.category === activeCategory);

  return (
    <section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary/80 border border-primary/20 rounded-full px-2.5 py-0.5">
              Auto-digest
            </span>
          </div>
          <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-on-surface mb-4">
            Dziennik AI
          </h1>
          <p className="text-on-surface-variant leading-relaxed max-w-xl">
            Codzienny przegląd ze świata AI — publikacja dnia, wiadomości
            Claude&nbsp;Code&nbsp;News i&nbsp;przegląd wpisów. Aktualizowany
            automatycznie 3&nbsp;razy dziennie.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(({ key, label }) => {
            const isActive = activeCategory === key;
            const href = key === "" ? "/dziennik" : `/dziennik?category=${key}`;
            return (
              <Link
                key={key}
                href={href}
                className={`font-mono text-[11px] uppercase tracking-[0.1em] border rounded-full px-3 py-1 transition-colors duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "text-outline border-outline-variant/15 hover:text-on-surface-variant hover:border-outline-variant/25"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Posts list */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filtered.map((post) => (
              <DziennikCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-outline text-sm py-12 text-center">
            Brak wpisów w tej kategorii.
          </p>
        )}
      </div>
    </section>
  );
}
