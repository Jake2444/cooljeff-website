'use client';

import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        type: 'spring',
        stiffness: 110,
        damping: 13,
        mass: 0.9,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
