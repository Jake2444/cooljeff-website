'use client';

import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { HiCheckCircle, HiXCircle, HiOutlineMail } from 'react-icons/hi';
import { motion } from 'framer-motion';

// Sample data — replace with real fetch from your DB (Supabase, Firebase, etc.)
const sampleRequests = [
  {
    id: 1, status: 'pending', date: '2025-05-22',
    name: 'Jordan T.', artistName: 'JT FLOWS', email: 'jt@example.com',
    songName: 'Midnight Drive', genre: 'Melodic Rap',
    budget: '$1,000 – $2,500', deadline: '2025-06-15',
    message: 'Need a clean melodic hook over a slow trap beat — vibe like nighttime drive, reflective.',
  },
  {
    id: 2, status: 'pending', date: '2025-05-23',
    name: 'Maya K.', artistName: 'Saint Maya', email: 'maya@example.com',
    songName: 'No Sleep', genre: 'Drill',
    budget: '$500 – $1,000', deadline: '2025-06-30',
    message: 'High-energy drill record, looking for a 16. Working on a 5-track project, this is the lead single.',
  },
  {
    id: 3, status: 'approved', date: '2025-05-18',
    name: 'Chris O.', artistName: 'OG Chris', email: 'chris@example.com',
    songName: 'Reasons', genre: 'Hip-Hop / Rap',
    budget: '$2,500+', deadline: '2025-07-01',
    message: 'Emotional rap record about loss and growth. Want CoolJeff on the second verse.',
  },
  {
    id: 4, status: 'declined', date: '2025-05-15',
    name: 'Ryan P.', artistName: 'Ryno', email: 'ryan@example.com',
    songName: 'Untitled', genre: 'Pop',
    budget: 'Under $250', deadline: '',
    message: 'Looking for a quick verse for my pop record.',
  },
];

const STATUSES = {
  pending:  { label: 'Pending',  cls: 'border-bone-600/40 text-bone-200' },
  approved: { label: 'Approved', cls: 'border-blood-400/60 text-blood-300' },
  declined: { label: 'Declined', cls: 'border-red-600/60 text-red-300' },
};

export default function AdminPage() {
  const [requests, setRequests] = useState(sampleRequests);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? requests : requests.filter((r) => r.status === filter);
  const counts = {
    all:      requests.length,
    pending:  requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    declined: requests.filter((r) => r.status === 'declined').length,
  };

  const updateStatus = (id, status) =>
    setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));

  return (
    <section className="relative pt-36 md:pt-44 pb-24 px-5 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Internal — concept"
          title="Admin Dashboard"
          subtitle="Concept layout for managing incoming feature requests. Sample data only — wire this up to Supabase, Firebase, or your DB of choice (instructions in README)."
        />

        {/* Warning banner */}
        <div className="card-dark p-5 mb-8 border-l-4 border-l-blood-500">
          <p className="text-mono text-[10px] tracking-[0.32em] text-blood-400 uppercase mb-1">⚠ Demo mode</p>
          <p className="text-bone-300 text-sm">
            This page is a UI concept — no authentication or persistence is connected yet.
            See the README for instructions on wiring it to a real database and adding auth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            ['Total',    counts.all,      'all'],
            ['Pending',  counts.pending,  'pending'],
            ['Approved', counts.approved, 'approved'],
            ['Declined', counts.declined, 'declined'],
          ].map(([label, n, key]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`card-dark p-5 text-left transition ${filter === key ? 'border-blood-400/60 shadow-glow-sm' : ''}`}
            >
              <p className="text-mono text-[10px] tracking-[0.28em] text-bone-400 uppercase">{label}</p>
              <p className="text-display text-4xl mt-1 text-bone-50">{n}</p>
            </button>
          ))}
        </div>

        {/* Request list */}
        <div className="space-y-4">
          {filtered.map((req) => (
            <motion.div
              key={req.id}
              layout
              className="card-dark p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`chip ${STATUSES[req.status].cls}`}>{STATUSES[req.status].label}</span>
                    <span className="text-mono text-xs text-bone-400">{req.date}</span>
                  </div>
                  <h3 className="text-display text-2xl">{req.artistName} <span className="text-bone-400">·</span> <span className="text-bone-300">{req.songName}</span></h3>
                  <p className="text-bone-400 text-sm mt-1">{req.name} — {req.email}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a href={`mailto:${req.email}?subject=Re: Feature Request - ${encodeURIComponent(req.songName)}`}
                     className="btn-glow btn-ghost text-xs py-2 px-3">
                    <HiOutlineMail className="h-4 w-4" /> Reply
                  </a>
                  {req.status !== 'approved' && (
                    <button onClick={() => updateStatus(req.id, 'approved')}
                            className="btn-glow text-xs py-2 px-3">
                      <HiCheckCircle className="h-4 w-4" /> Approve
                    </button>
                  )}
                  {req.status !== 'declined' && (
                    <button onClick={() => updateStatus(req.id, 'declined')}
                            className="btn-glow btn-ghost text-xs py-2 px-3 hover:border-red-400/60">
                      <HiXCircle className="h-4 w-4" /> Decline
                    </button>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 pb-4 border-b border-blood-700/20 text-sm">
                <Meta label="Genre"    value={req.genre} />
                <Meta label="Budget"   value={req.budget} />
                <Meta label="Deadline" value={req.deadline || '—'} />
              </div>

              <p className="mt-4 text-bone-200 leading-relaxed text-sm">{req.message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-mono text-[10px] tracking-[0.28em] text-bone-400 uppercase">{label}</p>
      <p className="text-bone-100 mt-1">{value}</p>
    </div>
  );
}
