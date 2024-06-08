'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChevronsDownUpIcon, BookIcon, HeadphonesIcon, MicIcon, PencilIcon, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function GuruCard() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <Card className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-gray-200">
            <AvatarImage src="/placeholder.svg" alt="Instructor Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h3
                className={cn('font-semibold xl:text-xl', {
                  'text-xl': isCollapsed
                })}
              >
                Xonzoda Akramova
              </h3>

              {isCollapsed ? (
                <p className="text-base text-gray-500">Overall: 7.5</p>
              ) : (
                <p className="text-base text-gray-500">IELTS Instructor</p>
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
          <p>John Doe is a special in IELTS instructor with over 10 years of teaching experience.</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-gray-700">Overall Score: 7.5</p>
            <Button variant="outline" size="sm" className="flex items-center gap-2 px-4 py-2">
              View Profile
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <HeadphonesIcon className="h-4 w-4" />
              <span>Listening: 8.5</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BookIcon className="h-4 w-4" />
              <span>Reading: 7.0</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <PencilIcon className="h-4 w-4" />
              <span>Writing: 6.5</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MicIcon className="h-4 w-4" />
              <span>Speaking: 7.0</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
