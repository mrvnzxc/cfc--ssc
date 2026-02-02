# Quick Start Guide 🚀

Get your SSC Confession Room up and running in 15 minutes!

## Prerequisites

- Node.js 18+ installed ([Download here](https://nodejs.org))
- A Supabase account (free) ([Sign up here](https://supabase.com))

## Step 1: Install Dependencies (2 min)

```bash
npm install
```

## Step 2: Set Up Supabase (5 min)

1. **Create Supabase Project**
   - Go to https://supabase.com → Sign up/Login
   - Click "New Project"
   - Name: `ssc-confession-room`
   - Set database password (save it!)
   - Choose region → Create

2. **Get API Keys**
   - Settings → API
   - Copy **Project URL** and **anon public key**

3. **Create Database Table**
   - SQL Editor → New query
   - Copy/paste contents of `supabase-schema.sql`
   - Click Run

## Step 3: Configure Environment (1 min)

Create `.env` file in project root:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Run Locally (1 min)

```bash
npm run dev
```

Visit: http://localhost:3000

## Step 5: Deploy (5 min)

### Option A: Vercel (Recommended - Free)

1. Push code to GitHub
2. Go to vercel.com → Import GitHub repo
3. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Deploy!
5. Add Vercel URL to Supabase CORS (Settings → API)

### Option B: Digital Ocean

1. Push code to GitHub
2. Digital Ocean → Create → Apps
3. Connect GitHub repo
4. Add environment variables
5. Deploy!

## That's It! 🎉

Your confession room is live! Share the URL and let the confessions flow! 💕

---

**Need detailed instructions?** See `DEPLOYMENT.md` for complete guide.
