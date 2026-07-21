import { SITE_URL } from './config';
import type { Dictionary, Locale } from './i18n';

/**
 * JSON-LD builders for the Home. No offers/price on MobileApplication — the app
 * is in closed beta and the price is not public (pricing rule).
 */

export function mobileApplicationLd(locale: Locale, dict: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Expiroo',
    operatingSystem: 'Android',
    applicationCategory: 'LifestyleApplication',
    description: dict.meta.defaultDescription,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    image: `${SITE_URL}/images/og/${locale}.png`,
    publisher: {
      '@type': 'Organization',
      name: 'Expiroo',
      url: SITE_URL,
    },
  };
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Expiroo',
    url: SITE_URL,
    logo: `${SITE_URL}/images/expiroo-logo.png`,
  };
}

export function faqPageLd(dict: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
