import type { Metadata } from 'next';
import { SITE_URL } from './config';
import { defaultLocale, ogLocales, type Locale } from './i18n';

type BuildMetadataArgs = {
  locale: Locale;
  /** Path after the locale segment, starting with '/' (or '' for the home page). */
  path: string;
  title: string;
  description: string;
  /**
   * Locales that ACTUALLY have this route. hreflang alternates are emitted
   * only for these — never toward URLs that would 404 (plan correction C2).
   */
  availableLocales: Locale[];
  /** OG/Twitter image override (absolute path). Defaults to the locale feature graphic. */
  image?: string;
  ogType?: 'website' | 'article';
};

/**
 * Builds per-page metadata: absolute title, canonical, and hreflang alternates
 * restricted to the locales that really exist for the route, plus x-default=en.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  availableLocales,
  image,
  ogType = 'website',
}: BuildMetadataArgs): Metadata {
  const canonical = `${SITE_URL}/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const l of availableLocales) {
    languages[l] = `${SITE_URL}/${l}${path}`;
  }
  // x-default points at the default locale's version of this route when it exists.
  if (availableLocales.includes(defaultLocale)) {
    languages['x-default'] = `${SITE_URL}/${defaultLocale}${path}`;
  }

  const ogImage = image ?? `/images/og/${locale}.png`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: ogType,
      siteName: 'Expiroo',
      locale: ogLocales[locale],
      url: canonical,
      title,
      description,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
