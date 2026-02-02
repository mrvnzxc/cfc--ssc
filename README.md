# SSC Confession Room 💕

A beautiful Valentine's-themed confession web app built with Nuxt UI, featuring a pink gradient background with animated chocolates, hearts, and roses.

## Features

- 🎨 Beautiful pink gradient background with animated elements
- 💝 Animated chocolates, hearts, and roses floating across the screen
- 📝 Simple confession submission form
- 🗄️ Supabase database integration
- 🚀 Ready for deployment on Vercel

## Tech Stack

- **Framework**: Nuxt 3
- **UI Library**: Nuxt UI
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

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
   
   Create a `.env` or `.env.local` file in the root directory (Nuxt only loads files that start with `.env`):
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   Use the **anon public** key from Supabase → Settings → API (it’s a long JWT starting with `eyJ`).

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

### Step 4: CORS (You can skip this!)

Supabase’s **Data API** (used by the Supabase JS client) allows cross-origin requests by default. There is **no CORS setting** in the dashboard (Settings → API only shows API keys, JWT, etc.). Your Vercel app should work without any CORS configuration. If you see CORS errors, double-check your `SUPABASE_URL` and `SUPABASE_ANON_KEY` environment variables.

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

### Issue: "Failed to send confession" or "Invalid API key"

**Solution**: 
- Use a file named **`.env`** or **`.env.local`** (not `env.local`) so Nuxt loads your variables.
- Use the **anon public** key from Supabase → **Settings** → **API** → **Project API keys** (the long JWT starting with `eyJ`). A key that starts with `sb_publishable_` or similar is not the Supabase anon key.
- Check that your Supabase URL and key are correct in environment variables.
- Verify the `confessions` table exists in Supabase.
- Check Supabase logs for errors.

### Issue: CORS errors in browser console

**Solution**:
- Supabase’s Data API allows cross-origin requests by default, so CORS is rarely the cause. First check that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly in your deployment platform (e.g. Vercel).
- Ensure you’re using the **anon/public** key from **Settings → API** (under “Project API keys”), not the service role key.

### Issue: Build fails on Vercel

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
3. Check deployment platform logs (e.g. Vercel)

## License

This project is created for the CFCI Valentine's Celebration.

---

Made with 💕 for SSC Confession Room
