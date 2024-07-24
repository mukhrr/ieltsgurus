import * as z from 'zod'

const scoreSchema = z.preprocess((val) => Number(val), z.number().int().min(0).max(9))

export const formSchema = z
  .object({
    full_name: z.string().min(1, 'Full name is required'),
    username: z.string().min(1, 'Username is required'),
    about: z.string().min(50, 'About section must be at least 50 characters'),
    listening: scoreSchema,
    speaking: scoreSchema,
    writing: scoreSchema,
    reading: scoreSchema,
    telegram: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional()
  })
  .refine(
    (data) => {
      const socials = [data.telegram, data.instagram, data.twitter, data.facebook, data.linkedin, data.youtube]
      return socials.some((social) => social && social.length > 0)
    },
    {
      message: 'At least one social media profile is required',
      path: ['socials']
    }
  )
