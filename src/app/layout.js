import { GeistSans } from 'geist/font/sans'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import '@/globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from '@/components/ui/sonner'
import { sharedDescription, sharedTitle, defaultUrl } from '@/app/shared-metadata'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/footer'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['variable']
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${jetbrainsMono.variable} light`} suppressHydrationWarning>
      <body className="text-foreground bg-background" suppressHydrationWarning>
        <main className="min-h-screen bg-white animate-in">
          <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-between gap-20">
            <header className="sticky top-0 z-50 w-full max-w-[1230px] border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-14 w-full items-center justify-between">
                <div className="mr-4 hidden md:flex">
                  <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Image width="24" height="24" src="/assets/logo.png" alt="Logo" className="border-0" />
                    <span className="hidden font-bold sm:inline-block">IELTS GURUS</span>
                  </Link>
                </div>

                {/*<nav className='flex items-center gap-4'>*/}
                {/*    <AuthButton/>*/}
                {/*</nav>*/}
              </div>
            </header>

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
      </body>
    </html>
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
