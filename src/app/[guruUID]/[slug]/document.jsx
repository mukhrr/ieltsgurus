'use client'

import { TiptapCollabProvider } from '@hocuspocus/provider'
import 'iframe-resizer/js/iframeResizer.contentWindow'
import { useSearchParams } from 'next/navigation'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Doc as YDoc } from 'yjs'

import { BlockEditor } from '@/components/block-editor'

export default function Document({ params }) {
  const [provider, setProvider] = useState(null)
  const [collabToken, setCollabToken] = useState(null)
  const searchParams = useSearchParams()

  const hasCollab = parseInt(searchParams.get('noCollab')) !== 1

  const { room } = params

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch('/api/collaboration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      ).json()

      const { token } = data

      // set state when the data received
      setCollabToken(token)
    }

    dataFetch()
  }, [])

  const ydoc = useMemo(() => new YDoc(), [])

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      setProvider(
        new TiptapCollabProvider({
          name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${room}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? '',
          token: collabToken,
          document: ydoc
        })
      )
    }
  }, [setProvider, collabToken, ydoc, room, hasCollab])

  if (hasCollab && (!collabToken || !provider)) return

  return <BlockEditor hasCollab={hasCollab} ydoc={ydoc} provider={provider} />
}
