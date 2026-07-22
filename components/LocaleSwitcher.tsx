'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeNames, locales, type Locale } from '@/lib/i18n';
import { POST_LOCALES, RESTRICTED_ROUTES } from '@/lib/routes';

// Segmented pill switcher on dark bands (shuri §6). Each segment links to the
// SAME path in the target locale only when it actually exists there; otherwise
// the segment is a disabled span, never a fallback link that would 404 (QA #1).
export function LocaleSwitcher({
  currentLocale,
  label,
  notAvailableLabel,
}: {
  currentLocale: Locale;
  label: string;
  notAvailableLabel: string;
}) {
  const pathname = usePathname();

  // Href for the current path in `target`, or null when the route doesn't exist
  // there (unlisted post translation, locale-restricted route).
  const hrefFor = (target: Locale): string | null => {
    const segments = (pathname ?? `/${currentLocale}`).split('/');
    const rest = segments.slice(2); // path after the locale segment

    // Blog post: only offer the translation if it exists in the target locale.
    if (rest[0] === 'blog' && rest[1]) {
      const slug = rest[1];
      const available = POST_LOCALES[slug] ?? [currentLocale];
      return available.includes(target) ? `/${target}/blog/${slug}` : null;
    }

    // Locale-restricted route (e.g. /en/alternatives): unavailable elsewhere.
    const restricted = rest[0] ? RESTRICTED_ROUTES[rest[0]] : undefined;
    if (restricted) {
      return restricted.includes(target) ? `/${target}/${rest.join('/')}` : null;
    }

    // Static pages (home, blog index, contact, privacy, terms, imprint): plain swap.
    return rest.length ? `/${target}/${rest.join('/')}` : `/${target}`;
  };

  return (
    <nav aria-label={label} className="flex rounded-full bg-white/10 p-1">
      {locales.map((locale) => {
        const active = locale === currentLocale;
        const href = hrefFor(locale);

        // Non-active locale without this route: disabled pill, same dimensions.
        if (href === null) {
          return (
            <span
              key={locale}
              aria-disabled="true"
              title={notAvailableLabel}
              className="min-w-11 cursor-not-allowed select-none rounded-full px-3 py-1.5 text-center text-xs font-bold uppercase tracking-wide text-white/30"
            >
              {localeNames[locale]}
            </span>
          );
        }

        return (
          <Link
            key={locale}
            href={href}
            aria-current={active ? 'true' : undefined}
            className={[
              'min-w-11 rounded-full px-3 py-1.5 text-center text-xs font-bold uppercase tracking-wide transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-night',
              active
                ? 'bg-primary-container text-on-primary-container'
                : 'text-white/70 hover:text-white',
            ].join(' ')}
          >
            {localeNames[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
