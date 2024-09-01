'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { MessageSquareShareIcon } from 'lucide-react'

import { SearchInput } from '@/components/ui/search-input'
import AuthButton from '@/components/ui/auth-button'
import ProfileButton from '@/components/ui/profile-button'

import { buttonVariants } from '@/components/ui/button'
import useMediaQuery from '@/hooks/useMediaQuery'
import { isVisibleScrollTop } from '@/lib/atoms/common-atom'
import { cn } from '@/lib/utils'
import FeedbackButton from '@/components/feedback-button'

export default function Header({ user }) {
  const [scroll, setScroll] = useState(false)
  const setScrollTopVisible = useSetAtom(isVisibleScrollTop)
  const isMobile = useMediaQuery('(max-width: 600px)')
  const pathname = usePathname()

  const handleScroll = () => {
    setScroll(window.scrollY > 200)
    setScrollTopVisible(window.scrollY > 200)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 m-auto w-full max-w-[1230px] border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between px-6 xl:p-0">
        <div className="mr-4 md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image width="24" height="24" src="/assets/logo.png" alt="Logo" className="hidden border-0 md:block" />
            <span className="font-bold sm:inline-block">IELTStify</span>
          </Link>
        </div>

        {scroll && pathname === '/' && <SearchInput />}

        <div className="flex items-center space-x-2">
          {/*TODO: show sponsor button */}
          {/*{!isVisibleTop && !isMobile && (*/}
          {/*  <iframe*/}
          {/*    src="https://github.com/sponsors/mukhrr/button"*/}
          {/*    title="Sponsor IELTStify"*/}
          {/*    className="h-[32px] w-[114px] rounded-md border-0 bg-transparent"*/}
          {/*  />*/}
          {/*)}*/}

          {!isMobile && !user && (
            <FeedbackButton>
              <span className={cn(buttonVariants({ variant: 'outline' }), 'cursor-pointer items-center gap-2 md:flex')}>
                Feedback <MessageSquareShareIcon className="h-4 w-4" />
              </span>
            </FeedbackButton>
          )}

          {(!scroll || !isMobile || pathname !== '/') && (
            <>
              {user?.id ? (
                <div className="flex items-center space-x-4">
                  {user?.username ? (
                    <Link
                      href={`/${user?.username}`}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'items-center gap-2 md:flex',
                        `${pathname?.includes('account') ? 'ring-1 ring-gray-950' : ''}`
                      )}
                    >
                      My Profile
                    </Link>
                  ) : (
                    <Link
                      href="/account"
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'items-center gap-2 md:flex',
                        `${pathname?.includes('account') ? 'ring-1 ring-gray-950' : ''}`
                      )}
                    >
                      I am a mentor
                    </Link>
                  )}
                  <ProfileButton mentor={user} user={user} />
                </div>
              ) : (
                <AuthButton />
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
