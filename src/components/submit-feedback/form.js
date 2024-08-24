'use client'

import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { cn } from '@/lib/utils'

import { submitFeedback } from '@/lib/actions/submitFeedback'

const formSchema = z.object({
  thoughts: z.string().min(10, { message: 'Your ideas must be at least 10 characters long.' }),
  email: z.string().email('Invalid email address.').optional().or(z.literal(''))
})

export function SubmitFeedbackForm({ className, setFormOpen }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    // mode: 'onChange',
    defaultValues: {
      thoughts: '',
      email: ''
    }
  })
  const {
    formState: { isSubmitting, errors },
    setError
  } = form
  const hasErrors = Object.keys(errors).length > 0

  async function onSubmit(values) {
    try {
      await submitFeedback(values)

      toast(
        <span>
          <span className="underline underline-offset-4">Your feedback</span> has been submitted. Thank you!
        </span>,
        {
          type: 'success'
        }
      )
    } catch (error) {
      setError('api.limitError', {
        type: 'manual',
        message: error.message
      })
      toast.error(error.message)
    } finally {
      setFormOpen(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
        <FormField
          control={form.control}
          name="thoughts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I think...</FormLabel>
              <FormControl>
                <Textarea placeholder="It would be better if..." {...field} />
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
                <Input placeholder="muhammad_ali@gmail.com" {...field} />
              </FormControl>
              <FormDescription>Optional but helps us to get in touch back to you with a new release.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting || errors?.api?.limitError}>
          {hasErrors ? (
            'Submit'
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isSubmitting ? 'submitting' : 'submit'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </motion.span>
            </AnimatePresence>
          )}
        </Button>
      </form>
      <span className="text-sm">
        Have a technical issue?! Or found wrong information?! <br /> Contact{' '}
        <a href="https://t.me/ieltsgurus_support_bot" className="underline" target="_blank" rel="noopener noreferrer">
          Ieltstify support
        </a>
      </span>
    </Form>
  )
}
