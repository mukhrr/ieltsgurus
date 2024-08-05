'use client'

import { NodeViewWrapper } from '@tiptap/react'
import { useCallback } from 'react'

import { ImageUploader } from './image-uploader'

export const ImageUpload = ({ getPos, editor }) => {
  const onUpload = useCallback(
    (url) => {
      if (url) {
        editor.chain().setImageBlock({ src: url }).deleteRange({ from: getPos(), to: getPos() }).focus().run()
      }
    },
    [getPos, editor]
  )

  return (
    <NodeViewWrapper>
      <div className="m-0 p-0" data-drag-handle>
        <ImageUploader onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  )
}

export default ImageUpload
