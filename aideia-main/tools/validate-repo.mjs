#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const errors = [];

function fail(message) { errors.push(message); }
function read(rel) { return fs.readFileSync(path.join(root, rel), "utf8"); }

try {
  JSON.parse(read("schemas/aideia.project.schema.json"));
} catch (error) {
  fail("Invalid schemas/aideia.project.schema.json: " + error.message);
}

try {
  JSON.parse(read("templates/aideia.project.example.json"));
} catch (error) {
  fail("Invalid templates/aideia.project.example.json: " + error.message);
}

const skillsRoot = path.join(root, ".agents", "skills");
const names = new Map();

for (const entry of fs.readdirSync(skillsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const rel = path.join(".agents", "skills", entry.name, "SKILL.md");
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    fail("Missing SKILL.md in " + entry.name);
    continue;
  }
  const content = fs.readFileSync(full, "utf8");
  const name = content.match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = content.match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (!content.startsWith("---\n")) fail(rel + " must start with YAML front matter");
  if (!name) fail(rel + " is missing name");
  if (!description) fail(rel + " is missing description");
  if (name) {
    if (names.has(name)) fail("Duplicate skill name " + name + " in " + rel + " and " + names.get(name));
    names.set(name, rel);
  }
}

const requiredSecurityFiles = [
  "rules/SECURITY.md",
  ".agents/skills/security-review/SKILL.md",
  "docs/SECURITY_BASELINE.md",
  "templates/SECURITY_REVIEW.template.md",
  "tools/security-audit.mjs"
];

for (const rel of requiredSecurityFiles) {
  if (!fs.existsSync(path.join(root, rel))) fail("Missing required security file " + rel);
}

const agentsContent = read("AGENTS.md");
if (!agentsContent.includes("rules/SECURITY.md")) fail("AGENTS.md must reference rules/SECURITY.md");
if (!agentsContent.includes("security-review")) fail("AGENTS.md must reference the security-review skill");

const agentsBytes = Buffer.byteLength(agentsContent, "utf8");
if (agentsBytes > 12000) fail("AGENTS.md is too large (" + agentsBytes + " bytes); keep root guidance concise.");

if (errors.length) {
  console.error("aideia validation failed:\n");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log("aideia validation passed");
console.log("- " + names.size + " focused skills");
console.log("- security baseline: present");
console.log("- AGENTS.md: " + agentsBytes + " bytes");
