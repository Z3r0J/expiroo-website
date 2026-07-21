import type { Locale } from './i18n';

/**
 * Client-safe route availability, consumed by the LocaleSwitcher (a client
 * component that can't read the filesystem) so a locale swap never links to a
 * route that doesn't exist (QA #1).
 *
 * POST_LOCALES: blog slugs that exist in MORE THAN ONE locale. Every current
 * post is single-locale, so this stays empty — an unlisted slug is treated as
 * existing only in the locale being viewed, and the switcher sends the other
 * locales to that locale's blog index instead of a 404. Add an entry when a
 * post gets a translation (keep it in sync with getLocalesForSlug in posts.ts).
 */
export const POST_LOCALES: Record<string, Locale[]> = {};

/** Routes that exist only in some locales; other locales fall back to home. */
export const RESTRICTED_ROUTES: Record<string, Locale[]> = {
  alternatives: ['en'],
};
