'use client';

import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.21, 1, 0.34, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
