import type { IllustrationKey } from "@/components/news-illustrations";

export const TAG_TO_ILLUSTRATION: Record<string, IllustrationKey> = {
  "BIG TECH": "google",
  REGULACJE: "eu-ai",
  "BEZPIECZEŃSTWO": "cyber",
  FINTECH: "fintech",
  AUTOMATYZACJA: "agentic",
  TRENDY: "collab",
  "NARZĘDZIA": "free-tools",
  STARTUPY: "startup",
  ANALIZA: "problems",
  "POLSKA SCENA": "eu-ai",
  "NOWE PRODUKTY": "startup",
  "AI DLA BIZNESU": "free-tools",
};

const TITLE_OVERRIDES: Array<[RegExp, IllustrationKey]> = [
  [/\b(google|gemini|deepmind|workspace)\b/i, "google"],
  [/\b(microsoft|azure|copilot|365)\b/i, "microsoft"],
  [/\b(openai|gpt|chatgpt|sora)\b/i, "openai"],
  [/\b(meta|llama|facebook|whatsapp)\b/i, "meta"],
  [/\b(anthropic|claude)\b/i, "anthropic"],
  [/\b(deepseek|baidu|china|chiny|alibaba)\b/i, "china-ai"],
];

export function pickIllustration(tag: string, title: string): IllustrationKey {
  for (const [rx, key] of TITLE_OVERRIDES) {
    if (rx.test(title)) return key;
  }
  return TAG_TO_ILLUSTRATION[tag.toUpperCase()] ?? "google";
}

export const ILLUSTRATION_ACCENT: Record<IllustrationKey, "amber" | "coral"> = {
  "china-ai": "coral",
  "eu-ai": "amber",
  cyber: "coral",
  google: "amber",
  microsoft: "amber",
  openai: "amber",
  meta: "amber",
  anthropic: "coral",
  fintech: "amber",
  agentic: "amber",
  collab: "coral",
  "free-tools": "amber",
  startup: "coral",
  problems: "coral",
};
