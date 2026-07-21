import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContactForm } from '@/components/ContactForm';
import { CONTACT_EMAIL } from '@/lib/config';
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
    path: '/contact',
    title: `${dict.contact.heading} · Expiroo`,
    description: dict.contact.lead,
    availableLocales: [...locales],
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const c = dict.contact;

  return (
    <>
      <section className="bg-mesh-wide pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-[70ch] px-5 sm:px-8">
          <p className="text-label text-primary-container">{c.eyebrow}</p>
          <h1 className="text-headline mt-3 text-white">{c.heading}</h1>
          <p className="text-lead mt-4 max-w-xl text-white/80">{c.lead}</p>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-[70ch] px-5 sm:px-8">
          <ContactForm dict={dict} />
          <p className="mt-8 text-center text-sm text-on-surface-variant">
            {c.fallback}{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
