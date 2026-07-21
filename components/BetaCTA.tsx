import type { Dictionary } from '@/lib/i18n';
import { BetaButton } from './BetaButton';

export function BetaCTA({ dict }: { dict: Dictionary }) {
  const b = dict.betaBanner;
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="bg-mesh-wide overflow-hidden rounded-4xl px-6 py-14 text-center md:px-16 md:py-20">
          <h2 className="text-headline mx-auto max-w-2xl text-white">
            {b.headingLead}
            <span className="text-primary-container">{b.headingHighlight}</span>
          </h2>
          <p className="text-lead mx-auto mt-4 max-w-xl text-white/80">{b.sub}</p>
          <BetaButton className="mt-8 inline-flex min-h-13 px-8 text-base">
            {b.cta}
          </BetaButton>
        </div>
      </div>
    </section>
  );
}
