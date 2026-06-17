import React from 'react';

/**
 * ChordDiagram — the signature Jamerator guitar-chord fretboard.
 * Renders a 6-string diagram with muted/open markers, solid sage finger dots,
 * optional barre bars, and a nut bar (or "Nfr" position label).
 *
 * `frets` is left→right as displayed (low E → high E by default).
 * fret value: 'x' or -1 = muted · 0 = open · n = nth fret below baseFret.
 * `barres`: [{ fret, from, to }] — fret is relative (1..numFrets), from/to are
 * 0-based string indices spanned by the bar.
 * The app shows dots WITHOUT finger numbers, so `showFingers` defaults to false.
 */
export type FretValue = number | 'x';

export interface Barre {
  fret: number;
  from: number;
  to: number;
}

interface ChordDiagramProps {
  name?: string;
  frets?: FretValue[];
  fingers?: (number | null)[];
  barres?: Barre[];
  baseFret?: number;
  numFrets?: number;
  showFingers?: boolean;
  size?: number;
  style?: React.CSSProperties;
}

export function ChordDiagram({
  name,
  frets = ['x', 'x', 0, 0, 0, 0],
  fingers = [],
  barres = [],
  baseFret = 1,
  numFrets = 5,
  showFingers = false,
  size = 200,
  style = {},
}: ChordDiagramProps) {
  const strings = frets.length;            // typically 6
  const G = 34;                            // gap between strings
  const F = 40;                            // gap between frets
  const mTop = 58, mLeft = 38, mRight = 22, mBot = 14;
  const gridW = (strings - 1) * G;
  const gridH = numFrets * F;
  const W = mLeft + gridW + mRight;
  const H = mTop + gridH + mBot;
  const scale = size / W;

  const sx = (i: number) => mLeft + i * G;
  const fy = (j: number) => mTop + j * F;

  const line = 'var(--sage-700)';
  const dot = 'var(--sage-400)';
  const mark = 'var(--sage-400)';
  const barreFill = 'var(--sage-600)';

  return (
    <svg
      width={size}
      height={H * scale}
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', maxWidth: '100%', height: 'auto', fontFamily: 'var(--font-body)', ...style }}
    >
      {/* chord name */}
      {name && (
        <text x={mLeft + gridW / 2} y={28} textAnchor="middle"
          fontSize="26" fontWeight="700" fill="var(--text-primary)">{name}</text>
      )}

      {/* position label */}
      {baseFret > 1 && (
        <text x={mLeft - 14} y={fy(0) + F / 2 + 6} textAnchor="end"
          fontSize="18" fontWeight="700" fill="var(--text-primary)">{baseFret}fr</text>
      )}

      {/* nut (only at first position) */}
      {baseFret === 1 && (
        <rect x={mLeft - 1} y={mTop - 5} width={gridW + 2} height={6} rx={1} fill={line} />
      )}

      {/* frets (horizontal) */}
      {Array.from({ length: numFrets + 1 }).map((_, j) => (
        <line key={`f${j}`} x1={mLeft} y1={fy(j)} x2={mLeft + gridW} y2={fy(j)}
          stroke={line} strokeWidth={1.5} />
      ))}

      {/* strings (vertical) */}
      {Array.from({ length: strings }).map((_, i) => (
        <line key={`s${i}`} x1={sx(i)} y1={mTop} x2={sx(i)} y2={mTop + gridH}
          stroke={line} strokeWidth={1.5} />
      ))}

      {/* barre bars */}
      {barres.map((b, i) => {
        const cy = fy(b.fret - 1) + F / 2;
        const x1 = sx(b.from), x2 = sx(b.to);
        return (
          <rect key={`b${i}`} x={x1 - 13} y={cy - 13} width={(x2 - x1) + 26} height={26}
            rx={13} fill={barreFill} />
        );
      })}

      {/* open / muted markers */}
      {frets.map((v, i) => {
        const muted = v === 'x' || v === -1;
        const open = v === 0;
        const y = mTop - 18;
        if (muted) {
          const r = 6;
          return (
            <g key={`m${i}`} stroke={mark} strokeWidth={2} strokeLinecap="round">
              <line x1={sx(i) - r} y1={y - r} x2={sx(i) + r} y2={y + r} />
              <line x1={sx(i) - r} y1={y + r} x2={sx(i) + r} y2={y - r} />
            </g>
          );
        }
        if (open) {
          return <circle key={`m${i}`} cx={sx(i)} cy={y} r={6} fill="none" stroke={mark} strokeWidth={2} />;
        }
        return null;
      })}

      {/* finger dots */}
      {frets.map((v, i) => {
        if (typeof v !== 'number' || v <= 0) return null;
        // skip a dot that sits under a barre at the same fret
        if (barres.some((b) => b.fret === v && i >= b.from && i <= b.to)) return null;
        const cy = fy(v - 1) + F / 2;
        const f = fingers[i];
        return (
          <g key={`d${i}`}>
            <circle cx={sx(i)} cy={cy} r={13} fill={dot} />
            {showFingers && f != null && (
              <text x={sx(i)} y={cy + 6} textAnchor="middle"
                fontSize="18" fontWeight="800" fill="var(--ink-950)">{f}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
