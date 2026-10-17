import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import type { PostMeta } from '@/lib/posts';
import { BlogCard } from './BlogCard';

// Section background and the matching focus-ring offset for links/cards on it.
const TONES = {
  'container-low': {
    bg: 'bg-surface-container-low',
    ringOffset: 'focus-visible:ring-offset-surface-container-low',
  },
  surface: {
    bg: 'bg-surface',
    ringOffset: 'focus-visible:ring-offset-surface',
  },
} as const;

/**
 * Internal-linking band of post cards plus a link to the blog index: the home
 * page's latest posts and a post's related posts. `tone` picks the surface so
 * it alternates with its neighbours (No-Line Rule): `container-low` between
 * `bg-surface` sections (home), `surface` where the next thing is the footer
 * (post pages), so no stripe of body colour shows in the footer's top margin.
 * The section owns the h2, so cards render h3; none of them is the LCP.
 * Renders nothing when there are no posts.
 */
export function MorePosts({
  locale,
  dict,
  posts,
  heading,
  eyebrow,
  tone = 'container-low',
}: {
  locale: Locale;
  dict: Dictionary;
  posts: PostMeta[];
  heading: string;
  eyebrow?: string;
  tone?: keyof typeof TONES;
}) {
  if (posts.length === 0) return null;
  const { bg, ringOffset } = TONES[tone];
  return (
    <section className={`${bg} py-16 md:py-24`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          {/* min-w-0 + hyphens: long compounds (DE) must wrap, not overflow phones. */}
          <div className="min-w-0">
            {eyebrow && <p className="text-label text-primary">{eyebrow}</p>}
            <h2
              className={`text-headline max-w-2xl hyphens-auto break-words text-on-surface${eyebrow ? ' mt-3' : ''}`}
            >
              {heading}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className={`group inline-flex shrink-0 items-center gap-1.5 font-bold text-primary transition-colors hover:text-primary-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${ringOffset}`}
          >
            {dict.blog.allPosts}
            <svg
              viewBox="0 0 24 24"
              className="size-4 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard
              key={post.slug}
              locale={locale}
              post={post}
              minRead={dict.blog.minRead}
              index={i}
              headingLevel="h3"
              ringOffsetClass={ringOffset}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
