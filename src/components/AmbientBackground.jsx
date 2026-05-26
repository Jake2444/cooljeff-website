'use client';

import { useEffect, useState } from 'react';

/**
 * AmbientBackground renders:
 *  - thin red rain streaks falling across the viewport
 *  - floating ember dots that drift upward
 *
 * Numbers are randomised on the client only (after mount) to avoid
 * hydration mismatch with the server-rendered HTML.
 */
export default function AmbientBackground() {
  const [drops, setDrops] = useState([]);
  const [embers, setEmbers] = useState([]);

  useEffect(() => {
    const dropCount = 50;
    const emberCount = 18;

    const newDrops = Array.from({ length: dropCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 0.8 + Math.random() * 1.6,
      height: 40 + Math.random() * 80,
      opacity: 0.15 + Math.random() * 0.4,
    }));
    const newEmbers = Array.from({ length: emberCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 8,
      size: 2 + Math.random() * 3,
    }));

    setDrops(newDrops);
    setEmbers(newEmbers);
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Rain layer */}
      {drops.map((d) => (
        <span
          key={`d-${d.id}`}
          className="rain-drop"
          style={{
            left: `${d.left}%`,
            height: `${d.height}px`,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}

      {/* Floating embers */}
      {embers.map((e) => (
        <span
          key={`e-${e.id}`}
          className="ember"
          style={{
            left: `${e.left}%`,
            top: `${e.top}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            animation: `floatEmber ${e.duration}s ease-in-out ${e.delay}s infinite`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes floatEmber {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          25%      { transform: translate(8px, -20px) scale(1.2); opacity: 0.9; }
          50%      { transform: translate(-6px, -40px) scale(0.9); opacity: 0.6; }
          75%      { transform: translate(10px, -60px) scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
