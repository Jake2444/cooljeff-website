import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { HiArrowRight } from 'react-icons/hi';

export const metadata = {
  title: 'About',
  description:
    "CoolJeff — independent rap artist building real music, one song at a time.",
};

export default function AboutPage() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 px-5 md:px-10">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <span className="section-tag">About</span>
          <h1 className="text-display text-5xl md:text-7xl mt-4 mb-3">
            Who Is <span className="wordmark-stroke">CoolJeff</span>?
          </h1>
          <p className="text-bone-300 text-xl md:text-2xl leading-relaxed mb-12 max-w-2xl">
            Independent rap artist. Started releasing in 2025.
          </p>
        </ScrollReveal>

        <div className="space-y-7 text-bone-300 leading-relaxed text-base md:text-lg">
          <ScrollReveal delay={0.05}>
            <p>
              I&apos;m CoolJeff. I make songs about what I&apos;m actually living.
              Some come out slow and quiet. Some come out loud. I don&apos;t really
              plan which one happens — whatever the mood is, the song goes there.
              Trying to lock into one style never made sense to me.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p>
              A lot of what I write is the stuff people don&apos;t usually talk
              about. Late hours. The conversations you replay in your head.
              The things you only really see clearly when nobody else is around.
              I&apos;d rather make a song that hits one person hard than one that
              everyone hears once and forgets.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p>
              There&apos;s no label. No team telling me what to drop next. Just
              me, the music, and however far I can take it. I&apos;m building this
              slowly — the right way. One song, one listener at a time.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          <div className="my-16 md:my-20 relative">
            <div className="absolute -left-2 -top-4 text-blood-bright text-7xl md:text-9xl leading-none opacity-40 select-none font-serif">
              &ldquo;
            </div>
            <blockquote className="relative pl-8 md:pl-12 text-display text-2xl md:text-4xl text-glow leading-tight tracking-wide">
              If one person plays it on repeat at 2 a.m., that&apos;s the win.
            </blockquote>
            <p className="mt-6 pl-8 md:pl-12 text-mono text-xs tracking-[0.32em] text-blood-400 uppercase">
              — CoolJeff
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="text-bone-300 text-lg leading-relaxed mb-12">
            New music, new collabs, and a body of work that maps where this
            started — and how far it goes. Thanks for being early.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="card-dark p-8 md:p-10 text-center">
            <span className="section-tag justify-center">Connect</span>
            <h3 className="text-display text-3xl md:text-4xl mt-3 mb-4">
              Want a verse, a collab, or just to talk?
            </h3>
            <p className="text-bone-400 max-w-md mx-auto mb-6">
              Send a message or submit a feature request. I read every one.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/booking" className="btn-glow">
                Book a Feature <HiArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-glow btn-ghost">
                Send a Message
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
