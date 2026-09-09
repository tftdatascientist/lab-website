/** "W skrócie" — answer-first na górze wpisu (LLM cytują pierwsze zwięzłe podsumowanie). Reguły, nie karta. */
export default function TldrBox({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <aside aria-label="W skrócie" className="ruled">
      <p className="label">W skrócie</p>
      <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)" }}>{children}</p>
    </aside>
  );
}
