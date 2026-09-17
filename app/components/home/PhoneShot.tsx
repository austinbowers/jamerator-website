'use client';

import React from 'react';
import Image from 'next/image';

/**
 * PhoneShot — a cut-out app screenshot (transparent PNG) floating on a soft
 * sage gradient circle, echoing the App Store screenshots. The phone carries a
 * drop shadow for grounding; the blob sits behind it and peeks out around the edges.
 */
// Flat, hard-edged sage circle — no blur, retro poster styling.
function blobBackground(tone: 'dark' | 'light') {
  return tone === 'dark' ? 'rgba(133,181,156,0.16)' : 'var(--sage-circle)';
}

function dropShadow(tone: 'dark' | 'light') {
  return tone === 'dark'
    ? 'drop-shadow(0 34px 64px rgba(0,0,0,0.55))'
    : 'drop-shadow(0 34px 58px rgba(22,44,33,0.26))';
}

interface PhoneShotProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Width of the device itself, in px. */
  maxWidth?: number;
  /**
   * Device width divided by image width. Shots rendered on an angle carry
   * empty corners, so sizing them by the image makes the phone read smaller
   * than a straight-on shot at the same width.
   */
  deviceRatio?: number;
  priority?: boolean;
  tone?: 'dark' | 'light';
  blob?: boolean;
  blobX?: number;
  blobY?: number;
  blobScale?: number;
}

export function PhoneShot({
  src, alt, width, height, maxWidth = 360, deviceRatio = 1, priority = false,
  tone = 'light', blob = true, blobX = 0, blobY = 4, blobScale = 1.32,
}: PhoneShotProps) {
  const imageMax = maxWidth / deviceRatio;
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      {blob && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: `${blobScale * 100}%`,
            maxWidth: maxWidth * blobScale,
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            background: blobBackground(tone),
            transform: `translate(${blobX}%, ${blobY}%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 900px) 78vw, 440px"
        style={{ position: 'relative', width: '100%', height: 'auto', maxWidth: imageMax, display: 'block', filter: dropShadow(tone) }}
      />
    </div>
  );
}

/** RingHalo — concentric sage rings + a solid disc behind a phone, for hero/CTA emphasis. */
export function RingHalo({ children, maxWidth = 360 }: { children: React.ReactNode; maxWidth?: number }) {
  const ring = (w: string, opacity: number): React.CSSProperties => ({
    width: w, aspectRatio: '1 / 1', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity,
  });
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="decor-ring" style={ring('128%', 0.5)} />
      <div className="decor-ring" style={ring('112%', 0.8)} />
      <div className="decor-disc" style={{ width: '98%', aspectRatio: '1 / 1', left: '50%', top: '50%', transform: 'translate(-50%, -48%)' }} />
      {children}
    </div>
  );
}

interface PhonePairShot {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Extra CSS tilt. Shots that are already rendered on an angle pass 0. */
  rotate?: number;
  /** Device width divided by image width — see PhoneShot. */
  deviceRatio?: number;
}

interface PhonePairProps {
  back: PhonePairShot;
  front: PhonePairShot;
  tone?: 'dark' | 'light';
  maxWidth?: number;
}

/** PhonePair — two cut-out phones overlapping on one blob, for the light/dark story. */
export function PhonePair({ back, front, tone = 'light', maxWidth = 520 }: PhonePairProps) {
  // Both devices read the same size regardless of how each shot is angled.
  const deviceWidth = 0.47;
  const backWidth = `${(100 * deviceWidth) / (back.deviceRatio ?? 1)}%`;
  const frontWidth = `${(100 * deviceWidth) / (front.deviceRatio ?? 1)}%`;
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth, margin: '0 auto' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute', width: '116%', aspectRatio: '1 / 1', borderRadius: '50%',
          background: blobBackground(tone),
          transform: 'translate(-4%, 3%)',
          pointerEvents: 'none',
        }}
      />
      <Image
        src={back.src} alt={back.alt} width={back.width} height={back.height}
        sizes="(max-width: 900px) 42vw, 230px"
        style={{ position: 'relative', width: backWidth, height: 'auto', transform: `translateX(22%) rotate(${back.rotate ?? 2}deg)`, filter: dropShadow(tone) }}
      />
      <Image
        src={front.src} alt={front.alt} width={front.width} height={front.height}
        sizes="(max-width: 900px) 42vw, 230px"
        style={{ position: 'relative', width: frontWidth, height: 'auto', marginLeft: '-22%', transform: `translateY(4%) rotate(${front.rotate ?? -2}deg)`, filter: dropShadow(tone), zIndex: 1 }}
      />
    </div>
  );
}
