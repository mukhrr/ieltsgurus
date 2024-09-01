import supabase from '@/lib/supabase/client'
import { createClient } from '@/lib/supabase/server'

export async function getUserProfile() {
  const serverSupabase = createClient()

  const {
    data: { user }
  } = await serverSupabase.auth.getUser()
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user?.id)

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  if (data && data.length > 0) {
    return data[0]
  }

  return null
}
