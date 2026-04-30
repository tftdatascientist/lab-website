export { IllChinaAI } from "./IllChinaAI";
export { IllEUAI } from "./IllEUAI";
export { IllCyber } from "./IllCyber";
export { IllGoogle } from "./IllGoogle";
export { IllMicrosoft } from "./IllMicrosoft";
export { IllOpenAI } from "./IllOpenAI";
export { IllMeta } from "./IllMeta";
export { IllAnthropic } from "./IllAnthropic";
export { IllFintech } from "./IllFintech";
export { IllAgentic } from "./IllAgentic";
export { IllCollab } from "./IllCollab";
export { IllFreeTools } from "./IllFreeTools";
export { IllStartup } from "./IllStartup";
export { IllProblems } from "./IllProblems";

import { IllChinaAI } from "./IllChinaAI";
import { IllEUAI } from "./IllEUAI";
import { IllCyber } from "./IllCyber";
import { IllGoogle } from "./IllGoogle";
import { IllMicrosoft } from "./IllMicrosoft";
import { IllOpenAI } from "./IllOpenAI";
import { IllMeta } from "./IllMeta";
import { IllAnthropic } from "./IllAnthropic";
import { IllFintech } from "./IllFintech";
import { IllAgentic } from "./IllAgentic";
import { IllCollab } from "./IllCollab";
import { IllFreeTools } from "./IllFreeTools";
import { IllStartup } from "./IllStartup";
import { IllProblems } from "./IllProblems";

export const ILLUSTRATIONS = {
  "china-ai": IllChinaAI,
  "eu-ai": IllEUAI,
  cyber: IllCyber,
  google: IllGoogle,
  microsoft: IllMicrosoft,
  openai: IllOpenAI,
  meta: IllMeta,
  anthropic: IllAnthropic,
  fintech: IllFintech,
  agentic: IllAgentic,
  collab: IllCollab,
  "free-tools": IllFreeTools,
  startup: IllStartup,
  problems: IllProblems,
} as const;

export type IllustrationKey = keyof typeof ILLUSTRATIONS;
