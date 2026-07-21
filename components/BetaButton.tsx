import { BETA_URL } from '@/lib/config';

/**
 * Primary brand CTA pill (gradient primary→primary-dim). The caller sets the
 * display + size classes; `ringOffset` matches the surface it sits on.
 */
export function BetaButton({
  children,
  className = '',
  ringOffset = 'night',
}: {
  children: React.ReactNode;
  className?: string;
  ringOffset?: 'night' | 'surface';
}) {
  const ring =
    ringOffset === 'surface'
      ? 'focus-visible:ring-offset-surface'
      : 'focus-visible:ring-offset-night';
  return (
    <a
      href={BETA_URL}
      className={`items-center justify-center rounded-full bg-linear-to-b from-primary to-primary-dim font-bold text-on-primary motion-safe:transition motion-safe:duration-200 hover:brightness-110 motion-safe:hover:scale-[1.02] active:scale-[0.98] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 ${ring} ${className}`}
    >
      {children}
    </a>
  );
}
