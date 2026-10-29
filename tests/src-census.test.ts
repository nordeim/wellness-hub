import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";

// WH-6 (F-4): the src-surface census pin. The WH-6 audit found three
// hygiene classes that survived five audit rounds and the full gate
// because nothing test-gated them:
//
//   1. Stale file CITATIONS inside src/scripts/prisma comments — eight
//      `tests/*.test.ts` references to files that do not exist, each
//      defending live-looking code (site.ts cited tests/metadata.test.ts
//      + tests/pwa-metadata.test.ts; rate-limit.ts cited the WH-3-retired
//      tests/property.test.ts; globals.css's Tailwind pins cited three
//      NEO-CRM-era parity suites; census.ts cited tests/db-census.test.ts;
//      api.ts's dead coercion family was defended by the nonexistent
//      tests/coercion-guards.test.ts).
//   2. DEAD EXPORTS — src/lib/api.ts carried ten exported coercion
//      helpers (asString/isBad*/asFKId/asNumber/asInt/asDate) with ZERO
//      importers across the entire tree, narrated as "surviving on the
//      URL-param surfaces" — surfaces that do not exist (zero
//      searchParams/URLSearchParams usage in src/app/api and src/lib).
//   3. DUPLICATED UNREACHABLE STATEMENTS — four POST handlers shipped
//      `return ok(row);` twice (reminders/assignments/events/
//      study-resources route.ts:33); inert at runtime, invisible to tsc's
//      default allowUnreachableCode and to the ESLint chain.
//
// Same doctrine as the WH-3 dead-dep census, the WH-4 route/ui census and
// the WH-5 docs-counts pin: dead surface and the comments defending it
// are drift liability, and proofreading is not a gate. This pin walks the
// surfaces the earlier pins do not reach: the comment text inside the app
// tree, the export surface of the contract module, and the statement
// hygiene of src.
//
// Presence-of-truth, not absence-of-error: a comment may cite any file it
// likes as long as the file is real (globs must expand to >= 1 file);
// api.ts may grow exports, but only consciously — the canonical set
// flips in the same commit as the new export (the count-ladder rule).

const REPO_ROOT = join(import.meta.dirname, "..");

/** api.ts's live export surface — the contract every route imports. When
 * a new export joins the module, flip this set in the same commit (an
 * export without a consumer is the F-1 class; the route-census liveness
 * pin keeps whole modules honest, this keeps the contract module's
 * surface honest). */
const API_EXPORTS = [
  "ApiError",
  "ApiResult",
  "BoundedJson",
  "ERR",
  "MAX_AUTH_BODY_BYTES",
  "fail",
  "isBodyTooLarge",
  "isGuarded",
  "ok",
  "parseBody",
  "readBoundedJson",
  "requireSession",
] as const;

/** The scanned citation surfaces: the app tree + the scripts + the seed +
 * the root config files. History belongs in worklog/plans/session files —
 * a history comment inside src citing a retired test file is exactly how
 * the F-3 lies survived, so src is NOT exempt. */
function citationSurfaces(): string[] {
  const out: string[] = [];
  collect(join(REPO_ROOT, "src"), out, [".ts", ".tsx", ".css"]);
  collect(join(REPO_ROOT, "scripts"), out, [".ts", ".sh"]);
  collect(join(REPO_ROOT, "prisma"), out, [".ts"]);
  for (const name of [
    "next.config.ts",
    "vitest.config.ts",
    "playwright.config.ts",
    "eslint.config.mjs",
    "postcss.config.mjs",
  ]) {
    const full = join(REPO_ROOT, name);
    if (existsSync(full)) out.push(full);
  }
  return out;
}

/** Recursively collect files under `dir` ending in one of `exts`. */
function collect(dir: string, out: string[], exts: string[]): void {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) collect(full, out, exts);
    else if (exts.some((ext) => name.endsWith(ext))) out.push(full);
  }
}

it("WH-6: every cited tests/*.test.ts file in the app tree exists", () => {
  const citationRe = /tests\/[A-Za-z0-9/._*-]+\.test\.ts/g;
  const stale: string[] = [];
  const seen = new Set<string>();
  for (const file of citationSurfaces()) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(citationRe)) {
      const cite = match[0];
      const key = `${file.replace(REPO_ROOT + "/", "")}: ${cite}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (cite.includes("*")) {
        // A glob citation: must expand to at least one real suite. The
        // candidates are the tests/ entries as cited paths (tests/<name>).
        // Glob semantics: `**/` matches ZERO or more path segments
        // (picomatch/vitest semantics — `tests/**/*.test.ts` matches
        // `tests/auth.test.ts`), a bare `**` matches anything, and a
        // single `*` stays inside one segment. The placeholder passes
        // matter: naive sequential replaces re-eat the stars they insert
        // (`**` → `.*` would then become `.[^/]*` under the single-star
        // pass — the bug this pin caught in its own RED run).
        const pattern = new RegExp(
          "^" +
            cite
              .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
              .replace(/\*\*\//g, "\u0000")
              .replace(/\*\*/g, "\u0001")
              .replace(/\*/g, "[^/]*")
              .replace(/\u0000/g, "(?:.*/)?")
              .replace(/\u0001/g, ".*") +
            "$",
        );
        const matches = readdirSync(join(REPO_ROOT, "tests"))
          .map((name) => `tests/${name}`)
          .filter((path) => pattern.test(path));
        if (matches.length === 0) stale.push(key);
      } else if (!existsSync(join(REPO_ROOT, cite))) {
        stale.push(key);
      }
    }
  }
  expect(
    stale,
    "stale tests/*.test.ts citations in the app tree — a comment defending code with a nonexistent file is a maintenance lie; cite the real pin or retire the code (F-3/F-1 class)",
  ).toEqual([]);
});

it("WH-6: src/lib/api.ts exports exactly the live contract surface (12)", () => {
  const source = readFileSync(join(REPO_ROOT, "src", "lib", "api.ts"), "utf8");
  const exported = [
    ...source.matchAll(/^export (?:async )?function (\w+)|^export const (\w+)|^export type (\w+)/gm),
  ]
    .map((m) => m[1] ?? m[2] ?? m[3])
    .sort();
  expect(exported, "src/lib/api.ts's exported symbols, sorted").toEqual(
    [...API_EXPORTS].sort(),
  );
});

it("WH-6: no duplicated adjacent return statements in src", () => {
  const files: string[] = [];
  collect(join(REPO_ROOT, "src"), files, [".ts", ".tsx"]);
  const dups: string[] = [];
  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    for (let i = 1; i < lines.length; i++) {
      const prev = lines[i - 1].trim();
      const curr = lines[i].trim();
      if (
        prev &&
        prev === curr &&
        /^return\b/.test(prev) &&
        prev.endsWith(";")
      ) {
        dups.push(`${file.replace(REPO_ROOT + "/", "")}:${i + 1}: ${curr}`);
      }
    }
  }
  expect(
    dups,
    "duplicated adjacent return statements — the second is unreachable dead code (F-2 class, the reminders/assignments/events/study-resources copy-paste)",
  ).toEqual([]);
});

// ---- WH-7: the exported-value + CSS-utility liveness census -----------------
//
// WH-7 found fifteen dead exported VALUES across four census modules
// (six layout constants, an icon map + a login string, two shared
// components, three format functions, plus format.ts's CRM-era
// subgraph) — zero consumers anywhere (production, tests, scripts).
// Same doctrine as the api-export census above, widened to the modules
// that hand class strings and domain vocab to components. The WH-6
// census kept ONE contract module honest; this one walks the whole
// lib/shared constant surface.
//
// Scope decisions (the same false-positive analysis as WH-6's):
//   - Only exported `const`/`function` VALUES. Types (`interface`/`type`)
//     are EXEMPT — an internally-consumed type export is an ergonomic,
//     not drift liability.
//   - Data feeds consumed ONLY within their own module keep the code but
//     drop the `export` keyword — the census reads export sites, so the
//     un-export cure lands mechanically.
//   - Consumers may live in src/ OR tests/ — tests pin behavior; a value a
//     test imports is alive (retirement is a conscious act that updates
//     the test in the same commit).
//   - This pin's own text stays OUT of the corpus (its comments narrate
//     the retirement classes and would otherwise "consume" the names).

/** The census modules — where F-1 actually lived: the layout-constant and
 *  domain-vocab seams that feed components. */
const VALUE_CENSUS_MODULES = [
  "src/lib/page-layout.ts",
  "src/lib/constants.ts",
  "src/lib/format.ts",
  "src/lib/wellness.ts",
  "src/lib/site.ts",
  "src/lib/schemas.ts",
  "src/components/shared/page-parts.tsx",
] as const;

function exportedValues(source: string): string[] {
  return [
    ...source.matchAll(/^export (?:async )?function (\w+)|^export const (\w+)/gm),
  ]
    .map((m) => m[1] ?? m[2])
    .filter((name): name is string => Boolean(name));
}

it("WH-7: every exported value in the census modules has a consumer", () => {
  // The consumer corpus: every ts/tsx file under src/ and tests/, minus
  // each module's own text (same-module consumption does not count — that
  // is what the `export` keyword un-cures in the data-feed class) and
  // minus this pin's own text (the class narration above would otherwise
  // consume the very names it documents).
  const corpusFiles: string[] = [];
  collect(join(REPO_ROOT, "src"), corpusFiles, [".ts", ".tsx"]);
  collect(join(REPO_ROOT, "tests"), corpusFiles, [".ts", ".tsx"]);
  const SELF = "tests/src-census.test.ts";
  const corpus = new Map<string, string>();
  for (const file of corpusFiles) {
    const key = file.replace(REPO_ROOT + "/", "");
    if (key === SELF) continue;
    corpus.set(key, readFileSync(file, "utf8"));
  }
  const dead: string[] = [];
  for (const mod of VALUE_CENSUS_MODULES) {
    const text = corpus.get(mod);
    if (!text) throw new Error(`census module missing: ${mod}`);
    for (const name of exportedValues(text)) {
      const re = new RegExp(`\\b${name}\\b`);
      const consumed = [...corpus.entries()].some(([file, src]) => {
        if (file === mod) return false;
        return re.test(src);
      });
      if (!consumed) dead.push(`${mod}: ${name}`);
    }
  }
  expect(
    dead,
    "exported values with zero consumers anywhere (production, tests, scripts) — the F-1 class: retire the value, or if it is a same-module data feed, drop the export keyword",
  ).toEqual([]);
});

it("WH-7: every @utility block in globals.css has a class consumer in src", () => {
  const css = readFileSync(join(REPO_ROOT, "src", "app", "globals.css"), "utf8");
  const names = [...css.matchAll(/^@utility ([\w-]+)/gm)].map((m) => m[1]);
  // The consumer corpus: every ts/tsx/css file under src/ except globals.css
  // itself (a utility whose only appearance is its own definition is dead).
  const consumerFiles: string[] = [];
  collect(join(REPO_ROOT, "src"), consumerFiles, [".ts", ".tsx"]);
  const consumers = consumerFiles
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
  const dead: string[] = [];
  for (const name of names) {
    // Hyphenated names must not shadow their prefixes (input-base must not
    // match a bare `input` token) nor be shadowed by longer tokens.
    const re = new RegExp(`(?<![\\w-])${name}(?![\\w-])`);
    if (!re.test(consumers)) dead.push(`@utility ${name}`);
  }
  expect(
    dead,
    "@utility blocks with zero class consumers — the F-3 class (input-base shipped dead since the build commit; the Input component styles through the page-layout constants, a different surface that shares the name)",
  ).toEqual([]);
});
