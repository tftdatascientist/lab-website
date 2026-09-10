import Link from "next/link";
import type { ProcessNode } from "@/lib/procesy";
import { nodeHref } from "@/lib/procesy";
import { pierwszeZdanie } from "@/lib/procesy-tresc";

/**
 * Procesy wplecione w treść: sekcja `.ruled` z wierszami `lp · nazwa + pierwsze zdanie opisu · kod`.
 * Kod w prawej kolumnie (mono), bo w lewej 44 px nie mieści się „13.5.3”. Każdy wiersz prowadzi
 * do strony procesu. Server component.
 */
export default function ProcesyWplatane({
  nodes,
  title = "Procesy z klasyfikacji APQC",
  lead,
}: {
  nodes: ProcessNode[];
  title?: string;
  lead?: string;
}) {
  if (!nodes.length) return null;
  return (
    <section className="ruled" aria-label={title}>
      <h2 className="label">
        {title} · {nodes.length}
      </h2>
      {lead && (
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-1)" }}>{lead}</p>
      )}
      <ul className="rows">
        {nodes.map((n, i) => (
          <li key={n.code}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span className="t">
              <Link href={nodeHref(n)}>{n.namePl}</Link>
              <span className="d">{pierwszeZdanie(n.descPl)}</span>
            </span>
            <span className="v">{n.code}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Kod procesu jako link w prawej kolumnie wiersza (`.v`) — do list usług i kroków. */
export function KodProcesu({ node }: { node: ProcessNode | undefined }) {
  if (!node) return <span className="v" />;
  return (
    <span className="v">
      <Link href={nodeHref(node)} title={node.namePl}>
        {node.code}
      </Link>
    </span>
  );
}
