'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUp } from '@/lib/auth'

export default function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const searchMessage = searchParams.get('message')
  const formSchema = z.object({
    full_name: z
      .string()
      .min(4, { message: 'Name must not be less than 4 characters.' })
      .max(40, { message: 'Name cannot be more than 40 characters' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must not be less than 6 characters.' })
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: ''
    }
  })

  const erStyle = 'border-red-500 focus-visible:ring-red-500 shadow-sm-red-400'

  const onSubmit = async (formData) => {
    await setLoading(true)
    await signUp(formData)
    await setLoading(false)
  }

  const { formState } = form

  useEffect(() => {
    if (searchMessage) {
      toast.error(searchMessage)
    }
  }, [searchMessage])

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Full name" {...field} className={formState?.errors.full_name && erStyle} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} className={formState?.errors.email && erStyle} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                    className={formState?.errors.password && erStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader className="mr-2 animate-spin" size={16} />}
            Continue
          </Button>
        </form>
      </Form>
    </>
  )
}
