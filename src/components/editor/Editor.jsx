'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import NovelEditor from '@/components/editor/NovelEditor'

import { defaultEditorContent } from '@/lib/mock-data/defaultEditorContent'
import useEditorEmpty from '@/hooks/useEditorEmpty'

const Editor = ({ username }) => {
  const router = useRouter()
  const [editorState, setEditorState] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [initialContent, setInitialContent] = useState(null)

  // TODO: fix the custom hook so that it returns correct boolean
  const isDisabled = useEditorEmpty(initialContent)

  const handleSubmit = async (event) => {
    if (isDisabled) return

    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mentor_username: username,
          title: 'Title',
          content: JSON.stringify(initialContent)
        })
      })

      toast.success('Post created successfully. Redirecting to the post...')
      const data = await response.json()

      if (data && data.id) {
        router.push(`/${username}/blog/${data.id}`)
        window.localStorage.removeItem('novel-content')
      }
    } catch (err) {
      toast.error(err.message)
      throw new Error(err.message || 'Failed to submit post')
    } finally {
      setIsLoading(false)
    }
  }

  const onCancel = () => {
    window.localStorage.removeItem('novel-content')
    if (editorState) editorState.commands.clearContent()
  }

  useEffect(() => {
    const content = window.localStorage.getItem('novel-content')

    if (content) setInitialContent(JSON.parse(content))
    else setInitialContent(defaultEditorContent)
  }, [editorState])

  if (!initialContent) return null

  return (
    <div className="content relative w-full">
      <NovelEditor
        initialContent={initialContent}
        setEditorState={setEditorState}
        editorClass="relative min-h-screen w-full max-w-screen-lg border-muted bg-background sm:rounded-lg sm:border sm:shadow-lg"
      />

      <div className="sticky -bottom-1 right-0 z-10 w-full bg-transparent p-2 pl-12 shadow-2xl backdrop-blur">
        <div className="flex justify-end gap-2">
          {editorState && (
            <Button variant="destructive" size="xs" onClick={onCancel}>
              Clear
            </Button>
          )}

          <Button
            size="xs"
            onClick={handleSubmit}
            disabled={isLoading || isDisabled}
            className="flex  flex-nowrap gap-1"
          >
            {isLoading ? <Loader className="animate-spin" size="18" /> : null} Publish
          </Button>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Editor), { ssr: false })
