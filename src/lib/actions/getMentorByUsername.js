import supabase from '@/lib/supabase/client'
import { getUserProfile } from '@/lib/actions/getUserProfile'

export async function getMentorByUsername(username) {
  const profile = await getUserProfile()

  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .eq('username', username || profile?.username)

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  if (data && data.length > 0) {
    return data[0]
  }

  return profile
}
