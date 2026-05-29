#!/usr/bin/env node
// Build-time validator for TanStack Start file routes.
// Catches the bugs that bypass tsc and only blow up at runtime:
//   1. createFileRoute("/x") path must match the filename
//   2. `head` MUST come before `component` (TanStack code-splitter mishandles
//      the reverse order and emits a "Unexpected }" transform error)
//   3. Route file must export `Route = createFileRoute(...)`
//
// Run: node scripts/check-routes.mjs
// Exits 1 on any failure so CI / build hooks can gate on it.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const ROUTES_DIR = join(ROOT, "src", "routes");

const IGNORED = new Set(["__root.tsx", "routeTree.gen.ts", "README.md"]);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.tsx?$/.test(name) && !IGNORED.has(name)) out.push(full);
  }
  return out;
}

// Filename `users.$id.edit.tsx` => route id `/users/$id/edit`
// `index.tsx` => `/`, `foo.index.tsx` => `/foo`
function expectedRouteId(file) {
  const rel = relative(ROUTES_DIR, file).replace(/\\/g, "/");
  let base = rel.replace(/\.tsx?$/, "");
  // Folder nesting and dot nesting are equivalent.
  base = base.split("/").join(".");
  const segs = base.split(".").filter((s) => s !== "index");
  if (segs.length === 0) return "/";
  return "/" + segs.join("/");
}

const errors = [];

for (const file of walk(ROUTES_DIR)) {
  const src = readFileSync(file, "utf8");
  const display = relative(ROOT, file);

  // Skip files without createFileRoute (helpers, types, etc.)
  if (!src.includes("createFileRoute(")) continue;

  // Require the canonical `export const Route = createFileRoute(...)`.
  if (!/export\s+const\s+Route\s*=\s*createFileRoute\s*\(/.test(src)) {
    errors.push(`${display}: missing \`export const Route = createFileRoute(...)\``);
    continue;
  }

  // Extract path string.
  const m = src.match(/createFileRoute\(\s*["'`]([^"'`]+)["'`]\s*\)\s*\(\s*\{([\s\S]*?)\}\s*\)/);
  if (!m) {
    errors.push(`${display}: could not parse createFileRoute(...) call`);
    continue;
  }

  const [, declaredPath, body] = m;
  const expected = expectedRouteId(file);
  if (declaredPath !== expected) {
    errors.push(`${display}: route id "${declaredPath}" does not match filename (expected "${expected}")`);
  }

  // Detect top-level keys in the options object (only first-level keys).
  // Track positions of `head` and `component`.
  // We approximate by scanning for `^\s*(key):` lines.
  const keyOrder = [];
  for (const line of body.split("\n")) {
    const km = line.match(/^\s*(head|component|loader|errorComponent|notFoundComponent|pendingComponent|beforeLoad|validateSearch|loaderDeps)\s*:/);
    if (km) keyOrder.push(km[1]);
  }
  const headIdx = keyOrder.indexOf("head");
  const compIdx = keyOrder.indexOf("component");
  if (headIdx > -1 && compIdx > -1 && headIdx > compIdx) {
    errors.push(
      `${display}: \`head\` must be declared BEFORE \`component\` in createFileRoute options ` +
      `(TanStack code-splitter mishandles the reverse order and emits a runtime transform error)`,
    );
  }
}

if (errors.length) {
  console.error(`\n✖ Route check failed (${errors.length}):\n`);
  for (const e of errors) console.error("  - " + e);
  console.error("");
  process.exit(1);
}

console.log("✓ Route config looks healthy");
