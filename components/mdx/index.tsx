import type { ComponentProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BarChart, type ChartAccent, type ChartDatum } from '@/components/BarChart';

/**
 * MDX component map, injected via the `components` prop of <MDXRemote> (M3:
 * next-mdx-remote/rsc does NOT support import/export inside the MDX itself).
 */

function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="note"
      className="not-prose my-8 flex gap-3 rounded-2xl bg-warning-container p-5 text-on-warning-container"
    >
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 size-6 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 7.5h.01" />
      </svg>
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function PostChart({
  data,
  caption,
  source,
  sourceUrl,
  ariaLabel,
  accent,
}: {
  // MDX drops expression attributes (next-mdx-remote/serialize), so authors
  // pass `data` as a JSON string; direct React callers may pass the array.
  data: string | ChartDatum[];
  caption: string;
  source: string;
  sourceUrl: string;
  ariaLabel?: string;
  accent?: ChartAccent;
}) {
  const bars: ChartDatum[] = typeof data === 'string' ? JSON.parse(data) : data;
  return (
    <div className="not-prose my-8">
      <BarChart
        bars={bars}
        caption={caption}
        sourceLabel={source}
        sourceUrl={sourceUrl}
        ariaLabel={ariaLabel ?? caption}
        accent={accent}
      />
    </div>
  );
}

function MdxImage({ src, alt, width, height }: ComponentProps<'img'>) {
  if (typeof src !== 'string') return null;
  return (
    <Image
      src={src}
      alt={alt ?? ''}
      width={Number(width) || 1536}
      height={Number(height) || 1024}
      sizes="(min-width: 768px) 70ch, 100vw"
      className="my-6 h-auto w-full rounded-2xl"
    />
  );
}

function MdxLink({ href = '', children, ...rest }: ComponentProps<'a'>) {
  const url = String(href);
  if (url.startsWith('/')) {
    return (
      <Link href={url} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function MdxTable(props: ComponentProps<'table'>) {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-2xl bg-surface-container-lowest">
      <table className="mdx-table text-body" {...props} />
    </div>
  );
}

export const mdxComponents = {
  Disclaimer,
  PostChart,
  img: MdxImage,
  a: MdxLink,
  table: MdxTable,
};
