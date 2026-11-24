// The 3 AM Commit Message — make.fun bounty
// u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e
//
// Writes one commit message to /output/entry.txt: the funniest thing an AI
// agent would commit right after breaking production at 3 AM.
//
// Deterministic, no network, no dependencies. The message is a fixed string;
// the program only validates it against the gate (UTF-8, 1-200 characters,
// single line, not only whitespace, no leading/trailing whitespace, no
// control characters) and writes it out. The output directory comes from
// MAKEFUN_OUTPUT_DIR when set, otherwise ./output (the grader mounts /output).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "fix: reverted the 3 AM deploy; it passed every test because I wrote the tests, and prod disagrees";

function validate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.trim() !== text) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  for (const ch of text) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("entry must not contain control characters");
    }
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
validate(ENTRY);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${[...ENTRY].length} chars)`);
