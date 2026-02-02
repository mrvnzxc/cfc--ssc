/**
 * Debug endpoint: check if Supabase env vars are set on the server.
 * Visit: https://your-app.vercel.app/api/check-env
 * (Remove or restrict this in production if you prefer.)
 */
export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  const url = (config.public.supabaseUrl || process.env.SUPABASE_URL || '').trim()
  const key = (config.public.supabaseAnonKey || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '').trim()

  const keyPreview = key ? `${key.slice(0, 15)}... (length ${key.length})` : 'not set'

  return {
    supabaseUrl: url ? 'set' : 'NOT SET',
    supabaseUrlLength: url.length,
    supabaseAnonKey: key ? 'set' : 'NOT SET',
    keyPreview: key ? keyPreview : 'not set',
    hint: !url || !key
      ? 'Add SUPABASE_URL and SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables, then redeploy.'
      : key.startsWith('eyJ')
        ? 'Using JWT (anon) key.'
        : key.startsWith('sb_')
          ? 'Using publishable/secret key format.'
          : 'Key should start with eyJ (anon) or sb_ (publishable). Check you copied the full key.',
  }
})
