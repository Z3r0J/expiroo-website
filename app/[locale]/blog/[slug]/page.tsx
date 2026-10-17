import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { JsonLd } from '@/components/JsonLd';
import { mdxComponents } from '@/components/mdx';
import { MorePosts } from '@/components/MorePosts';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { articleLd, breadcrumbLd } from '@/lib/jsonld';
import {
  formatDate,
  getLocalesForSlug,
  getPost,
  getPostSlugs,
  getRelatedPosts,
} from '@/lib/posts';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPost(locale, slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    availableLocales: getLocalesForSlug(slug),
    image: post.image,
    ogType: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated || post.date,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPost(locale, slug);
  if (!post) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd data={articleLd(locale, post)} />
      <JsonLd data={breadcrumbLd(locale, post)} />

      <section className="bg-mesh-wide pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {post.category && (
            <p className="text-label text-primary-container">{post.category}</p>
          )}
          <h1 className="text-headline mt-3 max-w-3xl text-white">{post.title}</h1>
          <p className="mt-4 text-sm text-white/60">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            {post.updated && post.updated !== post.date && (
              <>
                {` · ${dict.blog.updated} `}
                <time dateTime={post.updated}>{formatDate(post.updated, locale)}</time>
              </>
            )}
            {post.readingMinutes > 0 &&
              ` · ${post.readingMinutes} ${dict.blog.minRead}`}
          </p>
        </div>
      </section>

      {post.image && (
        <div className="mx-auto -mt-10 max-w-4xl px-5 sm:px-8 md:-mt-14">
          <div className="overflow-hidden rounded-3xl bg-surface-container-low">
            <Image
              src={post.image}
              alt=""
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 896px) 56rem, 100vw"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
        </div>
      )}

      <article className="prose-botanical mx-auto max-w-[70ch] px-5 py-12 sm:px-8">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>

      <MorePosts
        locale={locale}
        dict={dict}
        posts={getRelatedPosts(locale, slug, 3)}
        heading={dict.blog.related}
        tone="surface"
      />
    </>
  );
}
