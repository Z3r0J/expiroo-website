import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { BetaButton } from './BetaButton';
import { LocaleSwitcher } from './LocaleSwitcher';

// Transparent, non-sticky header sitting over the page's opening mesh band
// (shuri §6). No JS scroll-state, no border.
export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-night"
          aria-label="Expiroo"
        >
          <Image
            src="/images/expiroo-logo.png"
            alt=""
            width={550}
            height={584}
            priority
            sizes="36px"
            className="h-9 w-auto"
          />
          <span className="font-display text-xl font-bold text-white">Expiroo</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-1 sm:flex">
            <Link
              href={`/${locale}/blog`}
              className="rounded-full px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {dict.nav.blog}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {dict.nav.contact}
            </Link>
          </nav>
          <LocaleSwitcher
            currentLocale={locale}
            label={dict.footer.language}
            notAvailableLabel={dict.footer.notAvailable}
          />
          <BetaButton locale={locale} className="hidden min-h-11 px-5 text-sm md:inline-flex">
            {dict.cta.beta}
          </BetaButton>
        </div>
      </div>
    </header>
  );
}
