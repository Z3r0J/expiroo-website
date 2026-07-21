import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, locales, type Locale } from '@/lib/i18n';
import { formatDate, getPosts, type PostMeta } from '@/lib/posts';
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

function BlogCard({
  locale,
  post,
  minRead,
}: {
  locale: Locale;
  post: PostMeta;
  minRead: string;
}) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group block overflow-hidden rounded-3xl bg-surface-container-lowest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      <div className="overflow-hidden">
        <Image
          src={post.image}
          alt=""
          width={1536}
          height={1024}
          sizes="(min-width: 1024px) 22rem, (min-width: 768px) 50vw, 100vw"
          className="aspect-[3/2] w-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <p className="text-label px-6 pt-5 text-on-surface-variant">
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        {post.readingMinutes > 0 && ` · ${post.readingMinutes} ${minRead}`}
      </p>
      <h2 className="text-title mt-2 px-6 pb-6 text-on-surface transition-colors group-hover:text-primary">
        {post.title}
      </h2>
    </Link>
  );
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
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  locale={locale}
                  post={post}
                  minRead={dict.blog.minRead}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
