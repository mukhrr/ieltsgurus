import supabase from '@/lib/supabase/client'

export async function getUserProfile(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId)

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  if (data && data.length > 0) {
    return data[0] // Assuming userId is unique, so we return the first result
  }

  return null
}
