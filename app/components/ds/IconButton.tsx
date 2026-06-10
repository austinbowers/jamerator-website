'use client';

import React from 'react';
import { Icon } from './Icon';

/**
 * IconButton — the app's circular control. `neutral` is the dark header/footer
 * button (menu, heart, play, sliders); `primary` is the sage action; `ghost` is
 * bare. Pass `glow` for the signature sage halo (regenerate FAB), or `glass` for
 * the iOS-26 Liquid Glass material (translucent, frosted, specular rim).
 */
interface IconButtonProps {
  icon: string;
  variant?: 'neutral' | 'primary' | 'ghost';
  size?: number;
  glow?: boolean;
  glass?: boolean;
  active?: boolean;
  color?: string;
  onClick?: React.MouseEventHandler;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

export function IconButton({
  icon,
  variant = 'neutral',
  size = 48,
  glow = false,
  glass = false,
  active = false,
  color,
  onClick,
  ariaLabel,
  style = {},
}: IconButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const variants: Record<string, { background: string; border: string; iconColor: string }> = {
    neutral: {
      background: 'var(--color-control)',
      border: '1px solid var(--border-control)',
      iconColor: active ? 'var(--sage-400)' : 'var(--gray-300)',
    },
    primary: {
      background: hover ? 'var(--color-primary-hover)' : 'var(--sage-400)',
      border: '1px solid transparent',
      iconColor: 'var(--ink-950)',
    },
    ghost: {
      background: hover ? 'rgba(133,181,156,0.10)' : 'transparent',
      border: '1px solid transparent',
      iconColor: active ? 'var(--sage-400)' : 'var(--gray-300)',
    },
  };
  const v = variants[variant] || variants.neutral;

  // iOS-26 Liquid Glass material — overlays the chosen variant.
  const isPrimary = variant === 'primary';
  const glassStyle: React.CSSProperties = glass ? {
    background: isPrimary
      ? 'linear-gradient(155deg, var(--glass-tint-sage-strong), var(--glass-tint-sage))'
      : 'linear-gradient(155deg, var(--glass-tint-strong), var(--glass-tint))',
    backdropFilter: 'var(--glass-blur)',
    WebkitBackdropFilter: 'var(--glass-blur)',
    border: '1px solid var(--glass-edge)',
    boxShadow: `var(--glass-sheen), var(--shadow-glass)${glow ? ', var(--shadow-glow)' : ''}`,
  } : {};
  const glassIconColor = glass
    ? (isPrimary ? 'var(--ink-950)' : (active ? 'var(--sage-300)' : 'var(--white)'))
    : v.iconColor;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        width: size,
        height: size,
        borderRadius: 'var(--radius-pill)',
        background: v.background,
        border: v.border,
        boxShadow: glow ? 'var(--shadow-glow)' : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transform: press ? 'scale(0.92)' : 'scale(1)',
        transition: 'transform var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
        ...(hover && variant === 'neutral' && !glass ? { borderColor: 'var(--sage-700)' } : {}),
        ...glassStyle,
        ...style,
      }}
    >
      <Icon name={icon} size={Math.round(size * 0.44)} color={color || glassIconColor} strokeWidth={2} />
    </button>
  );
}
