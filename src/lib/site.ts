// Canonical site origin seam (contract pinned by tests/metadata.test.ts
// and tests/pwa-metadata.test.ts).
//
// NEXT_PUBLIC_SITE_URL is consumed by every metadata surface (the root
// layout's metadataBase + OG/Twitter cards, app/sitemap.ts, app/robots.ts)
// so the documented contract stays true. Per-route canonical/OG/Twitter
// rides the pageMetadata() factory: og:title "<Page> | Wellness Hub",
// og:url origin+route, og:description "<Page> on Wellness Hub. " + the
// root paragraph.
//
// NEXT_PUBLIC_* values are INLINED AT BUILD TIME by Next — set the
// variable before `bun run build` in production (docs/DEPLOYMENT.md).

import type { Metadata } from "next";

export const DEFAULT_SITE_URL = "http://localhost:3000";

/** The app's meta description — the Wellness Hub mission statement. */
export const SITE_DESCRIPTION =
  "Wellness Hub is your personal companion for student wellbeing — track workouts, journal your mood, manage assignments and deadlines, plan events, organize study resources, set reminders, learn new skills and celebrate goals and achievements, all in one gentle, encouraging place designed to help you beat procrastination and build momentum, one small win at a time.";

/**
 * Canonical public origin: NEXT_PUBLIC_SITE_URL when set (trailing slashes
 * stripped — URL composition below always appends paths), otherwise the
 * localhost dev default.
 */
export function siteUrl(
  env: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const raw = (env ?? "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

/** The per-route OG description prefix — every inner page's og/twitter
 * description is `"<Page> on Wellness Hub. " + <the root paragraph>`. */
export function pageOgDescription(page: string): string {
  return `${page} on Wellness Hub. ${SITE_DESCRIPTION}`;
}

/** The three PWA metas (mobile-web-app-capable + the apple pair), riding
 * `metadata.other` — the per-page factory re-declares them (page-level
 * metadata REPLACES the layout's `other` map). */
export const PWA_META: Record<string, string> = {
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "black",
  "apple-mobile-web-app-title": "Wellness Hub",
};

/** The per-route metadata factory. The OG image is static across routes. */
export function pageMetadata(opts: {
  page: string | null;
  route: string;
  title?: string;
}): Metadata {
  const page = opts.page;
  const fullTitle = page !== null ? `${page} | Wellness Hub` : "Wellness Hub";
  const description = page !== null ? pageOgDescription(page) : SITE_DESCRIPTION;
  return {
    title:
      opts.title !== undefined
        ? { absolute: opts.title }
        : page !== null
          ? page
          : { absolute: "Wellness Hub" },
    alternates: { canonical: opts.route },
    openGraph: {
      title: fullTitle,
      description,
      url: opts.route,
      type: "website",
      siteName: "Wellness Hub",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png"],
    },
    other: {
      "twitter:url": `${siteUrl()}${opts.route}`,
      ...PWA_META,
    },
  };
}
