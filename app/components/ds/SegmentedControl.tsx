'use client';

import React from 'react';

/**
 * SegmentedControl — the pill toggle from the app footer ("Chart / Scales").
 * Selected segment gets a sage-tinted fill and sage text; the track is a pill.
 */
type Option = string | { id: string; label: string };

interface SegmentedControlProps {
  options?: Option[];
  value?: string;
  onChange?: (id: string) => void;
  size?: 'sm' | 'md';
  glass?: boolean;
  style?: React.CSSProperties;
}

export function SegmentedControl({ options = [], value, onChange, size = 'md', glass = false, style = {} }: SegmentedControlProps) {
  const pad = size === 'sm' ? '8px 16px' : '12px 22px';
  const fontSize = size === 'sm' ? 'var(--text-sm)' : 'var(--text-base)';
  const glassTrack: React.CSSProperties = glass ? {
    background: 'linear-gradient(155deg, var(--glass-tint-strong), var(--glass-tint))',
    backdropFilter: 'var(--glass-blur)',
    WebkitBackdropFilter: 'var(--glass-blur)',
    border: '1px solid var(--glass-edge)',
    boxShadow: 'var(--glass-sheen), var(--shadow-glass)',
  } : {};
  return (
    <div
      role="tablist"
      style={{
        display: 'inline-flex',
        padding: 4,
        gap: 2,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--color-control)',
        border: '1px solid var(--border-control)',
        fontFamily: 'var(--font-body)',
        ...glassTrack,
        ...style,
      }}
    >
      {options.map((opt) => {
        const id = typeof opt === 'string' ? opt : opt.id;
        const label = typeof opt === 'string' ? opt : opt.label;
        const on = id === value;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange && onChange(id)}
            style={{
              padding: pad,
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              cursor: 'pointer',
              fontSize,
              fontWeight: 700,
              lineHeight: 1,
              background: on ? 'rgba(133,181,156,0.20)' : 'transparent',
              color: on ? (glass ? 'var(--white)' : 'var(--sage-300)') : 'var(--gray-500)',
              transition: 'all var(--dur-fast) var(--ease-standard)',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
