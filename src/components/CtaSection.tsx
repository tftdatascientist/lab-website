import { Mail } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section id="kontakt" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main CTA */}
        <div className="md:col-span-2 bg-surface-container rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] -mr-32 -mt-32" />
          <h3 className="text-2xl md:text-3xl font-bold font-heading mb-6 max-w-md relative z-10">
            Gotowy na transformację cyfrową?
          </h3>
          <p className="text-on-surface-variant mb-10 max-w-sm relative z-10">
            Darmowa konsultacja techniczna pozwoli nam określić potencjał
            automatyzacji w&nbsp;Twoim zespole.
          </p>
          <Link
            href="/kontakt"
            className="relative z-10 inline-flex px-8 py-3 bg-on-surface text-background font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            Zarezerwuj termin
          </Link>
        </div>

        {/* Newsletter */}
        <div className="bg-surface-container-high rounded-3xl p-8 md:p-12 flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 rounded-full obsidian-gradient flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-on-primary" />
          </div>
          <h4 className="text-xl font-bold font-heading mb-2">Newsletter AI</h4>
          <p className="text-sm text-on-surface-variant mb-6">
            Co tydzień świeże case study.
          </p>
          <div className="w-full relative">
            <input
              className="w-full bg-surface-lowest ghost-border rounded-lg py-3 px-4 text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
              placeholder="Email..."
              type="email"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
