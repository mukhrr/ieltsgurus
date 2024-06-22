'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronsDownUpIcon, BookIcon, HeadphonesIcon, MicIcon, PencilIcon, Send } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { getInitials } from '@/lib/utils'

export default function GuruCard({ fullName, image, score, shortInfo, description }) {
  const descriptionRef = useRef(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isExpandedDescription, setIsExpandedDescription] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const imagePathOnStore = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${image}`

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
              <h3 className="font-semibold xl:text-lg">{fullName}</h3>

              {isCollapsed ? (
                <p className="text-base text-gray-500">Overall: {score.overall}</p>
              ) : (
                <p className="text-base text-gray-500">{shortInfo}</p>
              )}
            </div>
            {isCollapsed && (
              <div title="Telegram channel">
                <Button variant="outline" size="sm" className="flex items-center gap-2 px-4 py-2">
                  <Send className="h-4 w-4" />
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
            <p ref={descriptionRef} className={`${isExpandedDescription ? 'max-h-none' : 'max-h-56 overflow-hidden'}`}>
              {description}
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
            <p className="text-xl font-semibold text-gray-700">Overall Score: {score.overall}</p>
            <Button variant="outline" size="sm" className="flex items-center gap-2 px-4 py-2">
              View Profile
              <Send className="h-4 w-4" />
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
  )
}
