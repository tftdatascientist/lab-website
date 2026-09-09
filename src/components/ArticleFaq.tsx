import type { PostFaq } from "@/lib/mdx";

/**
 * FAQ wpisu — treść zawsze w DOM (semantyczne H3 + akapit), nie chowana przed crawlerem.
 * Zasila też FAQPage JSON-LD w page.tsx. Kluczowe dla cytowalności w LLM.
 */
export default function ArticleFaq({ items }: { items?: PostFaq[] }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="faq" className="ruled">
      <h2 id="faq" className="label">
        Często zadawane pytania
      </h2>
      <div style={{ display: "grid", gap: "var(--space-2)", maxWidth: "var(--measure)" }}>
        {items.map((f, i) => (
          <div key={i}>
            <h3 style={{ fontWeight: 600, marginBottom: 4 }}>{f.q}</h3>
            <p style={{ color: "var(--ink-2)" }}>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
