// The demo-account DATA parity contract (WH-37, F-2).
//
// The round's core finding: the reference's demo account carries ONE
// mood entry (decoded live on both apps — the reference's journey row
// renders [Good / Oct 29, 2026 / Energy Level: 5/10], no activities,
// no gratitude, no reflection), while our seeded demo account carried
// ZERO — three rendered faces differed on the same login (the
// mental-health stat trio 5.0/10·1·1 vs 0.0/10·0·0, the dashboard's
// Mood Entries tile 1 vs 0, and the Recent Activity feed's
// 💚 "Mood check-in / good / Oct 29" row vs our "No recent activity"
// empty state). The gap rode invisible since WH-28: the watch pins the
// reference's "1 entry" against its own ledger, the census pinned our
// moods=0 against its own contract — two pins, two clocks (lesson 39
// on the DATA axis), never diffed.
//
// This suite pins the cure at the SOURCE level (the seed and the
// census are executable scripts, not importable modules — the
// fs-read pattern the route-census pin owns). The RENDERED face is
// pinned by the e2e demo-face leg; this suite keeps the data contract
// itself from regressing silently.
//
// The entry's date is FIXED (2026-10-29) because the reference's own
// row is fixed data — its demo entry renders "Oct 29, 2026" on every
// round, and a relative seed date would drift the two faces apart
// over time. Local noon keeps the rendered date stable across
// timezone offsets (formatDate renders the local date parts).

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const REPO_ROOT = join(import.meta.dirname, "..");
const SEED = readFileSync(join(REPO_ROOT, "prisma", "seed.ts"), "utf8");
const CENSUS = readFileSync(join(REPO_ROOT, "scripts", "census.ts"), "utf8");

describe("WH-37 F-2: the demo-account data parity contract", () => {
  it("the seed mirrors the reference's demo mood entry — one row, good/energy 5, the FIXED 2026-10-29 date, no optional fields", () => {
    // exactly ONE moodEntry.create in the seed — the mirrored demo row
    const creates = SEED.match(/db\.moodEntry\.create\b/g) ?? [];
    expect(creates.length, "the seed writes exactly one demo mood entry").toBe(1);

    // the mirrored values (decoded live on the reference's demo
    // account: journey row "Good / Oct 29, 2026 / Energy Level: 5/10",
    // no activities/gratitude/reflection lines)
    expect(SEED, "the demo entry's mood mirrors the reference's row").toMatch(/mood:\s*"good"/);
    expect(SEED, "the demo entry's energy mirrors the reference's 5/10 (avg 5.0/10)").toMatch(/energy:\s*5\b/);
    // the FIXED date — local noon Oct 29 2026 (new Date(2026, 9, 29, …):
    // month index 9 = October; the reference's row is fixed data)
    expect(SEED, "the demo entry's date is the FIXED 2026-10-29 (local-noon form)").toMatch(
      /new Date\(2026,\s*9,\s*29,\s*12,\s*0,\s*0\)/,
    );
    // the demo entry's userId is wired to the demo user's upsert id
    expect(SEED, "the demo entry belongs to the demo user").toMatch(/userId:\s*demo\.id/);
    // NO optional fields on the mirrored row — the reference's journey
    // row renders no activities/gratitude/reflection lines
    expect(SEED, "the demo entry carries no activities").not.toMatch(/activities:\s*"/);
    expect(SEED, "the demo entry carries no gratitude").not.toMatch(/gratitude:\s*"/);
    expect(SEED, "the demo entry carries no reflection").not.toMatch(/reflection:\s*"/);
    // the seed never awards badges for the seeded row (the badge engine
    // awards at the API CRUD seams only — the capture-state doctrine's
    // badgesEarned=0 assertion depends on this)
    expect(SEED, "the seed writes the entry directly — awardBadges is an API-seam concern").not.toMatch(
      /awardBadges/,
    );
  });

  it("the census contract reads the DEMO face — moodEntries: 1 (the corrected premise)", () => {
    // The stale premise (PAD §11's "Reference's empty-state data" row,
    // now amended): "the per-user domain tables seed EMPTY (the
    // reference's own fresh-account face)" — a FRESH signup account
    // conflated with THE demo account the parity doctrine mirrors.
    // The reference's DEMO account carries one mood entry; the census
    // contract must read it.
    expect(CENSUS, "EXPECTED.moodEntries reads 1 — the demo account's mirrored face").toMatch(
      /moodEntries:\s*1\b/,
    );
    // the OTHER per-user domain tables stay empty — the reference's
    // demo account carries no workouts/assignments/events/goals rows
    // (the watch's dashboard tiles read 0/1/0/0 on the reference)
    expect(CENSUS).toMatch(/workouts:\s*0\b/);
    expect(CENSUS).toMatch(/assignments:\s*0\b/);
    expect(CENSUS).toMatch(/events:\s*0\b/);
    expect(CENSUS).toMatch(/goals:\s*0\b/);
  });
});

// WH-42 (F-1): the seeded template grid-ORDER contract. The decode
// found the reference had re-ordered its eleven routine templates (the
// rendered card SEQUENCE is part of the face — the seeded-content watch
// byte-pins the NAMES and the e2e finds templates by text, so the ORDER
// rode invisible through every round since WH-24; the two-clocks class
// on the ORDER axis: our seed was decoded once and never re-diffed).
// This pin reads the seed SOURCE (the fs-read pattern this suite owns)
// and asserts the sortOrder-sorted key sequence equals the reference's
// live grid order, decode-settled 2026-11-01 (two consecutive same-round
// reads identical; the rendered face is pinned live by
// scripts/parity-routines.mjs's ORDER member — this is the offline
// guard that keeps the seed from silently regressing between rounds).
describe("WH-42 F-1: the seeded template grid-order contract", () => {
  it("the ROUTINE_TEMPLATES sortOrder sequence mirrors the reference's live grid order (decoded 2026-11-01)", () => {
    // slice to the ROUTINE_TEMPLATES array (the tutorials follow it)
    const marker = SEED.indexOf("const ROUTINE_TEMPLATES");
    expect(marker, "the seed carries the ROUTINE_TEMPLATES array").toBeGreaterThan(0);
    const body = SEED.slice(marker, SEED.indexOf("];", marker));
    // the (key, sortOrder) pairs in source order
    const pairs = [...body.matchAll(/key:\s*"([^"]+)"[\s\S]*?sortOrder:\s*(\d+)/g)].map(
      (m) => ({ key: m[1], sortOrder: Number(m[2]) }),
    );
    expect(pairs.length, "eleven seeded templates").toBe(11);
    // every sortOrder unique 0..10
    const orders = pairs.map((p) => p.sortOrder).sort((a, b) => a - b);
    expect(orders).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // the sortOrder-sorted sequence == the reference's live grid order
    const byOrder = [...pairs].sort((a, b) => a.sortOrder - b.sortOrder).map((p) => p.key);
    expect(byOrder).toEqual([
      "10_minute_home_workout",
      "5_minute_morning_energizer",
      "the_pomodoro_power_study_session",
      "self_care_sunday_reset",
      "calm_evening_wind_down",
      "focused_study_session",
      "creative_flow_session",
      "energizing_morning_kickstart",
      "self_care_sunday",
      "quick_productivity_reset",
      "peaceful_evening_wind_down",
    ]);
  });

  it("the seeded benefits lists mirror the reference's rendered rows — the WH-42 trim (every template exactly three; the six video templates' lists exact)", () => {
    // The parity-routines born-flight caught the second half of the
    // reference's content re-authoring: its six VIDEO templates render
    // THREE benefit rows where ours rendered four (the 4th row dropped
    // in the same edit class as the order change — the plain five
    // carried three all along, which is why the WH-24 decode never saw
    // the split). The rendered face is the parity claim; the seed
    // mirrors what the reference RENDERS (the live pin is the
    // benefits.texts member in scripts/parity-routines.mjs).
    const marker = SEED.indexOf("const ROUTINE_TEMPLATES");
    const body = SEED.slice(marker, SEED.indexOf("];", marker));
    const entries = [...body.matchAll(/key:\s*"([^"]+)"[\s\S]*?benefits:\s*\[([^\]]*)\]/g)].map(
      (m) => ({
        key: m[1],
        benefits: [...m[2].matchAll(/"([^"]*)"/g)].map((q) => q[1]),
      }),
    );
    expect(entries.length, "eleven seeded templates").toBe(11);
    for (const e of entries) {
      expect(
        e.benefits.length,
        `${e.key} renders the reference's three benefit rows (the WH-42 trim)`,
      ).toBe(3);
    }
    // the six video templates' decoded reference lists, exact
    const byKey = new Map(entries.map((e) => [e.key, e.benefits]));
    expect(byKey.get("focused_study_session")).toEqual([
      "Maximizes retention and understanding",
      "Prevents burnout",
      "Builds consistent study habits",
    ]);
    expect(byKey.get("creative_flow_session")).toEqual([
      "Reduces perfectionism",
      "Builds creative confidence",
      "Provides stress relief",
    ]);
    expect(byKey.get("energizing_morning_kickstart")).toEqual([
      "Boosts energy and alertness",
      "Reduces morning stress",
      "Creates positive momentum for the day",
    ]);
    expect(byKey.get("self_care_sunday")).toEqual([
      "Reduces Sunday anxiety",
      "Makes the week feel manageable",
      "Prioritizes self-compassion",
    ]);
    expect(byKey.get("quick_productivity_reset")).toEqual([
      "Clears mental fog",
      "Reduces overwhelm",
      "Restores motivation",
    ]);
    expect(byKey.get("peaceful_evening_wind_down")).toEqual([
      "Improves sleep quality",
      "Reduces anxiety",
      "Creates closure on the day",
    ]);
  });
});

// WH-43 (F-1): the tutorial grid-order contract. The ninth-surface
// decode (scripts/parity-tutorials.mjs's precursor, the scratch decode
// probe) found the reference's tutorial grid RE-ORDERED — the exact
// class the WH-42 round cured for the ROUTINE_TEMPLATES grid: the set
// is identical (all twelve titles + per-title data byte-equal), only
// the SEQUENCE moved (the head 1-6 + the tail 9-12 reshuffled;
// positions 7-8 held). The order is part of the rendered face; the
// watch byte-pins the COUNTS (12 imgs / 12 Watch Now) and the e2e
// finds tutorials by TEXT — the order rode invisible between rounds.
// The live pin is the ORDER member in scripts/parity-tutorials.mjs;
// this is the offline guard that keeps the seed from silently
// regressing between rounds (decoded live 2026-11-02, two consecutive
// same-round reads identical).
describe("WH-43 F-1: the seeded tutorial grid-order contract", () => {
  it("the TUTORIALS sortOrder sequence mirrors the reference's live grid order (decoded 2026-11-02)", () => {
    const marker = SEED.indexOf("const TUTORIALS");
    expect(marker, "the seed carries the TUTORIALS array").toBeGreaterThan(0);
    const body = SEED.slice(marker, SEED.indexOf("];", marker));
    // the (key, sortOrder) pairs in source order
    const pairs = [...body.matchAll(/key:\s*"([^"]+)"[\s\S]*?sortOrder:\s*(\d+)/g)].map(
      (m) => ({ key: m[1], sortOrder: Number(m[2]) }),
    );
    expect(pairs.length, "twelve seeded tutorials").toBe(12);
    // every sortOrder unique 0..11
    const orders = pairs.map((p) => p.sortOrder).sort((a, b) => a - b);
    expect(orders).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    // the sortOrder-sorted sequence == the reference's live grid order
    const byOrder = [...pairs].sort((a, b) => a.sortOrder - b.sortOrder).map((p) => p.key);
    expect(byOrder).toEqual([
      "the_power_of_tiny_habits",
      "self_compassion_for_perfectionists",
      "overcoming_procrastination_the_2_minute_rule",
      "building_morning_routines_that_actually_stick",
      "beating_decision_fatigue",
      "the_science_of_motivation",
      "healthy_meal_prep_guide",
      "building_better_habits",
      "10_minute_morning_yoga_flow",
      "mindfulness_meditation_for_anxiety",
      "time_management_mastery",
      "effective_study_techniques",
    ]);
  });
});
