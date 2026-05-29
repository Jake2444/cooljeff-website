'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { FaPlayCircle } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 md:px-10 pt-24 pb-16 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 60%, rgba(200,16,46,0.18) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="chip">
            <span className="inline-block w-2 h-2 rounded-full bg-blood-bright animate-pulse" />
            Independent · Rap · Est. 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 1, 0.34, 1] }}
          className="text-display wordmark-stroke text-7xl md:text-9xl lg:text-[10rem] leading-[0.85] mb-6"
        >
          CoolJeff
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-bone-300 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Independent rap artist.{' '}
          <span className="text-blood-400">Started 2025.</span>
          {' '}Building something real, track by track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/music" className="btn-glow">
            <FaPlayCircle className="h-4 w-4" /> Listen Now
          </Link>
          <Link href="/booking" className="btn-glow btn-ghost">
            Book a Feature <HiArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/#newsletter" className="btn-glow btn-ghost">
            Join VIP Access
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <span className="text-mono text-[10px] tracking-[0.4em] text-bone-500 uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-blood-bright/80 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
