import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";

// WH-4 (F-2): the signup role pin. The signup route shipped the NEO CRM's
// first-boot role ladder — `role: count === 0 ? "admin" : "rep"` — so every
// fresh deployment minted "admin"/"rep" accounts (sales-rep vocabulary in a
// wellness app) while the reference's own account tab displays role="user"
// (live-probed on the reference, 2026-10-29). The demo user is seeded
// "user", which is why the bug was invisible on the demo account. Role is
// display-only in both apps (no route gates on it) — the column stays; only
// the assignment values were wrong.
//
// The count query that fed the ladder (and the dead avatarColor assignment)
// retired with it: signup needs no user count.

const SIGNUP_ROUTE = join(import.meta.dirname, "..", "src", "app", "api", "auth", "signup", "route.ts");

function signupSource(): string {
  return readFileSync(SIGNUP_ROUTE, "utf8");
}

it("WH-4 (F-2): signup writes the reference's own role value", () => {
  const src = signupSource();
  // The reference's account tab displays role="user" — the only value a
  // fresh wellness signup may carry.
  expect(src).toContain('role: "user"');
});

it("WH-4 (F-2): the CRM role ladder and its count query are gone", () => {
  const src = signupSource();
  // The NEO CRM's first-boot ladder ("admin"/"rep") must stay retired…
  expect(src).not.toContain('"rep"');
  expect(src).not.toContain('"admin"');
  // …and the db.user.count() query that fed it (plus the dead avatarColor
  // palette) must not creep back: signup creates an account, it does not
  // take a census.
  expect(src).not.toContain("db.user.count");
  expect(src).not.toContain("NAME_COLORS");
});
