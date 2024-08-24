'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import dynamic from 'next/dynamic'

import { FloatingHeader } from '@/components/floating-header'
import { WritingViews } from '@/components/writing-views'
import { ScrollArea } from '@/components/scroll-area'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Button } from '@/components/ui/button'
import NovelEditor from '@/components/editor/NovelEditor'

import { cn } from '@/lib/utils'

const SingleBlogPost = ({ id, username }) => {
  const params = useParams()
  const [post, setPost] = useState(null)
  const [initialContent, setInitialContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const isCurrentUserMentor = params?.username === username

  const fetchPost = async (postId) => {
    try {
      const response = await fetch(`/api/blog/${postId}`)

      if (!response.ok) throw new Error('Failed to fetch post')

      const data = await response.json()
      setPost(data)
      const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content

      setInitialContent(content)
    } catch (error) {
      console.error('Error fetching post:', error)
    }
  }

  const updatePost = async () => {
    if (!isEditing) return

    setIsLoading(true)
  }

  const onCancel = () => {
    setIsEditing(false)
    fetchPost(id)
  }

  useEffect(() => {
    if (id) fetchPost(id)
  }, [id])

  useEffect(() => {
    return () => localStorage.removeItem('novel-content')
  }, [])

  if (!post) return <LoadingSpinner />

  return (
    <ScrollArea className="bg-white" useScrollAreaId>
      <FloatingHeader scrollTitle={post.title} goBackLink={`/${username}/blog`}>
        <WritingViews slug={id} />
      </FloatingHeader>
      <div
        className={cn('content-wrapper', {
          'overflow-hidden': isLoading
        })}
      >
        {(!isEditing || isLoading) && (
          <div
            className={cn('absolute left-0 top-0 z-40 min-h-full min-w-full', {
              'animate-pulse bg-gray-100': isEditing
            })}
          />
        )}
        <article className="content h-full">
          <NovelEditor initialContent={initialContent} />

          {isCurrentUserMentor && (
            <div className="sticky -bottom-1 right-0 z-50 w-full bg-transparent p-2 pl-12 shadow-2xl backdrop-blur">
              {isEditing ? (
                <div className="flex justify-end gap-2">
                  <Button variant="destructive" size="xs" onClick={onCancel}>
                    Cancel
                  </Button>

                  <Button size="xs" onClick={updatePost} disabled={isLoading} className="flex  flex-nowrap gap-1">
                    {isLoading ? <Loader className="animate-spin" size="18" /> : null}{' '}
                    {isLoading ? 'Publishing...' : 'Publish'}
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end gap-2">
                  <Button variant="destructive" size="xs" onClick={() => {}}>
                    Delete
                  </Button>

                  <Button size="xs" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                </div>
              )}
            </div>
          )}
        </article>
      </div>
    </ScrollArea>
  )
}

export default dynamic(() => Promise.resolve(SingleBlogPost), { ssr: false })
