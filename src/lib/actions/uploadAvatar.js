import supabase from '@/lib/supabase/client'
import { toast } from 'sonner'

export async function uploadAvatar(file, userId) {
  const fileName = `${userId}/${new Date().getTime()}_${file.name}`

  const { error } = await supabase.storage.from('avatars').upload(fileName, file, {
    upsert: true
  })

  if (error) {
    console.log(error)
    toast.error('Error while uploading avatar')
    return null
  }

  const { publicURL } = supabase.storage.from('avatars').getPublicUrl(fileName)

  return publicURL
}

export async function updateUserProfileAvatar(userId, avatarUrl) {
  const { data, error } = await supabase.from('profiles').update({ avatar_url: avatarUrl }).eq('id', userId)

  if (error) {
    toast.error(error)
    return null
  }

  return data
}
