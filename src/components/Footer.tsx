import Link from "next/link";

const legalLinks = [
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { label: "Regulamin", href: "/regulamin" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Dziennik AI", href: "/dziennik" },
  { label: "FAQ", href: "/faq" },
  { label: "Demo AI", href: "/demo" },
  { label: "Technologie", href: "/technologie" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-background w-full py-16 md:py-20 px-6 md:px-10 border-t border-outline-variant/15">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="space-y-6">
          <div className="text-lg font-black font-heading text-on-surface">
            LAB
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-outline max-w-xs">
            &copy; 2026 LAB &mdash; Lokalna Automatyzacja Biznesu.
            Grudziądz, kujawsko-pomorskie.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              Prawne
            </span>
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-widest text-outline hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              Zasoby
            </span>
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-widest text-outline hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              Social
            </span>
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-widest text-outline hover:text-secondary transition-colors"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
