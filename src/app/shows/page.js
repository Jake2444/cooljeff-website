import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import { HiCalendar } from 'react-icons/hi';

export const metadata = {
  title: 'Live Shows',
  description: 'Upcoming live performances and tour dates from CoolJeff.',
};

const placeholders = [
  { date: 'TBA', city: 'City — TBA',  venue: 'Venue Reveal Pending' },
  { date: 'TBA', city: 'City — TBA',  venue: 'Venue Reveal Pending' },
  { date: 'TBA', city: 'City — TBA',  venue: 'Venue Reveal Pending' },
];

export default function ShowsPage() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 px-5 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Tour"
          title="Live Shows / Upcoming Events"
          subtitle="Live dates are being booked now. Drop your email below to be first in line when tickets go on sale."
        />

        {/* Big "shows coming soon" panel */}
        <div className="card-dark p-10 md:p-16 text-center relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-radial-blood opacity-50 pointer-events-none" />
          <div className="relative">
            <span className="chip mb-6 inline-flex">No Shows Yet</span>
            <h2 className="text-display text-6xl md:text-8xl text-glow mb-4">
              Shows Coming Soon
            </h2>
            <p className="text-bone-300 text-lg max-w-2xl mx-auto leading-relaxed">
              The live era is being built. First dates will be announced across
              social channels and the mailing list — stay close.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/#newsletter" className="btn-glow">Get Early Access</Link>
              <Link href="/contact" className="btn-glow btn-ghost">Booking Inquiries</Link>
            </div>

            {/* Decorative equalizer */}
            <div className="mt-10 flex items-end justify-center h-12 gap-[3px]">
              {Array.from({ length: 40 }).map((_, i) => (
                <span
                  key={i}
                  className="eq-bar"
                  style={{ animationDelay: `${(i % 10) * 0.07}s`, animationDuration: `${0.9 + (i % 5) * 0.12}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tour date placeholders */}
        <div className="space-y-3">
          <span className="section-tag mb-4">Pending Announcements</span>
          {placeholders.map((show, i) => (
            <div
              key={i}
              className="card-dark p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded border border-blood-700/40 bg-ink-1000/60 flex-shrink-0">
                  <HiCalendar className="h-5 w-5 text-blood-400 mb-1" />
                  <span className="text-mono text-[10px] text-bone-400">{show.date}</span>
                </div>
                <div>
                  <h3 className="text-display text-2xl">{show.city}</h3>
                  <p className="text-bone-400 text-sm">{show.venue}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="chip border-bone-600/30 text-bone-400">Coming Soon</span>
                <button
                  disabled
                  className="btn-glow opacity-40 cursor-not-allowed"
                >
                  Tickets TBA
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-14 card-dark p-8 md:p-10 text-center">
          <span className="section-tag justify-center">For Promoters</span>
          <h3 className="text-display text-3xl md:text-4xl mt-3 mb-3">Booking CoolJeff?</h3>
          <p className="text-bone-400 max-w-xl mx-auto mb-6">
            Promoters and venues — reach out directly for performance availability,
            rider info, and rates.
          </p>
          <Link href="/contact" className="btn-glow">Contact for Booking</Link>
        </div>
      </div>
    </section>
  );
}
