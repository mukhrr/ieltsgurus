import Link from 'next/link'
import { Link as CustomLink } from '@/components/link'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 py-2">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:gap-0">
        <p className="text-sm text-gray-500">&copy; 2024 IELTS GURUS. All rights reserved.</p>
        <nav className="flex items-center justify-between gap-4 text-sm">
          <CustomLink href="https://t.me/ieltsgurus_support_bot" target="_blank">
            Support
          </CustomLink>
          <Link
            href="https://buymeacoffee.com/mukher"
            className="text-sm hover:underline dark:text-gray-400"
            target="_blank"
          >
            Say Thanks :)
          </Link>
          {/*<Link href="#" className="text-sm hover:underline dark:text-gray-400" prefetch={false}>*/}
          {/*  Privacy*/}
          {/*</Link>*/}
          {/*<Link href="#" className="text-sm hover:underline dark:text-gray-400" prefetch={false}>*/}
          {/*  Contact*/}
          {/*</Link>*/}
        </nav>
      </div>
    </footer>
  )
}
