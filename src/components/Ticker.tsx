"use client";

interface TickerItem {
  label: string;
  value: string;
  color?: string;
}

interface TickerProps {
  items: TickerItem[];
}

export default function Ticker({ items }: TickerProps) {
  const doubled = [...items, ...items];
  return (
    <div
      className="border-t border-b overflow-hidden"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="flex gap-12 py-2.5 whitespace-nowrap"
        style={{
          width: "max-content",
          animation: "lokai-ticker 40s linear infinite",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 text-[13px] font-body text-text-dim"
            style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.005em" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: item.color || "#f5b845" }}
            />
            <span className="text-text font-medium">{item.label}</span>
            <span className="font-semibold" style={{ color: item.color || "#f5b845" }}>
              {item.value}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
