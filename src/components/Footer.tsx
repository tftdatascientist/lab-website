import Link from "next/link";

const productLinks = [
  { label: "Usługi", href: "/uslugi" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQ", href: "/faq" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Technologia", href: "/technologia" },
  { label: "Kontakt", href: "/kontakt" },
];

const companyLinks = [
  { label: "O nas", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Privacy Policy", href: "/polityka-prywatnosci" },
];

export default function Footer() {
  return (
    <footer className="bg-background w-full border-t border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-lg font-black font-heading text-on-surface">
              lok-ai
            </div>
            <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
              Budujemy przyszłość automatyzacji AI dla nowej ery cyfrowej.
              Wspieramy lokalne biznesy w transformacji.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                Produkt
              </span>
              {productLinks.map((link) => (
                <Link
                  key={link.href + link.label}
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
                  key={link.href + link.label}
                  href={link.href}
                  className="font-mono text-[10px] uppercase tracking-widest text-outline hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                Firma
              </span>
              {companyLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="font-mono text-[10px] uppercase tracking-widest text-outline hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Status Bar */}
      <div className="border-t border-outline-variant/10 py-6 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-outline">
            &copy; 2026 lok-ai — Lokalna Automatyzacja Biznesu
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              System Status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
