'use client'

import { useCallback, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn, getInitials, strToCamelCase } from '@/lib/utils'

const formSchema = z.object({
  full_name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' })
})

export default function UserProfileForm({ user }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || user?.picture)
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

  // TODO: fix handling avatar picture
  const handleAvatarChange = useCallback(
    async (event) => {
      const file = event.target.files[0]
      if (!file) return

      setLoading(true)
      try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${strToCamelCase(user?.full_name)}.${fileExt}`

        const { error } = await supabase.storage.from('mentor-images').upload(fileName, file)

        if (error) throw error

        setAvatarUrl(fileName)
        toast.success('Avatar uploaded successfully')
      } catch (error) {
        console.error('Error uploading avatar:', error)
        toast.error(error.message || 'Failed to upload avatar')
      } finally {
        setLoading(false)
      }
    },
    [supabase.storage, user?.full_name]
  )

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
                  <AvatarImage src={user?.picture} />
                  <AvatarFallback>{getInitials(user?.username || user?.full_name || 'U')}</AvatarFallback>
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
