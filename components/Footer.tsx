import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/config';
import type { Dictionary, Locale } from '@/lib/i18n';

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-surface-container-low">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <p className="max-w-md font-display text-base font-semibold text-on-surface">
          {dict.footer.tagline}
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-surface-variant">
          <Link
            href={`/${locale}/privacy`}
            className="transition-colors hover:text-on-surface"
          >
            {dict.footer.privacy}
          </Link>
          <Link
            href={`/${locale}/imprint`}
            className="transition-colors hover:text-on-surface"
          >
            {dict.footer.imprint}
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors hover:text-on-surface"
          >
            {dict.footer.contact}
          </a>
        </nav>
        <p className="text-xs text-on-surface-variant">
          © {year} Expiroo · {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
