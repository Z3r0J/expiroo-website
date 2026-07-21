import Image from 'next/image';

/**
 * Composes a raw app capture inside a Galaxy S25 device mockup, CSS-only
 * (server component, zero JS). The capture is inset to the frame's screen rect
 * and the transparent-screen bezel PNG is layered on top.
 *
 * Geometry from templates/mockups/manifest.json (mockup-galaxy-s25): the frame
 * is Android-first (design.json uses mockup-galaxy-s25). Screen rect and corner
 * radius are relative to the frame width, so they scale with any rendered size.
 */
const FRAME = { w: 1158, h: 2418 };
const SCREEN = { x: 0.0337, y: 0.0161, w: 0.9326, h: 0.9677, r: 0.1036 };

// Trims binary-float noise (e.g. 0.0161 * 100 -> 1.6099999999999999).
const pct = (n: number) => `${Number((n * 100).toFixed(4))}%`;

type DeviceFrameProps = {
  /** Path to the raw capture (e.g. /images/app/en/01-home.jpg). */
  src: string;
  alt: string;
  priority?: boolean;
  /** Sizing/positioning classes for the frame container (sets the width). */
  className?: string;
  /** next/image sizes hint for the capture. */
  sizes?: string;
};

export function DeviceFrame({
  src,
  alt,
  priority = false,
  className,
  sizes = '(min-width: 640px) 16rem, 60vw',
}: DeviceFrameProps) {
  return (
    <div
      className={`relative ${className ?? ''}`}
      // containerType lets the corner radius (cqw) scale with the rendered width.
      style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}`, containerType: 'inline-size' }}
    >
      <div
        className="absolute overflow-hidden"
        style={{
          left: pct(SCREEN.x),
          top: pct(SCREEN.y),
          width: pct(SCREEN.w),
          height: pct(SCREEN.h),
          // r is relative to frame width → same fraction of the container width.
          borderRadius: `${Number((SCREEN.r * 100).toFixed(4))}cqw`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>

      <Image
        src="/images/mockups/galaxy-s25-black.png"
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className="pointer-events-none select-none object-contain"
      />
    </div>
  );
}
