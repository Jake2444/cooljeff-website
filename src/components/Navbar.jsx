'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

const links = [
  { href: '/',         label: 'Home',    index: '01' },
  { href: '/music',    label: 'Music',   index: '02' },
  { href: '/about',    label: 'About',   index: '03' },
  { href: '/booking',  label: 'Booking', index: '04' },
  { href: '/shows',    label: 'Shows',   index: '05' },
  { href: '/contact',  label: 'Contact', index: '06' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Body scroll lock + Escape key when mobile menu open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-md bg-ink-1000/75 border-b border-blood-700/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="CoolJeff home">
          <span className="relative inline-block h-3 w-3">
            <span className="absolute inset-0 rounded-full bg-blood-500 animate-pulse-red" />
            <span className="absolute inset-0 rounded-full bg-blood-500" />
          </span>
          <span className="text-display text-2xl tracking-wider group-hover:text-glow transition-all">
            CoolJeff
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map(({ href, label, index }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`group relative inline-flex items-baseline gap-2 text-sm uppercase tracking-[0.22em] transition-colors ${
                    active ? 'text-blood-400' : 'text-bone-200 hover:text-bone-50'
                  }`}
                >
                  <span className="text-mono text-[10px] text-blood-500/80">{index}</span>
                  <span>{label}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-blood-500 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/booking"
          className="hidden lg:inline-flex btn-glow"
        >
          Book a Feature
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-bone-50 hover:text-blood-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <HiX className="h-7 w-7" /> : <HiMenuAlt4 className="h-7 w-7" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden border-t border-blood-700/30 bg-ink-1000/95 backdrop-blur-md"
          >
            <ul className="px-6 py-6 flex flex-col gap-5">
              {links.map(({ href, label, index }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-baseline gap-3 text-2xl text-display tracking-wider transition-colors ${
                        active ? 'text-blood-400' : 'text-bone-50 hover:text-blood-400'
                      }`}
                    >
                      <span className="text-mono text-xs text-blood-500/70">{index}</span>
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-3">
                <Link href="/booking" className="btn-glow w-full justify-center">
                  Book a Feature
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
