'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(total > 0 ? (current / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] bg-blood-bright/15 z-[60]"
    >
      <div
        className="h-full bg-blood-bright transition-[width] duration-150 ease-out"
        style={{
          width: progress + '%',
          boxShadow: '0 0 10px rgba(255,31,58,0.6)',
        }}
      />
    </div>
  );
}
