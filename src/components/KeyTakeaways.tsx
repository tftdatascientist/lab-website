/** Najważniejsze wnioski — lista łatwa do ekstrakcji przez LLM (chunk-friendly). Wiersze, nie karta. */
export default function KeyTakeaways({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="kt" className="ruled">
      <h2 id="kt" className="label">
        Najważniejsze wnioski
      </h2>
      <ul className="rows">
        {items.map((t, i) => (
          <li key={i}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span className="t" style={{ fontWeight: 400 }}>
              {t}
            </span>
            <span className="v" />
          </li>
        ))}
      </ul>
    </section>
  );
}
