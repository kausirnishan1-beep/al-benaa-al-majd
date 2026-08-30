import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lcbwpykligrzpfthycay.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Cfz_pCyPnASyrQ73gnDtUw_sge_u1rB'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

