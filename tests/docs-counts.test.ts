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
  unitSuites: 27, // tests/*.test.ts (INCLUDING this suite — WH-90: +tests/clean-account.test.ts, the theme-axis clean-account contract)
  e2eSpecs: 6, // tests/e2e/*.spec.ts
  // Run-only totals — update with every doc site in the same commit:
  unitChecks: 383, // `bun run test` total (WH-94: 382 + the src-census dev-script-hygiene pin — the tee'd dev.log Fast-Refresh reload-loop cure; the WH-90 theme-axis pins and the WH-80 sixth-doc scan rode the same ladder)
  e2eChecks: 72, // `CI=1 bun run test:e2e` total (WH-37: 71 + the demo-face leg, the seeded mood entry's rendered face)
  smokeChecks: 14, // scripts/smoke-test.sh ladder
  // WH-18: ThemeBoot joined src/components/layout/ — the counts move with it.
  layoutComponents: 8, // modules under src/components/layout/
  tsxFiles: 46, // src/**/*.tsx
  clientFiles: 27, // .tsx files headed "use client"
  // WH-78: the capture-set census — the faces on disk own the set.
  screenshotFaces: 34, // docs/screenshots/NN-*.png capture faces (WH-29's committed 34-file procedure)
  screenshotDesktop: 29, // at 1280×900 (scripts/capture-round.mjs owns the split)
  screenshotMobile: 5, // at 390×844
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
    `${CANONICAL.screenshotDesktop} desktop (1280×900) + ${CANONICAL.screenshotMobile} mobile (390×844)`,
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
  expect(unitRows.length, "§8.1 unit rows (auth / wellness / infra / seed-parity)").toBe(4);
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

// ---- WH-77: live-tense command-block count annotations -----------------------

// WH-77 (F-1): presence-of-truth cannot see a stale-but-legitimate
// count. The SKILL §11 pre-ship block carried "369/369 (26 suites)" six
// count-ladder moves after the tree left 369 behind — a LIVE-TENSE
// command annotation (the copy-paste block an operator runs verbatim),
// not history narration, so neither DOC_CLAIMS (the canonical 376 is
// present elsewhere in the same file) nor FORBIDDEN_FORMS (369 was a
// real count once) could see it. This scan is exhaustive over the
// command-block form: every `bun run test` / `bun run test:e2e` line
// that annotates an NNN/NNN result on the SAME line must carry the
// CANONICAL total. History narration stays exempt by construction —
// the pattern requires the command and the count annotation together.

it("WH-77: command-block test-count annotations carry the canonical totals", () => {
  const hits: string[] = [];
  for (const doc of DOCS) {
    const text = readDoc(doc);
    // two live-tense forms: the fenced command block (`bun run test … #
    // NNN/NNN`) and the PAD's backtick-arrow prose (`bun run test` →
    // NNN/NNN). The suite annotation form ("377 checks, 26 suites")
    // stays owned by DOC_CLAIMS — this scan owns only the NNN/NNN form.
    // (plain groups, not named — the tsconfig target predates ES2018)
    const re = /`?bun run test(:e2e)?`?[^#\n→]*(?:#|→)\s*(\d{2,4})\/(\d{2,4})/g;
    for (const m of text.matchAll(re)) {
      const isE2e = m[1] !== undefined;
      const want = isE2e ? CANONICAL.e2eChecks : CANONICAL.unitChecks;
      const line = m[0].replace(/\s+/g, " ").trim();
      // m[1] is the optional :e2e group; the NNN/NNN pair is m[2]/m[3]
      if (m[2] !== m[3]) hits.push(`${doc}: "${line}" — the pair is self-inconsistent`);
      else if (Number(m[2]) !== want)
        hits.push(`${doc}: "${line}" — stale count (canonical ${want}; the command block moves in the SAME commit as the count-ladder move)`);
    }
  }
  expect(
    hits,
    "live-tense command-block count annotations must carry the canonical totals",
  ).toEqual([]);
});

// ---- WH-78: the capture-set range claims ---------------------------------------

// WH-78 (F-1): presence-of-truth cannot see a stale SET claim either.
// The SKILL Appendix-B Screenshots row still carried `docs/screenshots/
// 01-16` — "12 desktop + 4 mobile" — eleven rounds after WH-29 committed
// the canonical 34-file capture procedure (29 desktop + 5 mobile), and
// the §17 mobile-testing row's `docs/screenshots/13-16` sub-range omitted
// the fifth mobile face (19-dark-mobile-nav-open, born with the WH-30
// dark set). Neither DOC_CLAIMS (the split was claimed nowhere) nor
// FORBIDDEN_FORMS (16 was a real count once; 13-16 a real sub-range)
// could see either. This scan is exhaustive over the RANGE-CLAIM form:
// every `docs/screenshots/NN-NN` claim in the five docs must carry the
// LIVE set range, computed from the capture faces on disk — the census
// owns the set, the Appendix-B Screenshots row owns the description,
// and a face added or retired by a future capture procedure moves
// CANONICAL + every claim in the SAME commit. History narration stays
// exempt by construction: it names faces by file (the 29-quick-actions-
// hover form), never by the path+range claim form.

it("WH-78: capture-set range claims carry the live screenshots range", () => {
  const faces = readdirSync(join(REPO_ROOT, "docs", "screenshots"))
    .filter((name) => /^\d{2}-.*\.png$/.test(name));
  expect(faces.length, "docs/screenshots capture faces").toBe(CANONICAL.screenshotFaces);
  expect(
    CANONICAL.screenshotDesktop + CANONICAL.screenshotMobile,
    "the desktop/mobile split must sum to the face census",
  ).toBe(CANONICAL.screenshotFaces);
  const nums = faces.map((name) => Number(name.slice(0, 2)));
  const range = `${String(Math.min(...nums)).padStart(2, "0")}-${String(Math.max(...nums)).padStart(2, "0")}`;
  const hits: string[] = [];
  for (const doc of DOCS) {
    const text = readDoc(doc);
    for (const m of text.matchAll(/docs\/screenshots\/\d{2}-\d{2}/g)) {
      if (m[0] !== `docs/screenshots/${range}`)
        hits.push(`${doc}: "${m[0]}" — stale range (the live set is ${range}; a capture-procedure change moves CANONICAL + every claim in the SAME commit)`);
    }
  }
  expect(
    hits,
    "docs/screenshots range claims must carry the live set range",
  ).toEqual([]);
});

// ---- WH-79: the SKILL frontmatter freshness stamp -----------------------------

// WH-79 (F-1): presence-of-truth cannot see a stale METADATA claim. The
// SKILL frontmatter carried `last_updated: 2026-11-03` through TWO rounds
// that materially edited the SKILL body (WH-77, 2026-11-05: the pre-ship
// command-annotation cure; WH-78, 2026-11-06: the three Appendix-B row
// cures + the two count-ladder sites) — a live-tense freshness claim that
// went false at WH-77 and stayed false through WH-78, invisible to
// DOC_CLAIMS (no canonical date pin), FORBIDDEN_FORMS (the old date was a
// real date once — history, never a never-true form) and every census.
// The tree-computable truth for "when was the skill last validated": the
// docs/plans/ round ledger — every round ships exactly one dated plan
// (YYYY-MM-DD-sessionNN-remediation-plan.md), so the NEWEST plan date is
// the current round's date. The stamp's semantics upgrade from
// "content-changed date" (unpinnable — a flat-SKILL round legitimately
// touches nothing) to "validated-through date" (pinnable): it carries the
// newest plan's date, moving in the SAME commit as every round that
// ships. History narration stays exempt by construction — the scan reads
// only the frontmatter `last_updated:` line, never the body.

it("WH-79: the SKILL frontmatter freshness stamp carries the newest plan date", () => {
  const planDates = readdirSync(join(REPO_ROOT, "docs", "plans"))
    .map((name) => (/^(\d{4}-\d{2}-\d{2})-.*\.md$/.exec(name) ?? [])[1])
    .filter((date) => date !== undefined);
  expect(planDates.length, "docs/plans carries dated plan files").toBeGreaterThan(0);
  const newest = planDates.sort()[planDates.length - 1];

  const skill = readDoc("wellness-hub_SKILL.md");
  const stamp = (/^last_updated:\s*(\d{4}-\d{2}-\d{2})\s*$/m.exec(skill) ?? [])[1];
  expect(
    stamp,
    "the SKILL frontmatter carries a parseable last_updated stamp (YYYY-MM-DD)",
  ).toBeDefined();
  expect(
    stamp,
    `the SKILL freshness stamp is stale — the docs/plans round ledger on disk says ${newest}; the stamp is a validated-through claim and moves in the SAME commit as the round that ships`,
  ).toBe(newest);
});

// ---- WH-80: the sixth-doc claims — docs/DEPLOYMENT.md --------------------------

// WH-80 (F-1): presence-of-truth cannot see a doc the pin never reads.
// docs/DEPLOYMENT.md is REFERENCED from README ("the details live in
// docs/DEPLOYMENT.md") and carries OPERATIONAL claims an operator acts
// on — but the DOCS set above covers only the five companion docs, so
// DEPLOYMENT.md rode outside every scan and shipped five stale claims:
// (1) the ORBITAL name slip at three sites — the sibling-project
// copy-paste genus the repo's own docs/web-app-codebase-evaluation-
// report.md documented in the siblings ("zero-balance/DEPLOYMENT.md
// says 'ORBITAL ships…' — copy-paste artifact from sibling project");
// (2) §1's "29 API route files (41 verb handlers)" vs the tree's 31
// files / 48 handlers; (3) §3's PRE-session-169/170 AUTH_SECRET row
// ("shorter values fall back to the insecure dev constant… instead of
// the run-time error an absent value raises") — the shipping boot gate
// (src/lib/boot-env.ts, pinned by tests/boot-env.test.ts + smoke leg
// 13) refuses to boot on a missing OR short secret, the opposite
// operational posture; (4) §6's health example `{"status":"ok",...}`
// vs the live `{"ok":true,"data":{"status":"healthy","db":"up"}}`.
// This scan reads DEPLOYMENT.md's four claim forms: the sibling-name
// forbidden forms (case-insensitive — a sibling project's name can
// never be legitimate here), the route-count claim COMPUTED LIVE from
// the recursive src/app/api walk (tree drift trips the pin), the
// AUTH_SECRET row's fail-hard form ("refuses to boot" — the boot
// gate's own message vocabulary), and the health example's live shape
// ("healthy"). History narration stays exempt by construction: the
// scan reads only DEPLOYMENT.md, whose four claim forms are all
// live-tense operational claims, never round narration.

it("WH-80: DEPLOYMENT.md carries the tree's live operational claims", () => {
  const text = readFileSync(join(REPO_ROOT, "docs", "DEPLOYMENT.md"), "utf8");
  const hits: string[] = [];

  // (1) The sibling-name forms — a sibling project's app name can never
  // be legitimate in this repo's deployment doc (the app is Wellness
  // Hub everywhere else in the doc set).
  for (const m of text.matchAll(/[Oo][Rr][Bb][Ii][Tt][Aa][Ll]/g)) {
    hits.push(`the sibling-project name form "${m[0]}" — the app is Wellness Hub`);
  }

  // (2) The route-count claim, computed live: every "NN API route files
  // (NN verb handlers)" sentence must carry the recursive walk's truth.
  const routeFiles: string[] = [];
  collectFiles(join(REPO_ROOT, "src", "app", "api"), routeFiles, (name) => name === "route.ts");
  let verbHandlers = 0;
  for (const file of routeFiles) {
    const src = readFileSync(file, "utf8");
    verbHandlers += (src.match(/export async function (?:GET|POST|PUT|PATCH|DELETE)\b/g) ?? []).length;
  }
  for (const m of text.matchAll(/(\d+) API route files \((\d+) verb handlers\)/g)) {
    const line = m[0];
    if (Number(m[1]) !== routeFiles.length || Number(m[2]) !== verbHandlers) {
      hits.push(
        `"${line}" — stale counts (the tree carries ${routeFiles.length} route files / ${verbHandlers} verb handlers; the claim moves in the SAME commit as any route change)`,
      );
    }
  }

  // (3) The AUTH_SECRET row must carry the fail-hard form — the boot
  // gate's own vocabulary (boot-env.ts: "the server refuses to boot").
  const secretRow = text
    .split("\n")
    .find((line) => line.startsWith("| `AUTH_SECRET`"));
  if (secretRow === undefined) {
    hits.push("the AUTH_SECRET table row is missing from §3");
  } else if (!secretRow.includes("refuses to boot")) {
    hits.push(
      `the AUTH_SECRET row does not carry the fail-hard form — the shipping boot gate refuses to boot on a missing OR short secret in production (src/lib/boot-env.ts, smoke leg 13); the row says: ${secretRow.replace(/\s+/g, " ").trim()}`,
    );
  }

  // (4) The health example must carry the live shape — session-36 moved
  // the status off "ok" (the honest-503 cure) and the envelope wraps it.
  const healthLine = text
    .split("\n")
    .find((line) => line.includes("/api/health"));
  if (healthLine === undefined) {
    hits.push("the /api/health verification example is missing from §6");
  } else if (!healthLine.includes("healthy")) {
    hits.push(
      `the /api/health example carries a stale shape — the live endpoint answers {"ok":true,"data":{"status":"healthy","db":"up"}}; the line says: ${healthLine.replace(/\s+/g, " ").trim()}`,
    );
  }

  expect(
    hits,
    "docs/DEPLOYMENT.md (the sixth doc, referenced from README) must carry the tree's live operational claims",
  ).toEqual([]);
});
