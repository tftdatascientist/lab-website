import Link from "next/link";
import Tabliczka from "@/components/sciana/Tabliczka";
import Miejsce from "@/components/sciana/Miejsce";
import WierszeAB from "@/components/sciana/WierszeAB";
import KomputerLokalny from "@/components/sciana/KomputerLokalny";
import CtaPole from "@/components/sciana/CtaPole";
import { services } from "@/content/services";
import { getCategories, getNodesByCategory, totalNodeCount } from "@/lib/procesy";
import { getAllTerms } from "@/lib/slownik";
import { getAllPosts } from "@/lib/mdx";

/**
 * Strona główna = ściana tabliczek (DESIGN.md §Siatka). Każda liczba na ścianie jest
 * policzona z treści serwisu przy buildzie (dewiacja #4) — żadnych liczników z głowy.
 * Warstwa brandowa bez nazw narzędzi i bez emoji (NIE CHCĘ, warstwa 1–2): z usług
 * wychodzi tylko `title` + `desc`, nigdy `tags` / `icon` / `longDesc`.
 */

/** Gdzie działa dana usługa — prawa kolumna „Co wdrażamy” (zamiast nazw narzędzi). */
const WHERE: Record<string, string> = {
  "automatyzacja-n8n": "u klienta",
  "chatboty-ai": "www",
  "agenci-glosowi": "telefon",
  "bazy-wiedzy-rag": "lokalnie",
  "dashboardy-raporty": "co rano",
  "integracje-systemow": "CRM · ERP",
};

function mmdd(date: string) {
  return date.slice(5, 10);
}

export default function Home() {
  const posts = getAllPosts();
  const latest = posts.slice(0, 6);
  const postCount = posts.length;
  const nodeCount = totalNodeCount();
  const termCount = getAllTerms().length;
  const categories = getCategories().map((c) => ({ ...c, count: getNodesByCategory(c.slug).length }));
  const stamp = posts[0]?.frontmatter.date.slice(0, 7) ?? "";
  const routes = [
    { from: "Grudziądz", to: "Region", href: "/o-nas" },
    { from: "Sprawdzona technologia", to: "Prosta rzecz", href: "/wdrozenia" },
    { from: "Procesy w firmie", to: `${nodeCount} w bazie`, href: "/procesy" },
    { from: "Trudne pojęcia", to: `${termCount} haseł`, href: "/slownik" },
    { from: "Świat AI", to: "Przegląd dnia", href: "/blog" },
  ];

  return (
    <>
      <Tabliczka
        nr="01"
        title="Lokalna Automatyzacja Biznesu"
        right={stamp}
        footer="Audyt > Projekt > Wdrożenie > Wsparcie"
        className="s-hero"
      >
        <h1 className="display">Twoja firma. Mądrzejsza o AI.</h1>
        <p>
          Wdrażamy chatboty, agentów głosowych i integracje procesów dla małych i średnich firm z regionu
          kujawsko-pomorskiego.
        </p>
      </Tabliczka>

      <Miejsce nr="02" />

      <Tabliczka nr="03" title="Skąd > dokąd" right={routes.length} footer="/procesy · /slownik · /blog" className="s-routes">
        <WierszeAB rows={routes} />
      </Tabliczka>

      <Tabliczka nr="04" title="Komputer lokalny" right="u klienta" footer="Rys. 1" className="s-device">
        <KomputerLokalny />
        <p className="cap">
          Sprzedawany razem ze sprzętem. Proste automatyzacje na lokalnym komputerze i lokalnych modelach.
        </p>
      </Tabliczka>

      <CtaPole />

      <Tabliczka
        nr="05"
        title="Co wdrażamy"
        right={services.length}
        footer="Technologia jest środkiem"
        className="s-services"
      >
        <ul className="rows">
          {services.map((s, i) => (
            <li key={s.slug}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">
                <Link href={`/wdrozenia/${s.slug}`}>{s.title}</Link>
                <span className="d">{s.desc}</span>
              </span>
              <span className="v">{WHERE[s.slug] ?? ""}</span>
            </li>
          ))}
        </ul>
      </Tabliczka>

      <Tabliczka
        nr="06"
        title="Baza procesów APQC PCF"
        right={nodeCount}
        footer="Źródło: APQC PCF 7.4, tłum. własne"
        className="s-pcf"
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Kod</th>
              <th scope="col">Kategoria</th>
              <th scope="col" style={{ textAlign: "right" }}>
                Węzłów
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.slug}>
                <td className="c">{c.code}</td>
                <td>
                  <Link href={`/procesy/${c.slug}`}>{c.namePl}</Link>
                </td>
                <td className="k">{c.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tabliczka>

      <Tabliczka
        nr="07"
        title="Przegląd dnia"
        right={`ostatnie ${latest.length} z ${postCount}`}
        footer="Codziennie, ze źródłami"
        plate
        className="s-blog"
      >
        <ul className="rows">
          {latest.map((p) => (
            <li key={p.slug}>
              <span className="n">{mmdd(p.frontmatter.date)}</span>
              <span className="t">
                <Link href={`/blog/${p.slug}`}>{p.frontmatter.title}</Link>
              </span>
              <span className="v">{p.frontmatter.readTime}</span>
            </li>
          ))}
        </ul>
      </Tabliczka>
    </>
  );
}
