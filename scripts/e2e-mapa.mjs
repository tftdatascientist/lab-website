// e2e: mapa Grudziądza na stronie głównej (tabliczka 01) — pętla idzie, sygnał w najgorszej klatce
// (celownik, 2.4–4.5 s) mieści się w 10 %, poza ekranem pętla stoi, prefers-reduced-motion = jedna klatka.
//   PUPPETEER_CORE=<abs> BASE=http://localhost:3301 node scripts/e2e-mapa.mjs
import { pathToFileURL } from "node:url";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const PUPPETEER = process.env.PUPPETEER_CORE ?? "puppeteer-core";
const puppeteer = (await import(/^[A-Za-z]:|^\//.test(PUPPETEER) ? pathToFileURL(PUPPETEER).href : PUPPETEER)).default;
const BASE = process.env.BASE ?? "http://localhost:3301";
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find((p) => existsSync(p));
const shots = join(process.cwd(), "design", "proof", "shots", "live");
mkdirSync(shots, { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
let fails = 0;
let errors = 0;
page.on("pageerror", (e) => { errors++; console.log("PAGEERROR:", String(e).slice(0, 200)); });
const check = (ok, msg) => { console.log((ok ? "OK   " : "FAIL ") + msg); if (!ok) fails++; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const readT = () => page.evaluate(() => parseFloat(document.querySelector(".mapa")?.getAttribute("data-t") ?? "-1"));

async function signalShare(w, h) {
  const b64 = await page.screenshot({ encoding: "base64", fullPage: false });
  return page.evaluate(async (b64, w, h) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const ctx = c.getContext("2d"); ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, w, h).data;
    let s = 0;
    for (let i = 0; i < d.length; i += 4) if (d[i] > 200 && d[i + 1] < 120 && d[i + 2] < 80) s++;
    return +(100 * s / (w * h)).toFixed(2);
  }, b64, w, h);
}

// 1. pętla idzie, najgorsza klatka
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 90000 });
await page.waitForSelector(".mapa svg", { timeout: 15000 }).catch(() => {});
check(await page.evaluate(() => !!document.querySelector(".mapa svg")), "mapa: SVG wyrenderowany po stronie klienta");
const t0 = await readT();
await sleep(700);
const t1 = await readT();
check(t1 !== t0, `mapa: pętla idzie (t ${t0} -> ${t1})`);

// czekamy na okno celownika (2.4–4.5 s pętli) i mierzymy sygnał w tej klatce
for (let i = 0; i < 60; i++) { const t = await readT(); if (t >= 3.0 && t <= 3.6) break; await sleep(100); }
const tPeak = await readT();
const share = await signalShare(1440, 900);
await page.screenshot({ path: join(shots, "home-mapa-celownik-1440.png"), fullPage: false });
check(share <= 10, `mapa: sygnał w klatce celownika (t=${tPeak}) = ${share} % (limit 10)`);

// końcowa klatka: koło i miasto
for (let i = 0; i < 80; i++) { const t = await readT(); if (t >= 6.4 && t <= 7.2) break; await sleep(100); }
await page.screenshot({ path: join(shots, "home-mapa-kolo-1440.png"), fullPage: false });
const share2 = await signalShare(1440, 900);
check(share2 <= 10, `mapa: sygnał w klatce koła (t=${await readT()}) = ${share2} %`);

// 2. poza ekranem pętla stoi
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await sleep(400);
const a = await readT();
await sleep(800);
const b = await readT();
check(a === b, `mapa: poza ekranem klatka stoi (t ${a} == ${b})`);
await page.evaluate(() => window.scrollTo(0, 0));
await sleep(600);
check((await readT()) !== b, "mapa: po powrocie na ekran pętla rusza");

// 3. prefers-reduced-motion: jedna klatka
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 90000 });
await page.waitForSelector(".mapa svg", { timeout: 15000 }).catch(() => {});
const r0 = await readT();
await sleep(1000);
const r1 = await readT();
check(r0 === 6.5 && r1 === 6.5, `mapa: reduced-motion = stała klatka 6.50 (odczyt ${r0} / ${r1})`);
check(await page.evaluate(() => !!document.querySelector(".mapa svg")), "mapa: reduced-motion pokazuje koło (SVG jest)");
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);

// 4. telefon: mapa na całą szerokość, hero pod nią
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 90000 });
await page.waitForSelector(".mapa svg", { timeout: 15000 }).catch(() => {});
const m = await page.evaluate(() => {
  const mapa = document.querySelector(".s-mapa")?.getBoundingClientRect();
  const hero = document.querySelector(".s-hero")?.getBoundingClientRect();
  return { mw: Math.round(mapa?.width ?? 0), heroTop: Math.round(hero?.top ?? 0), mapBottom: Math.round(mapa?.bottom ?? 0), sw: document.documentElement.scrollWidth };
});
check(m.mw > 300 && m.heroTop >= m.mapBottom && m.sw <= 375, `telefon: mapa ${m.mw} px szer., hero pod mapą, bez poziomego przewijania (scrollWidth ${m.sw})`);
await page.screenshot({ path: join(shots, "home-mapa-375.png"), fullPage: false });

await browser.close();
console.log(`bledy JS: ${errors}`);
console.log(fails || errors ? `NIE SPELNIA: ${fails}` : "Mapa: wszystko OK");
process.exit(fails || errors ? 1 : 0);
