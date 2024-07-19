import supabase from '@/lib/supabase/client'
import { convertFilterToColumnName } from '@/lib/utils'

const today = new Date()

const categoryFilters = ['featured', 'reading', 'writing', 'speaking', 'listening', 'recommended']

const scoreFilters = {
  niners: 9,
  overall_6: 6,
  overall_7: 7,
  overall_8: 8,
  most_recommended: 8
}

export const fetchMentorsByFilter = async ({ filters = [], keywords = '' }) => {
  let query = supabase.from('mentors').select('*')

  if (filters.includes('newest')) {
    today.setDate(today.getDate() - 7)
    query = query.gte('created_at', today.toISOString())
  }

  for (const filter of filters) {
    const lowerCasedFilter = convertFilterToColumnName(filter)
    if (categoryFilters.includes(lowerCasedFilter)) {
      query = query.contains('categories', [lowerCasedFilter])
    } else if (scoreFilters[lowerCasedFilter] !== undefined) {
      query = query.gte('ielts_score->overall', scoreFilters[lowerCasedFilter])
    } else {
      console.error('Invalid filter:', filter)
      return []
    }
  }

  if (keywords) {
    query = query.ilike('full_name', `%${keywords}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching mentors:', error)
    return []
  }

  return data
}
