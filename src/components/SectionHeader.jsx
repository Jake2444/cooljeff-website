'use client';

import { motion } from 'framer-motion';

export default function SectionHeader({ tag, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`flex flex-col gap-4 mb-12 ${alignment}`}
    >
      {tag && <span className="section-tag">{tag}</span>}
      <h2 className="text-display text-5xl md:text-7xl tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-bone-400 max-w-2xl leading-relaxed text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
