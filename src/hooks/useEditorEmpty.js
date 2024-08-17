import { useEffect, useState } from 'react'

function useEditorEmpty(localStorageKey = 'novel-content') {
  const [isEmpty, setIsEmpty] = useState(true)
  const editorContentString = localStorage.getItem(localStorageKey)

  useEffect(() => {
    const checkEditorContent = () => {
      if (!editorContentString) {
        setIsEmpty(true)
        return
      }

      try {
        const editorContent = JSON.parse(editorContentString)

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

    // Optional: Add event listener to check when localStorage changes
    window.addEventListener('storage', checkEditorContent)

    // Cleanup
    return () => {
      window.removeEventListener('storage', checkEditorContent)
    }
  }, [editorContentString])

  return isEmpty
}

export default useEditorEmpty
