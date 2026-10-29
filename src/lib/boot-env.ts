// The boot gate (session-170, WP-3 — the scandihaven instrumentation.ts
// boot-validation port, recast in the house pure-seam form).
//
// WHY THIS EXISTS: the s169 production secret gate is a RUNTIME seam —
// secret() throws at the FIRST SESSION OP. A misconfigured production
// boot (missing/short AUTH_SECRET) still boots, serves every static
// page, and only explodes when the first user signs in. The
// web-app-foundation §6.2 posture + the scandihaven parseServerEnv
// pattern prescribe fail-fast AT BOOT: the server refuses to start with
// the actionable message. src/instrumentation.ts wires this seam into
// Next's register() hook — the throw crashes the standalone boot before
// the first request (verified live this round: "Failed to prepare
// server Error: An error occurred while loading instrumentation hook").
//
// THE PURE FORM (the house doctrine): bootEnvCheck takes an env-shaped
// record — no process access — and returns { fatal, warnings }.
// applyBootEnvReport applies it (the injectable logger prints the
// warnings; the fatal throws — the [boot] message family mirroring
// auth.ts's secret() throw, so the operator sees one vocabulary).
//
// WARN-THROW DISCIPLINE (the scandihaven posture): only the
// forgeable-sessions case is fatal. The metadata-family misconfig
// (NEXT_PUBLIC_SITE_URL) and the WELLNESS_* toggle family warn — a bad
// toggle must never take a working deployment down, and dev/test boot
// SOFT (the DX posture unchanged: the DEV fallback stays documented in
// auth.ts; NODE_ENV !== "production" never fatals).

/** The closed WELLNESS_* knob set (the six-knob contract's 3 server knobs). */
export const KNOWN_WELLNESS_VARS: ReadonlySet<string> = new Set([
  "WELLNESS_PROXY_HOPS",
  "WELLNESS_DISABLE_IN_APP_OTP",
  "WELLNESS_DISABLE_IN_APP_RESET",
]);

/** The values the WELLNESS_DISABLE_* kill-switches actually read ("1" = disable). */
const DISABLE_KNOB_VALUES = new Set(["", "1"]);

export interface BootEnvReport {
  fatal: string | null;
  warnings: string[];
}

/**
 * Validate an env-shaped record against the six-knob contract.
 * PURE: same input, same report — tests drive every branch without a
 * process (tests/boot-env.test.ts).
 */
export function bootEnvCheck(env: Record<string, string | undefined>): BootEnvReport {
  const warnings: string[] = [];
  const isProduction = env.NODE_ENV === "production";

  // ---- AUTH_SECRET: the only FATAL (the forgeable-sessions case) ------
  const secret = env.AUTH_SECRET;
  if (isProduction && (!secret || secret.length < 16)) {
    return {
      fatal:
        "[boot] AUTH_SECRET is missing or shorter than 16 chars in production — sessions would be forgeable, so the server refuses to boot. Generate one with: openssl rand -hex 32 — then set AUTH_SECRET in the environment (or .env) and restart",
      warnings,
    };
  }

  // ---- NEXT_PUBLIC_SITE_URL: the advertised-origin family --------------
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  if (isProduction && (!siteUrl || /localhost|127\.0\.0\.1/.test(siteUrl))) {
    warnings.push(
      `[boot] NEXT_PUBLIC_SITE_URL is ${
        siteUrl ? `"${siteUrl}"` : "unset"
      } in production — metadataBase, /robots.txt, /sitemap.xml and the OG/Twitter cards would advertise a localhost origin. Set the canonical public origin BEFORE \`bun run build\` (it is inlined at build time).`,
    );
  }

  // ---- The WELLNESS_* family: the flag-typo guard (warn form) -----------
  for (const key of Object.keys(env)) {
    if (!key.startsWith("WELLNESS_") || key === "NODE_ENV") continue;
    if (!KNOWN_WELLNESS_VARS.has(key)) {
      warnings.push(
        `[boot] Unknown WELLNESS_* environment variable ${key} — the known knobs are: ${[...KNOWN_WELLNESS_VARS].join(", ")}. A typo here silently no-ops (the closed set is read verbatim).`,
      );
    }
  }
  for (const key of ["WELLNESS_DISABLE_IN_APP_OTP", "WELLNESS_DISABLE_IN_APP_RESET"]) {
    const value = env[key];
    if (value !== undefined && !DISABLE_KNOB_VALUES.has(value)) {
      warnings.push(
        `[boot] ${key}="${value}" — only the empty string (unset: in-app delivery) and "1" (disable) are meaningful; every other value silently behaves as unset.`,
      );
    }
  }
  const hops = env.WELLNESS_PROXY_HOPS;
  if (hops !== undefined && hops !== "" && !/^\d+$/.test(hops)) {
    warnings.push(
      `[boot] WELLNESS_PROXY_HOPS="${hops}" is unparsable — the rate-limit seam fails CLOSED onto hop 1 (a bad value never widens trust); fix the value to unset, 0, or an N ≥ 1.`,
    );
  }

  return { fatal: null, warnings };
}

/**
 * Apply a report: print each warning via the injectable logger, throw
 * the fatal. Called from src/instrumentation.ts's register() (and from
 * tests with logger/report doubles).
 */
export function applyBootEnvReport(
  report: BootEnvReport,
  deps: { logger?: Pick<Console, "warn"> } = {},
): void {
  const logger = deps.logger ?? console;
  for (const warning of report.warnings) logger.warn(warning);
  if (report.fatal !== null) throw new Error(report.fatal);
}
