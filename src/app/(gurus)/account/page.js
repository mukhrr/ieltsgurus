import { redirect } from 'next/navigation'

import { getUserProfile } from '@/lib/actions/getUserProfile'
import GuruAccountForm from '@/app/(gurus)/account/guru-account-form'

export default async function AccountPage() {
  const profile = await getUserProfile()

  if (!profile?.id) redirect('/login')

  return <GuruAccountForm user={profile} />
}
