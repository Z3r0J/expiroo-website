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
    title: 'NoWaste & Best Before Alternative — Expiroo (Android, no account)',
    description:
      'Looking for a NoWaste or Best Before alternative? Expiroo is an Android-first food expiration tracker that needs no account, works offline by design, and is a one-time purchase — not a subscription.',
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

// Every cell is verified public info or marked "Check listing" where it cannot
// be confirmed (never invented). Expiroo's defensible edge is the "good" tone.
const ROWS: { criterion: string; expiroo: Cell; noWaste: Cell; bestBefore: Cell }[] = [
  {
    criterion: 'Platforms',
    expiroo: { text: 'Android', tone: 'good' },
    noWaste: { text: 'iOS & Android', tone: 'neutral' },
    bestBefore: { text: 'iOS & Android', tone: 'neutral' },
  },
  {
    criterion: 'Account',
    expiroo: { text: 'Never required', tone: 'good' },
    noWaste: { text: 'Check listing', tone: 'verify' },
    bestBefore: { text: 'Optional, for sync', tone: 'neutral' },
  },
  {
    criterion: 'Works offline',
    expiroo: { text: 'By design', tone: 'good' },
    noWaste: { text: 'Check listing', tone: 'verify' },
    bestBefore: { text: 'Partial', tone: 'neutral' },
  },
  {
    criterion: 'Pricing',
    expiroo: { text: 'One-time purchase', tone: 'good' },
    noWaste: { text: 'Freemium + in-app purchases', tone: 'neutral' },
    bestBefore: { text: 'One-time (iOS) / free (Android)', tone: 'neutral' },
  },
  {
    criterion: 'Barcode scanning',
    expiroo: { text: 'Yes', tone: 'good' },
    noWaste: { text: 'Yes', tone: 'neutral' },
    bestBefore: { text: 'Yes', tone: 'neutral' },
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
            Expiroo vs. NoWaste and Best Before
          </h1>
          <p className="text-lead mt-4 max-w-xl text-white/80">
            NoWaste and Best Before are both capable, cross-platform expiry
            trackers. Here is where Expiroo is a different kind of alternative —
            and honest about where it is not.
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="prose-botanical">
            <p>
              Expiroo is a local-first food expiration tracker built Android-first.
              Its defensible difference is simple: it never asks for an account,
              works offline by design because your inventory lives in a local
              database on your phone, and it is a one-time purchase rather than a
              subscription. NoWaste and Best Before take different trade-offs, and
              both are good apps — the table below sticks to what can be verified.
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
            Based on publicly available information (App Store / Google Play
            listings, developer sites). Best Before keeps its inventory offline
            but its barcode lookup needs a connection, so it is “Partial”.
            “Check listing” means a detail we cannot currently verify and do not
            want to assert — always confirm current features and pricing on each
            app’s store listing.
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
