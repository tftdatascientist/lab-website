"use client";

interface Props {
  contentSelector?: string;
}

export default function LinkedInCopyButton({
  contentSelector = ".prose",
}: Props) {
  function handleCopy() {
    const el = document.querySelector(contentSelector);
    if (el) {
      navigator.clipboard.writeText(el.textContent ?? "");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="font-mono text-[11px] uppercase tracking-[0.1em] text-secondary/80 border border-secondary/30 rounded-full px-3 py-1.5 hover:bg-secondary/10 transition-colors duration-200"
    >
      Kopiuj do schowka
    </button>
  );
}
