import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname, resolve, sep } from "node:path";
import { expect, it } from "vitest";

// WH-4 (F-1/F-3): the route-family + module census pin. The WH-4 audit
// found three API route families (users, upload, uploads/[name]) and seven
// ui/ modules (avatar, badge, button, card, dropdown, icons, table) that
// shipped four rounds with ZERO importers — CRM-era surface the wellness
// pages never consumed (the reference carries no upload and no avatar
// surface; its account card is read-only, live-probed). This pin walks the
// tree the way an auditor would:
//
//   1. The API route-family census — the EXACT set of families under
//      src/app/api/ (a route dir that appears or disappears trips the pin
//      and forces the doc-count lockstep in the same commit).
//   2. The ui-module census — the EXACT set of modules under
//      src/components/ui/ (the shadcn-style primitive shelf).
//   3. The production-liveness census — every module under src/lib,
//      src/stores, src/types and src/components/{layout,shared,ui} must be
//      imported by at least one OTHER production file (src/ only — tests
//      pin modules, they do not keep them alive), or sit on the whitelist
//      with a documented reason.
//
// Same doctrine as the WH-3 dead-dep census (tests/dead-deps.test.ts):
// dead surface is not a superset — it is drift liability. The web-app
// skill's discipline, extended from packages to routes and modules.

const REPO_ROOT = join(import.meta.dirname, "..");
const SRC = join(REPO_ROOT, "src");

/**
 * Modules with no production importer that are still required, each with
 * its documented reason. Adding a name here without a reason is how dead
 * modules sneak back in.
 */
const LIVENESS_WHITELIST: Record<string, string> = {};

/** Every import specifier that can resolve to a file: static `from "x"`,
 *  side-effect `import "x"` and dynamic `import("x")`. */
const SPECIFIER_RE = /(?:from\s+|import\s*\(?\s*)["']([^"'\n]+)["']/g;

function collectSourceFiles(dir: string, out: string[]): void {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) collectSourceFiles(full, out);
    else if (/\.(ts|tsx)$/.test(extname(name))) out.push(full);
  }
}

/** All production source files under src/ (the router owns src/app entry
 *  points; they are imported by Next, not by imports). */
function productionFiles(): string[] {
  const out: string[] = [];
  collectSourceFiles(SRC, out);
  return out;
}

/** Resolve an import specifier (as written in `fromFile`) to the set of
 *  candidate module paths under src/: the `@/` alias form and the
 *  relative forms, each with the .ts/.tsx/index.ts/index.tsx suffixes. */
function resolveSpecifier(spec: string, fromFile: string): string[] {
  const base =
    spec.startsWith("@/")
      ? join(SRC, spec.slice(2))
      : spec.startsWith("./") || spec.startsWith("../")
        ? resolve(dirname(fromFile), spec)
        : null; // bare specifier (react, zod, …) — not a repo module
  if (base === null) return [];
  const suffixes = [".ts", ".tsx", "/index.ts", "/index.tsx"];
  return suffixes.map((suffix) => `${base}${suffix}`);
}

it("WH-4: the API route-family census — the exact expected set (15)", () => {
  const families = readdirSync(join(SRC, "app", "api"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  expect(families).toEqual([
    "achievements",
    "assignments",
    "auth",
    "dashboard",
    "events",
    "goals",
    "health",
    "mood-entries",
    "prefs",
    "reminders",
    "routine-templates",
    "routines",
    "study-resources",
    "tutorials",
    "workouts",
  ]);
});

it("WH-4: the ui-module census — the exact expected set (6 primitives)", () => {
  const modules = readdirSync(join(SRC, "components", "ui"), { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.tsx?$/.test(entry.name))
    .map((entry) => entry.name.replace(/\.tsx?$/, ""))
    .sort();
  expect(modules).toEqual(["dialog", "input", "label", "select", "tabs", "toast"]);
});

it("WH-4: every src module has a production importer (the liveness census)", () => {
  const files = productionFiles();

  // The production import graph: which src files does each file import?
  const importedPaths = new Set<string>();
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(SPECIFIER_RE)) {
      for (const candidate of resolveSpecifier(match[1], file)) {
        importedPaths.add(candidate);
      }
    }
  }

  // The census scopes: lib, stores, types, components/{layout,shared,ui}.
  const censusScopes = [
    join(SRC, "lib"),
    join(SRC, "stores"),
    join(SRC, "types"),
    join(SRC, "components", "layout"),
    join(SRC, "components", "shared"),
    join(SRC, "components", "ui"),
  ];
  const dead: string[] = [];
  for (const scope of censusScopes) {
    for (const file of files.filter((f) => f.startsWith(scope + sep))) {
      const rel = file.slice(SRC.length + 1);
      if (importedPaths.has(file) || rel in LIVENESS_WHITELIST) continue;
      dead.push(rel);
    }
  }

  expect(
    dead,
    "src modules with zero production importers — retire them, or add a " +
      "LIVENESS_WHITELIST entry WITH a reason if the module genuinely has no " +
      "import site (entry points owned by the framework live outside these scopes)",
  ).toEqual([]);
});
