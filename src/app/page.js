import Link from 'next/link';
import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import MusicCard from '@/components/MusicCard';
import { songs, socials } from '@/lib/songs';

export default function HomePage() {
  const preview = songs.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Streaming ticker */}
      <section className="border-y border-blood-700/20 bg-ink-1000/40 py-5 overflow-hidden">
        <div className="marquee">
          <div className="marquee-track text-display text-3xl text-bone-200/80">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center gap-12">
                <span>NEW SINGLE OUT NOW</span><span className="text-blood-500">★</span>
                <span>STREAM ON ALL PLATFORMS</span><span className="text-blood-500">★</span>
                <span>FEATURES OPEN</span><span className="text-blood-500">★</span>
                <span>INDEPENDENT ARTIST</span><span className="text-blood-500">★</span>
                <span>EMOTION THROUGH SOUND</span><span className="text-blood-500">★</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music preview */}
      <section id="music-preview" className="relative py-24 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeader
              tag="The Catalog"
              title="Latest Drops"
              subtitle="The newest tracks from CoolJeff — emotional, raw, and built for late nights."
            />
            <Link href="/music" className="inline-flex items-center gap-2 text-blood-400 hover:text-blood-200 transition link-underline">
              View all 5 tracks <HiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preview.map((song, i) => (
              <MusicCard key={song.id} song={song} index={i} />
            ))}
          </div>

          {/* Streaming platforms */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <a href={socials.spotify}    target="_blank" rel="noopener" className="btn-glow"><FaSpotify className="h-4 w-4" /> Spotify</a>
            <a href={socials.appleMusic} target="_blank" rel="noopener" className="btn-glow"><FaApple   className="h-4 w-4" /> Apple Music</a>
            <a href={socials.youtube}    target="_blank" rel="noopener" className="btn-glow"><FaYoutube className="h-4 w-4" /> YouTube</a>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="relative py-24 md:py-32 px-5 md:px-10 border-t border-blood-700/20">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="section-tag">The Artist</span>
            <h2 className="text-display text-5xl md:text-7xl mt-4 mb-6">
              Real life. <br /><span className="wordmark-stroke">Real sound.</span>
            </h2>
            <p className="text-bone-300 text-lg leading-relaxed mb-4 max-w-2xl">
              CoolJeff is an independent rap artist building a sound from the
              ground up — every verse a journal page, every beat a moment caught
              in motion.
            </p>
            <p className="text-bone-400 leading-relaxed mb-8 max-w-2xl">
              From melodic introspection to high-energy anthems, the catalog
              moves through different waves without losing the thread:
              honest stories, sharpened with consistency.
            </p>
            <Link href="/about" className="btn-glow btn-ghost">
              Read full bio <HiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Decorative stat block */}
          <div className="lg:col-span-5">
            <div className="card-dark p-8 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-blood-600/30 blur-3xl" />
              <div className="space-y-6 relative">
                <div className="flex items-baseline justify-between border-b border-blood-700/20 pb-4">
                  <span className="text-mono text-xs tracking-[0.28em] text-bone-400 uppercase">Status</span>
                  <span className="text-bone-50">Independent</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-blood-700/20 pb-4">
                  <span className="text-mono text-xs tracking-[0.28em] text-bone-400 uppercase">Genre</span>
                  <span className="text-bone-50">Rap · Hip-Hop · Melodic</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-blood-700/20 pb-4">
                  <span className="text-mono text-xs tracking-[0.28em] text-bone-400 uppercase">Singles</span>
                  <span className="text-bone-50">{songs.length}+</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-mono text-xs tracking-[0.28em] text-bone-400 uppercase">Features</span>
                  <span className="text-blood-400">Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="relative py-24 md:py-32 px-5 md:px-10 border-t border-blood-700/20 overflow-hidden">
        <div className="absolute inset-0 bg-radial-blood opacity-50" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="section-tag justify-center">Collab</span>
          <h2 className="text-display text-5xl md:text-7xl mt-4 mb-6">
            Want a verse from <span className="text-glow">CoolJeff</span>?
          </h2>
          <p className="text-bone-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Submit your track, budget, and timeline. Every request is reviewed
            personally — quality control over quantity.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/booking" className="btn-glow">Book a Feature <HiArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="btn-glow btn-ghost">General Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
