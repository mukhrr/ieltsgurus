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

const extensions = [...defaultExtensions, slashCommand]

const NovelEditor = ({ username }) => {
  const router = useRouter()
  const [initialContent, setInitialContent] = useState(null)
  const [editorState, setEditorState] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openAI, setOpenAI] = useState(false)

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

  const debouncedUpdates = useDebouncedCallback(async (editor) => {
    const json = editor.getJSON()
    setInitialContent(json)
    setIsDisabled(false)
    window.localStorage.setItem('novel-content', JSON.stringify(json))
    window.localStorage.setItem('novel-html', editor.getHTML())
    window.localStorage.setItem('markdown', editor.storage.markdown.getMarkdown())
  }, 500)

  useEffect(() => {
    const content = window.localStorage.getItem('novel-content')
    if (content) {
      setInitialContent(JSON.parse(content))
      setIsDisabled(false)
    } else setInitialContent(defaultEditorContent)
  }, [])

  if (!initialContent) return null

  return (
    <div className="relative w-full max-w-screen-lg">
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          className="relative min-h-screen w-full max-w-screen-lg border-muted bg-background sm:rounded-lg sm:border sm:shadow-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event)
            },
            handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: 'prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full'
            }
          }}
          onUpdate={({ editor }) => {
            setEditorState(editor)
            debouncedUpdates(editor)
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>

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

export default dynamic(() => Promise.resolve(NovelEditor), { ssr: false })
