'use client';

import React from 'react';
import { Button } from '../ds/Button';
import { Badge } from '../ds/Badge';
import { Icon } from '../ds/Icon';
import { ChordDiagram, type Barre, type FretValue } from '../ds/ChordDiagram';
import { SongChart, type Measure } from '../ds/SongChart';

// FeatureDemos — live, self-contained visuals for the homepage feature sections.
// Each demo renders real design-system components inside an app-style panel.

const demoPanelStyle: React.CSSProperties = {
  background: 'var(--green-canvas)',
  border: '1px solid var(--neutral-border)',
  borderRadius: 24,
  padding: 28,
  boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
};

// 1 — Generate Jams Instantly: one tap rolls a fresh progression (no option pickers).
const SHAPES: Record<string, { frets: FretValue[]; barres?: Barre[] }> = {
  Bm:  { frets: [2, 2, 4, 4, 3, 2], barres: [{ fret: 2, from: 0, to: 5 }] },
  Em:  { frets: [0, 2, 2, 0, 0, 0] },
  G7:  { frets: [3, 2, 0, 0, 0, 1] },
  'F#m': { frets: [2, 4, 4, 2, 2, 2], barres: [{ fret: 2, from: 0, to: 5 }] },
  A:   { frets: ['x', 0, 2, 2, 2, 0] },
  D:   { frets: ['x', 'x', 0, 2, 3, 2] },
  G:   { frets: [3, 2, 0, 0, 0, 3] },
  Am:  { frets: ['x', 0, 2, 2, 1, 0] },
  C:   { frets: ['x', 3, 2, 0, 1, 0] },
  E7:  { frets: [0, 2, 0, 1, 0, 0] },
  A7:  { frets: ['x', 0, 2, 0, 2, 0] },
};

const JAMS = [
  { scale: 'B minor', chords: ['Bm', 'Em', 'G7', 'F#m'] },
  { scale: 'A major', chords: ['A', 'D', 'E7', 'A'] },
  { scale: 'G major', chords: ['G', 'C', 'D', 'Em'] },
  { scale: 'A minor', chords: ['Am', 'C', 'E7', 'Am'] },
];

export function GeneratorDemo() {
  const [jam, setJam] = React.useState(0);
  const [rolling, setRolling] = React.useState(false);

  const generate = () => {
    setRolling(true);
    setTimeout(() => { setJam((j) => (j + 1) % JAMS.length); setRolling(false); }, 240);
  };
  const current = JAMS[jam];

  return (
    <div style={{ ...demoPanelStyle, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', opacity: rolling ? 0.2 : 1, transition: 'opacity 200ms var(--ease-standard)' }}>
        <span style={{ color: 'var(--white)', fontWeight: 800, fontSize: 26 }}>{current.scale}</span>
        <span style={{ color: 'var(--gray-500)', fontWeight: 700, fontSize: 13 }}>Fresh jam</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))', justifyItems: 'center', gap: 12, opacity: rolling ? 0.2 : 1, transition: 'opacity 220ms var(--ease-standard)' }}>
        {current.chords.map((c, i) => (
          <div key={c + i} style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{c}</div>
            <ChordDiagram frets={SHAPES[c].frets} barres={SHAPES[c].barres} size={96} />
          </div>
        ))}
      </div>
      <Button
        variant="primary"
        size="lg"
        fullWidth
        style={{ whiteSpace: 'nowrap' }}
        onClick={generate}
        icon={<Icon name="generate" size={20} color="var(--ink-950)" strokeWidth={2.2} />}>
        Generate Jam
      </Button>
    </div>
  );
}

// 2 — Chord Diagrams: the reference strip.
const DIAGRAM_STRIP: { name: string; frets: FretValue[]; barres?: Barre[] }[] = [
  { name: 'Bm', frets: [2, 2, 4, 4, 3, 2], barres: [{ fret: 2, from: 0, to: 5 }] },
  { name: 'Em', frets: [0, 2, 2, 0, 0, 0] },
  { name: 'G7', frets: [3, 2, 0, 0, 0, 1] },
  { name: 'F#m', frets: [2, 4, 4, 2, 2, 2], barres: [{ fret: 2, from: 0, to: 5 }] },
];

export function DiagramStripDemo() {
  return (
    <div style={{ ...demoPanelStyle, display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
      {DIAGRAM_STRIP.map((ch, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{ch.name}</div>
          <ChordDiagram frets={ch.frets} barres={ch.barres} size={116} />
        </div>
      ))}
    </div>
  );
}

// 3 — Chord Charts: the song chart with a moving playhead.
const CHART_MEASURES: Measure[] = [
  { chord: 'Bm' }, {}, {}, {},
  { chord: 'Em' }, {}, { chord: 'G7' }, { chord: 'F#m' },
  { chord: 'F#' }, {}, { chord: 'Bm' }, {},
];

export function ChartDemo() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 480);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={demoPanelStyle}>
      <SongChart columns={4} beats={4}
        barIndex={0}
        activeIndex={Math.floor(tick / 4) % CHART_MEASURES.length}
        activeBeat={tick % 4}
        endIndex={CHART_MEASURES.length - 1} measures={CHART_MEASURES} />
    </div>
  );
}

// 4 — Jam Together: a shared session syncing with friends nearby.
export function JamSessionDemo() {
  const [beat, setBeat] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setBeat((b) => (b + 1) % 4), 600);
    return () => clearInterval(id);
  }, []);
  const member = (name: string, role: string, you: boolean) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--neutral-1)', border: '1px solid var(--neutral-border)', borderRadius: 14 }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', background: you ? 'var(--sage-400)' : 'var(--neutral-2)', border: '1px solid var(--neutral-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: you ? 'var(--ink-950)' : 'var(--sage-300)', fontWeight: 800, fontSize: 15 }}>{name[0]}</div>
      <div style={{ flex: 1 }}>
        <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: 15 }}>{name}{you ? ' (You)' : ''}</div>
        <div style={{ color: 'var(--gray-500)', fontWeight: 600, fontSize: 12.5 }}>{role}</div>
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--sage-400)', fontWeight: 700, fontSize: 12.5, whiteSpace: 'nowrap', flex: 'none' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sage-400)', boxShadow: 'var(--shadow-glow-soft)' }}></span>
        In sync
      </span>
    </div>
  );
  return (
    <div style={{ ...demoPanelStyle, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Icon name="refresh" size={18} color="var(--sage-400)" style={{ flex: 'none' }} />
          <span style={{ color: 'var(--white)', fontWeight: 800, fontSize: 17, whiteSpace: 'nowrap' }}>Austin&apos;s Session</span>
        </div>
        <Badge variant="solid" style={{ whiteSpace: 'nowrap', flex: 'none' }}>B minor · 96 BPM</Badge>
      </div>
      {member('Austin', 'Rhythm', false)}
      {member('Riley', 'Lead', true)}
      {member('Sam', 'Bass', false)}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, padding: '0 4px' }}>
        <span style={{ color: 'var(--gray-500)', fontWeight: 600, fontSize: 13 }}>Everyone sees the same chart</span>
        <span style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2, 3].map((b) => (
            <span key={b} style={{ width: 8, height: 8, borderRadius: '50%', background: b === beat ? 'var(--sage-400)' : 'var(--sage-650)', transition: 'background 150ms var(--ease-standard)' }}></span>
          ))}
        </span>
      </div>
    </div>
  );
}
