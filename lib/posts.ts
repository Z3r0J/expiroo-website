import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { locales, type Locale } from './i18n';

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO (YYYY-MM-DD)
  keyword: string;
  image: string;
  readingMinutes: number;
  category: string;
};

export type PostMeta = PostFrontmatter & { slug: string; locale: Locale };
export type Post = PostMeta & { content: string };

const blogDir = (locale: Locale) =>
  path.join(process.cwd(), 'content', locale, 'blog');

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
    date: String(data.date ?? ''),
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
