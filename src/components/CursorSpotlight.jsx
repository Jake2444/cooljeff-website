'use client';

import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const elRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const el = elRef.current;
    if (!el) return;

    let targetX = -400;
    let targetY = -400;
    let currentX = -400;
    let currentY = -400;
    let rafId;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = '1';
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      el.style.background =
        'radial-gradient(500px circle at ' + currentX + 'px ' + currentY +
        'px, rgba(255,31,58,0.10), transparent 50%)';
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[2] transition-opacity duration-300"
      style={{ opacity: 0 }}
    />
  );
}
