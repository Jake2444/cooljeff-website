'use client';

import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';

export default function MusicCard({ song, index }) {
  const trackNumber = String(index + 1).padStart(2, '0');
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      className="card-dark group p-5 md:p-6"
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-mono text-[10px] tracking-[0.32em] text-blood-400 uppercase">
            Track {trackNumber}
          </span>
          <h3 className="text-display text-2xl md:text-3xl mt-1 group-hover:text-glow transition-all">
            {song.title}
          </h3>
        </div>
        <span className="chip">{song.tag}</span>
      </div>

      {/* Spotify embed */}
      <div className="relative overflow-hidden rounded">
        <iframe
          src={`https://open.spotify.com/embed/track/${song.id}?utm_source=cooljeff_site&theme=0`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`${song.title} – Spotify player`}
        />
      </div>

      {/* Action row */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-end gap-[2px] h-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="eq-bar"
              style={{ animationDelay: `${i * 0.07}s`, animationDuration: `${0.9 + (i % 4) * 0.1}s` }}
            />
          ))}
        </div>
        <a
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-bone-200 hover:text-blood-400 transition link-underline"
        >
          <FaSpotify className="h-4 w-4" />
          Open in Spotify
        </a>
      </div>
    </motion.div>
  );
}
