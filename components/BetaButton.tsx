import Link from 'next/link';
import { BETA_POST_SLUG } from '@/lib/config';
import type { Locale } from '@/lib/i18n';

/**
 * Primary brand CTA pill (gradient primary→primary-dim). Routes to the locale's
 * closed-beta join tutorial (`/{locale}/blog/${BETA_POST_SLUG}`), which explains
 * the two-step join flow. The caller sets the display + size classes;
 * `ringOffset` matches the surface it sits on.
 */
export function BetaButton({
  children,
  locale,
  className = '',
  ringOffset = 'night',
}: {
  children: React.ReactNode;
  locale: Locale;
  className?: string;
  ringOffset?: 'night' | 'surface';
}) {
  const ring =
    ringOffset === 'surface'
      ? 'focus-visible:ring-offset-surface'
      : 'focus-visible:ring-offset-night';
  return (
    <Link
      href={`/${locale}/blog/${BETA_POST_SLUG}`}
      className={`items-center justify-center rounded-full bg-linear-to-b from-primary to-primary-dim font-bold text-on-primary motion-safe:transition motion-safe:duration-200 hover:brightness-110 motion-safe:hover:scale-[1.02] active:scale-[0.98] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 ${ring} ${className}`}
    >
      {children}
    </Link>
  );
}
