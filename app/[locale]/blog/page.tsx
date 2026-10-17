import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogCard } from '@/components/BlogCard';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { getPosts } from '@/lib/posts';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: '/blog',
    title: `${dict.blog.heading} · Expiroo`,
    description: dict.blog.description,
    availableLocales: [...locales],
  });
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const posts = getPosts(locale);

  return (
    <>
      <section className="bg-mesh-wide pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-label text-primary-container">{dict.blog.eyebrow}</p>
          <h1 className="text-headline mt-3 max-w-3xl text-white">{dict.blog.heading}</h1>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {posts.length === 0 ? (
            <div className="rounded-3xl bg-surface-container-low p-10 text-center text-on-surface-variant">
              {dict.blog.empty}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  locale={locale}
                  post={post}
                  minRead={dict.blog.minRead}
                  index={i}
                  lcp={i === 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
