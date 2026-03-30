import Link from "next/link";

const uslugiLinks = [
  { label: "Automatyzacja procesów", href: "/uslugi/automatyzacja-n8n" },
  { label: "Chatboty AI", href: "/uslugi/chatboty-ai" },
  { label: "Agenci głosowi", href: "/uslugi/agenci-glosowi" },
  { label: "Bazy wiedzy RAG", href: "/uslugi/bazy-wiedzy-rag" },
  { label: "Dashboardy i raporty", href: "/uslugi/dashboardy-raporty" },
  { label: "Integracje systemów", href: "/uslugi/integracje-systemow" },
];

const wiedzaLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Dziennik AI", href: "/dziennik" },
  { label: "FAQ", href: "/#faq" },
  { label: "Technologie", href: "/#technologie" },
  { label: "Demo AI", href: "/#demo" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan to-blue-600 flex items-center justify-center font-heading font-bold text-sm text-white tracking-tight shrink-0">
                LAB
              </div>
              <span className="font-heading font-semibold text-text-primary">
                LAB
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Lokalna Automatyzacja Biznesu — wdrażamy chatboty AI, automatyzacje
              procesów i integracje systemów dla MŚP z&nbsp;Pomorza i&nbsp;Kujaw.
            </p>
            <p className="mt-4 text-xs text-text-muted">
              Grudziądz, kujawsko-pomorskie
            </p>
          </div>

          {/* Usługi */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-text-primary mb-4">
              Usługi
            </h3>
            <ul className="space-y-2.5">
              {uslugiLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wiedza */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-text-primary mb-4">
              Wiedza
            </h3>
            <ul className="space-y-2.5">
              {wiedzaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-text-primary mb-4">
              Kontakt
            </h3>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <a
                  href="mailto:kontakt@lab-ai.pl"
                  className="hover:text-cyan transition-colors"
                >
                  kontakt@lab-ai.pl
                </a>
              </li>
              <li>
                <a
                  href="tel:+48000000000"
                  className="hover:text-cyan transition-colors"
                >
                  +48 000 000 000
                </a>
              </li>
              <li>Grudziądz, kujawsko-pomorskie</li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <span>&copy; 2026 LAB — Lokalna Automatyzacja Biznesu</span>
          <div className="flex gap-4">
            <Link
              href="/polityka-prywatnosci"
              className="hover:text-text-secondary transition-colors"
            >
              Polityka prywatności
            </Link>
            <Link
              href="/regulamin"
              className="hover:text-text-secondary transition-colors"
            >
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
