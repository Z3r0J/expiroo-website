import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n';
import { Icon } from './Icon';

export function FeatureGrid({ dict }: { dict: Dictionary }) {
  const f = dict.features;
  return (
    <section id="features" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div data-reveal>
          <p className="text-label text-primary">{f.eyebrow}</p>
          <h2 className="text-headline mt-3 max-w-2xl text-on-surface">{f.heading}</h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {f.items.map((item, i) => (
            <article
              key={item.title}
              data-reveal
              style={{ '--reveal-delay': `${Math.min(i, 5) * 70}ms` } as React.CSSProperties}
              className="rounded-3xl bg-surface-container-lowest p-6 md:p-8 motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 hover:-translate-y-1 hover:shadow-ambient"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                <Icon name={item.icon} className="size-6" />
              </span>
              <h3 className="text-title mt-5 text-on-surface">{item.title}</h3>
              <p className="text-body mt-2 text-on-surface-variant">{item.body}</p>
              {item.chip && (
                <span className="text-label mt-4 inline-flex rounded-full bg-fresh-container px-3 py-1.5 text-on-fresh-container">
                  {item.chip}
                </span>
              )}
            </article>
          ))}

          {f.notvorrat && (
            <article
              data-reveal
              className="rounded-3xl bg-primary-container/40 p-6 sm:col-span-2 md:p-8 lg:col-span-3 lg:flex lg:items-center lg:justify-between lg:gap-8"
            >
              <div className="lg:max-w-2xl">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                  <Icon name="notvorrat" className="size-6" />
                </span>
                <h3 className="text-title mt-5 text-on-surface">{f.notvorrat.title}</h3>
                <p className="text-body mt-2 text-on-surface-variant">{f.notvorrat.body}</p>
              </div>
              <Link
                href={f.notvorrat.href}
                className="group mt-5 inline-flex shrink-0 items-center gap-1.5 font-bold text-primary transition-colors hover:text-primary-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface lg:mt-0"
              >
                {f.notvorrat.cta}
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
