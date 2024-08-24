import { ImageResponse } from 'next/og'

import { OpenGraphImage } from '@/components/og-image'
import { getBoldFont, getMediumFont } from '@/lib/fonts'
import { sharedImage } from '@/app/shared-metadata'

export const runtime = 'edge'
export const size = {
  width: sharedImage.width,
  height: sharedImage.height
}

export default async function Image({ params }) {
  const { slug } = params
  console.log(slug)
  const [mediumFontData, boldFontData] = await Promise.all([getMediumFont(), getBoldFont()])

  if (!slug) return null

  const title = 'test post title'
  const ogImageTitle = 'test post image title'
  const ogImageSubtitle = 'test post image subtitle'

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
