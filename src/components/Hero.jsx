'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import { FaPlay } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 md:px-10 pt-24 pb-16">
      {/* Decorative red glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-blood-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-blood-500/20 blur-[120px]" />

      {/* Cross hair grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]"
           style={{
             backgroundImage:
               'linear-gradient(rgba(255,31,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,31,58,0.5) 1px, transparent 1px)',
             backgroundSize: '64px 64px',
           }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        {/* Top corner meta */}
        <div className="flex items-center justify-between mb-12 md:mb-20 text-mono text-[10px] tracking-[0.32em] text-bone-400 uppercase">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-blood-500 animate-pulse" />
            Independent · Est. 2024
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden md:inline"
          >
            Vol. 01 — Latest Drop
          </motion.span>
        </div>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
          className="relative"
        >
          <h1 className="text-display wordmark-stroke text-[19vw] md:text-[14vw] lg:text-[13rem] leading-[0.85] tracking-tight">
            CoolJeff
          </h1>
          {/* Mirror reflection effect */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-full pointer-events-none opacity-20 scale-y-[-1] mask-fade"
            style={{
              maskImage: 'linear-gradient(180deg, transparent, black)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent, black)',
            }}
          >
            <span className="text-display wordmark-stroke text-[19vw] md:text-[14vw] lg:text-[13rem] leading-[0.85] tracking-tight block">
              CoolJeff
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mt-10 md:mt-14 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-12 bg-blood-500" />
            <span className="text-mono text-xs tracking-[0.32em] text-blood-400 uppercase">
              Emotion · Through · Sound
            </span>
          </div>
          <p className="text-bone-200 text-xl md:text-2xl leading-snug font-light">
            Independent artist creating real music. <br className="hidden sm:block" />
            <span className="text-bone-400">Stories pressed into 808s, nights pressed into hooks.</span>
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="/music" className="btn-glow">
            <FaPlay className="h-3 w-3" /> Listen Now
          </Link>
          <Link href="/booking" className="btn-glow btn-ghost">
            Book a Feature
          </Link>
          <Link href="/contact" className="btn-glow btn-ghost">
            Contact
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#music-preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-2 text-bone-400 hover:text-blood-400 transition"
        >
          <span className="text-mono text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <HiArrowDown className="h-5 w-5 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
