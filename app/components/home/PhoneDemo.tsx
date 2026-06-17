'use client';

import React from 'react';
import { ChordDiagram, type Barre, type FretValue } from '../ds/ChordDiagram';
import { SongChart, type Measure } from '../ds/SongChart';
import { SegmentedControl } from '../ds/SegmentedControl';
import { IconButton } from '../ds/IconButton';

/** PhoneDemo — a scaled live preview of the app's Chart screen for the marketing site. */
const STRIP: { name: string; frets: FretValue[]; barres?: Barre[] }[] = [
  { name: 'Bm', frets: [2, 2, 4, 4, 3, 2], barres: [{ fret: 2, from: 0, to: 5 }] },
  { name: 'Em', frets: [0, 2, 2, 0, 0, 0] },
  { name: 'G7', frets: [3, 2, 0, 0, 0, 1] },
];

const MEASURES: Measure[] = [
  { chord: 'Bm' }, {}, {}, {},
  { chord: 'Em' }, {}, { chord: 'G7' }, { chord: 'F#m' },
  { chord: 'F#' }, {}, { chord: 'Bm' }, {},
];

export function PhoneDemo({ scale = 0.6, animate = true, tilt = false }: { scale?: number; animate?: boolean; tilt?: boolean }) {
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    if (!animate) return;
    const id = setInterval(() => setTick((t) => t + 1), 480);
    return () => clearInterval(id);
  }, [animate]);

  return (
    <div style={{ width: 390 * scale, height: 844 * scale, flex: 'none', position: 'relative', perspective: tilt ? 2000 : undefined }}>
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%, -50%) ${tilt ? `scale(${scale}) rotateY(-15deg) rotateX(6deg) rotateZ(-2deg)` : `scale(${scale})`}`,
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
        width: 390, height: 844,
      }}>
        <div style={{ width: 390, height: 844, boxSizing: 'border-box', borderRadius: 56, padding: 13, background: 'linear-gradient(145deg, #3b4542 0%, #1c221f 40%, #121613 62%, #313b37 100%)', boxShadow: tilt ? '40px 60px 120px rgba(0,0,0,0.62), 0 0 0 1px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,255,255,0.05)' : '0 40px 90px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.04)', position: 'relative' }}>
          {/* titanium side buttons */}
          <div style={{ position: 'absolute', left: -3, top: 158, width: 3, height: 30, borderRadius: '3px 0 0 3px', background: 'linear-gradient(180deg, #3b443f, #161b19)' }}></div>
          <div style={{ position: 'absolute', left: -3, top: 214, width: 3, height: 56, borderRadius: '3px 0 0 3px', background: 'linear-gradient(180deg, #3b443f, #161b19)' }}></div>
          <div style={{ position: 'absolute', left: -3, top: 286, width: 3, height: 56, borderRadius: '3px 0 0 3px', background: 'linear-gradient(180deg, #3b443f, #161b19)' }}></div>
          <div style={{ position: 'absolute', right: -3, top: 252, width: 3, height: 92, borderRadius: '0 3px 3px 0', background: 'linear-gradient(180deg, #3b443f, #161b19)' }}></div>
          <div style={{ width: '100%', height: '100%', borderRadius: 44, overflow: 'hidden', background: 'var(--green-canvas)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* screen glare */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 6, background: 'linear-gradient(125deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 15%, transparent 34%)' }}></div>
            {/* status bar */}
            <div style={{ height: 50, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px 0 34px', color: 'var(--white)', fontWeight: 700, fontSize: 16, position: 'relative', zIndex: 5 }}>
              <span>1:46</span>
              <div style={{ position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)', width: 120, height: 32, background: '#000', borderRadius: 18 }}></div>
              <svg width="26" height="12" viewBox="0 0 26 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="var(--white)" opacity="0.5"></rect><rect x="2" y="2" width="16" height="8" rx="1.5" fill="var(--white)"></rect><rect x="23" y="4" width="1.6" height="4" rx="0.8" fill="var(--white)" opacity="0.5"></rect></svg>
            </div>
            {/* header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 0' }}>
              <IconButton icon="menu" size={44} glass ariaLabel="Menu" />
              <IconButton icon="heart" size={44} glass ariaLabel="Favorite" />
            </div>
            <div style={{ margin: '12px 0 0', padding: '0 22px', color: 'var(--white)', fontWeight: 800, fontSize: 36, letterSpacing: '-0.01em' }}>B minor</div>
            {/* body */}
            <div style={{ flex: 1, overflow: 'hidden', padding: '18px 16px 0' }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
                {STRIP.map((ch, i) => (
                  <div key={i} style={{ flex: 'none', textAlign: 'center' }}>
                    <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{ch.name}</div>
                    <ChordDiagram frets={ch.frets} barres={ch.barres} size={104} />
                  </div>
                ))}
              </div>
              <SongChart columns={4} beats={4}
                barIndex={0}
                activeIndex={animate ? Math.floor(tick / 4) % MEASURES.length : 0}
                activeBeat={animate ? tick % 4 : -1}
                endIndex={MEASURES.length - 1} measures={MEASURES} />
            </div>
            {/* footer dock */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 16px 22px', background: 'linear-gradient(to top, var(--green-canvas) 74%, transparent)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <SegmentedControl value="chart" size="sm" glass options={[{ id: 'chart', label: 'Chart' }, { id: 'scales', label: 'Scales' }]} />
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                <IconButton icon="sliders" size={44} glass ariaLabel="Tune" />
                <IconButton icon="play" size={44} glass ariaLabel="Play" />
                <IconButton icon="refresh" variant="primary" glass glow size={56} ariaLabel="Regenerate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
