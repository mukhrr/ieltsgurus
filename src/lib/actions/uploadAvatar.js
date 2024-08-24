import supabase from '@/lib/supabase/client'
import { toast } from 'sonner'

export async function uploadAvatar(file, userId) {
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(`${userId}/${Date.now()}.png`, file)

  if (uploadError) toast.error(uploadError)

  const {
    data: { publicUrl }
  } = supabase.storage.from('avatars').getPublicUrl(uploadData.path)

  return { publicUrl }
}
