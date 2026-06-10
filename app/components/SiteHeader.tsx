'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/assets/Jamerator.png';
import { Button } from './ds/Button';
import { Icon } from './ds/Icon';

const TRY_URL = 'https://jamerator-app.vercel.app/';

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 36, height: 72 }}>
        <Link href="/" style={{ display: 'flex' }} onClick={close}>
          <Image src={logo} alt="Jamerator" style={{ height: 26, width: 'auto', display: 'block' }} />
        </Link>
        <nav className="desktop-nav">
          <a className="nav-link" href="/#features">Features</a>
          <a className="nav-link" href="/#jam-together">Jam Together</a>
          <Link className="nav-link" href="/contact">Contact</Link>
        </nav>
        <div className="header-cta" style={{ marginLeft: 'auto', flex: 'none' }}>
          <Button variant="primary" size="sm" href={TRY_URL} style={{ whiteSpace: 'nowrap' }}>Try Jamerator</Button>
        </div>
        <button className="menu-toggle" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          <Icon name={open ? 'x' : 'menu'} size={26} color="var(--white)" />
        </button>
      </div>
      <div className={open ? 'mobile-menu open' : 'mobile-menu'}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', padding: '4px 32px 22px' }}>
          <a className="nav-link" href="/#features" onClick={close}>Features</a>
          <a className="nav-link" href="/#jam-together" onClick={close}>Jam Together</a>
          <Link className="nav-link" href="/contact" onClick={close}>Contact</Link>
          <div style={{ marginTop: 18 }}>
            <Button variant="primary" size="md" fullWidth href={TRY_URL} onClick={close}>Try Jamerator</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
