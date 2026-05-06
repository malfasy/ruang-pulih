# RuangPulih — Post-Op Recovery Guide Web App

Panduan rehabilitasi pasca-operasi mandiri.

## Tech Stack
- **Frontend**: Static HTML/CSS/JS + TailwindCSS CDN
- **Backend**: Supabase (Auth + PostgreSQL + Storage)
- **Hosting**: Netlify

## Setup

### 1. Supabase
1. Go to your Supabase project SQL Editor
2. Paste and run `supabase-schema.sql`
3. Update credentials in `js/supabase-config.js` if needed

### 2. Local Development
```bash
npx serve . -l 3000
```
Open http://localhost:3000

### 3. Deploy to Netlify
1. Push to GitHub
2. Connect repo on Netlify
3. Set publish directory to `.` (root)
4. Deploy!

## Project Structure
```
├── index.html          # Landing page
├── onboarding.html     # Onboarding wizard
├── dashboard.html      # Dashboard (SPA)
├── auth/               # Login & Register
├── css/style.css       # Consolidated styles
├── js/                 # All JavaScript modules
├── assets/images/      # Logo & team photos
├── netlify.toml        # Netlify config
└── supabase-schema.sql # Database schema
```
