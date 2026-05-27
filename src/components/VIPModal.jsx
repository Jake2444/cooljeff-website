'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiCheckCircle } from 'react-icons/hi';
import { FaCrown } from 'react-icons/fa';

const initial = {
  name: '',
  email: '',
  city: '',
  vipInterest: false,
  notifications: false,
  website: '', // honeypot — bots fill, humans don't see
};

export default function VIPModal({ isOpen, onClose }) {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverMsg, setServerMsg] = useState('');

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset form state when modal reopens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrors({});
      setServerMsg('');
    }
  }, [isOpen]);

  const set = (k, isCheckbox = false) => (e) =>
    setData((d) => ({ ...d, [k]: isCheckbox ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'Required';
    if (!data.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerMsg('');

    // Honeypot — silently drop bots
    if (data.website) {
      setStatus('success');
      return;
    }

    if (!validate()) return;
    setStatus('sending');

    try {
      const res = await fetch('/api/vip', {
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
      // Auto-close after 2.5s on success
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      setStatus('error');
      setServerMsg(err.message || 'Something went wrong.');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-lg card-dark p-7 md:p-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blood-700/40 bg-ink-1000/60 text-bone-400 hover:text-blood-bright hover:border-blood-bright transition-all"
            >
              <HiX className="h-5 w-5" />
            </button>

            {status === 'success' ? (
              /* Success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                  className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-blood-500/20 border border-blood-bright mb-6"
                  style={{ boxShadow: '0 0 40px rgba(255,31,58,0.45)' }}
                >
                  <HiCheckCircle className="h-12 w-12 text-blood-bright" />
                </motion.div>
                <h3 className="text-display text-3xl md:text-4xl text-glow mb-3">
                  You&apos;re In
                </h3>
                <p className="text-bone-300 max-w-sm mx-auto leading-relaxed">
                  Welcome to the VIP list. You&apos;ll be first to know when tickets drop and new music lands.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-6">
                  <span className="chip mb-3 inline-flex">
                    <FaCrown className="h-3 w-3" />
                    VIP Access
                  </span>
                  <h2 className="text-display text-3xl md:text-4xl text-glow leading-tight">
                    Get Early Access
                  </h2>
                  <p className="text-bone-400 mt-2 text-sm leading-relaxed">
                    Join the VIP list — be first for tour tickets, new music drops, and behind-the-scenes content.
                  </p>
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <div className="mb-5 p-3 rounded border border-red-500/60 bg-red-950/30 text-sm text-bone-200">
                    {serverMsg || 'Something went wrong. Please try again.'}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Honeypot */}
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

                  <div>
                    <label htmlFor="vip-name" className="field-label">
                      Your Name <span className="text-blood-400">*</span>
                    </label>
                    <input
                      id="vip-name"
                      type="text"
                      value={data.name}
                      onChange={set('name')}
                      placeholder="Jane Smith"
                      className={`field ${errors.name ? 'border-red-500/60' : ''}`}
                      required
                      autoComplete="name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="vip-email" className="field-label">
                      Email <span className="text-blood-400">*</span>
                    </label>
                    <input
                      id="vip-email"
                      type="email"
                      value={data.email}
                      onChange={set('email')}
                      placeholder="you@email.com"
                      className={`field ${errors.email ? 'border-red-500/60' : ''}`}
                      required
                      autoComplete="email"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="vip-city" className="field-label">
                      City
                    </label>
                    <input
                      id="vip-city"
                      type="text"
                      value={data.city}
                      onChange={set('city')}
                      placeholder="Toronto, ON"
                      className="field"
                      autoComplete="address-level2"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={data.vipInterest}
                        onChange={set('vipInterest', true)}
                        className="mt-1 h-4 w-4 rounded cursor-pointer accent-[#ff1f3a]"
                      />
                      <span className="text-bone-200 text-sm group-hover:text-bone-50 transition-colors">
                        Interested in VIP-only experiences (meet &amp; greets, exclusive drops, etc.)
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={data.notifications}
                        onChange={set('notifications', true)}
                        className="mt-1 h-4 w-4 rounded cursor-pointer accent-[#ff1f3a]"
                      />
                      <span className="text-bone-200 text-sm group-hover:text-bone-50 transition-colors">
                        Notify me about tour dates and new music drops
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-glow w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {status === 'sending' ? 'Joining…' : 'Join VIP List'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
