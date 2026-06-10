'use client';

import React from 'react';

/**
 * Chip — a selectable pill. Jamerator uses these for scale names and tags.
 * Selected = solid sage; idle = sage outline.
 */
interface ChipProps {
  children?: React.ReactNode;
  selected?: boolean;
  size?: 'sm' | 'md';
  onClick?: React.MouseEventHandler;
  style?: React.CSSProperties;
}

export function Chip({
  children,
  selected = false,
  size = 'md',
  onClick,
  style = {},
}: ChipProps) {
  const sizes = {
    sm: { padding: '7px 14px', fontSize: 'var(--text-sm)' },
    md: { padding: '9px 18px', fontSize: 'var(--text-base)' },
  };
  const s = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: s.padding,
        fontFamily: 'var(--font-body)',
        fontSize: s.fontSize,
        fontWeight: 700,
        lineHeight: 1,
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        background: selected ? 'var(--sage-400)' : 'transparent',
        color: selected ? 'var(--ink-950)' : 'var(--sage-400)',
        border: `1px solid ${selected ? 'var(--sage-400)' : 'var(--border-strong)'}`,
        boxShadow: selected ? 'var(--shadow-glow-soft)' : 'none',
        transform: hover && !selected ? 'translateY(-1px)' : 'none',
        transition: 'all var(--dur-fast) var(--ease-standard)',
        ...(hover && !selected ? { borderColor: 'var(--sage-400)', background: 'rgba(133,181,156,0.08)' } : {}),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
