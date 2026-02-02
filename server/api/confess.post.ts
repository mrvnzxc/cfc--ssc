import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl || process.env.SUPABASE_URL
  const supabaseAnonKey = config.public.supabaseAnonKey || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw createError({
      statusCode: 500,
      message: 'Server misconfiguration: Supabase credentials not set. Add SUPABASE_URL and SUPABASE_ANON_KEY in Vercel (or .env).'
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

  const { error } = await supabase
    .from('confessions')
    .insert([{ confession, created_at: new Date().toISOString() }])
    .select()

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message || 'Failed to save confession.'
    })
  }

  return { success: true }
})
