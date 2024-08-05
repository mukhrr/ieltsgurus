import { Node } from '@tiptap/core'

export const ColumnLayout = {
  SidebarLeft: 'sidebar-left',
  SidebarRight: 'sidebar-right',
  TwoColumn: 'two-column'
}

export const Columns = Node.create({
  name: 'columns',

  group: 'columns',

  content: 'column column',

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      layout: {
        default: ColumnLayout.TwoColumn
      }
    }
  },

  addCommands() {
    return {
      setColumns:
        () =>
        ({ commands }) =>
          commands.insertContent(
            `<div data-type="columns"><div data-type="column" data-position="left"><p></p></div><div data-type="column" data-position="right"><p></p></div></div>`
          ),
      setLayout:
        (layout) =>
        ({ commands }) =>
          commands.updateAttributes('columns', { layout })
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'columns', class: `layout-${HTMLAttributes.layout}` }, 0]
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]'
      }
    ]
  }
})

export default Columns
