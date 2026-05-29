'use client';

import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) {
  const offsets = {
    up:    { y: 40, x: 0 },
    down:  { y: -40, x: 0 },
    left:  { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  const initial = { opacity: 0, ...offsets[direction] };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 1, 0.34, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
