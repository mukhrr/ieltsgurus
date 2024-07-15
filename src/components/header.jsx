'use client'

import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { MessageSquareShareIcon } from 'lucide-react'

// import CommandMenu from '@/components/command-menu'
// import MobileSidebar from "../MobileSidebar"
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'

import { isVisibleScrollTop } from '@/lib/atoms/common-atom'

export default function Header() {
  const [scroll, setScroll] = useState(false)
  const setScrollTopVisible = useSetAtom(isVisibleScrollTop)
  // const isMobile = useMediaQuery('(max-width: 600px)')

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
            <span className="font-bold sm:inline-block">IELTS GURUS</span>
          </Link>
        </div>

        {scroll && <SearchInput />}

        {/*<nav className='flex items-center gap-4'>*/}
        {/*    <AuthButton/>*/}
        {/*</nav>*/}
        {/*<FeedbackButton>*/}
        <div className="flex items-center space-x-2">
          {/*TODO: show sponsor button */}
          {/*{!isVisibleTop && !isMobile && (*/}
          {/*  <iframe*/}
          {/*    src="https://github.com/sponsors/mukhrr/button"*/}
          {/*    title="Sponsor IELTSGURUS"*/}
          {/*    className="h-[32px] w-[114px] rounded-md border-0 bg-transparent"*/}
          {/*  />*/}
          {/*)}*/}
          <Link href="https://ieltsgurus.productroad.com/board/features" rel="noopener noreferrer" target="_blank">
            <Button variant="outline" className="hidden items-center gap-2 md:flex">
              Feedback <MessageSquareShareIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        {/*</FeedbackButton>*/}
      </div>
    </header>
  )
}
