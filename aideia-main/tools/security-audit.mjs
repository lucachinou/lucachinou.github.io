#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const json = args.includes("--json");
const failOnHigh = args.includes("--fail-on-high");
const rootArg = args.find((arg) => !arg.startsWith("--")) ?? ".";
const root = path.resolve(rootArg);

const ignoredDirs = new Set([
  ".git", ".aideia", "node_modules", "vendor", "dist", "build", ".next", "out",
  "coverage", "target", ".turbo", ".cache", ".venv", "venv", "__pycache__"
]);

const ignoredExtensions = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf", ".zip", ".gz", ".tar",
  ".7z", ".rar", ".woff", ".woff2", ".ttf", ".otf", ".mp3", ".mp4", ".mov", ".mkv",
  ".jar", ".class", ".exe", ".dll", ".so", ".dylib", ".wasm", ".lock"
]);

const maxBytes = 2 * 1024 * 1024;

const rules = [
  {
    id: "tls-verification-disabled",
    severity: "high",
    message: "TLS certificate verification appears disabled.",
    regex: /rejectUnauthorized\s*:\s*false|NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*['"]?0|verify\s*=\s*False|CURLOPT_SSL_VERIFYPEER\s*,\s*(?:false|0)/i
  },
  {
    id: "private-key-material",
    severity: "high",
    message: "Private-key material appears to be committed.",
    regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/
  },
  {
    id: "aws-access-key",
    severity: "high",
    message: "Possible AWS access key identifier in source.",
    regex: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/
  },
  {
    id: "github-token",
    severity: "high",
    message: "Possible GitHub token in source.",
    regex: /\bgh[pousr]_[A-Za-z0-9_]{30,}\b/
  },
  {
    id: "shell-true",
    severity: "high",
    message: "Process execution uses shell=true; review all interpolated arguments for command injection.",
    regex: /shell\s*:\s*true|shell\s*=\s*True/
  },
  {
    id: "unsafe-eval",
    severity: "high",
    message: "Dynamic code execution detected; prove that attacker-controlled data cannot reach it.",
    regex: /\beval\s*\(|\bnew\s+Function\s*\(/
  },
  {
    id: "python-pickle",
    severity: "high",
    message: "pickle deserialization detected; never deserialize untrusted data.",
    regex: /\bpickle\.(?:loads?|Unpickler)\s*\(/
  },
  {
    id: "yaml-unsafe-load",
    severity: "high",
    message: "Potential unsafe YAML deserialization; use a safe loader for untrusted input.",
    regex: /\byaml\.load\s*\([^\n]*Loader\s*=\s*yaml\.(?:Loader|UnsafeLoader)/
  },
  {
    id: "auth-token-local-storage",
    severity: "high",
    message: "Auth/session credential may be stored in Web Storage; prefer HttpOnly Secure cookies/BFF patterns.",
    regex: /(?:localStorage|sessionStorage)\.setItem\s*\(\s*['"][^'"]*(?:token|session|auth|jwt|refresh)[^'"]*['"]/i
  },
  {
    id: "wildcard-cors",
    severity: "medium",
    message: "Wildcard CORS policy found; verify this endpoint is intentionally public and never credentialed.",
    regex: /Access-Control-Allow-Origin['"]?\s*[:,=]\s*['"]\*['"]|origin\s*:\s*['"]\*['"]/i
  },
  {
    id: "raw-html",
    severity: "medium",
    message: "Raw HTML sink detected; ensure content is trusted or sanitized with a maintained sanitizer.",
    regex: /dangerouslySetInnerHTML|\.innerHTML\s*=|v-html\s*=/
  },
  {
    id: "postmessage-wildcard",
    severity: "medium",
    message: "postMessage uses wildcard target origin; do not send sensitive data this way.",
    regex: /\.postMessage\s*\([^\n]*,\s*['"]\*['"]\s*\)/
  },
  {
    id: "child-process-exec",
    severity: "medium",
    message: "Shell-style process execution detected; prefer execFile/spawn with argument arrays and no shell.",
    regex: /\b(?:exec|execSync)\s*\(/
  },
  {
    id: "weak-random-security-name",
    severity: "medium",
    message: "Math.random appears near a security-sensitive identifier; use a CSPRNG for tokens/secrets/nonces.",
    regex: /(?:token|secret|nonce|session|password|reset|verify|otp)[^\n]{0,80}Math\.random\s*\(|Math\.random\s*\([^\n]{0,80}(?:token|secret|nonce|session|password|reset|verify|otp)/i
  },
  {
    id: "jwt-decode-only",
    severity: "medium",
    message: "JWT decode operation detected; ensure authorization uses cryptographic verification, not decode-only output.",
    regex: /\b(?:jwt|jsonwebtoken)\.decode\s*\(/i
  },
  {
    id: "debug-production-risk",
    severity: "medium",
    message: "Debug mode appears explicitly enabled; ensure this cannot reach production.",
    regex: /\bDEBUG\s*=\s*True\b|debug\s*:\s*true|app\.run\s*\([^\n]*debug\s*=\s*True/i
  }
];

function isProbablyText(file) {
  const ext = path.extname(file).toLowerCase();
  return !ignoredExtensions.has(ext);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".env" || entry.name.startsWith(".env.")) {
      out.push(path.join(dir, entry.name));
      continue;
    }
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) walk(path.join(dir, entry.name), out);
      continue;
    }
    const full = path.join(dir, entry.name);
    if (isProbablyText(full)) out.push(full);
  }
  return out;
}

function lineNumber(content, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (content.charCodeAt(i) === 10) line++;
  return line;
}

const findings = [];

for (const file of walk(root)) {
  let stat;
  try { stat = fs.statSync(file); } catch { continue; }
  if (stat.size > maxBytes) continue;

  const rel = path.relative(root, file).replaceAll(path.sep, "/");

  if (/^\.env(?:\.|$)/.test(path.basename(file)) && !/\.example$|\.sample$|\.template$/i.test(file)) {
    findings.push({
      severity: "high",
      rule: "environment-file",
      file: rel,
      line: 1,
      message: "Real .env-style file present. Verify it contains no secrets and is ignored from version control."
    });
  }

  let content;
  try { content = fs.readFileSync(file, "utf8"); } catch { continue; }
  if (content.includes("\u0000")) continue;

  for (const rule of rules) {
    const flags = rule.regex.flags.includes("g") ? rule.regex.flags : rule.regex.flags + "g";
    const regex = new RegExp(rule.regex.source, flags);
    let match;
    while ((match = regex.exec(content))) {
      findings.push({
        severity: rule.severity,
        rule: rule.id,
        file: rel,
        line: lineNumber(content, match.index),
        message: rule.message
      });
      if (match[0].length === 0) regex.lastIndex++;
    }
  }
}

const rank = { high: 0, medium: 1, low: 2 };
findings.sort((a, b) =>
  rank[a.severity] - rank[b.severity] ||
  a.file.localeCompare(b.file) ||
  a.line - b.line
);

const summary = {
  high: findings.filter((f) => f.severity === "high").length,
  medium: findings.filter((f) => f.severity === "medium").length,
  low: findings.filter((f) => f.severity === "low").length
};

if (json) {
  console.log(JSON.stringify({ root, summary, findings }, null, 2));
} else {
  console.log("aideia security heuristic audit");
  console.log("- root: " + root);
  console.log("- high: " + summary.high + ", medium: " + summary.medium + ", low: " + summary.low);
  console.log("");
  for (const finding of findings) {
    console.log("[" + finding.severity.toUpperCase() + "] " + finding.file + ":" + finding.line);
    console.log("  " + finding.rule + ": " + finding.message);
  }
  if (!findings.length) {
    console.log("No heuristic findings. This is not proof that the project has no vulnerabilities.");
  } else {
    console.log("");
    console.log("Review findings manually. Pattern matches can be false positives and this scanner is not comprehensive.");
  }
}

if (failOnHigh && summary.high > 0) process.exit(2);
