import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { BETA_POST_SLUG } from './config';
import { locales, type Locale } from './i18n';

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO (YYYY-MM-DD)
  updated: string; // ISO (YYYY-MM-DD) of the last content revision; '' when absent
  keyword: string;
  image: string;
  readingMinutes: number;
  category: string;
};

export type PostMeta = PostFrontmatter & { slug: string; locale: Locale };
export type Post = PostMeta & { content: string };

const blogDir = (locale: Locale) =>
  path.join(process.cwd(), 'content', locale, 'blog');

/**
 * Frontmatter date → 'YYYY-MM-DD'. YAML turns an unquoted date into a Date
 * object (UTC midnight), which `String()` would render as a long local-time
 * string; anything that is not a valid ISO date becomes ''.
 */
function isoDate(value: unknown): string {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? '' : value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return '';
}

function toMeta(
  locale: Locale,
  slug: string,
  data: Record<string, unknown>,
): PostMeta {
  return {
    slug,
    locale,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: isoDate(data.date),
    updated: isoDate(data.updated),
    keyword: String(data.keyword ?? ''),
    image: String(data.image ?? ''),
    readingMinutes: Number(data.readingMinutes ?? 0),
    category: String(data.category ?? ''),
  };
}

export function getPostSlugs(locale: Locale): string[] {
  const dir = blogDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPosts(locale: Locale): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => {
      const { data } = matter.read(path.join(blogDir(locale), `${slug}.mdx`));
      return toMeta(locale, slug, data);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Most recently revised (`updated || date`) first; ties broken by slug A→Z. */
function byRecency(a: PostMeta, b: PostMeta): number {
  const aDate = a.updated || a.date;
  const bDate = b.updated || b.date;
  if (aDate !== bDate) return aDate < bDate ? 1 : -1;
  return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
}

/** The `limit` most recently revised posts of a locale, skipping `exclude` slugs. */
export function getLatestPosts(
  locale: Locale,
  limit: number,
  exclude: string[],
): PostMeta[] {
  return getPosts(locale)
    .filter((p) => !exclude.includes(p.slug))
    .sort(byRecency)
    .slice(0, limit);
}

/**
 * Further reading for a post, same locale only: posts of the same category
 * first, then the most recently revised. Never the post itself or the beta
 * join tutorial (every CTA already links there).
 */
export function getRelatedPosts(
  locale: Locale,
  slug: string,
  limit: number,
): PostMeta[] {
  const posts = getPosts(locale);
  const category = posts.find((p) => p.slug === slug)?.category ?? '';
  const sameCategory = (p: PostMeta) => category !== '' && p.category === category;
  return posts
    .filter((p) => p.slug !== slug && p.slug !== BETA_POST_SLUG)
    .sort((a, b) => Number(sameCategory(b)) - Number(sameCategory(a)) || byRecency(a, b))
    .slice(0, limit);
}

export function getPost(locale: Locale, slug: string): Post | null {
  const file = path.join(blogDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter.read(file);
  return { ...toMeta(locale, slug, data), content };
}

/** Locales in which a given slug exists — drives hreflang alternates (C2). */
export function getLocalesForSlug(slug: string): Locale[] {
  return locales.filter((l) =>
    fs.existsSync(path.join(blogDir(l), `${slug}.mdx`)),
  );
}

export function formatDate(date: string, locale: Locale): string {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
    new Date(date),
  );
}
