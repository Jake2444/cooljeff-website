'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaSpotify, FaYoutube, FaApple, FaInstagram, FaTiktok } from 'react-icons/fa';
import { socials } from '@/lib/songs';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');

    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;
    if (!endpoint) {
      // No endpoint configured — simulate success so the UI demo still works.
      setTimeout(() => {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 4000);
      }, 600);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Subscription failed');
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const iconLink =
    'group flex h-11 w-11 items-center justify-center rounded-full border border-blood-700/40 bg-ink-950/50 text-bone-200 transition-all hover:border-blood-400 hover:text-blood-400 hover:shadow-glow-sm';

  return (
    <footer className="relative mt-32 border-t border-blood-700/20 bg-ink-1000/60">
      <div className="absolute inset-0 bg-radial-blood opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10 py-16">
        {/* Top: brand + newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 pb-12 border-b border-blood-700/20">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative inline-block h-3 w-3">
                <span className="absolute inset-0 rounded-full bg-blood-500 animate-pulse-red" />
                <span className="absolute inset-0 rounded-full bg-blood-500" />
              </span>
              <span className="text-display text-4xl tracking-wider">CoolJeff</span>
            </Link>
            <p className="mt-4 text-bone-400 max-w-md leading-relaxed">
              Independent rap artist crafting real music from real moments.
              New singles, live shows, and feature collaborations — all in one place.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <span className="section-tag">Stay in the loop</span>
            <h3 className="text-display text-3xl mt-3 mb-4">Join the mailing list</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="field flex-1"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-glow disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending…' :
                 status === 'success' ? 'Subscribed ✓' :
                 status === 'error'   ? 'Try again'    : 'Subscribe'}
              </button>
            </form>
            {status === 'success' && (
              <p className="mt-3 text-sm text-blood-400">
                You're in. New drops hit your inbox first.
              </p>
            )}
          </div>
        </div>

        {/* Middle: links + socials */}
        <div className="grid md:grid-cols-3 gap-10 py-12">
          <div>
            <h4 className="text-mono text-xs tracking-[0.32em] text-bone-400 uppercase mb-4">Explore</h4>
            <ul className="space-y-2 text-bone-200">
              <li><Link href="/" className="link-underline">Home</Link></li>
              <li><Link href="/music" className="link-underline">Music</Link></li>
              <li><Link href="/about" className="link-underline">About</Link></li>
              <li><Link href="/booking" className="link-underline">Book a Feature</Link></li>
              <li><Link href="/shows" className="link-underline">Live Shows</Link></li>
              <li><Link href="/contact" className="link-underline">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-mono text-xs tracking-[0.32em] text-bone-400 uppercase mb-4">Stream</h4>
            <ul className="space-y-2 text-bone-200">
              <li><a href={socials.spotify}     target="_blank" rel="noopener" className="link-underline">Spotify</a></li>
              <li><a href={socials.appleMusic} target="_blank" rel="noopener" className="link-underline">Apple Music</a></li>
              <li><a href={socials.youtube}    target="_blank" rel="noopener" className="link-underline">YouTube</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-mono text-xs tracking-[0.32em] text-bone-400 uppercase mb-4">Follow</h4>
            <div className="flex flex-wrap gap-3">
              <a href={socials.spotify}    target="_blank" rel="noopener" aria-label="Spotify"     className={iconLink}><FaSpotify className="h-5 w-5" /></a>
              <a href={socials.appleMusic} target="_blank" rel="noopener" aria-label="Apple Music" className={iconLink}><FaApple   className="h-5 w-5" /></a>
              <a href={socials.youtube}    target="_blank" rel="noopener" aria-label="YouTube"     className={iconLink}><FaYoutube className="h-5 w-5" /></a>
              <a href={socials.instagram}  target="_blank" rel="noopener" aria-label="Instagram"   className={iconLink}><FaInstagram className="h-5 w-5" /></a>
              <a href={socials.tiktok}     target="_blank" rel="noopener" aria-label="TikTok"      className={iconLink}><FaTiktok  className="h-5 w-5" /></a>
            </div>
            <p className="mt-4 text-xs text-bone-600">
              Instagram & TikTok handles coming soon — link them in <code className="text-blood-400">src/lib/songs.js</code>.
            </p>
          </div>
        </div>

        {/* Bottom: copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-blood-700/20 text-bone-600 text-sm">
          <p>© {new Date().getFullYear()} CoolJeff. All rights reserved.</p>
          <p className="text-mono text-xs tracking-[0.28em] uppercase">
            Emotion · Through · Sound
          </p>
        </div>
      </div>
    </footer>
  );
}
