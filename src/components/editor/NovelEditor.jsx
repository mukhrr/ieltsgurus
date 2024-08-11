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

import { defaultExtensions } from './extensions'
import { ColorSelector } from './selectors/color-selector'
import { LinkSelector } from './selectors/link-selector'
import { NodeSelector } from './selectors/node-selector'

import { defaultEditorContent } from '@/lib/mock-data/defaultEditorContent'

import GenerativeMenuSwitch from './generative/generative-menu-switch'
import { uploadFn } from './image-upload'
import { TextButtons } from './selectors/text-buttons'
import { slashCommand, suggestionItems } from './slash-command'

// const hljs = require('highlight.js')

const extensions = [...defaultExtensions, slashCommand]

const NovelEditor = () => {
  const [initialContent, setInitialContent] = useState(null)
  const [saveStatus, setSaveStatus] = useState('Saved')
  const [charsCount, setCharsCount] = useState(0)

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
    setCharsCount(editor.storage.characterCount.words())
    // window.localStorage.setItem('html-content', highlightCodeblocks(editor.getHTML()))
    // window.localStorage.setItem('markdown', editor.storage.markdown.getMarkdown())
    window.localStorage.setItem('novel-content', JSON.stringify(json))

    setSaveStatus('Saved')
  }, 500)

  useEffect(() => {
    const content = window.localStorage.getItem('novel-content')
    if (content) setInitialContent(JSON.parse(content))
    else setInitialContent(defaultEditorContent)
  }, [])

  if (!initialContent) return null

  return (
    <div className="relative h-screen w-full max-w-screen-lg">
      <div className="absolute right-5 top-5 z-10 mb-5 flex gap-2">
        <div className="bg-accent text-muted-foreground rounded-lg px-2 py-1 text-sm">{saveStatus}</div>
        <div className={charsCount ? 'bg-accent text-muted-foreground rounded-lg px-2 py-1 text-sm' : 'hidden'}>
          {charsCount} Words
        </div>
      </div>
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          className="border-muted relative min-h-screen w-full max-w-screen-lg bg-background sm:rounded-lg sm:border sm:shadow-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => {
                if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
                  return false
                }
                handleCommandNavigation(event)
              }
            },
            handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: 'prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full'
            }
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor)
            setSaveStatus('Saving...')
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="border-muted z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="text-muted-foreground px-2">No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command(val)}
                  className="hover:bg-accent aria-selected:bg-accent flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm"
                  key={item.title}
                >
                  <div className="border-muted flex h-10 w-10 items-center justify-center rounded-md border bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground text-xs">{item.description}</p>
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
    </div>
  )
}

export default dynamic(() => Promise.resolve(NovelEditor), { ssr: false })
