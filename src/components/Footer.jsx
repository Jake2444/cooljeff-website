'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaSpotify, FaYoutube, FaApple, FaInstagram, FaTiktok } from 'react-icons/fa';
import { socials } from '@/lib/songs';
import VIPModal from './VIPModal';

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const iconLink =
    'group flex h-11 w-11 items-center justify-center rounded-full border border-blood-700/40 bg-ink-950/50 text-bone-200 transition-all hover:border-blood-400 hover:text-blood-400 hover:shadow-glow-sm';

  return (
    <>
      <footer className="relative mt-32 border-t border-blood-700/20 bg-ink-1000/60">
        <div className="absolute inset-0 bg-radial-blood opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-10 py-16">
          {/* Top: brand + VIP early access CTA */}
          <div id="newsletter" className="grid lg:grid-cols-2 gap-12 pb-12 border-b border-blood-700/20">
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

            {/* VIP Early Access */}
            <div>
              <span className="section-tag">VIP Access</span>
              <h3 className="text-display text-3xl mt-3 mb-3">Get Early Access</h3>
              <p className="text-bone-400 mb-6 leading-relaxed max-w-md">
                Join the inner circle — be first for tour tickets, new music drops, and behind-the-scenes content.
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="btn-glow"
              >
                Join VIP List
              </button>
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
                <li><a href={socials.spotify}    target="_blank" rel="noopener noreferrer" className="link-underline">Spotify</a></li>
                <li><a href={socials.appleMusic} target="_blank" rel="noopener noreferrer" className="link-underline">Apple Music</a></li>
                <li><a href={socials.youtube}    target="_blank" rel="noopener noreferrer" className="link-underline">YouTube</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-mono text-xs tracking-[0.32em] text-bone-400 uppercase mb-4">Follow</h4>
              <div className="flex flex-wrap gap-3">
                <a href={socials.spotify}    target="_blank" rel="noopener noreferrer" aria-label="Spotify"     className={iconLink}><FaSpotify className="h-5 w-5" /></a>
                <a href={socials.appleMusic} target="_blank" rel="noopener noreferrer" aria-label="Apple Music" className={iconLink}><FaApple   className="h-5 w-5" /></a>
                <a href={socials.youtube}    target="_blank" rel="noopener noreferrer" aria-label="YouTube"     className={iconLink}><FaYoutube className="h-5 w-5" /></a>
                <a href={socials.instagram}  target="_blank" rel="noopener noreferrer" aria-label="Instagram"   className={iconLink}><FaInstagram className="h-5 w-5" /></a>
                <a href={socials.tiktok}     target="_blank" rel="noopener noreferrer" aria-label="TikTok"      className={iconLink}><FaTiktok  className="h-5 w-5" /></a>
              </div>
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

      {/* VIP Modal */}
      <VIPModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
