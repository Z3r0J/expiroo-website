import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPageView } from '@/components/LegalPageView';
import { isLocale, locales } from '@/lib/i18n';
import { privacyDoc } from '@/lib/legal';
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
  const doc = privacyDoc[locale];
  return buildMetadata({
    locale,
    path: '/privacy',
    title: `${doc.title} · Expiroo`,
    description: doc.metaDescription ?? doc.intro,
    availableLocales: [...locales],
    noindex: true,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPageView doc={privacyDoc[locale]} />;
}
