import { PARENT_COMPANY, PARENT_COMPANY_URL, SITE_URL } from './config';
import type { Dictionary, Locale } from './i18n';
import type { PostMeta } from './posts';

/**
 * JSON-LD builders. No offers/price on MobileApplication — the app is in closed
 * beta and the price is not public (pricing rule).
 */

export function articleLd(locale: Locale, post: PostMeta) {
  const url = `${SITE_URL}/${locale}/blog/${post.slug}`;
  const image = post.image.startsWith('http')
    ? post.image
    : `${SITE_URL}${post.image}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image,
    inLanguage: locale,
    mainEntityOfPage: url,
    url,
    author: { '@type': 'Organization', name: 'Expiroo', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Expiroo',
      url: SITE_URL,
      logo: `${SITE_URL}/images/expiroo-logo.png`,
    },
  };
}

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
    parentOrganization: {
      '@type': 'Organization',
      name: PARENT_COMPANY,
      url: PARENT_COMPANY_URL,
    },
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
