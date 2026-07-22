import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config';
import { defaultLocale, locales, type Locale } from '@/lib/i18n';
import { getPostSlugs } from '@/lib/posts';

// Static routes that exist in every locale.
const SHARED_PATHS = ['', '/blog', '/contact', '/privacy', '/terms', '/imprint'] as const;

// Alternates for a route, restricted to the locales that really have it, plus
// x-default=en (plan correction C2 — never point at a URL that would 404).
function languagesFor(available: Locale[], path: string) {
  const languages: Record<string, string> = {};
  for (const l of available) languages[l] = `${SITE_URL}/${l}${path}`;
  if (available.includes(defaultLocale)) {
    languages['x-default'] = `${SITE_URL}/${defaultLocale}${path}`;
  }
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of SHARED_PATHS) {
    const languages = languagesFor([...locales], path);
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        alternates: { languages },
      });
    }
  }

  // /alternatives ships in EN only.
  entries.push({
    url: `${SITE_URL}/en/alternatives`,
    alternates: { languages: languagesFor(['en'], '/alternatives') },
  });

  // Blog posts — alternates restricted to the locales where the slug exists.
  for (const locale of locales) {
    for (const slug of getPostSlugs(locale)) {
      const available = locales.filter((l) => getPostSlugs(l).includes(slug));
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        alternates: { languages: languagesFor(available, `/blog/${slug}`) },
      });
    }
  }

  return entries;
}
