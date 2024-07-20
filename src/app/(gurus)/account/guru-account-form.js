'use client'

import { useRef, useState } from 'react'
import { UserRound } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { getInitials } from '@/lib/utils'

export default function GuruAccountForm({ user }) {
  const fileInputRef = useRef(null)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url)

  const handleAvatarChange = (e) => {
    setAvatarUrl(e.target.value.files[0])
  }

  return (
    <div className="mx-auto my-8 flex w-full max-w-2xl flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Mentor Account</h1>
      <form className="w-full space-y-6">
        <div className="space-y-2">
          <div className="mb-10 ml-5 flex items-center gap-8">
            <Button variant="secondary" size="icon" className="rounded-full shadow-sm">
              <Avatar className="h-16 w-16 scale-125">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>
                  {user?.username || user?.full_name ? (
                    getInitials(user?.username || user?.full_name)
                  ) : (
                    <UserRound className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <Button variant="outline" className="w-full" onClick={() => fileInputRef.current.click()} type="button">
              Change Avatar - Upload a file
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-gray-400">(Required)</span>
            </Label>
            <Input id="fullName" name="fullName" placeholder="Enter your full name" defaultValue={user.full_name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">
              Username <span className="text-gray-400">(Required)</span>
            </Label>
            <Input id="username" name="username" placeholder="Enter your username" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="about">
            About You <span className="text-gray-400">(at least, 50 characters)</span>
          </Label>
          <Textarea id="about" name="about" placeholder="Tell us about yourself" rows={5} />
        </div>
        <div className="space-y-2 pt-8">
          <Label>
            Your Scores <span className="text-gray-400">(Required)</span>
          </Label>
          <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-2 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="listening">Listening</Label>
              <Input
                id="listening"
                name="listening"
                type="number"
                min={0}
                max={9}
                placeholder="Enter your Listening score"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="speaking">Speaking</Label>
              <Input
                id="speaking"
                name="speaking"
                type="number"
                min={0}
                max={9}
                placeholder="Enter your Speaking score"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="writing">Writing</Label>
              <Input id="writing" name="writing" type="number" min={0} max={9} placeholder="Enter your Writing score" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reading">Reading</Label>
              <Input id="reading" name="reading" type="number" min={0} max={9} placeholder="Enter your Reading score" />
            </div>
          </div>
        </div>
        <div className="space-y-2 pt-8">
          <Label>
            Your Socials <span className="text-gray-400">(at least, one is required)</span>
          </Label>
          <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-2 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram</Label>
              <Input id="telegram" name="telegram" placeholder="Enter your Telegram username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" name="instagram" placeholder="Enter your Instagram username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input id="twitter" name="twitter" placeholder="Enter your Twitter username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" name="facebook" placeholder="Enter your Facebook username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" name="linkedin" placeholder="Enter your LinkedIn profile URL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input id="youtube" name="youtube" placeholder="Enter your YouTube channel URL" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
