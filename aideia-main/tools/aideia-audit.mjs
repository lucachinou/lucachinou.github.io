#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const rootArg = args.find((a) => !a.startsWith("--")) || ".";
const root = path.resolve(rootArg);
const jsonMode = args.includes("--json");
const failHigh = args.includes("--fail-on-high");

const ignored = new Set([".git",".aideia","node_modules","dist","build",".next",".nuxt",".svelte-kit","coverage","storybook-static","vendor","target"]);
const extensions = new Set([".ts",".tsx",".js",".jsx",".vue",".svelte",".html",".css",".scss",".sass",".less",".mdx"]);
const findings = [];

function add(file, severity, category, message, evidence) {
  findings.push({ file: path.relative(root, file), severity, category, message, evidence });
}
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (extensions.has(path.extname(entry.name)) && fs.statSync(full).size < 2000000) out.push(full);
  }
  return out;
}
function count(text, re) { return Array.from(text.matchAll(re)).length; }

const filler = [
  /unlock your potential/gi,
  /everything you need in one place/gi,
  /powerful insights at your fingertips/gi,
  /take your .* to the next level/gi,
  /seamlessly manage/gi,
  /welcome back[,!]?/gi
];

for (const file of walk(root)) {
  const source = fs.readFileSync(file, "utf8");
  if (/lorem ipsum/i.test(source)) add(file,"high","content","Placeholder Lorem Ipsum remains in product source.","lorem ipsum");

  for (const re of filler) {
    const match = source.match(re);
    if (match && match.length) add(file,"high","content","Generic filler/AI-style marketing phrase detected.",match[0]);
  }

  const rounded = count(source, /\brounded-(?:2xl|3xl|full)\b/g);
  if (rounded >= 8) add(file,"medium","visual","Heavy repeated large-radius usage; verify this is local geometry rather than rounded-rectangle autopilot.",String(rounded)+" occurrences");

  const gradients = count(source, /\b(?:bg-gradient|from-\w|via-\w|to-\w)/g);
  const glass = count(source, /\bbackdrop-blur(?:-\w+)?\b/g);
  const glow = count(source, /\bshadow-(?:xl|2xl)\b/g);
  if (gradients >= 5 && (glass >= 2 || glow >= 4)) add(file,"medium","visual","Gradient + glass/glow stack detected; verify each effect is justified by art direction.",gradients+" gradient tokens, "+glass+" blur tokens, "+glow+" large shadows");

  const transitionAll = count(source, /\btransition-all\b/g);
  if (transitionAll >= 4) add(file,"low","motion","Repeated transition-all; prefer explicit animated properties where practical.",String(transitionAll)+" occurrences");

  const anyCount = count(source, /:\s*any\b/g);
  if (anyCount >= 5) add(file,"medium","code","Many explicit any types; verify these are real boundary exceptions rather than type-system escape hatches.",String(anyCount)+" occurrences");

  const emptyCatch = count(source, /catch\s*\([^)]*\)\s*\{\s*\}/g);
  if (emptyCatch) add(file,"high","code","Empty catch block hides failures.",String(emptyCatch)+" occurrence(s)");

  const consoleLogs = count(source, /\bconsole\.log\s*\(/g);
  if (consoleLogs >= 3) add(file,"low","code","Multiple console.log calls; verify they are intentional and not debug leftovers.",String(consoleLogs)+" occurrences");

  const hexes = new Set(source.match(/#[0-9a-fA-F]{6}\b/g) || []);
  if (hexes.size >= 12) add(file,"low","tokens","Many distinct hard-coded hex colors; verify colors should not be semantic tokens.",String(hexes.size)+" unique colors");
}

const summary = {
  scannedRoot: root,
  findingCount: findings.length,
  high: findings.filter((f) => f.severity === "high").length,
  medium: findings.filter((f) => f.severity === "medium").length,
  low: findings.filter((f) => f.severity === "low").length,
  note: "Heuristic smell audit only. A finding is a review prompt, not proof of a defect."
};

if (jsonMode) {
  process.stdout.write(JSON.stringify({ summary, findings }, null, 2) + "\n");
} else {
  console.log("aideia heuristic audit");
  console.log("Root: " + root);
  console.log("Findings: " + summary.findingCount + " (" + summary.high + " high, " + summary.medium + " medium, " + summary.low + " low)");
  console.log("A finding is a review prompt, not proof of a defect.\n");
  for (const f of findings) {
    console.log("[" + f.severity.toUpperCase() + "] " + f.file + " · " + f.category);
    console.log("  " + f.message);
    console.log("  " + f.evidence + "\n");
  }
}
if (failHigh && summary.high > 0) process.exit(1);
