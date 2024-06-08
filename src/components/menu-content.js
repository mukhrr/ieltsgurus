'use client'

import Link from 'next/link'

import { NavigationLink } from '@/components/navigation-link'
import { useParams } from 'next/navigation'
import { LINKS } from '@/lib/constants'

export const MenuContent = () => {
  const params = useParams()

  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight">Onur Şuyalçınkaya</span>
            <span className="text-gray-600">Software Engineer</span>
          </div>
        </Link>
        <div className="flex flex-col gap-1">
          {LINKS.map((link, linkIndex) => (
            <NavigationLink
              key={link.href}
              href={`/${params.guruUID}${link.href}`}
              label={link.label}
              icon={link.icon}
              shortcutNumber={linkIndex + 1}
            />
          ))}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2 text-sm">
        <span className="px-2 text-xs font-medium leading-relaxed text-gray-600">Online</span>
        <div className="flex flex-col gap-1"></div>
      </div>
    </div>
  )
}
