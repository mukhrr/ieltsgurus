export const revalidate = 60

import { GeistSans } from 'geist/font/sans'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Provider } from 'jotai'
import { SpeedInsights } from '@vercel/speed-insights/next'

import '@/globals.css'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/footer'
import Header from '@/components/header'

import { sharedDescription, sharedTitle, defaultUrl } from '@/app/shared-metadata'

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
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            <main className="min-h-screen bg-white animate-in">
              <div className="min-h-screen">
                <Header />

                {children}

                <Footer />
              </div>

              <Analytics />
              <SpeedInsights />
              <Toaster
                closeButton
                richColors
                toastOptions={{
                  duration: 5000
                }}
              />
            </main>
          </ThemeProvider>
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
