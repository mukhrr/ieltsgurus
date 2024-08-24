import { cache } from 'react'
import 'server-only'

import { isDevelopment } from '@/lib/utils'

const fetchGraphQL = cache(async (query, preview = isDevelopment) => {
  try {
    const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
        }`
      },
      body: JSON.stringify({ query })
    })

    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.info(error)
    return null
  }
})

export const getAllPosts = cache(async (preview = isDevelopment) => {
  try {
    const entries = await fetchGraphQL(
      `query {
        postCollection(preview: ${preview}) {
          items {
            title
            slug
            date
            sys {
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entries?.data?.postCollection?.items ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})
