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

// WH-76: the reference RE-ORDERED its eleven-template grid a second time
// (the WH-42 class re-firing — the battery's live ORDER member caught the
// move: the set + per-template data byte-equal, only the SEQUENCE moved).
// Decode-settled this round (the parity leg's landscape.order member + a
// dedicated decode probe, two same-round reads identical). New sequence:
// the 5-Minute Energizer now leads; Calm Evening ↔ Self-Care Reset swap;
// Focused Study slides to position 10 (index 9); Creative Flow + Quick
// Productivity move up; positions 3/8/9/11 (Pomodoro, Kickstart, Sunday,
// Wind-Down) held.
describe("WH-42 F-1: the seeded template grid-order contract", () => {
  it("the ROUTINE_TEMPLATES sortOrder sequence mirrors the reference's live grid order (re-decoded 2026-11-05, the WH-76 reorder)", () => {
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
      "5_minute_morning_energizer",
      "10_minute_home_workout",
      "the_pomodoro_power_study_session",
      "calm_evening_wind_down",
      "self_care_sunday_reset",
      "creative_flow_session",
      "quick_productivity_reset",
      "energizing_morning_kickstart",
      "self_care_sunday",
      "focused_study_session",
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

// WH-76: the tutorial grid RE-ORDERED a second time (the WH-43 class
// re-firing — the exact same class the WH-42/43 rounds cured for both
// grids: the SET is identical (all twelve titles + per-title data
// byte-equal), only the SEQUENCE moved — the head reshuffled again:
// Overcoming Procrastination now leads, Building Morning second, Tiny
// Habits third, Science of Motivation fourth, Self-Compassion fifth;
// positions 7-8 (Meal Prep, Better Habits) held again; the tail
// reshuffled: Mindfulness ninth, Effective Study tenth, Yoga eleventh,
// Time Management twelfth). Decode-settled this round (the parity
// leg's per-card drift members + a dedicated decode probe, two
// same-round reads identical). The live pin is the ORDER member in
// scripts/parity-tutorials.mjs; this is the offline guard that keeps
// the seed from silently regressing between rounds.
describe("WH-43 F-1: the seeded tutorial grid-order contract", () => {
  it("the TUTORIALS sortOrder sequence mirrors the reference's live grid order (re-decoded 2026-11-05, the WH-76 reorder)", () => {
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
      "overcoming_procrastination_the_2_minute_rule",
      "building_morning_routines_that_actually_stick",
      "the_power_of_tiny_habits",
      "the_science_of_motivation",
      "self_compassion_for_perfectionists",
      "beating_decision_fatigue",
      "healthy_meal_prep_guide",
      "building_better_habits",
      "mindfulness_meditation_for_anxiety",
      "effective_study_techniques",
      "10_minute_morning_yoga_flow",
      "time_management_mastery",
    ]);
  });
});
