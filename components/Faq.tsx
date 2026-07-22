import type { Dictionary } from '@/lib/i18n';

export function Faq({ dict }: { dict: Dictionary }) {
  const f = dict.faq;
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="mx-auto max-w-[70ch] px-5 sm:px-8">
        <div data-reveal>
          <p className="text-label text-primary">{f.eyebrow}</p>
          <h2 className="text-headline mt-3 text-on-surface">{f.heading}</h2>
        </div>

        <div className="mt-8">
          {f.items.map((item) => (
            <details
              key={item.q}
              className="faq-item group mt-3 rounded-2xl bg-surface-container-lowest"
            >
              <summary className="text-title flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 shrink-0 text-on-surface-variant motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="text-body px-6 pb-6 text-on-surface-variant">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
