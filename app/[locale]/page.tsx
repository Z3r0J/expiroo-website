import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BetaCTA } from '@/components/BetaCTA';
import { Faq } from '@/components/Faq';
import { FeatureGrid } from '@/components/FeatureGrid';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { ScreenshotCarousel } from '@/components/ScreenshotCarousel';
import { WasteChart } from '@/components/WasteChart';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { faqPageLd, mobileApplicationLd, organizationLd } from '@/lib/jsonld';
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd data={mobileApplicationLd(locale, dict)} />
      <JsonLd data={organizationLd()} />
      <JsonLd data={faqPageLd(dict)} />

      <Hero locale={locale} dict={dict} />
      <FeatureGrid dict={dict} />
      <ScreenshotCarousel locale={locale} dict={dict} />
      <WasteChart dict={dict} />
      <Faq dict={dict} />
      <BetaCTA dict={dict} />
    </>
  );
}
