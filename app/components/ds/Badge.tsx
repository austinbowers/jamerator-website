import React from 'react';

/**
 * Badge — a small status/metadata tag. `solid` sage for emphasis,
 * `soft` tinted, `outline` hairline.
 */
interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'solid' | 'soft' | 'outline';
  style?: React.CSSProperties;
}

export function Badge({ children, variant = 'soft', style = {} }: BadgeProps) {
  const variants: Record<string, React.CSSProperties> = {
    solid: { background: 'var(--sage-400)', color: 'var(--ink-950)', border: '1px solid transparent' },
    soft: { background: 'rgba(133,181,156,0.14)', color: 'var(--sage-300)', border: '1px solid transparent' },
    outline: { background: 'transparent', color: 'var(--sage-400)', border: '1px solid var(--border-strong)' },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 10px',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        lineHeight: 1,
        borderRadius: 'var(--radius-pill)',
        ...(variants[variant] || variants.soft),
        ...style,
      }}
    >
      {children}
    </span>
  );
}
