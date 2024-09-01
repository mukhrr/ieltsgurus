import { Suspense } from 'react'

import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import { WritingListLayout } from '@/components/writing/writing-list-layout'
import { LoadingSpinner } from '@/components/loading-spinner'
import Editor from '@/components/editor/Editor'

import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'
import { getUserProfile } from '@/lib/actions/getUserProfile'

async function fetchBlogPosts(username) {
  const res = await fetch(`${process.env.NEXT_PROJECT_API_URL}/api/blog?username=${encodeURIComponent(username)}`, { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts')
  }

  return await res.json()
}

export default async function Blog({ params }) {
  const profile = await getUserProfile()
  const mentor = await getMentorByUsername(params?.username)
  const posts = await fetchBlogPosts(params.username)

  const isCurrentUserMentor = profile?.id && profile?.username === params?.username

  return (
    <ScrollArea className="min-h-screen">
      <div className="block md:hidden">
        <FloatingHeader title="Writing" mentor={mentor} />
        <Suspense fallback={<LoadingSpinner />}>
          <WritingListLayout list={posts} isMobile />
        </Suspense>
      </div>
      <div className="hidden md:block">{isCurrentUserMentor && <Editor username={mentor.username} />}</div>
    </ScrollArea>
  )
}

export async function generateMetadata({ params }) {
  const title = `${params.username}'s blog on ieltstify`
  const description = `Read, enjoy, share ${params.username}'s posts!`

  const siteUrl = '/blog'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
