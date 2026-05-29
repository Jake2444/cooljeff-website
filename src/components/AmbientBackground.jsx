'use client';

import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const cores = navigator.hardwareConcurrency || 4;
    const isLowPower = cores < 4;
    const dropCount = isMobile ? 60 : (isLowPower ? 110 : 180);
    const emberCount = isMobile ? 6 : 14;

    let width = canvas.width = window.innerWidth * window.devicePixelRatio;
    let height = canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let w = window.innerWidth;
    let h = window.innerHeight;

    const drops = [];
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * w,
        y: Math.random() * h,
        len: 10 + Math.random() * 20,
        speed: 7 + Math.random() * 9,
        opacity: 0.12 + Math.random() * 0.4,
        wind: -0.3 + Math.random() * 1.4,
      });
    }

    const embers = [];
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 1 + Math.random() * 2.5,
        speed: 0.25 + Math.random() * 0.6,
        opacity: 0.35 + Math.random() * 0.5,
        drift: -0.25 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let rafId;
    let lastTime = 0;
    const targetFps = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFps;

    const animate = (time) => {
      rafId = requestAnimationFrame(animate);
      const delta = time - lastTime;
      if (delta < frameInterval) return;
      lastTime = time - (delta % frameInterval);

      ctx.clearRect(0, 0, w, h);

      ctx.lineCap = 'round';
      ctx.lineWidth = 1;
      for (const d of drops) {
        ctx.strokeStyle = 'rgba(255, 31, 58, ' + d.opacity + ')';
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.wind * 0.7, d.y + d.len);
        ctx.stroke();
        d.y += d.speed;
        d.x += d.wind * 0.3;
        if (d.y > h) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }
      }

      for (const e of embers) {
        e.phase += 0.02;
        const flicker = 0.6 + Math.sin(e.phase) * 0.4;
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 4);
        grad.addColorStop(0, 'rgba(255, 77, 99, ' + (e.opacity * flicker) + ')');
        grad.addColorStop(1, 'rgba(255, 77, 99, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 4, 0, Math.PI * 2);
        ctx.fill();
        e.y -= e.speed;
        e.x += e.drift;
        if (e.y < -10) {
          e.y = h + 10;
          e.x = Math.random() * w;
        }
        if (e.x < -10 || e.x > w + 10) {
          e.x = Math.random() * w;
        }
      }
    };

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', onResize);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
