'use client';

import React from 'react';
import { Chip } from '../ds/Chip';
import { IconButton } from '../ds/IconButton';

function MiniCard({ title, copy, visual }: { title: string; copy: string; visual: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--green-canvas)', border: '1px solid var(--neutral-border)', borderRadius: 20, padding: 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ minHeight: 84, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{visual}</div>
      <div>
        <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 800 }}>{title}</h3>
        <p style={{ margin: 0, color: 'var(--gray-400)', fontWeight: 500, fontSize: 15, lineHeight: 1.6, textWrap: 'pretty' }}>{copy}</p>
      </div>
    </div>
  );
}

const SCALES = ['B Mixolydian', 'A# Blues', 'C Minor Pentatonic', 'E Dorian'];
const BARS = [10, 22, 16, 30, 14, 26, 18, 32, 12];

export function MiniGrid() {
  const [beat, setBeat] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setBeat((b) => (b + 1) % 4), 620);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, padding: '20px 0 72px' }}>
      <MiniCard
        title="Scales that fit"
        copy="See every guitar scale that sings over your progression — from modes to pentatonics — so you always know what to solo with."
        visual={<div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', justifyContent: 'center' }}>{SCALES.map((s, i) => <Chip key={s} size="sm" selected={i === 0}>{s}</Chip>)}</div>}
      />
      <MiniCard
        title="Jam View"
        copy="An immersive, distraction-free stage for soloing over the progression while your bandmates hold down the rhythm."
        visual={
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 44, fontWeight: 800, color: 'var(--sage-400)', textShadow: '0 0 28px rgba(133,181,156,0.45)', lineHeight: 1 }}>Bm</div>
            <div style={{ color: 'var(--gray-500)', fontWeight: 700, fontSize: 12.5, marginTop: 6 }}>F#m up next</div>
          </div>
        }
      />
      <MiniCard
        title="Guitar playback"
        copy="Tap play and hear the progression strummed back, chord by chord — so you know how it should sound."
        visual={
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <IconButton icon="play" glass size={48} ariaLabel="Play" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {BARS.map((h, i) => <span key={i} style={{ width: 4, height: h, borderRadius: 2, background: i < 4 ? 'var(--sage-400)' : 'var(--sage-650)' }}></span>)}
            </div>
          </div>
        }
      />
      <MiniCard
        title="Built-in metronome"
        copy="Set the tempo and stay in the pocket — the metronome keeps your whole jam locked in time."
        visual={
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--white)', lineHeight: 1 }}>96 <span style={{ fontSize: 15, color: 'var(--gray-500)' }}>BPM</span></div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 12 }}>
              {[0, 1, 2, 3].map((b) => <span key={b} style={{ width: 10, height: 10, borderRadius: '50%', background: b === beat ? 'var(--sage-400)' : 'var(--sage-650)', boxShadow: b === beat ? 'var(--shadow-glow-soft)' : 'none', transition: 'background 140ms var(--ease-standard)' }}></span>)}
            </div>
          </div>
        }
      />
    </div>
  );
}
