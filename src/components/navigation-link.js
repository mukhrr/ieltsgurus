'use client'

import { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRightIcon, AtSignIcon, Facebook, Instagram, Linkedin, Send, X, Youtube } from 'lucide-react'

import { cn, isExternalLink } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export const NavigationLink = memo(({ href, label, icon, shortcutNumber, disabled }) => {
  const pathname = usePathname()
  const iconCmp = () => {
    if (typeof icon !== 'string') return icon

    switch (icon) {
      case 'instagram':
        return <Instagram size={16} />
      case 'telegram':
        return <Send size={16} />
      case 'linkedin':
        return <Linkedin size={16} />
      case 'youtube':
        return <Youtube size={16} />
      case 'facebook':
        return <Facebook size={16} />
      case 'twitter':
        return <X size={16} />
      default:
        return <AtSignIcon size={16} />
    }
  }

  if (isExternalLink(href)) {
    return (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-gray-200"
      >
        <span className="inline-flex items-center gap-2 font-medium">
          {iconCmp()} {label}
        </span>
        <ArrowUpRightIcon size={16} />
      </a>
    )
  }

  let isActive = false
  if (pathname?.length > 0) {
    const splitPathname = pathname.split('/')
    const currentPathname = splitPathname[2] ?? ''
    isActive = currentPathname === href.split('/')[2]
  }

  return (
    <Link
      key={href}
      href={disabled ? '' : href}
      className={cn(
        'group flex items-center justify-between rounded-lg p-2',
        isActive ? 'bg-black text-white' : 'hover:bg-gray-200',
        disabled ? 'cursor-not-allowed bg-gray-200' : ''
      )}
    >
      <span className="flex items-center gap-2">
        {iconCmp()}
        <span className={cn('font-medium', isActive && 'text-white')}>{label}</span>
      </span>
      {disabled && <Badge variant="secondary">Coming soon</Badge>}
      {shortcutNumber && !disabled && (
        <span
          className={cn(
            'hidden h-5 w-5 place-content-center rounded border border-gray-200 bg-gray-100 text-xs font-medium text-gray-500 transition-colors duration-200 group-hover:border-gray-300 lg:grid',
            isActive && 'border-gray-600 bg-gray-700 text-gray-200 group-hover:border-gray-600'
          )}
          title={`Shortcut key: ${shortcutNumber}`}
        >
          {shortcutNumber}
        </span>
      )}
    </Link>
  )
})
