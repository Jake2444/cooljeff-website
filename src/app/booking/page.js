import SectionHeader from '@/components/SectionHeader';
import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: 'Book a Feature',
  description:
    'Request a feature verse from CoolJeff. Fill out the form with track details, budget, and timeline — submissions are reviewed personally.',
};

export default function BookingPage() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 px-5 md:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          tag="Feature Requests"
          title="Book a Feature"
          subtitle="Submit your track details below. Every request is reviewed personally — expect a reply within 3-5 business days if it's a fit."
        />

        {/* Process */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            ['01', 'Submit',  'Fill out the form below with track, budget, and timeline.'],
            ['02', 'Review',  'CoolJeff reviews the submission and listens to your demo.'],
            ['03', 'Respond', 'You receive a personal reply — approved, declined, or negotiated.'],
          ].map(([n, title, desc]) => (
            <div key={n} className="card-dark p-5">
              <span className="text-mono text-[10px] tracking-[0.32em] text-blood-400 uppercase">Step {n}</span>
              <h3 className="text-display text-2xl mt-1 mb-2">{title}</h3>
              <p className="text-bone-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* The form */}
        <BookingForm />

        {/* Notes */}
        <div className="mt-10 grid md:grid-cols-2 gap-4 text-sm text-bone-400">
          <div className="card-dark p-5">
            <p className="text-mono text-[10px] tracking-[0.32em] text-blood-400 uppercase mb-2">Note</p>
            <p>Not every submission is accepted — fit, schedule, and budget all factor in. Honest pitches win.</p>
          </div>
          <div className="card-dark p-5">
            <p className="text-mono text-[10px] tracking-[0.32em] text-blood-400 uppercase mb-2">Privacy</p>
            <p>Your details are sent directly to CoolJeff's inbox. They aren't shared with third parties.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
