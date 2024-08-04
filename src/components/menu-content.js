'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { NavigationLink } from '@/components/navigation-link'

import { capitalizeFirstLetter, generateSocialNetworkLink } from '@/lib/utils'

import { LINKS } from '@/lib/constants'
import { buttonVariants } from '@/components/ui/button'
import ProfileButton from '@/components/ui/profile-button'

export const MenuContent = ({ mentor, user }) => {
  const isCurrentUserMentor = user?.username && user.username === mentor.username

  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image width="24" height="24" src="/assets/logo.png" alt="Logo" className="border-0" />
            <span className="font-bold sm:inline-block">IELTS GURUS</span>
          </Link>
          <NavigationLink href="/" label="Back" icon={<ArrowLeft size={16} />} />
        </div>
        <ProfileButton hasFullName user={mentor} hasAccessToOptions={isCurrentUserMentor} />
        <div className="flex flex-col gap-1">
          {LINKS.map((link) => (
            <NavigationLink
              key={link.href}
              href={`/${mentor.username}${link.href}`}
              label={link.label}
              icon={link.icon}
              disabled={link.isDisabled}
            />
          ))}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2 text-sm">
        <span className="px-2 text-xs font-medium leading-relaxed text-gray-600">Online</span>
        <div className="flex flex-col gap-1">
          {Object.entries(mentor?.social_networks).map(
            ([key, value]) =>
              value && (
                <NavigationLink
                  key={key}
                  href={generateSocialNetworkLink(key, value)}
                  label={capitalizeFirstLetter(key)}
                  icon={key}
                />
              )
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-3 flex flex-col gap-3">
        {!isCurrentUserMentor && (
          <Link
            className={buttonVariants({ variant: 'secondary' })}
            href="https://t.me/ieltsgurus_support_bot"
            target="_blank"
          >
            Claim this profile as yours
          </Link>
        )}
      </div>
    </div>
  )
}
