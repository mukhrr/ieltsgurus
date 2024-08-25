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
  const [mediumFontData, boldFontData] = await Promise.all([getMediumFont(), getBoldFont()])

  const title = `${params.username}'s blog on ieltstify`
  const description = `Read, enjoy, share ${params.username}'s posts!`

  return new ImageResponse(
    (
      <OpenGraphImage
        title={title}
        description={description}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        }
        url="blog"
      />
    ),
    {
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
    }
  )
}
