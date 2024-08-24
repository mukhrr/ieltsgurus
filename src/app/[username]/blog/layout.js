import { Suspense } from 'react'

import { SideMenu } from '@/components/side-menu'
import { LoadingSpinner } from '@/components/loading-spinner'
import { WritingListLayout } from '@/components/writing/writing-list-layout'

// import debug from 'debug'
// const log = debug('app:writing-layout')

async function fetchBlogPosts() {
  const res = await fetch(`${process.env.NEXT_PROJECT_API_URL}/api/blog`, { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts')
  }
  const data = await res.json()

  return data
}

export default async function WritingLayout({ children }) {
  const posts = await fetchBlogPosts()

  return (
    <>
      <SideMenu title="Blog" isInner>
        <Suspense fallback={<LoadingSpinner />}>
          <WritingListLayout list={posts} />
        </Suspense>
      </SideMenu>
      <div className="lg:bg-dots flex-1">{children}</div>
    </>
  )
}
