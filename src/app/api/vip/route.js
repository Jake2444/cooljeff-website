import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

/* ─── Simple in-memory rate limit (per IP, per server instance) ───────── */
const HITS = new Map();
const WINDOW_MS = 60_000;     // 1 minute
const MAX_HITS = 5;            // 5 submissions / minute / IP

function rateLimited(ip) {
  const now = Date.now();
  const entry = HITS.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    HITS.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  HITS.set(ip, entry);
  return entry.count > MAX_HITS;
}

/* ─── POST handler ────────────────────────────────────────────────────── */
export async function POST(req) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Try again in a minute.' },
        { status: 429 },
      );
    }

    const body = await req.json();

    // Honeypot
    if (body.website && body.website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    // Server-side validation
    if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const inbox  = process.env.BOOKING_INBOX;
    const from   = process.env.BOOKING_FROM || 'CoolJeff VIP <onboarding@resend.dev>';

    // If Resend isn't configured, log to console so dev still works
    if (!apiKey || !inbox) {
      console.warn(
        '[vip] RESEND_API_KEY or BOOKING_INBOX not set — logging instead of sending:',
        body,
      );
      return NextResponse.json({ ok: true, devMode: true });
    }

    const resend = new Resend(apiKey);

    const safe = (s) => String(s ?? '—').replace(/[<>]/g, '');
    const yesNo = (b) => (b ? '✓ Yes' : '— No');

    const html = `
      <div style="font-family:Arial,sans-serif;background:#0a0205;color:#f5e6e8;padding:32px;">
        <h1 style="color:#ff1f3a;margin:0 0 8px;letter-spacing:0.04em;">New VIP Signup</h1>
        <p style="color:#a08589;margin:0 0 24px;font-size:13px;">From cooljeff.com / early access modal</p>
        <table style="width:100%;border-collapse:collapse;background:#110407;border:1px solid #5a0612;">
          ${[
            ['Name',          safe(body.name)],
            ['Email',         safe(body.email)],
            ['City',          safe(body.city) || '—'],
            ['VIP Interest',  yesNo(body.vipInterest)],
            ['Notifications', yesNo(body.notifications)],
          ].map(([k, v]) => `
            <tr>
              <td style="padding:12px 16px;border-bottom:1px solid #5a061244;color:#a08589;width:35%;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">${k}</td>
              <td style="padding:12px 16px;border-bottom:1px solid #5a061244;color:#f5e6e8;">${v}</td>
            </tr>
          `).join('')}
        </table>
        <p style="color:#a08589;font-size:12px;margin-top:20px;">
          Reply directly to this email — it goes to <strong>${safe(body.email)}</strong>.
        </p>
      </div>
    `;

    const { error: sendErr } = await resend.emails.send({
      from,
      to: inbox,
      replyTo: body.email,
      subject: `New VIP Signup — ${safe(body.name)}`,
      html,
    });

    if (sendErr) {
      console.error('[vip] Resend error:', sendErr);
      return NextResponse.json({ error: 'Email service error' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[vip] Unexpected error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
