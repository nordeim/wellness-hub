#!/usr/bin/env bash
# The smoke leg — the wellness form. Boots the STANDALONE ARTIFACT (not the
# dev server — the e2e doctrine: validate what ships) on :3210 with its OWN
# scratch database (db/smoke.db, gitignored like db/custom.db) and a
# dedicated throwaway AUTH_SECRET, then walks the assertion ladder:
#
#   01  /api/health 200 + "status":"healthy"        (the db round-trip)
#   02  unauthenticated /api/workouts -> 401        (the session wall)
#   03  unauthenticated /api/dashboard -> 401
#   04  /login renders the page title               (the SSR shell)
#   05  the guest / redirects to the login wall     (the reference's root face)
#   06  the demo login -> the wellness_session cookie    (the auth round-trip)
#   07  the sessioned /api/workouts -> 200           (the envelope ok:true)
#   08  an invalid payload POST -> 400              (the Zod seam)
#   09  a valid workout create -> 200               (the CRUD round-trip)
#   10  logout -> /api/auth/me 200 + data:null      (the cookie teardown)
#   11  the login rate-limit probe -> the 11th -> 429 (LAST: it exhausts
#       the login bucket for this IP for 15 min)
#   12  /sitemap.xml + /robots.txt + /manifest.json all 200 (the SEO family)
#   13  THE BOOT-GATE PROBE: a second boot WITHOUT AUTH_SECRET refuses
#       to serve — the fail-fast posture (the log carries the message)
#   14  THE ARTIFACT-HYGIENE assertions: the built artifact contains NO
#       .env / .git / db / skills / docs / uploads / worklog.md /
#       test-results entries
#
# Every assertion: ok "NN — description" || { fail "NN"; exit 1; }.
# The trap kills the server on ANY exit.

set -euo pipefail

PORT=3210
BASE="http://localhost:${PORT}"
SMOKE_DB_URL="file:../db/smoke.db"
# A dedicated throwaway secret (33 chars >= the 16-char production floor)
# — NEVER the repo .env's value: the smoke leg must be immune to the
# shell-env trap the db-path seam documents.
SMOKE_SECRET="smoke-test-secret-0123456789abcdef"
COOKIE_JAR="$(mktemp)"
SERVER_LOG="$(mktemp)"
GATE_LOG="$(mktemp)"
SERVER_PID=""

ok()   { echo "  ok $1 — $2"; }
fail() { echo "  FAIL $1 — $2" >&2; }
cleanup() {
  [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true
  rm -f "$COOKIE_JAR" "$SERVER_LOG" "$GATE_LOG"
}
trap cleanup EXIT

# --- 0. the artifact must exist (the gate chain builds right before) --------
[ -f .next/standalone/server.js ] || { fail "00" "no standalone artifact — run bun run build first"; exit 1; }

# --- 1. the smoke database: fresh schema + seed (the ambient override) ------
DATABASE_URL="$SMOKE_DB_URL" bun run db:push >/dev/null 2>&1
DATABASE_URL="$SMOKE_DB_URL" bun run db:seed >/dev/null 2>&1

# --- 2. kill squatters on the smoke port ------------------------------------
lsof -ti:"$PORT" | xargs -r kill 2>/dev/null || true
sleep 1

# --- 3. boot the standalone artifact ----------------------------------------
DATABASE_URL="$SMOKE_DB_URL" AUTH_SECRET="$SMOKE_SECRET" NODE_ENV=production PORT="$PORT" \
  node .next/standalone/server.js >"$SERVER_LOG" 2>&1 &
SERVER_PID=$!

# --- the health-wait loop (30 x 1s) -----------------------------------------
up=1
for _ in $(seq 1 30); do
  if curl -sf "$BASE/api/health" >/dev/null 2>&1; then up=0; break; fi
  sleep 1
done
[ "$up" = 0 ] || { fail "00" "the standalone server never became healthy"; cat "$SERVER_LOG" >&2; exit 1; }

# --- 4. the assertion ladder -------------------------------------------------
body() { curl -s "$@"; }
code() { curl -s -o /dev/null -w "%{http_code}" "$@"; }

# 01 — health: the db round-trip
[ "$(code "$BASE/api/health")" = 200 ] && body "$BASE/api/health" | grep -q '"status":"healthy"' \
  && ok 01 "health 200 + healthy" || { fail 01 "health"; exit 1; }

# 02/03 — the session wall
[ "$(code "$BASE/api/workouts")" = 401 ] && ok 02 "unauth workouts 401" || { fail 02 "unauth workouts"; exit 1; }
[ "$(code "$BASE/api/dashboard")" = 401 ] && ok 03 "unauth dashboard 401" || { fail 03 "unauth dashboard"; exit 1; }

# 04/05 — the pages render
body "$BASE/login" | grep -q "<title>" && ok 04 "login renders" || { fail 04 "login page"; exit 1; }
body "$BASE/" | grep -q "login" && ok 05 "guest / redirects to the login wall" || { fail 05 "root face"; exit 1; }

# 06 — the demo login round-trip (the seed contract's credentials)
login_code=$(code -c "$COOKIE_JAR" -H "Content-Type: application/json" \
  -d '{"email":"sepnetflix2023@outlook.com","password":"$Abcd1234"}' "$BASE/api/auth/login")
[ "$login_code" = 200 ] && grep -q "wellness_session" "$COOKIE_JAR" \
  && ok 06 "demo login + the wellness_session cookie" || { fail 06 "login"; exit 1; }

# 07 — the sessioned envelope
[ "$(code -b "$COOKIE_JAR" "$BASE/api/workouts")" = 200 ] && body -b "$COOKIE_JAR" "$BASE/api/workouts" | grep -q '"ok":true' \
  && ok 07 "sessioned workouts 200 + ok:true" || { fail 07 "sessioned read"; exit 1; }

# 08 — the invalid payload (the Zod seam's 400: a workout needs minutes)
[ "$(code -b "$COOKIE_JAR" -H "Content-Type: application/json" -d '{"type":"cardio"}' "$BASE/api/workouts")" = 400 ] \
  && ok 08 "invalid payload 400" || { fail 08 "invalid payload"; exit 1; }

# 09 — the valid create (the CRUD round-trip; smoke.db is disposable)
[ "$(code -b "$COOKIE_JAR" -H "Content-Type: application/json" \
  -d '{"type":"cardio","durationMinutes":30,"intensity":"moderate","date":"2026-10-29"}' \
  "$BASE/api/workouts")" = 200 ] \
  && ok 09 "valid workout create 200" || { fail 09 "valid create"; exit 1; }

# 10 — the logout teardown (-c: the jar takes the cleared cookie; /me is
# the by-design data:null face — a logged-out caller gets 200 + data:null)
code -b "$COOKIE_JAR" -c "$COOKIE_JAR" -X POST "$BASE/api/auth/logout" >/dev/null
body -b "$COOKIE_JAR" "$BASE/api/auth/me" | grep -q '"data":null' \
  && ok 10 "logout + post-logout data:null" || { fail 10 "logout teardown"; exit 1; }

# 11 — the login rate-limit probe (LAST: 10 attempts/15 min per IP; the
# demo login above was attempt 1, these bogus ones are 2..11)
rm -f "$COOKIE_JAR"; touch "$COOKIE_JAR"
last=""
for i in $(seq 1 10); do
  last=$(code -H "Content-Type: application/json" \
    -d "{\"email\":\"bogus-$i@example.com\",\"password\":\"wrong\"}" "$BASE/api/auth/login")
done
[ "$last" = 429 ] && ok 11 "the 11th login attempt 429" || { fail 11 "rate limit (got $last)"; exit 1; }

# 12 — the SEO family
[ "$(code "$BASE/sitemap.xml")" = 200 ] && [ "$(code "$BASE/robots.txt")" = 200 ] && [ "$(code "$BASE/manifest.json")" = 200 ] \
  && ok 12 "sitemap + robots + manifest 200" || { fail 12 "the SEO family"; exit 1; }

# --- 13. THE BOOT-GATE PROBE: a secretless production boot refuses -----------
lsof -ti:3211 | xargs -r kill 2>/dev/null || true
sleep 1
DATABASE_URL="$SMOKE_DB_URL" AUTH_SECRET="" NODE_ENV=production PORT=3211 \
  node .next/standalone/server.js >"$GATE_LOG" 2>&1 &
GATE_PID=$!
served=1
for _ in $(seq 1 8); do
  if curl -sf "http://localhost:3211/api/health" >/dev/null 2>&1; then served=0; break; fi
  sleep 1
done
kill "$GATE_PID" 2>/dev/null || true
wait "$GATE_PID" 2>/dev/null || true
[ "$served" = 1 ] && grep -q "AUTH_SECRET" "$GATE_LOG" \
  && ok 13 "the secretless production boot refuses to serve (the log names AUTH_SECRET)" \
  || { fail 13 "the boot gate did not refuse"; cat "$GATE_LOG" >&2; exit 1; }

# --- 14. THE ARTIFACT-HYGIENE assertions (the F-170a cure) -------------------
hygiene_fail=""
for entry in .env .git db skills docs uploads worklog.md test-results dev.log; do
  [ -e ".next/standalone/$entry" ] && hygiene_fail="$hygiene_fail $entry"
done
[ -z "$hygiene_fail" ] \
  && ok 14 "the artifact carries no .env/.git/db/skills/docs/uploads/logs" \
  || { fail 14 "the artifact ships:$hygiene_fail"; exit 1; }

echo "SMOKE: 14/14 PASS"
