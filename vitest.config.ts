import { defineConfig } from "vitest/config";
import path from "node:path";

// Unit-test layer for the pure domain seams of the Wellness Hub (the
// SQLite path contract, scrypt/HMAC auth helpers, date formatting, the
// login rate limiter, streak/points/badge math, the theme/rebrand pins,
// the dead-dependency census). Browser/E2E coverage lives in
// tests/e2e/*.spec.ts (Playwright — never picked up by this config, which
// matches *.test.ts only).
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
});
