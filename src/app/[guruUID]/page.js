import { Suspense } from 'react'

import { ScrollArea } from '@/components/scroll-area'
import { LoadingSpinner } from '@/components/loading-spinner'
import { WritingList } from '@/components/writing-list'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { getAllPosts } from '@/lib/contentful'
import { getSortedPosts, getItemsByYear } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

async function fetchData() {
  const allPosts = await getAllPosts()
  const sortedPosts = getSortedPosts(allPosts)
  const items = getItemsByYear(sortedPosts)
  return { items }
}

export default async function GuruHome({ params }) {
  const { items } = await fetchData()
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  console.log(params)
  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle="IELTS Gurus" />
      <div className="content-wrapper animate-in">
        <div className="content">
          <PageTitle title="Home" className="lg:hidden" />

          <Suspense fallback={<LoadingSpinner />}>
            <WritingList items={items} header="Writing" />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
