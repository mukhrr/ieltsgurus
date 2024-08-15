function escapeMarkdown(text) {
  return text.replace(/([*_`#[\]])/g, '\\$1')
}

export function jsonToMarkdown(jsonContent) {
  const content = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent

  function processNode(node) {
    if (typeof node === 'string') return escapeMarkdown(node)

    let markdown = ''

    if (node.type === 'doc') {
      return node.content.map(processNode).join('\n\n')
    }

    if (node.type === 'paragraph') {
      return node.content.map(processNode).join('')
    }

    if (node.type === 'text') {
      let text = escapeMarkdown(node.text)
      if (node.marks) {
        node.marks.forEach((mark) => {
          switch (mark.type) {
            case 'bold':
              text = `**${text}**`
              break
            case 'italic':
              text = `*${text}*`
              break
            case 'strike':
              text = `~~${text}~~`
              break
            case 'code':
              text = `\`${text}\``
              break
            // Add more cases for other mark types as needed
          }
        })
      }
      return text
    }

    if (node.type === 'heading') {
      const level = '#'.repeat(node.attrs.level)
      return `${level} ${node.content.map(processNode).join('')}\n`
    }

    if (node.type === 'bulletList') {
      return node.content.map((item) => `- ${processNode(item)}`).join('\n')
    }

    if (node.type === 'orderedList') {
      return node.content.map((item, index) => `${index + 1}. ${processNode(item)}`).join('\n')
    }

    if (node.type === 'listItem') {
      return node.content.map(processNode).join('\n')
    }

    if (node.type === 'blockquote') {
      return `> ${node.content.map(processNode).join('\n> ')}`
    }

    if (node.type === 'hardBreak') {
      return '\n'
    }

    if (node.content) {
      markdown += node.content.map(processNode).join('')
    }

    return markdown
  }

  return processNode(content)
}
