'use client'

import { useState } from 'react'
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

import { ColorSelector } from './selectors/color-selector'
import { LinkSelector } from './selectors/link-selector'
import { NodeSelector } from './selectors/node-selector'
import { TextButtons } from './selectors/text-buttons'
import GenerativeMenuSwitch from './generative/generative-menu-switch'

import { defaultExtensions } from './helpers/extensions'

import { uploadFn } from './helpers/image-upload'
import { slashCommand, suggestionItems } from './helpers/slash-command'

const extensions = [...defaultExtensions, slashCommand]

const NovelEditor = ({ initialContent, editorClass, setEditorState }) => {
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openAI, setOpenAI] = useState(false)

  const debouncedUpdates = useDebouncedCallback(async (editor) => {
    if (setEditorState) setEditorState(editor)

    const json = editor.getJSON()
    window.localStorage.setItem('novel-content', JSON.stringify(json))
  }, 500)

  return (
    <EditorRoot>
      <EditorContent
        initialContent={initialContent}
        extensions={extensions}
        className={editorClass}
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
  )
}

export default dynamic(() => Promise.resolve(NovelEditor), { ssr: false })
