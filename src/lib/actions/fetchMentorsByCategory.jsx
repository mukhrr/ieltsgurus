import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const fetchMentorsByCategory = async (category) => {
  const { data, error, loading } = await supabase.from('mentors').select('*').contains('categories', [category])
  console.log(loading)
  if (error) {
    console.error('Error fetching mentors:', error)
    return []
  }

  return data
}
