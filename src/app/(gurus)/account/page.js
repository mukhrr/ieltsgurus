export const revalidate = 180

import { redirect } from 'next/navigation'
import GuruAccountForm from '@/app/(gurus)/account/guru-account-form'
import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'

export default async function AccountPage() {
  const mentor = await getMentorByUsername()

  if (!mentor?.id) redirect('/login')

  return <GuruAccountForm user={mentor} />
}
