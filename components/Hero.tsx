import type { Dictionary, Locale } from '@/lib/i18n';
import { BetaButton } from './BetaButton';
import { DeviceFrame } from './DeviceFrame';

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-mesh overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-end gap-12 px-5 pt-32 sm:px-8 md:pt-40 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="pb-16 md:pb-24">
          <p className="text-label text-primary-container">{dict.hero.eyebrow}</p>
          <h1 className="text-display mt-4 max-w-xl text-white">
            {dict.hero.titleLead}
            <span className="text-primary-container">{dict.hero.titleHighlight}</span>
          </h1>
          <p className="text-lead mt-5 max-w-lg text-white/80">{dict.hero.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BetaButton className="inline-flex min-h-13 px-8 text-base">
              {dict.hero.ctaPrimary}
            </BetaButton>
            <a
              href="#features"
              className="inline-flex min-h-13 items-center rounded-full px-6 font-bold text-primary-container transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-night"
            >
              {dict.hero.ctaSecondary}
            </a>
          </div>
          <p className="mt-4 text-sm text-white/60">{dict.cta.betaNote}</p>
        </div>

        <div className="-mb-16 flex justify-center md:-mb-24 lg:justify-end">
          <DeviceFrame
            src={`/images/app/${locale}/01-home.jpg`}
            alt={dict.carousel.slides[0]}
            priority
            sizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, 60vw"
            className="mx-auto w-64 shadow-phone sm:w-72 lg:w-80"
          />
        </div>
      </div>
    </section>
  );
}
