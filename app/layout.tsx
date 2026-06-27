import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "./components/SiteHeader";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Jamerator — Guitar Chord Progression Generator",
  description: "Guitar chord progression generator for song charts and scales — jam alone or together with friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${nunitoSans.variable} antialiased`}>
    <SiteHeader />
    {children}
    <footer style={{ background: 'var(--light-bg)', borderTop: '1px solid var(--light-hairline)', padding: '56px 0 64px', textAlign: 'center' }}>
      <p style={{ margin: 0, color: 'var(--light-ink-2)', fontWeight: 600, fontSize: 14 }}>© 2026 Sauce Collective, LLC. All rights reserved.</p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 22, marginTop: 16 }}>
        <Link className="footer-link" href="/contact">Contact</Link>
        <Link className="footer-link" href="/privacy-policy">Privacy Policy</Link>
        <Link className="footer-link" href="/terms-and-conditions">Terms &amp; Conditions</Link>
      </div>
    </footer>
    <Analytics />
    </body>
    </html>
  );
}
