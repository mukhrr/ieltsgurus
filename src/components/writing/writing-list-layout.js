'use client'

import { usePathname } from 'next/navigation'

import { WritingLink } from '@/components/writing-link'
// import { useViewData } from '@/hooks/useViewData'
import { cn } from '@/lib/utils'

export const WritingListLayout = ({ list, isMobile }) => {
  const viewData = ['']
  const pathname = usePathname()

  return (
    <div className={cn(!isMobile && 'flex flex-col gap-1 text-sm')}>
      {list.length ? (
        list?.map((post) => {
          const viewCount = viewData?.find((item) => item.slug === post.slug)?.view_count
          const isActive = pathname === `/writing/${post.slug}`

          return (
            <WritingLink key={post.slug} post={post} viewCount={viewCount} isMobile={isMobile} isActive={isActive} />
          )
        })
      ) : (
        <p>You haven't started writing yet</p>
      )}
    </div>
  )
}
