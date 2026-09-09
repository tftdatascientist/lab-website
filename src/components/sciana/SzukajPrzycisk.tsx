"use client";

/**
 * Przycisk „Szukaj · ⌘K” w polu prawym nagłówka tabliczki. Sam nic nie wie o palecie —
 * wysyła zdarzenie `lokai:search`, na które nasłuchuje ProcessSearch / SlownikSearch
 * zamontowany w layoucie sekcji. Dzięki temu pływający przycisk znika ze ściany.
 */
export const SEARCH_EVENT = "lokai:search";

export default function SzukajPrzycisk({ label = "Szukaj" }: { label?: string }) {
  return (
    <button
      type="button"
      className="search-btn"
      onClick={() => window.dispatchEvent(new CustomEvent(SEARCH_EVENT))}
      aria-label={`${label} (Ctrl+K)`}
    >
      {label} · ⌘K
    </button>
  );
}
