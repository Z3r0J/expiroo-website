import type { SVGProps } from 'react';

export type IconName =
  | 'reminders'
  | 'barcode'
  | 'urgency'
  | 'locations'
  | 'waste'
  | 'privacy'
  | 'notvorrat';

const paths: Record<IconName, React.ReactNode> = {
  reminders: (
    <>
      <path d="M18 8.4a6 6 0 1 0-12 0c0 3.4-.9 5-1.6 5.9-.4.5 0 1.2.6 1.2h13c.6 0 1-.7.6-1.2-.7-.9-1.6-2.5-1.6-5.9Z" />
      <path d="M9.5 19a2.5 2.5 0 0 0 5 0" />
    </>
  ),
  barcode: (
    <>
      <path d="M4 6v12M6.5 6v12M9 6v12M12 6v12M14.5 6v12M17.5 6v12M20 6v12" />
    </>
  ),
  urgency: (
    <>
      <rect x="8" y="3" width="8" height="18" rx="4" />
      <circle cx="12" cy="7.5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="16.5" r="1.5" />
    </>
  ),
  locations: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="3" />
      <path d="M6 10.5h12" />
      <path d="M9 6.2v1.6M9 13v2" />
    </>
  ),
  waste: (
    <>
      <path d="M4 19.5h16" />
      <rect x="5.5" y="12" width="3" height="7.5" rx="1" />
      <rect x="10.5" y="8" width="3" height="11.5" rx="1" />
      <rect x="15.5" y="14" width="3" height="5.5" rx="1" />
    </>
  ),
  privacy: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
      <path d="M9.3 12l1.9 1.9L15 10.2" />
    </>
  ),
  notvorrat: (
    <>
      <path d="M4 8l8-4 8 4-8 4-8-4Z" />
      <path d="M4 8v8l8 4 8-4V8" />
      <path d="M12 12v8" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
