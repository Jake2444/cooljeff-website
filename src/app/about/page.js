import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import { HiArrowRight } from 'react-icons/hi';

export const metadata = {
  title: 'About',
  description:
    'Get to know CoolJeff — an independent rap artist building a catalog rooted in real emotion, sharp lyricism, and consistent originality.',
};

export default function AboutPage() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 px-5 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="The Story"
          title="Who Is CoolJeff?"
          subtitle="An independent artist writing music that doesn't flinch."
        />

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Bio column */}
          <article className="lg:col-span-8 space-y-6 text-bone-200 text-lg leading-[1.8]">
            <p className="text-2xl md:text-3xl text-bone-50 font-light leading-snug">
              CoolJeff makes music the way most people only write in their notes app
              at 3 a.m. — <span className="text-blood-400">unfiltered, immediate, and real</span>.
            </p>

            <p>
              Born out of late nights, loud thoughts, and a need to translate
              emotion into something more permanent, CoolJeff is an independent
              rap artist who treats every track like a chapter. There's no label
              handing down a roadmap — only instinct, discipline, and the
              decision to keep showing up to the booth.
            </p>

            <p>
              The catalog moves through different waves. One song might lean
              into melodic introspection — the kind of record you put on alone in
              the car, headlights cutting through rain — while the next flips
              into raw, high-energy bars meant to be played loud. That range
              isn't accidental. CoolJeff writes whatever the moment is asking
              for, because pretending otherwise would betray the entire point.
            </p>

            <p>
              The themes are honest: growth, loss, late-night clarity, the cost
              of staying focused, the small victories that don't make the
              highlight reel. Real experiences pressed into 808s. Real emotions
              pressed into hooks. Listeners don't have to read between the lines
              because the lines <em>are</em> the truth.
            </p>

            <p>
              The fanbase is growing the right way — one play, one share, one
              real listener at a time. No shortcuts. No trends chased for the
              sake of trends. Just <span className="text-blood-400">consistency over hype</span>{' '}
              and originality over imitation.
            </p>

            <p className="text-xl text-bone-50 font-light italic border-l-2 border-blood-500 pl-6">
              "Every drop is a step. The goal isn't to go viral —
              it's to leave something that still hits ten years from now."
            </p>

            <p>
              The mission moving forward stays simple: keep releasing, keep
              refining, keep building. New singles, new collaborations,
              and eventually a body of work that maps where the journey
              started — and how far it goes.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/music" className="btn-glow">
                Hear the Catalog <HiArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/booking" className="btn-glow btn-ghost">
                Work With CoolJeff
              </Link>
            </div>
          </article>

          {/* Side panel — facts */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="card-dark p-6">
              <span className="section-tag">Fast Facts</span>
              <ul className="mt-5 space-y-4">
                {[
                  ['Identity',  'Independent'],
                  ['Sound',     'Rap · Hip-Hop · Melodic'],
                  ['Energy',    'Cinematic · Emotional · Raw'],
                  ['Released',  '5+ singles'],
                  ['Features',  'Open for collabs'],
                  ['Live',      'Shows TBA'],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-baseline justify-between border-b border-blood-700/20 pb-3 last:border-0">
                    <span className="text-mono text-[11px] tracking-[0.28em] text-bone-400 uppercase">{k}</span>
                    <span className="text-bone-50 text-right">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-dark p-6">
              <span className="section-tag">Influences in Spirit</span>
              <p className="mt-4 text-bone-300 leading-relaxed text-sm">
                Storytellers who put feeling first and craft second-nature.
                Underground architects, late-night confessors, and anyone who
                ever made a song that felt bigger than its run-time.
              </p>
            </div>

            <div className="card-dark p-6 bg-gradient-to-br from-blood-900/40 to-transparent">
              <p className="text-mono text-[11px] tracking-[0.32em] text-blood-400 uppercase mb-3">
                For press & sync
              </p>
              <p className="text-bone-200 text-sm leading-relaxed mb-4">
                Full press kit, hi-res photos, and stems available on request.
              </p>
              <Link href="/contact" className="text-blood-400 link-underline text-sm">
                Reach out →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
