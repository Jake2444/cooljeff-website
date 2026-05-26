import Link from 'next/link';
import { FaSpotify, FaApple, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import SectionHeader from '@/components/SectionHeader';
import ContactForm from '@/components/ContactForm';
import { socials } from '@/lib/songs';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with CoolJeff — for press, sync, features, or general inquiries.',
};

export default function ContactPage() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 px-5 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Get In Touch"
          title="Contact"
          subtitle="The fastest way to reach CoolJeff for press, sync, partnerships, or general questions."
        />

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Direct options */}
          <div className="lg:col-span-5 space-y-4">
            <div className="card-dark p-6">
              <span className="section-tag">For Features</span>
              <h3 className="text-display text-3xl mt-3 mb-3">Looking for a verse?</h3>
              <p className="text-bone-400 text-sm leading-relaxed mb-4">
                Use the dedicated booking form to submit track details, budget,
                and timeline. It routes straight to CoolJeff&apos;s inbox.
              </p>
              <Link href="/booking" className="btn-glow">Book a Feature</Link>
            </div>

            <div className="card-dark p-6">
              <span className="section-tag">DMs Open</span>
              <h3 className="text-display text-3xl mt-3 mb-4">Socials</h3>
              <div className="space-y-3">
                {[
                  ['Instagram',   socials.instagram, FaInstagram],
                  ['TikTok',      socials.tiktok,    FaTiktok],
                  ['Spotify',     socials.spotify,   FaSpotify],
                  ['Apple Music', socials.appleMusic, FaApple],
                  ['YouTube',     socials.youtube,   FaYoutube],
                ].map(([label, href, Icon]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded border border-blood-700/20 hover:border-blood-400/60 hover:bg-blood-900/10 transition group"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-blood-400 group-hover:text-blood-200 transition" />
                      <span className="text-bone-100">{label}</span>
                    </span>
                    <span className="text-mono text-xs text-bone-400 group-hover:text-blood-300 transition">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* General message form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
