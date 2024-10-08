import { redirect } from 'next/navigation'

import { SideMenu } from '@/components/side-menu'
import { MenuContent } from '@/components/menu-content'

import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'
import { generateImagePathOnStore } from '@/lib/utils'
import { getUserProfile } from '@/lib/actions/getUserProfile'

export async function generateMetadata({ params }) {
  const mentor = await getMentorByUsername(params?.username)

  if (!mentor?.username) {
    return {
      title: 'IELTStify'
    }
  }

  return {
    title: mentor.full_name,
    description: `Learn IELTS with ${mentor.full_name}, an experienced mentor on IELTStify.`,
    openGraph: {
      title: mentor.full_name,
      description: `Learn IELTS with ${mentor.full_name}, an experienced mentor on IELTStify.`,
      images: [
        {
          url: generateImagePathOnStore(mentor.image_path),
          width: 1200,
          height: 630,
          alt: `Profile picture of ${mentor.username}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: mentor.full_name,
      description: `Learn IELTS with ${mentor.full_name}, an experienced mentor on IELTStify.`,
      images: [generateImagePathOnStore(mentor.image_path)]
    }
  }
}

export default async function MentorLayout({ children, params }) {
  const profile = await getUserProfile()
  const mentor = await getMentorByUsername(params?.username)

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
