'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiExclamationTriangle } from 'react-icons/hi2';

const GENRES = [
  'Hip-Hop / Rap',
  'Melodic Rap',
  'Drill',
  'Trap',
  'R&B',
  'Afrobeats',
  'Pop',
  'Other',
];

const BUDGETS = [
  'Under $250',
  '$250 – $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500+',
  'Open to discuss',
];

const initial = {
  name: '',
  artistName: '',
  email: '',
  socials: '',
  songName: '',
  genre: '',
  budget: '',
  deadline: '',
  message: '',
  /* Honeypot — must stay empty. Bots will fill it. */
  website: '',
};

export default function BookingForm() {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverMsg, setServerMsg] = useState('');

  const set = (k) => (e) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'Required';
    if (!data.artistName.trim()) e.artistName = 'Required';
    if (!data.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Invalid email';
    if (!data.songName.trim()) e.songName = 'Required';
    if (!data.genre) e.genre = 'Pick a genre';
    if (!data.budget) e.budget = 'Pick a budget range';
    if (!data.message.trim() || data.message.trim().length < 20)
      e.message = 'Tell us a bit more (min 20 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setServerMsg('');

    // Honeypot — silently drop bots
    if (data.website) {
      setStatus('success');
      return;
    }

    if (!validate()) return;
    setStatus('sending');

    // Decide backend: prefer custom API route; fall back to Formspree env var.
    const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    const endpoint = formspree || '/api/booking';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Submission failed.');
      }

      setStatus('success');
      setData(initial);
    } catch (err) {
      setStatus('error');
      setServerMsg(err.message || 'Something went wrong.');
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      noValidate
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="card-dark p-6 md:p-10 space-y-6"
    >
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 p-4 rounded border border-blood-500/40 bg-blood-900/20"
          >
            <HiCheckCircle className="h-6 w-6 text-blood-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-bone-50 font-semibold">Request received</p>
              <p className="text-bone-300 text-sm mt-1">
                Your submission is in CoolJeff's inbox. Expect a personal reply
                within 3-5 business days.
              </p>
            </div>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 p-4 rounded border border-red-500/60 bg-red-950/30"
          >
            <HiExclamationTriangle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-bone-50 font-semibold">Couldn't send</p>
              <p className="text-bone-300 text-sm mt-1">
                {serverMsg || 'Please try again, or email directly via the Contact page.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Honeypot — visually hidden, accessibility hidden */}
      <div className="absolute opacity-0 -left-[9999px]" aria-hidden="true">
        <label>
          Website (leave empty)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={set('website')}
          />
        </label>
      </div>

      {/* Row 1: name + artist name */}
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Your Name" name="name" value={data.name} onChange={set('name')}
               placeholder="Jane Smith" error={errors.name} required />
        <Field label="Artist Name" name="artistName" value={data.artistName} onChange={set('artistName')}
               placeholder="Your stage name" error={errors.artistName} required />
      </div>

      {/* Row 2: email + socials */}
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Email" name="email" type="email" value={data.email} onChange={set('email')}
               placeholder="you@email.com" error={errors.email} required />
        <Field label="Instagram / Socials" name="socials" value={data.socials} onChange={set('socials')}
               placeholder="@handle or link" error={errors.socials} />
      </div>

      {/* Row 3: song name + genre */}
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Song Name" name="songName" value={data.songName} onChange={set('songName')}
               placeholder='"Track Title"' error={errors.songName} required />
        <Select label="Song Type / Genre" name="genre" value={data.genre} onChange={set('genre')}
                options={GENRES} placeholder="Select genre" error={errors.genre} required />
      </div>

      {/* Row 4: budget + deadline */}
      <div className="grid md:grid-cols-2 gap-5">
        <Select label="Budget" name="budget" value={data.budget} onChange={set('budget')}
                options={BUDGETS} placeholder="Select budget range" error={errors.budget} required />
        <Field label="Deadline" name="deadline" type="date" value={data.deadline} onChange={set('deadline')}
               error={errors.deadline} />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="field-label">
          Message <span className="text-blood-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={data.message}
          onChange={set('message')}
          placeholder="Tell CoolJeff about the track, the vibe, where it's headed, what you envision for the feature, and anything else worth knowing."
          className={`field resize-none ${errors.message ? 'border-red-500/60' : ''}`}
          required
        />
        {errors.message && <p className="mt-2 text-xs text-red-400">{errors.message}</p>}
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs text-bone-600 max-w-md">
          By submitting, you confirm the info is accurate and consent to CoolJeff
          contacting you back at the email above.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending…' : 'Submit Request'}
        </button>
      </div>
    </motion.form>
  );
}

/* ---------- Sub-components ---------- */
function Field({ label, name, value, onChange, type = 'text', placeholder, error, required }) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label} {required && <span className="text-blood-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`field ${error ? 'border-red-500/60' : ''}`}
        required={required}
        autoComplete="off"
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function Select({ label, name, value, onChange, options, placeholder, error, required }) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label} {required && <span className="text-blood-400">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`field appearance-none cursor-pointer ${error ? 'border-red-500/60' : ''}`}
        required={required}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1L6 6L11 1' stroke='%23ff1f3a' stroke-width='1.5' stroke-linecap='round'/></svg>\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center',
        }}
      >
        <option value="" disabled className="bg-ink-1000 text-bone-400">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-ink-1000 text-bone-50">{opt}</option>
        ))}
      </select>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
