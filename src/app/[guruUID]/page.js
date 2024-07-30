import { Suspense } from 'react'
import Link from 'next/link'

import { ScrollArea } from '@/components/scroll-area'
import { WritingList } from '@/components/writing-list'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { Button } from '@/components/ui/button'

import { getUserProfile } from '@/lib/actions/getUserProfile'
import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'

import { capitalizeFirstLetter, getItemsByYear, getSortedPosts } from '@/lib/utils'

import { getAllPosts } from '@/lib/contentful'

async function fetchData() {
  const allPosts = await getAllPosts()
  const sortedPosts = getSortedPosts(allPosts)
  const items = getItemsByYear(sortedPosts)
  return { items }
}

export default async function GuruHome({ params }) {
  const { items } = await fetchData()

  const profile = await getUserProfile()
  const mentor = await getMentorByUsername(params?.guruUID)

  const isCurrentUserMentor = profile?.username && profile.username === params.guruUID

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle={mentor?.full_name} mentor={mentor} user={profile} />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title={mentor.full_name} />
          <div>
            <p>{capitalizeFirstLetter(mentor?.short_info)}</p>
            <p>{capitalizeFirstLetter(mentor?.description)}</p>
            {isCurrentUserMentor && (
              <Link href="/account" className="text-gray-400 hover:underline">
                Edit
              </Link>
            )}
          </div>

          <Button asChild variant="link" className="inline px-0">
            <Link href={`/${params?.guruUID}/blog`}>
              <h2 className="mb-4 mt-8">Blog</h2>
            </Link>
          </Button>
          {!!items?.length && (
            <Suspense fallback={<p>loading...</p>}>
              <WritingList items={items} header="Writing" />
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
