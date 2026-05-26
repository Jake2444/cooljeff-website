'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-1000"
          aria-hidden="true"
        >
          {/* Radial pulse */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            className="absolute h-40 w-40 rounded-full border border-blood-500/40"
          />
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            className="absolute h-40 w-40 rounded-full border border-blood-500/60"
          />

          {/* Logo lockup */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="text-display wordmark-stroke text-6xl md:text-7xl">CoolJeff</div>
            <div className="mt-3 text-mono text-[10px] tracking-[0.5em] text-blood-400 animate-flicker">
              EMOTION · THROUGH · SOUND
            </div>

            {/* waveform bars */}
            <div className="mt-6 flex items-end h-8 gap-[3px]">
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  className="eq-bar"
                  style={{
                    height: '100%',
                    animationDelay: `${(i % 7) * 0.08}s`,
                    animationDuration: `${0.9 + (i % 5) * 0.12}s`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
