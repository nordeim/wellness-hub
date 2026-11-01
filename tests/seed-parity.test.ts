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
