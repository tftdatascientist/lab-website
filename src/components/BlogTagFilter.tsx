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
        className={`font-mono text-xs uppercase tracking-[0.1em] rounded-full px-3.5 py-1.5 border transition-colors ${
          activeTag === null
            ? "text-on-surface bg-primary/20 border-primary/30"
            : "text-on-surface-variant border-outline-variant/30 hover:text-on-surface hover:border-outline-variant/60"
        }`}
      >
        Wszystko
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag === activeTag ? null : tag)}
          className={`font-mono text-xs uppercase tracking-[0.1em] rounded-full px-3.5 py-1.5 border transition-colors ${
            activeTag === tag
              ? "text-on-surface bg-primary/20 border-primary/30"
              : "text-on-surface-variant border-outline-variant/30 hover:text-on-surface hover:border-outline-variant/60"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
