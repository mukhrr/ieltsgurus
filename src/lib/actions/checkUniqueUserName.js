import supabase from '@/lib/supabase/client'

export const checkUsernameUniqueness = async ({ username, currentUsername, setIsLoading, form }) => {
  if (username === currentUsername) return

  setIsLoading(true)
  try {
    const { data: existingUser, error } = await supabase
      .from('mentors')
      .select('username')
      .eq('username', username)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking username:', error)
      return
    }

    if (existingUser && existingUser?.username !== currentUsername) {
      form.setError('username', {
        type: 'manual',
        message: 'This username is already taken. Please choose another.'
      })
    } else {
      form.clearErrors('username')
    }
  } catch (error) {
    console.error('Error checking username:', error)
  } finally {
    setIsLoading(false)
  }
}
