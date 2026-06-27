import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/assets/Jamerator-dark.png';
import { AppStoreBadge } from './AppStoreBadge';

const TRY_URL = 'https://apps.apple.com/us/app/jamerator/id6743706466';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <div className="nav-pill">
          <Link href="/" style={{ display: 'flex', flex: 'none' }}>
            <Image src={logo} alt="Jamerator" style={{ height: 24, width: 'auto', display: 'block' }} />
          </Link>
          <div style={{ marginLeft: 'auto', flex: 'none' }}>
            <AppStoreBadge href={TRY_URL} height={42} />
          </div>
        </div>
      </div>
    </header>
  );
}
