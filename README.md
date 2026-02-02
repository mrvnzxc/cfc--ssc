# SSC Confession Room 💕

A beautiful Valentine's-themed confession web app built with Nuxt UI, featuring a pink gradient background with animated chocolates, hearts, and roses.

## Features

- 🎨 Beautiful pink gradient background with animated elements
- 💝 Animated chocolates, hearts, and roses floating across the screen
- 📝 Simple confession submission form
- 🗄️ Supabase database integration
- 🚀 Ready for deployment on Vercel and Digital Ocean

## Tech Stack

- **Framework**: Nuxt 3
- **UI Library**: Nuxt UI
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel / Digital Ocean

## Local Development Setup

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ssc-confession-room
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: SSC Confession Room (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for the project to be ready

### Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (this is your `SUPABASE_URL`)
   - **anon/public key** (this is your `SUPABASE_ANON_KEY`)

### Step 3: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

### Step 4: Verify Table Creation

1. Go to **Table Editor** in the sidebar
2. You should see a `confessions` table
3. Click on it to verify the structure:
   - `id` (uuid, primary key)
   - `confession` (text)
   - `created_at` (timestamp)

## GitHub Setup

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Fill in:
   - **Repository name**: `ssc-confession-room`
   - **Description**: SSC Confession Room - Valentine's Celebration App
   - **Visibility**: Public or Private (your choice)
   - **DO NOT** initialize with README (we already have one)
4. Click "Create repository"

### Step 2: Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: SSC Confession Room"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ssc-confession-room.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Vercel Deployment

### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in (use "Continue with GitHub")
3. Click "Add New..." → "Project"
4. Import your `ssc-confession-room` repository
5. Click "Import"

### Step 2: Configure Environment Variables

1. In the project settings, go to **Environment Variables**
2. Add the following:
   - **Name**: `SUPABASE_URL`
     **Value**: Your Supabase project URL
   - **Name**: `SUPABASE_ANON_KEY`
     **Value**: Your Supabase anon key
3. Make sure both are selected for **Production**, **Preview**, and **Development**
4. Click "Save"

### Step 3: Deploy

1. Vercel will automatically detect Nuxt.js
2. Click "Deploy"
3. Wait 2-3 minutes for the build to complete
4. Your app will be live at `https://your-project-name.vercel.app`

### Step 4: Update Supabase CORS (Important!)

1. Go to your Supabase project → **Settings** → **API**
2. Scroll down to "CORS Configuration"
3. Add your Vercel URL: `https://your-project-name.vercel.app`
4. Click "Save"

## Digital Ocean App Platform Deployment

### Step 1: Prepare Your Repository

Make sure your code is pushed to GitHub (see GitHub Setup above).

### Step 2: Create Digital Ocean Account

1. Go to [digitalocean.com](https://digitalocean.com)
2. Sign up for an account
3. Verify your email

### Step 3: Create a New App

1. In Digital Ocean dashboard, click "Create" → "Apps"
2. Choose "GitHub" as source
3. Authorize Digital Ocean to access your GitHub
4. Select your `ssc-confession-room` repository
5. Click "Next"

### Step 4: Configure Build Settings

1. Digital Ocean should auto-detect Nuxt.js
2. Verify settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output/public`
   - **Run Command**: `node .output/server/index.mjs`
3. Click "Next"

### Step 5: Add Environment Variables

1. Click "Edit" next to Environment Variables
2. Add:
   - **SUPABASE_URL**: Your Supabase project URL
   - **SUPABASE_ANON_KEY**: Your Supabase anon key
3. Click "Next"

### Step 6: Choose Plan and Deploy

1. Select a plan (Basic plan $5/month is fine for small apps)
2. Choose a region closest to your users
3. Click "Create Resources"
4. Wait 5-10 minutes for deployment

### Step 7: Update Supabase CORS

1. Go to Supabase → **Settings** → **API**
2. Add your Digital Ocean app URL to CORS
3. Click "Save"

## Database Queries

### View All Confessions

```sql
SELECT * FROM confessions 
ORDER BY created_at DESC;
```

### View Recent Confessions (Last 24 hours)

```sql
SELECT * FROM confessions 
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### Count Total Confessions

```sql
SELECT COUNT(*) as total_confessions FROM confessions;
```

### Delete Old Confessions (older than 30 days)

```sql
DELETE FROM confessions 
WHERE created_at < NOW() - INTERVAL '30 days';
```

### View Confessions by Date Range

```sql
SELECT * FROM confessions 
WHERE created_at BETWEEN '2024-02-01' AND '2024-02-14'
ORDER BY created_at DESC;
```

## Troubleshooting

### Issue: "Failed to send confession"

**Solution**: 
- Check that your Supabase URL and key are correct in environment variables
- Verify the `confessions` table exists in Supabase
- Check Supabase logs for errors

### Issue: CORS errors in browser console

**Solution**:
- Make sure your deployment URL is added to Supabase CORS settings
- Check that environment variables are set correctly in your deployment platform

### Issue: Build fails on Vercel/Digital Ocean

**Solution**:
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors
- Verify Node.js version compatibility (should be 18+)

### Issue: Animated elements not showing

**Solution**:
- Clear browser cache
- Check browser console for CSS errors
- Ensure CSS file is properly imported in `nuxt.config.ts`

## Project Structure

```
ssc-confession-room/
├── assets/
│   └── css/
│       └── main.css          # Global styles
├── composables/
│   └── useSupabase.ts        # Supabase composable
├── pages/
│   └── index.vue             # Main confession page
├── plugins/
│   └── supabase.client.ts    # Supabase plugin
├── app.vue                   # Root component
├── nuxt.config.ts            # Nuxt configuration
├── package.json              # Dependencies
├── supabase-schema.sql       # Database schema
└── README.md                 # This file
```

## Environment Variables Reference

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous/public key | Supabase Dashboard → Settings → API |

## Security Notes

- The app uses Supabase Row Level Security (RLS) policies
- Currently, anyone can read and insert confessions
- To make confessions private (only insert, no read), remove the read policy in Supabase
- Never commit `.env` file to GitHub (it's in `.gitignore`)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Supabase logs in the dashboard
3. Check deployment platform logs (Vercel/Digital Ocean)

## License

This project is created for the CFCI Valentine's Celebration.

---

Made with 💕 for SSC Confession Room
