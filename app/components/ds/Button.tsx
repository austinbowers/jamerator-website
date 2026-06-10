'use client';

import React from 'react';

/**
 * Jamerator Button — the sage primary action, plus outline & ghost variants.
 * Mirrors the app's "Generate Jam" button and the website CTA.
 * Pass `href` to render as a link with identical styling.
 */
interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler;
  style?: React.CSSProperties;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  fullWidth = false,
  disabled = false,
  href,
  onClick,
  style = {},
}: ButtonProps) {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 'var(--text-sm)', radius: 'var(--radius-sm)', gap: 6 },
    md: { padding: '12px 18px', fontSize: 'var(--text-base)', radius: 'var(--radius-md)', gap: 8 },
    lg: { padding: '15px 22px', fontSize: 'var(--text-lg)', radius: 'var(--radius-md)', gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--text-on-primary)',
      border: '1px solid transparent',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--sage-400)',
      border: '1px solid var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--sage-400)',
      border: '1px solid transparent',
    },
  };
  const v = variants[variant] || variants.primary;

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const hoverStyle: React.CSSProperties = !disabled && hover
    ? (variant === 'primary'
        ? { background: 'var(--color-primary-hover)' }
        : { background: 'rgba(133,181,156,0.10)', borderColor: 'var(--sage-400)' })
    : {};

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    width: fullWidth ? '100%' : 'auto',
    padding: s.padding,
    fontFamily: 'var(--font-body)',
    fontSize: s.fontSize,
    fontWeight: 700,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    borderRadius: s.radius,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transform: active && !disabled ? 'scale(0.97)' : 'scale(1)',
    transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
    ...v,
    ...hoverStyle,
    ...style,
  };

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setActive(false); },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    onClick,
  };

  if (href && !disabled) {
    return (
      <a href={href} style={baseStyle} {...handlers}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button type="button" disabled={disabled} style={baseStyle} {...handlers}>
      {icon}
      {children}
    </button>
  );
}
