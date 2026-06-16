import { TinyGear } from "./mechanism";

/** "W skrócie" — answer-first box na górze wpisu. LLM cytują pierwsze zwięzłe podsumowanie. */
export default function TldrBox({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <aside aria-label="W skrócie" className="not-prose my-8 rounded-xl border border-amber/25 bg-amber/5 p-5">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-amber mb-2">
        <TinyGear dir="cw" dur={22} size={13} color="#f5b845" />
        W skrócie
      </p>
      <p className="text-on-surface-variant leading-relaxed">{children}</p>
    </aside>
  );
}
