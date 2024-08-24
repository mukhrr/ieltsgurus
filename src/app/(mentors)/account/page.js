import { getUserProfile } from '@/lib/actions/getUserProfile'
import { redirect } from 'next/navigation'

import MentorAccountForm from '@/app/(mentors)/account/mentor-account-form'
import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'

export const revalidate = 180

export default async function AccountPage() {
  const profile = await getUserProfile()
  const mentor = await getMentorByUsername(profile?.username)

  if (!profile?.id) redirect('/login')

  return <MentorAccountForm user={mentor?.username ? mentor : profile} />
}
