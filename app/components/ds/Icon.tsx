import React from 'react';

/**
 * Icon — Jamerator's line-icon set. Thin 2px strokes, round caps, matching the
 * iOS app's SF Symbols look. Paths follow the Lucide visual language
 * (ISC-licensed) as a substitute for Apple's SF Symbols, which can't ship on web.
 */
const PATHS: Record<string, React.ReactNode> = {
  music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  flask: <><path d="M10 2v7.31" /><path d="M14 9.3V2" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" /></>,
  sparkles: <><path d="M9.94 6.06 9 9l-3 .94L9 11l.94 3 .94-3L14 11l-3-.94z" /><path d="M18 5l.5 1.5L20 7l-1.5.5L18 9l-.5-1.5L16 7l1.5-.5z" /><path d="M5 16l.5 1.5L7 18l-1.5.5L5 20l-.5-1.5L3 18l1.5-.5z" /></>,
  generate: <><path d="M9 17V5l9-1.5V14" /><circle cx="6" cy="17" r="2.6" /><circle cx="15" cy="14" r="2.6" /><path d="M19 4l.6 1.6L21 6l-1.4.4L19 8l-.6-1.6L17 6l1.4-.4z" /></>,
  play: <><polygon points="6 4 20 12 6 20 6 4" /></>,
  pause: <><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></>,
  heart: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></>,
  shuffle: <><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.6-8.6c.8-1.1 2-1.7 3.3-1.7H22" /><path d="m18 2 4 4-4 4" /><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" /><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" /><path d="m18 14 4 4-4 4" /></>,
  refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></>,
  sliders: <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /><circle cx="9" cy="8" r="2.4" /><circle cx="15" cy="16" r="2.4" /></>,
  menu: <><path d="M5 9h14" /><path d="M8 15h8" /></>,
  plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  check: <><path d="M20 6 9 17l-5-5" /></>,
  chevronRight: <><path d="m9 18 6-6-6-6" /></>,
  chevronDown: <><path d="m6 9 6 6 6-6" /></>,
  x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
};

export type IconName = keyof typeof PATHS;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 2, style = {}, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', flex: 'none', ...style }}
      {...rest}
    >
      {PATHS[name] || null}
    </svg>
  );
}
