'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    let ticking = false;
    let rafId;

    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const progress = total > 0 ? (current / total) * 100 : 0;
      el.style.width = progress + '%';
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] bg-blood-bright/15 z-[60]"
    >
      <div
        ref={barRef}
        className="h-full bg-blood-bright"
        style={{
          width: '0%',
          boxShadow: '0 0 10px rgba(255,31,58,0.6)',
        }}
      />
    </div>
  );
}
