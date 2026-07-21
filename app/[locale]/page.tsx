import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DeviceFrame } from '@/components/DeviceFrame';
import { BETA_URL } from '@/lib/config';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: '',
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    availableLocales: [...locales],
  });
}

// Phase-1 placeholder hero. The full Home (features, screenshots, chart, FAQ)
// lands in a later phase — this only wires tokens, fonts, i18n and the mesh.
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <section className="expiroo-mesh relative isolate overflow-hidden">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 sm:py-32">
        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
          {dict.hero.title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-white/80">
          {dict.hero.subtitle}
        </p>
        <div className="flex flex-col items-center gap-2">
          <a
            href={BETA_URL}
            className="rounded-full bg-primary-container px-7 py-3 font-semibold text-primary-dim shadow-lg transition hover:brightness-105"
          >
            {dict.cta.beta}
          </a>
          <span className="text-sm text-white/70">{dict.cta.betaNote}</span>
        </div>
        <DeviceFrame
          src={`/images/app/${locale}/01-home.jpg`}
          alt={dict.hero.title}
          priority
          className="mt-8 w-56 drop-shadow-2xl sm:w-64"
        />
      </div>
    </section>
  );
}
