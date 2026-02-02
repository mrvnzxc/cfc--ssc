# Complete Deployment Guide

This guide provides step-by-step instructions for deploying the SSC Confession Room app.

## Quick Start Checklist

- [ ] Supabase project created and configured
- [ ] Database table created
- [ ] GitHub repository created and code pushed
- [ ] Vercel deployment configured
- [ ] Environment variables set in Vercel

## Detailed Setup Instructions

### Part 1: Supabase Setup (5 minutes)

#### 1.1 Create Account and Project

1. Visit https://supabase.com
2. Click "Start your project" or "Sign in"
3. Sign up with GitHub/Google/Email
4. Click "New Project"
5. Fill in:
   - **Organization**: Create new or select existing
   - **Name**: `ssc-confession-room`
   - **Database Password**: Create strong password (save it!)
   - **Region**: Choose closest region
6. Click "Create new project"
7. Wait 2-3 minutes for provisioning

#### 1.2 Get API Credentials

1. In project dashboard, click **Settings** (gear icon)
2. Click **API** in sidebar
3. Copy these values:
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Save them - you'll need them later!

#### 1.3 Create Database Table

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New query**
3. Open `supabase-schema.sql` from this project
4. Copy entire contents
5. Paste into SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see: "Success. No rows returned"

#### 1.4 Verify Table

1. Click **Table Editor** (left sidebar)
2. You should see `confessions` table
3. Click on it to see columns:
   - `id` (uuid)
   - `confession` (text)
   - `created_at` (timestamp)

✅ **Supabase Setup Complete!**

---

### Part 2: GitHub Setup (3 minutes)

#### 2.1 Create Repository

1. Go to https://github.com
2. Sign in
3. Click **+** → **New repository**
4. Fill in:
   - **Repository name**: `ssc-confession-room`
   - **Description**: SSC Confession Room - Valentine's App
   - **Visibility**: Public or Private
   - **DO NOT** check "Add a README"
5. Click **Create repository**

#### 2.2 Push Code

Open terminal in your project folder:

```bash
# If git not initialized
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: SSC Confession Room app"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ssc-confession-room.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ **GitHub Setup Complete!**

---

### Part 3: Vercel Deployment (5 minutes)

#### 3.1 Connect GitHub

1. Go to https://vercel.com
2. Click **Sign Up** → **Continue with GitHub**
3. Authorize Vercel
4. Click **Add New...** → **Project**
5. Find `ssc-confession-room` repository
6. Click **Import**

#### 3.2 Configure Project

1. **Framework Preset**: Should auto-detect "Nuxt.js" ✅
2. **Root Directory**: Leave as `./`
3. **Build Command**: `npm run build` (auto-filled)
4. **Output Directory**: `.output` (auto-filled)
5. Click **Environment Variables**

#### 3.3 Add Environment Variables

Add these two variables:

**Variable 1:**
- **Key**: `SUPABASE_URL`
- **Value**: Paste your Supabase Project URL
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

**Variable 2:**
- **Key**: `SUPABASE_ANON_KEY`
- **Value**: Paste your Supabase anon key
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

Click **Save** after each variable.

#### 3.4 Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for build
3. You'll see build logs in real-time
4. When complete, click **Visit** to see your live app!

Your app URL will be: `https://ssc-confession-room.vercel.app` (or similar)

#### 3.5 Configure CORS in Supabase

1. Go back to Supabase dashboard
2. **Settings** → **API**
3. Scroll to **CORS Configuration**
4. Add your Vercel URL: `https://ssc-confession-room.vercel.app`
5. Click **Save**

✅ **Vercel Deployment Complete!**

---

## Testing Your Deployment

### Test Checklist

1. **Visit your deployed URL**
   - Should see pink gradient background
   - Animated elements should be floating
   - Form should be visible

2. **Submit a test confession**
   - Type: "This is a test confession 💕"
   - Click "Send Confession"
   - Should see success message

3. **Verify in Supabase**
   - Go to Supabase → **Table Editor**
   - Click `confessions` table
   - Your test confession should appear!

4. **Check browser console**
   - Press F12
   - Look for errors (should be none)
   - Check Network tab for API calls

---

## Common Issues & Solutions

### ❌ "Failed to send confession"

**Causes:**
- Environment variables not set correctly
- Database table doesn't exist

**Solutions:**
1. Double-check `SUPABASE_URL` and `SUPABASE_ANON_KEY` in your deployment platform (use the **anon** key from Settings → API, not the service role key).
2. Run `supabase-schema.sql` again in Supabase SQL Editor.

### ❌ Build fails on Vercel

**Causes:**
- Missing dependencies
- Wrong Node.js version
- Build command incorrect

**Solutions:**
1. Check build logs for specific error
2. Ensure `package.json` has all dependencies
3. Add `.nvmrc` file with `18` if needed

### ❌ CORS errors in browser

**Causes:**
- Wrong Supabase URL or key in env vars (most common)
- Using the wrong API key (e.g. service role instead of anon)

**Solutions:**
1. Supabase’s Data API allows cross-origin requests by default; there is no CORS setting in the dashboard. Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` (anon/public key from **Settings → API**) are set correctly in your deployment platform.

### ❌ Animated elements not showing

**Causes:**
- CSS not loading
- Browser cache

**Solutions:**
1. Hard refresh (Ctrl+Shift+R)
2. Check browser console for CSS errors
3. Verify `main.css` is imported in `nuxt.config.ts`

---

## Updating Your App

### Making Changes

1. **Edit code locally**
2. **Test locally**: `npm run dev`
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. **Vercel** will auto-deploy (watch dashboard)

### Updating Environment Variables

**Vercel:**
1. Project → Settings → Environment Variables
2. Edit existing or add new
3. Redeploy (automatic)

---

## Database Management

### View Confessions

In Supabase SQL Editor:

```sql
SELECT * FROM confessions 
ORDER BY created_at DESC 
LIMIT 50;
```

### Export Confessions

1. Go to **Table Editor**
2. Click `confessions` table
3. Click **Export** (top right)
4. Choose CSV or JSON format

### Delete Confessions

**Delete all:**
```sql
DELETE FROM confessions;
```

**Delete older than 7 days:**
```sql
DELETE FROM confessions 
WHERE created_at < NOW() - INTERVAL '7 days';
```

---

## Cost Estimates

### Free Tier (Small Scale)

- **Supabase**: Free (500MB database, 2GB bandwidth)
- **Vercel**: Free (100GB bandwidth/month)

**Total**: $0/month

### Scaling Up

- **Supabase Pro**: $25/month (8GB database)
- **Vercel Pro**: $20/month (unlimited bandwidth)

---

## Support Resources

- **Nuxt Documentation**: https://nuxt.com/docs
- **Nuxt UI Documentation**: https://ui.nuxt.com
- **Supabase Documentation**: https://supabase.com/docs
- **Vercel Documentation**: https://vercel.com/docs
- **Digital Ocean Docs**: https://docs.digitalocean.com

---

## Next Steps

After deployment, consider:

1. ✅ Add custom domain (Vercel supports this)
2. ✅ Set up monitoring/analytics
3. ✅ Add rate limiting (prevent spam)
4. ✅ Create admin panel to view confessions
5. ✅ Add moderation features
6. ✅ Set up automated backups

---

**Need Help?** Check the main README.md for troubleshooting or review platform-specific documentation.
