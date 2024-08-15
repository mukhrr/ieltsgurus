'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { FloatingHeader } from '@/components/floating-header'
import { WritingViews } from '@/components/writing-views'
import { ScrollArea } from '@/components/scroll-area'
import { PageTitle } from '@/components/page-title'
import { jsonToMarkdown } from '@/components/editor/utils/jsonToMarkdown'

const SingleBlogPost = ({ id, username }) => {
  const [post, setPost] = useState(null)
  const [htmlWithMarkdown, setHtmlWithMarkdown] = useState('')

  useEffect(() => {
    if (id) fetchPost(id)
  }, [id])

  const fetchPost = async (postId) => {
    try {
      const response = await fetch(`/api/blog/${postId}`)
      if (!response.ok) throw new Error('Failed to fetch post')
      const data = await response.json()
      setPost(data)
      const htmlContent = jsonToMarkdown(data.content)
      setHtmlWithMarkdown(htmlContent)
    } catch (error) {
      console.error('Error fetching post:', error)
    }
  }

  if (!post) return <div>Loading...</div>

  return (
    <ScrollArea className="bg-white" useScrollAreaId>
      <FloatingHeader scrollTitle={post.title} goBackLink={`/${username}/blog`}>
        <WritingViews slug={id} />
      </FloatingHeader>
      <div className="content-wrapper">
        <article className="content">
          <PageTitle
            title={post.title}
            subtitle={
              <time dateTime={post.createdAt} className="text-gray-400" suppressHydrationWarning>
                {post.createdAt}
              </time>
            }
            className="mb-6 flex flex-col gap-3"
          />

          <ReactMarkdown remarkPlugins={[remarkGfm]}>{`${htmlWithMarkdown}`}</ReactMarkdown>
        </article>
      </div>
    </ScrollArea>
  )
}

export default SingleBlogPost
