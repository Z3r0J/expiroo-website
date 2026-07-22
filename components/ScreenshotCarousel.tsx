import type { Dictionary, Locale } from '@/lib/i18n';
import { DeviceFrame } from './DeviceFrame';

// Raw captures per locale (never the composited Play screenshots). Order matches
// dict.carousel.slides.
const CAPTURES = ['01-home', '02-notify', '03-scan', '04-settings', '05-locations', '06-waste'] as const;

export function ScreenshotCarousel({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.carousel;
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-label text-primary">{c.eyebrow}</p>
        <h2 className="text-headline mt-3 text-on-surface">{c.heading}</h2>
      </div>

      <div
        role="region"
        aria-label={c.heading}
        tabIndex={0}
        data-reveal
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 sm:px-8 md:gap-6 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low [&::-webkit-scrollbar]:hidden"
      >
        {CAPTURES.map((file, i) => (
          <div key={file} className="w-60 shrink-0 snap-start sm:w-64">
            <DeviceFrame
              src={`/images/app/${locale}/${file}.jpg`}
              alt={c.slides[i]}
              sizes="16rem"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
