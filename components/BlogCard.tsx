import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { formatDate, type PostMeta } from '@/lib/posts';

export function BlogCard({
  locale,
  post,
  minRead,
  index,
  lcp = false,
  headingLevel = 'h2',
  ringOffsetClass = 'focus-visible:ring-offset-surface',
}: {
  locale: Locale;
  post: PostMeta;
  minRead: string;
  /** Position in the grid; staggers the reveal animation. */
  index: number;
  /** This card's image is the page's LCP (only the first card of the blog index). */
  lcp?: boolean;
  /** h3 when the surrounding section already owns the h2. */
  headingLevel?: 'h2' | 'h3';
  /** Focus-ring offset; must match the background of the section behind the card. */
  ringOffsetClass?: string;
}) {
  // The LCP card's image renders visible immediately (no reveal animation) and
  // eagerly with `priority`. Same rule as the Hero.
  const Heading = headingLevel;
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      data-reveal={lcp ? undefined : true}
      style={
        lcp
          ? undefined
          : ({ '--reveal-delay': `${Math.min(index, 5) * 70}ms` } as React.CSSProperties)
      }
      className={`group block overflow-hidden rounded-3xl bg-surface-container-lowest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${ringOffsetClass}`}
    >
      <div className="overflow-hidden bg-surface-container-low">
        <Image
          src={post.image}
          alt=""
          width={1536}
          height={1024}
          priority={lcp}
          sizes="(min-width: 1024px) 22rem, (min-width: 768px) 50vw, 100vw"
          className="aspect-[3/2] w-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <p className="text-label px-6 pt-5 text-on-surface-variant">
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        {post.readingMinutes > 0 && ` · ${post.readingMinutes} ${minRead}`}
      </p>
      <Heading className="text-title mt-2 hyphens-auto break-words px-6 pb-6 text-on-surface transition-colors group-hover:text-primary">
        {post.title}
      </Heading>
    </Link>
  );
}
