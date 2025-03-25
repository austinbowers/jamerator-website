import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import logo from "@/public/assets/Jamerator.png";
import Link from "next/link";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Jamerator",
  description: "Ai Chord Progression Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
        className={`${nunitoSans.variable} antialiased`}
    >
    <header>
        <div className="bg-[#08120C] flex items-center p-6">
            <div className="w-24 lg:w-32 mr-16">
                <Image src={logo} alt="Logo"/>
            </div>
            <div className="flex items-center gap-8">
                <Link className="text-gray-300 hover:text-green-300 font-medium" href="/">Home</Link>
                <Link href="/contact" className="text-gray-300 hover:text-green-300 font-medium">Contact</Link>
            </div>
        </div>
    </header>
    {children}
    <footer>
        <div className="bg-[#08120C] text-[#30493B] flex justify-center items-center py-16">
            <p className="text-center">© 2025 Austin Bowers. All rights reserved.</p>
        </div>
    </footer>
    </body>
    </html>
  );
}
