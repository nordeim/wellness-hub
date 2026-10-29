// Session-170 (WP-2): THE CHUNK-RECOVERY SEAM — the stale-chunk self-heal
// ported from the scandihaven reference (its packages/config/src/
// chunk-recovery.ts, unit-tested there — the same construction here in
// the house pure-seam form). A redeploy invalidates the hashed chunk
// filenames; a stale tab's next soft navigation throws a ChunkLoadError
// family error. The error boundary (src/app/error.tsx) wires
// reloadOnStaleChunk(error) — a stale tab self-heals ONCE per cooldown
// window instead of stranding the user on the boundary.
//
// The seam's contract (every branch pinned):
//   isStaleChunkError — the four-message family the bundlers emit
//   shouldHardReload — the injectable-clock cooldown arithmetic
//   reloadOnStaleChunk — the fully-injectable storage/now/reload form:
//     unavailable storage DISABLES the reload (never throws from the
//     recovery path), the flag is written BEFORE the reload (a crash
//     mid-reload cannot loop), a non-chunk error never reloads.
//
// RED at birth (the seam does not exist yet); GREEN when WP-2 lands it.

import { describe, expect, it } from "vitest";
import {
  CHUNK_RELOAD_COOLDOWN_MS,
  CHUNK_RELOAD_FLAG,
  isStaleChunkError,
  reloadOnStaleChunk,
  shouldHardReload,
} from "../src/lib/chunk-recovery";

// A storage double recording getItem/setItem calls (the injectable form
// keeps the seam pure — no jsdom, no globalThis reaching).
class StorageDouble {
  store = new Map<string, string>();
  getItemCalls = 0;
  setItemCalls: Array<[string, string]> = [];
  disabled = false;
  getItem(key: string): string | null {
    if (this.disabled) throw new Error("Storage is disabled");
    this.getItemCalls += 1;
    return this.store.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    if (this.disabled) throw new Error("Storage is disabled");
    this.setItemCalls.push([key, value]);
    this.store.set(key, value);
  }
}

describe("session-170 (WP-2): the stale-chunk message family (isStaleChunkError)", () => {
  it("recognizes the four bundler message forms", () => {
    expect(isStaleChunkError("ChunkLoadError: Loading chunk 42 failed.")).toBe(true);
    expect(isStaleChunkError("Error: Failed to load chunk 1234")).toBe(true);
    expect(isStaleChunkError("Loading chunk 7 failed")).toBe(true);
    expect(isStaleChunkError("Error: A dynamically imported module is not available")).toBe(true);
  });

  it("passes non-chunk errors through (the recovery must never hijack real bugs)", () => {
    expect(isStaleChunkError("TypeError: x is not a function")).toBe(false);
    expect(isStaleChunkError("")).toBe(false);
    expect(isStaleChunkError("SyntaxError: Unexpected token")).toBe(false);
  });
});

describe("session-170 (WP-2): the cooldown arithmetic (shouldHardReload)", () => {
  const MSG = "ChunkLoadError: Loading chunk 42 failed.";

  it("a first-ever stale chunk reloads (no last-reload timestamp)", () => {
    expect(shouldHardReload(MSG, 1_000, null)).toBe(true);
  });

  it("a stale chunk INSIDE the cooldown window does not reload again", () => {
    expect(shouldHardReload(MSG, 10_000, 5_000)).toBe(false); // 5s since the last reload
  });

  it("a stale chunk AT/PAST the cooldown window reloads again", () => {
    expect(shouldHardReload(MSG, 15_000, 5_000)).toBe(true); // exactly 10s
    expect(shouldHardReload(MSG, 100_000, 5_000)).toBe(true); // well past
  });

  it("a NON-chunk error never reloads regardless of the window", () => {
    expect(shouldHardReload("TypeError: x is not a function", 100_000, null)).toBe(false);
  });

  it("the cooldown constant is the documented 10s + the flag carries the app namespace", () => {
    expect(CHUNK_RELOAD_COOLDOWN_MS).toBe(10_000);
    // WH-4 (F-4): the de-NEO rename — the storage flag carries the app's
    // own namespace (the CRM-era neo-crm: prefix retired with the rename).
    expect(CHUNK_RELOAD_FLAG).toBe("wellness-hub:chunk-reload-at");
  });
});

describe("session-170 (WP-2): the guarded reload (reloadOnStaleChunk)", () => {
  it("reloads a first-ever stale chunk: the flag written BEFORE the reload fires", () => {
    const storage = new StorageDouble();
    const order: string[] = [];
    const reload = () => order.push("reload");
    // wrap setItem to record the ordering against the reload call
    const origSetItem = storage.setItem.bind(storage);
    storage.setItem = (key: string, value: string) => {
      order.push("set");
      origSetItem(key, value);
    };
    const ok = reloadOnStaleChunk(new Error("ChunkLoadError: Loading chunk 42 failed."), {
      storage,
      now: () => 1_000,
      reload,
    });
    expect(ok).toBe(true);
    expect(order).toEqual(["set", "reload"]); // the crash-mid-reload loop guard
    expect(storage.store.get(CHUNK_RELOAD_FLAG)).toBe("1000");
  });

  it("a second stale chunk inside the cooldown does NOT reload", () => {
    const storage = new StorageDouble();
    storage.store.set(CHUNK_RELOAD_FLAG, "1000"); // the last reload at t=1000
    let reloads = 0;
    const ok = reloadOnStaleChunk(new Error("Failed to load chunk 7"), {
      storage,
      now: () => 6_000, // 5s since the recorded reload
      reload: () => {
        reloads += 1;
      },
    });
    expect(ok).toBe(false);
    expect(reloads).toBe(0);
  });

  it("a NON-chunk error returns false and touches no storage", () => {
    const storage = new StorageDouble();
    const ok = reloadOnStaleChunk(new Error("TypeError: x is not a function"), {
      storage,
      now: () => 1_000,
      reload: () => {
        throw new Error("must not reload");
      },
    });
    expect(ok).toBe(false);
    expect(storage.getItemCalls).toBe(0);
    expect(storage.setItemCalls).toHaveLength(0);
  });

  it("unavailable storage DISABLES the reload — the recovery path never throws", () => {
    const storage = new StorageDouble();
    storage.disabled = true; // every access throws (Safari private mode etc.)
    let reloads = 0;
    const ok = reloadOnStaleChunk(new Error("ChunkLoadError: Loading chunk 42 failed."), {
      storage,
      now: () => 1_000,
      reload: () => {
        reloads += 1;
      },
    });
    expect(ok).toBe(false);
    expect(reloads).toBe(0);
  });

  it("a corrupt stored timestamp is treated as no-record (the first-reload path)", () => {
    const storage = new StorageDouble();
    storage.store.set(CHUNK_RELOAD_FLAG, "not-a-number");
    let reloads = 0;
    const ok = reloadOnStaleChunk(new Error("Loading chunk 7 failed"), {
      storage,
      now: () => 1_000,
      reload: () => {
        reloads += 1;
      },
    });
    expect(ok).toBe(true); // NaN -> null -> reload (the honest recovery)
    expect(reloads).toBe(1);
  });
});
