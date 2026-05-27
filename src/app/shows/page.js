import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import { HiCalendar, HiTicket } from 'react-icons/hi';

export const metadata = {
  title: 'Live Shows',
  description: 'Upcoming live performances and tour dates from CoolJeff.',
};

const upcomingTours = [
  {
    name: 'Newmarket Tour',
    date: '2036',
    city: 'Newmarket, ON',
    venue: 'Venue Announcement Coming Soon',
    status: 'Coming Soon',
  },
  {
    name: 'Vaughan Tour',
    date: '2026',
    city: 'Vaughan, ON',
    venue: 'Venue Announcement Coming Soon',
    status: 'Coming Soon',
  },
];

export default function ShowsPage() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 px-5 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Tour"
          title="Live Shows / Upcoming Events"
          subtitle="The live era is officially in motion. Newmarket and Vaughan tours are being booked now — drop your email below to be first when tickets drop."
        />

        {/* Big tour announcement panel */}
        <div className="card-dark p-10 md:p-16 text-center relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-radial-blood opacity-50 pointer-events-none" />
          <div className="relative">
            <span className="chip mb-6 inline-flex">2026 Tours Incoming</span>
            <h2 className="text-display text-5xl md:text-7xl text-glow mb-4 leading-tight">
              Newmarket + Vaughan<br />Tour Coming Soon
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

        {/* Upcoming Tours */}
        <div className="space-y-4">
          <span className="section-tag mb-4">Upcoming Tour Stops</span>
          {upcomingTours.map((show, i) => (
            <div
              key={i}
              className="card-dark p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center justify-center w-20 h-20 rounded border border-blood-500/40 bg-ink-1000/60 flex-shrink-0">
                  <HiCalendar className="h-5 w-5 text-blood-400 mb-1" />
                  <span className="text-mono text-[11px] text-bone-300">{show.date}</span>
                </div>
                <div>
                  <h3 className="text-display text-2xl md:text-3xl">{show.name}</h3>
                  <p className="text-bone-400 text-sm mt-1">{show.city}</p>
                  <p className="text-bone-500 text-xs mt-1">{show.venue}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="chip border-blood-500/40 text-blood-400">{show.status}</span>
                <button
                  disabled
                  className="btn-glow opacity-50 cursor-not-allowed flex items-center gap-2"
                >
                  <HiTicket className="h-4 w-4" />
                  Tickets Coming Soon
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
