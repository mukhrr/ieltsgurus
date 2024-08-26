'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Copy, Loader, Send, Share } from 'lucide-react'
import dynamic from 'next/dynamic'
import { toast } from 'sonner'

import { FloatingHeader } from '@/components/floating-header'
import { WritingViews } from '@/components/writing-views'
import { ScrollArea } from '@/components/scroll-area'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Button } from '@/components/ui/button'
import NovelEditor from '@/components/editor/NovelEditor'
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils'

import { defaultUrl } from '@/app/shared-metadata'

const SingleBlogPost = ({ id, username }) => {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [initialContent, setInitialContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
    const updatedPost = localStorage.getItem('novel-content')

    setIsLoading(true)
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updatedPost, title: updatedPost?.content[0]?.content[0]?.text || 'Title' })
      })

      if (!res.ok) {
        throw new Error('Failed to update blog post')
      }
      setIsEditing(false)

      return res.json()
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        throw new Error('Failed to delete blog post')
      }

      toast.success('Post deleted successfully')
      router.push(`/${username}/blog`)
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
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
        className={cn('relative pt-4', {
          'overflow-hidden': isLoading
        })}
      >
        {(!isEditing || isLoading) && (
          <div
            className={cn('absolute bottom-0 left-0 top-0 z-40 min-h-screen min-w-full', {
              'animate-pulse bg-gray-100': isEditing
            })}
          />
        )}
        <article className="content min-h-screen">
          <NovelEditor initialContent={initialContent} />

          <div className="sticky -bottom-1 right-0 z-50 w-full bg-transparent p-2 pl-12 shadow-2xl backdrop-blur">
            {isCurrentUserMentor ? (
              <div className="flex items-center justify-between">
                <ShareButton />

                {isEditing ? (
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="destructive" size="xs" onClick={onCancel}>
                      Cancel
                    </Button>

                    <Button size="xs" onClick={updatePost} disabled={isLoading} className="flex  flex-nowrap gap-1">
                      {isLoading ? <Loader className="animate-spin" size="18" /> : null}{' '}
                      {isLoading ? 'Publishing...' : 'Publish'}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="destructive" size="xs" onClick={() => setIsDeleteDialogOpen(true)}>
                      Delete
                    </Button>

                    <Button size="xs" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <ShareButton />
            )}
          </div>
        </article>
      </div>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
        isDeleting={isLoading}
      />
    </ScrollArea>
  )
}

const ShareButton = () => {
  const pathname = window.location.pathname
  const url = defaultUrl + pathname

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    toast.success('Link copied!')
  }

  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`
    window.open(telegramUrl, '_blank')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Share className="cursor-point" />
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={4} align="start">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-2">
            <span onClick={handleCopy} aria-hidden="true" className="flex cursor-pointer items-center gap-1">
              <Copy className="w-10 text-gray-500" /> Copy
            </span>
            <span onClick={handleTelegramShare} aria-hidden="true" className="flex cursor-pointer items-center gap-1">
              <Send className="w-10 text-gray-500" /> Share on Telegram
            </span>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default dynamic(() => Promise.resolve(SingleBlogPost), { ssr: false })
