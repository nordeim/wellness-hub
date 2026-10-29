import { siteUrl } from "@/lib/site";

// Session-18 (S18-P4): /sitemap.xml — the reference's exact format
// (byte-verified 2026-10-01: LF-only, no trailing newline, 4-space URL
// indent, changefreq weekly on every entry, priority "1.0" for the
// dashboard and "0.8" for the rest). Served through an explicit route
// handler because Next's sitemap.ts serializer DROPS the number
// formatting ("1.0" serializes as "1") — and its MetadataRoute type
// spells the field changeFrequency, easy to mis-pin. One deliberate fix:
// the reference's locs are CAPITALIZED (/Dashboard…) — its platform routes
// case-insensitively; our router is case-sensitive, so this sitemap lists
// the real lowercase canonical routes the router actually serves (the
// capitalized aliases re-export them — ADR-005).
// WH-3 (F-3): the CRM-era session-142 note (the /about + /contact
// marketing pages and the "public landing page" root) retired — the
// wellness root is the LOGIN-WALL redirect (src/app/page.tsx); the
// marketing layer never shipped in this domain. `/` keeps priority 1.0
// as the root route the reference's own sitemap ranks highest.
export const dynamic = "force-static";

const ROUTES: Array<{ path: string; priority: string }> = [
  { path: "/", priority: "1.0" },
  { path: "/login", priority: "0.8" },
  { path: "/signup", priority: "0.8" },
  { path: "/dashboard", priority: "0.8" },
  { path: "/routines", priority: "0.8" },
  { path: "/exercise", priority: "0.8" },
  { path: "/mentalhealth", priority: "0.8" },
  { path: "/assignments", priority: "0.8" },
  { path: "/events", priority: "0.8" },
  { path: "/studyresources", priority: "0.8" },
  { path: "/reminders", priority: "0.8" },
  { path: "/learning", priority: "0.8" },
  { path: "/goals", priority: "0.8" },
  { path: "/profile", priority: "0.8" },
];

export function GET(): Response {
  const origin = siteUrl();
  const urls = ROUTES.map(
    ({ path, priority }) => `    <url>
        <loc>${origin}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`,
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    // Session-20 (S20-P4): bare `application/xml` — the reference's exact
    // content-type (GET-verified 2026-10-01; ours had shipped a charset
    // suffix, the s18 "viewport 1 vs 1.0" cosmetic-serialization class).
    headers: { "content-type": "application/xml" },
  });
}
