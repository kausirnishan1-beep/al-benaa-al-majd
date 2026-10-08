# Al-Benaa & Al-Majd Group Website

React + Vite + Tailwind CSS + Framer Motion + Supabase project scaffold.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase keys and site URL
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

This project is ready for Vercel deployment. Push to GitHub and import the repo in Vercel,
setting the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables in the
Vercel dashboard. Set `VITE_SITE_URL` to the final HTTPS production origin so canonical and
social metadata always point to the deployed domain.

For an existing Supabase project, apply `supabase_security_migration.sql` in the Supabase SQL
Editor. It is the non-destructive security update; do not rerun the full `supabase_schema.sql` on
a production database because that bootstrap schema intentionally recreates application tables.

### Secure admin email replies

Admin replies are sent by the server-side `/api/send-reply` function instead of opening the
browser's active Gmail account. To enable it in production:

1. Add and verify `albenaagroup.com` in Resend (SPF and DKIM DNS records are required).
2. Add `RESEND_API_KEY` to the Vercel project's server-side environment variables.
3. Add `REPLY_FROM_DOMAIN=albenaagroup.com` to Vercel and redeploy.

The function verifies the Supabase access token, checks that the user is active in the `admins`
table, derives the From address from that authenticated admin, and loads the recipient from the
original `contact_messages` row. Never expose `RESEND_API_KEY` through a `VITE_` variable.

## Structure

- `src/pages/Benaa/*` — Al-Benaa (construction) company pages
- `src/pages/Majd/*` — Al-Majd (trading) company pages
- `src/components/*` — shared and section-specific components
- `src/data/*` — static content/data used across the site
- `src/utils/supabaseClient.js` — Supabase client instance
