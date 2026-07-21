export type ChartDatum = {
  label: string;
  value: number;
  display: string;
  highlight?: boolean;
};

// Shared inline SVG bar chart (shuri §8.4). Server-rendered, no client lib.
// Bars scale to the largest value so a dominant share fills the plot; every
// value is printed (color is never the only channel). A linked source is
// mandatory — never a chart without its source.
const W = 460;
const H = 300;
const PAD_X = 40;
const BASELINE_Y = 232;
const CHART_TOP = 60;
const LABEL_Y = 262;
const MAX_BAR_H = BASELINE_Y - CHART_TOP;

export function BarChart({
  bars,
  caption,
  sourceLabel,
  sourceUrl,
  ariaLabel,
}: {
  bars: ChartDatum[];
  caption: string;
  sourceLabel: string;
  sourceUrl: string;
  ariaLabel: string;
}) {
  const maxVal = Math.max(...bars.map((b) => b.value));
  const n = bars.length;
  const slot = (W - PAD_X * 2) / n;
  const barW = Math.min(110, slot * 0.5);

  return (
    <figure className="rounded-3xl bg-surface-container-lowest p-6 md:p-8">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={ariaLabel}
        className="w-full"
      >
        <title>{caption}</title>
        <desc>{ariaLabel}</desc>
        <line
          x1={PAD_X}
          y1={BASELINE_Y}
          x2={W - PAD_X}
          y2={BASELINE_Y}
          className="stroke-outline-variant"
          strokeWidth={1}
        />
        {bars.map((bar, i) => {
          const barH = Math.max(4, (bar.value / maxVal) * MAX_BAR_H);
          const x = PAD_X + slot * i + (slot - barW) / 2;
          const y = BASELINE_Y - barH;
          const cx = x + barW / 2;
          return (
            <g key={bar.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx={6}
                className={bar.highlight ? 'fill-primary' : 'fill-primary-container'}
              />
              <text
                x={cx}
                y={y - 12}
                textAnchor="middle"
                className="fill-on-surface text-[16px] font-bold tabular-nums"
              >
                {bar.display}
              </text>
              <text
                x={cx}
                y={LABEL_Y}
                textAnchor="middle"
                className="fill-on-surface-variant text-[13px]"
              >
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-4 text-xs text-on-surface-variant">
        {caption} ·{' '}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
        >
          {sourceLabel}
        </a>
      </figcaption>
    </figure>
  );
}
