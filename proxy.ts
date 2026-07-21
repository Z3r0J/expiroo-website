import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, type Locale } from '@/lib/i18n';

/**
 * Root redirect only (Next 16.2 renamed the "middleware" convention to "proxy";
 * behavior is identical). Owns `/` and nothing else.
 *
 * Picks a locale from Accept-Language: de → /de, es → /es, everything else → /en.
 * A lightweight parser (no negotiator dep) is enough for three locales.
 */
function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get('accept-language');
  if (!header) return defaultLocale;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { base: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { base } of ranked) {
    if (base === 'de') return 'de';
    if (base === 'es') return 'es';
    if (base === 'en') return 'en';
  }
  return defaultLocale;
}

/**
 * 307 (temporary) so a CDN never caches the first visitor's locale for everyone
 * (plan correction M2).
 */
export function proxy(request: NextRequest) {
  const locale = detectLocale(request);
  return NextResponse.redirect(new URL(`/${locale}`, request.url), 307);
}

// Scoped to exactly '/' — never runs on /_next, /images, sitemap.xml, etc.
export const config = {
  matcher: '/',
};
