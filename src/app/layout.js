import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { JetBrains_Mono } from 'next/font/google'
import { Provider } from 'jotai'

import '@/assets/styles/globals.css'
import '@/assets/styles/prosemirror.css'

import { Toaster } from '@/components/ui/sonner'

import { defaultUrl, sharedDescription, sharedTitle } from '@/app/shared-metadata'

export const revalidate = 60 * 60 * 24 * 2 // 2 days

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['variable']
})

export default function RootLayout({ children }) {
  return (
    <Provider>
      <html lang="en" className={`${GeistSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
        <body suppressHydrationWarning>
          {children}

          <Analytics />
          <SpeedInsights />
          <Toaster
            closeButton
            richColors
            toastOptions={{
              duration: 5000
            }}
          />
        </body>
      </html>
    </Provider>
  )
}

export const metadata = {
  metadataBase: new URL(defaultUrl),
  robots: {
    index: true,
    follow: true
  },
  title: {
    template: `%s — ${sharedTitle}`,
    default: sharedTitle
  },
  description: sharedDescription,
  openGraph: {
    title: {
      template: `%s — ${sharedTitle}`,
      default: sharedTitle
    },
    description: sharedDescription,
    alt: sharedTitle,
    type: 'website',
    url: '/',
    siteName: sharedTitle,
    locale: 'en_IE'
  },
  alternates: {
    canonical: '/'
  },
  other: {
    pinterest: 'nopin'
  }
}

export const viewport = {
  themeColor: 'white',
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1
}
