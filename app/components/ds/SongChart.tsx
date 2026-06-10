import React from 'react';

/**
 * SongChart — the generated song chart: rows of measures, each showing a chord
 * (or a held/empty bar) plus beat-marker dots. A bright sage bar marks the
 * active measure (playhead) and, optionally, the loop end.
 *
 * During playback, pass `activeBeat` (0-based) and the active measure's dots
 * light up in 4/4 metronome time — beats played so far fill sage, the current
 * beat glows. Pass `barIndex` to pin the playhead bar independently of the
 * animating measure.
 *
 * measures: flat array of { chord?: string|null }. Laid out in `columns` per row.
 */
export interface Measure {
  chord?: string | null;
}

interface SongChartProps {
  measures?: Measure[];
  columns?: number;
  beats?: number;
  activeIndex?: number;
  activeBeat?: number;
  barIndex?: number | null;
  endIndex?: number;
  onSelect?: (index: number) => void;
  style?: React.CSSProperties;
}

function Dot({ state }: { state: 'idle' | 'lit' | 'current' }) {
  return (
    <span style={{
      width: 5, height: 5, borderRadius: '50%',
      background: state === 'idle' ? 'var(--sage-650)' : 'var(--sage-400)',
      boxShadow: state === 'current' ? '0 0 8px rgba(133,181,156,0.9)' : 'none',
      transform: state === 'current' ? 'scale(1.5)' : 'scale(1)',
      transition: 'transform 120ms var(--ease-standard), background 120ms var(--ease-standard)',
      display: 'block',
    }} />
  );
}

export function SongChart({
  measures = [],
  columns = 4,
  beats = 4,
  activeIndex = -1,
  activeBeat = -1,
  barIndex = null,
  endIndex = -1,
  onSelect,
  style = {},
}: SongChartProps) {
  const barAt = barIndex == null ? activeIndex : barIndex;
  const rows: (Measure & { index: number })[][] = [];
  for (let i = 0; i < measures.length; i += columns) {
    rows.push(measures.slice(i, i + columns).map((m, j) => ({ ...m, index: i + j })));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'var(--font-body)', ...style }}>
      {rows.map((row, r) => (
        <div key={r} style={{
          display: 'flex',
          background: 'var(--color-panel)',
          border: '1px solid var(--neutral-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}>
          {row.map((m, c) => {
            const active = m.index === activeIndex;
            const hasBar = m.index === barAt;
            const isEnd = m.index === endIndex;
            return (
              <div
                key={m.index}
                onClick={() => onSelect && onSelect(m.index)}
                style={{
                  position: 'relative',
                  flex: 1,
                  minWidth: 0,
                  padding: '16px 16px 14px',
                  minHeight: 78,
                  boxSizing: 'border-box',
                  borderRight: c < row.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  background: active ? 'rgba(133,181,156,0.06)' : 'transparent',
                  cursor: onSelect ? 'pointer' : 'default',
                }}
              >
                {hasBar && (
                  <span style={{
                    position: 'absolute', left: 0, top: 10, bottom: 10, width: 4,
                    borderRadius: 4, background: 'var(--sage-400)',
                    boxShadow: 'var(--shadow-glow-soft)',
                  }} />
                )}
                {isEnd && (
                  <span style={{
                    position: 'absolute', right: 0, top: 10, bottom: 10, width: 4,
                    borderRadius: 4, background: 'var(--sage-400)',
                    boxShadow: 'var(--shadow-glow-soft)',
                  }} />
                )}
                <div style={{
                  color: 'var(--text-primary)', fontWeight: 800,
                  fontSize: 'var(--text-xl)', lineHeight: 1, minHeight: 22,
                }}>{m.chord || ''}</div>
                <div style={{
                  position: 'absolute', left: 16, right: 16, bottom: 14,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  {Array.from({ length: beats }).map((_, b) => {
                    let state: 'idle' | 'lit' | 'current' = 'idle';
                    if (active && activeBeat >= 0) {
                      if (b === activeBeat) state = 'current';
                      else if (b < activeBeat) state = 'lit';
                    } else if (active && b === 0) {
                      state = 'lit';
                    }
                    return <Dot key={b} state={state} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
