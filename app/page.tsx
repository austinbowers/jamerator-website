'use client';

import React from 'react';
import Image from 'next/image';
import appIcon from '@/public/assets/icon-light.png';
import { Button } from './components/ds/Button';
import { PhoneDemo } from './components/home/PhoneDemo';
import { GeneratorDemo, DiagramStripDemo, ChartDemo, JamSessionDemo } from './components/home/FeatureDemos';
import { MiniGrid } from './components/home/MiniGrid';

const TRY_URL = 'https://jamerator-app.vercel.app/';

function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--green-canvas)' }}>
      <div style={{ position: 'absolute', right: '-6%', top: '4%', width: 720, height: 720, borderRadius: '50%', background: 'radial-gradient(circle, rgba(133,181,156,0.16), transparent 65%)', pointerEvents: 'none' }}></div>
      <div className="wrap hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, alignItems: 'center', padding: '84px 32px 72px' }}>
        <div>
          <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(42px, 14vw, 64px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05, textWrap: 'pretty' }}>
            Spark your<br />next <span style={{ color: 'var(--sage-400)' }}>jam.</span>
          </h1>
          <p className="body-copy" style={{ fontSize: 19, maxWidth: '44ch' }}>
            Whether you&apos;re riffing solo or rocking out with friends, Jamerator supercharges your creativity with fresh chord progressions — anytime, anywhere. Break out of your routine and keep the vibes flowing.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginTop: 32 }}>
            <Button variant="primary" size="lg" href={TRY_URL} style={{ whiteSpace: 'nowrap' }}>Try Jamerator</Button>
            <Button variant="secondary" size="lg" style={{ whiteSpace: 'nowrap' }} onClick={() => { const el = document.getElementById('features'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 60, behavior: 'smooth' }); }}>See What It Does</Button>
          </div>
        </div>
        <div className="hero-phone-col">
          <PhoneDemo scale={0.71} tilt />
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ id, eyebrow, title, children, demo, flip }: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  demo: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="feature-row" id={id}>
      <div style={{ order: flip ? 2 : 1 }}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h2">{title}</h2>
        <p className="body-copy">{children}</p>
      </div>
      <div style={{ order: flip ? 1 : 2, minWidth: 0 }}>{demo}</div>
    </div>
  );
}

function CtaBand() {
  return (
    <section style={{ background: 'var(--green-canvas)', borderTop: '1px solid var(--green-hairline)' }}>
      <div className="wrap" style={{ textAlign: 'center', padding: '88px 32px' }}>
        <Image src={appIcon} alt="" style={{ width: 76, height: 76, borderRadius: 18, background: 'var(--white)', boxShadow: 'var(--shadow-glow-soft)', display: 'inline-block' }} />
        <h2 className="h2" style={{ fontSize: 44, margin: '26px 0 12px' }}>Stay inspired. Stay jamming.</h2>
        <p className="body-copy" style={{ margin: '0 auto 30px' }}>Perfect for impromptu garage jams, late-night bonfire sessions, or locking in tight grooves with your bandmates.</p>
        <Button variant="primary" size="lg" href={TRY_URL} style={{ whiteSpace: 'nowrap' }}>Try Jamerator</Button>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div id="top">
      <Hero />
      <main id="features" className="wrap" style={{ padding: '40px 32px 0' }}>
        <FeatureRow eyebrow="Generator" title="Generate jams instantly." demo={<GeneratorDemo />}>
          One tap is all it takes — Jamerator instantly serves up a fresh progression, ready to play. Don&apos;t like it? Tap again for another. No menus, no setup, just an endless well of ideas. Try the live demo.
        </FeatureRow>
        <FeatureRow flip eyebrow="Chord Diagrams" title="Every chord, at a glance." demo={<DiagramStripDemo />}>
          Crystal-clear diagrams show exactly where your fingers go — barres, open strings, and all — so you can reference any chord mid-jam without breaking your flow.
        </FeatureRow>
        <FeatureRow eyebrow="Chord Charts" title="Read the chart, play the song." demo={<ChartDemo />}>
          Your progression lays out bar by bar with beat markers and a playhead that follows along — you always know where you are in the song, and where it&apos;s headed next.
        </FeatureRow>
        <FeatureRow flip id="jam-together" eyebrow="Jam Together" title="Share the session, stay in sync." demo={<JamSessionDemo />}>
          Playing with friends nearby? Share your jam session and everyone&apos;s app syncs to the same chart, the same key, the same tempo. No more &quot;wait — what chord are we on?&quot;
        </FeatureRow>
        <MiniGrid />
      </main>
      <CtaBand />
    </div>
  );
}
