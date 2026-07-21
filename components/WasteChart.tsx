import type { Dictionary } from '@/lib/i18n';
import { BarChart } from './BarChart';

export function WasteChart({ dict }: { dict: Dictionary }) {
  const w = dict.waste;
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-label text-primary">{w.eyebrow}</p>
          <h2 className="text-headline mt-3 text-on-surface">{w.heading}</h2>
          <p className="text-lead mt-4 text-on-surface-variant">{w.lead}</p>
        </div>

        <BarChart
          bars={w.bars}
          caption={w.caption}
          sourceLabel={w.sourceLabel}
          sourceUrl={w.sourceUrl}
          ariaLabel={w.ariaLabel}
        />
      </div>
    </section>
  );
}
