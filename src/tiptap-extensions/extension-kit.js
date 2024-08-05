'use client'

import { API } from '@/lib/api'

import {
  BlockquoteFigure,
  CharacterCount,
  Color,
  Column,
  Columns,
  Document,
  Dropcursor,
  Emoji,
  emojiSuggestion,
  Figcaption,
  FileHandler,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableOfContents,
  TableRow,
  TaskItem,
  TaskList,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline
} from '.'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { ImageUpload } from './image-upload'
import { TableOfContentsNode } from './table-of-contents-node'
import { lowlight } from 'lowlight'

export const ExtensionKit = ({ provider }) => [
  Document,
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6]
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: null
  }),
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  TableOfContents,
  TableOfContentsNode,
  ImageUpload.configure({
    clientId: provider?.document?.clientID
  }),
  ImageBlock,
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(async () => {
        const url = await API.uploadImage()

        currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
      })
    },
    onPaste: (currentEditor, files) => {
      files.forEach(async () => {
        const url = await API.uploadImage()

        return currentEditor
          .chain()
          .setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url })
          .focus()
          .run()
      })
    }
  }),
  Emoji.configure({
    enableEmoticons: true,
    suggestion: emojiSuggestion
  }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {}
    }
  }).configure({
    types: ['heading', 'paragraph']
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => ''
  }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black'
  })
]

export default ExtensionKit
