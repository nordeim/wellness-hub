import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, it } from "vitest";
import {
  WORKOUT_TYPES, WORKOUT_INTENSITIES, MOODS, ASSIGNMENT_PRIORITIES,
  EVENT_CATEGORIES, RESOURCE_TYPES, REMINDER_TYPES, REMINDER_REPEATS,
  GOAL_CATEGORIES, GOAL_FREQUENCIES,
  TUTORIAL_CATEGORIES, TUTORIAL_DIFFICULTIES,
  difficultyMeta,
} from "../src/lib/constants";

/** The chip vocabularies the WH-17 census walks (imported — the module is
 * pure/node-safe; the census pins the RUNTIME values, not just the source
 * text). TEMPLATE_DIFFICULTIES rides its exported accessor (the map itself
 * is module-private — the WH-8 data-feed doctrine; a test-only re-export
 * would trip the exported-value census). */
type ChipMeta = { value: string; label: string; tint: string; text: string };
const TEMPLATE_DIFFICULTIES = [difficultyMeta("easy"), difficultyMeta("moderate")];
const CHIP_VOCABULARIES = {
  WORKOUT_TYPES, WORKOUT_INTENSITIES, MOODS, ASSIGNMENT_PRIORITIES,
  EVENT_CATEGORIES, RESOURCE_TYPES, REMINDER_TYPES, REMINDER_REPEATS,
  GOAL_CATEGORIES, GOAL_FREQUENCIES, TEMPLATE_DIFFICULTIES,
  TUTORIAL_CATEGORIES, TUTORIAL_DIFFICULTIES,
};

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
 * surface honest). WH-11 dropped the three TYPE exports (ApiError/
 * ApiResult/BoundedJson — zero external consumers; the envelope is
 * consumed through the ok()/fail() VALUES, and the store's call() types
 * its envelope through its own Result): 12 → 9, all values. */
const API_EXPORTS = [
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

it("WH-6: src/lib/api.ts exports exactly the live contract surface (9)", () => {
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

/** The census modules — where the dead-export classes actually lived: the
 * layout-constant and domain-vocab seams that feed components (WH-7's
 * set), widened at WH-8 to every remaining lib seam module + the theme
 * store (the four same-module data feeds the WH-7 set stopped one layer
 * short of). api.ts stays out — its surface owns a dedicated canonical-set
 * check above; types are exempt by the WH-7 decision. */
const VALUE_CENSUS_MODULES = [
  "src/lib/page-layout.ts",
  "src/lib/constants.ts",
  "src/lib/format.ts",
  "src/lib/wellness.ts",
  "src/lib/site.ts",
  "src/lib/schemas.ts",
  "src/lib/auth.ts",
  "src/lib/badges-server.ts",
  "src/lib/boot-env.ts",
  "src/lib/chunk-recovery.ts",
  "src/lib/db.ts",
  "src/lib/db-path.ts",
  "src/lib/login-reset.ts",
  "src/lib/password.ts",
  "src/lib/rate-limit.ts",
  "src/lib/utils.ts",
  "src/lib/verification.ts",
  "src/lib/verification-server.ts",
  "src/stores/theme-store.ts",
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
  // The consumer corpus: every ts/tsx file under src/, tests/, scripts/
  // and prisma/ (the seed and the CLI wrappers are production consumers
  // of the lib seam — runtimeDatabaseUrl, hashPassword, db), minus each
  // module's own text (same-module consumption does not count — that is
  // what the `export` keyword un-cures in the data-feed class) and minus
  // this pin's own text (the class narration above would otherwise
  // consume the very names it documents).
  const corpusFiles: string[] = [];
  collect(join(REPO_ROOT, "src"), corpusFiles, [".ts", ".tsx"]);
  collect(join(REPO_ROOT, "tests"), corpusFiles, [".ts", ".tsx"]);
  collect(join(REPO_ROOT, "scripts"), corpusFiles, [".ts"]);
  collect(join(REPO_ROOT, "prisma"), corpusFiles, [".ts"]);
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

// ---- WH-8: the store-member + ui-export liveness censuses ------------------
//
// WH-8 found SIX dead members inside WellnessState (two write-only state
// fields — `user` (nothing read it since WH-4's user-chip retirement; the
// Profile page's user arrives as a server prop), `prefs` (its only writer
// was the dead fetchPrefs; the theme store owns the prefs surface through
// its own /api/prefs client) — and four zero-call-site actions:
// refreshUser, fetchPrefs, updateWorkout, updateMoodEntry) plus SEVEN dead
// ui-module exports (DialogPortal, DialogClose, DialogFooterWide, Textarea,
// SelectGroup, SelectLabel, SelectSeparator — the ui layer's export blocks
// are invisible to the WH-7 value census, which reads `export const/
// function` declarations, not `export { … }` blocks).
//
// Design (the fake-consumer lesson): the store census is EXTRACTION-based —
// it reads actual useWellnessStore call sites (destructure names + selector
// member accesses) in production files outside the store. A word-grep
// census false-negatives `user` (the word is everywhere) and false-positives
// on string literals (route-census's "prefs" API-family entry). Tests stay
// OUT of this corpus — the WH-4 doctrine: tests pin modules, they do not
// keep them alive. The ui-export census keeps the WH-7 value-census corpus
// design (src + tests + scripts + prisma — a test-imported export is alive;
// retirement is a conscious same-commit act).

/** Extract the member names of WellnessState from the store's source. */
function wellnessStateMembers(source: string): string[] {
  const iface = source.match(/interface WellnessState \{([\s\S]*?)\n\}/);
  if (!iface) throw new Error("WellnessState interface not found");
  const body = iface[1].replace(/\/\/[^\n]*/g, "");
  return [...body.matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1]);
}

it("WH-8: every WellnessState member is consumed at a useWellnessStore call site", () => {
  const storePath = join(REPO_ROOT, "src", "stores", "wellness-store.ts");
  const storeSrc = readFileSync(storePath, "utf8");
  const members = wellnessStateMembers(storeSrc);
  // The interface parses (state fields + actions; comments stripped).
  expect(members.length).toBeGreaterThan(20);

  // The consumed set: destructures (`const { a, b } = useWellnessStore()`)
  // and selector accesses (`useWellnessStore((s) => s.x)`) in production
  // files outside the store itself.
  const consumed = new Set<string>();
  const files: string[] = [];
  collect(join(REPO_ROOT, "src"), files, [".ts", ".tsx"]);
  for (const file of files) {
    if (file === storePath) continue;
    const src = readFileSync(file, "utf8");
    if (!src.includes("useWellnessStore")) continue;
    for (const m of src.matchAll(/\{([^{}]+)\}\s*=\s*useWellnessStore\s*\(\s*\)/g)) {
      for (let raw of m[1].split(",")) {
        raw = raw.trim().split(":")[0].trim();
        if (/^\w+$/.test(raw)) consumed.add(raw);
      }
    }
    for (const m of src.matchAll(
      /useWellnessStore\s*\(\s*\(\s*(\w+)\s*\)\s*=>\s*([^\n)]*)/g,
    )) {
      for (const acc of m[2].matchAll(new RegExp(`\\b${m[1]}\\.(\\w+)`, "g"))) {
        consumed.add(acc[1]);
      }
    }
  }

  const dead = members.filter((m) => !consumed.has(m));
  expect(
    dead,
    "WellnessState members with zero production consumers at useWellnessStore call sites — retire them (write-only fields and zero-call-site actions are drift liability; the WH-4 user-chip retirement made `user` write-only, the theme store's own /api/prefs client made the prefs slice write-only)",
  ).toEqual([]);
});

it("WH-8: every ui-module export has a consumer outside its own module", () => {
  // The six ui primitives (the WH-4 ui-module census set) export through
  // `export { … }` blocks — invisible to the WH-7 value census's
  // declaration regex. This check walks the export blocks.
  const uiDir = join(REPO_ROOT, "src", "components", "ui");
  const modules = readdirSync(uiDir)
    .filter((name) => /\.tsx?$/.test(name))
    .sort();

  // The consumer corpus: src + tests + scripts + prisma, minus each
  // module's own text (same-module consumption does not count) and minus
  // this pin's own text (its narration would consume the names).
  const corpusFiles: string[] = [];
  collect(join(REPO_ROOT, "src"), corpusFiles, [".ts", ".tsx"]);
  collect(join(REPO_ROOT, "tests"), corpusFiles, [".ts", ".tsx"]);
  collect(join(REPO_ROOT, "scripts"), corpusFiles, [".ts"]);
  collect(join(REPO_ROOT, "prisma"), corpusFiles, [".ts"]);
  const SELF = "tests/src-census.test.ts";
  const corpus = new Map<string, string>();
  for (const file of corpusFiles) {
    const key = file.replace(REPO_ROOT + "/", "");
    if (key === SELF) continue;
    corpus.set(key, readFileSync(file, "utf8"));
  }

  const dead: string[] = [];
  for (const mod of modules) {
    const rel = `src/components/ui/${mod}`;
    const text = corpus.get(rel);
    if (!text) throw new Error(`ui module missing from corpus: ${rel}`);
    const block = text.match(/export \{([^}]+)\}/);
    const names = (block ? block[1] : "")
      .split(",")
      .map((n) => n.trim().split(/\s+as\s+/)[0].trim())
      .filter((n) => /^\w+$/.test(n));
    for (const name of names) {
      const re = new RegExp(`\\b${name}\\b`);
      const consumed = [...corpus.entries()].some(([file, src]) => {
        if (file === rel) return false;
        return re.test(src);
      });
      if (!consumed) dead.push(`${rel}: ${name}`);
    }
  }
  expect(
    dead,
    "ui-module exports with zero consumers anywhere (production, tests, scripts) — retire them; a re-export nobody imports is the F-5 class (WH-4 pinned module liveness, WH-7 the lib value surface; this pin walks the ui export blocks)",
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

// ---- WH-9: the component-prop + theme-store member liveness censuses ----------
//
// WH-9 found the two classes the WH-8 pins do not reach: a component's
// ACCEPTED PROPS (the ui-export census sees export names, the value
// census sees exported values — neither sees the surface between them;
// the dead `underline` default arm hid inside tabs for eight rounds
// behind a live prop) and the theme store's members (the WH-8 store
// census walks WellnessState only; ThemeState was never read).
//
// The findings this round retired: tabs' `variant` (the union's only
// live value was `segmented` — the Profile strip is the sole call site;
// a one-value prop carries no information), SectionCard.bodyClassName,
// EmptyState.title, OptionChip.className, SidebarNav/SidebarFooter's
// onNavigate (the "rendered inside BOTH" drawer sharing never existed —
// the drawer has carried its own sheet-styled nav since the build), and
// the theme store's `reset` (zero call sites; the reference's
// Appearance tab carries no reset surface — live-verified this round).
//
// Design (the api-export-surface doctrine): each audited component's
// DESTRUCTURED prop list is extracted from its signature and asserted
// EQUAL to the pinned literal — drift trips in either direction (a
// re-added dead prop fails the equality; a consciously added live one
// forces this pin's literal update in the same commit). The spread tail
// (`...props`) is dropped: a passthrough is the primitive's own API,
// not an invented prop. Known boundary (documented, accepted): fields
// nested inside a prop's TYPE (the tabs item's former `count`) are not
// destructure-level surface and ride no census — the next round widens
// if a finding lands in that gap. The theme census mirrors the WH-8
// wellness design: extraction from the CURRENT interface on every run,
// so a re-added dead member fails at its next execution.

/** The audited components (the round's sweep set) and their pinned live
 * prop surfaces — the extraction sorts before comparing, so these lists
 * are sorted too. */
const PROPPED_COMPONENTS: Record<string, string[]> = {
  "src/components/ui/tabs.tsx:Tabs": [
    "children",
    "className",
    "cols",
    "onValueChange",
    "tabs",
    "value",
  ],
  "src/components/ui/tabs.tsx:TabsPanel": ["children", "className", "tab"],
  "src/components/shared/page-parts.tsx:PageHeader": ["actions", "subtitle", "theme", "title"],
  "src/components/shared/page-parts.tsx:GradientButton": ["children", "gradient"],
  "src/components/shared/page-parts.tsx:SectionCard": ["action", "children", "icon", "title"],
  // WH-23: EmptyState's `icon` prop retired with the icon chip — the
  // reference's empty states are a bare centered paragraph (probed:
  // `<p class="text-center text-gray-500 py-12">`, no chip).
  "src/components/shared/page-parts.tsx:EmptyState": ["hint"],
  "src/components/shared/page-parts.tsx:OptionChip": ["icon", "label", "text", "tint"],
  "src/components/shared/page-parts.tsx:LoadingBlock": ["label"],
  "src/components/layout/sidebar.tsx:SidebarNav": [],
  "src/components/layout/sidebar.tsx:SidebarFooter": [],
};

it("WH-9: each audited component's destructured props equal the pinned live surface", () => {
  const mismatches: string[] = [];
  for (const [key, pinned] of Object.entries(PROPPED_COMPONENTS)) {
    const at = key.lastIndexOf(":");
    const rel = key.slice(0, at);
    const comp = key.slice(at + 1);
    const src = readFileSync(join(REPO_ROOT, rel), "utf8");
    const sig = src.match(new RegExp(`function ${comp}\\(([^)]*)\\)`));
    if (!sig) {
      mismatches.push(`${rel}: ${comp} — function signature not found`);
      continue;
    }
    // The param list is either empty (a prop-less component — SidebarNav
    // post-surgery) or a `{ destructure }` (possibly followed by a type
    // annotation whose own braces/arrows are cut by the first-} rule: the
    // destructure always closes first).
    const destructure = sig[1].match(/^\{([^}]*)\}/);
    const extracted = (destructure ? destructure[1] : "")
      .split(",")
      .map((raw) => raw.trim().split(":")[0].split("=")[0].trim())
      .filter((name) => /^\w+$/.test(name))
      .sort();
    const want = [...pinned].sort();
    if (JSON.stringify(extracted) !== JSON.stringify(want)) {
      mismatches.push(
        `${rel}: ${comp} — extracted [${extracted.join(", ")}] vs pinned [${want.join(", ")}]`,
      );
    }
  }
  expect(
    mismatches,
    "component prop surfaces that drifted from the pinned live set — a prop with no live consumer is the WH-9 F-2 class: retire it, or add it consciously by flipping this pin's literal in the same commit",
  ).toEqual([]);
});

it("WH-9: every ThemeState member is consumed at a useThemeStore call site", () => {
  const storePath = join(REPO_ROOT, "src", "stores", "theme-store.ts");
  const storeSrc = readFileSync(storePath, "utf8");
  const iface = storeSrc.match(/interface ThemeState \{([\s\S]*?)\n\}/);
  if (!iface) throw new Error("ThemeState interface not found");
  const body = iface[1].replace(/\/\/[^\n]*/g, "");
  const members = [...body.matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1]);
  // The interface parses (state fields + actions; comments stripped).
  expect(members.length).toBeGreaterThanOrEqual(10);

  // The consumed set, per the WH-8 wellness design: the selector form
  // (`useThemeStore((s) => s.x)`) and the whole-store form (the assigned
  // variable at `const theme = useThemeStore()` then `theme.x` accesses)
  // in production files outside the store itself. Tests stay OUT (the
  // WH-4 doctrine: tests pin modules, they do not keep them alive).
  const consumed = new Set<string>();
  const files: string[] = [];
  collect(join(REPO_ROOT, "src"), files, [".ts", ".tsx"]);
  for (const file of files) {
    if (file === storePath) continue;
    const src = readFileSync(file, "utf8");
    if (!src.includes("useThemeStore")) continue;
    for (const m of src.matchAll(
      /useThemeStore\s*\(\s*\(\s*(\w+)\s*\)\s*=>\s*([^\n)]*)/g,
    )) {
      for (const acc of m[2].matchAll(new RegExp(`\\b${m[1]}\\.(\\w+)`, "g"))) {
        consumed.add(acc[1]);
      }
    }
    for (const m of src.matchAll(/const (\w+) = useThemeStore\(\)/g)) {
      for (const acc of src.matchAll(new RegExp(`\\b${m[1]}\\.(\\w+)`, "g"))) {
        consumed.add(acc[1]);
      }
    }
  }

  const dead = members.filter((m) => !consumed.has(m));
  expect(
    dead,
    "ThemeState members with zero production consumers at useThemeStore call sites — retire them (a dead store member is drift liability; the reference's Appearance tab carries no reset surface, live-verified at WH-9)",
  ).toEqual([]);
});

// ---- WH-11: the exported-TYPE liveness census --------------------------------
//
// WH-11 found the TYPE-declaration surface (`export type` / `export
// interface`) was never censused: every earlier pin reads value
// declarations (`export function/const`), export-block NAMES, destructured
// props, or member accesses — the WH-7 value census's regex sees only
// `^export (?:async )?function|^export const`, so a hand-written domain
// interface with ZERO consumers (UserPrefs — the orphan of WH-8's
// store-slice retirement) and twenty same-module-only exported types
// (consumed exclusively inside their own modules; the WH-8 data-feed
// class in type form) sailed through five census-extension rounds.
//
// Design (two load-bearing rules):
//   1. WHOLE-TREE walk — the declaration surface is EVERY ts/tsx under
//      src/, not a fixed module list. The value census needs its fixed
//      list because `export const/function` appears in route files as
//      framework-contract surface (handlers, `dynamic`, config exports);
//      the TYPE surface has no such contracts (nothing in the App Router
//      requires an exported type from a route/page/layout file), so the
//      walk has zero false positives and a NEW module exporting types is
//      covered at birth — the exact blind-spot class this check cures.
//   2. The pin's OWN TEXT is excluded from the consumer corpus (the
//      WH-7 SELF rule, load-bearing here: this file names WellnessState,
//      ThemeState and the api envelope trio in its own machinery — a
//      census that counts its own narration as consumption guards
//      nothing; the audit's first pass hid five offenders behind exactly
//      that miscount).
//
// The liveness rule mirrors the value census: an exported type must be
// referenced in a corpus file OTHER than its declaring module (src +
// tests + scripts + prisma). A type consumed only in-module is private
// machinery — the cure drops the `export` keyword and keeps the
// declaration (the WH-8 doctrine's type form).

it("WH-11: every exported type in src has a consumer outside its own module", () => {
  const corpusFiles: string[] = [];
  collect(join(REPO_ROOT, "src"), corpusFiles, [".ts", ".tsx"]);
  collect(join(REPO_ROOT, "tests"), corpusFiles, [".ts", ".tsx"]);
  collect(join(REPO_ROOT, "scripts"), corpusFiles, [".ts"]);
  collect(join(REPO_ROOT, "prisma"), corpusFiles, [".ts"]);
  const SELF = "tests/src-census.test.ts";
  const corpus = new Map<string, string>();
  for (const file of corpusFiles) {
    const key = file.replace(REPO_ROOT + "/", "");
    if (key === SELF) continue;
    corpus.set(key, readFileSync(file, "utf8"));
  }

  // The declaration surface: every ts/tsx file under src/ (whole tree).
  const srcFiles: string[] = [];
  collect(join(REPO_ROOT, "src"), srcFiles, [".ts", ".tsx"]);
  const dead: string[] = [];
  for (const file of srcFiles) {
    const mod = file.replace(REPO_ROOT + "/", "");
    const text = corpus.get(mod);
    if (!text) throw new Error(`census module missing: ${mod}`);
    for (const m of text.matchAll(/^export (?:type|interface) (\w+)/gm)) {
      const name = m[1];
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
    "exported types with zero consumers outside their own module — the F-1/F-2 class: a fully-unreferenced declaration retires; a same-module-only type cures by dropping the `export` keyword, keeping the declaration",
  ).toEqual([]);
});

// ---- WH-12: the JSX pass-site prop-liveness census --------------------------
//
// WH-12 found the class the WH-9 prop census cannot see: the WH-9 pin is
// a SURFACE pin (each audited component's destructure == the pinned
// literal — drift trips in either direction of the SHAPE), not a
// LIVENESS pin. GradientButton.className sat pinned as live surface for
// three rounds while zero of the 17 call sites ever passed it, and
// Checkbox carried four invented props (className/defaultChecked/label/
// id) feeding an uncontrolled arm + a label-render arm that no call site
// ever exercised. A surface pin is not a liveness pin — this census pins
// the PASS SITES: what callers actually write.
//
// Design (four rules, each load-bearing):
//   1. WHOLE-TREE walk — every component definition under src/ (function
//      + const-arrow destructure forms, PascalCase). No fixed list: a new
//      component's props are covered at birth (the WH-11 lesson).
//   2. Same-module call sites COUNT — an internal render site (DrawerNav
//      inside mobile-nav) is a live passer. A prop is surface RENDERED;
//      an export is surface IMPORTED — different liveness verbs than the
//      export corpora, which exclude the declaring module.
//   3. The stock-API boundary (Session-71's own doctrine, explicit): the
//      L-71d4 hideClose retirement justified itself as "not stock
//      shadcn" — the corollary is that byte-stock shadcn SIGNATURES keep
//      their shape. STOCK_ALLOWLIST pins the never-customized stock
//      wrapper props per file:Component (a conscious keep; flip the
//      literal in the same commit to add one). Invented surface — the
//      hand-rolled GradientButton/Checkbox class — needs live passers.
//   4. Next.js convention files are framework contract (the export-
//      default doctrine): layout/error/global-error/not-found/page/
//      loading/template receive their props from the framework renderer,
//      not from JSX in the tree — skipped by filename, so a future
//      convention file is covered without a list.
//
// Known boundary (documented): a `{...spread}` attribute on an element
// marks ALL of that component's props as passed (the conservative
// reading — the census never false-positives on a spread; it can only
// miss dead props hiding behind one). The tree has zero app-level
// spreads today (all six spread-attribute elements are the Radix
// wrappers' own {...props} internals); widen if a spread ever lands on
// an app component.

/** Byte-stock shadcn wrapper signatures — never-customized props that
 *  keep their shape (the L-71d4 doctrine boundary). */
const STOCK_ALLOWLIST: ReadonlyMap<string, readonly string[]> = new Map([
  ["src/components/ui/dialog.tsx:DialogOverlay", ["className"]],
  ["src/components/ui/dialog.tsx:DialogHeader", ["className"]],
  ["src/components/ui/dialog.tsx:DialogFooter", ["className"]],
  ["src/components/ui/dialog.tsx:DialogTitle", ["className"]],
  ["src/components/ui/dialog.tsx:DialogDescription", ["className"]],
  ["src/components/ui/select.tsx:SelectContent", ["className", "position"]],
  ["src/components/ui/select.tsx:SelectItem", ["className"]],
  ["src/components/ui/label.tsx:Label", ["className"]],
]);

/** Next.js convention files — framework-rendered props, not JSX passers. */
const CONVENTION_FILE =
  /^(?:.*\/)?(?:layout|error|global-error|not-found|page|loading|template)\.tsx$/;

/** Extract every JSX element's passed attribute names. Returns
 *  comp -> { attrs, spread } aggregated over every element for that
 *  component in the source (a spread attribute passes everything). */
function extractJsxPasses(source: string): Map<string, { attrs: Set<string>; spread: boolean }> {
  const passes = new Map<string, { attrs: Set<string>; spread: boolean }>();
  const re = /<([A-Z]\w*)/g;
  for (const open of source.matchAll(re)) {
    const comp = open[1];
    let i = open.index + open[0].length;
    let depth = 1;
    const attrs = new Set<string>();
    let spread = false;
    let token = "";
    const pushToken = () => {
      const name = token.trim().split("=")[0].trim();
      token = "";
      if (/^[a-zA-Z]\w*$/.test(name)) attrs.add(name);
    };
    while (i < source.length && depth > 0) {
      const ch = source[i];
      if (ch === "{") {
        if (/^\{\s*\.\.\./.test(source.slice(i))) spread = true;
        let braces = 1;
        i++;
        while (i < source.length && braces > 0) {
          if (source[i] === "{") braces++;
          else if (source[i] === "}") braces--;
          i++;
        }
        continue;
      }
      if (ch === '"') {
        i++;
        while (i < source.length && source[i] !== '"') i++;
        i++;
        continue;
      }
      if (ch === "'") {
        i++;
        while (i < source.length && source[i] !== "'") i++;
        i++;
        continue;
      }
      if (ch === "<") {
        depth++;
        i++;
        continue;
      }
      if (ch === ">") {
        depth--;
        i++;
        continue;
      }
      if (ch === "/" && source[i + 1] === ">") {
        depth -= 2;
        i += 2;
        continue;
      }
      if (/\s/.test(ch)) {
        pushToken();
        i++;
        continue;
      }
      token += ch;
      i++;
    }
    pushToken();
    const agg = passes.get(comp) ?? { attrs: new Set<string>(), spread: false };
    if (spread) agg.spread = true;
    for (const a of attrs) agg.attrs.add(a);
    passes.set(comp, agg);
  }
  return passes;
}

/** Parse a destructure list into prop names (defaults/renames/types
 *  stripped; rest elements dropped). */
function parseDestructure(raw: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of raw) {
    if ("([{".includes(ch)) depth++;
    if (")]}".includes(ch)) depth--;
    if (ch === "," && depth === 0) {
      parts.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur);
  return parts
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith("..."))
    .map((p) => p.split(":")[0].split("=")[0].trim())
    .filter((name) => /^\w+$/.test(name));
}

it("WH-12: every component's destructured props are passed at a JSX call site", () => {
  // The pass corpus: every ts/tsx under src/ (production JSX — same-module
  // sites count; tests pin behavior, they do not pass props in this tree).
  const srcFiles: string[] = [];
  collect(join(REPO_ROOT, "src"), srcFiles, [".ts", ".tsx"]);
  const corpus = srcFiles.map((f) => readFileSync(f, "utf8"));

  const passes = new Map<string, { attrs: Set<string>; spread: boolean }>();
  for (const src of corpus) {
    for (const [comp, agg] of extractJsxPasses(src)) {
      const total = passes.get(comp) ?? { attrs: new Set<string>(), spread: false };
      if (agg.spread) total.spread = true;
      for (const a of agg.attrs) total.attrs.add(a);
      passes.set(comp, total);
    }
  }

  const dead: string[] = [];
  for (const file of srcFiles) {
    const mod = file.replace(REPO_ROOT + "/", "");
    const src = readFileSync(file, "utf8");
    if (CONVENTION_FILE.test(mod)) continue; // framework-rendered props
    const defs: Array<{ name: string; raw: string }> = [
      ...src.matchAll(/function ([A-Z]\w*)\s*\(\s*\{([^}]*)\}/g),
    ].map((m) => ({ name: m[1], raw: m[2] }));
    for (const m of src.matchAll(/const ([A-Z]\w*)\s*=\s*\(\s*\{([^}]*)\}\s*\)/g)) {
      defs.push({ name: m[1], raw: m[2] });
    }
    for (const def of defs) {
      const stock = STOCK_ALLOWLIST.get(`${mod}:${def.name}`) ?? [];
      const passed = passes.get(def.name);
      for (const prop of parseDestructure(def.raw)) {
        if (prop === "children") continue; // JSX-nested, never an attribute
        if (stock.includes(prop)) continue; // byte-stock shadcn signature
        if (passed && (passed.spread || passed.attrs.has(prop))) continue;
        dead.push(`${mod}: ${def.name} — ${prop}`);
      }
    }
  }
  expect(
    dead,
    "component props with zero JSX pass sites — the WH-12 class: retire the prop (a param no caller ever passes is dead surface), or pass it consciously, or — if it is a byte-stock shadcn wrapper signature — flip the STOCK_ALLOWLIST literal in the same commit",
  ).toEqual([]);
});

it("WH-13: every schema field is consumed at a READ site (writes do not keep a column alive)", () => {
  // The DATA-LAYER census — the surface no earlier pin reads: a Prisma
  // column can be written at a route seam (or filled by a db default),
  // declared on the payload wire, and read by nobody — the completedAt
  // quartet + Tutorial.views rode twelve/thirteen rounds through five
  // census extensions. The consumption verb for a COLUMN is the READ:
  //  (a) any non-comment occurrence in a .tsx (the component/store read
  //      layer — the strongest signal; components never write columns),
  //  (b) a `.field` member access in any corpus file,
  //  (c) a prisma query-context line (select/where/orderBy/include)
  //      carrying the field key.
  // Write expressions (data-object keys), payload-type declarations,
  // comments (incl. JSX `{/*` blocks) and tests do NOT count — the WH-8
  // write-only doctrine's column form.
  // Corpus: src/**.ts(.tsx) + prisma/seed.ts, every *.test.ts excluded —
  // the WH-7 tests-don't-keep-alive rule, which satisfies the WH-11 SELF
  // rule structurally (this pin cannot consume its own narration).
  // Exempt: `@updatedAt` — the stock-schema boundary (Prisma-managed audit
  // columns keep their shape; the WH-12 stock-API doctrine's schema form:
  // the boundary is the DIRECTIVE, not the name or nullability — an
  // undirected column is invented surface and needs live readers).
  // Known boundary (the WH-9 doctrine): the test is NAME-global, not
  // per-model — a field name shared by several models passes if any
  // model's usage reads it; common-word fields can false-pass via
  // className strings. Widen when a finding lands in the gap.
  // Parity keeps (the WH-12 STOCK_ALLOWLIST's schema mechanism — a
  // conscious keep, flipped in the same commit as any change): fields the
  // REFERENCE's own entity carries even though neither UI displays them.
  // WH-13: Tutorial.views — verified live this round via the reference's
  // entity API (HAR probe: `entities/Tutorial` returns views:0 on all 12
  // tutorials, its UI never shows it) — intentional data-model parity, the
  // Watch-Video-placeholder doctrine's data form.
  const SCHEMA_PARITY_KEEPS = new Set(["Tutorial: views"]);
  const srcFiles: string[] = [];
  collect(join(REPO_ROOT, "src"), srcFiles, [".ts", ".tsx"]);
  const corpus: Array<{ lines: string[]; isTsx: boolean }> = [];
  const seedPath = join(REPO_ROOT, "prisma/seed.ts");
  for (const f of srcFiles) {
    if (f.endsWith(".test.ts")) continue; // tests pin; they do not keep alive
    corpus.push({ lines: readFileSync(f, "utf8").split("\n"), isTsx: f.endsWith(".tsx") });
  }
  corpus.push({ lines: readFileSync(seedPath, "utf8").split("\n"), isTsx: false });

  const schema = readFileSync(join(REPO_ROOT, "prisma/schema.prisma"), "utf8");
  const QUERY_CTX = /select|where|orderBy|include/;
  const isComment = (l: string) => {
    const t = l.trim();
    return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || t.startsWith("{/*");
  };

  const readSites = (field: string): number => {
    let n = 0;
    for (const e of corpus) {
      for (const line of e.lines) {
        if (isComment(line)) continue;
        if (!new RegExp(`\\b${field}\\b`).test(line)) continue;
        if (
          e.isTsx ||
          new RegExp(`\\.${field}\\b`).test(line) ||
          (QUERY_CTX.test(line) && new RegExp(`\\b${field}\\s*:`).test(line))
        )
          n++;
      }
    }
    return n;
  };

  const dead: string[] = [];
  const blocks = schema.split(/^model\s+(\w+)\s*\{/m);
  for (let i = 1; i < blocks.length; i += 2) {
    const model = blocks[i];
    const body = blocks[i + 1].split("\n}")[0];
    for (const line of body.split("\n")) {
      if (!/^\s{2}\w+\s+(String|Int|Boolean|DateTime|Json|Float)/.test(line)) continue;
      if (/@updatedAt/.test(line)) continue; // stock Prisma audit column
      const field = line.trim().split(/\s+/)[0];
      if (SCHEMA_PARITY_KEEPS.has(`${model}: ${field}`)) continue; // reference-mirrored
      if (readSites(field) === 0) dead.push(`${model}: ${field}`);
    }
  }
  expect(
    dead,
    "schema fields with zero READ sites — the WH-13 class: a column written at a seam (or default-filled) and read by nobody is dead surface (drop it with its writes and wire members in the same commit), or read it consciously",
  ).toEqual([]);
});

it("WH-14: every @theme token is consumed (a utility hit or a var() read — declarations, overrides and runtime writes do not keep a token alive)", () => {
  // The DESIGN-SYSTEM census — the surface no earlier pin reads: an
  // @theme token can be declared, overridden in .dark, even WRITTEN at
  // runtime by the theme store (setProperty), and read by nobody —
  // --color-sidebar-accent-foreground was written on every preset apply
  // for fourteen rounds while no utility or var() ever read it. The
  // consumption verb for a TOKEN is the UTILITY (a class string in app
  // source carrying <prefix><name>: text-amber-600, bg-sidebar,
  // rounded-xl, shadow-sm, backdrop-blur-sm…) or the var() READ (the
  // globals body rules read --color-foreground/--color-line/
  // --color-ring/--font-sans; the mental-health slider reads
  // --color-primary via accent-[var(--color-primary)]).
  // NOT consumption: the @theme declaration itself, a .dark override (an
  // override of a dead token is dead weight of the second order — folded
  // in below), a setProperty WRITE (the WH-8 doctrine's token form), or
  // presence in the COMPILED css — the compiled stylesheet carries every
  // declared token's name in its :root dump AND every class string any
  // tracked file mentions (the markdown-scan pollution the WH-14 @source
  // pin stops); the compiled sheet is not a liveness oracle.
  // Keyframes inside @theme must belong to a live --animate-* token
  // (they die with their tokens — the WH-14 fade-in/slide-in-right pair).
  const gcssPath = join(REPO_ROOT, "src/app/globals.css");
  const gcss = readFileSync(gcssPath, "utf8");

  // --- extract @theme blocks (brace-balanced) and their tokens ---
  const themeTokens = new Map<string, string>();
  for (const m of gcss.matchAll(/@theme\s*(?:inline)?\s*\{/g)) {
    let depth = 1;
    let end = m.index! + m[0].length;
    while (depth > 0 && end < gcss.length) {
      if (gcss[end] === "{") depth++;
      else if (gcss[end] === "}") depth--;
      end++;
    }
    const body = gcss.slice(m.index! + m[0].length, end - 1);
    for (const t of body.matchAll(/(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g)) {
      themeTokens.set(t[1], t[2].trim());
    }
  }
  expect(themeTokens.size).toBeGreaterThan(50); // the walk found the block

  // --- the app-source class-token corpus (src minus globals.css, no tests) ---
  const classTokens = new Set<string>();
  const utilitySources: Array<{ text: string }> = [];
  const srcFiles2: string[] = [];
  collect(join(REPO_ROOT, "src"), srcFiles2, [".ts", ".tsx"]);
  for (const f of srcFiles2) {
    if (f.endsWith(".test.ts") || f === gcssPath) continue;
    const text = readFileSync(f, "utf8");
    utilitySources.push({ text });
    for (const m of text.matchAll(/"([^"\n]*)"/g)) {
      for (const tok of m[1].split(/\s+/)) if (tok) classTokens.add(tok);
    }
  }
  const classBlob = [...classTokens].join(" ");

  // --- var() reads in app source (globals base rules included, @theme
  //     declarations excluded by construction: the map's own values are
  //     not read here) ---
  let varReads = new Set<string>();
  for (const s of utilitySources) {
    for (const m of s.text.matchAll(/var\((--[a-zA-Z0-9-]+)\)/g)) varReads.add(m[1]);
  }
  const gcssNoTheme = gcss.replace(/@theme\s*(?:inline)?\s*\{[\s\S]*?\n\}/g, "");
  for (const m of gcssNoTheme.matchAll(/var\((--[a-zA-Z0-9-]+)\)/g)) varReads.add(m[1]);

  const UTILITY_PREFIXES: Record<string, string[]> = {
    color: [
      "text-", "bg-", "border-", "ring-", "from-", "to-", "via-", "fill-",
      "stroke-", "outline-", "decoration-", "divide-", "accent-", "caret-",
      "shadow-", "inset-shadow-", "inset-ring-",
    ],
    radius: ["rounded-"],
    animate: ["animate-"],
    shadow: ["shadow-"],
    blur: ["blur-", "backdrop-blur-"],
    font: ["font-"],
  };

  const dead: string[] = [];
  for (const [tok] of themeTokens) {
    if (varReads.has(tok)) continue;
    const ns = tok.slice(2).split("-")[0];
    const name = tok.slice(2 + ns.length + 1);
    const prefixes = UTILITY_PREFIXES[ns] ?? [];
    const used = prefixes.some((p) => classBlob.includes(p + name));
    if (!used) dead.push(tok);
  }

  // --- .dark overrides must all reference live @theme tokens ---
  const darkBlock = gcss.match(/\.dark\s*\{([\s\S]*?)\n\s*\}/);
  const darkOverrides = darkBlock
    ? [...darkBlock[1].matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)].map((m) => m[1])
    : [];
  for (const key of darkOverrides) {
    if (!themeTokens.has(key)) dead.push(`.dark override of non-token: ${key}`);
    else if (dead.includes(key)) dead.push(`.dark override of dead token: ${key}`);
  }

  // --- keyframes inside @theme must belong to a live --animate-* token ---
  const animateRefs = new Set<string>();
  for (const [tok, val] of themeTokens) {
    if (tok.startsWith("--animate-") && !dead.includes(tok)) {
      for (const m of val.matchAll(/([a-zA-Z0-9-]+)\s+[\d.]+s/g)) animateRefs.add(m[1]);
    }
  }
  for (const m of gcss.matchAll(/@keyframes\s+([a-zA-Z0-9-]+)\s*\{/g)) {
    if (!animateRefs.has(m[1])) dead.push(`orphan @keyframes in @theme: ${m[1]}`);
  }

  expect(
    dead,
    "@theme tokens with zero consumers — the WH-14 class: a token declared (or overridden, or even written at runtime) and read by nobody is dead design weight (drop it with its .dark override, its keyframes and its setProperty write in the same commit), or consume it consciously",
  ).toEqual([]);
});

it("WH-14: the Tailwind source scan is pinned (the @source not directives — tracked markdown must not compile into the stylesheet)", () => {
  // Tailwind v4's automatic content detection scans EVERY tracked file —
  // before WH-14 the operator's skills/ catalog (373 skills), docs/ and
  // the root .md corpus compiled 1,013 of 1,419 selectors (71% of
  // 160,639 bytes) of markdown-born dead weight into the production
  // stylesheet. The three exclusion directives pin the scan to authored
  // surfaces. Structural pin, the lockfile-resolution pin's config form:
  // if these lines are removed the census trips in the same run.
  const gcss = readFileSync(join(REPO_ROOT, "src/app/globals.css"), "utf8");
  const required = [
    '@source not "../../skills";',
    '@source not "../../docs";',
    '@source not "../**/*.md";',
  ];
  const missing = required.filter((line) => !gcss.includes(line));
  expect(
    missing,
    "the @source not directives are gone from globals.css — without them the tracked markdown corpus compiles back into the production stylesheet (the WH-14 71%-dead-weight class); remove an exclusion only together with this pin, in the same commit",
  ).toEqual([]);
});

it("WH-14: every used palette pair is pinned to its v3 value (the session-88 contract, both directions)", () => {
  // The session-88 palette block's own documented contract: "every
  // literal (family, step) pair used in src/ is re-pinned to its v3
  // value." WH-14 found the contract violated in both directions: 44
  // pinned pairs with zero usage (dead weight — retired by the token
  // census above) and 19 USED pairs riding the v4 re-derived defaults
  // (a live-probed drift: the reference's own compiled stylesheet
  // computes the v3 values — e.g. teal-600 rgb(13 148 136) vs our
  // unpinned #009588). This check pins the completion direction: a used
  // pair without a @theme pin trips here. Together with the token
  // census (a pinned pair without usage trips there), the pins⇔usage
  // equivalence is enforced in BOTH directions.
  const PALETTE_FAMILIES = new Set([
    "amber", "blue", "cyan", "emerald", "fuchsia", "gray", "green",
    "indigo", "lime", "neutral", "orange", "pink", "purple", "red",
    "rose", "sky", "slate", "stone", "teal", "violet", "yellow", "zinc",
  ]);
  const gcss = readFileSync(join(REPO_ROOT, "src/app/globals.css"), "utf8");
  const pinned = new Set(
    [...gcss.matchAll(/--color-([a-z]+-\d+):\s*#[0-9a-fA-F]+/g)].map((m) => m[1]),
  );

  // the app-source class-token corpus (same extraction as the token census)
  const gcssPath = join(REPO_ROOT, "src/app/globals.css");
  const classTokens = new Set<string>();
  const srcFiles3: string[] = [];
  collect(join(REPO_ROOT, "src"), srcFiles3, [".ts", ".tsx"]);
  for (const f of srcFiles3) {
    if (f.endsWith(".test.ts") || f === gcssPath) continue;
    const text = readFileSync(f, "utf8");
    for (const m of text.matchAll(/"([^"\n]*)"/g)) {
      for (const tok of m[1].split(/\s+/)) if (tok) classTokens.add(tok);
    }
  }

  const used = new Set<string>();
  for (const tok of classTokens) {
    for (const seg of tok.split(/(?:::|:)/)) {
      // strip variants is unnecessary — the seg split above handles the
      // colon form; match the utility-prefixed palette pair directly
      const m = seg.match(
        /^(?:text|bg|border|ring|from|to|via|fill|stroke|outline|decoration|divide|accent|caret|shadow|inset-ring)-([a-z]+-\d+)(?:\/\d+)?$/,
      );
      if (m && PALETTE_FAMILIES.has(m[1].split("-")[0])) used.add(m[1]);
    }
  }

  const unpinned = [...used].filter((p) => !pinned.has(p)).sort();
  expect(
    unpinned,
    "used palette pairs without a v3 @theme pin — the WH-14 pin-gap class: the surface computes the v4 re-derived default instead of the reference's own v3 value (add the pin in the session-88 block, in the same commit as the usage)",
  ).toEqual([]);
});

it("WH-15: the page-theme census — the 11 module pages carry their per-module identity (the reference's 2026-10-30 redesign)", () => {
  // The reference redeployed between WH-14 and WH-15 (its stylesheet
  // moved index-eZhxKCJC.css → index-heGLHP2e.css) with a per-module
  // gradient identity: every page carries module-specific H1 gradients,
  // primary-button pairs, page-root washes and containers — probed live
  // on all 11 pages (computed background-image + element geometry). The
  // MODULE pairs are FIXED palette classes, not theme tokens (verified:
  // applying the reference's Ocean Blue preset re-skinned its brand
  // surfaces to sky/cyan while the Exercise button stayed orange→red).
  // This census pins the map: PAGE_THEMES covers exactly the 11 live
  // modules, every module page consumes its theme, every palette pair
  // the map carries is pinned in @theme, and the routines
  // category-gradient map covers exactly the 7 seed categories.
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");

  const THEMES_BLOCK = layoutSrc.match(
    /export const PAGE_THEMES[^=]*= \{([\s\S]*?)\n\};/,
  );
  expect(THEMES_BLOCK, "PAGE_THEMES must exist in page-layout.ts (the WH-15 redesign contract)").toBeTruthy();
  const themeKeys = [...THEMES_BLOCK![1].matchAll(/^  ([a-z]+): \{/gm)].map((m) => m[1]);

  const MODULES = [
    "dashboard", "routines", "exercise", "mentalhealth", "assignments",
    "events", "studyresources", "reminders", "learning", "goals", "profile",
  ];
  expect(themeKeys.sort(), "PAGE_THEMES must cover exactly the 11 live modules").toEqual([...MODULES].sort());

  // every module page consumes its theme
  const missing: string[] = [];
  for (const mod of MODULES) {
    const pageFile = join(REPO_ROOT, `src/app/(app)/${mod}/${mod}-page.tsx`);
    const src = readFileSync(pageFile, "utf8");
    if (!src.includes(`PAGE_THEMES.${mod}`)) missing.push(mod);
  }
  expect(
    missing,
    "module pages that do not consume their PAGE_THEMES entry — every page must reference PAGE_THEMES.<module> (the wash, the heading gradient, the container)",
  ).toEqual([]);

  // every palette pair in the map's class strings carries a @theme pin
  const gcss = readFileSync(join(REPO_ROOT, "src/app/globals.css"), "utf8");
  const pinned = new Set(
    [...gcss.matchAll(/--color-([a-z]+-\d+):\s*#[0-9a-fA-F]+/g)].map((m) => m[1]),
  );
  const PALETTE_PAIR = /(?:from|to|via)-([a-z]+-\d+)(?:\/\d+)?/g;
  const unpinnedPairs = new Set<string>();
  for (const m of THEMES_BLOCK![1].matchAll(/"([^"\n]*)"/g)) {
    for (const p of m[1].matchAll(PALETTE_PAIR)) {
      if (!pinned.has(p[1])) unpinnedPairs.add(p[1]);
    }
  }
  expect(
    [...unpinnedPairs].sort(),
    "PAGE_THEMES palette pairs without a v3 @theme pin — the theme's surfaces would compute the v4 re-derived defaults instead of the reference's own values (add the pins in the session-88 block)",
  ).toEqual([]);

  // the routines category-gradient map covers exactly the 7 seed categories
  const CAT_BLOCK = layoutSrc.match(
    /export const ROUTINE_CATEGORY_GRADIENTS[^=]*= \{([\s\S]*?)\n\};/,
  );
  expect(CAT_BLOCK, "ROUTINE_CATEGORY_GRADIENTS must exist in page-layout.ts (the reference's per-category card bars + buttons)").toBeTruthy();
  const catKeys = [...CAT_BLOCK![1].matchAll(/^  ([a-z_]+): /gm)].map((m) => m[1]);
  expect(catKeys.sort(), "the category-gradient map must cover exactly the 7 seed categories").toEqual(
    ["creative", "evening", "exercise", "morning", "productivity", "self_care", "study"].sort(),
  );
});

it("WH-15: the shell-contract census — the brand family rides the 135deg to-br angle, the rounded-2xl badge, the gradient active pill and the shell washes (the redesign's shell)", () => {
  // Probed live on the redeployed reference: the sidebar wordmark, the
  // mobile header title, the drawer title, the drawer active pill and
  // the footer avatars all render linear-gradient(135deg, …) — to-br —
  // (ours shipped to-r); the brand badge is rounded-2xl (16px, ours
  // rounded-xl); the DESKTOP active nav item is now the gradient pill
  // (white text on the 135deg brand gradient — ours was the
  // bg-primary/10 wash); and the app shell carries two washes (the root
  // from-slate-50 via-white to-slate-50, the sidebar from-white
  // via-gray-50 to-white — ours were solid tokens).
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const record = (name: string): string => {
    // the leading `\n  ` anchors the key at its record indentation — a
    // bare `title:` would also match inside `subtitle:` (the collision
    // the first version of this check hit on brandSubtitle).
    const m = layoutSrc.match(new RegExp(`\\n  ${name}:\\s*"([^"\\n]*)"`));
    return m ? m[1] : "";
  };

  const TO_BR = "bg-gradient-to-br from-primary to-secondary";
  expect(record("brandWordmark"), "the sidebar wordmark rides the 135deg to-br brand gradient").toContain(TO_BR);
  expect(record("brandBadge"), "the brand badge rides the to-br gradient").toContain(TO_BR);
  expect(record("brandBadge"), "the brand badge is rounded-2xl (the reference's 16px)").toContain("rounded-2xl");
  expect(record("title"), "the mobile header title rides the to-br brand gradient").toContain(TO_BR);
  expect(record("linkActive"), "the desktop active nav item is the gradient pill (white on to-br)").toContain(TO_BR);
  expect(record("linkActive"), "the gradient active pill carries white text").toContain("text-white");
  expect(record("footerAvatar"), "the drawer footer avatar rides the to-br brand gradient").toContain(TO_BR);

  expect(record("root"), "the app-root wash (from-slate-50 via-white to-slate-50 at to-br)").toContain(
    "bg-gradient-to-br from-slate-50 via-white to-slate-50",
  );
  expect(record("sidebar"), "the sidebar wash (from-white via-gray-50 to-white at to-br)").toContain(
    "bg-gradient-to-br from-white via-gray-50 to-white",
  );
});

it("WH-15: the login-monochrome census — the login accent/glow/badge ride the slate pairs (the redesign's login)", () => {
  // The reference's login went monochrome with the redesign: the card
  // accent bar from-slate-200 via-slate-300 to-slate-200 (ours was the
  // brand pair), the logo glow and the logo tile from-slate-200
  // to-slate-300. The logo itself became a hosted <img> — our Sprout
  // badge stays the documented stand-in; the GRADIENT surfaces are the
  // parity targets. The rest of the card (white/95, shadow-2xl, the
  // slate-900 submit, the Google outline) was verified unchanged.
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const record = (name: string): string => {
    const m = layoutSrc.match(new RegExp(`\\n  ${name}:\\s*"([^"\\n]*)"`));
    return m ? m[1] : "";
  };

  expect(record("accent"), "the login accent bar is the 3-stop slate pair").toContain(
    "bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200",
  );
  expect(record("logoGlow"), "the login logo glow is the slate pair").toContain(
    "bg-gradient-to-br from-slate-200 to-slate-300",
  );
  expect(record("logoBadge"), "the login logo badge tile is the slate pair").toContain(
    "bg-gradient-to-br from-slate-200 to-slate-300",
  );
});

it("WH-16: the hydration-suppression census — the theme store's pre-hydration write targets carry suppressHydrationWarning (the console-hygiene cure)", () => {
  // WH-16 (F-1/F-2): the theme store's onRehydrateStorage → applyTheme
  // runs at store-module init (app-shell imports it on every (app) route)
  // and writes client-only attributes onto the DOM before React hydrates
  // it: on <html> the style custom-property block (--color-primary/
  // --color-secondary/--color-primary-hover/--font-sans), the three data
  // attrs (data-card-style/data-animation/data-sidebar-style) and the
  // .dark class; on <main> the bgImageUrl style write. When the module
  // eval wins the race against hydration (observed live on the WH-16
  // cold-compile /learning load — the full React 19 diff tree named
  // exactly those four client-only attributes), React logs "A tree
  // hydrated but some attributes … didn't match. This won't be patched
  // up" — an unhandled console-error class the DOM-asserting gate could
  // never see. The canonical cure (the next-themes pattern — every theme
  // library that writes <html> pre-hydration ships it):
  // suppressHydrationWarning on the written elements. Element-scoped —
  // children keep their own hydration checks. The e2e twin (the
  // console-hygiene net in tests/e2e/shell.spec.ts) guards the whole
  // error class on the walked surfaces.
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/app/layout.tsx"), "utf8");
  const htmlTag = layoutSrc.match(/<html\s[^>]*>/)?.[0] ?? "";
  expect(
    htmlTag.includes("suppressHydrationWarning"),
    "src/app/layout.tsx's <html> must carry suppressHydrationWarning — the theme store writes style custom properties, three data attrs and the .dark class onto documentElement before hydration (the observed React 19 mismatch class)",
  ).toBe(true);

  const shellSrc = readFileSync(join(REPO_ROOT, "src/components/layout/app-shell.tsx"), "utf8");
  const mainTag = shellSrc.match(/<main\s[^>]*>/)?.[0] ?? "";
  expect(
    mainTag.includes("suppressHydrationWarning"),
    "app-shell.tsx's <main> must carry suppressHydrationWarning — applyTheme's bgImageUrl branch materializes a client-only style attribute on it before hydration (the same class one element down)",
  ).toBe(true);
});

it("WH-17: the chip-vocabulary census — every OptionMeta chip rides the reference's post-redesign -100/-700 system (the AA-passing Badge anatomy)", () => {
  // WH-17 (F-1): the chip vocabulary was "decoded live from the reference's
  // DOM" at BUILD time (2026-10-29) and never re-probed through the WH-15
  // redesign — the reference's chips moved to the shadcn Badge anatomy
  // (rounded-md border px-2.5 py-0.5 text-xs font-semibold — 6px radius,
  // 1px transparent border, no visible shadow/hover, computed-verified) with
  // bg-*-100 / text-*-700 pairs (ALL AA-passing: green 4.57, yellow 4.58,
  // blue 5.49, purple 5.92, emerald 4.84, pink 5.14), while ours rode the
  // stale rounded-full font-medium -50/-600 form (emerald 3.58:1, amber
  // 3.07:1 — every rendered chip failed WCAG AA). The three
  // reference-verified maps are pinned BYTE-EXACT (probed live this round):
  // Routines difficulty easy=green/moderate=yellow (NOT emerald/amber), the
  // Learning categories blue/pink/emerald/green/purple/orange (four of six
  // families differed from our stale map), and the Learning difficulties
  // UNTINTED (text-foreground — the reference renders no tint on them). The
  // unverifiable vocabularies (the empty-demo surfaces) keep our color
  // families at the same -100/-700 step. The e2e twin (the a11y net in
  // tests/e2e/a11y.spec.ts) asserts the RENDERED chips pass axe on the
  // walked surfaces; this census pins the vocabulary system structurally.
  const {
    WORKOUT_TYPES, WORKOUT_INTENSITIES, MOODS, ASSIGNMENT_PRIORITIES,
    EVENT_CATEGORIES, RESOURCE_TYPES, REMINDER_TYPES, REMINDER_REPEATS,
    GOAL_CATEGORIES, GOAL_FREQUENCIES, TEMPLATE_DIFFICULTIES,
    TUTORIAL_CATEGORIES, TUTORIAL_DIFFICULTIES,
  } = CHIP_VOCABULARIES;

  const vocabularies: Record<string, ChipMeta[]> = {
    WORKOUT_TYPES, WORKOUT_INTENSITIES, MOODS, ASSIGNMENT_PRIORITIES,
    EVENT_CATEGORIES, RESOURCE_TYPES, REMINDER_TYPES, REMINDER_REPEATS,
    GOAL_CATEGORIES, GOAL_FREQUENCIES, TEMPLATE_DIFFICULTIES,
    TUTORIAL_CATEGORIES, TUTORIAL_DIFFICULTIES,
  };

  // The system: -100 tints (or the neutral/transparent forms) with -700 texts.
  const tintRe = /^bg-(?:red|orange|amber|yellow|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|pink)-100$|^bg-gray-100$|^bg-transparent$/;
  const textRe = /^text-(?:red|orange|amber|yellow|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|pink)-700$|^text-gray-600$|^text-foreground$/;
  const offenders: string[] = [];
  for (const [name, entries] of Object.entries(vocabularies)) {
    for (const entry of entries) {
      if (!tintRe.test(entry.tint)) offenders.push(`${name}.${entry.value}.tint=${entry.tint}`);
      if (!textRe.test(entry.text)) offenders.push(`${name}.${entry.value}.text=${entry.text}`);
    }
  }
  expect(
    offenders,
    "every OptionMeta chip must ride the reference's -100/-700 system (bg-*-100|bg-gray-100|bg-transparent with text-*-700|text-gray-600|text-foreground) — the stale -50/-600 form failed WCAG AA on every rendered surface",
  ).toEqual([]);

  // The reference-verified maps, byte-exact (probed 2026-10-30).
  const pair = (tint: string, text: string): ChipMeta => ({ value: "", label: "", tint, text });
  const expectVocab = (actual: ChipMeta[], expected: Record<string, { tint: string; text: string }>, name: string) => {
    for (const entry of actual) {
      const want = expected[entry.value];
      if (!want) offenders.push(`${name}.${entry.value}: unexpected entry`);
      else if (entry.tint !== want.tint || entry.text !== want.text) {
        offenders.push(`${name}.${entry.value}: got ${entry.tint}/${entry.text}, want ${want.tint}/${want.text}`);
      }
    }
  };
  expectVocab(TEMPLATE_DIFFICULTIES, {
    easy: pair("bg-green-100", "text-green-700"),
    moderate: pair("bg-yellow-100", "text-yellow-700"),
  }, "TEMPLATE_DIFFICULTIES");
  expectVocab(TUTORIAL_CATEGORIES, {
    productivity: pair("bg-blue-100", "text-blue-700"),
    life_skills: pair("bg-pink-100", "text-pink-700"),
    mental_health: pair("bg-emerald-100", "text-emerald-700"),
    wellness: pair("bg-green-100", "text-green-700"),
    study_skills: pair("bg-purple-100", "text-purple-700"),
    exercise: pair("bg-orange-100", "text-orange-700"),
  }, "TUTORIAL_CATEGORIES");
  expectVocab(TUTORIAL_DIFFICULTIES, {
    beginner: pair("bg-transparent", "text-foreground"),
    intermediate: pair("bg-transparent", "text-foreground"),
  }, "TUTORIAL_DIFFICULTIES");
  expect(
    offenders,
    "the reference-verified chip maps (Routines difficulty green/yellow; Learning categories blue/pink/emerald/green/purple/orange; Learning difficulties UNTINTED) are parity contracts — probed live on the reference 2026-10-30",
  ).toEqual([]);

  // The anatomy: the OptionChip primitive renders the reference's Badge form.
  const chipSrc = readFileSync(join(REPO_ROOT, "src/components/shared/page-parts.tsx"), "utf8");
  const chipClass = chipSrc.match(/function OptionChip[\s\S]{0,900}?"([^"]*rounded[^"]*)"/)?.[1] ?? "";
  expect(chipClass.includes("rounded-md"), "the OptionChip shape is the reference's rounded-md (6px) — the stale rounded-full is the pre-redesign form").toBe(true);
  expect(chipClass.includes("font-semibold"), "the OptionChip weight is the reference's font-semibold (600) — the stale font-medium is the pre-redesign form").toBe(true);
  expect(chipClass.includes("border"), "the OptionChip carries the Badge's 1px (transparent) border — computed-verified on the reference").toBe(true);
  expect(chipClass.includes("rounded-full"), "the stale rounded-full form must not return").toBe(false);
});

it("WH-18: the dark-variant pin — globals.css declares the class-based dark variant (the dark-mode strategy cure)", () => {
  // WH-18 (F-1): the compiled production stylesheet wrapped EVERY dark:*
  // utility in @media (prefers-color-scheme:dark) — Tailwind v4's DEFAULT
  // dark variant — while the theme engine flips a .dark CLASS on <html>.
  // The two strategies never met: a mode=dark user got swapped tokens
  // (surface #18181b) with light text values (138 axe violation nodes
  // across 8 routes), and an OS-dark user in mode=light got gray-400 on
  // WHITE cards (2.54:1) — the media query firing without the class. The
  // 77-utility dark: vocabulary (the WH-15 page-root washes, the login
  // family's dark set, the WH-14 950 washes) was un-activatable by the
  // mode toggle through seventeen green rounds because every net, capture
  // and e2e walked light mode only (the rendered-STATES gap, WH-16/17's
  // error class one surface over: the console → the semantics → the
  // states). The declaration is the sixth Tailwind v4 pin (the canonical
  // class-based form, documented in the repo's own skills corpus —
  // skills/react19-vite-spa-fastify-drizzle-sqlite/SKILL.md); the e2e
  // twin (the dark-mode a11y net in tests/e2e/a11y.spec.ts) asserts the
  // RENDERED dark state passes axe; this census pins the strategy
  // structurally. Structural pin, the @source-not pin's form: if this
  // line is removed the census trips in the same run.
  const gcss = readFileSync(join(REPO_ROOT, "src/app/globals.css"), "utf8");
  expect(
    gcss.includes("@custom-variant dark (&:where(.dark, .dark *));"),
    "globals.css must declare the class-based dark variant — without it every dark:* utility compiles to the prefers-color-scheme media query (v4's default) and the .dark class flip the theme store performs can never activate them (the dark-mode round's root cause)",
  ).toBe(true);
});


it("WH-18: the ThemeBoot mount census — the root layout renders the theme boot so the login family carries the chosen mode", () => {
  // WH-18 (F-3): the theme store mounted only inside the (app) group
  // (AppShell + the Profile page) — /login, /signup and /reset-password
  // never loaded it, so the .dark class and the preset custom properties
  // never applied on the app's root face (live-verified: the class
  // vanished on /login mid-walk). The LOGIN_LAYOUT's authored dark
  // vocabulary (dark:bg-neutral-900/95, dark:from-neutral-900…) could
  // only ever fire on the OS preference — the wrong trigger. ThemeBoot is
  // the side-effect client component in the ROOT layout: the store's
  // persist middleware rehydrates synchronously from localStorage at
  // module init and applies the class + vars (the pre-hydration write
  // class WH-16 already suppressed on <html>/<main> — no new suppression
  // needed). The e2e twin (the dark-login check in a11y.spec.ts) asserts
  // the seeded dark state applies on /login; this census pins the mount
  // structurally.
  const bootPath = join(REPO_ROOT, "src/components/layout/theme-boot.tsx");
  expect(existsSync(bootPath), "src/components/layout/theme-boot.tsx must exist — the login-surface theme mount").toBe(true);
  const bootSrc = readFileSync(bootPath, "utf8");
  expect(
    bootSrc.includes("@/stores/theme-store"),
    "ThemeBoot must import the theme store — the persist middleware's rehydrate + applyTheme is the whole point",
  ).toBe(true);
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/app/layout.tsx"), "utf8");
  expect(
    /<ThemeBoot\s*\/>/.test(layoutSrc),
    "the root layout must render <ThemeBoot /> — without it the login/signup/reset surfaces ignore the user's chosen mode (the store only mounts inside the (app) group)",
  ).toBe(true);
});

it("WH-19: the dark-pair completeness census — every chromatic arm of the login-family records carries its dark twin (the dark-corners cure)", () => {
  // WH-19 (F-1): the WH-18 cure paired the surfaces the net WALKED —
  // but the walk set is a surface of its own. The records outside it
  // shipped with the same broken class: LOGIN_SIGNUP_LAYOUT's title
  // computed 1.0:1 on the dark card (an invisible "Create your
  // account"), LOGIN_LAYOUT.subtitle 3.77:1 on /login — with axe
  // FALSE-PASSING it (the alpha card over the page gradient returns
  // color-contrast incomplete, not a violation: the WH-18 dark-login
  // walk stayed green with a real AA failure on the page) — the sent
  // view, the verify view, and the whole 404 (a light island in dark:
  // its page root stays bg-slate-50). This census pins the INVARIANT,
  // not the instances (the WH-2 doctrine): every chromatic arm (a
  // color utility with its variant chain — hover:/focus:/placeholder:/
  // …) present in the light form of a member must be present in the
  // dark form of the SAME member, utility-type for utility-type. The
  // decorative members pair too (the accent hairline, the glow, the
  // badge tile, the input icons) — no exemptions: a blanket census is
  // structurally simpler than an exemption list that drifts. The
  // records walked: LOGIN_LAYOUT + NOT_FOUND_LAYOUT (page-layout.ts),
  // LOGIN_SIGNUP_LAYOUT + LOGIN_RESET_LAYOUT + LOGIN_VERIFY_LAYOUT
  // (login-reset.ts). The inline component sites (the sprout icon, the
  // state circles, the error callout) are pinned by the e2e twin — the
  // computed-contrast leg reads the RENDERED pages, which is the only
  // layer that can see an inline class.
  const FILES = {
    "src/lib/page-layout.ts": ["LOGIN_LAYOUT", "NOT_FOUND_LAYOUT"],
    "src/lib/login-reset.ts": ["LOGIN_SIGNUP_LAYOUT", "LOGIN_RESET_LAYOUT", "LOGIN_VERIFY_LAYOUT"],
  } as const;
  const CHROMA = "(?:white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)";
  // An arm = optional variant chain + utility family + a chromatic scale
  // value (or the white/black pair forms). Arms already dark-prefixed
  // are the dark twins themselves — skipped.
  const ARM = new RegExp(`((?:(?:hover|focus|focus-visible|active|disabled|placeholder|group-[a-z-]+|data-\\[[^\\]]+\\]):)*)(text|bg|border|from|via|to|ring|fill|stroke|outline|decoration|caret|accent|shadow)-(${CHROMA})(?:-\\d+)?`, "g");
  const failures: string[] = [];
  for (const [file, records] of Object.entries(FILES)) {
    const src = readFileSync(join(REPO_ROOT, file), "utf8");
    for (const rec of records) {
      const block = src.match(new RegExp(`export const ${rec} = \\{([\\s\\S]*?)\\} as const;`));
      expect(block, `${file}: the ${rec} record must exist (the census walks it)`).toBeTruthy();
      for (const m of block![1].matchAll(/(?:^|\n)\s*(\w+):\s*"([^"]*)"/g)) {
        const [, member, cls] = m;
        const arms = [...cls.matchAll(ARM)].map((a) => a[0]).filter((a) => !a.startsWith("dark:"));
        if (arms.length === 0) continue; // not a color-bearing member
        for (const arm of arms) {
          // The arm's (variants, utility) head, e.g. "hover:bg-" or "placeholder:text-".
          const head = arm.replace(new RegExp(`-(${CHROMA}).*$`), "-");
          const twin = new RegExp(`dark:${head.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:${CHROMA})`);
          if (!twin.test(cls)) {
            failures.push(`${file} ${rec}.${member}: "${arm}" has no dark twin (no ${`dark:${head}…`} in the member)`);
          }
        }
      }
    }
  }
  expect(
    failures,
    "every chromatic arm of the login-family records must carry its dark twin — the WH-19 dark-corners cure (the arm's variant chain and utility type must appear in dark: form in the same member)",
  ).toEqual([]);
});

it("WH-20: the interaction-arm dark-pair census — every palette hover:/focus: arm in the whole tree carries its dark twin", () => {
  // WH-20 (F-1..F-4): the WH-19 census pinned the login-family RECORDS'
  // pairing — but pairing is not contrast (the WH-19 dark twins included
  // a sub-3:1 ring: neutral-600 at 2.32:1 on the dark card, owned by the
  // interaction-contrast pin), and the surfaces OUTSIDE those records
  // shipped interaction arms with NO dark twin at all: the toast's
  // hover:text-neutral-900 rendered the hovered dismiss X at 1.05:1 on
  // the dark card (invisible exactly when the user aims at it), APP_FOOTER
  // was a white strip on every dark page, and nine module action buttons
  // painted red-50/emerald-50 light-island flashes on hover in dark. The
  // class: axe never hovers and never focuses — the interaction states
  // are the fourth assertion surface the gate never read (DOM → console
  // → semantics → interaction).
  //
  // The rule: every PALETTE-colored hover:/focus:/focus-visible: arm of
  // the ink/surface utility families (text|bg|border|ring|outline) in any
  // quoted class string anywhere under src/ must carry its dark:hover:/
  // dark:focus: sibling in the SAME string. Three structural exemptions,
  // written down so future audits re-litigate the rule, not instances:
  //   (a) TOKEN-REFERENCING ARMS are invisible to the palette regex by
  //       construction (hover:bg-line-soft, hover:bg-sidebar-hover,
  //       hover:text-foreground, hover:bg-primary-hover …) — the token
  //       flips in dark with the .dark override block; no twin needed.
  //   (b) THE BOTH-MODE LIGHT-GRAY FAMILY — gray-200/300/400 arms — the
  //       reference's own faint-affordance anatomy (the unchecked
  //       circle's gray-300 → hover gray-400): both steps are light
  //       values, visible on light AND dark surfaces alike; a dark twin
  //       would be churn, not information.
  //   (c) THE BLACK OVERLAY SCRIM — an arm matching hover:/focus:bg-black
  //       (any opacity) WITH a resting bg-black/… layer in the same
  //       string (the video-overlay anatomy: bg-black/30 →
  //       hover:bg-black/40 carrying text-white — the dialog overlay's
  //       interactive form). A black scrim is black in BOTH modes by
  //       construction; the white overlay ink rides the same scrim in
  //       dark. A dark twin would repaint the scrim, not adapt it — the
  //       exact class the learning/routines video overlays ship.
  // The gradient-stop utilities (from/via/to) stay OUT of the census: the
  // brand/module gradient families are mode-independent by design (the
  // WH-15 identity map — the same vivid stops ride both modes).
  const CHROMA = "(?:white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)";
  const ARM = new RegExp(
    `((?:(?:hover|focus-visible|focus):)+)(text|bg|border|ring|outline)-(${CHROMA})(?:-\\d+)?`,
    "g",
  );
  const BOTH_MODE_GRAYS = /^(?:hover|focus-visible|focus):(?:text|bg|border|ring|outline)-gray-(?:200|300|400)$/;
  // (c): the scrim's interactive arm, exempted ONLY when the string also
  // carries the resting layer — a bare hover:bg-black elsewhere (a button
  // face, not a scrim) still needs its twin.
  const SCRIM_ARM = /^(?:hover|focus-visible|focus):bg-black(?:\.\d+)?$/;
  const SCRIM_REST = /(?:^|\s)bg-black\/./;
  const failures: string[] = [];
  const files = readdirSync(join(REPO_ROOT, "src"), { recursive: true })
    .filter((f) => /\.(ts|tsx)$/.test(String(f)))
    .map((f) => join(REPO_ROOT, "src", String(f)));
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    // Strip line + block comments first (the WH-13 lesson: a census's
    // comment exemption must match the file type's comment FORMS).
    const stripped = src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    for (const m of stripped.matchAll(/"([^"\n]*)"|`([^`\n]*)`/g)) {
      const cls = m[1] ?? m[2] ?? "";
      if (!/(hover:|focus-visible:|focus:)/.test(cls)) continue;
      const arms = [...cls.matchAll(ARM)].map((a) => a[0]).filter((a) => !a.startsWith("dark:"));
      for (const arm of arms) {
        if (BOTH_MODE_GRAYS.test(arm)) continue;
        if (SCRIM_ARM.test(arm) && SCRIM_REST.test(cls)) continue;
        // The arm's (variants, utility) head, e.g. "hover:bg-".
        const head = arm.replace(new RegExp(`-(${CHROMA}).*$`), "-");
        const twin = new RegExp(`dark:${head.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:${CHROMA})`);
        if (!twin.test(cls)) {
          failures.push(`${relative(REPO_ROOT, file)}: "${arm}" has no dark twin (no ${`dark:${head}…`} in the same class string)`);
        }
      }
    }
  }
  expect(
    failures,
    "every palette-colored interaction arm (hover:/focus: text|bg|border|ring|outline) must carry its dark twin — the WH-20 interaction-states cure; token arms and the gray-200/300/400 both-mode family are the documented exemptions",
  ).toEqual([]);
});

it("WH-21: the form-modality census — the seven module create-forms are INLINE CARDS, not modal dialogs (the reference's modality)", () => {
  // WH-21 (F-2, the round's giant finding): the reference's module
  // create-forms are INLINE EXPANDING CARDS in the page flow — probed live
  // on its Events page (the form opens with ZERO dialog overlays; every
  // ancestor position:static; the card at top=136 directly below the page
  // header, `rounded-xl border bg-card text-card-foreground border-none
  // shadow-xl` + header `flex flex-col space-y-1.5 p-6` + content
  // `p-6 pt-0` + the footer `flex justify-end gap-3` inside the
  // `space-y-4`), and verified inline on all seven modules. Only the
  // Routines "Schedule" flow is a modal on the reference (probed:
  // `fixed inset-0 z-50 bg-black/80` + the fixed 50%/50% panel — the
  // exact anatomy our Routines page mirrors, which is why it is NOT in
  // this census's page set). Ours shipped the seven create-forms as 512px
  // Radix modal overlays through twenty rounds — the forms' CONTENT was
  // parity (every probe read the fields inside the opened overlay); the
  // DELIVERY MECHANISM never was. The census pins the invariant, two
  // checks per page: (1) no ui/dialog import may remain (the create-form
  // must not be a dialog), and (2) the inline card must ride the
  // FORM_CARD record from page-layout.ts (the probed anatomy, not ad-hoc
  // literals). mobile-nav (DialogOverlay) + app-shell (the drawer Root)
  // + routines (the Schedule modal) keep their dialog usage — the
  // reference's own modality split.
  const PAGES = [
    "src/app/(app)/assignments/assignments-page.tsx",
    "src/app/(app)/events/events-page.tsx",
    "src/app/(app)/exercise/exercise-page.tsx",
    "src/app/(app)/goals/goals-page.tsx",
    "src/app/(app)/mentalhealth/mentalhealth-page.tsx",
    "src/app/(app)/reminders/reminders-page.tsx",
    "src/app/(app)/studyresources/studyresources-page.tsx",
  ] as const;
  const failures: string[] = [];
  for (const page of PAGES) {
    const src = readFileSync(join(REPO_ROOT, page), "utf8");
    if (/from "@\/components\/ui\/dialog"/.test(src)) {
      failures.push(`${page}: still imports ui/dialog — the create-form must be the inline card, not a modal (the reference's modality; only the Routines Schedule flow is a dialog)`);
    }
    if (!/FORM_CARD/.test(src)) {
      failures.push(`${page}: the inline form card must ride the FORM_CARD record from page-layout.ts (the probed anatomy — rounded-xl border-none shadow-xl, the p-6 header, the p-6 pt-0 body)`);
    }
  }
  expect(
    failures,
    "the seven module create-forms must be inline expanding cards (no dialog import, the FORM_CARD record consumed) — the WH-21 form-modality cure",
  ).toEqual([]);
});

it("WH-22: the schedule-modal census — the Routines Schedule modal rides the reference's probed content anatomy (the never-probed modal's cure)", () => {
  // WH-22: the Routines "Schedule" flow is the reference's ONE modal (the
  // WH-21 modality find — its seven create-forms are inline cards, only
  // this flow is a dialog, and ours already mirrored the modality) — but
  // every prior round opened it to verify the MODALITY, never its CONTENT.
  // Probed field-by-field 2026-10-31 (two templates of different
  // categories — the module-vs-category question): the 672px width
  // (max-w-2xl), the title-only header (the description lives in a
  // purple→pink gradient-50 TILE with the Remember block nested as a
  // white/80 inset — NOT a DialogDescription), the steps as per-step
  // gray-50 tiles with SOLID purple-500 white-ink number circles (the
  // FIXED module pair — both templates render purple, never the category
  // gradient; the circle's white-on-purple 3.96:1 is reference-shared,
  // pinned by tests/gradient-ink.test.ts), the fields in a grid gap-4,
  // and the primary ALONE at w-full in the module pair (from-purple-500
  // to-pink-500 — NO Cancel button; the corner X is the dismiss). Ours
  // shipped: 512px, a DialogDescription, a bare preset-themeable
  // bg-primary/10 circle list, DIALOG_GROUP space-y-2 fields, and a
  // Cancel + BRAND-indigo GradientButton pair — every content member
  // deviating while the modality was parity.
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const rawPage = readFileSync(join(REPO_ROOT, "src/app/(app)/routines/routines-page.tsx"), "utf8");
  // Strip comments first (the WH-13 lesson): the page's own narration
  // names the retired members — a census must read CODE, not comments.
  const pageSrc = rawPage.replace(/\/[\*][\s\S]*?[\*]\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];

  // (a) the record exists with its probed members
  const REC = layoutSrc.match(/export const SCHEDULE_MODAL = \{([\s\S]*?)\} as const;/);
  expect(REC, "the SCHEDULE_MODAL record must exist in page-layout.ts (the probed content anatomy)").toBeTruthy();
  const MEMBERS: [string, string][] = [
    ["tile", "bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg"],
    ["tileDesc", "text-sm text-gray-700 mb-3"],
    ["remember", "bg-white/80 p-3 rounded-lg"],
    ["stepsLabel", "font-semibold mb-3"],
    ["stepsList", "space-y-2"],
    ["stepTile", "flex items-start gap-3 p-3 bg-gray-50 rounded-lg"],
    ["stepNum", "flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-semibold"],
    ["stepDuration", "text-xs text-gray-600"],
    ["stepDesc", "text-xs text-gray-500 mt-1"],
    ["fields", "grid gap-4"],
  ];
  for (const [member, expectCls] of MEMBERS) {
    const m = REC![1].match(new RegExp(`${member}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(expectCls)) {
      failures.push(`SCHEDULE_MODAL.${member} must carry the probed form "${expectCls}" (read "${m?.[1] ?? "—"}")`);
    }
  }
  // the button composes the module pair at w-full (the record's template
  // literal composes PAGE_THEMES.routines.button — the pair rides the map)
  const btn = REC![1].match(/button:\s*(?:"([^"]*)"|`([^`]*)`)/)?.[1] ?? REC![1].match(/button:\s*(?:\"([^\"]*)\"|`([^`]*)`)/)?.[2];
  const carriesPair = !!btn && (btn.includes("from-purple-500 to-pink-500") || btn.includes("${PAGE_THEMES.routines.button}"));
  if (!btn || !btn.includes("w-full") || !carriesPair) {
    failures.push(`SCHEDULE_MODAL.button must be the w-full module pair (read "${btn ?? "—"}")`);
  }
  // the dark superset twins on the tile/inks (the reference's light-only forms are its own broken-dark class)
  for (const [member, twin] of [["tile", "dark:to-neutral-900"], ["remember", "dark:bg-"], ["stepTile", "dark:bg-"], ["tileDesc", "dark:text-gray-400"], ["stepDuration", "dark:text-gray-400"], ["stepDesc", "dark:text-gray-400"]] as [string, string][]) {
    const m = REC![1].match(new RegExp(`${member}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(twin)) failures.push(`SCHEDULE_MODAL.${member} must carry its dark superset twin (${twin})`);
  }

  // (b) the page consumes the record
  if (!pageSrc.includes("SCHEDULE_MODAL")) failures.push("routines-page.tsx must consume the SCHEDULE_MODAL record");
  // (b2) the scroll cap — the reference's own (probed: maxHeight 90vh,
  // overflowY auto): without it the tall content pushes the primary below
  // the fold (caught live by the e2e leg's click timeout — the gate
  // finding the audit's gap)
  if (!rawPage.includes('max-w-2xl max-h-[90vh] overflow-y-auto')) {
    failures.push("the Schedule DialogContent must carry the reference's scroll cap (max-w-2xl max-h-[90vh] overflow-y-auto)");
  }
  // (c) NO Cancel in the schedule dialog — the reference ships the primary ALONE (the corner X is the dismiss)
  if (/Cancel/.test(pageSrc)) failures.push("routines-page.tsx must not ship a Cancel button in the Schedule modal (the reference's footer is the w-full primary alone)");
  // (d) the header is title-only — the description rides the gradient tile
  if (/DialogDescription/.test(pageSrc)) failures.push("the Schedule header must be title-only (the description lives in the gradient tile, not a DialogDescription)");
  // (e) the module pair lands in the theme map (the canonical home)
  const routinesBtn = layoutSrc.match(/routines: \{[\s\S]*?button: "([^"]*)"/)?.[1];
  if (!routinesBtn || !routinesBtn.includes("from-purple-500 to-pink-500")) {
    failures.push(`PAGE_THEMES.routines.button must carry the module pair (read "${routinesBtn ?? "—"}")`);
  }

  expect(
    failures,
    "the Schedule modal must ride the reference's probed content anatomy — the WH-22 cure (the one modal whose content was never probed)",
  ).toEqual([]);
});

it("WH-23: the card-geometry census — the dashboard + card family rides the reference's probed anatomy (the identity probe read COLOR, never GEOMETRY)", () => {
  // WH-23: the WH-15 redesign probes mapped every card family by its
  // COLORS (the washes, the gradient pairs) — and every later round
  // trusted the map. The geometry was never walked: the Quick Actions
  // grid ships 12px GAPS on the reference (not our border dividers),
  // the cells are fixed h-24 buttons whose hover family is an ICON
  // SCALE + a label lighten (never our bg wash + indigo icon), every
  // list card rides the CardHeader/CardContent anatomy (p-6, no
  // border-b, the icon INSIDE the title at inherited ink — not muted),
  // the dashboard stat tiles carry a relative p-6 content wrapper +
  // the justify-between icon row + the mb-1 rhythm, and the module KPI
  // tiles carry BIG w-12 h-12 module-tinted right icons ours never
  // shipped at all. Probed live 2026-10-31 (computed styles + DOM,
  // real pointer for the hover families, settled ≥400 ms).
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const partsSrc = readFileSync(join(REPO_ROOT, "src/components/shared/page-parts.tsx"), "utf8");
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];

  // (a) the QUICK_ACTIONS record — the probed anatomy + our dark twins
  const QA = layoutSrc.match(/export const QUICK_ACTIONS = \{([\s\S]*?)\} as const;/);
  expect(QA, "the QUICK_ACTIONS record must exist in page-layout.ts").toBeTruthy();
  const QA_MEMBERS: [string, string][] = [
    ["header", "flex flex-col space-y-1.5 p-6"],
    ["title", "font-semibold leading-none tracking-tight flex items-center gap-2"],
    ["body", "p-6 pt-0"],
    ["grid", "grid grid-cols-2 gap-3"],
    ["cell", "px-4 py-2 w-full h-24 flex flex-col items-center justify-center gap-2 border-none"],
    ["cell", "bg-opacity-5 hover:bg-opacity-10 transition-all group"],
    ["cell", "hover:text-neutral-900"],
    ["cell", "dark:hover:text-neutral-100"],
    ["icon", "h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform"],
    ["icon", "dark:text-gray-400"],
    ["label", "text-sm font-medium"],
  ];
  for (const [member, expectCls] of QA_MEMBERS) {
    const m = QA![1].match(new RegExp(`${member}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(expectCls)) {
      failures.push(`QUICK_ACTIONS.${member} must carry the probed form "${expectCls}" (read "${m?.[1] ?? "—"}")`);
    }
  }
  for (const [k, pair] of [
    ["exercise", "from-orange-500 to-red-500"],
    ["mentalhealth", "from-emerald-500 to-teal-500"],
    ["assignments", "from-blue-500 to-cyan-500"],
    ["events", "from-violet-500 to-purple-500"],
  ] as [string, string][]) {
    const m = QA![1].match(new RegExp(`${k}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(pair)) failures.push(`QUICK_ACTIONS.pairs.${k} must carry the module pair "${pair}" (read "${m?.[1] ?? "—"}")`);
  }

  // (b) the dashboard consumes the record; the divider + wash hover
  // families RETIRE (the reference ships gap-3 with NO dividers, NO bg
  // wash, NO indigo icon — its hover is the icon scale + label lighten)
  const dashRaw = readFileSync(join(REPO_ROOT, "src/app/(app)/dashboard/dashboard-page.tsx"), "utf8");
  const dashSrc = strip(dashRaw);
  if (!dashSrc.includes("QUICK_ACTIONS")) failures.push("dashboard-page.tsx must consume the QUICK_ACTIONS record");
  if (/border-r border-line|border-t border-line/.test(dashSrc)) {
    failures.push("the Quick Actions grid must ride the reference's gap-3 form — the border dividers retire (probed: grid grid-cols-2 gap-3, cells border-none)");
  }
  if (/group-hover:text-primary/.test(dashSrc)) {
    failures.push("the quick-action icon's hover must be the reference's SCALE family (group-hover:scale-110), never the indigo color flip (group-hover:text-primary)");
  }
  if (/hover:bg-line-soft/.test(dashSrc) && /QUICK_ACTIONS/.test(dashSrc) && new RegExp(`cell[^}]*hover:bg-line-soft`).test(dashSrc)) {
    failures.push("the quick-action cell must NOT carry a background wash on hover (probed: the reference's cell bg stays transparent)");
  }

  // (c) the MODULE_KPI record + the five pages' conversions
  const KPI = layoutSrc.match(/export const MODULE_KPI = \{([\s\S]*?)\} as const;/);
  expect(KPI, "the MODULE_KPI record must exist in page-layout.ts").toBeTruthy();
  const KPI_MEMBERS: [string, string][] = [
    ["hero", "rounded-xl border-none shadow-lg bg-gradient-to-br text-white"],
    ["wrap", "p-6 pt-6"],
    ["row", "flex items-center justify-between"],
    ["heroLabel", "text-sm mb-1"],
    ["label", "text-gray-600 text-sm mb-1"],
    ["label", "dark:text-gray-400"],
    ["heroValue", "text-4xl font-bold"],
    ["value", "text-4xl font-bold text-gray-900"],
    ["value", "dark:text-gray-100"],
    ["bigIcon", "h-12 w-12"],
  ];
  for (const [member, expectCls] of KPI_MEMBERS) {
    const m = KPI![1].match(new RegExp(`${member}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(expectCls)) {
      failures.push(`MODULE_KPI.${member} must carry the probed form "${expectCls}" (read "${m?.[1] ?? "—"}")`);
    }
  }
  const KPI_PAGES: [string, string[], string[]][] = [
    ["exercise", ["Dumbbell", "Clock", "Flame"], ["text-orange-100", "text-orange-500", "text-red-500"]],
    ["mentalhealth", ["Heart", "TrendingUp", "Smile"], ["text-emerald-100", "text-emerald-500", "text-yellow-500"]],
    ["assignments", ["Clock", "CircleCheck", "CircleAlert"], ["text-blue-500", "text-green-100", "text-red-500"]],
    ["reminders", ["Clock", "CircleAlert", "Check"], ["text-purple-500", "text-red-500", "text-green-500"]],
    ["goals", ["Sparkles", "Target", "Award"], ["text-yellow-100", "text-amber-500", "text-purple-500"]],
  ];
  for (const [page, icons, tints] of KPI_PAGES) {
    const src = strip(readFileSync(join(REPO_ROOT, `src/app/(app)/${page}/${page}-page.tsx`), "utf8"));
    if (!src.includes("MODULE_KPI")) failures.push(`${page}-page.tsx must consume the MODULE_KPI record`);
    for (const icon of icons) {
      if (!src.includes(icon)) failures.push(`${page}-page.tsx must carry the probed big KPI icon ${icon}`);
    }
    for (const tint of tints) {
      if (!src.includes(tint)) failures.push(`${page}-page.tsx must carry the probed KPI tint ${tint}`);
    }
    if (/cn\(STAT_CARD\.(hero|card),\s*"[^"]*p-5"\)/.test(src)) {
      failures.push(`${page}-page.tsx: the KPI tiles must ride MODULE_KPI.wrap (p-6 pt-6) — the p-5 composition retires`);
    }
  }
  // the assignments page gains its missing hero tile (probed: the
  // green→emerald Completed hero is the SECOND tile — ours shipped 3 plain)
  const assignSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/assignments/assignments-page.tsx"), "utf8"));
  if (!/from-green-500 to-emerald-500/.test(assignSrc)) {
    failures.push("assignments-page.tsx must ship the probed green→emerald Completed hero tile");
  }

  // (d) the SECTION_CARD anatomy — the CardHeader/CardContent forms
  const SC = layoutSrc.match(/export const SECTION_CARD = \{([\s\S]*?)\} as const;/);
  expect(SC, "SECTION_CARD must exist").toBeTruthy();
  const SC_MEMBERS: [string, string][] = [
    ["card", "rounded-xl border-none shadow-lg"],
    ["card", "text-ink"],
    ["header", "flex flex-col space-y-1.5 p-6"],
    ["title", "font-semibold leading-none tracking-tight"],
    ["titleRow", "flex items-center gap-2"],
    ["body", "p-6 pt-0"],
  ];
  for (const [member, expectCls] of SC_MEMBERS) {
    const m = SC![1].match(new RegExp(`${member}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(expectCls)) {
      failures.push(`SECTION_CARD.${member} must carry the probed form "${expectCls}" (read "${m?.[1] ?? "—"}")`);
    }
  }
  if (/border-b/.test(SC![1])) failures.push("SECTION_CARD.header must NOT carry a bottom border (probed: the reference's CardHeader has none)");
  if (/"p-5"/.test(SC![1])) failures.push("SECTION_CARD.body must be p-6 pt-0 (the reference's CardContent), never p-5");

  // (e) the STAT_CARD extension — the dashboard stat tiles' geometry
  const ST = layoutSrc.match(/export const STAT_CARD = \{([\s\S]*?)\} as const;/);
  expect(ST, "STAT_CARD must exist").toBeTruthy();
  const ST_MEMBERS: [string, string][] = [
    ["content", "relative p-6"],
    ["iconRow", "flex items-start justify-between mb-4"],
    ["iconTile", "p-3 rounded-2xl bg-gradient-to-br shadow-lg"],
    ["label", "mb-1"],
    ["value", "mb-1"],
  ];
  for (const [member, expectCls] of ST_MEMBERS) {
    const m = ST![1].match(new RegExp(`${member}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(expectCls)) {
      failures.push(`STAT_CARD.${member} must carry the probed form "${expectCls}" (read "${m?.[1] ?? "—"}")`);
    }
  }
  if (/iconTile:\s*"([^"]*)"/.test(ST![1]) && /flex items-center justify-center/.test(ST![1].match(/iconTile:\s*"([^"]*)"/)![1])) {
    failures.push("STAT_CARD.iconTile must NOT carry the flex/center arms (probed: the reference's tile is the bare p-3 rounded-2xl form)");
  }
  // the hero members retire with their last consumer (the module pages
  // move to MODULE_KPI; the value census owns the retirement)
  if (/\bhero(Label|Value)?:/.test(ST![1])) {
    failures.push("STAT_CARD's hero/heroLabel/heroValue members retire at WH-23 (the module KPI tiles ride MODULE_KPI — their last consumer)");
  }

  // (f) the SectionCard component — the icon INSIDE the title row at
  // inherited ink (probed: w-5 h-5, color rgb(10,10,10) — NOT muted)
  const scStart = partsSrc.indexOf("export function SectionCard");
  const scEnd = partsSrc.indexOf("export function EmptyState");
  const scBody = scStart >= 0 && scEnd > scStart ? partsSrc.slice(scStart, scEnd) : "";
  if (!scBody) {
    failures.push("the SectionCard component body must be readable in page-parts.tsx");
  } else {
    if (!/SECTION_CARD\.titleRow/.test(scBody)) {
      failures.push("SectionCard must place the icon inside the title row (SECTION_CARD.titleRow — the reference's CardHeader form)");
    }
    if (/text-muted/.test(scBody)) {
      failures.push("SectionCard's header icon must inherit the card ink (probed: the reference's w-5 h-5 icons carry NO color class) — text-muted retires");
    }
  }

  expect(
    failures,
    "the card family must ride the reference's probed geometry — the WH-23 cure (the identity probe read color, never geometry)",
  ).toEqual([]);
});

it("WH-23: the empty-form + omission census — the reference's empty states are TEXT-ONLY and two sections OMIT at zero rows", () => {
  // WH-23: the reference's module empty states are a bare centered
  // paragraph (probed: `<p class="text-center text-gray-500 py-12">` —
  // the full body innerHTML carries NO icon chip), the dashboard's
  // upcoming empties are the py-8 form, StudyResources ships its own
  // big-icon card — and the Assignments + Routines pages OMIT their
  // list sections entirely at zero rows (probed: /Assignments ends
  // after the KPI row; /Routines shows only the templates). Our
  // icon-chip EmptyState and always-rendered sections retire.
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const partsSrc = readFileSync(join(REPO_ROOT, "src/components/shared/page-parts.tsx"), "utf8");
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];

  // (a) the EMPTY_STATE record — the text-only forms
  const ES = layoutSrc.match(/export const EMPTY_STATE = \{([\s\S]*?)\n\} as const;/);
  expect(ES, "the EMPTY_STATE record must exist").toBeTruthy();
  const ES_MEMBERS: [string, string][] = [
    ["p", "text-center text-gray-500 py-12"],
    ["p", "dark:text-gray-400"],
    ["dash", "text-gray-500 text-center py-8"],
    ["dash", "dark:text-gray-400"],
  ];
  for (const [member, expectCls] of ES_MEMBERS) {
    const m = ES![1].match(new RegExp(`${member}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(expectCls)) {
      failures.push(`EMPTY_STATE.${member} must carry the probed form "${expectCls}" (read "${m?.[1] ?? "—"}")`);
    }
  }
  // the StudyResources special card (probed: p-6 py-20 + the w-16
  // h-16 gray-300 book-open + the text-lg hint)
  if (!/study:\s*\{/.test(ES![1])) {
    failures.push("EMPTY_STATE must carry the study member (the StudyResources special empty card)");
  } else {
    const study = ES![1].match(/study:\s*\{([\s\S]*?)\}/)![1];
    for (const [member, expectCls] of [
      ["body", "p-6 py-20 text-center"],
      ["icon", "h-16 w-16 text-gray-300 mx-auto mb-4"],
      ["text", "text-gray-500 text-lg"],
    ] as [string, string][]) {
      if (!study.includes(`${member}:`) || !study.includes(expectCls)) {
        failures.push(`EMPTY_STATE.study.${member} must carry the probed form "${expectCls}"`);
      }
    }
  }
  // the icon-chip members RETIRE (the value census owns it; the census
  // documents the retirement)
  if (/h-12 w-12/.test(ES![1]) || /iconGlyph/.test(ES![1])) {
    failures.push("EMPTY_STATE's icon-chip members (icon/iconGlyph) retire at WH-23 — the reference's empty states are text-only");
  }

  // (b) the EmptyState component renders the bare paragraph (no chip)
  const esStart = partsSrc.indexOf("export function EmptyState");
  const esEnd = partsSrc.indexOf("export function LoadingBlock");
  const esBody = esStart >= 0 && esEnd > esStart ? partsSrc.slice(esStart, esEnd) : "";
  if (!esBody) {
    failures.push("the EmptyState component body must be readable in page-parts.tsx");
  } else if (/EMPTY_STATE\.icon\b/.test(esBody)) {
    failures.push("EmptyState must not render the icon chip (the icon prop retires with the chip)");
  }

  // (c) the per-page icon parity — Exercise/MentalHealth/Events carry NO
  // header icon (probed); Reminders = Clock; Goals = Target + the
  // reference's Trophy (ours shipped Award); the dashboard's two wrong
  // icons cure to Bell + Calendar (probed: bell + calendar)
  const ICON_PAGES: [string, string, string][] = [
    ["exercise", "Recent Workouts", ""],
    ["mentalhealth", "Your Journey", ""],
    ["events", "Upcoming Events", ""],
    ["reminders", "Upcoming Reminders", "Clock"],
    ["goals", "Active Goals", "Target"],
  ];
  for (const [page, title, icon] of ICON_PAGES) {
    const src = strip(readFileSync(join(REPO_ROOT, `src/app/(app)/${page}/${page}-page.tsx`), "utf8"));
    const call = src.match(new RegExp(`<SectionCard[^>]*title="${title}"`));
    if (!call) { failures.push(`${page}-page.tsx: the "${title}" SectionCard must exist`); continue; }
    const hasIcon = /icon=\{/.test(call[0]);
    if (icon === "" && hasIcon) failures.push(`${page}-page.tsx: "${title}" must carry NO header icon (probed — the reference's card ships the bare title)`);
    if (icon !== "" && !call[0].includes(icon)) failures.push(`${page}-page.tsx: "${title}" must carry the probed ${icon} icon (read "${call[0]}")`);
  }
  const goalsSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/goals/goals-page.tsx"), "utf8"));
  if (!/icon=\{Trophy\}/.test(goalsSrc)) failures.push("goals-page.tsx: the Achievements card must carry the probed Trophy icon (ours shipped Award)");
  const dashSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/dashboard/dashboard-page.tsx"), "utf8"));
  if (!/icon=\{Bell\}/.test(dashSrc)) failures.push("dashboard-page.tsx: Upcoming Reminders must carry the probed Bell icon (ours shipped BarChart3)");
  if (!/icon=\{Calendar\}/.test(dashSrc)) failures.push("dashboard-page.tsx: Upcoming Events must carry the probed Calendar icon (ours shipped CalendarPlus)");

  // (d) the empty-data omission — Assignments + Routines render their
  // list sections ONLY when rows exist (probed: both pages end without
  // the section at zero rows)
  for (const [page, title] of [["assignments", "Your Assignments"], ["routines", "My Routines"]] as [string, string][]) {
    const src = strip(readFileSync(join(REPO_ROOT, `src/app/(app)/${page}/${page}-page.tsx`), "utf8"));
    const cond = src.match(new RegExp(`\\S+\\.length[^\\n]{0,40}&&[\\s\\S]{0,220}?title="${title}"`));
    if (!cond) {
      failures.push(`${page}-page.tsx: the "${title}" section must render ONLY when rows exist (probed — the reference omits the section at zero rows)`);
    }
  }

  // (e) the dashboard's upcoming empties ride the py-8 dash form (no text-sm — probed)
  if (/py-8 text-center text-sm text-muted/.test(dashSrc)) {
    failures.push('the dashboard upcoming empties must ride EMPTY_STATE.dash (text-gray-500 text-center py-8) — the text-sm text-muted form retires');
  }

  // (f) the events PAGE's empty form is the BARE empty list (probed: the
  // reference's Upcoming Events body innerHTML is just the empty
  // space-y-3 container — NO empty-state message on the events page,
  // unlike Exercise/Goals/Reminders; the dashboard's card keeps its
  // "No upcoming events" py-8 text)
  const eventsSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/events/events-page.tsx"), "utf8"));
  if (/No upcoming events/.test(eventsSrc)) {
    failures.push("events-page.tsx: the reference's events-page empty form is the BARE empty list — the empty-state message retires there (the dashboard's py-8 text stays)");
  }

  expect(
    failures,
    "the empty forms + the zero-row omissions must mirror the reference — the WH-23 cure",
  ).toEqual([]);
});

// WH-24: the card-family geometry census (the sibling families) — the
// Learning tutorial cards + the Events calendar card, the two declared
// targets WH-23's ledger pointed at. The tutorial cards are a
// GROUP-HOVER REVEAL family (the img scales 1.05, a 20% scrim fades in,
// the Watch Now button fades from opacity-0 — probed live with a real
// pointer: our permanent scrim + always-visible rounded-full pill never
// matched), the body rides the CardHeader/CardContent anatomy with the
// line-clamp-2 title + the gap-2 chips row + the line-clamp-3
// description, and the grid is gap-6 with 2-col from md / 3-col from lg
// (ours shipped gap-5 with sm/xl arms). The calendar card rides the same
// CardHeader/CardContent forms ours escaped (the hand-built px-5 py-4
// header — the calendar never rides the SectionCard component), its
// title row carries the title classes with a bare span, its nav is the
// stock OUTLINE trio with TEXT arrows at flex gap-2 (ours: ghost
// buttons with lucide chevrons at gap-1), and the day numbers carry the
// mb-1 + the space-y-1 events container (ours: mt-1 flex flex-wrap
// gap-0.5). Probed live 2026-10-31 (computed styles + DOM, real
// pointer for the hover families, settled ≥400 ms).
it("WH-24: the card-family geometry census — the tutorial + calendar cards ride the reference's probed anatomy (the sibling families WH-23 did not walk)", () => {
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];

  // (a) the TUTORIAL_CARD record — the probed reveal family + the split body
  const TC = layoutSrc.match(/export const TUTORIAL_CARD = \{([\s\S]*?)\n\} as const;/);
  expect(TC, "the TUTORIAL_CARD record must exist in page-layout.ts").toBeTruthy();
  const TC_MEMBERS: [string, string][] = [
    ["card", "overflow-hidden rounded-xl border-none bg-surface shadow-lg hover:shadow-xl transition-all group"],
    ["cover", "relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden"],
    ["cover", "dark:from-neutral-800 dark:to-neutral-900"],
    ["img", "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"],
    ["overlay", "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center"],
    ["watchBtn", "opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100"],
    ["watchBtn", "shadow h-9 px-4 py-2"],
    ["duration", "bg-black/70 text-white text-xs px-2 py-1 rounded"],
    ["header", "flex flex-col space-y-1.5 p-6"],
    ["titleRow", "flex items-start justify-between gap-2 mb-2"],
    ["title", "font-semibold tracking-tight text-lg line-clamp-2"],
    ["chipsRow", "flex flex-wrap gap-2"],
    ["body", "p-6 pt-0"],
    ["desc", "text-sm text-gray-600 line-clamp-3 dark:text-gray-400"],
    ["grid", "grid md:grid-cols-2 lg:grid-cols-3 gap-6"],
  ];
  for (const [member, expectCls] of TC_MEMBERS) {
    const m = TC![1].match(new RegExp(`${member}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(expectCls)) {
      failures.push(`TUTORIAL_CARD.${member} must carry the probed form "${expectCls}" (read "${m?.[1] ?? "—"}")`);
    }
  }

  // (b) the learning page consumes the record; the permanent-scrim +
  // always-visible-pill family RETIRES (probed: the reference's resting
  // card carries NO scrim and an opacity-0 button)
  const learnRaw = readFileSync(join(REPO_ROOT, "src/app/(app)/learning/learning-page.tsx"), "utf8");
  const learnSrc = strip(learnRaw);
  if (!learnSrc.includes("TUTORIAL_CARD")) failures.push("learning-page.tsx must consume the TUTORIAL_CARD record");
  if (/bg-black\/30/.test(learnSrc)) {
    failures.push("the tutorial cover's scrim must be the reference's REVEAL form (bg-black/0 group-hover:bg-black/20) — the permanent bg-black/30 retires");
  }
  if (/rounded-full bg-white\/95/.test(learnSrc)) {
    failures.push("the Watch Now affordance must be the reference's rectangle (the stock base + opacity-0 group-hover:opacity-100) — the always-visible rounded-full pill retires");
  }
  if (/sm:grid-cols-2 xl:grid-cols-3 gap-5/.test(learnSrc)) {
    failures.push("the tutorial grid must be the reference's grid md:grid-cols-2 lg:grid-cols-3 gap-6 — the sm/xl gap-5 form retires");
  }
  if (/"p-4"/.test(learnSrc)) {
    failures.push("the tutorial card's body must ride the CardHeader/CardContent split (p-6 + p-6 pt-0) — the single p-4 body retires");
  }
  if (/mt-1\.5 flex flex-wrap gap-1\.5/.test(learnSrc)) {
    failures.push("the chips row must be the header's second child at flex flex-wrap gap-2 — the mt-1.5 gap-1.5 form retires");
  }

  // (c) the CALENDAR record — the CardHeader/CardContent anatomy + the
  // outline nav trio with TEXT arrows + the mb-1 day numbers
  const CAL = layoutSrc.match(/export const CALENDAR = \{([\s\S]*?)\n\} as const;/);
  expect(CAL, "the CALENDAR record must exist in page-layout.ts").toBeTruthy();
  const CAL_MEMBERS: [string, string][] = [
    ["headerRow", "font-semibold leading-none tracking-tight flex items-center justify-between"],
    ["navRow", "flex gap-2"],
    ["navBtn", "border border-line bg-surface shadow-sm hover:bg-line-soft hover:text-neutral-900"],
    ["navBtn", "dark:hover:text-neutral-100"],
    ["navBtn", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"],
    ["navBtn", "h-8 rounded-md px-3 text-xs"],
    ["grid", "grid grid-cols-7 gap-2"],
    ["dayNum", "text-sm font-medium mb-1"],
    ["dayEvents", "space-y-1"],
  ];
  for (const [member, expectCls] of CAL_MEMBERS) {
    const m = CAL![1].match(new RegExp(`${member}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(expectCls)) {
      failures.push(`CALENDAR.${member} must carry the probed form "${expectCls}" (read "${m?.[1] ?? "—"}")`);
    }
  }

  // (d) the events page consumes the forms; the hand-built header + the
  // lucide chevrons + the grid padding RETIRE
  const eventsSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/events/events-page.tsx"), "utf8"));
  if (!eventsSrc.includes("CALENDAR")) failures.push("events-page.tsx must consume the CALENDAR record");
  if (!eventsSrc.includes("SECTION_CARD.header") || !eventsSrc.includes("SECTION_CARD.body")) {
    failures.push("the calendar card must ride the CardHeader/CardContent anatomy (SECTION_CARD.header/body) — the hand-built header escapes the WH-23 cure");
  }
  if (/px-5 py-4/.test(eventsSrc)) {
    failures.push("the calendar header's px-5 py-4 form retires — the reference's header is the CardHeader form (p-6) wrapping the title row");
  }
  if (/p-4 pt-2/.test(eventsSrc)) {
    failures.push("the calendar grid's p-4 pt-2 padding retires — the reference's grid rides bare inside the p-6 pt-0 body");
  }
  if (/ChevronLeft|ChevronRight/.test(eventsSrc)) {
    failures.push("the calendar nav must carry the reference's TEXT arrows (←/→) — the lucide chevron imports retire");
  }
  if (/"flex items-center gap-1"/.test(eventsSrc)) {
    failures.push("the calendar nav row must be the reference's flex gap-2 (no items-center, 8px gaps)");
  }
  if (/mt-1 flex flex-wrap gap-0\.5/.test(eventsSrc)) {
    failures.push("the day-cell events container must be the reference's space-y-1 — the mt-1 flex flex-wrap gap-0.5 form retires");
  }

  expect(
    failures,
    "the tutorial + calendar card families must mirror the reference — the WH-24 cure",
  ).toEqual([]);
});

// WH-24: the module-toolbar + chip-form census — the Learning +
// StudyResources toolbars ride the reference's stock-input family (the
// container flex flex-col md:flex-row gap-4, the search the STOCK Input
// form + pl-10 with a w-5 h-5 gray-400 icon, the selects in a
// Filter-icon flex items-center gap-2 wrapper at FIXED w-48/w-40 — ours
// shipped hand-rolled py-2 text-sm shadow-xs pl-9 strings, h-4 w-4
// muted icons, no wrapper, no Filter icon, and w-full-sm: breakpoints),
// and the shared OptionChip carries the stock shadcn Badge arms
// (transition-colors + the focus:ring-2 family + shadow +
// hover:bg-primary/80 — probed on the reference's rendered badges; our
// gap-1 arm retires, the reference has none).
it("WH-24: the module-toolbar + chip-form census — the stock search family + the Filter-icon select wrappers + the Badge arms", () => {
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const partsSrc = readFileSync(join(REPO_ROOT, "src/components/shared/page-parts.tsx"), "utf8");
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];

  // (a) the TOOLBAR record
  const TB = layoutSrc.match(/export const TOOLBAR = \{([\s\S]*?)\n\} as const;/);
  expect(TB, "the TOOLBAR record must exist in page-layout.ts").toBeTruthy();
  const TB_MEMBERS: [string, string][] = [
    ["container", "flex flex-col md:flex-row gap-4"],
    ["searchWrap", "flex-1 relative"],
    ["searchIcon", "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"],
    ["selectsWrap", "flex items-center gap-2"],
    ["filterIcon", "h-5 w-5 text-gray-400"],
  ];
  for (const [member, expectCls] of TB_MEMBERS) {
    const m = TB![1].match(new RegExp(`${member}:\\s*"([^"]*)"`));
    if (!m || !m[1]!.includes(expectCls)) {
      failures.push(`TOOLBAR.${member} must carry the probed form "${expectCls}" (read "${m?.[1] ?? "—"}")`);
    }
  }

  // (b) the learning page: the Input component + pl-10 + the fixed w-48
  const learnSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/learning/learning-page.tsx"), "utf8"));
  if (!learnSrc.includes("TOOLBAR.")) failures.push("learning-page.tsx must consume the TOOLBAR record");
  if (!/from "@\/components\/ui\/input"/.test(learnSrc)) {
    failures.push("the learning search must ride the Input component (the stock form) — the hand-rolled string retires");
  }
  if (!/pl-10/.test(learnSrc)) failures.push("the learning search input must carry the reference's pl-10 (the icon's w-5 clearance)");
  if (/py-2 text-sm shadow-xs/.test(learnSrc)) {
    failures.push("the hand-rolled search string (py-2 text-sm shadow-xs) retires — the reference rides the stock py-1 text-base md:text-sm shadow-sm form");
  }
  if (/w-full sm:w-48/.test(learnSrc)) {
    failures.push("the learning category trigger must be FIXED w-48 (probed at 1280 AND 390 — the w-full-sm: breakpoint form retires)");
  }

  // (c) the studyresources page: the same family (the Filter wrapper + the fixed w-40s)
  const srSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/studyresources/studyresources-page.tsx"), "utf8"));
  if (!srSrc.includes("TOOLBAR.")) failures.push("studyresources-page.tsx must consume the TOOLBAR record");
  if (!/Filter/.test(srSrc)) failures.push("the studyresources selects must ride the Filter-icon wrapper (probed: lucide-filter w-5 h-5 text-gray-400 leading the selects row)");
  if (/w-full sm:w-40/.test(srSrc)) {
    failures.push("the studyresources triggers must be FIXED w-40 (the w-full-sm: breakpoint form retires)");
  }
  if (/py-2 text-sm shadow-xs/.test(srSrc)) {
    failures.push("the hand-rolled input/textarea string retires on studyresources too — the stock Input + pl-10 / the TEXTAREA_FIELD form");
  }

  // (d) the OptionChip's stock Badge arms (probed on the reference's
  // rendered badges: transition-colors focus:outline-none focus:ring-2
  // focus:ring-ring focus:ring-offset-2 border-transparent shadow
  // hover:bg-primary/80 + the tint)
  const chipSrc = partsSrc;
  const chipClass = chipSrc.match(/function OptionChip[\s\S]{0,900}?"([^"]*rounded[^"]*)"/)?.[1] ?? "";
  for (const arm of [
    "transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    "shadow",
    "hover:bg-primary/80",
  ]) {
    if (!chipClass.includes(arm)) {
      failures.push(`the OptionChip must carry the stock Badge arm "${arm}" (probed on the reference's badges)`);
    }
  }
  if (/gap-1/.test(chipClass)) {
    failures.push("the OptionChip's gap-1 arm retires — the reference's Badge carries no gap (the one icon consumer renders an unobservable face)");
  }

  // (e) the form TEXTAREAS ride the reference's stock form (probed on
  // EVERY form it renders — events + studyresources + exercise +
  // assignments + mentalhealth x2 + the Schedule modal: all eight are
  // byte-identical `min-h-[60px] ... text-base shadow-sm ... md:text-sm`;
  // ours shipped min-h-16/min-h-20 (64/80px) + text-sm-only + shadow-xs
  // hand-rolled strings — the mobile 16px text and the 60px floor were
  // never ours)
  const pagesWithTextareas = [
    "src/app/(app)/mentalhealth/mentalhealth-page.tsx",
    "src/app/(app)/reminders/reminders-page.tsx",
    "src/app/(app)/goals/goals-page.tsx",
    "src/app/(app)/routines/routines-page.tsx",
    "src/app/(app)/exercise/exercise-page.tsx",
    "src/app/(app)/assignments/assignments-page.tsx",
    "src/app/(app)/events/events-page.tsx",
    "src/app/(app)/studyresources/studyresources-page.tsx",
  ];
  const taSrc = layoutSrc.match(/export const TEXTAREA_FIELD =\s*\n?\s*"([^"]*)"/)?.[1] ?? "";
  expect(taSrc, "the TEXTAREA_FIELD record must exist in page-layout.ts").toContain("min-h-[60px]");
  expect(taSrc).toContain("text-base");
  expect(taSrc).toContain("md:text-sm");
  for (const pg of pagesWithTextareas) {
    const s = strip(readFileSync(join(REPO_ROOT, pg), "utf8"));
    const tas = s.match(/<textarea/g)?.length ?? 0;
    if (tas > 0 && !s.includes("TEXTAREA_FIELD")) {
      failures.push(`${pg}: the ${tas} textarea(s) must ride the TEXTAREA_FIELD form (the reference's stock min-h-[60px] text-base family)`);
    }
    if (/min-h-16|min-h-20/.test(s)) {
      failures.push(`${pg}: the min-h-16/min-h-20 textarea floors retire — the reference's floor is min-h-[60px] on every form`);
    }
  }

  expect(
    failures,
    "the module toolbars + the chip form must mirror the reference — the WH-24 cure",
  ).toEqual([]);
});

// WH-24: the routines template-card census — the reference's template
// cards render NO thumbnail and NO Watch Video anywhere (probed live:
// imgCount 0, hasWatchVideo false — its own template DATA carries the
// fields its UI never renders; parity is a property of the RENDERED
// FACE, not the data), the meta rows carry clock/calendar icons at
// w-4 h-4 (ours: Clock/Sun at h-3.5 w-3.5), the Benefits rows are
// items-start gap-1 with the ✓ text glyph (ours: items-center gap-2
// with lucide CheckCircle2), the grid is md:grid-cols-2 lg:grid-cols-3
// gap-6 (ours: grid-cols-1 md:grid-cols-2), the "Browse Templates"
// heading is text-2xl font-bold text-gray-900 mb-4 with the 16px
// text-gray-600 mb-6 subtitle, and the Use This Template button is
// w-full mt-auto in the category pair with hover:opacity-90 + the
// ArrowRight icon (ours: an auto-width pair in a justify-between row).
it("WH-24: the routines template-card census — the thumbnail-free face + the meta/benefits glyphs + the w-full category-pair button", () => {
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const rSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/routines/routines-page.tsx"), "utf8"));

  // (a) the thumbnail + Watch Video face RETIRES (the reference renders
  // neither — the seed DATA keeps the fields)
  if (/t\.thumbnail/.test(rSrc)) {
    failures.push("the template card must NOT render the thumbnail branch — the reference's face carries none (imgCount 0, probed)");
  }
  if (/Watch Video/.test(rSrc)) {
    failures.push("the template card must NOT render any Watch Video affordance — the reference's face carries none (probed)");
  }

  // (b) the meta rows: clock + calendar at w-4 h-4
  if (!/Calendar/.test(rSrc)) failures.push("the timeOfDay row must carry the reference's Calendar glyph (ours shipped Sun)");
  if (/h-3\.5 w-3\.5/.test(rSrc)) {
    failures.push("the meta rows' icons must be the reference's w-4 h-4 (ours shipped h-3.5 w-3.5)");
  }
  if (/\bSun\b/.test(rSrc)) failures.push("the Sun glyph retires — the reference's second meta icon is the Calendar");

  // (c) the Benefits rows: items-start gap-1 + the ✓ text glyph
  if (!/items-start gap-1/.test(rSrc)) {
    failures.push("the Benefits rows must be the reference's flex items-start gap-1 (ours: items-center gap-2)");
  }
  if (!/text-green-500" aria-hidden="true">✓/.test(rSrc)) {
    failures.push("the Benefits rows must carry the reference's ✓ text glyph in text-green-500 (the lucide CheckCircle2 marker retires — the one remaining CheckCircle2 is the My-Routines Done button, an unobservable zero-row face)");
  }

  // (d) the grid + the heading + the button
  if (!/md:grid-cols-2 lg:grid-cols-3 gap-6/.test(rSrc)) {
    failures.push("the template grid must be the reference's md:grid-cols-2 lg:grid-cols-3 gap-6 (ours: grid-cols-1 md:grid-cols-2)");
  }
  // the MAP stays BARE — the reference's Use This Template carries NO 600
  // hover arms (its hover is opacity-90 alone, probed live); the module
  // primaries that DO darken their stops ride PAGE_THEMES (probed live on
  // New Event + Log Workout — a different button family)
  const catMap = layoutSrc.match(/export const ROUTINE_CATEGORY_GRADIENTS[^=]*=\s*\{([\s\S]*?)\};/)?.[1] ?? "";
  if (/hover:from-/.test(catMap)) {
    failures.push("the ROUTINE_CATEGORY_GRADIENTS members must be BARE pairs — the reference's Use This Template button darkens nothing on hover (opacity-90 alone); the 600 arms belong to PAGE_THEMES' module primaries only");
  }
  if (!/text-2xl font-bold text-gray-900 mb-4/.test(rSrc)) {
    failures.push('the "Browse Templates" heading must be the reference\'s text-2xl font-bold text-gray-900 mb-4 (ours: text-xl font-semibold)');
  }
  if (!/text-gray-600 mb-6/.test(rSrc)) {
    failures.push('the "Browse Templates" subtitle must be the reference\'s 16px text-gray-600 mb-6 (ours: text-sm text-muted)');
  }
  if (!/w-full mt-auto/.test(rSrc)) {
    failures.push("the Use This Template button must be w-full mt-auto — the reference's button fills the card alone (ours: auto-width in a justify-between row)");
  }
  if (!/hover:opacity-90/.test(rSrc)) {
    failures.push("the Use This Template button must carry the reference's hover:opacity-90 hover family");
  }
  if (!/ArrowRight/.test(rSrc)) {
    failures.push("the Use This Template button must carry the reference's ArrowRight icon (w-4 h-4 ml-2)");
  }

  expect(
    failures,
    "the routines template card must mirror the reference's face — the WH-24 cure",
  ).toEqual([]);
});

// WH-25: the profile-tab geometry census — the Profile tab panels'
// INTERIOR geometry (the WH-17/18 rounds walked the panels' colors +
// dark pairs; the field-by-field geometry of the tab region + every
// interior block was never walked). Probed live 2026-10-31: the Tabs
// wrapper is w-full (the tablist computes 960px — ours shipped
// max-w-xl), the panel shells mt-2 (ours mt-6), the Colors card rides
// the stock Label + mb-3 block form with the md:grid-cols-4 preset
// grid of TWO-circular-swatch cards and the md:grid-cols-2 gap-6 picker
// rows (the color input the stock form + w-20 h-12), the preview tile
// the 135deg inline gradient (to-br — ours shipped to-right), the
// Typography select w-full with the mt-4 p-4 border preview block (the
// preview at text-lg font-sans), the Visual Style selects STACKED
// full-width in a space-y-6 body (ours shipped a 3-col grid), the
// Account inputs carry the bg-gray-50 disabled wash + the circle-user
// glyph, the Preferences rows are p-4 rounded-lg border with the
// NATIVE w-5 h-5 checkboxes, and the save bar is flex justify-end
// gap-3 sticky bottom-4.
it("WH-25: the profile-tab geometry census — the tab region + the five cards + the rows + the native checkboxes + the sticky save bar", () => {
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];
  const pSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/profile/profile-page.tsx"), "utf8"));

  // (a) the Tabs region: the w-full wrapper + the mt-2 panels
  if (/max-w-xl/.test(pSrc)) {
    failures.push("the Profile Tabs wrapper must be w-full (probed: the tablist computes 960px) — the max-w-xl form retires");
  }
  if (/mt-6/.test(pSrc)) {
    failures.push("the Profile tab panel shells must ride mt-2 (probed) — the mt-6 form retires");
  }

  // (b) the Colors card: the stock Label + mb-3 block, the md grid, the
  // circular swatches, the picker rows, the color input, the 135deg tile
  if (!/mb-3 block/.test(pSrc)) {
    failures.push('the "Quick Presets" label must ride the stock Label + mb-3 block form (probed)');
  }
  if (/sm:grid-cols-4/.test(pSrc)) {
    failures.push("the preset grid must be grid-cols-2 md:grid-cols-4 gap-3 (probed) — the sm:grid-cols-4 arm retires");
  }
  if (!/md:grid-cols-4/.test(pSrc)) {
    failures.push("the preset grid must carry the md:grid-cols-4 arm (probed)");
  }
  const PC = layoutSrc.match(/export const PRESET_CARD = \{([\s\S]*?)\n\} as const;/);
  expect(PC, "the PRESET_CARD record must exist in page-layout.ts").toBeTruthy();
  const pcSwatches = PC![1].match(/swatches:\s*"([^"]*)"/)?.[1] ?? "";
  if (!pcSwatches.includes("flex gap-2 mb-2")) {
    failures.push(`PRESET_CARD.swatches must be the reference's two-circle row "flex gap-2 mb-2" (read "${pcSwatches}")`);
  }
  const pcSwatch = PC![1].match(/swatch:\s*"([^"]*)"/)?.[1] ?? "";
  if (!pcSwatch.includes("w-6 h-6 rounded-full")) {
    failures.push(`PRESET_CARD.swatch must be the reference's solid circle "w-6 h-6 rounded-full" (read "${pcSwatch}")`);
  }
  if (/h-8 w-full rounded-md/.test(layoutSrc)) {
    failures.push("the ONE-gradient-bar swatch form retires — the reference's preset cards carry TWO solid circles");
  }
  if (/sm:grid-cols-2 gap-4/.test(pSrc)) {
    failures.push("the custom picker rows must be grid md:grid-cols-2 gap-6 (probed) — the sm:grid-cols-2 gap-4 form retires");
  }
  if (!/md:grid-cols-2 gap-6/.test(pSrc)) {
    failures.push("the custom picker rows must carry the md:grid-cols-2 gap-6 form (probed)");
  }
  if (/h-9 w-14/.test(pSrc)) {
    failures.push("the color input must be the stock form + w-20 h-12 cursor-pointer (probed: 80×48) — the h-9 w-14 form retires");
  }
  if (!/w-20 h-12/.test(pSrc)) {
    failures.push("the color input must carry the probed w-20 h-12 arms");
  }
  if (/bg-gradient-to-r/.test(pSrc) || /to right, \$\{/.test(pSrc) || /linear-gradient\(to right/.test(pSrc)) {
    failures.push("the preview tile must ride the reference's 135deg inline gradient (to-br) — the to-right form retires");
  }
  if (!/135deg/.test(pSrc)) {
    failures.push("the preview tile must carry the probed 135deg gradient angle");
  }

  // (c) the Typography card: the w-full select + the border preview block
  if (/sm:w-64/.test(pSrc)) {
    failures.push("the font select must be w-full (probed) — the sm:w-64 arm retires");
  }
  if (!/mt-4 p-4 border rounded-lg/.test(pSrc)) {
    failures.push("the typography preview must be the reference's mt-4 p-4 border rounded-lg BLOCK (probed) — the bg-line-soft p-3 form retires");
  }
  if (!/text-lg font-sans/.test(pSrc)) {
    failures.push("the typography preview text must ride text-lg font-sans (probed) — the text-sm form retires");
  }

  // (d) the Background Image card: the hint form
  if (!/text-xs text-gray-500 mt-1/.test(pSrc)) {
    failures.push("the BG hint must be the reference's text-xs text-gray-500 mt-1 (ours: mt-2 text-xs text-muted)");
  }

  // (e) the Visual Style card: the STACKED selects
  if (/sm:grid-cols-3/.test(pSrc)) {
    failures.push("the Visual Style selects must be STACKED full-width in the space-y-6 body (probed) — the 3-col grid retires");
  }

  // (f) the Account card: the glyph + the disabled wash
  if (/UserRound/.test(pSrc)) {
    failures.push("the Account title icon must be the reference's circle-user (UserCircle) — the UserRound glyph retires");
  }
  if (!/bg-gray-50/.test(pSrc)) {
    failures.push("the Account disabled inputs must carry the reference's bg-gray-50 wash (probed)");
  }

  // (g) the Preferences card: the Settings icon + the row form + the text forms
  if (!/Settings className="h-5 w-5"/.test(pSrc)) {
    failures.push("the Preferences title must carry the reference's Settings icon (probed) — ours shipped the bare title");
  }
  if (/items-start justify-between gap-4/.test(pSrc)) {
    failures.push("the Preferences rows must be the reference's flex items-center justify-between p-4 rounded-lg border (probed) — the items-start gap-4 px-4 py-3 bg-line-soft/40 form retires");
  }
  const PP = layoutSrc.match(/export const PROFILE_PREFS = \{([\s\S]*?)\n\} as const;/);
  expect(PP, "the PROFILE_PREFS record must exist in page-layout.ts").toBeTruthy();
  const ppRow = PP![1].match(/row:\s*"([^"]*)"/)?.[1] ?? "";
  if (!ppRow.includes("flex items-center justify-between p-4 rounded-lg border")) {
    failures.push(`PROFILE_PREFS.row must be the probed "flex items-center justify-between p-4 rounded-lg border" (read "${ppRow}")`);
  }
  if (!/PROFILE_PREFS\.row/.test(pSrc)) {
    failures.push("the Preferences rows must consume the PROFILE_PREFS.row record");
  }

  // (h) the save bar: the sticky right-aligned form
  if (!/sticky bottom-4/.test(pSrc)) {
    failures.push("the save bar must be the reference's flex justify-end gap-3 sticky bottom-4 (probed) — ours shipped a bare div");
  }
  if (!/flex justify-end gap-3/.test(pSrc)) {
    failures.push("the save bar must carry the flex justify-end gap-3 arms (probed)");
  }

  expect(
    failures,
    "the Profile tab panels' geometry must mirror the reference — the WH-25 cure",
  ).toEqual([]);
});

// WH-25: the checkbox-retirement census — the round's second core
// finding: the WH-21 claim "the reference ships ZERO checkboxes, probed
// live" was FALSE (that probe never opened the Preferences tab; the
// live read shows NATIVE bare input[type=checkbox] w-5 h-5 controls).
// The CRM-chassis custom Checkbox (the Session-17 button-role form),
// its WH-21 dark-state cure, its interaction-contrast arithmetic pins
// and its a11y (e) leg all shipped on the untested premise — the
// component, the record, the pins and the leg retire with the premise,
// and the Preferences pair renders the native form.
it("WH-25: the checkbox-retirement census — the native w-5 h-5 form + the custom Checkbox's retirement", () => {
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];
  const pSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/profile/profile-page.tsx"), "utf8"));
  const labelSrc = readFileSync(join(REPO_ROOT, "src/components/ui/label.tsx"), "utf8");
  const PP = layoutSrc.match(/export const PROFILE_PREFS = \{([\s\S]*?)\n\} as const;/);

  // (a) the profile page imports NO Checkbox and renders the native form
  if (/Checkbox/.test(pSrc)) {
    failures.push("the profile page must NOT consume the custom Checkbox — the reference's Preferences controls are NATIVE input[type=checkbox]");
  }
  const nativeCount = (pSrc.match(/type="checkbox"/g) ?? []).length;
  if (nativeCount !== 2) {
    failures.push(`the profile page must render exactly TWO native input[type=checkbox] controls (read ${nativeCount})`);
  }
  expect(PP, "the PROFILE_PREFS record must exist in page-layout.ts").toBeTruthy();
  const ppCheckbox = PP![1].match(/checkbox:\s*"([^"]*)"/)?.[1] ?? "";
  if (ppCheckbox !== "w-5 h-5") {
    failures.push(`PROFILE_PREFS.checkbox must be the probed "w-5 h-5" (read "${ppCheckbox}")`);
  }
  if (!/PROFILE_PREFS\.checkbox/.test(pSrc)) {
    failures.push("the native checkboxes must consume the PROFILE_PREFS.checkbox record");
  }

  // (b) the CHECKBOX record retires from page-layout
  if (/export const CHECKBOX/.test(layoutSrc)) {
    failures.push("the CHECKBOX record retires with its last consumer — the native form carries no custom control classes");
  }

  // (c) label.tsx exports Label only (the Checkbox export retires)
  const exportBlock = labelSrc.match(/export \{([^}]*)\}/)?.[1] ?? "";
  if (/Checkbox/.test(exportBlock)) {
    failures.push(`label.tsx's export block must carry Label only (read: ${exportBlock.trim()}) — the Checkbox export retires with its last consumer`);
  }
  if (/function Checkbox/.test(labelSrc)) {
    failures.push("the Checkbox component body retires with the export (dead surface — the ui-export census owns it)");
  }

  expect(
    failures,
    "the native checkbox form + the retirement must hold — the WH-25 cure",
  ).toEqual([]);
});

it("WH-26: the form-grid family census — the six sibling forms' trailing fields ride the reference's grid md:grid-cols-2 gap-4 (the field interiors the modality/card rounds never walked)", () => {
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];

  const FG = layoutSrc.match(/export const FORM_GRID = \{([\s\S]*?)\n\} as const;/);
  expect(FG, "the FORM_GRID record must exist in page-layout.ts").toBeTruthy();
  const fgGrid = FG![1].match(/grid:\s*"([^"]*)"/)?.[1] ?? "";
  if (fgGrid !== "grid md:grid-cols-2 gap-4") {
    failures.push(`FORM_GRID.grid must be the reference's probed "grid md:grid-cols-2 gap-4" (read "${fgGrid}")`);
  }

  const pages: Array<[string, string, string[]]> = [
    ["events", "events/events-page.tsx", ["Date", "Time (optional)", "Category", "Location (optional)"]],
    ["exercise", "exercise/exercise-page.tsx", ["Exercise Type", "Duration (minutes)", "Intensity", "Calories Burned (optional)", "Date"]],
    ["assignments", "assignments/assignments-page.tsx", ["Subject/Category", "Due Date", "Priority", "Estimated Hours"]],
    ["reminders", "reminders/reminders-page.tsx", ["Remind Me On", "Type", "Priority", "Repeat"]],
    ["goals", "goals/goals-page.tsx", ["Category", "Frequency", "Target Value", "Unit", "Deadline (optional)"]],
  ];
  for (const [name, path, members] of pages) {
    const src = strip(readFileSync(join(REPO_ROOT, `src/app/(app)/${path}`), "utf8"));
    if (!/FORM_GRID\.grid/.test(src)) {
      failures.push(`${name}: the trailing fields must ride the FORM_GRID record (probed live — the reference pairs them two-wide at md)`);
    }
    for (const label of members) {
      if (!src.includes(label)) {
        failures.push(`${name}: the pinned grid member "${label}" is missing from the form`);
      }
    }
  }
  // studyresources: TWO grids ([Title, Subject] + [Type, ExamDate]) — the
  // URL Link moves to a bare group below
  const srSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/studyresources/studyresources-page.tsx"), "utf8"));
  const srGridUses = srSrc.match(/FORM_GRID\.grid/g)?.length ?? 0;
  if (srGridUses < 2) {
    failures.push(`studyresources: the form rides TWO FORM_GRID grids — [Resource Title, Subject/Course] + [Resource Type, Exam/Test Date] (read ${srGridUses} uses)`);
  }

  // the retirements: the stacked single-column trailing fields + the wrong
  // breakpoint/arity grids (probed: the reference is md:grid-cols-2)
  if (/sm:grid-cols-3/.test(strip(readFileSync(join(REPO_ROOT, "src/app/(app)/reminders/reminders-page.tsx"), "utf8")))) {
    failures.push("reminders: the sm:grid-cols-3 grid retires — the reference's trailing fields ride ONE grid md:grid-cols-2 gap-4");
  }
  if (/sm:grid-cols-2/.test(strip(readFileSync(join(REPO_ROOT, "src/app/(app)/goals/goals-page.tsx"), "utf8")))) {
    failures.push("goals: the sm:grid-cols-2 grids retire — the reference's five trailing fields ride ONE grid md:grid-cols-2 gap-4");
  }
  if (/sm:grid-cols-2/.test(srSrc)) {
    failures.push("studyresources: the [Exam, URL] sm:grid-cols-2 grid retires — the reference's grids are [Title, Subject] + [Type, ExamDate] at md");
  }

  expect(
    failures,
    "the form-grid family must hold — the WH-26 cure (the trailing-field geometry, probed live on the redeployed reference)",
  ).toEqual([]);
});

it("WH-26: the form-interior census — the mood form's own family + the shared button/chip/rating/upload forms (the F-1 active-label cure + the redeployment round's cures)", () => {
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];
  const mhSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/mentalhealth/mentalhealth-page.tsx"), "utf8"));
  const srSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/studyresources/studyresources-page.tsx"), "utf8"));

  // (a) the mood form's wrapper: space-y-6 — the ONE form that deviates
  // from its space-y-4 siblings (probed)
  if (!/space-y-6/.test(mhSrc)) {
    failures.push("the mood form's body wrapper must be space-y-6 (probed: the reference's mood form rides 24px group gaps where its siblings ride 16px)");
  }
  // (b) the mood label mb-4 block + the bare grid — the label's class
  // lives in the MOOD_FORM record (the record + the page's consumption
  // site — the WH-25 census doctrine)
  const MF = layoutSrc.match(/export const MOOD_FORM = \{([\s\S]*?)\n\} as const;/);
  expect(MF, "the MOOD_FORM record must exist in page-layout.ts").toBeTruthy();
  const mfLabel = MF![1].match(/label:\s*"([^"]*)"/)?.[1] ?? "";
  if (mfLabel !== "mb-4 block") {
    failures.push(`the "Choose your mood" label must ride mb-4 block (probed: a 16px label→grid gap) — read "${mfLabel}"`);
  }
  if (!/MOOD_FORM\.label/.test(mhSrc)) {
    failures.push("the page must consume MOOD_FORM.label on the Choose your mood label (the record + the consumption site)");
  }
  if (/mt-2 grid grid-cols-2 md:grid-cols-5/.test(mhSrc)) {
    failures.push("the mood tile grid rides BARE (the label's mb-4 owns the gap) — the mt-2 arm retires");
  }
  // (c) THE F-1 CURE: the active tile's label flips to white
  const mfLabelActive = MF![1].match(/labelActive:\s*"([^"]*)"/)?.[1] ?? "";
  const mfLabelInactive = MF![1].match(/labelInactive:\s*"([^"]*)"/)?.[1] ?? "";
  if (!mfLabelActive.includes("text-white")) {
    failures.push(`MOOD_FORM.labelActive must carry text-white (probed: the reference's active label div flips with the tile state) — read "${mfLabelActive}"`);
  }
  if (!mfLabelInactive.includes("text-gray-700")) {
    failures.push(`MOOD_FORM.labelInactive must carry text-gray-700 (the inactive face) — read "${mfLabelInactive}"`);
  }
  if (!/mood === m\.value \? MOOD_FORM\.labelActive : MOOD_FORM\.labelInactive|labelActive : .*labelInactive/.test(mhSrc)) {
    failures.push("the mood tile's label class must be STATE-CONDITIONAL — the constant text-gray-700 label rendered GRAY on the blue gradient (the F-1 bug: the WH-21 pin asserted the button's arm, never the rendered label span)");
  }
  // (d) the energy slider: the probed track + min=1 + the accent retirement
  const mfRange = MF![1].match(/range:\s*"([^"]*)"/)?.[1] ?? "";
  if (!mfRange.includes("h-2") || !mfRange.includes("bg-gray-200") || !mfRange.includes("appearance-none")) {
    failures.push(`MOOD_FORM.range must be the reference's probed track "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" — read "${mfRange}"`);
  }
  if (/accent-\[var\(--color-primary\)\]/.test(mhSrc)) {
    failures.push("the native accent-color slider retires — the reference ships the 8px gray-200 track (Chrome keeps the native thumb under appearance:none)");
  }
  if (!/min=\{1\}/.test(mhSrc)) {
    failures.push("the energy range must ride min={1} (probed: the reference's slider runs 1-10; the schema's min(0) stays the API superset)");
  }
  // (e) the Low/High row + the text-subtle retirement on this row
  const mfLowHigh = MF![1].match(/lowHigh:\s*"([^"]*)"/)?.[1] ?? "";
  if (!mfLowHigh.includes("text-gray-500") || !mfLowHigh.includes("mt-1")) {
    failures.push(`MOOD_FORM.lowHigh must be the reference's "flex justify-between text-xs text-gray-500 mt-1" — read "${mfLowHigh}"`);
  }
  // (f) the reflection h-24
  if (!/TEXTAREA_FIELD,\s*"h-24"|h-24/.test(mhSrc)) {
    failures.push("the Daily Reflection textarea must ride h-24 (probed: 96px where the gratitude field rides the 60px stock form)");
  }
  // (g) the shared buttons: the FORM_BUTTONS record + the retirements
  const FB = layoutSrc.match(/export const FORM_BUTTONS = \{([\s\S]*?)\n\} as const;/);
  expect(FB, "the FORM_BUTTONS record must exist in page-layout.ts").toBeTruthy();
  const fbCancel = FB![1].match(/cancel:\s*"([^"]*)"/)?.[1] ?? "";
  const fbAdd = FB![1].match(/add:\s*"([^"]*)"/)?.[1] ?? "";
  if (!fbCancel.includes("h-9 px-4") || !fbCancel.includes("shadow-sm") || !fbCancel.includes("bg-surface")) {
    failures.push(`FORM_BUTTONS.cancel must be the reference's stock outline at h-9 px-4 (the token-computed-equal form) — read "${fbCancel.slice(0, 80)}…"`);
  }
  if (!fbAdd.includes("bg-neutral-900") || !fbAdd.includes("shadow")) {
    failures.push(`FORM_BUTTONS.add must be the reference's solid primary at its own --primary value rgb(23,23,23) — read "${fbAdd.slice(0, 80)}…"`);
  }
  for (const [name, path] of [
    ["events", "events/events-page.tsx"],
    ["exercise", "exercise/exercise-page.tsx"],
    ["assignments", "assignments/assignments-page.tsx"],
    ["reminders", "reminders/reminders-page.tsx"],
    ["goals", "goals/goals-page.tsx"],
    ["mentalhealth", "mentalhealth/mentalhealth-page.tsx"],
    ["studyresources", "studyresources/studyresources-page.tsx"],
  ] as const) {
    const src = strip(readFileSync(join(REPO_ROOT, `src/app/(app)/${path}`), "utf8"));
    if (!/FORM_BUTTONS\.cancel/.test(src)) {
      failures.push(`${name}: the form Cancel must ride FORM_BUTTONS.cancel (probed: the stock outline h-9)`);
    }
    if (/h-10 rounded-md border border-line px-8/.test(src)) {
      failures.push(`${name}: the h-10 px-8 outline Cancel retires — the reference's Cancel is the stock h-9 px-4`);
    }
  }
  // (h) the Add buttons: both consumers ride FORM_BUTTONS.add
  for (const [name, src] of [["mentalhealth", mhSrc], ["studyresources", srSrc]] as const) {
    if (!/FORM_BUTTONS\.add/.test(src)) {
      failures.push(`${name}: the Add button must ride FORM_BUTTONS.add (probed: the solid stock primary, bg rgb(23,23,23))`);
    }
  }
  // (i) the TAG_CHIP family + the retirements
  const TC = layoutSrc.match(/export const TAG_CHIP = \{([\s\S]*?)\n\} as const;/);
  expect(TC, "the TAG_CHIP record must exist in page-layout.ts").toBeTruthy();
  const tcChip = TC![1].match(/chip:\s*"([^"]*)"/)?.[1] ?? "";
  const tcRow = TC![1].match(/row:\s*"([^"]*)"/)?.[1] ?? "";
  if (!tcChip.includes("bg-emerald-100") || !tcChip.includes("text-emerald-700") || !tcChip.includes("px-3 py-1") || !tcChip.includes("text-sm")) {
    failures.push(`TAG_CHIP.chip must be the reference's emerald family "px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center gap-2" — read "${tcChip}"`);
  }
  if (tcRow !== "flex flex-wrap gap-2 mt-3") {
    failures.push(`TAG_CHIP.row must be "flex flex-wrap gap-2 mt-3" (probed) — read "${tcRow}"`);
  }
  if (/bg-primary\/10 px-2\.5 py-0\.5/.test(mhSrc) || /bg-primary\/10 px-2\.5 py-0\.5/.test(srSrc)) {
    failures.push("the primary/10 text-xs chip family retires — the reference's chips are the emerald px-3 py-1 text-sm family");
  }
  // the sr tags row: the reference's flex gap-2 mb-2 (the 4px artifact gap)
  if (!/flex gap-2 mb-2/.test(srSrc)) {
    failures.push("the sr tags input row must be the reference's `flex gap-2 mb-2` (probed: the label gap is the 4px line-box artifact, the mb-2 owns the row→chips gap)");
  }
  // (j) the Upload File field (the WH-4 absence claim is FALSE on the
  // redeployed reference)
  const UP = layoutSrc.match(/export const UPLOAD_FIELD = \{([\s\S]*?)\n\} as const;/);
  expect(UP, "the UPLOAD_FIELD record must exist in page-layout.ts").toBeTruthy();
  if (!/Upload File \(optional\)/.test(srSrc)) {
    failures.push('the sr form must carry the "Upload File (optional)" field (probed on the redeployed reference — the WH-4 absence claim is FALSE)');
  }
  if (!/type="file"/.test(srSrc) || !/flex-1/.test(srSrc)) {
    failures.push("the upload field is the bare stock file input at flex-1 inside the flex items-center gap-2 wrap (render-only — no persistence, no upload route)");
  }
  // (k) the Rating picker: the text-2xl stars + the Star-icon retirement
  const RP = layoutSrc.match(/export const RATING_PICKER = \{([\s\S]*?)\n\} as const;/);
  expect(RP, "the RATING_PICKER record must exist in page-layout.ts").toBeTruthy();
  const rpRow = RP![1].match(/row:\s*"([^"]*)"/)?.[1] ?? "";
  const rpStar = RP![1].match(/star:\s*"([^"]*)"/)?.[1] ?? "";
  if (rpRow !== "flex gap-2") {
    failures.push(`RATING_PICKER.row must be the reference's "flex gap-2" — read "${rpRow}"`);
  }
  if (rpStar !== "text-2xl") {
    failures.push(`RATING_PICKER.star must be the reference's "text-2xl" — read "${rpStar}"`);
  }
  // The Star-icon retirement is scoped to the FORM region — the sr LIST
  // card's read-only Star display (h-4 w-4, the amber fill) is a
  // separate surface never re-probed this round (the F-10 walk decoded
  // the form's picker; the list's own face rides the WH-27 ledger).
  const srFormStart = srSrc.indexOf("open &&");
  const srFormEnd = srSrc.indexOf("</section>", srFormStart);
  const srForm = srFormStart >= 0 && srFormEnd > srFormStart ? srSrc.slice(srFormStart, srFormEnd) : "";
  if (/fill-amber-400|hover:scale-110/.test(srForm)) {
    failures.push("the lucide Star icon picker retires — the reference's rating is five bare text-2xl ☆ buttons (our radiogroup semantics stay the superset)");
  }
  if (!/[☆★]/.test(srForm)) {
    failures.push("the rating buttons render the ☆/★ text glyphs (the reference's own form)");
  }

  expect(
    failures,
    "the form-interior family must hold — the WH-26 cure (the F-1 active-label bug + the redeployment round's field-interior cures)",
  ).toEqual([]);
});

it("WH-27: the sr chip-family census — the stock Badge on the sr form, the emerald on the mood form (the TWO-SITE SPLIT)", () => {
  // The WH-27 probe (live, client-state, the full-HTML decode): the two
  // tag-chip sites carry DIFFERENT families on the reference — the mood
  // form's chip is the emerald pill SPAN (px-3 py-1 bg-emerald-100
  // text-emerald-700 rounded-full text-sm + the bare × button + the row
  // flex flex-wrap gap-2 mt-3), while the sr form's chip is the stock
  // Badge DEFAULT variant rendered as a DIV (inline-flex items-center
  // rounded-md border px-2.5 py-0.5 text-xs font-semibold
  // transition-colors focus:outline-none focus:ring-2 focus:ring-ring
  // focus:ring-offset-2 text-foreground gap-2 — computed 22px,
  // transparent bg, border rgb(229,229,229), ink rgb(10,10,10)) + the
  // same bare × button + the row flex flex-wrap gap-2 BARE (no mt-3).
  // The WH-26 conversion generalized the mood decode to the sr site —
  // the sr site cures to its own family.
  const layoutSrc = readFileSync(join(REPO_ROOT, "src/lib/page-layout.ts"), "utf8");
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const failures: string[] = [];
  const mhSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/mentalhealth/mentalhealth-page.tsx"), "utf8"));
  const srSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/studyresources/studyresources-page.tsx"), "utf8"));

  // (a) the SR_CHIP record exists with the Badge-default classes in our
  // computed-equal tokens (border-line = the reference's border-input's
  // rgb(229,229,229); text-ink = its text-foreground's rgb(10,10,10))
  const SC = layoutSrc.match(/export const SR_CHIP = \{([\s\S]*?)\n\} as const;/);
  expect(SC, "the SR_CHIP record must exist in page-layout.ts").toBeTruthy();
  const scChip = SC![1].match(/chip:\s*"([^"]*)"/)?.[1] ?? "";
  const scRow = SC![1].match(/row:\s*"([^"]*)"/)?.[1] ?? "";
  for (const arm of ["inline-flex items-center rounded-md border", "border-line", "px-2.5 py-0.5", "text-xs font-semibold", "text-ink", "gap-2"]) {
    if (!scChip.includes(arm)) {
      failures.push(`SR_CHIP.chip must carry the reference's Badge-default arm "${arm}" — read "${scChip.slice(0, 90)}…"`);
    }
  }
  if (!/dark:border-neutral-700/.test(scChip) || !/dark:text-neutral-100/.test(scChip)) {
    failures.push("SR_CHIP.chip must carry our dark twins (the chromatic border-line/text-ink pair — the dark-pair census's requirement)");
  }
  if (scRow !== "flex flex-wrap gap-2") {
    failures.push(`SR_CHIP.row must be the reference's BARE "flex flex-wrap gap-2" (the mood site's mt-3 is its own) — read "${scRow}"`);
  }
  // (b) the sr page consumes SR_CHIP; TAG_CHIP retires from the sr site
  if (!/SR_CHIP\.chip/.test(srSrc) || !/SR_CHIP\.row/.test(srSrc)) {
    failures.push("the sr page must consume SR_CHIP.chip + SR_CHIP.row (the two-site split)");
  }
  if (/TAG_CHIP/.test(srSrc)) {
    failures.push("TAG_CHIP retires from the sr page — the emerald family is the MOOD form's own (probed: the sr chip is the stock Badge)");
  }
  // (c) the chip renders as a div (the reference's own form) with the
  // aria-label × superset
  if (!/<div key=\{tag\} className=\{SR_CHIP\.chip\}>/.test(srSrc)) {
    failures.push("the sr chips render as <div key={tag} className={SR_CHIP.chip}> (the reference renders a DIV, not a span)");
  }
  if (!/aria-label=\{`Remove tag \$\{tag\}`\}/.test(srSrc)) {
    failures.push("the × keeps our aria-label association (the superset over the reference's unlabelled bare button)");
  }
  // (d) the MOOD page keeps the emerald family (the split holds both ways)
  if (!/TAG_CHIP\.chip/.test(mhSrc) || !/TAG_CHIP\.row/.test(mhSrc)) {
    failures.push("the mood page KEEPS TAG_CHIP (the emerald family + the mt-3 row — the two-site split's other half)");
  }
  const TC = layoutSrc.match(/export const TAG_CHIP = \{([\s\S]*?)\n\} as const;/);
  const tcRow = TC![1].match(/row:\s*"([^"]*)"/)?.[1] ?? "";
  if (tcRow !== "flex flex-wrap gap-2 mt-3") {
    failures.push(`TAG_CHIP.row stays the mood site's "flex flex-wrap gap-2 mt-3" — read "${tcRow}"`);
  }

  expect(
    failures,
    "the sr chip family must hold — the WH-27 two-site split (the Badge on sr, the emerald on mood; never one family generalized across both)",
  ).toEqual([]);
});

it("WH-27: the rating-glyph census — the ⭐ fill (U+2B50, the reference's own emoji), never the ★ text glyph", () => {
  // The WH-27 probe (live, client-state, the full-HTML decode): clicking
  // the reference's 3rd star renders ⭐⭐⭐☆☆ — the selected stars flip to
  // the ⭐ EMOJI (U+2B50), the unselected stay ☆ (U+2606). The WH-26
  // "the reference's own click state is inert" narration was FALSE — the
  // fill exists; the WH-26 probe's ☆/★ regex could never match the emoji
  // codepoint (the decoder-vocabulary lesson). Our picker flips its fill
  // glyph to ⭐; the radiogroup semantics + the click-toggle stay the
  // functional superset.
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const srSrc = strip(readFileSync(join(REPO_ROOT, "src/app/(app)/studyresources/studyresources-page.tsx"), "utf8"));
  const failures: string[] = [];

  // (a) the fill: ⭐ for selected, ☆ for the rest — the ★ form retires
  if (!/n <= form\.rating \? "⭐" : "☆"/.test(srSrc)) {
    failures.push('the rating fill must render the reference\'s own pair — {n <= form.rating ? "⭐" : "☆"} (the ⭐ EMOJI U+2B50 for selected, never the ★ text glyph U+2605)');
  }
  if (/n <= form\.rating \? "★" : "☆"/.test(srSrc)) {
    failures.push('the ★ (U+2605) fill retires — the reference\'s selected stars render the ⭐ emoji (probed: ⭐⭐⭐☆☆ after the 3-star click)');
  }
  // (b) the semantics superset stays
  if (!/role="radiogroup"/.test(srSrc) || !/role="radio"/.test(srSrc) || !/aria-checked=\{form\.rating === n\}/.test(srSrc)) {
    failures.push("the radiogroup semantics stay (the role + the radio roles + aria-checked — our functional superset over the reference's unlabelled buttons)");
  }

  expect(
    failures,
    "the rating glyph family must hold — the WH-27 cure (the ⭐ fill + the semantics superset)",
  ).toEqual([]);
});
