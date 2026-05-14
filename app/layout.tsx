import type { Metadata } from 'next';
import { DM_Sans, Sora } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
const sora = Sora({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  metadataBase: new URL('https://mashrikaprojects.com'),
  title: 'Mashrika Projects | Industrial Engineering & Turnkey Solutions',
  description:
    'Mashrika Projects delivers industrial HVAC, piping, automation, electrical infrastructure, and turnkey engineering services for pharma, manufacturing, data centers, and commercial facilities.',
  keywords: [
    'Mashrika Projects',
    'industrial HVAC',
    'industrial automation',
    'turnkey engineering',
    'industrial piping',
    'electrical infrastructure'
  ],
  openGraph: {
    title: 'Mashrika Projects | Engineering Industrial Excellence',
    description:
      '20+ years of industrial engineering expertise in HVAC, automation, piping, and electrical turnkey execution.',
    type: 'website',
    images: ['/og-industrial.svg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mashrika Projects | Industrial Engineering',
    description: 'Turnkey HVAC, electrical, automation, and industrial execution services.',
    images: ['/og-industrial.svg']
  },
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${sora.variable} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
