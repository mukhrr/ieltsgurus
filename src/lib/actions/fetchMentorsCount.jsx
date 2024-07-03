import supabase from '@/lib/supabase/client'

export const fetchMentorsCount = async () => {
  const { data } = await supabase.from('mentors').select('*')

  return data?.length
}
