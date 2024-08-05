import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import { useCallback, useState } from 'react'

import { LinkPreviewPanel } from '@/components/panels/link-preview-panel'
import { LinkEditorPanel } from '@/components/panels/link-editor-panel'

export const LinkMenu = ({ editor, appendTo }) => {
  const [showEdit, setShowEdit] = useState(false)

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('link')
    return isActive
  }, [editor])

  const { href: link, target } = editor.getAttributes('link')

  const handleEdit = useCallback(() => {
    setShowEdit(true)
  }, [])

  const onSetLink = useCallback(
    (url, openInNewTab) => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run()
      setShowEdit(false)
    },
    [editor]
  )

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setShowEdit(false)
    return null
  }, [editor])

  // const onShowEdit = useCallback(() => {
  //   setShowEdit(true)
  // }, [])
  //
  // const onHideEdit = useCallback(() => {
  //   setShowEdit(false)
  // }, [])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }]
        },
        appendTo: () => {
          return appendTo?.current
        },
        onHidden: () => {
          setShowEdit(false)
        }
      }}
    >
      {showEdit ? (
        <LinkEditorPanel initialUrl={link} initialOpenInNewTab={target === '_blank'} onSetLink={onSetLink} />
      ) : (
        <LinkPreviewPanel url={link} onClear={onUnsetLink} onEdit={handleEdit} />
      )}
    </BaseBubbleMenu>
  )
}

export default LinkMenu
