import { SideMenu } from '@/components/side-menu'
import { MenuContent } from '@/components/menu-content'
import { redirect } from 'next/navigation'
import { getUserProfile } from '@/lib/actions/getUserProfile'

export default async function GuruLayout({ children, params }) {
  const profile = await getUserProfile()

  if (profile?.username && params?.guruUID !== profile.username) redirect('/')

  return (
    <div className="lg:flex">
      <SideMenu className="relative hidden lg:flex">
        <MenuContent user={profile} />
      </SideMenu>
      <div className="flex flex-1">{children}</div>
    </div>
  )
}
