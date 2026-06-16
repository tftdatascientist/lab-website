/** Najważniejsze wnioski — lista łatwa do ekstrakcji przez LLM (chunk-friendly). */
export default function KeyTakeaways({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="kt" className="not-prose my-10 rounded-xl border border-outline-variant/20 bg-surface/40 p-6">
      <h2 id="kt" className="font-display text-lg text-on-surface mb-4">
        Najważniejsze wnioski
      </h2>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3 text-on-surface-variant leading-relaxed">
            <span aria-hidden className="text-amber mt-0.5">▸</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
