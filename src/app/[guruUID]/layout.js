import { redirect } from 'next/navigation'

import { SideMenu } from '@/components/side-menu'
import { MenuContent } from '@/components/menu-content'

import { getUserProfile } from '@/lib/actions/getUserProfile'
import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'
import { generateImagePathOnStore } from '@/lib/utils'

export async function generateMetadata({ params }) {
  const mentor = await getMentorByUsername(params?.guruUID)

  if (!mentor?.username) {
    return {
      title: 'IELTS GURUS'
    }
  }

  return {
    title: mentor.full_name,
    description: `Learn IELTS with ${mentor.full_name}, an experienced mentor on IELTS GURUS.`,
    openGraph: {
      title: mentor.full_name,
      description: `Learn IELTS with ${mentor.full_name}, an experienced mentor on IELTS GURUS.`,
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
      description: `Learn IELTS with ${mentor.full_name}, an experienced mentor on IELTS GURUS.`,
      images: [generateImagePathOnStore(mentor.image_path)]
    }
  }
}

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
