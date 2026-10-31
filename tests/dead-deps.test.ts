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

// WH-8 (F-3): the lockfile-resolution pin. `bun audit` needs the network,
// so the gate cannot run it — but the lockfile's RESOLVED versions are the
// advisory posture, offline-readable. The WH-8 overrides took the tree
// from 9 accepted dev-toolchain advisories to ZERO:
//
//   vite 8.3.0 -> 8.3.5       the 6-advisory vite/launch-editor family
//                             (GHSA-9jrq-w75r-8gcw, GHSA-rq7h-c2jc-7f22,
//                             GHSA-698v-4r3x-3vcv, GHSA-r825-w8mm-5pxw,
//                             GHSA-587h-7wmj-h5pm, GHSA-vfpm-58rq-9qcg)
//   deepmerge-ts 7.1.5 -> 8.0.2  GHSA-ggr8-5vv4-36mx (the prisma CLI chain)
//   source-map-js 1.2.1 -> 1.2.2 GHSA-68fv-2mgg-jv7q (postcss's copy)
//   zod (nested 4.6.5) -> 4.6.7  GHSA-mrhx-c7xc-m3w5 (the eslint-plugin peer
//                             copy joins the direct dep — one zod, 4.6.7)
//
// This pin asserts those resolutions stay: an override removal, a lockfile
// regen onto a vulnerable range, or a reintroduced nested zod trips the
// unit gate — the posture is a TESTED contract, not a doc claim. (The
// s198 dompurify precedent from the chassis, generalized to the four
// override targets.) Registry re-triage still happens at `bun audit`'s
// cadence; when a NEW advisory lands, the fix flips these literals and
// the overrides in the same commit.

/** The WH-8 override resolutions — the advisory-zero posture. */
const PINNED_RESOLUTIONS = {
  vite: "8.3.5",
  "deepmerge-ts": "8.0.2",
  "source-map-js": "1.2.2",
  zod: "4.6.7",
  // WH-29 (F-H): minimatch GHSA-g3hv-75wg-m249 (ReDoS via globparts
  // amplification, < 11.0.1) — reached through the eslint chains: the
  // root 3.1.5 (eslint/@eslint/eslintrc/@eslint/config-array/
  // eslint-plugin-import/jsx-a11y/react, all ^3.x ranges) + a NESTED
  // @typescript-eslint/typescript-estree/minimatch@10.2.6. The override
  // to registry-latest 11.0.3 is RANGE-BREAKING but API-compatible at
  // every call site the lint gate exercises (eslint 9.39.5 runs clean
  // on 11.0.3 — the gate is the proof). The WH-8 "zero vulnerabilities"
  // posture had aged out: a new advisory landed under the locked
  // versions between the periodic re-triages.
  minimatch: "11.0.3",
} as const;

it("WH-8 (F-3): the lockfile resolves the advisory-zero versions", () => {
  const lock = readFileSync(join(REPO_ROOT, "bun.lock"), "utf8");

  // The resolution table form: "name": ["name@X.Y.Z", …
  for (const [name, version] of Object.entries(PINNED_RESOLUTIONS)) {
    const re = new RegExp(`"${name}": \\["${name}@${version}"`);
    expect(
      re.test(lock),
      `bun.lock must resolve ${name} at ${version} (the advisory-zero override) — found no \\"${name}@${version}\\" resolution`,
    ).toBe(true);
  }

  // zod resolves at exactly ONE version: the 4.6.7 direct dep, with no
  // nested 4.6.x copy surviving (the first-match form would pass a tree
  // that still carries the vulnerable nested copy — the s198 nested-copy
  // lesson).
  const zodResolutions = [...lock.matchAll(/"zod@([\d.]+)"/g)].map((m) => m[1]);
  expect(zodResolutions.length, "exactly one zod resolution (the direct 4.6.7 — the eslint-plugin peer joins it via the override)").toBe(1);
  expect(zodResolutions[0]).toBe("4.6.7");
});

it("WH-29 (F-H): every minimatch resolution is the advisory-cleared 11.0.3 (the nested-copy scan)", () => {
  // The s198 nested-copy doctrine, applied to the WH-29 override: the
  // override forces ALL resolutions, but a lockfile regen (or a future
  // dependency bump reintroducing a nested requirement) could leave a
  // vulnerable copy surviving beside the pinned root. Every
  // minimatch@X.Y.Z resolution in the lockfile must read 11.0.3 — the
  // pre-override tree carried BOTH a root 3.1.5 and a nested 10.2.6,
  // both inside the advisory range.
  const lock = readFileSync(join(REPO_ROOT, "bun.lock"), "utf8");
  const resolutions = [...lock.matchAll(/minimatch@([\d.]+)/g)].map((m) => m[1]);
  expect(
    resolutions.length,
    "at least one minimatch resolution must exist (the eslint chains depend on it — a disappearing resolution means the override or the tree broke)",
  ).toBeGreaterThan(0);
  const offenders = resolutions.filter((v) => v !== "11.0.3");
  expect(
    offenders,
    `every minimatch resolution must be 11.0.3 (GHSA-g3hv-75wg-m249 cleared) — found off-version resolutions: ${offenders.join(", ")}`,
  ).toEqual([]);
});
