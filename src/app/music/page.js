import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';
import SectionHeader from '@/components/SectionHeader';
import MusicCard from '@/components/MusicCard';
import { songs, socials } from '@/lib/songs';

export const metadata = {
  title: 'Music',
  description: 'Stream the latest singles from CoolJeff — independent rap artist.',
};

export default function MusicPage() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 px-5 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          tag="Discography"
          title="The Music"
          subtitle="Five singles. Five moods. Press play and let the catalog speak."
        />

        {/* Streaming platform buttons — top */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <span className="text-mono text-xs tracking-[0.28em] text-bone-400 uppercase mr-2">Stream on</span>
          <a href={socials.spotify}    target="_blank" rel="noopener" className="btn-glow"><FaSpotify className="h-4 w-4" /> Spotify</a>
          <a href={socials.appleMusic} target="_blank" rel="noopener" className="btn-glow btn-ghost"><FaApple   className="h-4 w-4" /> Apple Music</a>
          <a href={socials.youtube}    target="_blank" rel="noopener" className="btn-glow btn-ghost"><FaYoutube className="h-4 w-4" /> YouTube</a>
        </div>

        {/* Featured track — first song as full-width hero card */}
        <div className="mb-10">
          <div className="card-dark p-6 md:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blood-600/25 blur-3xl" />
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="chip mb-4 inline-flex">{songs[0].tag}</span>
                <h3 className="text-display text-5xl md:text-6xl mb-3 text-glow">{songs[0].title}</h3>
                <p className="text-bone-400 leading-relaxed mb-5">
                  The newest single from CoolJeff — out everywhere now.
                </p>
                <a href={songs[0].spotifyUrl} target="_blank" rel="noopener" className="btn-glow">
                  <FaSpotify className="h-4 w-4" /> Play on Spotify
                </a>
              </div>
              <div className="lg:col-span-7">
                <iframe
                  src={`https://open.spotify.com/embed/track/${songs[0].id}?utm_source=cooljeff_site&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded"
                  title={`${songs[0].title} – Spotify player`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Other 4 tracks in grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {songs.slice(1).map((song, i) => (
            <MusicCard key={song.id} song={song} index={i + 1} />
          ))}
        </div>

        {/* Footer-style platform row */}
        <div className="mt-20 border-t border-blood-700/20 pt-10 text-center">
          <span className="section-tag justify-center">Follow the sound</span>
          <h3 className="text-display text-4xl md:text-5xl mt-3 mb-6">Stream Everywhere</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={socials.spotify}    target="_blank" rel="noopener" className="btn-glow"><FaSpotify className="h-4 w-4" /> Spotify</a>
            <a href={socials.appleMusic} target="_blank" rel="noopener" className="btn-glow"><FaApple   className="h-4 w-4" /> Apple Music</a>
            <a href={socials.youtube}    target="_blank" rel="noopener" className="btn-glow"><FaYoutube className="h-4 w-4" /> YouTube</a>
          </div>
        </div>
      </div>
    </section>
  );
}
