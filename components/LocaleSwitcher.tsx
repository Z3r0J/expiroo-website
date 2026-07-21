'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeNames, locales, type Locale } from '@/lib/i18n';

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
    <nav aria-label={label} className="flex items-center text-sm">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span aria-hidden className="px-1 text-on-surface-variant/50">
              ·
            </span>
          )}
          <Link
            href={hrefFor(locale)}
            aria-current={locale === currentLocale ? 'true' : undefined}
            className={
              locale === currentLocale
                ? 'font-semibold text-primary'
                : 'text-on-surface-variant transition-colors hover:text-on-surface'
            }
          >
            {localeNames[locale]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
