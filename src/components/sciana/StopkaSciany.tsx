import Link from "next/link";

/** Stopka ściany: jeden wiersz mono na płycie, wszystkie ścieżki spoza szyny. */
const LINKS = [
  { label: "Wdrożenia", href: "/wdrozenia" },
  { label: "Procesy", href: "/procesy" },
  { label: "Słownik", href: "/slownik" },
  { label: "Blog", href: "/blog" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQ", href: "/faq" },
  { label: "Cennik", href: "/cennik" },
  { label: "O nas", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { label: "Regulamin", href: "/regulamin" },
];

export default function StopkaSciany() {
  return (
    <footer className="s-foot mono">
      <span>lok-ai · Lokalna Automatyzacja Biznesu · Grudziądz</span>
      <ul>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
