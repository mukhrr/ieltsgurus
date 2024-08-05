'use client'

import { EditorContent } from '@tiptap/react'
import { useMemo, useRef } from 'react'

import { ContentItemMenu, LinkMenu } from '@/components/menus'

import { useBlockEditor } from '@/hooks/useBlockEditor'

import '@/styles/tiptap/index.css'

import { EditorContext } from '@/context/EditorContext'
import ImageBlockMenu from '@/tiptap-extensions/image-block/components/image-block-menu'
import { ColumnsMenu } from '@/tiptap-extensions/multi-column/menus'
import { TableColumnMenu, TableRowMenu } from '@/tiptap-extensions/table/menus'
import { EditorHeader } from './components/editor-header'
import { TextMenu } from '../menus/text-menu'

export const BlockEditor = ({ ydoc, provider }) => {
  const menuContainerRef = useRef(null)

  const { editor, users, characterCount, collabState, leftSidebar } = useBlockEditor({ ydoc, provider })

  const displayedUsers = users.slice(0, 3)

  const providerValue = useMemo(() => {
    return {}
  }, [])

  if (!editor) {
    return null
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex h-full" ref={menuContainerRef}>
        {/*Table of contents*/}
        {/*<Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />*/}
        <div className="relative flex h-full flex-1 flex-col overflow-hidden">
          <EditorHeader
            characters={characterCount.characters()}
            collabState={collabState}
            users={displayedUsers}
            words={characterCount.words()}
            isSidebarOpen={leftSidebar.isOpen}
            toggleSidebar={leftSidebar.toggle}
          />
          <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </div>
      </div>
    </EditorContext.Provider>
  )
}

export default BlockEditor
