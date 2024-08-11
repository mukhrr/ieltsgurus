import { EditorBubble, useEditor } from 'novel'
import { removeAIHighlight } from 'novel/extensions'
import { Fragment, useEffect } from 'react'

import { AiSelector } from './ai-selector'
import { Button } from '@/components/ui/button'
import Magic from '@/components/ui/icons/magic'

const GenerativeMenuSwitch = ({ children, open, onOpenChange }) => {
  const { editor } = useEditor()

  useEffect(() => {
    if (!open) removeAIHighlight(editor)
  }, [open])

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? 'bottom-start' : 'top'
      }}
      className="border-muted flex w-fit max-w-[90vw] overflow-hidden rounded-md border bg-background shadow-xl backdrop-blur"
    >
      {/*{open && <AiSelector open={open} onOpenChange={onOpenChange} />}*/}
      {!open && (
        <Fragment>
          {/*<Button*/}
          {/*  className="gap-1 rounded-none text-purple-500"*/}
          {/*  variant="ghost"*/}
          {/*  onClick={() => onOpenChange(true)}*/}
          {/*  size="sm"*/}
          {/*>*/}
          {/*  <Magic className="h-5 w-5" />*/}
          {/*  Ask AI*/}
          {/*</Button>*/}
          {children}
        </Fragment>
      )}
    </EditorBubble>
  )
}

export default GenerativeMenuSwitch
