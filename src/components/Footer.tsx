import Link from "next/link";
import Logo from "./Logo";

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
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
];

const linkCols = [
  { title: "Produkt", links: productLinks },
  { title: "Zasoby", links: resourceLinks },
  { title: "Firma", links: companyLinks },
];

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{ background: "#0b0c0e", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size={34} showTagline={false} />
            <p className="text-sm text-text-dim max-w-[300px] leading-relaxed mt-3">
              Automatyzujemy procesy biznesowe dla lokalnych firm z regionu kujawsko-pomorskiego.
            </p>
          </div>

          {/* Link columns */}
          {linkCols.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <span
                className="font-mono text-[11px] uppercase text-amber"
                style={{ letterSpacing: "0.12em" }}
              >
                {col.title}
              </span>
              {col.links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-[13px] text-text-dim hover:text-text transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-6 px-8"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-mute">
            &copy; 2026 lok-ai — Lokalna Automatyzacja Biznesu
          </p>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)", outline: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#d9b88a", animation: "lokai-pulse 2s ease-in-out infinite" }}
            />
            <span
              className="font-mono text-[11px] uppercase"
              style={{ color: "#d9b88a", letterSpacing: "0.08em" }}
            >
              Wszystkie systemy działają
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
