// e2e: paleta wyszukiwania na /procesy i /slownik — przycisk „Szukaj · ⌘K" w nagłówku tabliczki
// oraz skrót Ctrl+K otwierają [cmdk-dialog]; wpisanie zapytania daje trafienia; Esc zamyka.
//   PUPPETEER_CORE=<abs> BASE=http://localhost:3301 node scripts/e2e-paleta.mjs
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";

const PUPPETEER = process.env.PUPPETEER_CORE ?? "puppeteer-core";
const puppeteer = (await import(/^[A-Za-z]:|^\//.test(PUPPETEER) ? pathToFileURL(PUPPETEER).href : PUPPETEER)).default;
const BASE = process.env.BASE ?? "http://localhost:3301";
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find((p) => existsSync(p));

const CASES = [
  { path: "/procesy", query: "8.2.1", expect: /8\.2\.1/ },
  { path: "/slownik", query: "kalibracja", expect: /kalibracja/i },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
let fails = 0;
const check = (ok, msg) => { console.log((ok ? "OK   " : "FAIL ") + msg); if (!ok) fails++; };
const isOpen = () => page.evaluate(() => !!document.querySelector("[cmdk-dialog]"));

for (const c of CASES) {
  await page.goto(BASE + c.path, { waitUntil: "networkidle0", timeout: 90000 });
  check(!(await isOpen()), `${c.path}: paleta zamknieta na starcie`);
  await page.click(".search-btn");
  await page.waitForSelector("[cmdk-dialog]", { timeout: 5000 }).catch(() => {});
  check(await isOpen(), `${c.path}: przycisk Szukaj otwiera palete`);
  await page.type("[cmdk-input]", c.query);
  await page.waitForFunction((re) => new RegExp(re, "i").test(document.querySelector("[cmdk-list]")?.textContent ?? ""), { timeout: 8000 }, c.expect.source).catch(() => {});
  const listText = await page.evaluate(() => document.querySelector("[cmdk-list]")?.textContent ?? "");
  check(c.expect.test(listText), `${c.path}: zapytanie „${c.query}" daje trafienia`);
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 300));
  check(!(await isOpen()), `${c.path}: Esc zamyka`);
  await page.keyboard.down("Control");
  await page.keyboard.press("k");
  await page.keyboard.up("Control");
  await page.waitForSelector("[cmdk-dialog]", { timeout: 5000 }).catch(() => {});
  check(await isOpen(), `${c.path}: Ctrl+K otwiera`);
  const noBlur = await page.evaluate(() => {
    const veil = document.querySelector(".palette .veil");
    return veil ? getComputedStyle(veil).backdropFilter === "none" : false;
  });
  check(noBlur, `${c.path}: zaslona bez rozmycia (backdrop-filter: none)`);
  await page.keyboard.press("Escape");
}
await browser.close();
console.log(fails ? `NIE SPELNIA: ${fails}` : "Paleta: wszystko OK");
process.exit(fails ? 1 : 0);
