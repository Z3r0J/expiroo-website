import type { LegalDoc } from '@/lib/legal';

export function LegalPageView({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <section className="bg-mesh-wide pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-[70ch] px-5 sm:px-8">
          <h1 className="text-headline text-white">{doc.title}</h1>
          <p className="mt-3 text-sm text-white/60">{doc.updated}</p>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="prose-botanical mx-auto max-w-[70ch] px-5 sm:px-8">
          <p>{doc.intro}</p>
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
