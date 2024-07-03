import supabase from '@/lib/supabase/client'

const today = new Date()

export const fetchMentorsByFilter = async ({ filter, name = '' }) => {
  let query = supabase.from('mentors').select('*')

  if (filter) {
    switch (filter) {
      case 'Featured':
      case 'Reading Guru':
      case 'Writing Expert':
      case 'Speaking Practice Master':
      case 'Experienced in Listening':
        query = query.contains('categories', [filter])
        break
      case 'Newest':
        today.setDate(today.getDate() - 7)
        query = query.gte('created_at', today.toISOString())
        break
      case 'Niners':
        query = query.eq('overall_score', 9)
        break
      case 'Overall 5+':
        query = query.gte('overall_score', 5)
        break
      case 'Overall 6.5+':
        query = query.gte('overall_score', 6.5)
        break
      case 'Overall 8':
      case 'Most Recommended':
        query = query.gte('overall_score', 8)
        break
      default:
        console.error('Invalid filter:', filter)
        return []
    }
  }

  if (name) {
    query = query.ilike('fullName', `%${name}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching mentors:', error)
    return []
  }

  return data
}
