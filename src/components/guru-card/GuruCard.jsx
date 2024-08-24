'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { BookIcon, ChevronsDownUpIcon, HeadphonesIcon, MicIcon, PencilIcon, Share2 } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import { generateImagePathOnStore, getInitials } from '@/lib/utils'

export default function GuruCard({ fullName, image, score, shortInfo, description, username }) {
  const descriptionRef = useRef(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isExpandedDescription, setIsExpandedDescription] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const imagePathOnStore = generateImagePathOnStore(image)

  const truncateString = {
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical'
  }

  const onCopyMentor = (event, user) => {
    event.stopPropagation()
    event.preventDefault()

    window.navigator.clipboard.writeText(`https://ieltstify.vercel.app/${user}`)
    toast.info('Copied to clipboard. Now you can share with :)')
  }

  // truncate description if it overflows content
  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight)
    }
  }, [description])

  return (
    <Link href={`/${username}`}>
      <Card
        className={`h-full w-full max-w-md rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg ${isCollapsed && 'h-[130px]'}`}
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
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  title="Share mentor"
                  onClick={(e) => onCopyMentor(e, username)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              setIsCollapsed(!isCollapsed)
            }}
          >
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
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsExpandedDescription(!isExpandedDescription)
                  }}
                >
                  {isExpandedDescription ? 'Show less' : '... Read more'}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-700">Overall Score: {score.overall}</p>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                title="Share mentor"
                onClick={(e) => onCopyMentor(e, username)}
              >
                Share
                <Share2 className="h-4 w-4" />
              </Button>
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
    </Link>
  )
}
