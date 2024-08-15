import { ImageResponse } from 'next/og'

import { OpenGraphImage } from '@/components/og-image'
import { getWritingSeo } from '@/lib/contentful'
import { getMediumFont, getBoldFont } from '@/lib/fonts'
import { sharedImage } from '@/app/shared-metadata'

export const runtime = 'edge'
export const alt = 'Writing'
export const size = {
  width: sharedImage.width,
  height: sharedImage.height
}

export default async function Image({ params }) {
  const { id } = params
  const [seoData, mediumFontData, boldFontData] = await Promise.all([getWritingSeo(id), getMediumFont(), getBoldFont()])
  if (!seoData) return null
  const {
    seo: { title, ogImageTitle, ogImageSubtitle }
  } = seoData

  return new ImageResponse(<OpenGraphImage title={ogImageTitle || title} description={ogImageSubtitle} url="blog" />, {
    ...size,
    fonts: [
      {
        name: 'SF Pro',
        data: mediumFontData,
        style: 'normal',
        weight: 500
      },
      {
        name: 'SF Pro',
        data: boldFontData,
        style: 'normal',
        weight: 600
      }
    ]
  })
}
