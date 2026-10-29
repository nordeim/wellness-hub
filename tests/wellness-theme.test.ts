import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { pageMetadata, pageOgDescription, PWA_META, siteUrl } from "@/lib/site";

const read = (p: string) => readFileSync(path.resolve(import.meta.dirname, "..", p), "utf8");

describe("the theme engine", () => {
  it("the store writes the brand pair onto <html> (the CSS-first win)", async () => {
    const src = read("src/stores/theme-store.ts");
    // The runtime override seam: v4 utilities compile to var(--color-*)
    // references, so ONE write re-skins every gradient surface.
    expect(src).toContain('root.style.setProperty("--color-primary"');
    expect(src).toContain('root.style.setProperty("--color-secondary"');
    expect(src).toContain("classList.toggle(\"dark\"");
  });

  it("the dark cascade: globals.css flips every semantic token under .dark", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/\.dark \{[^}]*--color-background: #09090b/);
    expect(css).toMatch(/\.dark \{[^}]*--color-surface: #18181b/);
    expect(css).toMatch(/\.dark \{[^}]*--color-sidebar: #101014/);
  });

  it("the @theme carries the reference's Indigo Dream pair", () => {
    const css = read("src/app/globals.css");
    expect(css).toContain("--color-primary: #6366f1");
    expect(css).toContain("--color-secondary: #a855f7");
    // The light sidebar family (live-probed: rgb(250,250,250)).
    expect(css).toContain("--color-sidebar: #fafafa");
  });

  it("the shade() helper darkens the hover pair", async () => {
    // shade is module-private; the pure math is pinned through the
    // generated hover property — the store source carries the factor.
    const src = read("src/stores/theme-store.ts");
    expect(src).toMatch(/shade\(s\.primaryColor, 0\.88\)/);
    expect(src).toMatch(/function shade\(hex: string, factor: number\)/);
  });

  it("the prefs PUT sync is fire-and-forget (the local state never waits)", () => {
    const src = read("src/stores/theme-store.ts");
    expect(src).toContain('fetch("/api/prefs"');
    expect(src).toMatch(/\.catch\(\(\) => null\)/);
  });
});

describe("the prefs API route", () => {
  it("upserts the singleton behind the session guard", () => {
    const src = read("src/app/api/prefs/route.ts");
    expect(src).toContain("requireSession");
    expect(src).toContain("db.userPrefs.upsert");
    expect(src).toContain("parseBody(req, prefsSchema)");
  });
});

describe("the metadata factory (Wellness Hub)", () => {
  it("titles + OG carry the Wellness Hub naming", () => {
    const m = pageMetadata({ page: "Learning Center", route: "/Learning" });
    expect(m.title).toBe("Learning Center");
    expect(m.openGraph?.title).toBe("Learning Center | Wellness Hub");
    expect(m.openGraph?.siteName).toBe("Wellness Hub");
    expect(m.openGraph?.url).toBe("/Learning");
    expect(m.twitter && JSON.stringify(m.twitter)).toContain("summary_large_image");
  });

  it("prefixes the inner-page OG description", () => {
    expect(pageOgDescription("Exercise")).toMatch(
      /^Exercise on Wellness Hub\. /,
    );
  });

  it("keeps the root family unprefixed", () => {
    const m = pageMetadata({ page: null, route: "/" });
    expect(m.title).toEqual({ absolute: "Wellness Hub" });
    expect(m.openGraph?.title).toBe("Wellness Hub");
  });

  it("carries the PWA metas on every route", () => {
    const m = pageMetadata({ page: "Goals & Achievements", route: "/Goals" });
    expect(m.other).toMatchObject(PWA_META);
    expect(m.other?.["apple-mobile-web-app-title"]).toBe("Wellness Hub");
  });

  it("siteUrl strips trailing slashes", () => {
    expect(siteUrl("https://x.dev/")).toBe("https://x.dev");
    expect(siteUrl(undefined)).toBe("http://localhost:3000");
  });

  it("the root layout is rebranded (no NEO CRM anywhere)", () => {
    const layout = read("src/app/layout.tsx");
    expect(layout).toContain('"Wellness Hub"');
    expect(layout).not.toContain("NEO CRM");
  });
});
