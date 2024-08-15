// import { Suspense } from 'react'
// import { cookies } from 'next/headers'

import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
// import { LoadingSpinner } from '@/components/loading-spinner'
// import {getSortedPosts} from '@/lib/utils'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { getPageSeo } from '@/lib/contentful'
import NovelEditor from '@/components/editor/NovelEditor'
import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'
import { getUserProfile } from '@/lib/actions/getUserProfile'
import Editor from '@/components/editor/Editor'

// async function fetchData() {
//   // const allPosts = await getAllPosts()
//   // const sortedPosts = getSortedPosts(allPosts)
//   const supabase = createServerComponentClient({ cookies })
//   const { data: sortedPosts } = await supabase.from('tweets').select()
//
//   return JSON.stringify(sortedPosts, null, 2)
// }

export default async function Blog({ params }) {
  const profile = await getUserProfile()
  const mentor = await getMentorByUsername(params?.guruUID)
  // const sortedPosts = await fetchData()
  // console.log(sortedPosts)

  const isCurrentUserMentor = profile?.id && profile?.username === params?.guruUID

  return (
    <ScrollArea className="min-h-screen">
      <FloatingHeader title="Writing" mentor={mentor} />
      {/*<Suspense fallback={<LoadingSpinner />}>*/}
      {/*  /!*<WritingListLayout list={sortedPosts} isMobile/>*!/*/}
      {/*  {sortedPosts}*/}
      {/*</Suspense>*/}
      {isCurrentUserMentor && <Editor username={mentor.username} />}
    </ScrollArea>
  )
}

export async function generateMetadata() {
  const seoData = await getPageSeo('writing')
  if (!seoData) return null

  const {
    seo: { title, description }
  } = seoData
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
