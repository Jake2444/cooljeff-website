'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiExclamationTriangle } from 'react-icons/hi2';

const initial = { name: '', email: '', subject: '', message: '', website: '' };

export default function ContactForm() {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'Required';
    if (!data.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Invalid email';
    if (!data.message.trim() || data.message.trim().length < 10) e.message = 'Tell us a bit more';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (data.website) { setStatus('success'); return; }
    if (!validate()) return;
    setStatus('sending');

    // Map contact payload into the booking endpoint shape so a single inbox
    // receives everything. (Subject becomes the "songName" field — labelled
    // clearly in the email template.)
    const payload = {
      name: data.name,
      artistName: '(general contact)',
      email: data.email,
      socials: '',
      songName: data.subject || '(no subject)',
      genre: 'General Inquiry',
      budget: 'N/A',
      deadline: '',
      message: data.message,
      website: '',
    };

    const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    const endpoint = formspree || '/api/booking';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      setData(initial);
    } catch {
      setStatus('error');
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
      className="card-dark p-6 md:p-10 space-y-5"
    >
      <div>
        <span className="section-tag">Send a Message</span>
        <h3 className="text-display text-4xl mt-3">Drop a Line</h3>
        <p className="text-bone-400 text-sm mt-2">
          Best for press, sync, partnerships, or anything that doesn't fit the booking form.
        </p>
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-start gap-3 p-4 rounded border border-blood-500/40 bg-blood-900/20">
            <HiCheckCircle className="h-5 w-5 text-blood-400 mt-0.5" />
            <p className="text-bone-100 text-sm">Message sent. Expect a reply within a few business days.</p>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-start gap-3 p-4 rounded border border-red-500/60 bg-red-950/30">
            <HiExclamationTriangle className="h-5 w-5 text-red-400 mt-0.5" />
            <p className="text-bone-100 text-sm">Couldn't send — please try again.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Honeypot */}
      <div className="absolute opacity-0 -left-[9999px]" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" value={data.website} onChange={set('website')} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-name" className="field-label">Name <span className="text-blood-400">*</span></label>
          <input id="c-name" type="text" value={data.name} onChange={set('name')}
                 className={`field ${errors.name ? 'border-red-500/60' : ''}`} placeholder="Your name" required />
          {errors.name && <p className="mt-2 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="field-label">Email <span className="text-blood-400">*</span></label>
          <input id="c-email" type="email" value={data.email} onChange={set('email')}
                 className={`field ${errors.email ? 'border-red-500/60' : ''}`} placeholder="you@email.com" required />
          {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="c-subject" className="field-label">Subject</label>
        <input id="c-subject" type="text" value={data.subject} onChange={set('subject')}
               className="field" placeholder="What's this about?" />
      </div>

      <div>
        <label htmlFor="c-message" className="field-label">Message <span className="text-blood-400">*</span></label>
        <textarea id="c-message" rows={6} value={data.message} onChange={set('message')}
                  className={`field resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                  placeholder="What would you like to talk about?" required />
        {errors.message && <p className="mt-2 text-xs text-red-400">{errors.message}</p>}
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={status === 'sending'} className="btn-glow disabled:opacity-50">
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </motion.form>
  );
}
