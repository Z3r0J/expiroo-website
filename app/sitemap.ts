import type { MetadataRoute } from 'next';
import { SEO_TEMPLATE_UPDATED, SITE_URL } from '@/lib/config';
import { defaultLocale, locales, type Locale } from '@/lib/i18n';
import { getLatestPosts, getPostSlugs, getPosts } from '@/lib/posts';

// Indexable static routes that exist in every locale. Contact and legal pages
// are noindex boilerplate, so they stay out of the sitemap (still linked from
// the footer).
const SHARED_PATHS = ['', '/blog'] as const;

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

// Later of two ISO dates (YYYY-MM-DD strings sort lexicographically; '' loses).
function laterDate(a: string, b: string): string {
  return a > b ? a : b;
}

// Newest `updated || date` among a locale's posts ('' when it has none).
function newestPostDate(locale: Locale): string {
  const [newest] = getLatestPosts(locale, 1, []);
  return newest ? newest.updated || newest.date : '';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of SHARED_PATHS) {
    const languages = languagesFor([...locales], path);
    for (const locale of locales) {
      const newest = newestPostDate(locale);
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        // Home lists the latest posts inside the shared template; the blog
        // index changes only when a post does.
        lastModified:
          path === '' ? laterDate(newest, SEO_TEMPLATE_UPDATED) : newest || undefined,
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
    for (const post of getPosts(locale)) {
      const available = locales.filter((l) => getPostSlugs(l).includes(post.slug));
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: laterDate(post.updated || post.date, SEO_TEMPLATE_UPDATED),
        alternates: { languages: languagesFor(available, `/blog/${post.slug}`) },
      });
    }
  }

  return entries;
}
