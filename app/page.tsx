'use client';

import React from 'react';
import Image from 'next/image';
import appIcon from '@/public/assets/icon-light.png';
import { AppStoreBadge } from './components/AppStoreBadge';
import { PhoneShot, PhonePair, RingHalo } from './components/home/PhoneShot';
import { Icon } from './components/ds/Icon';

const TRY_URL = 'https://apps.apple.com/us/app/jamerator/id6743706466';
const ACCENT = 'var(--forest)';

function Pill({ children, icon }: { children: React.ReactNode; icon?: string }) {
  return (
    <span className="pill">
      {icon ? <Icon name={icon} size={15} color={ACCENT} strokeWidth={2.4} /> : <span className="pill-dot" />}
      {children}
    </span>
  );
}

function Hero() {
  return (
    <section className="section section-tint">
      <div className="decor-disc hero-disc" />
      <div className="decor-ring hero-ring" />
      <div className="wrap hero-grid" style={{ position: 'relative' }}>
        <div className="hero-copy">
          <Pill icon="music">Chord progression generator</Pill>
          <h1 style={{ margin: '18px 0 20px', fontSize: 'clamp(42px, 8vw, 68px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, textWrap: 'balance' }}>
            Spark your<br />next <span style={{ color: ACCENT }}>jam.</span>
          </h1>
          <p className="body-copy" style={{ fontSize: 19, maxWidth: '42ch' }}>
            Whether you&apos;re riffing solo or rocking out with friends, Jamerator serves up fresh chord progressions, matching scales, and play-along charts, anytime, anywhere.
          </p>
          <div className="hero-cta">
            <AppStoreBadge href={TRY_URL} height={56} />
          </div>
        </div>
        <div className="hero-phone-col">
          <RingHalo maxWidth={340}>
            <PhoneShot src="/assets/screens/chart-tilt-alt-cut.png" alt="Jamerator chart view showing chord diagrams and a song chart for Eb minor" width={1359} height={1982} maxWidth={340} priority tone="light" blob={false} />
          </RingHalo>
        </div>
      </div>
      <TrustStrip />
    </section>
  );
}

const TRUST = [
  { icon: 'sparkles', label: 'One-tap progressions' },
  { icon: 'music', label: 'Scales & modes' },
  { icon: 'sliders', label: 'Chord diagrams' },
  { icon: 'play', label: 'Play-along charts' },
  { icon: 'shuffle', label: 'Endless variations' },
  { icon: 'refresh', label: 'Always fresh ideas' },
  { icon: 'check', label: 'Works offline' },
  { icon: 'heart', label: 'No account needed' },
];

function TrustStrip() {
  const items = TRUST.map((t, i) => (
    <span className="marquee-item" key={i}>
      <span className="ico-chip"><Icon name={t.icon} size={18} color={ACCENT} strokeWidth={2.2} /></span>
      <span className="trust-box-label">{t.label}</span>
    </span>
  ));
  return (
    <div className="marquee" aria-label="Jamerator features">
      <div className="marquee-track">
        <div className="marquee-group">{items}</div>
        <div className="marquee-group" aria-hidden="true">{items}</div>
      </div>
    </div>
  );
}

function FeatureSection({ bg, id, eyebrow, eyebrowIcon, title, note, children, flip, phone }: {
  bg: 'light' | 'tint';
  id?: string;
  eyebrow: string;
  eyebrowIcon?: string;
  title: React.ReactNode;
  note?: string;
  children: React.ReactNode;
  flip?: boolean;
  phone: React.ReactNode;
}) {
  return (
    <section className={`section section-${bg}`}>
      <div className="wrap">
        <div className="feature-row" id={id}>
          <div style={{ order: flip ? 2 : 1 }}>
            <div style={{ marginBottom: 18 }}><Pill icon={eyebrowIcon}>{eyebrow}</Pill></div>
            <h2 className="h2">{title}</h2>
            <p className="body-copy">{children}</p>
            {note && <p className="feat-note">{note}</p>}
          </div>
          <div style={{ order: flip ? 1 : 2, minWidth: 0 }}>{phone}</div>
        </div>
      </div>
    </section>
  );
}

const BENTO = [
  { icon: 'music', title: 'Every scale & mode', copy: 'From pentatonics to full modes, see exactly what fits over your progression, and where each note lives on the neck.', half: true },
  { icon: 'play', title: 'Hear it played back', copy: 'Tap play and the progression strums back chord by chord, so you know just how it should sound.', half: true },
  { icon: 'sliders', title: 'Built-in metronome', copy: 'Dial in the tempo and stay locked in the pocket.' },
  { icon: 'heart', title: 'Save your favorites', copy: 'Keep the progressions you love a tap away.' },
  { icon: 'sparkles', title: 'Endless ideas', copy: 'Never run dry. Regenerate for a fresh jam instantly.' },
];

function BentoSection() {
  return (
    <section className="section section-tint section-pad">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 48, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Pill>And so much more</Pill>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>Everything you need to keep jamming.</h2>
        </div>
        <div className="bento">
          {BENTO.map((b) => (
            <div key={b.title} className={`bento-card${b.half ? ' b-half' : ''}`}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(56,98,76,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={b.icon} size={24} color={ACCENT} strokeWidth={2} />
              </div>
              <h3 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: 'var(--light-ink)', letterSpacing: '-0.01em' }}>{b.title}</h3>
              <p style={{ margin: 0, color: 'var(--light-ink-2)', fontWeight: 500, fontSize: 15.5, lineHeight: 1.6, textWrap: 'pretty' }}>{b.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="section section-tint" style={{ borderTop: '1px solid var(--light-hairline)' }}>
      <div className="wrap section-pad" style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginBottom: 4 }}>
          <div className="decor-ring" style={{ width: 196, height: 196, left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5 }} />
          <div className="decor-ring" style={{ width: 150, height: 150, left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.75 }} />
          <Image src={appIcon} alt="" width={104} height={104} style={{ position: 'relative', width: 104, height: 104, borderRadius: 24, display: 'block', background: '#FFFFFF', boxShadow: '0 14px 34px rgba(24,33,27,0.18)' }} />
        </div>
        <h2 className="h2" style={{ fontSize: 'clamp(32px, 6vw, 48px)', margin: '28px 0 14px', position: 'relative' }}>Stay inspired. Stay jamming.</h2>
        <p className="body-copy" style={{ margin: '0 auto 32px', position: 'relative' }}>Download Jamerator free and turn any moment into your next great progression. A garage session, a late-night couch riff, a jam with friends.</p>
        <div style={{ display: 'inline-flex', justifyContent: 'center', position: 'relative' }}>
          <AppStoreBadge href={TRY_URL} height={60} />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div id="top">
      <Hero />
      <div id="features">
        <FeatureSection
          bg="light"
          flip
          eyebrow="Generator"
          eyebrowIcon="sparkles"
          title={<>Instant chords.<br /><span style={{ color: ACCENT }}>Endless inspiration.</span></>}
          phone={<PhoneShot src="/assets/screens/chart-tilt-cut.png" alt="Jamerator generating an Eb minor chord progression with diagrams and a chart" width={1454} height={2216} maxWidth={430} tone="light" blobX={4} blobY={8} />}
        >
          Generate a beautiful chord progression with just a tap, complete with finger-by-finger chord diagrams and a play-along chart. Don&apos;t like it? Tap again for another. No menus, no setup, just an endless well of ideas.
        </FeatureSection>

        <FeatureSection
          bg="tint"
          eyebrow="Scales"
          eyebrowIcon="music"
          title={<>Jam with matching <span style={{ color: ACCENT }}>scales.</span></>}
          phone={<PhoneShot src="/assets/screens/scales-tilt-cut.png" alt="Jamerator scales view showing the Eb pentatonic minor scale across the fretboard" width={1334} height={2033} maxWidth={430} tone="light" blobX={-3} blobY={6} />}
        >
          Practice scales that fit perfectly with every progression. Switch to Scales and see exactly where every note lives on the fretboard, from pentatonics to full modes, so you always know what to solo with.
        </FeatureSection>

        <FeatureSection
          bg="light"
          flip
          id="jam-together"
          eyebrow="Jam Together"
          eyebrowIcon="shuffle"
          title={<>Share the session, <span style={{ color: ACCENT }}>stay in sync.</span></>}
          note="Works over Bluetooth or Wi-Fi, no internet needed."
          phone={<PhoneShot src="/assets/screens/jam-tilt-cut.png" alt="Jamerator Jam Together screen with options to start or join a jam" width={1334} height={2033} maxWidth={430} tone="light" blobX={-4} blobY={8} />}
        >
          Playing with friends nearby? Start a jam and everyone&apos;s app syncs to the same chart, the same key, the same tempo. No more &quot;wait, what chord are we on?&quot;
        </FeatureSection>

        <BentoSection />

        <FeatureSection
          bg="light"
          eyebrow="Light & Dark"
          eyebrowIcon="sparkles"
          title={<>Designed for every <span style={{ color: ACCENT }}>jam session.</span></>}
          phone={
            <PhonePair
              tone="light"
              maxWidth={540}
              back={{ src: '/assets/screens/chart-tilt-alt-cut.png', alt: 'Jamerator chart in dark mode', width: 1359, height: 1982 }}
              front={{ src: '/assets/screens/chart-light-tilt-cut.png', alt: 'Jamerator chart in light mode', width: 1137, height: 2014 }}
            />
          }
        >
          Beautiful light and dark modes that let you focus on what matters: your music. Jamerator follows your system theme automatically, crisp on a sunlit porch and easy on the eyes at a late-night session.
        </FeatureSection>
      </div>
      <CtaBand />
    </div>
  );
}
