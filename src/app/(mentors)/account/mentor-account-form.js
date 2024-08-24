'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader, UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

import { calculateIeltsOverall, generateImagePathOnStore, getInitials } from '@/lib/utils'
import { socialsInputPlaceholder } from './utils/socialsInputPlaceholder'
import { formSchema } from './utils/formSchema'
import { checkUsernameUniqueness } from '@/lib/actions/checkUniqueUserName'
import { uploadAvatar } from '@/lib/actions/uploadAvatar'

export default function MentorAccountForm({ user }) {
  const router = useRouter()
  const imagePathOnStore = generateImagePathOnStore(user?.image_path)
  const supabase = createClientComponentClient()
  const fileInputRef = useRef(null)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || imagePathOnStore)
  const [avatarFile, setAvatarFile] = useState(null)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [overallScore, setOverallScore] = useState(user?.ielts_score?.reading.toString())
  const [isCheckingUserName, setIsCheckingUserName] = useState(false)
  const [userName, setUserName] = useState(user?.username)

  const scoreOptions = Array.from({ length: 19 }, (_, i) => 9 - i * 0.5).map((score) => ({
    value: score.toString(),
    label: score.toFixed(1)
  }))

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: user?.full_name || '',
      username: userName || '',
      about: user?.description || '',
      listening: user?.ielts_score?.listening.toString(),
      speaking: user?.ielts_score?.speaking.toString(),
      writing: user?.ielts_score?.writing.toString(),
      reading: user?.ielts_score?.reading.toString(),
      telegram: user?.social_networks?.telegram || '',
      instagram: user?.social_networks?.instagram || '',
      twitter: user?.social_networks?.twitter || '',
      facebook: user?.social_networks?.facebook || '',
      linkedin: user?.social_networks?.linkedin || '',
      youtube: user?.social_networks?.youtube || ''
    }
  })

  const onCancel = (e) => {
    e.preventDefault()
    router.back()
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      let avatar_url = user?.avatar_url

      // TODO: fix upload image
      // Upload new avatar if changed
      if (avatarFile) {
        console.log(avatarFile)
        // avatar_url = await uploadAvatar(avatarFile, user.id)
      }

      const mentorData = {
        user_id: user?.user_id || user.id,
        description: data.about,
        full_name: data.full_name,
        username: data.username,
        image_path: avatar_url,
        ielts_score: {
          reading: data.reading,
          listening: data.listening,
          writing: data.writing,
          speaking: data.speaking,
          overall: overallScore
        },
        social_networks: {
          twitter: data.twitter,
          linkedin: data.linkedin,
          telegram: data.telegram,
          instagram: data.instagram,
          youtube: data.youtube,
          facebook: data.facebook
        },
        // TODO: make categories submitting flexible
        categories: ['featured']
      }

      // Update or insert mentor data
      const { error: mentorError } = await supabase.from('mentors').upsert(mentorData, { onConflict: 'user_id' })

      if (mentorError) toast.error(mentorError)
      else toast.success('Success!')

      router.push(`/${userName}`)
      router.refresh()
    } catch (error) {
      console.error('Error updating mentor profile:', error)
      toast.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  // disable submit button in case there is no at least a social media link
  useEffect(() => {
    const subscription = form.watch((value) => {
      const socials = [value.telegram, value.instagram, value.twitter, value.facebook, value.linkedin, value.youtube]
      setIsSubmitDisabled(!socials.some((social) => social && social.length > 0))

      setOverallScore(
        calculateIeltsOverall({
          listening: Number(value.listening) || 0.0,
          reading: Number(value.reading) || 0.0,
          writing: Number(value.writing) || 0.0,
          speaking: Number(value.speaking) || 0.0
        })
      )

      setUserName(value?.username)
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
              <Button variant="outline" className="w-full" onClick={() => fileInputRef.current.click()} type="button">
                Change Avatar - Upload a file
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="full_name"
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
                    Username <span className="text-gray-400">({isCheckingUserName ? 'Checking' : 'Required'})</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(e)
                        if (e.target.value) {
                          checkUsernameUniqueness({
                            username: e.target.value,
                            currentUsername: user.username,
                            setIsLoading: setIsCheckingUserName,
                            form
                          })
                        }
                      }}
                    />
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
            <Label className="flex items-center justify-between text-sm">
              <p>
                Your Scores <span className="text-gray-400">(Required)</span>
              </p>
              <span>Overall: {overallScore}</span>
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
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select ${score} score`} />
                          </SelectTrigger>
                          <SelectContent>
                            {scoreOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
          <div className="flex justify-end gap-2">
            <Button className="flex items-center gap-2 bg-primary text-red-500 hover:bg-primary/90" onClick={onCancel}>
              Cancel
            </Button>

            {isSubmitDisabled ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Button
                        type="submit"
                        className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={isSubmitDisabled || isLoading}
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
            ) : (
              <Button
                type="submit"
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? <Loader className="animate-spin" /> : null} Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
