import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = (config.public.supabaseUrl || process.env.SUPABASE_URL || '').trim()
  const supabaseAnonKey = (config.public.supabaseAnonKey || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '').trim()

  if (!supabaseUrl || !supabaseAnonKey) {
    throw createError({
      statusCode: 500,
      message: 'Supabase credentials not set. In Vercel: Project → Settings → Environment Variables → add SUPABASE_URL and SUPABASE_ANON_KEY, then redeploy.'
    })
  }

  const body = await readBody<{ confession: string }>(event)
  const confession = body?.confession?.trim()

  if (!confession) {
    throw createError({
      statusCode: 400,
      message: 'Confession text is required.'
    })
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const { data, error } = await supabase
    .from('confessions')
    .insert([{ confession, created_at: new Date().toISOString() }])
    .select()

  if (error) {
    const message = error.message || 'Failed to save confession.'
    throw createError({ statusCode: 400, message })
  }

  return { success: true, id: data?.[0]?.id }
})
