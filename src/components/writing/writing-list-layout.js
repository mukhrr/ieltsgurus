'use client'

import { useParams, usePathname } from 'next/navigation'

import { WritingLink } from '@/components/writing-link'
import { cn } from '@/lib/utils'

export const WritingListLayout = ({ list, isMobile }) => {
  const pathname = usePathname()
  const params = useParams()

  return (
    <div className={cn(!isMobile && 'flex flex-col gap-1 text-sm')}>
      {list.length ? (
        list?.map((post) => {
          const isActive = pathname === `/${params.username}/blog/${post.id}`

          return (
            <WritingLink key={post.id} post={post} isMobile={isMobile} isActive={isActive} username={params.username} />
          )
        })
      ) : (
        <p>No post has been created yet :(</p>
      )}
    </div>
  )
}
