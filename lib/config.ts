/**
 * Single source of truth for site-wide constants.
 *
 * Pricing rule: this file NEVER exports a price. The copy says
 * "one-time purchase, no subscription" (DE: "Einmaliger Kauf, kein Abo")
 * with no figure. If a page ever needs the number, add a `PREMIUM_PRICE`
 * constant here — one place to update — never inline it in copy.
 */

export const SITE_URL = 'https://expiroo.app';

// Closed-beta Google Group. UI CTAs no longer link here directly — they route
// to the `/{locale}/blog/${BETA_POST_SLUG}` tutorial post, which walks through
// the two-step join flow. This raw group link lives only inside that post's copy.
export const BETA_URL = 'https://groups.google.com/g/expiroo-testers';

// Slug of the closed-beta join tutorial that every UI CTA routes to.
export const BETA_POST_SLUG = 'join-expiroo-beta';

// TODO(user): Play Store listing URL once the app is public.
export const PLAY_URL = '#';

// TODO(user): confirm the support@expiroo.app mailbox exists and is monitored.
export const CONTACT_EMAIL = 'support@expiroo.app';

// Parent company / publisher. Exact spelling verified in the parent site's ©
// line; a proper noun — never translated.
export const PARENT_COMPANY = 'FusionCore Apps';
export const PARENT_COMPANY_URL = 'https://www.fusioncoreapps.com/';
