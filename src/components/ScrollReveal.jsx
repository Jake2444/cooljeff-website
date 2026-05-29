'use client';

import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 16,
        mass: 0.8,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
