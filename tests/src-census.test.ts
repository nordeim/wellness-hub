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
  "src/components/shared/page-parts.tsx:PageHeader": ["actions", "subtitle", "title"],
  "src/components/shared/page-parts.tsx:GradientButton": ["children"],
  "src/components/shared/page-parts.tsx:SectionCard": ["action", "children", "icon", "title"],
  "src/components/shared/page-parts.tsx:EmptyState": ["hint", "icon"],
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
