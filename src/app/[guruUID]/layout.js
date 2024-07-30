import { redirect } from 'next/navigation'

import { SideMenu } from '@/components/side-menu'
import { MenuContent } from '@/components/menu-content'

import { getUserProfile } from '@/lib/actions/getUserProfile'
import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'

export default async function GuruLayout({ children, params }) {
  const profile = await getUserProfile()
  const mentor = await getMentorByUsername(params?.guruUID)

  if (!mentor?.username) redirect('/')

  return (
    <div className="lg:flex">
      <SideMenu className="relative hidden lg:flex">
        <MenuContent mentor={mentor} user={profile} />
      </SideMenu>
      <div className="flex flex-1">{children}</div>
    </div>
  )
}
