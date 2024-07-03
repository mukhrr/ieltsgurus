import supabase from '@/lib/supabase/client'
import { convertFilterToColumnName } from '@/lib/utils'

const today = new Date()

const categoryFilters = [
  'Featured',
  'Reading Guru',
  'Writing Expert',
  'Speaking Practice Master',
  'Experienced in Listening'
]

const scoreFilters = {
  Niners: 9,
  'Overall 5+': 5,
  'Overall 6.5+': 6.5,
  'Overall 8': 8,
  'Most Recommended': 8
}

export const fetchMentorsByFilter = async ({ filters = ['newest'], keywords = '' }) => {
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
      query = query.gte('ielts_score.overall', scoreFilters[lowerCasedFilter])
    } else {
      console.error('Invalid filter:', filter)
      return []
    }
  }

  if (keywords) {
    query = query.ilike('fullName', `%${keywords}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching mentors:', error)
    return []
  }

  return data
}
