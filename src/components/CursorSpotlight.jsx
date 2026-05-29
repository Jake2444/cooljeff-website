'use client';

import { useEffect, useState } from 'react';

export default function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip on touch devices (no cursor)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[2] transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
        background: radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255,31,58,0.10), transparent 50%),
      }}
    />
  );
}
