'use client'

import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn, getInitials } from '@/lib/utils'
import { updateUserProfileAvatar, uploadAvatar } from '@/lib/actions/uploadAvatar'

const formSchema = z.object({
  full_name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' })
})

export default function UserProfileForm({ user }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url)
  const fileInputRef = useRef(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: user?.full_name || '',
      email: user?.email || ''
    }
  })

  const {
    formState: { errors }
  } = form

  const erStyle = 'border-red-500 focus-visible:ring-red-500 shadow-sm-red-400'

  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.email,
        data: { full_name: formData.full_name, picture: avatarUrl }
      })
      if (error) toast.error(error)
      else toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  // TODO: fix handling avatar picture. Error with RLS(row-level security) on Supabase
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!user) {
      toast.error('No user is logged in')
      return
    }

    const avatar_url = await uploadAvatar(file, user.id)

    if (!avatar_url) {
      toast.error('Failed to upload avatar')
      return
    }

    const updatedProfile = await updateUserProfileAvatar(user.id, avatar_url)

    if (updatedProfile) {
      setAvatarUrl(updatedProfile.avatar_url)
    } else {
      toast.error('Failed to update user profile')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="icon" className="rounded-full shadow-sm ring-1 ring-gray-950">
                <Avatar className="h-8 w-8 scale-125">
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
              <Button variant="outline" onClick={() => fileInputRef.current.click()} type="button">
                Change Avatar
              </Button>
            </div>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className={cn(errors.full_name && erStyle)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                      className={cn(errors.email && erStyle)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader className="mr-2 animate-spin" size={16} />}
              Update Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
