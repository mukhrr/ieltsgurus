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
import { handleGoogleLogin, signIn } from '@/lib/auth'
import { cn } from '@/lib/utils'

export default function AuthForm() {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const searchMessage = searchParams.get('message')
  const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must not be less than 6 characters.' })
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const {
    formState: { errors }
  } = form

  const erStyle = 'border-red-500 focus-visible:ring-red-500 shadow-sm-red-400'

  const onSubmit = async (formData) => {
    await setLoading(true)
    await signIn(formData)
    await setLoading(false)
  }

  const loginWithGoogle = async () => {
    await setLoading(true)
    await handleGoogleLogin()
  }

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
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} className={errors.email && erStyle} />
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
                  <Input placeholder="password" type="password" {...field} className={errors.password && erStyle} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader className="mr-2 animate-spin" size={16} />}
            Submit
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="text-muted-foreground bg-background px-2">Or continue with</span>
        </div>
      </div>
      <Button
        variant="outline"
        type="submit"
        onClick={loginWithGoogle}
        disabled={loading}
        className={cn('flex items-center gap-2')}
      >
        {loading ? (
          <Loader className="mr-2 animate-spin" size={16} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.945 11a9 9 0 1 1-3.284-5.997l-2.655 2.392A5.5 5.5 0 1 0 17.125 14H13v-3z" />
          </svg>
        )}
        Google
      </Button>
    </>
  )
}
