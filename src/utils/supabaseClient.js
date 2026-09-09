import { createClient } from '@supabase/supabase-js'

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

// Auto-sanitize URL if user accidentally included /rest/v1/ or trailing slash
const sanitizedUrl = rawUrl
  ? rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '')
  : ''

export const isSupabaseConfigured = Boolean(
  sanitizedUrl && rawKey && sanitizedUrl.startsWith('http')
)

if (!isSupabaseConfigured) {
  console.warn(
    'Notice: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing in Vercel environment. Please configure them in Project Settings -> Environment Variables.'
  )
}

const supabaseUrl = isSupabaseConfigured ? sanitizedUrl : 'https://placeholder.supabase.co'
const supabaseAnonKey = isSupabaseConfigured ? rawKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: isSupabaseConfigured,
    autoRefreshToken: isSupabaseConfigured,
    detectSessionInUrl: isSupabaseConfigured,
  },
})


