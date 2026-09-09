// Zrzuty i pomiar podłoży NA ŻYWYM serwerze (ETAP2), tym samym algorytmem co design/proof/measure.mjs.
// Uruchomienie (z katalogu repo):
//   PUPPETEER_CORE=<abs ścieżka do puppeteer-core.js> BASE=http://localhost:3301 node scripts/shots-live.mjs [/sciezka ...]
// Wynik: design/proof/shots/live/<nazwa>-{1440,375}.png + tabela w stdout (bez emoji, cp1250-safe).
import { fileURLToPath, pathToFileURL } from "node:url";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const PUPPETEER = process.env.PUPPETEER_CORE ?? "puppeteer-core";
const puppeteer = (await import(/^[A-Za-z]:|^\//.test(PUPPETEER) ? pathToFileURL(PUPPETEER).href : PUPPETEER)).default;

const BASE = process.env.BASE ?? "http://localhost:3301";
const here = dirname(fileURLToPath(import.meta.url));
const shots = join(here, "..", "design", "proof", "shots", "live");
if (!existsSync(shots)) mkdirSync(shots, { recursive: true });

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => existsSync(p));
if (!CHROME) { console.error("Brak chrome.exe"); process.exit(2); }

const PATHS = process.argv.slice(2).length ? process.argv.slice(2) : ["/"];
const VIEWS = [[1440, 900], [375, 812]];
const nameOf = (p) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-").slice(0, 40));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
const rows = [];
let errors = 0;
page.on("pageerror", (e) => { errors++; console.log("PAGEERROR @", page.url(), ":", String(e).slice(0, 200)); });
for (const p of PATHS) {
  for (const [w, h] of VIEWS) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    const res = await page.goto(BASE + p, { waitUntil: "networkidle0", timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    const status = res?.status();
    const overlay = await page.evaluate(() => !!document.querySelector("nextjs-portal"));
    await page.screenshot({ path: join(shots, `${nameOf(p)}-${w}.png`), fullPage: false });
    try { await page.screenshot({ path: join(shots, `${nameOf(p)}-${w}-full.png`), fullPage: true }); } catch { /* strony bardzo dlugie (slownik): pelny zrzut pomijany */ }
    const b64 = await page.screenshot({ encoding: "base64", fullPage: false });
    const stats = await page.evaluate(async (b64, w, h) => {
      const img = new Image();
      img.src = "data:image/png;base64," + b64;
      await img.decode();
      const c = document.createElement("canvas"); c.width = w; c.height = h;
      const ctx = c.getContext("2d"); ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, w, h).data;
      const n = { papier: 0, plyta: 0, sygnal: 0, inne: 0 };
      const cls = (r, g, b) => (r > 200 && g > 195 && b > 180) ? "papier" : (r < 80 && g < 80 && b < 85) ? "plyta" : (r > 200 && g < 120 && b < 80) ? "sygnal" : "inne";
      for (let i = 0; i < d.length; i += 4) n[cls(d[i], d[i + 1], d[i + 2])]++;
      const tot = w * h;
      return Object.fromEntries(Object.entries(n).map(([k, v]) => [k, +(100 * v / tot).toFixed(1)]));
    }, b64, w, h);
    const fonts = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const body = getComputedStyle(document.body).fontFamily;
      return { h1: h1 ? getComputedStyle(h1).fontFamily.slice(0, 40) : "-", body: body.slice(0, 40) };
    });
    rows.push({ path: p, viewport: `${w}x${h}`, status, overlay, ...stats, h1font: fonts.h1 });
  }
}
await browser.close();
console.log("Udzial powierzchni pierwszego ekranu [%] (CHCE 2: papier>=40, plyta>=20; CHCE 3: sygnal<=10)");
console.table(rows);
const fails = rows.filter((r) => r.status !== 200 || r.overlay || r.sygnal > 10);
console.log(fails.length ? `NIE SPELNIA: ${fails.map((f) => f.path + "@" + f.viewport).join(", ")}` : "OK: wszystkie strony 200, bez overlay, sygnal <= 10 %.");
console.log(`bledy JS na stronach: ${errors}`);
process.exit(fails.length || errors ? 1 : 0);
