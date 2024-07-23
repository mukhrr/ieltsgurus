'use client'

import { useEffect, useRef, useState } from 'react'
import { UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { getInitials } from '@/lib/utils'
import { socialsInputPlaceholder } from './utils/socialsInputPlaceholder'
import { formSchema } from './utils/formSchema'

export default function GuruAccountForm({ user }) {
  const fileInputRef = useRef(null)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.full_name || '',
      username: user?.username || '',
      about: '',
      listening: undefined,
      speaking: undefined,
      writing: undefined,
      reading: undefined,
      telegram: '',
      instagram: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: ''
    }
  })

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  const onSubmit = (data) => {
    console.log(data)
    // Handle form submission
  }

  // disable submit button in case there is no at least a social media link
  useEffect(() => {
    const subscription = form.watch((value) => {
      const socials = [value.telegram, value.instagram, value.twitter, value.facebook, value.linkedin, value.youtube]
      setIsSubmitDisabled(!socials.some((social) => social && social.length > 0))
    })
    return () => subscription.unsubscribe()
  }, [form])

  return (
    <div className="mx-auto my-8 flex w-full max-w-2xl flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">{user?.username ? 'Edit Your ' : 'Create Mentor '} Account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-gray-400">(Required)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username <span className="text-gray-400">(Required)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  About You <span className="text-gray-400">(at least, 50 characters)</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about yourself" rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2 pt-8">
            <Label>
              Your Scores <span className="text-gray-400">(Required)</span>
            </Label>
            <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-2 sm:grid-cols-2">
              {['listening', 'speaking', 'writing', 'reading'].map((score) => (
                <FormField
                  key={score}
                  control={form.control}
                  name={score}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{score.charAt(0).toUpperCase() + score.slice(1)}</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} max={9} placeholder={`Enter your ${score} score`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-8">
            <Label>
              Your Socials <span className="text-gray-400">(at least, one is required)</span>
            </Label>
            <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-2 sm:grid-cols-2">
              {['telegram', 'instagram', 'twitter', 'facebook', 'linkedin', 'youtube'].map((social) => (
                <FormField
                  key={social}
                  control={form.control}
                  name={social}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{social.charAt(0).toUpperCase() + social.slice(1)}</FormLabel>
                      <FormControl>
                        <Input placeholder={socialsInputPlaceholder(social)} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      type="submit"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isSubmitDisabled}
                    >
                      Submit
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>At least one social media profile is required</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </form>
      </Form>
    </div>
  )
}
