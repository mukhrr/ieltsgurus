import { Suspense } from 'react'

import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import { LoadingSpinner } from '@/components/loading-spinner'
import { getPageSeo } from '@/lib/contentful'
// import {getSortedPosts} from '@/lib/utils'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

async function fetchData() {
  // const allPosts = await getAllPosts()
  // const sortedPosts = getSortedPosts(allPosts)
  const supabase = createServerComponentClient({ cookies })
  const { data: sortedPosts } = await supabase.from('tweets').select()

  return JSON.stringify(sortedPosts, null, 2)
}

export default async function Writing() {
  const sortedPosts = await fetchData()
  // console.log(sortedPosts)

  return (
    <ScrollArea className="lg:hidden">
      <FloatingHeader title="Writing" />
      <Suspense fallback={<LoadingSpinner />}>
        {/*<WritingListLayout list={sortedPosts} isMobile/>*/}
        {sortedPosts}
      </Suspense>
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
