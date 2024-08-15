'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot
} from 'novel'
import { handleCommandNavigation, ImageResizer } from 'novel/extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { useDebouncedCallback } from 'use-debounce'
import { Separator } from '@radix-ui/react-select'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ColorSelector } from './selectors/color-selector'
import { LinkSelector } from './selectors/link-selector'
import { NodeSelector } from './selectors/node-selector'
import { TextButtons } from './selectors/text-buttons'
import GenerativeMenuSwitch from './generative/generative-menu-switch'
import { Button } from '@/components/ui/button'

import { defaultExtensions } from './extensions'
import { defaultEditorContent } from '@/lib/mock-data/defaultEditorContent'

import { uploadFn } from './image-upload'
import { slashCommand, suggestionItems } from './slash-command'
import NovelEditor from '@/components/editor/NovelEditor'

const Editor = ({ username }) => {
  const router = useRouter()
  const [editorState, setEditorState] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [initialContent, setInitialContent] = useState(null)

  const handleSubmit = async (event) => {
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
    if (content) {
      setInitialContent(JSON.parse(content))
      setIsDisabled(false)
    } else setInitialContent(defaultEditorContent)

    return () => localStorage.removeItem('novel-content')
  }, [editorState])

  if (!initialContent) return null

  return (
    <div className="relative w-full max-w-screen-lg">
      <NovelEditor
        initialContent={initialContent}
        setInitialContent={setInitialContent}
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
            {isLoading ? <Loader className="animate-spin" size="18" /> : null} Done
          </Button>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Editor), { ssr: false })
