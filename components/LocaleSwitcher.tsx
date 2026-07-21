'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeNames, locales, type Locale } from '@/lib/i18n';

// Segmented pill switcher on dark bands (shuri §6). Each segment is an <a> to
// the same path in the other locale.
export function LocaleSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const pathname = usePathname();

  // Swap the first path segment (the locale) while keeping the rest of the path.
  const hrefFor = (locale: Locale) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/') || `/${locale}`;
  };

  return (
    <nav aria-label={label} className="flex rounded-full bg-white/10 p-1">
      {locales.map((locale) => {
        const active = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
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
