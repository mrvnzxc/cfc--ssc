# Fix "Invalid API key" on Vercel

Follow these steps **in order**. After adding variables you must **redeploy** or they won’t be used.

---

## 0. Check what the server actually sees (debug)

After you’ve added env vars and redeployed, open this URL in your browser:

**`https://YOUR-VERCEL-APP.vercel.app/api/check-env`**

(Replace `YOUR-VERCEL-APP` with your actual Vercel project URL.)

- If it says **`supabaseAnonKey: "NOT SET"`** → Vercel isn’t passing the variable. Check the variable name is exactly `SUPABASE_ANON_KEY` and redeploy.
- If both are **set** but you still get "Invalid API key" when submitting → the **value** is wrong (wrong key, wrong project, or truncated). Try the other key format below.

---

## 1. Get your Supabase values

1. Go to **[supabase.com/dashboard](https://supabase.com/dashboard)** and open your project.
2. Click **Settings** (gear icon in the left sidebar).
3. Click **API** in the left sidebar.
4. Copy these two values (keep this tab open):
   - **Project URL** — e.g. `https://abcdefgh.supabase.co` (no trailing slash).
   - **Key to use** — use **one** of these (both work with this app):
     - **anon / public** key — the long JWT starting with `eyJ...`, or  
     - **Publishable** key — starts with `sb_publishable_...`  
     Do **not** use the **service_role** or **secret** key.
5. **Important:** URL and key must be from the **same** Supabase project.

---

## 2. Add them in Vercel

1. Go to **[vercel.com](https://vercel.com)** and log in.
2. Open the project that’s connected to this repo (e.g. `cfc--ssc`).
3. Click **Settings** in the top menu.
4. In the left sidebar, click **Environment Variables**.
5. Add the first variable:
   - Click **Add New** (or **Add**).
   - **Key:** `SUPABASE_URL`
   - **Value:** paste the **Project URL** from Supabase (step 1).
   - Under **Environments**, tick: **Production**, **Preview**, **Development**.
   - Click **Save**.
6. Add the second variable:
   - Click **Add New** again.
   - **Key:** `SUPABASE_ANON_KEY`
   - **Value:** paste the **anon** or **publishable** key from Supabase (`eyJ...` or `sb_publishable_...`). Copy the whole key with no extra spaces or line breaks.
   - Under **Environments**, tick: **Production**, **Preview**, **Development**.
   - Click **Save**.

---

## 3. Redeploy (required)

Environment variables only apply to **new** deployments.

1. In Vercel, open your project.
2. Click the **Deployments** tab.
3. Find the latest deployment.
4. Click the **⋯** (three dots) on the right.
5. Click **Redeploy**.
6. Leave **Use existing Build Cache** as is and confirm **Redeploy**.
7. Wait until the deployment status is **Ready** (usually 1–2 minutes).
8. Open your live URL and try submitting a confession again.

---

## Checklist

- [ ] Copied **Project URL** from Supabase → Settings → API.
- [ ] Copied **anon public** key (starts with `eyJ...`) from Supabase → Settings → API.
- [ ] Added **SUPABASE_URL** in Vercel → Settings → Environment Variables.
- [ ] Added **SUPABASE_ANON_KEY** in Vercel → Settings → Environment Variables.
- [ ] Selected **Production**, **Preview**, and **Development** for both.
- [ ] Clicked **Redeploy** on the latest deployment and waited for it to finish.

---

## If it still says "Invalid API key"

1. **Open `/api/check-env`** (see section 0) and confirm both `supabaseUrl` and `supabaseAnonKey` show **set**. If either is NOT SET, fix the variable name in Vercel and redeploy.
2. **Try the other key:** In Supabase → Settings → API, try copying the **publishable** key (`sb_publishable_...`) if you used the anon JWT, or the **anon** key (`eyJ...`) if you used the publishable one. Update `SUPABASE_ANON_KEY` in Vercel and redeploy.
3. **Same project:** URL and key must be from the **same** Supabase project. If you have multiple projects, double-check.
4. **No extra characters:** When pasting in Vercel, ensure there are no spaces or line breaks at the start/end of the value. You can delete the variable and add it again.
5. **Redeploy:** After any change to env vars, use Deployments → ⋯ → Redeploy.

If you see **"Supabase credentials not set"** instead, the app isn’t seeing the variables — check Key names are exactly `SUPABASE_URL` and `SUPABASE_ANON_KEY` (no typos).
