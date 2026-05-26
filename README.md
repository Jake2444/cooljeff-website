# CoolJeff — Official Site

A modern, dark-cinematic multi-page website for the independent rap artist **CoolJeff**.
Built with **Next.js 14 (App Router) + Tailwind CSS + Framer Motion**.

> Emotion through sound.

---

## ⚡ Quick start (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Copy env template
cp .env.example .env.local

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — that's it. The site works
immediately. Booking submissions log to your terminal until you add an email key.

---

## 🗂 What's inside

| Route       | What it is                                                    |
|-------------|---------------------------------------------------------------|
| `/`         | Home — hero, ticker, music preview, about teaser, booking CTA |
| `/music`    | All 5 singles with Spotify embeds + streaming platform links  |
| `/about`    | Full artist bio + fast-facts panel                            |
| `/booking`  | **Feature booking form** with backend                         |
| `/shows`    | "Shows coming soon" + placeholder tour dates                  |
| `/contact`  | General contact form + socials                                |
| `/admin`    | Concept admin dashboard for managing requests (demo only)     |

---

## 📧 Booking form — choose your backend

The booking form supports **two backends**. Pick one.

### Option A · Resend + the built-in API route *(recommended)*

Free tier: 3,000 emails/month. Best looking emails, full control.

1. Sign up at [resend.com](https://resend.com)
2. Verify a domain (or use the sandbox sender `onboarding@resend.dev` for testing)
3. Create an API key
4. Edit `.env.local`:

   ```
   RESEND_API_KEY=re_xxxxxxxxxx
   BOOKING_INBOX=your-email@example.com
   BOOKING_FROM="CoolJeff Bookings <onboarding@resend.dev>"
   ```

Submissions are validated, rate-limited (5/min per IP), spam-filtered with a
honeypot, and emailed to you with a styled HTML template. Reply-To is set to
the submitter's email so you can hit reply and answer them directly.

### Option B · Formspree *(zero config)*

If you don't want to manage an API key at all:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form, copy its endpoint (`https://formspree.io/f/xxxxx`)
3. Edit `.env.local`:

   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxx
   ```

When this variable is set, the form posts directly to Formspree and skips the
API route entirely. You'll get emails in your Formspree inbox.

> Formspree's free plan caps submissions per month. Resend is more generous.

---

## 🛠 Customisation

### Change the songs
Edit `src/lib/songs.js` — just paste new Spotify track IDs (the long string at
the end of a `https://open.spotify.com/track/...` URL).

### Update social links
Same file — `src/lib/songs.js` → `socials` object. Add your real Instagram and
TikTok URLs.

### Tweak the bio
`src/app/about/page.js` — pure JSX, edit the paragraphs.

### Adjust colors / fonts / glow
- Color tokens: `tailwind.config.js` → `theme.extend.colors`
- CSS variables: `src/app/globals.css` → `:root`
- Fonts: `src/app/layout.js` (currently Anton + Manrope + JetBrains Mono)

### Slow down or remove the loading screen
`src/components/LoadingScreen.jsx` — change the `setTimeout` duration or
delete the file and remove its import in `layout.js`.

---

## 🔐 Wiring up the Admin Dashboard

The `/admin` page is a **UI concept** with sample data. To make it real:

### Recommended: Supabase

1. Create a Supabase project + a `bookings` table:
   ```sql
   create table bookings (
     id          uuid primary key default gen_random_uuid(),
     created_at  timestamp default now(),
     status      text default 'pending',
     name        text not null,
     artist_name text not null,
     email       text not null,
     socials     text,
     song_name   text not null,
     genre       text not null,
     budget      text not null,
     deadline    date,
     message     text not null
   );
   ```
2. In `src/app/api/booking/route.js`, after the email send, insert into Supabase:
   ```js
   import { createClient } from '@supabase/supabase-js';
   const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
   await sb.from('bookings').insert({ /* ...fields from body... */ });
   ```
3. In `src/app/admin/page.js`, replace `sampleRequests` with a fetch from Supabase.
4. Protect the page — wrap it with Supabase Auth (email magic link) or
   [next-auth](https://authjs.dev), or just deploy it behind Vercel's
   [Password Protection](https://vercel.com/docs/security/deployment-protection).

> Don't ship `/admin` to production without auth.

---

## 🚀 Deploy to Vercel

The easiest path:

1. Push this repo to GitHub
   ```bash
   git init && git add . && git commit -m "Initial commit"
   git remote add origin https://github.com/yourname/cooljeff.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new), pick the repo, click **Deploy**

3. After the first deploy, open **Project → Settings → Environment Variables**
   and add:

   | Key                              | Value                                 |
   |----------------------------------|---------------------------------------|
   | `RESEND_API_KEY`                 | `re_xxx…`                             |
   | `BOOKING_INBOX`                  | `you@email.com`                       |
   | `BOOKING_FROM`                   | `CoolJeff Bookings <send@yourdomain>` |
   | `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | *(only if using Option B)*            |

4. Redeploy (Vercel will prompt automatically)

5. Add your custom domain under **Project → Domains**

Average cold-start build time: ~45s. Subsequent deploys: ~25s.

---

## 🎨 Design system

| Token | Value | Usage |
|-------|-------|-------|
| Display font  | `Anton`            | Wordmarks, headers, buttons    |
| Body font     | `Manrope`          | Paragraphs, UI text            |
| Mono accent   | `JetBrains Mono`   | Labels, track #s, dates        |
| `--blood`     | `#c8102e`          | Primary brand red              |
| `--blood-bright` | `#ff1f3a`       | Glow accents, focus states     |
| `--bg`        | `#050203`          | Page background                |
| `--bone`      | `#f5e6e8`          | Primary text                   |

Reusable utility classes (in `globals.css`):
- `.btn-glow` / `.btn-glow.btn-ghost` — primary / secondary buttons
- `.card-dark` — bordered surface with hover lift
- `.field` / `.field-label` — form inputs
- `.text-display` / `.wordmark-stroke` — hero text styles
- `.section-tag` — small uppercase tagline with red leader line
- `.chip` — pill badge
- `.eq-bar` — animated equalizer bar

---

## 📁 Project structure

```
cooljeff/
├─ src/
│  ├─ app/
│  │  ├─ layout.js               ← fonts, metadata, global overlays
│  │  ├─ page.js                 ← /
│  │  ├─ globals.css             ← all custom CSS + tokens
│  │  ├─ sitemap.js              ← SEO sitemap
│  │  ├─ icon.svg                ← favicon
│  │  ├─ music/page.js           ← /music
│  │  ├─ about/page.js           ← /about
│  │  ├─ booking/page.js         ← /booking
│  │  ├─ shows/page.js           ← /shows
│  │  ├─ contact/page.js         ← /contact
│  │  ├─ admin/page.js           ← /admin
│  │  └─ api/booking/route.js    ← POST handler (Resend)
│  ├─ components/
│  │  ├─ Navbar.jsx              ← sticky scroll-aware navbar
│  │  ├─ Footer.jsx              ← footer + newsletter
│  │  ├─ Hero.jsx                ← landing hero
│  │  ├─ LoadingScreen.jsx       ← intro animation
│  │  ├─ AmbientBackground.jsx   ← rain + embers
│  │  ├─ SectionHeader.jsx       ← reusable tag + title
│  │  ├─ MusicCard.jsx           ← Spotify embed card
│  │  ├─ BookingForm.jsx         ← validated feature form
│  │  └─ ContactForm.jsx         ← general contact form
│  └─ lib/
│     └─ songs.js                ← song & social data
├─ public/robots.txt
├─ tailwind.config.js
├─ next.config.js
├─ postcss.config.js
├─ .env.example
└─ package.json
```

---

## ✅ Production checklist

Before going live:

- [ ] Replace placeholder Instagram / TikTok URLs in `src/lib/songs.js`
- [ ] Set `BOOKING_INBOX` to a real address you check
- [ ] Verify a domain on Resend and update `BOOKING_FROM`
- [ ] Update `metadataBase` URL in `src/app/layout.js` to your real domain
- [ ] Update sitemap base URL in `src/app/sitemap.js`
- [ ] Test booking form submission end-to-end
- [ ] Test on mobile (real device, not just devtools)
- [ ] Add password protection to `/admin` *or* delete that route
- [ ] Set up a custom domain in Vercel and enable HTTPS (automatic)

---

## 🧪 Scripts

| Command           | Purpose                              |
|-------------------|--------------------------------------|
| `npm run dev`     | Local dev server with hot reload     |
| `npm run build`   | Production build                     |
| `npm run start`   | Run the production build locally     |
| `npm run lint`    | ESLint                               |

---

## 📜 License

This site is built for CoolJeff. Code is yours to modify and deploy.
Songs, artwork, and brand assets remain © CoolJeff.
