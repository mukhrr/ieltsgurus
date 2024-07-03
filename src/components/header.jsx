'use client'

import { useEffect, useState } from 'react'
import { MessageSquareShareIcon } from 'lucide-react'

// import CommandMenu from '@/components/command-menu'
// import MobileSidebar from "../MobileSidebar"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { SearchInput } from '@/components/ui/search-input'

export default function Header() {
  const [scroll, setScroll] = useState(false)

  const handleScroll = () => {
    setScroll(window.scrollY > 0)
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
            <Image width="24" height="24" src="/assets/logo.png" alt="Logo" className="border-0" />
            <span className="font-bold sm:inline-block">IELTS GURUS</span>
          </Link>
        </div>

        {scroll && <SearchInput />}

        {/*<nav className='flex items-center gap-4'>*/}
        {/*    <AuthButton/>*/}
        {/*</nav>*/}
        <Button variant="outline" className="hidden items-center gap-2 sm:flex">
          Feedback <MessageSquareShareIcon className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
