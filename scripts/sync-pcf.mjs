#!/usr/bin/env node
/**
 * sync-pcf.mjs — synchronizacja taksonomii APQC PCF 7.4 (PL) z Notion → src/content/procesy.json
 *
 * Wymaga:
 *   1. npm i -D @notionhq/client
 *   2. Internal integration w Notion z dostępem do bazy "PCF 7.4 pl"
 *      (Notion → baza → ⋯ → Connections → dodaj integrację)
 *   3. Zmienne środowiskowe:
 *        NOTION_TOKEN=secret_xxx
 *        PCF_DATA_SOURCE_ID=2a694cf5-6a52-81e7-8e47-000bcc9c2417   (opcjonalne — domyślne poniżej)
 *
 * Użycie:  NOTION_TOKEN=... node scripts/sync-pcf.mjs
 *
 * Skrypt zachowuje ręcznie zdefiniowane `categories` w procesy.json i nadpisuje tylko `nodes`
 * (poziomy: Grupa procesów / Proces / Działanie / Zadanie) oraz `syncedAt`.
 */
import fs from "node:fs";
import path from "node:path";
import { Client } from "@notionhq/client";

const TOKEN = process.env.NOTION_TOKEN;
const DATA_SOURCE_ID = process.env.PCF_DATA_SOURCE_ID || "2a694cf5-6a52-81e7-8e47-000bcc9c2417";
const OUT = path.join(process.cwd(), "src/content/procesy.json");

if (!TOKEN) {
  console.error("Brak NOTION_TOKEN. Ustaw zmienną środowiskową i spróbuj ponownie.");
  process.exit(1);
}

const notion = new Client({ auth: TOKEN });

// mapowanie nazwy kategorii Notion → slug (musi pokrywać się z categories w procesy.json)
const CATEGORY_SLUG = {
  "1. Strategia i misja": "strategia-i-misja",
  "2. Ptodukty i usługi": "produkty-i-uslugi", // literówka w źródle Notion
  "2. Produkty i usługi": "produkty-i-uslugi",
  "3. Sprzedaż i marketing": "sprzedaz-i-marketing",
  "4. Łańcuch dostaw": "lancuch-dostaw",
  "5. Dostarczanie usług": "dostarczanie-uslug",
  "6. Obsługa klienta": "obsluga-klienta",
  "7. Kadry i zasoby ludzkie": "kadry-i-zasoby-ludzkie",
  "8. Technologie informacyjne": "technologie-informacyjne",
  "9. Finanse i rachunkowość": "finanse-i-rachunkowosc",
  "10.Obsługa aktywów": "obsluga-aktywow",
  "10. Obsługa aktywów": "obsluga-aktywow",
  "11. Zarządzanie ryzykiem": "zarzadzanie-ryzykiem",
  "12. Relacje zewnętrzne": "relacje-zewnetrzne",
  "13. Teoria Zarządzania": "teoria-zarzadzania",
};

const txt = (prop) => {
  if (!prop) return "";
  if (prop.type === "title") return prop.title.map((t) => t.plain_text).join("");
  if (prop.type === "rich_text") return prop.rich_text.map((t) => t.plain_text).join("");
  if (prop.type === "select") return prop.select?.name ?? "";
  if (prop.type === "number") return prop.number ?? "";
  return "";
};

async function queryAll() {
  const rows = [];
  let cursor;
  do {
    const res = await notion.dataSources.query({
      data_source_id: DATA_SOURCE_ID,
      start_cursor: cursor,
      page_size: 100,
    });
    rows.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return rows;
}

async function main() {
  console.log(`Pobieram PCF z data source ${DATA_SOURCE_ID}…`);
  const rows = await queryAll();
  console.log(`Pobrano ${rows.length} wierszy.`);

  // mapa page.id → code (dla rozwiązania relacji Parent item → parentCode)
  const idToCode = new Map();
  for (const r of rows) idToCode.set(r.id, txt(r.properties.code1));

  const nodes = [];
  for (const r of rows) {
    const p = r.properties;
    const level = txt(p.level);
    if (!level || level === "Kategoria") continue; // kategorie trzymamy ręcznie
    const categoryName = txt(p.category);
    const categorySlug = CATEGORY_SLUG[categoryName];
    if (!categorySlug) continue;
    const parentRel = p["Parent item"];
    const parentId = parentRel?.type === "relation" ? parentRel.relation[0]?.id : null;
    nodes.push({
      code: txt(p.code1),
      level,
      categorySlug,
      parentCode: parentId ? idToCode.get(parentId) ?? null : null,
      namePl: txt(p.name_pl),
      nameEng: txt(p.name_eng) || undefined,
      descPl: txt(p.desc_pl) || undefined,
      descEng: txt(p.desc_eng) || undefined,
    });
  }

  const existing = JSON.parse(fs.readFileSync(OUT, "utf-8"));
  existing.nodes = nodes;
  existing.syncedAt = new Date().toISOString();
  fs.writeFileSync(OUT, JSON.stringify(existing, null, 2) + "\n", "utf-8");
  console.log(`Zapisano ${nodes.length} węzłów do ${OUT}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
