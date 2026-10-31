import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";

// WH-5 (F-6): the docs-counts pin — the count-lockstep mechanism. The five
// companion docs' LIVE-TENSE count claims are documentation claims, and a
// stale claim is a bug the same way a stale count in AGENTS is (the repo's
// own skills/web-application SKILL.md §14: "Test counts are documentation
// claims … the proven mechanism is neo-crm's tests/docs-counts.test.ts,
// which puts every live-tense count site under the unit gate: a stale
// count anywhere fails `bun run test`").
//
// Why this pin exists: the WH-5 audit found the "14 models" claim live in
// all five docs while the schema has 15 — and every doc's OWN ENUMERATION
// listed 15 items under the wrong heading. The claim survived four
// proofread rounds (WH-1 through WH-4) because proofreading is not a gate.
// The same audit found three more stale technical claims (PAD §5.3's dead
// primitives list, SKILL §17's header-blur attribution, the z-40/z-[60]
// z-map in AGENTS + SKILL §18) — the same drift class.
//
// What the tree can count, this pin computes live (models, route families,
// ui modules, layout files, .tsx files, client files, unit suites, e2e
// specs) and compares against CANONICAL below — tree drift trips the pin.
// What only a run can count (unit checks, e2e checks, smoke checks) rides
// the CANONICAL literals under the count-ladder rule: when a test change
// moves a total, update the literal AND every doc site in the SAME commit
// (this pin fails until every site agrees — it IS the lockstep enforcer).
//
// Presence-of-truth, not absence-of-error: each doc must CARRY its
// canonical claims (prose may reword freely around them), and the only
// forbidden forms are unambiguously-wrong spellings that can never appear
// in legitimate history (a count the tree never had, a module the census
// retired). The scan reads ONLY the five docs — worklog, plans, session
// transcripts and the SKILL provenance block are history and stay exempt
// by construction.

const REPO_ROOT = join(import.meta.dirname, "..");

/** The five companion docs — the lockstep set (SKILL.md §how-to-use). */
const DOCS = [
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "Project_Architecture_Document.md",
  "wellness-hub_SKILL.md",
] as const;

/**
 * The canonical counts. Computed rows are re-derived from the tree in the
 * checks below (the value here must equal the computed value); run-only
 * rows (unitChecks, e2eChecks, smokeChecks) follow the count-ladder rule.
 */
const CANONICAL = {
  models: 15, // prisma/schema.prisma `^model` declarations
  apiRouteFamilies: 15, // directories under src/app/api/
  uiModules: 6, // .tsx modules under src/components/ui/
  unitSuites: 24, // tests/*.test.ts (INCLUDING this suite — WH-21: +tests/gradient-ink.test.ts)
  e2eSpecs: 6, // tests/e2e/*.spec.ts
  // Run-only totals — update with every doc site in the same commit:
  unitChecks: 340, // `bun run test` total (WH-21: 335 + the form-modality census + the two interaction-contrast extensions + the gradient-ink suite's two tests)
  e2eChecks: 60, // `CI=1 bun run test:e2e` total (WH-21: 57 + the CRUD modality leg + the a11y (e)/(f) legs)
  smokeChecks: 14, // scripts/smoke-test.sh ladder
  // WH-18: ThemeBoot joined src/components/layout/ — the counts move with it.
  layoutComponents: 8, // modules under src/components/layout/
  tsxFiles: 46, // src/**/*.tsx
  clientFiles: 27, // .tsx files headed "use client"
} as const;

/** Count spellings that can never be true of this tree — each one is a
 *  stale form the WH-5 audit found live in a doc (F-1..F-4). If a form's
 *  subject legitimately returns (a retired module comes back with a real
 *  reference surface), the census pin owns that change — this list and
 *  the census flip in the same commit, never silently. */
const FORBIDDEN_FORMS = [
  "14 models", // the schema never had 14 — the WH-1-era miscount
  "Fourteen models", // the same claim, spelled out (PAD §4.1's heading)
  "14-model domain", // the same claim, compound-adjective form (PAD §3.2/§12
  // — the WH-10 round: the hyphenated spelling escaped both the WH-5 cure
  // and this list for five rounds). Pinned at the full drift PHRASE, not
  // the bare "14-model" prefix: the SKILL's own history legitimately says
  // "the 14-models count" (the WH-5 cure narration), and this scan is a
  // flat substring match — the form must not collide with history.
  "button (variants", // PAD §5.3's dead-primitive enumeration (WH-4 retired)
  "topbar z-40", // AGENTS' stale z-map row — no z-40 class exists in src
  "dropdown portals z-[60]", // the dropdown module retired at WH-4
  "backdrop-blur-sm at the re-pinned 4px", // SKILL §17's wrong header-blur
] as const;

function readDoc(name: (typeof DOCS)[number]): string {
  return readFileSync(join(REPO_ROOT, name), "utf8");
}

/** The claims each doc must carry (built from CANONICAL so the count
 *  ladder cannot leave a doc behind). Grouped per doc because each doc's
 *  phrasing is its own — the pin asserts the NUMBER stays present, not
 *  the sentence around it. */
const DOC_CLAIMS: Record<(typeof DOCS)[number], string[]> = {
  "README.md": [
    `${CANONICAL.unitChecks} checks / ${CANONICAL.unitSuites} suites`,
    `${CANONICAL.unitChecks} unit + ${CANONICAL.e2eChecks} e2e`,
    `${CANONICAL.models} route-handler families`,
    `${CANONICAL.models} models`,
    "six live primitives (dialog, input, label, select, tabs, toast)",
  ],
  "AGENTS.md": [
    `Unit tests (${CANONICAL.unitChecks} checks)`,
    `Browser E2E (${CANONICAL.e2eChecks} checks)`,
    `(${CANONICAL.unitChecks})`,
    `${CANONICAL.e2eChecks}: 6 specs`,
    `${CANONICAL.apiRouteFamilies}-family API set`,
    "z-10", // the glass header's true layer (F-4: the docs said z-40)
  ],
  "CLAUDE.md": [
    `Vitest unit suite (${CANONICAL.unitChecks} checks)`,
    `Unit (Vitest, ${CANONICAL.unitChecks} checks / ${CANONICAL.unitSuites} suites)`,
    `${CANONICAL.e2eChecks} checks — 6 specs`,
    `${CANONICAL.models} models`,
  ],
  "Project_Architecture_Document.md": [
    `${CANONICAL.apiRouteFamilies} families`,
    `${CANONICAL.models} models`,
    "six live primitives",
    `Vitest *.test.ts (${CANONICAL.unitSuites} suites, ${CANONICAL.unitChecks} checks)`,
    `${CANONICAL.unitChecks} unit checks / ${CANONICAL.unitSuites} Vitest suites + ${CANONICAL.e2eChecks} e2e checks / 6 specs`,
    `${CANONICAL.smokeChecks}/${CANONICAL.smokeChecks}`,
  ],
  "wellness-hub_SKILL.md": [
    `${CANONICAL.unitChecks} checks / ${CANONICAL.unitSuites} suites`,
    `${CANONICAL.e2eChecks} checks (6 specs + the auth setup project)`,
    `${CANONICAL.models} models`,
    `${CANONICAL.clientFiles} of ${CANONICAL.tsxFiles} .tsx files`,
    `${CANONICAL.tsxFiles} .tsx files total; ${CANONICAL.clientFiles} are`,
    "SIX live modules",
    `(${CANONICAL.layoutComponents} files`,
    "backdrop-blur-xl", // the header's true glass (F-3: §17 credited the 4px pin)
    "z-10", // the z-map's true header row (F-4)
    `${CANONICAL.smokeChecks}/${CANONICAL.smokeChecks}`,
    `11 templates / 50 steps / 12 tutorials / 8 badges`,
  ],
} as const;

// ---- the tree's computed counts ---------------------------------------------

/** Recursively collect files under `dir` matching `test`. */
function collectFiles(dir: string, out: string[], test: (name: string) => boolean): void {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) collectFiles(full, out, test);
    else if (test(name)) out.push(full);
  }
}

it("WH-5: the tree's computed counts — models, families, modules, files", () => {
  const schema = readFileSync(join(REPO_ROOT, "prisma", "schema.prisma"), "utf8");
  const models = (schema.match(/^model /gm) ?? []).length;
  expect(models, "prisma/schema.prisma `^model` count").toBe(CANONICAL.models);

  const families = readdirSync(join(REPO_ROOT, "src", "app", "api"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory()).length;
  expect(families, "src/app/api route families").toBe(CANONICAL.apiRouteFamilies);

  const uiModules = readdirSync(join(REPO_ROOT, "src", "components", "ui"))
    .filter((name) => /\.tsx?$/.test(name)).length;
  expect(uiModules, "src/components/ui modules").toBe(CANONICAL.uiModules);

  const layout = readdirSync(join(REPO_ROOT, "src", "components", "layout"))
    .filter((name) => /\.(ts|tsx)$/.test(name)).length;
  expect(layout, "src/components/layout modules").toBe(CANONICAL.layoutComponents);
});

it("WH-5: the tree's computed counts — the .tsx and client-file census", () => {
  const tsx: string[] = [];
  collectFiles(join(REPO_ROOT, "src"), tsx, (name) => name.endsWith(".tsx"));
  expect(tsx.length, "src/**/*.tsx files").toBe(CANONICAL.tsxFiles);

  const client = tsx.filter((file) =>
    /^\s*["']use client["']/m.test(readFileSync(file, "utf8")),
  ).length;
  expect(client, '"use client" .tsx files').toBe(CANONICAL.clientFiles);
});

it("WH-5: the tree's computed counts — the test-suite census", () => {
  const suites = readdirSync(join(REPO_ROOT, "tests"))
    .filter((name) => name.endsWith(".test.ts")).length;
  expect(suites, "tests/*.test.ts suites (incl. this one)").toBe(CANONICAL.unitSuites);

  const specs = readdirSync(join(REPO_ROOT, "tests", "e2e"))
    .filter((name) => name.endsWith(".spec.ts")).length;
  expect(specs, "tests/e2e/*.spec.ts specs").toBe(CANONICAL.e2eSpecs);
});

// ---- the five docs carry the canonical claims --------------------------------

for (const doc of DOCS) {
  it(`WH-5: ${doc} carries its canonical count claims`, () => {
    const text = readDoc(doc);
    const missing = DOC_CLAIMS[doc].filter((claim) => !text.includes(claim));
    expect(
      missing,
      `${doc} is missing its canonical claims — the count ladder requires every doc site in the SAME commit (update CANONICAL + every doc when a total moves)`,
    ).toEqual([]);
  });
}

// ---- PAD §8.1's distribution table carries row arithmetic --------------------

// WH-10 (F-2/F-3): the §8.1 test-distribution table's rows are the
// table's entire content, and only the TOTALS were pinned — the WH-7
// retirement decremented the total (331→309, lockstep-enforced) while
// the unpinned infra row above it kept its stale count, and four
// subsequent rounds hand-incremented the wrong base (121→130→133→
// [WH-7's −22 never applied]→136→138 against a truth of 116). A
// distribution table whose rows don't sum is a lie with a true bottom
// line. The check parses the rows and asserts the SUMS — arithmetic,
// not per-row presence, so a legitimate category redistribution (a
// test file moving between rows) never trips it; only arithmetic
// falsehood and total moves (the count-ladder rule) do.

/** A table row's bare-number cells (`| N |` with digits only — the
 * e2e rows' spec-count cells carry words: "1 spec", "1 setup").
 * Split-on-pipe, not a consuming regex: adjacent `| N | M |` cells
 * share a pipe, so `\| (\d+) \|` loses every second cell. */
function bareNumberCells(line: string): number[] {
  return line
    .split("|")
    .map((cell) => cell.trim())
    .filter((cell) => /^\d+$/.test(cell))
    .map(Number);
}

it("WH-10: PAD §8.1's test-distribution rows sum to the canonical totals", () => {
  const pad = readDoc("Project_Architecture_Document.md");

  const unitRows = pad.match(/^\| Unit —.*$/gm) ?? [];
  expect(unitRows.length, "§8.1 unit rows (auth / wellness / infra)").toBe(3);
  const unitFiles = unitRows.reduce((sum, row) => sum + (bareNumberCells(row)[0] ?? 0), 0);
  const unitChecks = unitRows.reduce((sum, row) => sum + (bareNumberCells(row)[1] ?? 0), 0);
  expect(unitFiles, "§8.1 unit rows' files sum (must equal the suite count)").toBe(CANONICAL.unitSuites);
  expect(
    unitChecks,
    "§8.1 unit rows' checks sum — the rows must add up to the canonical total (a row that kept a retired count's base is exactly the WH-10 F-2 drift)",
  ).toBe(CANONICAL.unitChecks);

  const e2eRows = pad.match(/^\| E2E —.*$/gm) ?? [];
  expect(e2eRows.length, "§8.1 e2e rows (auth / mobile / shell / a11y / setup / crud+reset)").toBe(6);
  const e2eChecks = e2eRows.reduce((sum, row) => sum + (bareNumberCells(row)[0] ?? 0), 0);
  expect(e2eChecks, "§8.1 e2e rows' checks sum").toBe(CANONICAL.e2eChecks);
});

// ---- no doc carries a known-wrong form ---------------------------------------

it("WH-5: no doc carries a known-wrong count form", () => {
  const hits: string[] = [];
  for (const doc of DOCS) {
    const text = readDoc(doc);
    for (const form of FORBIDDEN_FORMS) {
      if (text.includes(form)) hits.push(`${doc}: "${form}"`);
    }
  }
  expect(
    hits,
    "stale count/claim forms still live in the doc set — cure the doc at the tree's truth (the census pins own the tree; this list owns the stale spellings)",
  ).toEqual([]);
});
