"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Technologie", href: "#technologie" },
  { label: "Demo AI", href: "#demo" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-deep/85 backdrop-blur-lg border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan to-blue-600 flex items-center justify-center font-heading font-bold text-sm text-white tracking-tight shrink-0">
              LAB
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-semibold text-text-primary text-base leading-none block">
                LAB
              </span>
              <span className="text-text-muted text-[11px] leading-none block mt-0.5">
                Lokalna Automatyzacja Biznesu
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#kontakt"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan to-blue-500 rounded-full hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-shadow"
            >
              Bezpłatna konsultacja
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
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
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 border-t border-white/[0.06]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.03] rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setIsOpen(false)}
            className="block mt-3 text-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan to-blue-500 rounded-full"
          >
            Bezpłatna konsultacja
          </a>
        </div>
      </div>
    </nav>
  );
}
