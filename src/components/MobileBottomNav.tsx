"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Puzzle, Briefcase, Mail } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Puzzle, label: "Usługi", href: "/uslugi" },
  { icon: Briefcase, label: "Portfolio", href: "/portfolio" },
  { icon: Mail, label: "Kontakt", href: "/kontakt" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-outline-variant/10 z-50">
        <div className="flex justify-around items-center py-3">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center gap-1 ${
                  isActive ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Padding for bottom nav */}
      <div className="h-16 md:hidden" />
    </>
  );
}
