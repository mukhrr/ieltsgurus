'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChevronsDownUpIcon, BookIcon, HeadphonesIcon, MicIcon, PencilIcon, Send } from 'lucide-react'

export default function GuruCard({ fullName, image, score, shortInfo, description }) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <Card className="w-full max-w-md rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-gray-200">
            <AvatarImage src={image} alt="Guru Avatar" />
            <AvatarFallback>JD</AvatarFallback>
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
        <div className="mt-4 space-y-2">
          <p>{description}</p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-700">Overall Score: 7.5</p>
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
