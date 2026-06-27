'use client';

import React from 'react';

/**
 * App Store download button, styled to match the site's retro-clean theme:
 * a solid forest-green pill with a cream Apple glyph and two-line lockup,
 * scaled off a single `height` prop.
 */
interface AppStoreBadgeProps {
  href: string;
  height?: number;
  onClick?: React.MouseEventHandler;
  style?: React.CSSProperties;
}

export function AppStoreBadge({ href, height = 56, onClick, style = {} }: AppStoreBadgeProps) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const h = height;
  const cream = '#FCFAF3';
  const sysFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  const wrap: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: h * 0.16,
    height: h,
    padding: `0 ${h * 0.34}px`,
    background: hover ? '#2F5440' : 'var(--forest)',
    border: 'none',
    borderRadius: h * 0.32,
    boxShadow: '0 8px 22px rgba(56,98,76,0.28)',
    textDecoration: 'none',
    cursor: 'pointer',
    transform: active ? 'scale(0.97)' : 'scale(1)',
    transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
    ...style,
  };

  return (
    <a
      href={href}
      aria-label="Download Jamerator on the App Store"
      style={wrap}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      <svg viewBox="0 0 384 512" width={h * 0.5} height={h * 0.5} fill={cream} aria-hidden="true" style={{ flex: 'none', marginTop: -h * 0.04 }}>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C61.7 141.9 0 184.6 0 271.4c0 25.6 4.7 52.1 14.1 79.4 12.6 36 58 124.3 105.4 122.9 24.8-.6 42.3-17.6 74.5-17.6 31.3 0 47.5 17.6 75.1 17.6 47.8-.7 88.8-81 100.8-117.1-64.1-30.2-60.7-88.5-60.6-90.1zm-58.7-141.7c28.3-33.6 25.7-64.2 24.9-75.2-25 1.4-53.9 17-70.4 36.2-18.2 20.5-28.9 45.8-26.6 74.6 27 2.1 51.6-11.8 72.1-35.6z" />
      </svg>
      <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: cream, fontFamily: sysFont, lineHeight: 1, whiteSpace: 'nowrap', textAlign: 'left' }}>
        <span style={{ fontSize: h * 0.2, fontWeight: 500, letterSpacing: '0.02em', opacity: 0.85 }}>Download on the</span>
        <span style={{ fontSize: h * 0.37, fontWeight: 700, letterSpacing: '-0.01em', marginTop: h * 0.04 }}>App Store</span>
      </span>
    </a>
  );
}
