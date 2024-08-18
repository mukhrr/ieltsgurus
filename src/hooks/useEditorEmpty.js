import { useEffect, useState } from 'react'

function useEditorEmpty(editorContent) {
  const [isEmpty, setIsEmpty] = useState(true)
  const editorContentString = JSON.stringify(editorContent)

  useEffect(() => {
    const checkEditorContent = () => {
      if (!editorContentString) {
        setIsEmpty(true)
        return
      }

      try {
        if (editorContent.content.length === 0) {
          setIsEmpty(true)
          return
        }

        if (
          !!editorContent.content.length &&
          (!editorContent.content[0].content || editorContent.content[0].content.length === 0)
        ) {
          setIsEmpty(true)
          return
        }

        setIsEmpty(false)
      } catch (error) {
        console.error('Error parsing editor content:', error)
        setIsEmpty(true)
      }
    }

    checkEditorContent()
  }, [editorContent, editorContentString])

  return isEmpty
}

export default useEditorEmpty
