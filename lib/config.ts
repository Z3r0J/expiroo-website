/**
 * Single source of truth for site-wide constants.
 *
 * Pricing rule: this file NEVER exports a price. The copy says
 * "one-time purchase, no subscription" (DE: "Einmaliger Kauf, kein Abo")
 * with no figure. If a page ever needs the number, add a `PREMIUM_PRICE`
 * constant here — one place to update — never inline it in copy.
 */

export const SITE_URL = 'https://expiroo.app';

// TODO(user): replace with the real closed-beta Google Group invite link.
export const BETA_URL = '#';

// TODO(user): Play Store listing URL once the app is public.
export const PLAY_URL = '#';

// TODO(user): confirm the support@expiroo.app mailbox exists and is monitored.
export const CONTACT_EMAIL = 'support@expiroo.app';
