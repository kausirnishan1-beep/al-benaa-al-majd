# Al-Benaa & Al-Majd Group Website

React + Vite + Tailwind CSS + Framer Motion + Supabase project scaffold.

## Setup

```bash
npm install
cp .env .env.local   # then fill in your Supabase keys
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

This project is ready for Vercel deployment. Push to GitHub and import the repo in Vercel,
setting the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables in the
Vercel dashboard.

## Structure

- `src/pages/Benaa/*` — Al-Benaa (construction) company pages
- `src/pages/Majd/*` — Al-Majd (trading) company pages
- `src/components/*` — shared and section-specific components
- `src/data/*` — static content/data used across the site
- `src/utils/supabaseClient.js` — Supabase client instance
