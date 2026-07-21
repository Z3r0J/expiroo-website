import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BetaButton } from '@/components/BetaButton';
import { getDictionary, isLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

// EN-only quick win (empty SERP). hreflang = en + x-default only (C2).
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') return {};
  return buildMetadata({
    locale: 'en',
    path: '/alternatives',
    title: 'NoWaste & Best Before alternative for Android — Expiroo',
    description:
      'Looking for a NoWaste or Best Before alternative on Android? Expiroo is a local-first food expiration tracker: no account, works offline, one-time purchase.',
    availableLocales: ['en'],
  });
}

type Cell = { text: string; tone: 'good' | 'neutral' | 'verify' };

const toneClass: Record<Cell['tone'], string> = {
  good: 'bg-fresh-container text-on-fresh-container',
  neutral: 'bg-surface-container-low text-on-surface-variant',
  verify: 'bg-warning-container text-on-warning-container',
};

function Chip({ cell }: { cell: Cell }) {
  return (
    <span className={`text-label inline-flex rounded-full px-2.5 py-1 ${toneClass[cell.tone]}`}>
      {cell.text}
    </span>
  );
}

const ROWS: { criterion: string; expiroo: Cell; noWaste: Cell; bestBefore: Cell }[] = [
  {
    criterion: 'Available on Android',
    expiroo: { text: 'Yes', tone: 'good' },
    noWaste: { text: 'iOS only', tone: 'neutral' },
    bestBefore: { text: 'Yes', tone: 'good' },
  },
  {
    criterion: 'No account required',
    expiroo: { text: 'Yes', tone: 'good' },
    noWaste: { text: 'Check listing', tone: 'verify' },
    bestBefore: { text: 'Check listing', tone: 'verify' },
  },
  {
    criterion: 'Works fully offline',
    expiroo: { text: 'Yes', tone: 'good' },
    noWaste: { text: 'Check listing', tone: 'verify' },
    bestBefore: { text: 'Check listing', tone: 'verify' },
  },
  {
    criterion: 'Pricing',
    expiroo: { text: 'One-time purchase', tone: 'good' },
    noWaste: { text: 'Check listing', tone: 'verify' },
    bestBefore: { text: 'Check listing', tone: 'verify' },
  },
  {
    criterion: 'Barcode scanning',
    expiroo: { text: 'Yes', tone: 'good' },
    noWaste: { text: 'Check listing', tone: 'verify' },
    bestBefore: { text: 'Check listing', tone: 'verify' },
  },
];

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== 'en') notFound();
  const dict = getDictionary('en');

  return (
    <>
      <section className="bg-mesh-wide pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-[70ch] px-5 sm:px-8">
          <p className="text-label text-primary-container">Comparison</p>
          <h1 className="text-headline mt-3 text-white">
            A NoWaste & Best Before alternative for Android
          </h1>
          <p className="text-lead mt-4 max-w-xl text-white/80">
            NoWaste is an iOS-only app, so Android users searching for it need
            another option. Here is how Expiroo compares as an Android expiry
            tracker.
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="prose-botanical">
            <p>
              Expiroo is a local-first food expiration tracker for Android. It
              keeps what is in your fridge, freezer and pantry on your device,
              works without an account and without a connection, and is a
              one-time purchase rather than a subscription.
            </p>
          </div>

          <div className="not-prose mt-8 overflow-x-auto rounded-2xl bg-surface-container-lowest">
            <table className="mdx-table text-body">
              <thead>
                <tr>
                  <th>Criterion</th>
                  <th>Expiroo</th>
                  <th>NoWaste</th>
                  <th>Best Before</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.criterion}>
                    <td className="font-medium text-on-surface">{row.criterion}</td>
                    <td>
                      <Chip cell={row.expiroo} />
                    </td>
                    <td>
                      <Chip cell={row.noWaste} />
                    </td>
                    <td>
                      <Chip cell={row.bestBefore} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-on-surface-variant">
            Based on publicly available information. App features and pricing
            change over time — always verify current details on each app’s
            Google Play or App Store listing. “Check listing” means we do not
            assert a value we cannot currently verify.
          </p>

          <div className="mt-10">
            <BetaButton
              className="inline-flex min-h-13 px-8 text-base"
              ringOffset="surface"
            >
              {dict.cta.beta}
            </BetaButton>
          </div>
        </div>
      </section>
    </>
  );
}
