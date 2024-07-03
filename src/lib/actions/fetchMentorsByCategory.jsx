import supabase from '@/lib/supabase/client'

export const fetchMentorsByCategory = async (category) => {
  const { data, error } = await supabase.from('mentors').select('*').contains('categories', [category])

  if (error) {
    console.error('Error fetching mentors:', error)
    return []
  }

  return data
}
