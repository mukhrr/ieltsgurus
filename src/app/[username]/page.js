import { Suspense } from 'react'
import Link from 'next/link'

import { ScrollArea } from '@/components/scroll-area'
import { WritingList } from '@/components/writing-list'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { Button } from '@/components/ui/button'

import { getUserProfile } from '@/lib/actions/getUserProfile'
import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'

import { capitalizeFirstLetter, getItemsByYear } from '@/lib/utils'

async function fetchBlogPosts(username) {
  const res = await fetch(`${process.env.NEXT_PROJECT_API_URL}/api/blog?username=${encodeURIComponent(username)}`, { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts')
  }
  const data = await res.json()
  const items = getItemsByYear(data)

  return { items }
}

export default async function MentorHome({ params }) {
  const { items } = await fetchBlogPosts(params.username)

  const profile = await getUserProfile()
  const mentor = await getMentorByUsername(params?.username)

  const isCurrentUserMentor = profile?.username && profile.username === params.username

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle={mentor?.full_name} mentor={mentor} />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title={mentor.full_name} />
          <div className="group relative">
            <p>{capitalizeFirstLetter(mentor?.short_info)}</p>
            <p>{capitalizeFirstLetter(mentor?.description)}</p>
            {isCurrentUserMentor && (
              <Link
                href="/account"
                className="absolute bottom-0 right-0 hidden text-gray-400 hover:underline group-hover:block"
              >
                Edit
              </Link>
            )}
          </div>

          <Button asChild variant="link" className="inline px-0">
            <Link href={`/${params?.username}/blog`}>
              <h2 className="mb-4 mt-8">Blog</h2>
            </Link>
          </Button>
          {!!items?.length && (
            <Suspense fallback={<p>loading...</p>}>
              <WritingList items={items} header="Blog" username={params.username} />
            </Suspense>
          )}
          {!items?.length && (
            <p className="text-sm text-gray-500">
              {isCurrentUserMentor
                ? 'You have nothing to show. Start to share knowledge!'
                : `${mentor.full_name} hasn't written anything yet.`}
            </p>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
