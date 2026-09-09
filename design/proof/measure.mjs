// Zrzuty trzech kierunków (1440 + 375) i pomiar udziału podłoży/sygnału na pierwszym ekranie.
// Uruchomienie: PUPPETEER_CORE=<abs ścieżka do node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js> node measure.mjs
//   node "<ścieżka>/lab-website/design/proof/measure.mjs"
// Wynik: design/proof/shots/{A,B,C}-{1440,375}.png + tabela w stdout (bez emoji, cp1250-safe).
import { fileURLToPath, pathToFileURL } from "node:url";
const PUPPETEER = process.env.PUPPETEER_CORE ?? "puppeteer-core";
const puppeteer = (await import(PUPPETEER.startsWith("/") || /^[A-Za-z]:/.test(PUPPETEER) ? pathToFileURL(PUPPETEER).href : PUPPETEER)).default;
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const shots = join(here, "shots");
if (!existsSync(shots)) mkdirSync(shots, { recursive: true });

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => existsSync(p));
if (!CHROME) { console.error("Brak chrome.exe"); process.exit(2); }

const FILES = { A: "A-list-przewozowy.html", B: "B-sciana-tabliczek.html", C: "C-dwa-bieguny.html" };
const VIEWS = [[1440, 900], [375, 812]];

// klasy pikseli: papier (jasny ciepły), plyta (grafit), sygnal (pomaranczowy), inne
function classify(r, g, b) {
  if (r > 200 && g > 195 && b > 180) return "papier";
  if (r < 80 && g < 80 && b < 85) return "plyta";
  if (r > 200 && g < 120 && b < 80) return "sygnal";
  return "inne";
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
const rows = [];
for (const [key, file] of Object.entries(FILES)) {
  for (const [w, h] of VIEWS) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(join(here, file)).href, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    const out = join(shots, `${key}-${w}.png`);
    await page.screenshot({ path: out, fullPage: false });
    const full = join(shots, `${key}-${w}-full.png`);
    await page.screenshot({ path: full, fullPage: true });
    // pomiar: render pierwszego ekranu do canvas przez html2canvas? Nie — czytamy PNG w przegladarce.
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
    rows.push({ kierunek: key, viewport: `${w}x${h}`, ...stats });
  }
}
await browser.close();
console.log("Udzial powierzchni pierwszego ekranu [%] (CHCE 2: papier>=40, plyta>=20; CHCE 3: sygnal<=10)");
console.table(rows);
const fails = rows.filter((r) => r.papier < 40 || r.plyta < 20 || r.sygnal > 10);
console.log(fails.length ? `NIE SPELNIA: ${fails.map((f) => f.kierunek + "@" + f.viewport).join(", ")}` : "Wszystkie kierunki spelniaja CHCE 2 i 3.");
