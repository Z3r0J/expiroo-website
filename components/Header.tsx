import Image from 'next/image';
import Link from 'next/link';
import { BETA_URL } from '@/lib/config';
import type { Dictionary, Locale } from '@/lib/i18n';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2"
          aria-label="Expiroo"
        >
          <Image
            src="/images/expiroo-logo.png"
            alt=""
            width={550}
            height={584}
            priority
            className="h-8 w-8 object-contain"
          />
          <span className="font-display text-lg font-extrabold text-on-surface">
            Expiroo
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <LocaleSwitcher currentLocale={locale} label={dict.footer.language} />
          <a
            href={BETA_URL}
            className="rounded-full bg-linear-to-b from-primary to-primary-dim px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition hover:brightness-110"
          >
            {dict.cta.beta}
          </a>
        </div>
      </div>
    </header>
  );
}
