import { Anton, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import LoadingScreen from '@/components/LoadingScreen';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://cooljeff.com'),
  title: {
    default: 'CoolJeff — Emotion Through Sound',
    template: '%s · CoolJeff',
  },
  description:
    'Official site of CoolJeff — independent rap artist. Stream new music, request features, and follow upcoming shows.',
  keywords: [
    'CoolJeff', 'cool jeff', 'rap artist', 'independent artist', 'hip hop',
    'new rap music', 'underground rap', 'feature request', 'music booking',
  ],
  openGraph: {
    title: 'CoolJeff — Emotion Through Sound',
    description:
      'Independent rap artist. New music, live shows, and feature bookings.',
    url: 'https://cooljeff.com',
    siteName: 'CoolJeff',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoolJeff — Emotion Through Sound',
    description:
      'Independent rap artist. New music, live shows, and feature bookings.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#050203',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body className="vignette">
        <LoadingScreen />
        <div className="cinema-backdrop" />
        <AmbientBackground />
        <div className="noise-overlay" />
        <div className="grain-overlay" />

        <div className="relative z-10">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
