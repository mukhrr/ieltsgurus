'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { useParams } from 'next/navigation'

import ProfileButton from '@/components/ui/profile-button'
import { NavigationLink } from '@/components/navigation-link'

import { capitalizeFirstLetter, generateSocialNetworkLink } from '@/lib/utils'

import { LINKS } from '@/lib/constants'

export const MenuContent = ({ mentor, user }) => {
  const params = useParams()

  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image width="24" height="24" src="/assets/logo.png" alt="Logo" className="border-0" />
            <span className="font-bold sm:inline-block">IELTS GURUS</span>
          </Link>
          <NavigationLink href="/" label="Back" icon={<ArrowLeft size={16} />} />
        </div>
        <div className="flex flex-col gap-1">
          {LINKS.map((link) => (
            <NavigationLink
              key={link.href}
              href={`/${params.guruUID}${link.href}`}
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

      <div className="absolute bottom-4 left-3 flex flex-col-reverse gap-1">
        <ProfileButton
          hasFullName
          user={mentor}
          hasAccessToOptions={user?.username && user.username === mentor.username}
        />
      </div>
    </div>
  )
}
