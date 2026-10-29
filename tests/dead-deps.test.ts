import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { expect, it } from "vitest";

// WH-3 (F-1): the dead-dependency census pin. The WH-1 domain replacement
// deleted the CRM's src/lib/csv.ts + pdf-export.ts but left their packages
// in package.json — jspdf, recharts, html2canvas-pro, fast-check, axe-core
// and tw-animate-css shipped three rounds with ZERO live imports while four
// root docs + the SKILL claimed charts/PDF-export/property-tests/axe-teeth
// that never existed in the wellness tree. This pin walks the tree the way
// an auditor would: every package.json dependency + devDependency must carry
// at least one QUOTED reference (an import/require specifier, a CSS @import,
// a PostCSS plugin key — quotes keep prose comments from counting) across
// the app's scanned roots, or sit on the TOOLCHAIN whitelist with a
// documented reason. A package that goes dead fails the gate.
//
// The skill's dependency discipline (skills/web-application/SKILL.md §2):
// "every dependency must have a live import within one commit of being
// added; run a dead-dependency census periodically (the family repeatedly
// found and retired zero-import scaffold packages)."

const REPO_ROOT = join(import.meta.dirname, "..");

/** The roots whose files can hold live package references. */
const SCAN_ROOTS = ["src", "tests", "scripts", "prisma"] as const;

/** Root-level config files (outside the directory roots). */
const ROOT_CONFIGS = [
  "next.config.ts",
  "vitest.config.ts",
  "playwright.config.ts",
  "eslint.config.mjs",
  "postcss.config.mjs",
] as const;

/**
 * Packages with NO direct quoted reference that are still required, each
 * with its documented reason. Adding a name here without a reason comment
 * is how dead deps sneak back in — reviewers check the reasons, not just
 * the list.
 */
const TOOLCHAIN: Record<string, string> = {
  prisma: "the Prisma CLI — spawned via `bun x prisma` by scripts/prisma-env.ts (db:push/db:generate)",
  eslint: "the lint binary behind `bun run lint` (eslint.config.mjs imports its config, not the bin)",
  typescript: "the compiler behind `bun run typecheck` + the build's type gate",
  tailwindcss: "the CSS engine behind the @tailwindcss/postcss plugin (the @theme/@utility directives)",
  "react-dom": "React's renderer — a required peer of next (Next binds it; app code never imports it)",
  "@types/node": "ambient Node types for the compiler",
  "@types/react": "ambient React types for the compiler",
  "@types/react-dom": "ambient react-dom types for the compiler",
};

function collectFiles(dir: string, out: string[]): void {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name.startsWith(".")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) collectFiles(full, out);
    else if (/\.(ts|tsx|mjs|css)$/.test(extname(name))) out.push(full);
  }
}

/** The set of package names referenced by a quoted string in any scanned
 *  file — the first path segment (two for @scoped) of each quoted,
 *  non-relative, non-builtin specifier. */
function referencedPackages(): Set<string> {
  const files: string[] = [];
  for (const root of SCAN_ROOTS) collectFiles(join(REPO_ROOT, root), files);
  for (const config of ROOT_CONFIGS) files.push(join(REPO_ROOT, config));

  const referenced = new Set<string>();
  const quoted = /["']([^"'\n]+)["']/g;
  for (const file of files) {
    for (const match of readFileSync(file, "utf8").matchAll(quoted)) {
      const specifier = match[1];
      if (!specifier || specifier.startsWith(".") || specifier.startsWith("/") || specifier.startsWith("node:"))
        continue;
      const segments = specifier.split("/");
      referenced.add(specifier.startsWith("@") ? `${segments[0]}/${segments[1]}` : segments[0]);
    }
  }
  return referenced;
}

it("WH-3 (F-1): every dependency carries a live reference (the dead-dep census)", () => {
  const pkg = JSON.parse(readFileSync(join(REPO_ROOT, "package.json"), "utf8")) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  const declared = { ...pkg.dependencies, ...pkg.devDependencies };
  expect(Object.keys(declared).length).toBeGreaterThan(0);

  const referenced = referencedPackages();
  const dead: string[] = [];
  for (const name of Object.keys(declared).sort()) {
    if (referenced.has(name) || name in TOOLCHAIN) continue;
    dead.push(name);
  }

  expect(
    dead,
    "package.json entries with zero quoted references across the scanned roots " +
      "(src, tests, scripts, prisma, the root configs) — retire them, or add a " +
      "TOOLCHAIN whitelist entry WITH a reason if the package genuinely has no import site",
  ).toEqual([]);
});

it("WH-3 (F-1): the toolchain whitelist carries a reason for every entry", () => {
  for (const [name, reason] of Object.entries(TOOLCHAIN)) {
    expect(reason.trim().length, `${name} needs a non-empty whitelist reason`).toBeGreaterThan(10);
  }
});
