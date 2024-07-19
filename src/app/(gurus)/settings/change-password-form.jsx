'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const [user, setUser] = useState(null)

  const formSchema = z
    .object({
      currentPassword: z.string().min(1, { message: 'Current password is required.' }),
      newPassword: z.string().min(8, { message: 'New password must be at least 8 characters long.' }),
      confirmPassword: z.string().min(1, { message: 'Please confirm your new password.' })
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword']
    })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const {
    formState: { errors }
  } = form

  const erStyle = 'border-red-500 focus-visible:ring-red-500 shadow-sm-red-400'

  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: formData.currentPassword
      })

      if (signInError) toast.error('Current password is incorrect')

      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.newPassword
      })

      if (updateError) toast.error(updateError)

      toast.success('Password changed successfully')
      form.reset()
    } catch (error) {
      toast.error(error.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Current Password"
                      type="password"
                      {...field}
                      className={cn(errors.currentPassword && erStyle)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="New Password"
                      type="password"
                      {...field}
                      className={cn(errors.newPassword && erStyle)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm New Password"
                      type="password"
                      {...field}
                      className={cn(errors.confirmPassword && erStyle)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader className="mr-2 animate-spin" size={16} />}
              Change
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
