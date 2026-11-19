/**
 * Single source of truth for site-wide constants.
 *
 * Pricing rule: this file NEVER exports a price. The copy says
 * "one-time purchase, no subscription" (DE: "Einmaliger Kauf, kein Abo")
 * with no figure. If a page ever needs the number, add a `PREMIUM_PRICE`
 * constant here — one place to update — never inline it in copy.
 */

export const SITE_URL = 'https://expiroo.app';

// Date (YYYY-MM-DD) the shared post/home page template last changed in a way
// search engines should re-crawl (internal links, JSON-LD, titles). Feeds the
// sitemap <lastmod> of posts and home pages. Bump it by hand in the deploy that
// changes that template; never derive it from `new Date()` (a build date is not
// a content change).
export const SEO_TEMPLATE_UPDATED = '2026-11-19';

// Public Google Play listing (live since 2026-11-18). Every download CTA
// (`PlayButton`) links here directly.
export const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.fusioncoreapps.expiroo';

// TODO(user): confirm the support@expiroo.app mailbox exists and is monitored.
export const CONTACT_EMAIL = 'support@expiroo.app';

// Parent company / publisher. Exact spelling verified in the parent site's ©
// line; a proper noun — never translated.
export const PARENT_COMPANY = 'FusionCore Apps';
export const PARENT_COMPANY_URL = 'https://www.fusioncoreapps.com/';
