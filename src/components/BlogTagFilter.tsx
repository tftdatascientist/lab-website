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
            ? "text-white bg-cyan/20 border-cyan/30"
            : "text-text-secondary border-white/[0.08] hover:text-text-primary hover:border-white/[0.16]"
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
              ? "text-white bg-cyan/20 border-cyan/30"
              : "text-text-secondary border-white/[0.08] hover:text-text-primary hover:border-white/[0.16]"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
