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
  maxWidth?: number;
  priority?: boolean;
  tone?: 'dark' | 'light';
  blob?: boolean;
  blobX?: number;
  blobY?: number;
  blobScale?: number;
}

export function PhoneShot({
  src, alt, width, height, maxWidth = 360, priority = false,
  tone = 'light', blob = true, blobX = 0, blobY = 4, blobScale = 1.32,
}: PhoneShotProps) {
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
        style={{ position: 'relative', width: '100%', height: 'auto', maxWidth, display: 'block', filter: dropShadow(tone) }}
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

interface PhonePairProps {
  back: { src: string; alt: string; width: number; height: number };
  front: { src: string; alt: string; width: number; height: number };
  tone?: 'dark' | 'light';
  maxWidth?: number;
}

/** PhonePair — two cut-out phones overlapping on one blob, for the light/dark story. */
export function PhonePair({ back, front, tone = 'light', maxWidth = 520 }: PhonePairProps) {
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
        style={{ position: 'relative', width: '52%', height: 'auto', transform: 'translateX(22%) rotate(2deg)', filter: dropShadow(tone) }}
      />
      <Image
        src={front.src} alt={front.alt} width={front.width} height={front.height}
        sizes="(max-width: 900px) 42vw, 230px"
        style={{ position: 'relative', width: '54%', height: 'auto', marginLeft: '-26%', transform: 'translateY(6%) rotate(-2deg)', filter: dropShadow(tone), zIndex: 1 }}
      />
    </div>
  );
}
