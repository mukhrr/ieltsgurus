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

const formSchema = z.object({
  full_name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' })
})

export default function UserProfileForm({ user }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url)
  const [avatarFile, setAvatarFile] = useState(null)
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
      let avatar_url = user?.avatar_url

      // Upload new avatar if changed
      if (avatarFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`${user.id}/${Date.now()}.png`, avatarFile)

        if (uploadError) toast.error(uploadError)

        const {
          data: { publicUrl }
        } = supabase.storage.from('avatars').getPublicUrl(uploadData.path)

        avatar_url = publicUrl
      }

      const { error } = await supabase
        .from('profiles')
        .update({ full_name: formData.full_name, email: formData.email, avatar_url: avatar_url })
        .eq('id', user?.id)
      if (error) toast.error(error)
      else toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setAvatarUrl(URL.createObjectURL(file))
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
                    {user?.full_name || user?.username ? (
                      getInitials(user?.full_name || user?.username)
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
                    <Input placeholder="Muhammad Ali" {...field} className={cn(errors.full_name && erStyle)} />
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
