import supabase from '@/lib/supabase/client'

export async function getMentorByUsername(username) {
  const { data, error } = await supabase.from('mentors').select('*').eq('username', username)

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  if (data && data.length > 0) {
    return data[0]
  }

  return null
}
