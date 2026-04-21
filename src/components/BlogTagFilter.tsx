"use client";

interface Props {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export default function BlogTagFilter({ tags, activeTag, onTagChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <button
        onClick={() => onTagChange(null)}
        className="font-mono text-[11px] uppercase rounded-full px-3.5 py-1.5 transition-all"
        style={{
          letterSpacing: "0.12em",
          color: activeTag === null ? "#1a0f00" : "#a8a29e",
          background:
            activeTag === null
              ? "linear-gradient(135deg, #f5b845 0%, #ef7955 100%)"
              : "rgba(255,255,255,0.04)",
          outline:
            activeTag === null
              ? "none"
              : "1px solid rgba(255,255,255,0.10)",
        }}
      >
        Wszystko
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag === activeTag ? null : tag)}
          className="font-mono text-[11px] uppercase rounded-full px-3.5 py-1.5 transition-all"
          style={{
            letterSpacing: "0.12em",
            color: activeTag === tag ? "#1a0f00" : "#a8a29e",
            background:
              activeTag === tag
                ? "linear-gradient(135deg, #f5b845 0%, #ef7955 100%)"
                : "rgba(255,255,255,0.04)",
            outline:
              activeTag === tag
                ? "none"
                : "1px solid rgba(255,255,255,0.10)",
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
