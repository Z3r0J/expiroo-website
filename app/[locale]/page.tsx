import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BetaCTA } from '@/components/BetaCTA';
import { Faq } from '@/components/Faq';
import { FeatureGrid } from '@/components/FeatureGrid';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { MorePosts } from '@/components/MorePosts';
import { ScreenshotCarousel } from '@/components/ScreenshotCarousel';
import { WasteChart } from '@/components/WasteChart';
import { BETA_POST_SLUG } from '@/lib/config';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { faqPageLd, mobileApplicationLd, organizationLd, websiteLd } from '@/lib/jsonld';
import { getLatestPosts } from '@/lib/posts';
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
      <JsonLd data={websiteLd()} />
      <JsonLd data={faqPageLd(dict)} />

      <Hero locale={locale} dict={dict} />
      <FeatureGrid dict={dict} />
      <ScreenshotCarousel locale={locale} dict={dict} />
      <WasteChart dict={dict} />
      <MorePosts
        locale={locale}
        dict={dict}
        posts={getLatestPosts(locale, 3, [BETA_POST_SLUG])}
        eyebrow={dict.latestPosts.eyebrow}
        heading={dict.latestPosts.heading}
      />
      <Faq dict={dict} />
      <BetaCTA locale={locale} dict={dict} />
    </>
  );
}
