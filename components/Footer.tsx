import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const f = dict.footer;

  const linkClass =
    'block py-2 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-night rounded';

  return (
    <footer className="mt-16 bg-night text-white/70 md:mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/expiroo-logo.png"
                alt=""
                width={550}
                height={584}
                className="h-8 w-auto"
              />
              <span className="font-display text-lg font-bold text-white">Expiroo</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/60">{f.tagline}</p>
            <p className="mt-4 text-xs text-white/50">{f.betaNote}</p>
          </div>

          <nav aria-label={f.productHeading}>
            <h2 className="text-label mb-3 text-primary-container">{f.productHeading}</h2>
            <Link href={`/${locale}/blog`} className={linkClass}>
              {f.blog}
            </Link>
            <Link href={`/${locale}/contact`} className={linkClass}>
              {f.contact}
            </Link>
            {f.alternatives && (
              <Link href={`/${locale}/alternatives`} className={linkClass}>
                {f.alternatives}
              </Link>
            )}
          </nav>

          <nav aria-label={f.legalHeading}>
            <h2 className="text-label mb-3 text-primary-container">{f.legalHeading}</h2>
            <Link href={`/${locale}/privacy`} className={linkClass}>
              {f.privacy}
            </Link>
            <Link href={`/${locale}/imprint`} className={linkClass}>
              {f.imprint}
            </Link>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6">
          <p className="text-xs text-white/40">
            © {year} Expiroo · {f.rights}
          </p>
          <LocaleSwitcher currentLocale={locale} label={f.language} />
        </div>
      </div>
    </footer>
  );
}
