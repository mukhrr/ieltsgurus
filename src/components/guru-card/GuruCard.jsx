'use client'

import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { BookIcon, ChevronsDownUpIcon, HeadphonesIcon, MicIcon, PencilIcon, Send, Share2 } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { getInitials, isUrl, replaceSpacesWithPlus } from '@/lib/utils'

export default function GuruCard({ fullName, image, score, shortInfo, description, socialNetworks, username }) {
  const descriptionRef = useRef(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isExpandedDescription, setIsExpandedDescription] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const imagePathOnStore = isUrl(image)
    ? image
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${image}`

  const truncateString = {
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical'
  }

  const onCopyMentor = (name) => {
    window.navigator.clipboard.writeText(`https://ieltsgurus.vercel.app/?q=${replaceSpacesWithPlus(name)}`)
    toast.info(`${name} is copied to clipboard. Now you can share with :)`)
  }

  // truncate description if it overflows content
  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight)
    }
  }, [description])

  return (
    <Card
      className={`h-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg ${isCollapsed && 'h-[130px]'}`}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-gray-200">
            <AvatarImage className="scale-110" src={imagePathOnStore} alt="Guru Avatar" />
            <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h3 title={fullName} className="font-semibold xl:text-lg" style={truncateString}>
                {fullName}
              </h3>

              {isCollapsed ? (
                <p className="text-base text-gray-500">Overall: {score.overall}</p>
              ) : (
                <p title={username} className="max-w-48 truncate text-base text-gray-500">
                  @{username}
                </p>
              )}
            </div>
            {isCollapsed && (
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  title="Share mentor"
                  onClick={() => onCopyMentor(fullName)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={socialNetworks.telegram} title="Telegram channel" target="_blank" rel="noopener noreferrer">
                    <Send className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsCollapsed(!isCollapsed)}>
          <ChevronsDownUpIcon className="h-5 w-5" />
          <span className="sr-only">Toggle collapse</span>
        </Button>
      </div>
      {!isCollapsed && (
        <div className="mt-4 space-y-4">
          <div className="relative">
            <p
              ref={descriptionRef}
              className={`text-sm ${isExpandedDescription ? 'max-h-none' : 'max-h-56 overflow-hidden'}`}
            >
              {description || shortInfo}
            </p>
            {isOverflowing && (
              <span
                className="absolute bottom-0 right-0 cursor-pointer bg-white p-[2px] underline"
                aria-hidden="true"
                onClick={() => setIsExpandedDescription(!isExpandedDescription)}
              >
                {isExpandedDescription ? 'Show less' : '... Read more'}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-700">Overall Score: {score.overall}</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                title="Share mentor"
                onClick={() => onCopyMentor(fullName)}
              >
                Share
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={socialNetworks.telegram}
                  title="Telegram channel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  View
                  <Send className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <HeadphonesIcon className="h-4 w-4" />
              <span>Listening: {score.listening}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BookIcon className="h-4 w-4" />
              <span>Reading: {score.reading}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <PencilIcon className="h-4 w-4" />
              <span>Writing: {score.writing}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MicIcon className="h-4 w-4" />
              <span>Speaking: {score.speaking}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
