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

import { defaultExtensions } from './extensions'
import { ColorSelector } from './selectors/color-selector'
import { LinkSelector } from './selectors/link-selector'
import { NodeSelector } from './selectors/node-selector'
import { TextButtons } from './selectors/text-buttons'
import GenerativeMenuSwitch from './generative/generative-menu-switch'
import { Button } from '@/components/ui/button'

import { defaultEditorContent } from '@/lib/mock-data/defaultEditorContent'

import { uploadFn } from './image-upload'
import { slashCommand, suggestionItems } from './slash-command'

// const hljs = require('highlight.js')

const extensions = [...defaultExtensions, slashCommand]

const NovelEditor = () => {
  const [initialContent, setInitialContent] = useState(null)
  const [editorState, setEditorState] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openAI, setOpenAI] = useState(false)

  // Apply Code block Highlighting on the HTML from editor.getHTML()
  // const highlightCodeblocks = (content) => {
  //   const doc = new DOMParser().parseFromString(content, 'text/html')
  //   doc.querySelectorAll('pre code').forEach((el) => {
  //     // @ts-ignore
  //     // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
  //     hljs.highlightElement(el)
  //   })
  //   return new XMLSerializer().serializeToString(doc)
  // }

  const debouncedUpdates = useDebouncedCallback(async (editor) => {
    const json = editor.getJSON()
    // window.localStorage.setItem('html-content', highlightCodeblocks(editor.getHTML()))
    // window.localStorage.setItem('markdown', editor.storage.markdown.getMarkdown())
    window.localStorage.setItem('novel-content', JSON.stringify(json))
  }, 500)

  const onSubmitPost = () => {
    setIsLoading(true)

    setTimeout(() => setIsLoading(false), 500)
  }

  const onCancel = () => {
    window.localStorage.removeItem('novel-content')
    if (editorState) editorState.commands.clearContent()
  }

  useEffect(() => {
    const content = window.localStorage.getItem('novel-content')
    if (content) setInitialContent(JSON.parse(content))
    else setInitialContent(defaultEditorContent)
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
          <Button variant="destructive" size="xs" onClick={onCancel}>
            Clear
          </Button>

          <Button size="xs" onClick={onSubmitPost} disabled={isLoading} className="flex  flex-nowrap gap-1">
            {isLoading ? <Loader className="animate-spin" size="18" /> : null} Done
          </Button>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(NovelEditor), { ssr: false })
