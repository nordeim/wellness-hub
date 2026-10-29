import type { NextConfig } from "next";
import path from "node:path";

// Standalone output keeps the production server self-contained (the e2e
// suite boots .next/standalone/server.js on an isolated port with its own
// SQLite file). outputFileTracingRoot is pinned so the traced
// prisma/schema.prisma copy lands at a stable location for the db-path
// resolver (src/lib/db-path.ts).

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.resolve(import.meta.dirname),
  // Session-170 (F-170a — THE ARTIFACT HYGIENE): @vercel/nft's file
  // tracing follows runtime-computed fs paths (existsSync/resolve chains)
  // when it cannot statically resolve them, which historically made it
  // fall back to tracing the WHOLE repo root — every repo-root entry
  // landed in a route's .nft.json (2715 skills files alone), shipping
  // .env (the real AUTH_SECRET), .git/ (171 MB), db/ (the dev SQLite
  // file with user rows), uploads/, skills/ (194 MB) and docs/ (49 MB)
  // inside every deployable artifact (~550 MB where ~151 MB suffices).
  // WH-4 retired the upload family whose fs paths caused the fallback;
  // these excludes STAY as the standing hygiene belt (the smoke
  // ladder's check 14 asserts the artifact carries none of them).
  // Next's own writeStandaloneDirectory ALSO copies .env explicitly
  // (build/index.js — immune to excludes): the build script's trailing
  // `rm -f .next/standalone/.env` removes that copy (the double-cure).
  outputFileTracingExcludes: {
    "*": [
      ".env",
      ".env.example",
      ".git/**",
      "db/**",
      "uploads/**",
      "skills/**",
      "docs/**",
      "test-results/**",
      "AGENTS.md",
      "CLAUDE.md",
      "README.md",
      "Project_Architecture_Document.md",
      "neo-crm_SKILL.md",
      "worklog.md",
      "neo-crm-homepage.png",
      "dev.log",
      "bun.lock",
      "package-lock.json",
      "components.json",
      "eslint.config.mjs",
      "playwright.config.ts",
      "postcss.config.mjs",
      "tsconfig.json",
      "tsconfig.tsbuildinfo",
      "vitest.config.ts",
      "scripts/**",
      "tests/**",
    ],
  },
  // Hide the Next.js dev-tools indicator (the floating "N" button) so dev
  // server screenshots stay clean — it never ships in production anyway.
  devIndicators: false,
  // Session-174 (F-174a — THE TYPE-GATE HARDENING): the scaffold-era
  // `typescript: { ignoreBuildErrors: true }` block is RETIRED — the
  // build IS the type gate now (the zero-balance graft, per the repo's
  // own skills/web-application/SKILL.md §2 + the evaluation report
  // §9.2). Under the old posture a planted type error compiled GREEN
  // into the deployable artifact (reproduced live at this round's
  // gate-proof); the type gate rode only on the manual `bun run
  // typecheck` step — a skipped-command hazard. The explicit typecheck
  // script stays in the gate chain (the FASTER signal); the build is
  // the enforcer. (The `typescript` key stays UNSET: Next's default —
  // ignoreBuildErrors: false — is the hardened form itself.)

  // Session-20 (S20-P1/P2/P3): the reference's edge (Cloudflare/Caddy)
  // injects a three-header security set on EVERY response — HTML routes,
  // authed routes, its hashed CSS asset, /manifest.json, and its SPA
  // fallback 200s (curl-verified on 10+ responses, 2026-10-01). The
  // self-hosted expression is this headers() block. HSTS ships as the
  // reference's exact bare value; per RFC 6797 §7.1 a UA MUST NOT process
  // it over non-secure transport, so it is inert on plain-HTTP localhost
  // and correct whenever a deployment runs behind HTTPS.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
};

export default nextConfig;
