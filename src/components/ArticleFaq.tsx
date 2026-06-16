import type { PostFaq } from "@/lib/mdx";

/**
 * FAQ wpisu — treść zawsze w DOM (semantyczne H3 + akapit), nie chowana przed crawlerem.
 * Zasila też FAQPage JSON-LD w page.tsx. Kluczowe dla cytowalności w LLM.
 */
export default function ArticleFaq({ items }: { items?: PostFaq[] }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="faq" className="not-prose my-12">
      <h2 id="faq" className="font-display text-xl text-on-surface mb-6">
        Często zadawane pytania
      </h2>
      <div className="space-y-5">
        {items.map((f, i) => (
          <div key={i} className="border-l-2 border-amber/40 pl-4">
            <h3 className="font-display text-base text-on-surface mb-1">{f.q}</h3>
            <p className="text-on-surface-variant leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
