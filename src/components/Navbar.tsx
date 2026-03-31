"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Usługi", href: "/uslugi" },
  { label: "Technologie", href: "/technologie" },
  { label: "Demo AI", href: "/demo" },
  { label: "Blog", href: "/blog" },
  { label: "Dziennik", href: "/dziennik" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flex items-center justify-between px-6 md:px-10 h-16 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-on-surface font-heading"
        >
          LAB
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="tracking-tight text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/kontakt"
            className="hidden md:inline-flex px-5 py-2 obsidian-gradient text-on-primary font-bold text-sm rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 active:opacity-80"
          >
            Bezpłatna konsultacja
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={isOpen}
          >
            <span className="sr-only">Menu</span>
            <div className="w-5 flex flex-col gap-[5px]">
              <span
                className={`block h-[2px] bg-current transition-all duration-300 origin-center ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] bg-current transition-all duration-300 origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 pt-2 space-y-1 border-t border-outline-variant/15">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            onClick={() => setIsOpen(false)}
            className="block mt-3 text-center px-4 py-2.5 text-sm font-bold text-on-primary obsidian-gradient rounded-lg"
          >
            Bezpłatna konsultacja
          </Link>
        </div>
      </div>
    </nav>
  );
}
